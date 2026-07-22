/*
# Create page_views table for site analytics

1. New Tables
- `page_views`
  - `id` (uuid, primary key)
  - `path` (text, not null) — the page path visited (e.g. "/", "/about")
  - `referrer` (text, nullable) — the referring URL if any
  - `user_agent` (text, nullable) — browser user agent string
  - `country` (text, nullable) — visitor country (derived later if needed)
  - `session_id` (text, nullable) — anonymous session identifier
  - `created_at` (timestamptz, default now()) — when the page view occurred

2. Security
- Enable RLS on `page_views`.
- INSERT: allow anon + authenticated (the tracking script runs as anon).
- SELECT: allow authenticated only (only logged-in CMS users can view analytics).
- No UPDATE or DELETE policies — page views are append-only.

3. Indexes
- Index on `created_at` for time-range queries.
- Index on `path` for per-page filtering.
*/

CREATE TABLE IF NOT EXISTS page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  path text NOT NULL,
  referrer text,
  user_agent text,
  country text,
  session_id text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Allow anyone (anon) to insert page views — the tracking script needs this
DROP POLICY IF EXISTS "anon_insert_page_views" ON page_views;
CREATE POLICY "anon_insert_page_views" ON page_views FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- Only authenticated CMS users can read analytics data
DROP POLICY IF EXISTS "authenticated_select_page_views" ON page_views;
CREATE POLICY "authenticated_select_page_views" ON page_views FOR SELECT
  TO authenticated USING (true);

-- Create indexes for analytics queries
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_path ON page_views (path);
