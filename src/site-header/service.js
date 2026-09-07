import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

/**
 * Writes the shared language cookie every Open edX app reads. `isPublic` lets this work
 * signed out (skips the JWT refresh) while still running the required CSRF interceptor.
 * @param {string} code the locale to switch to
 * @returns {Promise}
 */
export const postSetLang = (code) => {
  const formData = new FormData();
  formData.append('language', code);

  return getAuthenticatedHttpClient().post(
    `${getConfig().LMS_BASE_URL}/i18n/setlang/`,
    formData,
    {
      isPublic: true,
      headers: {
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
    },
  );
};

/**
 * Records the language preference on the account so it follows the learner to other
 * browsers; the current session's language is set by postSetLang, not this.
 * @param {string} username the signed-in user
 * @param {string} code the locale to store
 * @returns {Promise}
 */
export const patchLanguagePreference = (username, code) => getAuthenticatedHttpClient().patch(
  `${getConfig().LMS_BASE_URL}/api/user/v1/preferences/${username}`,
  { 'pref-lang': code },
  { headers: { 'Content-Type': 'application/merge-patch+json' } },
);
