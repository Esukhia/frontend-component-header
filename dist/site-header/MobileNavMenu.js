import React, { useId } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Menu, MenuTrigger, MenuContent } from '../Menu';
import { BurgerIcon } from './icons';
import LanguageOptions from './LanguageOptions';
import ProfileIdentity from './ProfileIdentity';
import UserMenuItems, { userMenuItemsDataShape } from './UserMenuItems';
import MobileNavItems, { mobileNavItemsDataShape } from './MobileNavItems';
import MobileLoggedOutMenuItems from './MobileLoggedOutMenuItems';
import { siteLoggedOutItemsDataShape } from './SiteLoggedOutItems';
import getInitials from './utils';
import messages from '../Header.messages';

/**
 * Burger button and single merged menu (nav links, language list, account rows)
 * that replaces the right-hand side on narrow screens. `renderItems` optionally
 * overrides how logged-in rows render, mirroring `ProfileMenu`'s escape hatch.
 */
const MobileNavMenu = _ref => {
  let {
    navItems,
    userMenu,
    loggedOutItems,
    loggedIn,
    avatar,
    avatarLoading,
    username,
    name,
    email,
    renderItems
  } = _ref;
  const intl = useIntl();
  const triggerId = useId();
  const label = intl.formatMessage(messages['header.label.main.menu']);
  return /*#__PURE__*/React.createElement(Menu, {
    className: "nav-burger-wrap",
    transitionClassName: "nav-menu-anim",
    transitionTimeout: 160
  }, /*#__PURE__*/React.createElement(MenuTrigger, {
    tag: "button",
    type: "button",
    id: triggerId,
    className: "nav-locale nav-burger",
    "aria-label": label,
    title: label
  }, /*#__PURE__*/React.createElement(BurgerIcon, null)), /*#__PURE__*/React.createElement(MenuContent, {
    className: "nav-menu nav-menu-main",
    role: "menu",
    "aria-labelledby": triggerId
  }, /*#__PURE__*/React.createElement(MobileNavItems, {
    menu: navItems
  }), /*#__PURE__*/React.createElement("div", {
    className: "nav-menu-sep",
    role: "separator"
  }), /*#__PURE__*/React.createElement(LanguageOptions, null), loggedIn ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "nav-menu-sep",
    role: "separator"
  }), /*#__PURE__*/React.createElement(ProfileIdentity, {
    name: name,
    email: email,
    username: username,
    avatar: avatar,
    avatarLoading: avatarLoading,
    initials: getInitials(name, username)
  }), renderItems ? renderItems(userMenu) : /*#__PURE__*/React.createElement(UserMenuItems, {
    menu: userMenu
  })) : /*#__PURE__*/React.createElement(MobileLoggedOutMenuItems, {
    items: loggedOutItems
  })));
};
MobileNavMenu.propTypes = {
  navItems: mobileNavItemsDataShape,
  userMenu: userMenuItemsDataShape,
  loggedOutItems: siteLoggedOutItemsDataShape,
  loggedIn: PropTypes.bool,
  avatar: PropTypes.string,
  avatarLoading: PropTypes.bool,
  username: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  renderItems: PropTypes.func
};
MobileNavMenu.defaultProps = {
  navItems: [],
  userMenu: [],
  loggedOutItems: [],
  loggedIn: false,
  avatar: null,
  avatarLoading: false,
  username: null,
  name: null,
  email: null,
  renderItems: null
};
export default MobileNavMenu;
//# sourceMappingURL=MobileNavMenu.js.map