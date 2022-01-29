/**
 * @typedef {import('mdast-util-from-markdown').Extension} FromMarkdownExtension
 * @typedef {import('mdast-util-from-markdown').Handle} FromMarkdownHandle
 * @typedef {import('mdast-util-to-markdown').Options} ToMarkdownExtension
 * @typedef {import('mdast-util-to-markdown').Handle} ToMarkdownHandle
 * @typedef {import('./complex-types').Math} Math
 * @typedef {import('./complex-types').InlineMath} InlineMath
 *
 * @typedef ToOptions
 * @property {boolean} [singleDollarTextMath=true]
 *   Whether to support math (text) with a single dollar (`boolean`, default:
 *   `true`).
 *   Single dollars work in Pandoc and many other places, but often interfere
 *   with “normal” dollars in text.
 */

import {longestStreak} from 'longest-streak'
import {safe} from 'mdast-util-to-markdown/lib/util/safe.js'

/**
 * @returns {FromMarkdownExtension}
 */
export function mathFromMarkdown() {
  return {
    enter: {
      mathFlow: enterMathFlow,
      mathFlowFenceMeta: enterMathFlowMeta,
      mathText: enterMathText
    },
    exit: {
      mathFlow: exitMathFlow,
      mathFlowFence: exitMathFlowFence,
      mathFlowFenceMeta: exitMathFlowMeta,
      mathFlowValue: exitMathData,
      mathText: exitMathText,
      mathTextData: exitMathData
    }
  }

  /** @type {FromMarkdownHandle} */
  function enterMathFlow(token) {
    this.enter(
      {
        type: 'math',
        meta: null,
        value: '',
        data: {
          hName: 'div',
          hProperties: {className: ['math', 'math-display']},
          hChildren: [{type: 'text', value: ''}]
        }
      },
      token
    )
  }

  /** @type {FromMarkdownHandle} */
  function enterMathFlowMeta() {
    this.buffer()
  }

  /** @type {FromMarkdownHandle} */
  function exitMathFlowMeta() {
    const data = this.resume()
    const node = /** @type {Math} */ (this.stack[this.stack.length - 1])
    node.meta = data
  }

  /** @type {FromMarkdownHandle} */
  function exitMathFlowFence() {
    // Exit if this is the closing fence.
    if (this.getData('mathFlowInside')) return
    this.buffer()
    this.setData('mathFlowInside', true)
  }

  /** @type {FromMarkdownHandle} */
  function exitMathFlow(token) {
    const data = this.resume().replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, '')
    const node = /** @type {Math} */ (this.exit(token))
    node.value = data
    // @ts-expect-error: we defined it.
    node.data.hChildren[0].value = data
    this.setData('mathFlowInside')
  }

  /** @type {FromMarkdownHandle} */
  function enterMathText(token) {
    this.enter(
      {
        type: 'inlineMath',
        value: '',
        data: {
          hName: 'span',
          hProperties: {className: ['math', 'math-inline']},
          hChildren: [{type: 'text', value: ''}]
        }
      },
      token
    )
    this.buffer()
  }

  /** @type {FromMarkdownHandle} */
  function exitMathText(token) {
    const data = this.resume()
    const node = /** @type {Math} */ (this.exit(token))
    node.value = data
    // @ts-expect-error: we defined it.
    node.data.hChildren[0].value = data
  }

  /** @type {FromMarkdownHandle} */
  function exitMathData(token) {
    this.config.enter.data.call(this, token)
    this.config.exit.data.call(this, token)
  }
}

/**
 * @param {ToOptions} [options]
 * @returns {ToMarkdownExtension}
 */
export function mathToMarkdown(options = {}) {
  let single = options.singleDollarTextMath

  if (single === null || single === undefined) {
    single = true
  }

  inlineMath.peek = inlineMathPeek

  return {
    unsafe: [
      {character: '\r', inConstruct: ['mathFlowMeta']},
      {character: '\r', inConstruct: ['mathFlowMeta']},
      single
        ? {character: '$', inConstruct: ['mathFlowMeta', 'phrasing']}
        : {
            character: '$',
            after: '\\$',
            inConstruct: ['mathFlowMeta', 'phrasing']
          },
      {atBreak: true, character: '$', after: '\\$'}
    ],
    handlers: {math, inlineMath}
  }

  /**
   * @type {ToMarkdownHandle}
   * @param {Math} node
   */
  function math(node, _, context) {
    const raw = node.value || ''
    const fence = '$'.repeat(Math.max(longestStreak(raw, '$') + 1, 2))
    const exit = context.enter('mathFlow')
    let value = fence

    if (node.meta) {
      const subexit = context.enter('mathFlowMeta')
      value += safe(context, node.meta, {
        before: '$',
        after: ' ',
        encode: ['$']
      })
      subexit()
    }

    value += '\n'

    if (raw) {
      value += raw + '\n'
    }

    value += fence
    exit()
    return value
  }

  /**
   * @type {ToMarkdownHandle}
   * @param {InlineMath} node
   */
  function inlineMath(node) {
    const value = node.value || ''
    let size = 1
    let pad = ''

    if (!single) size++

    // If there is a single dollar sign on its own in the math, use a fence of
    // two.
    // If there are two in a row, use one.
    while (
      new RegExp('(^|[^$])' + '\\$'.repeat(size) + '([^$]|$)').test(value)
    ) {
      size++
    }

    // If this is not just spaces or eols (tabs don’t count), and either the first
    // or last character are a space, eol, or dollar sign, then pad with spaces.
    if (
      /[^ \r\n]/.test(value) &&
      (/[ \r\n$]/.test(value.charAt(0)) ||
        /[ \r\n$]/.test(value.charAt(value.length - 1)))
    ) {
      pad = ' '
    }

    const sequence = '$'.repeat(size)
    return sequence + pad + value + pad + sequence
  }

  /** @type {ToMarkdownHandle} */
  function inlineMathPeek() {
    return '$'
  }
}
