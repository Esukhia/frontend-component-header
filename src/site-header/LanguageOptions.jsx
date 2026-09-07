import React, { useContext } from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';

import { MenuContext } from '../Menu';
import { TickIcon } from './icons';
import useLanguageSelection from './useLanguageSelection';
import messages from '../Header.messages';

/**
 * Heading plus language rows, shared by the wide-screen globe menu and the mobile
 * burger menu so the two never drift apart. Takes no props; reads everything it
 * needs from context so both parents stay free of language plumbing.
 */
const LanguageOptions = () => {
  const intl = useIntl();
  const menu = useContext(MenuContext);
  const {
    languages, activeCode, pendingCode, isBusy, selectLanguage,
  } = useLanguageSelection({ onSwitched: menu ? menu.close : undefined });

  return (
    <>
      <div className="nav-menu-label">
        {intl.formatMessage(messages['header.label.language.heading'])}
      </div>
      {languages.map(({ code, native }) => (
        <button
          key={code}
          type="button"
          className="nav-menu-item"
          role="menuitemradio"
          aria-checked={code === activeCode}
          aria-busy={code === pendingCode || undefined}
          disabled={isBusy}
          lang={code}
          data-code={code}
          onClick={() => selectLanguage(code)}
        >
          <span className="lang-native">{native}</span>
          <TickIcon className="lang-tick" />
        </button>
      ))}
    </>
  );
};

export default LanguageOptions;
