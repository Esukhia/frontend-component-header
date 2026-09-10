import React from 'react';
import PropTypes from 'prop-types';
import { UserIcon } from './icons';

/**
 * Avatar contents (photo, then initials, then a generic icon) for the header
 * trigger and the dropdown identity row; the caller supplies the container.
 */
const ProfileAvatar = ({
  src,
  initials,
  loading
}) => {
  // Avoid flashing initials before the photo loads.
  if (loading) {
    return null;
  }
  if (src) {
    return /*#__PURE__*/React.createElement("img", {
      className: "nav-profile-photo",
      src: src,
      alt: ""
    });
  }
  if (initials) {
    return /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true"
    }, initials);
  }
  return /*#__PURE__*/React.createElement(UserIcon, {
    size: 20
  });
};
ProfileAvatar.propTypes = {
  src: PropTypes.string,
  initials: PropTypes.string,
  loading: PropTypes.bool
};
ProfileAvatar.defaultProps = {
  src: null,
  initials: null,
  loading: false
};
export default ProfileAvatar;
//# sourceMappingURL=ProfileAvatar.js.map