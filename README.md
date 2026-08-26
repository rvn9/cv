# cv

Personal portfolio / CV site for Andreas Agustinus, built with Vue 3 and Vite.

**Live:** https://rvn9.github.io/cv/

## Stack

- [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`)
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/) v4

## Development

```bash
npm install
npm run dev      # start dev server
npm run build    # production build -> dist/
npm run preview  # preview the production build locally
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the
app and publishes `dist/` to GitHub Pages via GitHub Actions.

The Vite `base` in `vite.config.js` is set to `/cv/` to match this repo's
GitHub Pages project path (`https://rvn9.github.io/cv/`). Asset URLs in
components use `import.meta.env.BASE_URL` rather than hardcoded absolute
paths, so they resolve correctly under that subpath.
