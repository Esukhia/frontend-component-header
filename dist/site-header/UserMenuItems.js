import React from 'react';
import PropTypes from 'prop-types';
import { getConfig } from '@edx/frontend-platform';
import { NavIcon } from './icons';

/**
 * Flattens the grouped user menu into dropdown rows, putting a separator between
 * each group. Sign out gets distinct styling, matched by icon hint or by href
 * pointing at the logout URL (a consumer's menu item may omit the icon hint).
 */
const UserMenuItems = ({
  menu,
  leadingSeparator
}) => menu.map((group, index) =>
/*#__PURE__*/
// eslint-disable-next-line react/no-array-index-key
React.createElement(React.Fragment, {
  key: `group-${index}`
}, (leadingSeparator || index > 0) && /*#__PURE__*/React.createElement("div", {
  className: "nav-menu-sep",
  role: "separator"
}), group.heading && /*#__PURE__*/React.createElement("div", {
  className: "nav-menu-label"
}, group.heading), group.items.map(({
  content,
  href,
  iconName,
  disabled,
  isActive,
  onClick
}) => /*#__PURE__*/React.createElement("a", {
  key: `${iconName || 'item'}-${content}`,
  className: `nav-menu-item${iconName === 'signout' || href === getConfig().LOGOUT_URL ? ' nav-menu-signout' : ''}${disabled ? ' disabled' : ''}`,
  role: "menuitem",
  href: href,
  "aria-current": isActive ? 'page' : undefined,
  onClick: onClick || null
}, /*#__PURE__*/React.createElement(NavIcon, {
  iconName: iconName
}), /*#__PURE__*/React.createElement("span", null, content)))));
export const userMenuItemsDataShape = PropTypes.arrayOf(PropTypes.shape({
  heading: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.oneOf(['item', 'menu']),
    href: PropTypes.string,
    content: PropTypes.string,
    iconName: PropTypes.string,
    isActive: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
  }))
}));
UserMenuItems.propTypes = {
  menu: userMenuItemsDataShape,
  leadingSeparator: PropTypes.bool
};
UserMenuItems.defaultProps = {
  menu: [],
  leadingSeparator: false
};
export default UserMenuItems;
//# sourceMappingURL=UserMenuItems.js.map