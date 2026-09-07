import React from 'react';
import PropTypes from 'prop-types';
import { getConfig } from '@edx/frontend-platform';
import { Dropdown } from '@openedx/paragon';
const LearningHeaderUserMenuItems = _ref => {
  let {
    items
  } = _ref;
  return items.flatMap(item => {
    const isSignOut = item.href === getConfig().LOGOUT_URL;
    const key = item.href || item.message;
    if (isSignOut) {
      return [/*#__PURE__*/React.createElement(Dropdown.Divider, {
        key: `divider-${key}`
      }), /*#__PURE__*/React.createElement(Dropdown.Item, {
        key: `item-${key}`,
        href: item.href,
        className: "sign-out-item"
      }, item.message)];
    }
    return /*#__PURE__*/React.createElement(Dropdown.Item, {
      key: key,
      href: item.href
    }, item.message);
  });
};
export const learningHeaderUserMenuDataShape = {
  items: PropTypes.arrayOf(PropTypes.shape({
    message: PropTypes.string,
    href: PropTypes.string
  }))
};
LearningHeaderUserMenuItems.propTypes = learningHeaderUserMenuDataShape;
export default LearningHeaderUserMenuItems;
//# sourceMappingURL=LearningHeaderUserMenuItems.js.map