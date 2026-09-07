/**
 * Native names for the locales the platform can serve, keyed by lowercase hyphenated
 * code. Names are shown in their own script with no English gloss, unlike the
 * platform's `settings.LANGUAGES` values.
 */
export const NATIVE_LANGUAGE_NAMES = {
  ar: 'العربية',
  bo: 'བོད་ཡིག',
  cs: 'Čeština',
  da: 'Dansk',
  de: 'Deutsch',
  'de-de': 'Deutsch',
  el: 'Ελληνικά',
  en: 'English',
  es: 'Español',
  'es-419': 'Español (Latinoamérica)',
  'es-es': 'Español (España)',
  fa: 'فارسی',
  'fa-ir': 'فارسی',
  fr: 'Français',
  'fr-ca': 'Français (Canada)',
  he: 'עברית',
  hi: 'हिन्दी',
  id: 'Bahasa Indonesia',
  it: 'Italiano',
  'it-it': 'Italiano',
  ja: '日本語',
  'ko-kr': '한국어',
  lv: 'Latviešu',
  pl: 'Polski',
  pt: 'Português',
  'pt-br': 'Português (Brasil)',
  'pt-pt': 'Português',
  ro: 'Română',
  ru: 'Русский',
  sl: 'Slovenščina',
  sw: 'Kiswahili',
  te: 'తెలుగు',
  th: 'ไทย',
  tr: 'Türkçe',
  'tr-tr': 'Türkçe',
  uk: 'Українська',
  uz: 'Oʻzbekcha',
  vi: 'Tiếng Việt',
  zh: '中文',
  'zh-cn': '中文 (简体)',
  'zh-hk': '中文 (香港)',
  'zh-tw': '中文 (繁體)'
};

/** Fallback when the platform hasn't told us which languages are released. */
export const FALLBACK_LANGUAGE_CODES = ['en', 'bo', 'es-419', 'fr', 'id', 'vi', 'zh-cn'];
//# sourceMappingURL=languages.js.map