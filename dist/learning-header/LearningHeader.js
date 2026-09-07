import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { getConfig } from '@edx/frontend-platform';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';
import AnonymousUserMenu, { useLoggedOutItems } from './AnonymousUserMenu';
import LogoSlot from '../plugin-slots/LogoSlot';
import CourseInfoSlot from '../plugin-slots/CourseInfoSlot';
import LearningHelpSlot from '../plugin-slots/LearningHelpSlot';
import LearningUserMenuSlot from '../plugin-slots/LearningUserMenuSlot';
import LanguageMenu from '../site-header/LanguageMenu';
import ProfileMenu from '../site-header/ProfileMenu';
import MobileNavMenu from '../site-header/MobileNavMenu';
import { courseInfoDataShape } from './LearningHeaderCourseInfo';
import useAccount from '../useAccount';
import UserbackWidget from '../UserbackWidget';
import messages from './messages';

/**
 * The course player's header. Shares its shell and controls with `SiteHeader`
 * (`../site-header/`); only the course title differs from the nav links there.
 * Styling comes from `@edx/brand/paragon/header`, which an app must import.
 */
const LearningHeader = _ref => {
  let {
    courseOrg,
    courseNumber,
    courseTitle,
    intl,
    showUserDropdown
  } = _ref;
  const {
    authenticatedUser
  } = useContext(AppContext);
  const account = useAccount();
  const loggedOutItems = useLoggedOutItems();
  const loggedIn = authenticatedUser !== null;

  // Help row for the burger menu, shown under the same condition as the wide
  // layout's LearningHelpSlot.
  const supportUrl = getConfig().SUPPORT_URL;
  const helpNavItems = loggedIn && supportUrl ? [{
    content: intl.formatMessage(messages.help),
    href: supportUrl
  }] : [];

  // Two groups so sign out is drawn with a separator above it. `iconName` is a
  // hint string (not a component import) so slot consumers don't need this package.
  const userMenu = !loggedIn ? [] : [{
    heading: '',
    items: [{
      type: 'item',
      href: `${getConfig().LMS_BASE_URL}/dashboard`,
      content: intl.formatMessage(messages.dashboard),
      iconName: 'dashboard'
    }, {
      type: 'item',
      href: `${getConfig().ACCOUNT_PROFILE_URL}/u/${authenticatedUser.username}`,
      content: intl.formatMessage(messages.profile),
      iconName: 'profile'
    }, {
      type: 'item',
      href: getConfig().ACCOUNT_SETTINGS_URL,
      content: intl.formatMessage(messages.account),
      iconName: 'account'
    }
    // Order History link removed
    // Uncomment the following lines if you want to re-enable Order History
    // ...(getConfig().ORDER_HISTORY_URL ? [{
    //   type: 'item',
    //   href: getConfig().ORDER_HISTORY_URL,
    //   content: intl.formatMessage(messages.orderHistory),
    // }] : []),
    ]
  }, {
    heading: '',
    items: [{
      type: 'item',
      href: getConfig().LOGOUT_URL,
      content: intl.formatMessage(messages.signOut),
      iconName: 'signout'
    }]
  }];
  return /*#__PURE__*/React.createElement("header", {
    className: "site-nav site-nav-learning learning-header"
  }, /*#__PURE__*/React.createElement("a", {
    className: "nav-skip sr-only sr-only-focusable",
    href: "#main-content"
  }, intl.formatMessage(messages.skipNavLink)), /*#__PURE__*/React.createElement("div", {
    className: "nav-left"
  }, /*#__PURE__*/React.createElement(LogoSlot, {
    href: `${getConfig().LMS_BASE_URL}`,
    src: getConfig().LOGO_URL,
    alt: getConfig().SITE_NAME,
    className: "nav-brand nav-brand-learning"
  }), /*#__PURE__*/React.createElement("div", {
    className: "nav-course-title course-title-lockup"
  }, /*#__PURE__*/React.createElement(CourseInfoSlot, {
    courseOrg: courseOrg,
    courseNumber: courseNumber,
    courseTitle: courseTitle
  }))), showUserDropdown && /*#__PURE__*/React.createElement("div", {
    className: "nav-actions"
  }, loggedIn && /*#__PURE__*/React.createElement(LearningHelpSlot, null), /*#__PURE__*/React.createElement(LanguageMenu, null), loggedIn ? /*#__PURE__*/React.createElement(ProfileMenu, {
    menu: userMenu,
    avatar: account.avatar,
    avatarLoading: account.loading,
    username: authenticatedUser.username,
    name: account.name,
    email: account.email
    // The rows go through this header's own slot, so an application
    // customising the learning account menu keeps that extension point.
    ,
    renderItems: menu => /*#__PURE__*/React.createElement(LearningUserMenuSlot, {
      items: menu
    })
  }) : /*#__PURE__*/React.createElement(AnonymousUserMenu, null), /*#__PURE__*/React.createElement(MobileNavMenu, {
    navItems: helpNavItems,
    userMenu: userMenu,
    loggedOutItems: loggedOutItems,
    loggedIn: loggedIn,
    avatar: account.avatar,
    avatarLoading: account.loading,
    username: loggedIn ? authenticatedUser.username : null,
    name: account.name,
    email: account.email
    // Same slot the wide layout's ProfileMenu routes through, so a
    // customised account menu looks the same at every screen width.
    ,
    renderItems: menu => /*#__PURE__*/React.createElement(LearningUserMenuSlot, {
      items: menu
    })
  })), /*#__PURE__*/React.createElement(UserbackWidget, null));
};
LearningHeader.propTypes = {
  courseOrg: courseInfoDataShape.courseOrg,
  courseNumber: courseInfoDataShape.courseNumber,
  courseTitle: courseInfoDataShape.courseTitle,
  intl: intlShape.isRequired,
  showUserDropdown: PropTypes.bool
};
LearningHeader.defaultProps = {
  courseOrg: null,
  courseNumber: null,
  courseTitle: null,
  showUserDropdown: true
};
export default injectIntl(LearningHeader);
//# sourceMappingURL=LearningHeader.js.map