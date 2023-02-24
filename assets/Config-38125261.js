const n=`# Config

You can provide several configs when using this plugin like this:

\`\`\`typescript
// vite.config.ts
import { book } from 'vite-plugin-book/vite';

export default defineConfig({
    plugins: [
        book({
            name: 'My Book',
            path: 'site',
            repo: 'https://github.com/Saul-Mirone/vite-plugin-book',
        }),
    ],
});
\`\`\`

## Name

You can provide your book name. It's \`vite-book\` by default.

## Path

The relative path of documentation directory. It's \`docs\` by default.

## Repo

The repository link of current project. It's empty by default.
`;export{n as default};
