import fs from "node:fs";
import path from "node:path";

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
  relatedServiceLinks?: {
    label: string;
    href: string;
  }[];
  cta: {
    label: string;
    href: string;
    text: string;
  };
  body: {
    heading: string;
    paragraphs: string[];
  }[];
};

const insightsDirectory = path.join(process.cwd(), "content", "insights");

function readInsightArticles(): InsightArticle[] {
  if (!fs.existsSync(insightsDirectory)) return [];

  return fs
    .readdirSync(insightsDirectory)
    .filter((fileName) => fileName.endsWith(".json"))
    .map((fileName) => {
      const filePath = path.join(insightsDirectory, fileName);
      return JSON.parse(fs.readFileSync(filePath, "utf8")) as InsightArticle;
    });
}

export function getAllInsights() {
  return readInsightArticles().sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
}

export function getFeaturedInsight() {
  return getAllInsights().find((article) => article.featured) ?? getAllInsights()[0];
}

export function getLatestInsights(limit = 3) {
  return getAllInsights().slice(0, limit);
}

export function getInsightBySlug(slug: string) {
  return getAllInsights().find((article) => article.slug === slug);
}

export function getRelatedInsights(currentSlug: string, limit = 2) {
  return getAllInsights().filter((article) => article.slug !== currentSlug).slice(0, limit);
}

export function formatInsightDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  return new Intl.DateTimeFormat("en-BS", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(year, month - 1, day),
  );
}
