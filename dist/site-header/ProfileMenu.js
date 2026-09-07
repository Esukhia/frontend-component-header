import React, { useId } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Menu, MenuTrigger, MenuContent } from '../Menu';
import ProfileAvatar from './ProfileAvatar';
import ProfileIdentity from './ProfileIdentity';
import UserMenuItems, { userMenuItemsDataShape } from './UserMenuItems';
import getInitials from './utils';
import messages from '../Header.messages';

/**
 * Avatar button and account menu, shown above the collapse breakpoint. `renderItems`
 * lets a caller (e.g. the learning header) route rows through its own plugin slot.
 */
const ProfileMenu = _ref => {
  let {
    menu,
    avatar,
    avatarLoading,
    username,
    name,
    email,
    renderItems
  } = _ref;
  const intl = useIntl();
  const triggerId = useId();
  const initials = getInitials(name, username);
  const label = username ? intl.formatMessage(messages['header.label.account.menu.for'], {
    username
  }) : intl.formatMessage(messages['header.label.account.menu']);
  return /*#__PURE__*/React.createElement(Menu, {
    className: "nav-profile-wrap",
    transitionClassName: "nav-menu-anim",
    transitionTimeout: 160
  }, /*#__PURE__*/React.createElement(MenuTrigger, {
    tag: "button",
    type: "button",
    id: triggerId,
    className: "nav-profile",
    "aria-label": label
  }, /*#__PURE__*/React.createElement(ProfileAvatar, {
    src: avatar,
    initials: initials,
    loading: avatarLoading
  })), /*#__PURE__*/React.createElement(MenuContent, {
    className: "nav-menu",
    role: "menu",
    "aria-labelledby": triggerId
  }, /*#__PURE__*/React.createElement(ProfileIdentity, {
    name: name,
    email: email,
    username: username,
    avatar: avatar,
    avatarLoading: avatarLoading,
    initials: initials
  }), renderItems ? renderItems(menu) : /*#__PURE__*/React.createElement(UserMenuItems, {
    menu: menu,
    leadingSeparator: true
  })));
};
ProfileMenu.propTypes = {
  menu: userMenuItemsDataShape,
  avatar: PropTypes.string,
  avatarLoading: PropTypes.bool,
  username: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  renderItems: PropTypes.func
};
ProfileMenu.defaultProps = {
  menu: [],
  avatar: null,
  avatarLoading: false,
  username: null,
  name: null,
  email: null,
  renderItems: null
};
export default ProfileMenu;
//# sourceMappingURL=ProfileMenu.js.map