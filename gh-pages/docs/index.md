# Vite Plugin Book

> A magical vite plugin that helps you to generate and manage documentation website.

A magical vite plugin that helps you to generate and manage documentation website.

## Feature

-   Auto generate documentation website.

-   Write and manage documentation just in browser.

-   Write document in a WYSIWYG way.

## Usage

### Install

```bash
npm install vite-plugin-book
```

### Enable in Config

In `vite.config.ts`:

```typescript
import { book } from 'vite-plugin-book/vite';

export default defineConfig({
    plugins: [book()],
});
```

### See the Editor

When running `vite` in `http://localhost:3000`, you can open `http://localhost:3000/__vite_plugin_book__/` to see the editor.

You can write in editor and it will write to your local disk **when you click the save button**.

You can also visit `http://localhost:3000/__vite_plugin_book__/?preview=1` to preview the read-only site.

### Render in Production

In your code entry:

> It's `main.ts` by default.

```typescript
import { renderBook } from 'vite-plugin-book';

renderBook(import.meta.env.PROD, document.getElementById('app'));
```

Then you can preview the result through:

```bash
npx vite build
npx vite preview
```

# License

[MIT](/LICENSE)
