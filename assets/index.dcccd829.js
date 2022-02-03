var n=`# Vite Plugin Book

> A magical vite plugin that helps you to generate and manage documentation website.

A magical vite plugin that helps you to generate and manage documentation website.

## Feature

-   Auto generate documentation website.

-   Manage documentations just in browser.

-   Write document in a WYSIWYG way.

## Usage

### Install

\`\`\`bash
npm install vite-plugin-book
\`\`\`

### Enable in Config

In \`vite.config.ts\`:

\`\`\`typescript
import { book } from 'vite-plugin-book/vite';

export default defineConfig({
    plugins: [book()],
});
\`\`\`

### See the Editor

When running \`vite\`, you can see hint messages like this:

\`\`\`bash
vite v2.7.13 dev server running at:

> Local: http://localhost:3000/
> Network: use \`--host\` to expose

ready in 165ms.

> Book Admin: http://localhost:3000/__vite_plugin_book__/
> Book Preview: http://localhost:3000/__vite_plugin_book__/__preview__/
\`\`\`

You can visit the **Book Admin** to write and manage your book. And preview it in **Book Preview**.

### Render in Production

In your code entry:

> It's \`main.ts\` by default.

\`\`\`typescript
import { renderBook } from 'vite-plugin-book';

renderBook(true, document.getElementById('app'));
\`\`\`

Then you can preview the result through:

\`\`\`bash
npx vite build
npx vite preview
\`\`\`

# License

[MIT](/LICENSE)
`;export{n as default};
