import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import SiteHeader, { siteHeaderDataShape } from '../../site-header/SiteHeader';
const DesktopHeaderSlot = ({
  props
}) => /*#__PURE__*/React.createElement(PluginSlot, {
  id: "org.openedx.frontend.layout.header_desktop.v1",
  idAliases: ['desktop_header_slot'],
  slotOptions: {
    mergeProps: true
  }
}, /*#__PURE__*/React.createElement(SiteHeader, props));
DesktopHeaderSlot.propTypes = siteHeaderDataShape;
export default DesktopHeaderSlot;
//# sourceMappingURL=index.js.map