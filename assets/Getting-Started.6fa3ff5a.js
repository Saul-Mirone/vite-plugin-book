var n=`# Getting Started

A magical vite plugin that helps you to generate and manage documentation website.

> \u26A0\uFE0F This project is still WIP. It's a MVP now.
>
> A bunch of new features and improvements will coming soon!

## Feature

-   Auto generate documentation website.

-   Write and manage documentation just in browser.

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

### Create Document Directory

Create a directory called \`doc\` in your **vite root** directory.
Then create a \`index.md\` file with a \`first-page.md\` file.

### See the Editor

When running \`vite\` in \`http://localhost:3000\`,
you can open \`http://localhost:3000/__vite_plugin_book__/\` to see the editor.

You can write in editor and it will write to your local disk **when clicking the save button**.

You can also visit \`http://localhost:3000/__vite_plugin_book__/?preview=1\` to preview the read-only site.

### Render in Production

In your code entry:

> It's \`main.ts\` by default.

\`\`\`typescript
import { renderBook } from 'vite-plugin-book';

renderBook(true, document.getElementById('app'));
\`\`\`

Add following lines in your \`index.html\`'s head attribute:

\`\`\`html
<!-- in head -->
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap"
/>
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" />
<link rel="stylesheet" href="https://unpkg.com/prism-themes/themes/prism-material-light.css" />
\`\`\`

Then you can preview the result through:

\`\`\`bash
npx vite build
npx vite preview
\`\`\`

# License

[MIT](/LICENSE)
`;export{n as default};
