import React from 'react';

import { getConfig } from '@edx/frontend-platform';
import { getLoginRedirectUrl } from '@edx/frontend-platform/auth';
import { useIntl } from '@edx/frontend-platform/i18n';
import LearningLoggedOutItemsSlot from '../plugin-slots/LearningLoggedOutItemsSlot';

import genericMessages from '../generic/messages';

/**
 * Register/sign-in items shared by the wide layout's buttons and the burger menu.
 * A hook (not a plain function) because it needs `useIntl`.
 */
export const useLoggedOutItems = () => {
  const intl = useIntl();

  // Register comes first, matching the design; `variant` marks the primary action.
  return [
    {
      type: 'item',
      content: intl.formatMessage(genericMessages.registerSentenceCase),
      href: `${getConfig().LMS_BASE_URL}/register?next=${encodeURIComponent(global.location.href)}`,
      iconName: 'register',
      variant: 'register',
    },
    {
      type: 'item',
      content: intl.formatMessage(genericMessages.signInSentenceCase),
      href: getLoginRedirectUrl(global.location.href),
      iconName: 'login',
      variant: 'signin',
    },
  ];
};

const AnonymousUserMenu = () => {
  const buttonsInfo = useLoggedOutItems();

  return <LearningLoggedOutItemsSlot buttonsInfo={buttonsInfo} />;
};

export default AnonymousUserMenu;
