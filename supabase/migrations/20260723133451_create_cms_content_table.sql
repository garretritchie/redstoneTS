/*
# Create CMS content table for publishing site changes

1. New Tables
- `cms_content`
  - `id` (uuid, primary key, default gen_random_uuid())
  - `section` (text, not null) — which part of the site content this row holds (e.g. 'site', 'team', 'insights', 'frontend')
  - `content` (jsonb, not null) — the actual content data as JSON
  - `published_by` (uuid, references auth.users) — who last published
  - `updated_at` (timestamptz, default now())
  - `created_at` (timestamptz, default now())
  - Unique constraint on `section` so there is one published record per section.

2. Security
- Enable RLS on `cms_content`.
- SELECT: allow `anon, authenticated` to read (the public site needs to load published content without signing in).
- INSERT/UPDATE/DELETE: allow `authenticated` only (CMS admin must sign in to publish changes).

3. Notes
- The CMS admin panel already has a sign-in screen using Supabase email/password auth.
- The frontend site itself has no sign-in; it reads published content as anon.
- This table stores the full CMS data structure broken into sections so each can be published independently.
*/

CREATE TABLE IF NOT EXISTS cms_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section text NOT NULL,
  content jsonb NOT NULL,
  published_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  updated_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS cms_content_section_unique ON cms_content (section);

ALTER TABLE cms_content ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "read_cms_content" ON cms_content;
CREATE POLICY "read_cms_content" ON cms_content FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "insert_cms_content" ON cms_content;
CREATE POLICY "insert_cms_content" ON cms_content FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "update_cms_content" ON cms_content;
CREATE POLICY "update_cms_content" ON cms_content FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "delete_cms_content" ON cms_content;
CREATE POLICY "delete_cms_content" ON cms_content FOR DELETE
  TO authenticated USING (true);
