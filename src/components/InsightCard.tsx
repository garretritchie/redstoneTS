import { Link } from "react-router-dom";
import { ArrowUpRight } from "@phosphor-icons/react";
import type { InsightArticle } from "../content";
import { formatInsightDate } from "../content";

type InsightCardProps = { article: InsightArticle; featured?: boolean };

export default function InsightCard({ article, featured = false }: InsightCardProps) {
  return (
    <article className={`insight-card${featured ? " insight-card--featured" : ""}`}>
      <div className="insight-card-meta">
        <span>{article.category}</span>
        <span>{formatInsightDate(article.publishedAt)}</span>
        <span>{article.readingTime}</span>
      </div>
      <h3><Link to={`/insights/${article.slug}`}>{article.title}</Link></h3>
      <p>{article.summary}</p>
      <Link className="insight-card-link" to={`/insights/${article.slug}`}>
        Read insight <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
      </Link>
    </article>
  );
}
