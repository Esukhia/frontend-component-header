import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';
import LanguageMenu from './LanguageMenu';
import ProfileMenu from './ProfileMenu';
import MobileNavMenu from './MobileNavMenu';
import { userMenuItemsDataShape } from './UserMenuItems';
import SiteNavLinks, { siteNavLinksDataShape } from './SiteNavLinks';
import SiteLoggedOutItems, { siteLoggedOutItemsDataShape } from './SiteLoggedOutItems';
import useReleaseNearFooter from './useReleaseNearFooter';
import messages from '../Header.messages';

/**
 * Whether the visitor is on the landing page, for underlining the brand lockup.
 * Guards against SSR/tests where `window` is missing.
 */
const isLandingPage = () => typeof window !== 'undefined' && window.location.pathname === '/';

/**
 * The site header for every screen width; CSS (in `_header.scss`) decides what's
 * visible at each breakpoint, not JS. Styling requires importing
 * `@edx/brand/paragon/header`. It also un-sticks itself as the page footer scrolls
 * into view (see `useReleaseNearFooter`); pass `footerSelector` if the default
 * `footer` selector doesn't uniquely match.
 */
const SiteHeader = _ref => {
  let {
    logo,
    logoAltText,
    logoDestination,
    siteName,
    mainMenu,
    secondaryMenu,
    userMenu,
    loggedOutItems,
    avatar,
    avatarLoading,
    username,
    name,
    email,
    loggedIn,
    footerSelector
  } = _ref;
  const intl = useIntl();
  const {
    inView: footerInView,
    instant: releaseInstantly
  } = useReleaseNearFooter(footerSelector);

  // Burger menu needs one merged list; skip either menu that's a node rather than
  // an array (only that one is dropped, not both).
  const navItems = [...(Array.isArray(mainMenu) ? mainMenu : []), ...(Array.isArray(secondaryMenu) ? secondaryMenu : [])];
  const brandActive = isLandingPage();
  const brandLabel = intl.formatMessage(messages['header.label.brand.home'], {
    siteName: siteName || logoAltText
  });
  const headerClassName = ['site-nav', footerInView && 'header-releases-sticky',
  // Skip the slide animation when the release wasn't caused by user scrolling.
  releaseInstantly && 'header-releases-sticky-instant'].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("header", {
    className: headerClassName
  }, /*#__PURE__*/React.createElement("a", {
    className: "nav-skip sr-only sr-only-focusable",
    href: "#main"
  }, intl.formatMessage(messages['header.label.skip.nav'])), /*#__PURE__*/React.createElement("div", {
    className: "nav-left"
  }, /*#__PURE__*/React.createElement("a", {
    className: `nav-brand${brandActive ? ' nav-brand-active' : ''}`,
    href: logoDestination,
    "aria-label": brandLabel,
    "aria-current": brandActive ? 'page' : undefined
  }, logo && /*#__PURE__*/React.createElement("img", {
    className: "nav-brand-logo",
    src: logo,
    alt: "",
    width: "32",
    height: "32"
  }), /*#__PURE__*/React.createElement("span", {
    className: "nav-brand-name"
  }, siteName || logoAltText)), /*#__PURE__*/React.createElement("nav", {
    className: "nav-links",
    "aria-label": intl.formatMessage(messages['header.label.main.nav'])
  }, /*#__PURE__*/React.createElement(SiteNavLinks, {
    menu: mainMenu
  }), /*#__PURE__*/React.createElement(SiteNavLinks, {
    menu: secondaryMenu
  }))), /*#__PURE__*/React.createElement("div", {
    className: "nav-actions"
  }, /*#__PURE__*/React.createElement(LanguageMenu, null), loggedIn ? /*#__PURE__*/React.createElement(ProfileMenu, {
    menu: userMenu,
    avatar: avatar,
    avatarLoading: avatarLoading,
    username: username,
    name: name,
    email: email
  }) : /*#__PURE__*/React.createElement(SiteLoggedOutItems, {
    items: loggedOutItems
  }), /*#__PURE__*/React.createElement(MobileNavMenu, {
    navItems: navItems,
    userMenu: userMenu,
    loggedOutItems: loggedOutItems,
    loggedIn: loggedIn,
    avatar: avatar,
    avatarLoading: avatarLoading,
    username: username,
    name: name,
    email: email
  })));
};
export const siteHeaderDataShape = {
  logo: PropTypes.string,
  logoAltText: PropTypes.string,
  logoDestination: PropTypes.string,
  siteName: PropTypes.string,
  mainMenu: siteNavLinksDataShape,
  secondaryMenu: siteNavLinksDataShape,
  userMenu: userMenuItemsDataShape,
  loggedOutItems: siteLoggedOutItemsDataShape,
  avatar: PropTypes.string,
  avatarLoading: PropTypes.bool,
  username: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  loggedIn: PropTypes.bool,
  footerSelector: PropTypes.string
};
SiteHeader.propTypes = siteHeaderDataShape;
SiteHeader.defaultProps = {
  logo: null,
  logoAltText: null,
  logoDestination: null,
  siteName: null,
  mainMenu: [],
  secondaryMenu: [],
  userMenu: [],
  loggedOutItems: [],
  avatar: null,
  avatarLoading: false,
  username: null,
  name: null,
  email: null,
  loggedIn: false,
  footerSelector: 'footer'
};
export default SiteHeader;
//# sourceMappingURL=SiteHeader.js.map