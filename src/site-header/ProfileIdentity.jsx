import React from 'react';
import PropTypes from 'prop-types';

import ProfileAvatar from './ProfileAvatar';

/**
 * Non-interactive name/email row at the top of the account menu; both lines
 * truncate instead of wrapping.
 */
const ProfileIdentity = ({
  name, email, username, avatar, avatarLoading, initials,
}) => (
  <div className="nav-menu-id">
    <span className="nav-menu-id-avatar">
      <ProfileAvatar src={avatar} initials={initials} loading={avatarLoading} />
    </span>
    <span className="nav-menu-id-text">
      <span className="nav-menu-id-name">{name || username}</span>
      {email && <span className="nav-menu-id-email">{email}</span>}
    </span>
  </div>
);

ProfileIdentity.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  username: PropTypes.string,
  avatar: PropTypes.string,
  avatarLoading: PropTypes.bool,
  initials: PropTypes.string,
};

ProfileIdentity.defaultProps = {
  name: null,
  email: null,
  username: null,
  avatar: null,
  avatarLoading: false,
  initials: null,
};

export default ProfileIdentity;
