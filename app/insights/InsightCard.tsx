import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import type { InsightArticle } from "./content";
import { formatInsightDate } from "./content";

type InsightCardProps = {
  article: InsightArticle;
  featured?: boolean;
};

export default function InsightCard({ article, featured = false }: InsightCardProps) {
  return (
    <article className={`insight-card${featured ? " insight-card--featured" : ""}`}>
      <div className="insight-card-meta">
        <span>{article.category}</span>
        <span>{formatInsightDate(article.publishedAt)}</span>
        <span>{article.readingTime}</span>
      </div>
      <h3><Link href={`/insights/${article.slug}`}>{article.title}</Link></h3>
      <p>{article.summary}</p>
      <Link className="insight-card-link" href={`/insights/${article.slug}`}>
        Read insight <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
      </Link>
    </article>
  );
}
