import React, { useId } from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';

import { Menu, MenuTrigger, MenuContent } from '../Menu';
import { GlobeIcon } from './icons';
import LanguageOptions from './LanguageOptions';
import messages from '../Header.messages';

/**
 * Globe button and language list, shown on wide screens (the burger menu covers
 * narrow ones). `Menu` handles open/close behaviour and a11y wiring.
 */
const LanguageMenu = () => {
  const intl = useIntl();
  const triggerId = useId();
  const label = intl.formatMessage(messages['header.label.language.menu']);

  return (
    <Menu className="nav-locale-wrap" transitionClassName="nav-menu-anim" transitionTimeout={160}>
      <MenuTrigger
        tag="button"
        type="button"
        id={triggerId}
        className="nav-locale"
        aria-label={label}
        title={label}
      >
        <GlobeIcon />
      </MenuTrigger>
      <MenuContent className="nav-menu nav-menu-lang" role="menu" aria-labelledby={triggerId}>
        <LanguageOptions />
      </MenuContent>
    </Menu>
  );
};

export default LanguageMenu;
