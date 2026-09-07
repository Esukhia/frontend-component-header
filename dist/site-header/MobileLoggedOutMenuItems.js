import React from 'react';
import UserMenuItems from './UserMenuItems';
import { siteLoggedOutItemsDataShape } from './SiteLoggedOutItems';

/**
 * Sign in/register as menu rows for the burger menu. Wraps the flat `items` array
 * into the grouped shape `UserMenuItems` expects.
 */
const MobileLoggedOutMenuItems = _ref => {
  let {
    items
  } = _ref;
  return /*#__PURE__*/React.createElement(UserMenuItems, {
    menu: [{
      items
    }],
    leadingSeparator: true
  });
};
MobileLoggedOutMenuItems.propTypes = {
  items: siteLoggedOutItemsDataShape
};
MobileLoggedOutMenuItems.defaultProps = {
  items: []
};
export default MobileLoggedOutMenuItems;
//# sourceMappingURL=MobileLoggedOutMenuItems.js.map