# Abhay Bhatia Portfolio

A React/Vite portfolio for a Java full-stack developer. It uses an accessible liquid-glass visual system, responsive layout, light/dark themes, and reduced-motion support.

## Architecture

- **Vite + React:** optimized static builds and a fast local development experience.
- **Data-driven UI:** projects, skills, timeline, and copy live in `src/App.jsx`.
- **Design tokens:** theme colors and responsive styles are centralized in `src/styles.css`.
- **Deployment:** the GitHub Actions workflow builds and deploys the app to GitHub Pages.

## Develop

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Customize

Edit `src/App.jsx` to update résumé content, projects, GitHub/live-demo links, and skills. Change `--a` and `--b` in `src/styles.css` to retheme the accents. The Vite `base` in `vite.config.js` must match this repository name for project-page deployment.

## Deploy

Merge this branch into `main`, then select **GitHub Actions** under **Settings → Pages**. Every push to `main` will publish the production build.