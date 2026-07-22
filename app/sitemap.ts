import type { MetadataRoute } from "next";
import { getAllInsights } from "./insights/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1 },
    { path: "/managed-it", priority: 0.9 },
    { path: "/capabilities", priority: 0.85 },
    { path: "/about", priority: 0.75 },
    { path: "/insights", priority: 0.72 },
    { path: "/contact", priority: 0.8 },
  ];

  const pageEntries = routes.map(({ path, priority }) => ({
    url: `https://www.redstonets.com${path || "/"}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority,
  }));

  const insightEntries = getAllInsights().map((article) => ({
    url: `https://www.redstonets.com/insights/${article.slug}`,
    lastModified: new Date(article.updatedAt ?? article.publishedAt),
    changeFrequency: "monthly" as const,
    priority: article.featured ? 0.7 : 0.64,
  }));

  return [...pageEntries, ...insightEntries];
}
