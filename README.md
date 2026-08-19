# Hanasalabs

A space where ideas grow into experiments, and experiments grow into building blocks for what's next — built with Astro, Tailwind CSS v4, and a shadcn-style token system. Uses **pnpm** as the package manager.

## Stack

- **Framework**: [Astro](https://astro.build/) (static + serverless)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with a shadcn-style design token system in `src/styles/global.css`
- **Content**: Markdown/MDX via [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- **Contact**: Resend via a serverless API route
- **Package manager**: [pnpm](https://pnpm.io/) (declared in `package.json` via `packageManager`)
- **Deploy**: Vercel

## Pages

| Route | Description |
| --- | --- |
| `/` | Hero + grid of public projects |
| `/blog` | Blog listing |
| `/blog/[slug]` | Individual post |
| `/contact` | Contact form (POSTs to `/api/contact`) |
| `/rss.xml` | Blog RSS feed |

## Project structure

```
src/
├── styles/global.css        # Design tokens (light/dark) + Tailwind import
├── lib/
│   ├── utils.ts             # cn(), date & reading-time helpers
│   └── resend.ts            # Resend client + email config
├── data/projects.ts         # Manual list of public projects
├── content/
│   ├── config.ts            # Blog collection schema (zod)
│   └── blog/                # *.md / *.mdx posts
├── components/
│   ├── ui/                  # shadcn-style primitives (Button, Input)
│   ├── Header.astro
│   ├── Footer.astro
│   ├── ThemeToggle.astro    # Light/dark toggle
│   ├── Hero.astro
│   ├── ProjectCard.astro
│   ├── PostCard.astro
│   ├── Article.astro
│   └── Callout.astro        # Example MDX-embeddable component
├── layouts/BaseLayout.astro
└── pages/
    ├── index.astro
    ├── blog/
    │   ├── index.astro
    │   └── [...slug].astro
    ├── contact.astro
    ├── rss.xml.ts
    └── api/contact.ts       # Serverless endpoint → Resend
```

## Getting started

```sh
pnpm install
cp .env.example .env      # then fill in RESEND_API_KEY, CONTACT_TO_EMAIL
pnpm dev                  # http://localhost:4321
```

## Environment variables

| Variable | Description |
| --- | --- |
| `RESEND_API_KEY` | Resend API key (https://resend.com/api-keys) |
| `CONTACT_TO_EMAIL` | Address that contact form messages are sent to |
| `FROM_ADDRESS` | Sender address (use `onboarding@resend.dev` until your domain is verified in Resend) |

Set these in the Vercel project dashboard for production.

## Adding content

**Blog post**: add a `.md` or `.mdx` file to `src/content/blog/` with the frontmatter defined in `src/content/config.ts`. See `hello-world.mdx` for an example.

**Project**: add an object to the `projects` array in `src/data/projects.ts`.

## Deployment

Push to GitHub. Vercel auto-detects pnpm (from the `pnpm-lock.yaml` lockfile and the `packageManager` field in `package.json`) and uses `astro.config.mjs`. Custom domain `hanasalabs.id` is configured in the Vercel dashboard.

Verify your domain in the [Resend dashboard](https://resend.com/domains) so the contact form can send from `contact@hanasalabs.id` (until then, the test sender `onboarding@resend.dev` is used).
