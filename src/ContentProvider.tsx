import { useEffect, useState, type ReactNode } from "react";
import { setPublishedContent } from "./contentStore";

const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL as string) || "https://hnfdrolietieeqotxgqq.supabase.co";
const SUPABASE_ANON_KEY =
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string) ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhuZmRyb2xpZXRpZWVxb3R4Z3FxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ3NDA3NTcsImV4cCI6MjEwMDMxNjc1N30.Avdto-_gKj5qInBXGp0yGY-JKShYOBEFuemwvjLbWtY";

export default function ContentProvider({ children }: { children: ReactNode }) {
  const [version, setVersion] = useState(0);

  useEffect(() => {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return;

    fetch(`${SUPABASE_URL}/rest/v1/cms_content?select=section,content`, {
      headers: { apikey: SUPABASE_ANON_KEY },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch published content");
        return res.json();
      })
      .then((rows: { section: string; content: unknown }[]) => {
        const published: Record<string, unknown> = {};
        for (const row of rows) published[row.section] = row.content;
        if (Object.keys(published).length === 0) return;

        setPublishedContent({
          site: published.site as never,
          team: published.team as never,
          insights: published.insights as never,
        });
        setVersion((v) => v + 1);
      })
      .catch(() => {});
  }, []);

  return <div key={version}>{children}</div>;
}
