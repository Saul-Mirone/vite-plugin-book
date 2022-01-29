# remark-inline-links

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

**[remark][]** plugin to change references and definitions into normal
links and images.

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`unified().use(remarkInlineLinks)`](#unifieduseremarkinlinelinks)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Security](#security)
*   [Related](#related)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This package is a [unified][] ([remark][]) plugin to turn references
(`[text][id]`, `![alt][id]`) and definitions (`[id]: url`) into links
(`[text](url)`) and images (`![alt](url)`).

**unified** is a project that transforms content with abstract syntax trees
(ASTs).
**remark** adds support for markdown to unified.
**mdast** is the markdown AST that remark uses.
This is a remark plugin that transforms mdast.

## When should I use this?

This project is useful when you want to transform markdown and prefer that it
uses links and images.
“Normal” links and images are well known whereas references and definitions
are somewhat uncommon.
Long URLs in source code can make reading markdown difficult though.

Two different plugins, [`remark-defsplit`][remark-defsplit] and
[`remark-reference-links`][remark-reference-links], do the inverse: turn
links and images into references and definitions.

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).
In Node.js (version 12.20+, 14.14+, or 16.0+), install with [npm][]:

```sh
npm install remark-inline-links
```

In Deno with [Skypack][]:

```js
import remarkInlineLinks from 'https://cdn.skypack.dev/remark-inline-links@6?dts'
```

In browsers with [Skypack][]:

```html
<script type="module">
  import remarkInlineLinks from 'https://cdn.skypack.dev/remark-inline-links@6?min'
</script>
```

## Use

Say we have the following file `example.md`:

```markdown
[foo], [foo][], [bar][foo].

![foo], ![foo][], ![bar][foo].

[foo]: http://example.com "Example Domain"
```

And our module `example.js` looks as follows:

```js
import {read} from 'to-vfile'
import {remark} from 'remark'
import remarkInlineLinks from 'remark-inline-links'

main()

async function main() {
  const file = await remark()
    .use(remarkInlineLinks)
    .process(await read('example.md'))

  console.log(String(file))
}
```

Now running `node example.js` yields:

```markdown
[foo](http://example.com "Example Domain"), [foo](http://example.com "Example Domain"), [bar](http://example.com "Example Domain").

![foo](http://example.com "Example Domain"), ![foo](http://example.com "Example Domain"), ![bar](http://example.com "Example Domain").
```

## API

This package exports no identifiers.
The default export is `remarkInlineLinks`.

### `unified().use(remarkInlineLinks)`

Plugin to change references and definitions into normal links and images.
There are no options.

## Types

This package is fully typed with [TypeScript][].
There are no extra exported types.

## Compatibility

Projects maintained by the unified collective are compatible with all maintained
versions of Node.js.
As of now, that is Node.js 12.20+, 14.14+, and 16.0+.
Our projects sometimes work with older versions, but this is not guaranteed.

This plugin works with `unified` version 3+ and `remark` version 4+.

## Security

Use of `remark-inline-links` does not involve **[rehype][]** (**[hast][]**) or
user content so there are no openings for [cross-site scripting (XSS)][xss]
attacks.

## Related

*   [`remark-reference-links`][remark-reference-links]
    — change links and images to references with separate definitions,
    w/ IDs based on hostnames of URLs
*   [`remark-defsplit`][remark-defsplit]
    — change links and images to references with separate definitions,
    w/ numeric IDs
*   [`remark-unlink`](https://github.com/remarkjs/remark-unlink)
    — remove all links, references, and definitions

## Contribute

See [`contributing.md`][contributing] in [`remarkjs/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/remarkjs/remark-inline-links/workflows/main/badge.svg

[build]: https://github.com/remarkjs/remark-inline-links/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/remarkjs/remark-inline-links.svg

[coverage]: https://codecov.io/github/remarkjs/remark-inline-links

[downloads-badge]: https://img.shields.io/npm/dm/remark-inline-links.svg

[downloads]: https://www.npmjs.com/package/remark-inline-links

[size-badge]: https://img.shields.io/bundlephobia/minzip/remark-inline-links.svg

[size]: https://bundlephobia.com/result?p=remark-inline-links

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/remarkjs/remark/discussions

[npm]: https://docs.npmjs.com/cli/install

[skypack]: https://www.skypack.dev

[health]: https://github.com/remarkjs/.github

[contributing]: https://github.com/remarkjs/.github/blob/HEAD/contributing.md

[support]: https://github.com/remarkjs/.github/blob/HEAD/support.md

[coc]: https://github.com/remarkjs/.github/blob/HEAD/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[remark]: https://github.com/remarkjs/remark

[unified]: https://github.com/unifiedjs/unified

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting

[typescript]: https://www.typescriptlang.org

[rehype]: https://github.com/rehypejs/rehype

[hast]: https://github.com/syntax-tree/hast

[remark-defsplit]: https://github.com/remarkjs/remark-defsplit

[remark-reference-links]: https://github.com/remarkjs/remark-reference-links
