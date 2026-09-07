import React from 'react';
import PropTypes from 'prop-types';

import { NavIcon } from './icons';

/**
 * Navigation rows at the top of the burger menu (main and secondary menus already
 * merged). Each row's `iconName` is a string, not a component, so callers need no
 * import from this package; an unknown/missing name just renders no icon.
 */
const MobileNavItems = ({ menu }) => {
  // Consumers may hand us a ready-made node instead of a list of items.
  if (!Array.isArray(menu)) {
    return menu;
  }

  return menu.map(({
    content, href, iconName, isActive, onClick,
  }) => (
    <a
      key={`nav-${content}`}
      className="nav-menu-item"
      role="menuitem"
      href={href}
      aria-current={isActive ? 'page' : undefined}
      onClick={onClick || null}
    >
      <NavIcon iconName={iconName} />
      <span>{content}</span>
    </a>
  ));
};

export const mobileNavItemsDataShape = PropTypes.oneOfType([
  PropTypes.node,
  PropTypes.array,
]);

MobileNavItems.propTypes = {
  menu: mobileNavItemsDataShape,
};

MobileNavItems.defaultProps = {
  menu: [],
};

export default MobileNavItems;
