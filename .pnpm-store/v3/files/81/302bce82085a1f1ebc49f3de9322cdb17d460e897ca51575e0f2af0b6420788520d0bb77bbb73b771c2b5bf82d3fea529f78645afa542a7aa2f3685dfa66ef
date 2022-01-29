/**
 * @typedef {import('mdast').Root} Root
 * @typedef {import('mdast').Image} Image
 * @typedef {import('mdast').Link} Link
 */

import {visit, SKIP} from 'unist-util-visit'
import {definitions} from 'mdast-util-definitions'

/**
 * Plugin to transform references and definitions into normal links and images.
 *
 * @type {import('unified').Plugin<void[], Root>}
 */
export default function remarkInlineLinks() {
  return (tree) => {
    const definition = definitions(tree)

    visit(tree, (node, index, parent) => {
      if (
        node.type === 'definition' &&
        parent !== null &&
        typeof index === 'number'
      ) {
        parent.children.splice(index, 1)
        return [SKIP, index]
      }

      if (node.type === 'imageReference' || node.type === 'linkReference') {
        const def = definition(node.identifier)

        if (def && parent !== null && typeof index === 'number') {
          /** @type {Image|Link} */
          const replacement =
            node.type === 'imageReference'
              ? {type: 'image', url: def.url, title: def.title, alt: node.alt}
              : {
                  type: 'link',
                  url: def.url,
                  title: def.title,
                  children: node.children
                }

          parent.children[index] = replacement
          return [SKIP, index]
        }
      }
    })
  }
}
