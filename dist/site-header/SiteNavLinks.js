import React from 'react';
import PropTypes from 'prop-types';

/**
 * One row of top-level nav links; default content for both the main and
 * secondary menu slots, which render side by side in a single `nav-links` row.
 */
const SiteNavLinks = ({
  menu
}) => {
  // Consumers may hand us a ready-made node instead of a list of items.
  if (!Array.isArray(menu)) {
    return menu;
  }
  return menu.map(({
    content,
    href,
    isActive,
    disabled,
    onClick
  }) => /*#__PURE__*/React.createElement("a", {
    key: `link-${content}`,
    className: `nav-link${isActive ? ' nav-link-active' : ''}${disabled ? ' disabled' : ''}`,
    href: href,
    "aria-current": isActive ? 'page' : undefined,
    onClick: onClick || null
  }, content));
};
export const siteNavLinksDataShape = PropTypes.oneOfType([PropTypes.node, PropTypes.array]);
SiteNavLinks.propTypes = {
  menu: siteNavLinksDataShape
};
SiteNavLinks.defaultProps = {
  menu: []
};
export default SiteNavLinks;
//# sourceMappingURL=SiteNavLinks.js.map