/** Display formatting shared by the templates. */

/**
 * Numbers written with thousand separators, e.g. "1,000" or "12,500".
 * The separator is what makes a figure a figure: it keeps years (2025),
 * ratings (4.4 / 5), version numbers and page numbers out of the way.
 */
const THOUSANDS = /\d{1,3}(?:,\d{3})+/g;

/**
 * Abbreviate large numbers for display: 1,000 -> 1k, 1,500 -> 1.5k,
 * 10,000 -> 10k. Content files keep the real figure, so nothing is lost from
 * the data — only the rendered string is shortened.
 *
 * Anything attached to the number is left alone, so "1,000+" becomes "1k+"
 * and an exact figure never gains a "+" it did not have.
 *
 * The value is truncated rather than rounded (1,750 -> 1.7k), so shortening a
 * figure can never overstate it.
 */
export function abbreviateThousands(text) {
  if (typeof text !== 'string') return text;
  return text.replace(THOUSANDS, (match) => {
    const value = Number(match.replace(/,/g, ''));
    if (!Number.isFinite(value) || value < 1000) return match;
    const tenths = Math.floor(value / 100) / 10;
    return `${Number.isInteger(tenths) ? tenths : tenths.toFixed(1)}k`;
  });
}
