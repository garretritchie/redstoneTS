# Redstone CMS Setup

This site uses Decap CMS. The CMS is available at `/admin/`. It is currently configured as a temporary no-auth CMS preview so the interface opens without a username/password.

## What can be edited

- Home hero copy, CTA links, image and alt text
- Contact information and physical address
- Basic analytics provider settings
- Team members, profile images, responsibilities and leadership profile details
- Insight articles

## Current temporary access

The admin interface is currently configured with Decap's `test-repo` backend. It has no username/password prompt and is useful for reviewing the CMS structure.

The actual website content is prepopulated in the repository under:

```text
content/site/settings.json
content/team/team.json
content/insights/
```

Important limitations:

- This temporary backend is not connected to GitHub.
- Edits made inside the deployed `/admin/` interface are not persistent site updates.
- This avoids exposing a write token in the public site.
- Persistent editing should be enabled later with Netlify Identity/Git Gateway, GitHub OAuth, or another authenticated backend.

For local filesystem-backed CMS editing, temporarily change `public/admin/config.yml` to:

```text
backend:
  name: git-gateway
  branch: main

local_backend: true
```

Then start the local CMS backend:

```text
npm run cms
```

## Production access

For production, switch `public/admin/config.yml` back to Netlify Identity and Git Gateway. Do not store admin usernames or passwords in this repository.

To enable editing on the deployed site:

1. In Netlify, open the Redstone site.
2. Enable Identity.
3. Enable Git Gateway.
4. Invite `gritchie@redstonets.com` as an Identity user.
5. Set the password through Netlify’s secure invitation/reset flow.
6. Visit `/admin/` on the deployed site and sign in.

CMS edits commit content changes back to the `main` branch and trigger a new Netlify/Bolt build.

Production backend config:

```yaml
backend:
  name: git-gateway
  branch: main

local_backend: true
```

## Local preview

The CMS interface can be reviewed locally at:

```text
http://localhost:3003/admin/
```

Local content changes should still be made carefully and validated with:

```text
npm test
```

## Analytics

Analytics are intentionally disabled by default. They can be enabled in the CMS under Site Settings:

- `plausible` requires a Plausible domain.
- `google-analytics` requires a GA Measurement ID.

If analytics are enabled, review the cookie/privacy language before publishing.
