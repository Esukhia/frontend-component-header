import React from 'react';
import PropTypes from 'prop-types';
import ProfileAvatar from './ProfileAvatar';

/**
 * Non-interactive name/email row at the top of the account menu; both lines
 * truncate instead of wrapping.
 */
const ProfileIdentity = ({
  name,
  email,
  username,
  avatar,
  avatarLoading,
  initials
}) => /*#__PURE__*/React.createElement("div", {
  className: "nav-menu-id"
}, /*#__PURE__*/React.createElement("span", {
  className: "nav-menu-id-avatar"
}, /*#__PURE__*/React.createElement(ProfileAvatar, {
  src: avatar,
  initials: initials,
  loading: avatarLoading
})), /*#__PURE__*/React.createElement("span", {
  className: "nav-menu-id-text"
}, /*#__PURE__*/React.createElement("span", {
  className: "nav-menu-id-name"
}, name || username), email && /*#__PURE__*/React.createElement("span", {
  className: "nav-menu-id-email"
}, email)));
ProfileIdentity.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  username: PropTypes.string,
  avatar: PropTypes.string,
  avatarLoading: PropTypes.bool,
  initials: PropTypes.string
};
ProfileIdentity.defaultProps = {
  name: null,
  email: null,
  username: null,
  avatar: null,
  avatarLoading: false,
  initials: null
};
export default ProfileIdentity;
//# sourceMappingURL=ProfileIdentity.js.map