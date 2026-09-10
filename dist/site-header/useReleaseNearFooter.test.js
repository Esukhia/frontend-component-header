import { act, renderHook } from '@testing-library/react';
import useReleaseNearFooter from './useReleaseNearFooter';

/** Minimal ResizeObserver stub (jsdom has none); exposes the callback so tests can trigger it. */
class MockResizeObserver {
  constructor(callback) {
    this.callback = callback;
    MockResizeObserver.instances.push(this);
  }
  observe() {}
  disconnect() {
    this.disconnected = true;
  }
}
MockResizeObserver.instances = [];

/** jsdom never scrolls on its own, so tests state the scroll position outright. */
const setScrollY = value => {
  Object.defineProperty(window, 'scrollY', {
    value,
    configurable: true
  });
};
describe('useReleaseNearFooter', () => {
  let footer;
  beforeEach(() => {
    jest.useFakeTimers();
    MockResizeObserver.instances = [];
    global.ResizeObserver = MockResizeObserver;
    footer = document.createElement('footer');
    document.body.appendChild(footer);

    // Below the fold and at the top of the page, the common case on page load.
    jest.spyOn(footer, 'getBoundingClientRect').mockReturnValue({
      top: 2000
    });
    Object.defineProperty(window, 'innerHeight', {
      value: 800,
      configurable: true
    });
    setScrollY(0);
  });
  afterEach(() => {
    footer.remove();
    delete global.ResizeObserver;
    jest.useRealTimers();
  });
  it('reports the footer as not in view when it is below the fold', () => {
    const {
      result
    } = renderHook(() => useReleaseNearFooter());
    expect(result.current.inView).toBe(false);
  });
  it('reports the footer as in view once the visitor has scrolled it into view', () => {
    footer.getBoundingClientRect.mockReturnValue({
      top: 400
    });
    setScrollY(500);
    const {
      result
    } = renderHook(() => useReleaseNearFooter());
    expect(result.current.inView).toBe(true);
  });

  // A page shorter than the viewport shows its footer immediately. Releasing
  // there would hide the header on arrival with no scrolling available to
  // bring it back.
  it('stays put when the footer fits on screen and the page has not been scrolled', () => {
    footer.getBoundingClientRect.mockReturnValue({
      top: 400
    });
    const {
      result
    } = renderHook(() => useReleaseNearFooter());
    expect(result.current.inView).toBe(false);
  });
  it('stays put on a short page even after the content settles', () => {
    footer.getBoundingClientRect.mockReturnValue({
      top: 400
    });
    const {
      result
    } = renderHook(() => useReleaseNearFooter());

    // Content finishing loading still leaves the page too short to scroll.
    footer.getBoundingClientRect.mockReturnValue({
      top: 500
    });
    act(() => {
      MockResizeObserver.instances[0].callback();
      jest.runOnlyPendingTimers();
    });
    expect(result.current.inView).toBe(false);
  });
  it('marks every reading before the first scroll or resize as instant', () => {
    const {
      result
    } = renderHook(() => useReleaseNearFooter());
    expect(result.current.instant).toBe(true);

    // Scroll restored by the browser, so the position moves with no scroll event.
    footer.getBoundingClientRect.mockReturnValue({
      top: 400
    });
    setScrollY(500);
    act(() => {
      MockResizeObserver.instances[0].callback();
      jest.runOnlyPendingTimers();
    });

    // A body resize alone isn't a visitor action.
    expect(result.current.inView).toBe(true);
    expect(result.current.instant).toBe(true);
  });
  it('stops marking readings instant once the visitor actually scrolls', () => {
    const {
      result
    } = renderHook(() => useReleaseNearFooter());
    expect(result.current.instant).toBe(true);
    act(() => {
      window.dispatchEvent(new Event('scroll'));
      jest.runOnlyPendingTimers();
    });
    expect(result.current.instant).toBe(false);

    // Stays non-instant for later readings too, since a scroll was already seen.
    footer.getBoundingClientRect.mockReturnValue({
      top: 400
    });
    setScrollY(500);
    act(() => {
      MockResizeObserver.instances[0].callback();
      jest.runOnlyPendingTimers();
    });
    expect(result.current.inView).toBe(true);
    expect(result.current.instant).toBe(false);
  });
  it('recomputes on a body resize with no scroll or resize event - the loading-spinner-to-real-content case', () => {
    // Scrolled down with the footer showing, as while a spinner keeps the page short.
    footer.getBoundingClientRect.mockReturnValue({
      top: 400
    });
    setScrollY(500);
    const {
      result
    } = renderHook(() => useReleaseNearFooter());
    expect(result.current.inView).toBe(true);

    // Real content pushes the footer down; only the body ResizeObserver can notice this.
    footer.getBoundingClientRect.mockReturnValue({
      top: 2000
    });
    act(() => {
      MockResizeObserver.instances[0].callback();
      jest.runOnlyPendingTimers();
    });
    expect(result.current.inView).toBe(false);
    // This correction must not animate.
    expect(result.current.instant).toBe(true);
  });
  it('still recomputes on scroll when ResizeObserver is unavailable', () => {
    delete global.ResizeObserver;
    footer.getBoundingClientRect.mockReturnValue({
      top: 400
    });
    setScrollY(500);
    const {
      result
    } = renderHook(() => useReleaseNearFooter());
    expect(result.current.inView).toBe(true);
    footer.getBoundingClientRect.mockReturnValue({
      top: 2000
    });
    act(() => {
      window.dispatchEvent(new Event('scroll'));
      jest.runOnlyPendingTimers();
    });
    expect(result.current.inView).toBe(false);
  });
  it('re-pins the header when the visitor scrolls back to the top', () => {
    footer.getBoundingClientRect.mockReturnValue({
      top: 400
    });
    setScrollY(500);
    const {
      result
    } = renderHook(() => useReleaseNearFooter());
    expect(result.current.inView).toBe(true);
    setScrollY(0);
    act(() => {
      window.dispatchEvent(new Event('scroll'));
      jest.runOnlyPendingTimers();
    });
    expect(result.current.inView).toBe(false);
  });
  it('disconnects the ResizeObserver on unmount', () => {
    const {
      unmount
    } = renderHook(() => useReleaseNearFooter());
    const observer = MockResizeObserver.instances[0];
    unmount();
    expect(observer.disconnected).toBe(true);
  });
});
//# sourceMappingURL=useReleaseNearFooter.test.js.map