# Redstone CMS Setup

This site uses Decap CMS. The CMS is available at `/admin/`. During local review it is configured with Decap's local backend so the CMS opens without a username/password and can read/write the populated JSON files under `content/`.

## What can be edited

- Home hero copy, CTA links, image and alt text
- Contact information and physical address
- Basic analytics provider settings
- Team members, profile images, responsibilities and leadership profile details
- Insight articles

## Current temporary access

The admin interface is currently configured with Decap's local backend. It has no username/password prompt and is useful for reviewing and editing the real local content files.

Start the local CMS backend in one terminal:

```text
npm run cms
```

Then run the website preview in another terminal and open:

```text
http://localhost:3003/admin/
```

Important limitations:

- It is for local editing only.
- It is not a production authentication mechanism.
- Changes still need to be committed and pushed to GitHub before publication.

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
