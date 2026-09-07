import React from 'react';
import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import messages from './messages';
const LearningHeaderHelpLink = () => {
  const intl = useIntl();
  const supportUrl = getConfig().SUPPORT_URL;

  // No support URL configured means no link, rather than a styled control that goes nowhere.
  if (!supportUrl) {
    return null;
  }
  return /*#__PURE__*/React.createElement("a", {
    className: "nav-help",
    href: supportUrl
  }, intl.formatMessage(messages.help));
};
export default LearningHeaderHelpLink;
//# sourceMappingURL=LearningHeaderHelpLink.js.map