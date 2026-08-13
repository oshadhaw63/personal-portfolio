# Deployment guide

## 1. Verify locally

From the project root:

```bash
npm install
npm run lint
npm run typecheck
npm run build
```

Do not deploy if any command fails.

## 2. Create the GitHub repository

1. Sign in to GitHub and choose **New repository**.
2. Use `oshadha-wijayarathne` as the repository name.
3. Leave “Add a README”, `.gitignore`, and license unchecked because this folder already contains project files.
4. Choose public or private visibility.
5. Create the repository and copy its HTTPS URL.

## 3. Commit and push manually

No commits are created automatically by this project setup.

```bash
git add .
git commit -m "feat: build evidence-backed engineering portfolio"
git remote add origin https://github.com/oshadhaw63/oshadha-wijayarathne.git
git push -u origin main
```

If `origin` already exists, inspect it with `git remote -v` before changing it.

## 4. Import into Vercel

1. Sign in to Vercel with GitHub.
2. Choose **Add New → Project**.
3. Import the `oshadha-wijayarathne` repository.
4. Keep **Framework Preset** as Next.js, **Root Directory** as `./`, and the standard build settings.
5. Add `NEXT_PUBLIC_SITE_URL` with the final production URL, initially `https://oshadha-wijayarathne.vercel.app` if Vercel assigns that exact URL.
6. Deploy.

Vercel project names are unique per account/team. `oshadha-wijayarathne` is the preferred name, but the resulting `vercel.app` URL must be confirmed in the Vercel dashboard rather than assumed.

## 5. Select and confirm the production branch

1. Open **Project Settings → Git**.
2. Set **Production Branch** to `main`.
3. Open the deployment and verify the home page plus all six `/projects/...` routes.
4. Check `/sitemap.xml`, `/robots.txt`, the favicon, and the CV download.
5. Update `NEXT_PUBLIC_SITE_URL` if Vercel assigned a different project URL, then redeploy.

## 6. Add a custom domain later

Candidate names from the project brief are:

- `oshadhaw.dev`
- `oshadhawijayarathne.dev`
- `oshadhaw.com`
- `oshadhawijayarathne.com`

Domain availability and price change continuously; check them with a registrar immediately before purchase.

After buying a domain:

1. Open **Vercel Project Settings → Domains** and add the exact domain.
2. Vercel will show the DNS records required for the chosen apex domain or subdomain.
3. At the registrar, add the exact A, CNAME, or nameserver records Vercel supplies. Do not copy old example values from a guide.
4. Wait for Vercel to show **Valid Configuration**.
5. Choose the preferred canonical domain and redirect the alternate `www`/apex form to it.
6. Change `NEXT_PUBLIC_SITE_URL` to the custom HTTPS URL and redeploy so canonical URLs and the sitemap match it.

Vercel provisions and renews HTTPS certificates after DNS validation. Confirm the browser shows a valid certificate before sharing the domain.

## 7. Publish updates

After the Git integration is connected, every push to `main` creates a production deployment. Other branches and pull requests create preview deployments by default.

Recommended workflow:

```bash
git checkout -b feat/update-project-copy
# make and verify changes
git add .
git commit -m "content: update project evidence"
git push -u origin feat/update-project-copy
```

Review the Vercel preview, merge into `main`, and then confirm the production deployment.
