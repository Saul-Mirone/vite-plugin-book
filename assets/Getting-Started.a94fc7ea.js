var n=`# Getting Started

> Install guide

## Install

\`\`\`bash
npm install vite-plugin-book
\`\`\`

## Enable in Config

In \`vite.config.ts\`:

\`\`\`typescript
// vite.config.ts
import { book } from 'vite-plugin-book/vite';

export default defineConfig({
    plugins: [book()],
});
\`\`\`

## See the Editor

When running \`vite\`, you can see hint messages like this:

\`\`\`bash
vite dev server running at:

> Local: http://localhost:3000/
> Network: use \`--host\` to expose

ready in XXXms.

> Book Admin: http://localhost:3000/__vite_plugin_book__/
> Book Preview: http://localhost:3000/__vite_plugin_book__/__preview__/
\`\`\`

You can visit the **Book Admin** to write and manage your book. And preview it in **Book Preview**.

## Render in Production

In your code entry:

> It's \`main.ts\` by default.

\`\`\`typescript
// Don't forget to import css!
import 'vite-plugin-book/style.css';

import { renderBook } from 'vite-plugin-book';

renderBook({
    isProd: import.$META_ENV$.PROD,
    baseUrl: import.$META_ENV$.BASE_URL,
    container: '#app',
});
\`\`\`

Then you can preview the result through:

\`\`\`bash
npx vite build
npx vite preview
\`\`\`
`;export{n as default};
