/**
 * @returns {FromMarkdownExtension}
 */
export function mathFromMarkdown(): FromMarkdownExtension
/**
 * @param {ToOptions} [options]
 * @returns {ToMarkdownExtension}
 */
export function mathToMarkdown(
  options?: ToOptions | undefined
): ToMarkdownExtension
export type FromMarkdownExtension = import('mdast-util-from-markdown').Extension
export type FromMarkdownHandle = import('mdast-util-from-markdown').Handle
export type ToMarkdownExtension = import('mdast-util-to-markdown').Options
export type ToMarkdownHandle = import('mdast-util-to-markdown').Handle
export type Math = import('./complex-types').Math
export type InlineMath = import('./complex-types').InlineMath
export type ToOptions = {
  /**
   * Whether to support math (text) with a single dollar (`boolean`, default:
   * `true`).
   * Single dollars work in Pandoc and many other places, but often interfere
   * with “normal” dollars in text.
   */
  singleDollarTextMath?: boolean | undefined
}
