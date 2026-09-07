import React from 'react';
import PropTypes from 'prop-types';

/**
 * Sign-in (filled) and register (outlined) buttons for wide screens. `variant`
 * picks which is which; without it, the last of 2+ items is treated as sign-in.
 * A lone item can't be inferred this way, so it defaults to outlined and
 * `itemsWithVariantWarning` below warns callers to set `variant` explicitly.
 */
const SiteLoggedOutItems = ({ items }) => items.map((item, index) => {
  const isPrimary = item.variant
    ? item.variant === 'signin'
    : items.length > 1 && index === items.length - 1;
  return (
    <a
      key={`auth-${item.content}`}
      className={`nav-auth ${isPrimary ? 'nav-auth-signin' : 'nav-auth-register'}`}
      href={item.href}
    >
      {item.content}
    </a>
  );
});

const itemsArrayShape = PropTypes.arrayOf(PropTypes.shape({
  type: PropTypes.oneOf(['item', 'menu']),
  href: PropTypes.string,
  content: PropTypes.string,
  iconName: PropTypes.string,
  variant: PropTypes.oneOf(['register', 'signin']),
}));

/**
 * Extends the shape check with a dev-time warning when a single item omits
 * `variant`, since the position-based fallback can't infer it correctly.
 */
const itemsWithVariantWarning = (props, propName, componentName, ...rest) => {
  const shapeError = itemsArrayShape(props, propName, componentName, ...rest);
  if (shapeError) {
    return shapeError;
  }
  const items = props[propName];
  if (Array.isArray(items) && items.length === 1 && !items[0].variant) {
    return new Error(
      `Invalid prop \`${propName}\` supplied to \`${componentName}\`: a single entry with no `
      + '`variant` renders as the outlined (register) style by default, since "last of the list" and '
      + '"the only item" look identical from position alone. Set `variant: \'signin\'` explicitly if '
      + 'this one item should be the primary (filled) action instead.',
    );
  }
  return null;
};

export const siteLoggedOutItemsDataShape = itemsArrayShape;

SiteLoggedOutItems.propTypes = {
  items: itemsWithVariantWarning,
};

SiteLoggedOutItems.defaultProps = {
  items: [],
};

export default SiteLoggedOutItems;
