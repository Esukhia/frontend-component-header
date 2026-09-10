import React from 'react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { render, act } from '@testing-library/react';

import SiteHeader from './SiteHeader';

/** jsdom never scrolls on its own, so tests state the scroll position outright. */
const setScrollY = (value) => {
  Object.defineProperty(window, 'scrollY', { value, configurable: true });
};

const renderHeader = () => render(
  <IntlProvider locale="en" messages={{}}>
    <SiteHeader siteName="WeBuddhist Academy" logoDestination="#" />
  </IntlProvider>,
);

// `header-releases-sticky-instant` contains `header-releases-sticky`, so these
// have to compare class entries rather than search the className string.
const hasReleased = (container) => container
  .querySelector('header')
  .classList
  .contains('header-releases-sticky');

describe('<SiteHeader /> releasing near the footer', () => {
  let footer;

  beforeEach(() => {
    jest.useFakeTimers();
    footer = document.createElement('footer');
    document.body.appendChild(footer);
    Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true });
    setScrollY(0);
  });

  afterEach(() => {
    footer.remove();
    jest.useRealTimers();
  });

  // A page shorter than the viewport shows its footer right away. Releasing
  // there would hide the header on arrival, with no scrolling left to undo it.
  it('keeps the header when the footer is visible only because the page is short', () => {
    jest.spyOn(footer, 'getBoundingClientRect').mockReturnValue({ top: 400 });

    const { container } = renderHeader();

    expect(hasReleased(container)).toBe(false);
  });

  it('releases the header once the visitor scrolls the footer into view', () => {
    jest.spyOn(footer, 'getBoundingClientRect').mockReturnValue({ top: 2000 });

    const { container } = renderHeader();
    expect(hasReleased(container)).toBe(false);

    footer.getBoundingClientRect.mockReturnValue({ top: 400 });
    setScrollY(500);
    act(() => {
      window.dispatchEvent(new Event('scroll'));
      jest.runOnlyPendingTimers();
    });

    expect(hasReleased(container)).toBe(true);
  });
});
