import settings from "../content/site/settings.json";
import teamContent from "../content/team/team.json";
import article1 from "../content/insights/bahamian-businesses-cybersecurity.json";
import article2 from "../content/insights/hidden-cost-below-modern-technology-standard.json";
import article3 from "../content/insights/what-co-managed-it-looks-like.json";
import article4 from "../content/insights/when-to-move-from-reactive-support-to-managed-it.json";
import type { InsightArticle } from "./content";

type PublishedContent = {
  site: typeof settings;
  team: typeof teamContent;
  insights: InsightArticle[];
};

const fallback: PublishedContent = {
  site: settings,
  team: teamContent,
  insights: [article1, article2, article3, article4] as unknown as InsightArticle[],
};

let current: PublishedContent = {
  site: { ...settings },
  team: { ...teamContent },
  insights: [...fallback.insights],
};

export function setPublishedContent(published: Partial<PublishedContent>) {
  if (published.site) current.site = published.site;
  if (published.team) current.team = published.team;
  if (published.insights) current.insights = published.insights;
}

export function getContent() {
  return current;
}
