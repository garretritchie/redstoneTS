import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1 },
    { path: "/managed-it", priority: 0.9 },
    { path: "/capabilities", priority: 0.85 },
    { path: "/about", priority: 0.75 },
    { path: "/contact", priority: 0.8 },
  ];

  return routes.map(({ path, priority }) => ({
    url: `https://www.redstonets.com${path || "/"}`,
    lastModified: new Date("2026-07-20"),
    changeFrequency: "monthly" as const,
    priority,
  }));
}
