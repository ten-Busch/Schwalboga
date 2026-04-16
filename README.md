# Friendly Pokemon Tournaments

Static tournament-prep site built for GitHub Pages.

## GitHub Pages deployment

1. Create a GitHub repository and upload this folder.
2. In the repository settings, open `Pages`.
3. Set the source to:
   - Branch: `main`
   - Folder: `/ (root)`
4. Save and wait for GitHub Pages to publish the site.

The site is fully static and is meant to be deployed directly from the repository root.

## Before pushing updates

Rebuild the generated Pokédex data after changing source files like:

- `pokedex.ts`
- `punktekosten.ts`
- `moves.ts`
- `moves_desc.ts`
- `learnsets.ts`
- `abilities_text.ts`
- `typechart.ts`

Run:

```bash
npm run build
```

or:

```bash
node ./scripts/build-pokedex-data.js
```

This updates:

- `data/pokedex-data.js`

## Local preview

You can preview locally with:

```bash
npm run start
```

If `npx serve` is not available, you can use any static file server.

## Notes

- GitHub Pages does not run the build script for you.
- Always commit the updated `data/pokedex-data.js` file when you want the live site to reflect your latest data changes.
