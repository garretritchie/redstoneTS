# Redstone CMS Setup

The site admin is available at `/admin/`. It is currently a lightweight Redstone-branded CMS dashboard designed for simple, no-auth content review while production authentication is deferred.

## What is prepopulated

The admin dashboard is seeded from the same content files used by the current frontend:

```text
content/site/settings.json
content/team/team.json
content/insights/
```

The generated browser seed file is:

```text
public/admin/cms-data.js
```

## Editable areas

- Home hero copy, CTA links, image path and alt text
- Contact information and physical address
- Basic analytics provider settings
- Team members, profile images, titles, responsibilities and descriptions
- Leadership profile details, contact information, focus areas and credentials
- Insight article metadata, SEO fields, keywords and body content

## Temporary no-auth behavior

For now, the dashboard does not require a username or password. This keeps it simple for review and avoids storing credentials or public write tokens in the repository.

Important limitations:

- Edits are saved as a browser-local draft with the “Save draft” button.
- Drafts do not automatically update the live site files.
- Use “Export” to download or copy a JSON bundle when a draft should be applied to the repository.
- Production editing should later be connected to a real authenticated backend before giving non-technical users write access.

## Production CMS path

When ready, replace the temporary dashboard workflow with an authenticated write path such as Netlify Identity/Git Gateway, GitHub OAuth, or a small custom admin API. Do not commit passwords or long-lived write tokens into this public frontend.

## Local preview

Review locally at:

```text
http://localhost:3003/admin/
```

Validate the site after CMS-related changes with:

```text
npm test
npm run lint
```

## Analytics

Analytics are intentionally disabled by default. If analytics are enabled, confirm that the privacy policy and cookie policy language still matches the configured provider.
