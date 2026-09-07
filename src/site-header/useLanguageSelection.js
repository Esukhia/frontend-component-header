import {
  useCallback, useContext, useMemo, useRef, useState,
} from 'react';
import { getConfig, publish } from '@edx/frontend-platform';
import { AppContext } from '@edx/frontend-platform/react';
import { logError } from '@edx/frontend-platform/logging';
import {
  getLocale, handleRtl, useIntl, LOCALE_CHANGED,
} from '@edx/frontend-platform/i18n';

import { matchActiveLanguage, readLanguageCookie, resolveHeaderLanguages } from './utils';
import { patchLanguagePreference, postSetLang } from './service';

/**
 * The language list, which one is current, and how to change it. Switching doesn't
 * reload the page: publishing LOCALE_CHANGED makes AppProvider swap the IntlProvider's
 * locale in place.
 * @param {object} [options]
 * @param {Function} [options.onSwitched] called once the language has actually changed
 */
const useLanguageSelection = ({ onSwitched } = {}) => {
  const intl = useIntl();
  const { authenticatedUser } = useContext(AppContext);
  const [selectedCode, setSelectedCode] = useState(null);
  const [pendingCode, setPendingCode] = useState(null);
  // Ref, not state: avoids two clicks in the same tick both reading stale state.
  const inFlight = useRef(false);

  const { RELEASED_LANGUAGES, LANGUAGE_PREFERENCE_COOKIE_NAME } = getConfig();

  const languages = useMemo(
    () => resolveHeaderLanguages(RELEASED_LANGUAGES),
    [RELEASED_LANGUAGES],
  );

  // selectedCode wins so the tick moves immediately on switch, without waiting on the cookie.
  const activeCode = selectedCode ?? matchActiveLanguage(
    readLanguageCookie(LANGUAGE_PREFERENCE_COOKIE_NAME) || intl.locale,
    languages,
  );

  const selectLanguage = useCallback(async (code) => {
    if (inFlight.current) {
      return;
    }
    if (code === activeCode) {
      if (onSwitched) { onSwitched(); }
      return;
    }

    inFlight.current = true;
    setPendingCode(code);

    try {
      if (authenticatedUser && authenticatedUser.username) {
        try {
          await patchLanguagePreference(authenticatedUser.username, code);
        } catch (error) {
          // Don't block the local switch just because the cross-device save failed.
          logError(error);
        }
      }

      await postSetLang(code);

      setSelectedCode(code);
      // getLocale() reports what will actually render (may fall back to English).
      publish(LOCALE_CHANGED, getLocale());
      handleRtl();
      if (onSwitched) { onSwitched(); }
    } catch (error) {
      // Leave the menu on the current language so the visitor can retry.
      logError(error);
    } finally {
      inFlight.current = false;
      setPendingCode(null);
    }
  }, [activeCode, authenticatedUser, onSwitched]);

  return {
    languages,
    activeCode,
    pendingCode,
    isBusy: pendingCode !== null,
    selectLanguage,
  };
};

export default useLanguageSelection;
