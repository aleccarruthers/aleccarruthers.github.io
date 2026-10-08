# AGENTS.md

Guidance for AI coding agents working in this repository. Read this fully before making changes.

## Project

This is a personal website (about page, projects, and a markdown-based blog) for the owner of this repo. It is a **user site** hosted on GitHub Pages at `https://<username>.github.io`, served from the domain root (no base path). Infer `<username>` from `git remote -v`.

The site is static, fast, text-first, and meant to be maintained by one person with minimal effort for years.

## Stack

- **Astro** (static output only, no SSR, no server runtime)
- **Plain hand-written CSS** in `src/styles/`. No Tailwind, no CSS-in-JS, no UI framework (no React/Vue/Svelte) unless a specific feature truly requires it, and then ask first.
- **Markdown/MDX content collections** for blog posts and structured data (projects, publications) as Markdown or YAML/JSON.
- **Minimal JavaScript**: only for the theme toggle and progressive enhancements. Every page must work with JS disabled.
- **Deployment**: GitHub Actions workflow using the official Astro/GitHub Pages actions. Pages source is set to "GitHub Actions" in repo settings (the owner does this manually).

Do not add a dependency without stating what it is for and why it can't be done in a few lines of code. Prefer zero-dependency solutions. Pin exact versions and commit the lockfile.

## Commands

```bash
npm install        # install dependencies
npm run dev        # local dev server with hot reload
npm run build      # production build into dist/
npm run preview    # serve the production build locally
```

Always run `npm run build` and confirm it succeeds before saying a task is done. If a `check`/`lint` script exists, run it too.

## Repository layout

```
content/          SOURCE MATERIAL from the owner (resume, profile photo). READ-ONLY.
src/
  content.config.ts content collection schemas
  lib/             shared post filtering and XML helpers
  pages/           routes (index, projects, blog, 404, rss.xml, sitemap.xml)
  layouts/         base layout and blog post layout
  components/      small, single-purpose .astro components
  content/         blog posts and structured data (projects, publications, etc.)
  styles/          global.css (design tokens + base) and any page-level CSS
public/            approved public assets only (favicon, optimized images)
.github/workflows/ deploy.yml
AGENTS.md
```

If the layout needs to change, update this section in the same commit.

## Content rules (important)

- `content/` is the single source of truth about the owner. **Never modify or delete anything in it.** Copy or transform what is needed into `src/` or `public/`.
- **Never invent biographical facts**: no employers, titles, dates, degrees, publications, awards, metrics, quotes, or opinions. Every claim on the site must trace back to `content/` or to something the owner told you in this conversation.
- If information is missing, leave a visible `TODO:` marker in the content file (not silently in rendered copy) and list all TODOs in your summary.
- Rewriting for tone and concision is fine; changing the meaning is not. Keep the voice plain, direct, first person, and free of buzzwords and hype.
- **Privacy**: do not publish a phone number, home address, or personal email from the resume unless the owner explicitly says to. Ask before publishing the resume PDF itself.
- Optimize and resize images before committing them (target under ~200 KB for photos). Every image needs meaningful `alt` text.

## Design principles

The look should feel like a thoughtful synthesis of three reference sites, without copying any of them:

1. **Single-page academic home** (nmboffi.github.io): name and photo at the top, a compact row of links (Scholar / GitHub / X / CV), a short dense bio, and anchor-linked sections below. Publications or projects use small thumbnails with a one-line link row (paper / code / blog).
2. **Karpathy-style blog index**: a simple reverse-chronological list of date, title, and one-sentence description. Text-first, tiny header, RSS feed, long-form posts that read comfortably.
3. **Philipp Schmid-style profile card**: a short at-a-glance block (location, role, focus areas) and a "technologies/interests" section grouped by category, plus a theme toggle and a minimal footer with social links.

Concrete requirements:

- Typography carries the design: one high-quality font pairing at most, self-hosted or a system font stack (no runtime requests to third-party font CDNs), comfortable line length (~65ch), generous line height.
- Restrained palette defined as CSS custom properties. One accent color. Light and dark themes: respect `prefers-color-scheme` by default, with a manual toggle that persists in `localStorage` (wrapped in try/catch) and avoids a flash of the wrong theme on load.
- Mobile-first and responsive. Nothing scrolls horizontally on a 360px-wide screen.
- Accessibility: semantic HTML, one `h1` per page, visible focus states, sufficient contrast in both themes, skip link, `alt` text, keyboard-navigable nav and toggle.
- Performance: no layout shift, no render-blocking third-party scripts, no analytics or trackers unless the owner asks. Aim for Lighthouse 95+ in every category.
- Avoid generic template aesthetics: no hero gradients, stock illustrations, glassmorphism, or emoji-as-decoration. Whitespace and typography over ornament.

## Code conventions

- Small, single-purpose components. Content lives in content files, not hard-coded in templates.
- Design tokens (colors, spacing, font sizes) live in one place, `src/styles/global.css`, as CSS variables. No magic numbers scattered across files.
- Include `<title>`, meta description, canonical URL, Open Graph/Twitter card tags, favicon, and a sitemap on every page.
- Comments only where the reason isn't obvious from the code.

## Git workflow

- Work on a branch, not directly on `main`, unless told otherwise.
- Make small, logically separate commits with clear imperative messages (e.g. `Add blog index page`, `Add dark mode toggle`).
- Do not force-push, rewrite history, or delete branches without asking.
- Never commit `node_modules/`, `dist/`, `.astro/`, or `.env` files. Keep `.gitignore` current.

## Boundaries

Ask before you:

- add a new dependency, framework, or build tool
- change the deployment approach or the site's URL structure
- publish any personal contact information
- touch anything in `content/`

Never:

- fabricate content about the owner
- add tracking, analytics, cookie banners, or third-party embeds
- commit secrets or tokens

## Definition of done

A task is done when: `npm run build` passes, the affected pages have been checked in both light and dark themes at mobile and desktop widths, no invented content was introduced, and you have summarized what changed, how to preview it, and any open TODOs.