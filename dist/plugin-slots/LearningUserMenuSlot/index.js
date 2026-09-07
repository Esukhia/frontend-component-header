import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import UserMenuItems, { userMenuItemsDataShape } from '../../site-header/UserMenuItems';
const LearningUserMenuSlot = ({
  items
}) => /*#__PURE__*/React.createElement(PluginSlot, {
  id: "org.openedx.frontend.layout.header_learning_user_menu.v1",
  idAliases: ['learning_user_menu_slot'],
  slotOptions: {
    mergeProps: true
  }
}, /*#__PURE__*/React.createElement(UserMenuItems, {
  menu: items,
  leadingSeparator: true
}));
LearningUserMenuSlot.propTypes = {
  items: userMenuItemsDataShape
};
LearningUserMenuSlot.defaultProps = {
  items: []
};
export default LearningUserMenuSlot;
//# sourceMappingURL=index.js.map