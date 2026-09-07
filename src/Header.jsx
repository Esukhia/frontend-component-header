import React, { useContext } from 'react';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';
import {
  APP_CONFIG_INITIALIZED,
  ensureConfig,
  mergeConfig,
  getConfig,
  subscribe,
} from '@edx/frontend-platform';

import PropTypes from 'prop-types';
import DesktopHeaderSlot from './plugin-slots/DesktopHeaderSlot';
import UserbackWidget from './UserbackWidget';
import useAccount from './useAccount';

import messages from './Header.messages';

ensureConfig([
  'LMS_BASE_URL',
  'LOGOUT_URL',
  'LOGIN_URL',
  'SITE_NAME',
  'LOGO_URL',
  'ORDER_HISTORY_URL',
], 'Header component');

subscribe(APP_CONFIG_INITIALIZED, () => {
  mergeConfig({
    AUTHN_MINIMAL_HEADER: !!process.env.AUTHN_MINIMAL_HEADER,
  }, 'Header additional config');
});

/**
 * Header component. Renders as a single bar at every screen width; the switch to a
 * burger menu on narrow screens is done in CSS via `@edx/brand/paragon/header`, which
 * an app must import.
 *
 * See https://github.com/openedx/frontend-component-header/blob/master/docs/using_custom_header.rst
 *
 * @param {list} mainMenuItems - The list of main menu items to display.
 * See the documentation for the structure of main menu item.
 * @param {list} secondaryMenuItems - The list of secondary menu items to display.
 * See the documentation for the structure of secondary menu item.
 * @param {list} userMenuItems - The list of user menu items to display.
 * See the documentation for the structure of user menu item.
 * @param {string} footerSelector - A CSS selector for the element the header should
 * treat as the page's footer, so it knows when to release its sticky position. Only
 * needed if the page has more than one element matching the default (`footer`), or
 * none at all.
 */
const Header = ({
  intl, mainMenuItems, secondaryMenuItems, userMenuItems, footerSelector,
}) => {
  const { authenticatedUser, config } = useContext(AppContext);

  const defaultMainMenu = [
    {
      type: 'item',
      href: `${config.LMS_BASE_URL}/dashboard`,
      content: intl.formatMessage(messages['header.links.courses']),
      iconName: 'dashboard',
    },
  ];

  // `iconName` is a hint (not a component import) picking the row's icon; unknown/absent
  // names just render none.
  const defaultUserMenu = authenticatedUser === null ? [] : [{
    heading: '',
    items: [
      {
        type: 'item',
        href: `${config.ACCOUNT_PROFILE_URL}/u/${authenticatedUser.username}`,
        content: intl.formatMessage(messages['header.user.menu.profile']),
        iconName: 'profile',
      },
      {
        type: 'item',
        href: config.ACCOUNT_SETTINGS_URL,
        content: intl.formatMessage(messages['header.user.menu.account.settings']),
        iconName: 'account',
      },
      // Order History link removed
      // Uncomment the following lines if you want to re-enable Order History
      // ...(config.ORDER_HISTORY_URL ? [{
      //   type: 'item',
      //   href: config.ORDER_HISTORY_URL,
      //   content: intl.formatMessage(messages['header.user.menu.order.history']),
      // }] : []),
    ],
  }, {
    heading: '',
    items: [
      {
        type: 'item',
        href: config.LOGOUT_URL,
        content: intl.formatMessage(messages['header.user.menu.logout']),
        iconName: 'signout',
      },
    ],
  }];

  const mainMenu = mainMenuItems || defaultMainMenu;
  const secondaryMenu = secondaryMenuItems || [];
  const userMenu = authenticatedUser === null ? [] : userMenuItems || defaultUserMenu;

  // Register comes first and sign in second, matching the design. `variant` says
  // which is the primary action rather than relying on that order.
  const loggedOutItems = [
    {
      type: 'item',
      href: `${config.LMS_BASE_URL}/register`,
      content: intl.formatMessage(messages['header.user.menu.register']),
      iconName: 'register',
      variant: 'register',
    },
    {
      type: 'item',
      href: config.LOGIN_URL,
      content: intl.formatMessage(messages['header.user.menu.login']),
      iconName: 'login',
      variant: 'signin',
    },
  ];

  // Shared with the learning header, which renders the same account menu.
  const account = useAccount();

  const props = {
    logo: config.LOGO_URL,
    logoAltText: config.SITE_NAME,
    logoDestination: `${config.LMS_BASE_URL}`,
    siteName: config.SITE_NAME,
    loggedIn: authenticatedUser !== null,
    username: authenticatedUser !== null ? authenticatedUser.username : null,
    name: account.name,
    email: account.email,
    avatar: account.avatar,
    avatarLoading: account.loading,
    mainMenu: getConfig().AUTHN_MINIMAL_HEADER ? [] : mainMenu,
    secondaryMenu: getConfig().AUTHN_MINIMAL_HEADER ? [] : secondaryMenu,
    userMenu: getConfig().AUTHN_MINIMAL_HEADER ? [] : userMenu,
    loggedOutItems: getConfig().AUTHN_MINIMAL_HEADER ? [] : loggedOutItems,
    footerSelector,
  };

  return (
    <>
      <DesktopHeaderSlot props={props} />
      <UserbackWidget />
    </>
  );
};

Header.defaultProps = {
  mainMenuItems: null,
  secondaryMenuItems: null,
  userMenuItems: null,
};

Header.propTypes = {
  intl: intlShape.isRequired,
  mainMenuItems: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array,
  ]),
  secondaryMenuItems: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array,
  ]),
  // No defaultProps entry: must stay `undefined` when unset, since an explicit `null`
  // would override SiteHeader's own 'footer' default and break footer detection.
  footerSelector: PropTypes.string,
  userMenuItems: PropTypes.arrayOf(PropTypes.shape({
    heading: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.oneOf(['item', 'menu']),
      href: PropTypes.string,
      content: PropTypes.string,
      iconName: PropTypes.string,
      isActive: PropTypes.bool,
    })),
  })),
};

export default injectIntl(Header);
