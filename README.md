# Oshadha Wijayarathne — Software Engineering Portfolio

A recruiter-focused engineering portfolio built with the Next.js App Router, TypeScript, and Tailwind CSS. Project copy is based on the August 2026 CV and inspected public repository history.

## Design

An editorial "interactive résumé": warm ivory and deep indigo, Inter set against Instrument Serif italics, numbered section labels, hairline borders, and restrained motion. The highlights are a hanging developer ID card that leans toward the pointer, a periodic table of skills with category filters, an expanding project showcase, education and committee timelines, and count-up statistics. Motion is CSS plus small client components (no animation library), and it switches off under `prefers-reduced-motion`; the ID card also stays still on touch devices.

## What is included

- Single-page home: hero and about, skills table, project showcase, committees, education timeline, achievements, certifications, and contact
- Scroll-spy navigation with a sliding active pill, and a compact menu below 1024px
- Six statically generated project case studies
- Explicit individual/team ownership and implemented/limited status on every project
- Real Pharma Control Tower repository screenshot; other projects show a schematic drawing labelled "Illustration" until real captures exist
- Privacy-safe downloadable CV with phone and referee details omitted
- Semantic HTML, keyboard focus states, reduced-motion support, responsive layouts, SEO metadata, JSON-LD, sitemap, robots, favicon, and custom 404
- No backend, database, tracking script, or contact-form dependency

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
```

To repeat the exact-width browser check, serve the production build on port 3100 in one terminal and run the check in another:

```bash
npm run start -- -p 3100
npm run check:responsive
```

The browser check asserts 375, 768, 1024, and 1440 CSS-pixel viewports, detects horizontal overflow, and fails on browser/runtime/network errors.

## Content architecture

Portfolio facts (profile, projects, skills, education, activities, certifications, achievements) live in `src/data/portfolio.ts` and are typed by `src/types/portfolio.ts`. Section order and navigation labels live in `src/lib/sections.ts`. This keeps contribution, status, evidence, and limitations consistent between cards and case studies.

The public CV is generated from audited content and does not include the private phone number or referee details present in the source CV.

## Real screenshots still needed

The case-study layout clearly marks missing visuals. Replace those placeholders only with actual application captures:

1. RepoLens — graph view after scanning a representative public repository
2. UniAttend — Keycloak login and authenticated student profile on a device/emulator
3. Disaster Response — incident map and role-aware command-centre view
4. Flower Exchange — order entry and execution-report dashboard
5. RPAL Interpreter — terminal input plus AST or final evaluation output

Add optimized images under `public/projects/`, update the corresponding `image` field in `src/data/portfolio.ts`, and keep the caption explicit.

## Evidence policy

- RepoLens and Flower Exchange are presented as individual projects.
- UniAttend, Pharma Control Tower, and Disaster Response are presented as team projects with Oshadha’s contribution isolated through commit history.
- RPAL is presented as a two-person project because its included report names two members and neither the report nor the squashed Git history allocates components individually.
- UniAttend’s student-role guard and newer backend/database work are identified as active-branch work, not merged main-branch functionality.
- Disaster Response’s later Socket.IO map integration is not attributed to Oshadha.
- Pharma’s XGBoost and OR-Tools models are team outcomes and are not attributed to Oshadha.

See [Deployment guide](docs/DEPLOYMENT.md) for the Vercel workflow.
