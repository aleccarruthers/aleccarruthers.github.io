# Alec Carruthers

Static personal site at https://aleccarruthers.github.io, built with Astro and handwritten CSS. Astro is the only direct dependency; its exact version and dependency tree are recorded in `package.json` and `package-lock.json`. No client framework, external fonts, analytics, or embeds.

## Local development

Use Node 24 LTS (minimum supported: 22.12.0).

```sh
npm ci
npm run dev
```

Open the local URL printed by Astro, normally http://localhost:4321. Draft blog posts appear only in this development server.

For the production site:

```sh
npm run build
npm run preview
```

Astro 7 runs preview in the background. To stop it, use `npx astro preview stop`.

## Content

- `content/`: private, read-only local resume and original photo. Ignored by Git and never copied into the build. Keep your own backup; a fresh clone will not contain these originals.
- `src/content/profile.json`: bio, education, work, skills, approved profile links, and unresolved TODOs.
- `src/content/publications.json`: resume-sourced citations and their unresolved metadata.
- `src/content/projects/*.md`: project descriptions; frontmatter controls order, featured status, and links.
- `src/content/blog/*.md`: Markdown posts.
- `public/images/profile.jpg`: approved portrait derivative, cropped and resized to 480 × 480 with metadata removed. The resume PDF is not published.

Biographical claims come from the resume and owner clarifications. The owner supplied the AI-GUIDE project link and confirmed the award announcement as August 2026. No current residence, advisor, or publication status has been inferred.

To publish a post, write its content, replace the placeholder title/description, and set:

```yaml
title: Your post title
description: A one-sentence summary.
draft: false
publishedAt: YYYY-MM-DD
```

Replace `YYYY-MM-DD` with the publication date. Drafts default to private and never enter the production routes, RSS, or sitemap. Future-dated posts are excluded until a build on or after their date; there is no scheduled publishing service. Dates display in UTC. RSS carries post summaries and links.

The placeholder is at `/blog/welcome/` during `npm run dev`. It deliberately has no invented publication date. The production blog starts with an empty state and valid empty RSS feed.

## Design and accessibility

Design tokens live in `src/styles/global.css`. Georgia is paired with a system sans-serif; links use a forest-green accent. Pages use semantic landmarks, one main heading, keyboard focus styles, a skip link, and responsive layouts.

The theme button cycles Auto → Light → Dark. Auto follows the system, including changes while the page is open. Manual preferences persist in local storage when available and are applied in the head before styles render. Without JavaScript, pages remain usable and follow the system theme.

## GitHub Pages setup

1. Push `rebuild` when ready and open a pull request into `main`. Pull requests build without deploying; merging to `main` triggers deployment.
2. In the repository, open **Settings → Pages → Build and deployment → Source** and select **GitHub Actions**. Do not select a branch or `/docs` source.
3. Leave **Custom domain** empty for `aleccarruthers.github.io`. The site is served at the domain root; no `base` configuration is needed.
4. If Actions are disabled or restricted, open **Settings → Actions → General** and enable the official `actions/*` and `withastro/action` actions. Repository-wide write permissions are not needed; the deployment job requests Pages and OIDC permissions explicitly.
5. If the existing **github-pages** environment restricts deployment branches, allow `main` in **Settings → Environments → github-pages**.
6. After merging, check **Actions → Build and deploy site**. Keep HTTPS enabled in Pages settings.

The workflow follows the [official Astro GitHub Pages guide](https://docs.astro.build/en/guides/deploy/github/) and uses the official Astro build/upload and GitHub Pages deploy actions. No custom secrets are required. No deployment has been performed by the rebuild itself.

## Verification

The final production build passes. Chrome checks covered home, projects, blog, 404, and the development-only draft at 360px and 1440px in light and dark themes (20 combinations). Checks included horizontal overflow, images, section anchors, page metadata, external asset requests, keyboard focus and activation, theme persistence, system-theme changes, JavaScript disabled, and blocked local storage. No browser script errors were reported.

Text colors meet WCAG AA contrast on both page and notice backgrounds (lowest tested ratio: 5.50:1). Temporary publishing fixtures verified date ordering, XML escaping, generated post routes, and exclusion of drafts and future-dated posts; the fixtures were removed and the final site rebuilt. Source-file SHA-256 hashes remained unchanged. The production output contains neither the source resume nor private contact details.

No Lighthouse score is claimed; these are local build and browser checks. The GitHub Actions workflow still needs its first run after the branch is pushed.

## Open content TODOs

- Optional public location, Scholar, and X links; omitted until supplied.
- Patent status and public identifier; patent entry omitted until confirmed.
- Paper URLs for all three publications, author-asterisk meaning on the first, and venue/status of the catheterization paper.
- Public project/code links and approved images where available; AI-GUIDE already has its supplied project link.
- GeoFlood thesis URL and further technical details.
- Replace the placeholder draft and supply a publication date before publishing.

Find the corresponding explicit markers with `rg 'TODO:' src/content`.
