/** Tiny HTML helpers shared by every template. */

const ENTITIES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

/** Escape text for use in HTML content or a quoted attribute. */
export const esc = (value) =>
  String(value ?? '').replace(/[&<>"']/g, (ch) => ENTITIES[ch]);

/**
 * Escape a URL for an href/src attribute, percent-encoding characters that are
 * not legal in a URL (several asset filenames contain spaces).
 */
export const escUrl = (value) => {
  const raw = String(value ?? '');
  const encoded = /^(https?:|mailto:|#|\/\/)/i.test(raw) ? raw : encodeURI(raw);
  return esc(encoded);
};

/**
 * Join the rendered parts, dropping anything empty.
 *
 * Templates use `cond && html`, so a part can be any falsy value — including
 * the number 0 from `array.length &&` on an empty array. Everything that is
 * meant to be rendered is a non-empty string, so filtering on truthiness is
 * both correct and the only thing that keeps a stray "0" off the page.
 */
export const join = (parts, separator = '\n') => parts.filter(Boolean).join(separator);

/** Render `items` with `fn`, or nothing at all when the list is empty. */
export const list = (items, fn) => (Array.isArray(items) && items.length ? join(items.map(fn)) : '');

/** Zero-padded index: 1 -> "01". */
export const pad = (n) => String(n).padStart(2, '0');
