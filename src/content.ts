import article1 from "../content/insights/bahamian-businesses-cybersecurity.json";
import article2 from "../content/insights/hidden-cost-below-modern-technology-standard.json";
import article3 from "../content/insights/what-co-managed-it-looks-like.json";
import article4 from "../content/insights/when-to-move-from-reactive-support-to-managed-it.json";

export type InsightArticle = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: string;
  author: string;
  featured?: boolean;
  seoTitle?: string;
  seoDescription: string;
  keywords?: string[];
  relatedServiceLinks?: { label: string; href: string }[];
  cta: { label: string; href: string; text: string };
  body: { heading: string; paragraphs: string[] }[];
};

const articles: InsightArticle[] = [
  article1 as unknown as InsightArticle,
  article2 as unknown as InsightArticle,
  article3 as unknown as InsightArticle,
  article4 as unknown as InsightArticle,
];

export function getAllInsights() {
  return [...articles].sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
}

export function getFeaturedInsight() {
  return getAllInsights().find((a) => a.featured) ?? getAllInsights()[0];
}

export function getLatestInsights(limit = 3) {
  return getAllInsights().slice(0, limit);
}

export function getInsightBySlug(slug: string) {
  return getAllInsights().find((a) => a.slug === slug);
}

export function getRelatedInsights(currentSlug: string, limit = 2) {
  return getAllInsights().filter((a) => a.slug !== currentSlug).slice(0, limit);
}

export function formatInsightDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  return new Intl.DateTimeFormat("en-BS", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(year, month - 1, day)
  );
}
