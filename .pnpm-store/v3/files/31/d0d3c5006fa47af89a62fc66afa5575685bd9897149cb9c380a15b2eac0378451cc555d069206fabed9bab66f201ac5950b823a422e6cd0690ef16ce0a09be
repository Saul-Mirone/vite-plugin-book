# mdast-util-math

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

Extension for [`mdast-util-from-markdown`][from-markdown] and/or
[`mdast-util-to-markdown`][to-markdown] to support math in **[mdast][]**.
When parsing (`from-markdown`), must be combined with
[`micromark-extension-math`][extension].

## When to use this

Use this if you’re dealing with the AST manually.
It might be better to use [`remark-math`][remark-math] with **[remark][]**,
which includes this but provides a nicer interface and makes it easier to
combine with hundreds of plugins.

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c):
Node 12+ is needed to use it and it must be `import`ed instead of `require`d.

[npm][]:

```sh
npm install mdast-util-math
```

## Use

Say we have the following file, `example.md`:

```markdown
Lift($L$) can be determined by Lift Coefficient ($C_L$) like the following equation.

$$
L = \frac{1}{2} \rho v^2 S C_L
$$
```

And our module, `example.js`, looks as follows:

```js
import fs from 'node:fs'
import {fromMarkdown} from 'mdast-util-from-markdown'
import {toMarkdown} from 'mdast-util-to-markdown'
import {math} from 'micromark-extension-math'
import {mathFromMarkdown, mathToMarkdown} from 'mdast-util-math'

const doc = fs.readFileSync('example.md')

const tree = fromMarkdown(doc, {
  extensions: [math()],
  mdastExtensions: [mathFromMarkdown()]
})

console.log(tree)

const out = toMarkdown(tree, {extensions: [mathToMarkdown()]})

console.log(out)
```

Now, running `node example` yields (positional info removed for brevity):

```js
{
  type: 'root',
  children: [
    {
      type: 'paragraph',
      children: [
        {type: 'text', value: 'Lift('},
        {type: 'inlineMath', value: 'L', data: {/* … */}},
        {type: 'text', value: ') can be determined by Lift Coefficient ('},
        {type: 'inlineMath', e: 'C_L', data: {/* … */}},
        {type: 'text', value: ') like the following equation.'}
      ]
    },
    {type: 'math', meta: null, value: 'L = \\frac{1}{2} \\rho v^2 S C_L', data: {/* … */}}
  ]
}
```

```markdown
Lift($L$) can be determined by Lift Coefficient ($C_L$) like the following equation.

$$
L = \frac{1}{2} \rho v^2 S C_L
$$
```

## API

This package exports the following identifiers: `mathFromMarkdown`,
`mathToMarkdown`.
There is no default export.

### `mathFromMarkdown()`

### `mathToMarkdown(toOptions?)`

Support math.
These exports are functions that create extensions, respectively for
[`mdast-util-from-markdown`][from-markdown] and
[`mdast-util-to-markdown`][to-markdown].

##### `toOptions`

###### `toOptions.singleDollarTextMath`

Whether to support math (text) with a single dollar (`boolean`, default:
`true`).
Single dollars work in Pandoc and many other places, but often interfere with
“normal” dollars in text.

## Related

*   [`remarkjs/remark`][remark]
    — markdown processor powered by plugins
*   [`remarkjs/remark-math`][remark-math]
    — remark plugin to support math
*   [`micromark/micromark`][micromark]
    — the smallest commonmark compliant markdown parser that exists
*   [`micromark/micromark-extension-math`][extension]
    — micromark extension to parse math
*   [`syntax-tree/mdast-util-from-markdown`][from-markdown]
    — mdast parser using `micromark` to create mdast from markdown
*   [`syntax-tree/mdast-util-to-markdown`][to-markdown]
    — mdast serializer to create markdown from mdast

## Contribute

See [`contributing.md` in `syntax-tree/.github`][contributing] for ways to get
started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/syntax-tree/mdast-util-math/workflows/main/badge.svg

[build]: https://github.com/syntax-tree/mdast-util-math/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/syntax-tree/mdast-util-math.svg

[coverage]: https://codecov.io/github/syntax-tree/mdast-util-math

[downloads-badge]: https://img.shields.io/npm/dm/mdast-util-math.svg

[downloads]: https://www.npmjs.com/package/mdast-util-math

[size-badge]: https://img.shields.io/bundlephobia/minzip/mdast-util-math.svg

[size]: https://bundlephobia.com/result?p=mdast-util-math

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/syntax-tree/unist/discussions

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com

[contributing]: https://github.com/syntax-tree/.github/blob/HEAD/contributing.md

[support]: https://github.com/syntax-tree/.github/blob/HEAD/support.md

[coc]: https://github.com/syntax-tree/.github/blob/HEAD/code-of-conduct.md

[mdast]: https://github.com/syntax-tree/mdast

[remark]: https://github.com/remarkjs/remark

[remark-math]: https://github.com/remarkjs/remark-math

[from-markdown]: https://github.com/syntax-tree/mdast-util-from-markdown

[to-markdown]: https://github.com/syntax-tree/mdast-util-to-markdown

[micromark]: https://github.com/micromark/micromark

[extension]: https://github.com/micromark/micromark-extension-math
