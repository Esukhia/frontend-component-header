import { FALLBACK_LANGUAGE_CODES, NATIVE_LANGUAGE_NAMES } from './languages';

/**
 * Matches strings that open with a Latin letter: basic Latin plus the Latin-1
 * Supplement and Latin Extended-A/B blocks, so accented names still qualify.
 */
const STARTS_WITH_LATIN = /^[A-Za-zÀ-ɏ]/;

/**
 * Initials for the profile avatar. Returns null (caller falls back to a generic
 * icon) for non-Latin scripts, where a single glyph doesn't read as an initial,
 * or when there's neither a name nor a username.
 * @param {string} name the account's full name, may be empty
 * @param {string} username the account's username, used when there is no name
 * @returns {string|null} one or two uppercase letters, or null
 */
const getInitials = (name, username) => {
  const fullName = (name || '').trim();
  if (fullName) {
    if (!STARTS_WITH_LATIN.test(fullName)) {
      return null;
    }
    const words = fullName.split(/\s+/).filter(Boolean);
    const first = words[0][0];
    // A single-word name contributes one letter rather than doubling up.
    const last = words.length > 1 ? words[words.length - 1][0] : '';
    return `${first}${last}`.toUpperCase();
  }
  const handle = (username || '').trim();
  if (!handle || !STARTS_WITH_LATIN.test(handle)) {
    return null;
  }
  return handle[0].toUpperCase();
};
export default getInitials;

/**
 * The name to show for a locale the platform released. Falls back to the browser's
 * Intl.DisplayNames endonym, then the bare code, for a locale not in our map.
 * @param {string} code a lowercase, hyphenated locale code
 * @returns {string} a human-readable name, never empty
 */
const nativeNameFor = code => {
  const mapped = NATIVE_LANGUAGE_NAMES[code];
  if (mapped) {
    return mapped;
  }
  try {
    const endonym = new Intl.DisplayNames([code], {
      type: 'language'
    }).of(code);
    // DisplayNames echoes the input back when it has no data for the locale.
    if (endonym && endonym.toLowerCase() !== code) {
      return endonym;
    }
  } catch (error) {
    // Unparseable code, or ICU data missing from this runtime.
  }
  return code.toUpperCase();
};

/**
 * The languages to offer in the header menu. Accepts bare codes or `{ code, name }`
 * objects from the config API, ignoring any `name` in favor of our native-name map,
 * and falls back to the built-in codes when the list is empty.
 * @param {Array<string|{code: string}>} configLanguages RELEASED_LANGUAGES, possibly undefined
 * @returns {Array<{code: string, native: string}>}
 */
export const resolveHeaderLanguages = configLanguages => {
  const codes = (Array.isArray(configLanguages) ? configLanguages : []).map(entry => typeof entry === 'string' ? entry : entry && entry.code).filter(code => typeof code === 'string' && code.trim()).map(code => code.trim().toLowerCase());
  const unique = [...new Set(codes)];
  const source = unique.length ? unique : FALLBACK_LANGUAGE_CODES;
  return source.map(code => ({
    code,
    native: nativeNameFor(code)
  }));
};

/**
 * Which menu row, if any, corresponds to the given locale. Matches exactly, then
 * across bare/regional variants; returns null rather than guessing wrong.
 * @param {string} locale the locale to look for
 * @param {Array<{code: string}>} languages the rows on offer
 * @returns {string|null} the matching row's code, or null
 */
export const matchActiveLanguage = (locale, languages) => {
  const target = (locale || '').trim().toLowerCase();
  if (!target) {
    return null;
  }
  const codes = (languages || []).map(({
    code
  }) => code);
  const exact = codes.find(code => code === target);
  if (exact) {
    return exact;
  }
  const primary = target.split('-')[0];
  // 'es-419' wanted, only 'es' offered.
  const bare = codes.find(code => code === primary);
  if (bare) {
    return bare;
  }
  // 'es' wanted, only 'es-419' offered - the first such row wins.
  return codes.find(code => code.split('-')[0] === primary) || null;
};

/**
 * The language the visitor has actually asked for, straight from the cookie. Read
 * directly rather than via getLocale(), which collapses untranslated locales to
 * English and would un-tick the row the visitor just chose.
 * @param {string} cookieName LANGUAGE_PREFERENCE_COOKIE_NAME from the app config
 * @returns {string|null} the preferred locale, or null when nothing is stored
 */
export const readLanguageCookie = cookieName => {
  if (typeof document === 'undefined' || !cookieName) {
    return null;
  }
  // cookieName is a config value, not a literal - a name containing a regex
  // metacharacter (a stray '(' is enough) would otherwise throw on every render.
  const escapedName = cookieName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${escapedName}=([^;]*)`));
  return match ? decodeURIComponent(match[1]).trim().toLowerCase() : null;
};
//# sourceMappingURL=utils.js.map