# Config

You can provide several configs when using this plugin like this:

```typescript
// vite.config.ts
import { book } from 'vite-plugin-book/vite';

export default defineConfig({
    plugins: [
        book({
            name: 'My Book',
            path: 'site',
        }),
    ],
});
```

## Name

You can provide your book name. It's `vite-book` by default.

## Path

The relative path of documentation directory. It's `docs` by default.
