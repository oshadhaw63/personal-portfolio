# Suggested small commit sequence

The working tree has intentionally not been committed. If you want a clean review history, stage each file group manually in this order.

1. `chore: scaffold nextjs portfolio foundation`
   - Package, TypeScript, lint, Tailwind, environment, and Next.js configuration
2. `content: add typed evidence-backed portfolio data`
   - `src/types/portfolio.ts` and `src/data/portfolio.ts`
3. `feat: build responsive portfolio home page`
   - Shared components, layout, home page, styles, and icon
4. `feat: add static project case studies`
   - Dynamic project route, case-study component, architecture diagram, and project screenshot
5. `feat: add privacy-safe cv and seo routes`
   - Public CV, metadata, sitemap, robots, and 404
6. `docs: add project and vercel deployment guides`
   - README and documentation

Run `npm run lint && npm run typecheck && npm run build` before every commit that changes runtime code.
