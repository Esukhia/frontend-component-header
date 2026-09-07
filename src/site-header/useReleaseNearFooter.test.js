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

describe('useReleaseNearFooter', () => {
  let footer;

  beforeEach(() => {
    jest.useFakeTimers();
    MockResizeObserver.instances = [];
    global.ResizeObserver = MockResizeObserver;

    footer = document.createElement('footer');
    document.body.appendChild(footer);

    // Below the fold to start, the common case on page load.
    jest.spyOn(footer, 'getBoundingClientRect').mockReturnValue({ top: 2000 });
    Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true });
  });

  afterEach(() => {
    footer.remove();
    delete global.ResizeObserver;
    jest.useRealTimers();
  });

  it('reports the footer as not in view when it is below the fold', () => {
    const { result } = renderHook(() => useReleaseNearFooter());
    expect(result.current.inView).toBe(false);
  });

  it('reports the footer as in view when it already fits inside the viewport', () => {
    footer.getBoundingClientRect.mockReturnValue({ top: 400 });

    const { result } = renderHook(() => useReleaseNearFooter());
    expect(result.current.inView).toBe(true);
  });

  it('marks every reading before the first scroll or resize as instant', () => {
    const { result } = renderHook(() => useReleaseNearFooter());
    expect(result.current.instant).toBe(true);

    footer.getBoundingClientRect.mockReturnValue({ top: 400 });
    act(() => {
      MockResizeObserver.instances[0].callback();
      jest.runOnlyPendingTimers();
    });

    // A body resize alone isn't a visitor action.
    expect(result.current.inView).toBe(true);
    expect(result.current.instant).toBe(true);
  });

  it('marks a reading non-instant only for the scroll/resize that caused it', () => {
    const { result } = renderHook(() => useReleaseNearFooter());
    expect(result.current.instant).toBe(true);

    act(() => {
      window.dispatchEvent(new Event('scroll'));
      jest.runOnlyPendingTimers();
    });
    expect(result.current.instant).toBe(false);

    // A later reading caused only by a body resize (not a visitor action) is
    // instant again, even though the visitor already scrolled once before.
    footer.getBoundingClientRect.mockReturnValue({ top: 400 });
    act(() => {
      MockResizeObserver.instances[0].callback();
      jest.runOnlyPendingTimers();
    });
    expect(result.current.inView).toBe(true);
    expect(result.current.instant).toBe(true);
  });

  it('recomputes on a body resize with no scroll or resize event - the loading-spinner-to-real-content case', () => {
    // Starts short, as while a loading spinner is showing before real content replaces it.
    footer.getBoundingClientRect.mockReturnValue({ top: 400 });
    const { result } = renderHook(() => useReleaseNearFooter());
    expect(result.current.inView).toBe(true);

    // Real content pushes the footer down; only the body ResizeObserver can notice this.
    footer.getBoundingClientRect.mockReturnValue({ top: 2000 });
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
    footer.getBoundingClientRect.mockReturnValue({ top: 400 });

    const { result } = renderHook(() => useReleaseNearFooter());
    expect(result.current.inView).toBe(true);

    footer.getBoundingClientRect.mockReturnValue({ top: 2000 });
    act(() => {
      window.dispatchEvent(new Event('scroll'));
      jest.runOnlyPendingTimers();
    });

    expect(result.current.inView).toBe(false);
  });

  it('disconnects the ResizeObserver on unmount', () => {
    const { unmount } = renderHook(() => useReleaseNearFooter());
    const observer = MockResizeObserver.instances[0];

    unmount();

    expect(observer.disconnected).toBe(true);
  });
});
