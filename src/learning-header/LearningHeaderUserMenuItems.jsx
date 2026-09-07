import React from 'react';
import PropTypes from 'prop-types';
import { getConfig } from '@edx/frontend-platform';

import { Dropdown } from '@openedx/paragon';

const LearningHeaderUserMenuItems = ({ items }) => items.flatMap((item) => {
  const isSignOut = item.href === getConfig().LOGOUT_URL;
  const key = item.href || item.message;

  if (isSignOut) {
    return [
      <Dropdown.Divider key={`divider-${key}`} />,
      (
        <Dropdown.Item
          key={`item-${key}`}
          href={item.href}
          className="sign-out-item"
        >
          {item.message}
        </Dropdown.Item>
      ),
    ];
  }

  return (
    <Dropdown.Item
      key={key}
      href={item.href}
    >
      {item.message}
    </Dropdown.Item>
  );
});

export const learningHeaderUserMenuDataShape = {
  items: PropTypes.arrayOf(PropTypes.shape({
    message: PropTypes.string,
    href: PropTypes.string,
  })),
};

LearningHeaderUserMenuItems.propTypes = learningHeaderUserMenuDataShape;

export default LearningHeaderUserMenuItems;
