import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "@phosphor-icons/react";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import InsightCard from "../components/InsightCard";
import { formatInsightDate, getInsightBySlug, getRelatedInsights } from "../content";
import NotFoundPage from "./NotFoundPage";

export default function InsightArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getInsightBySlug(slug) : undefined;

  if (!article) return <NotFoundPage />;

  const related = getRelatedInsights(article.slug);
  const articleUrl = `https://www.redstonets.com/insights/${article.slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.seoDescription,
    author: { "@type": "Organization", name: article.author },
    publisher: { "@type": "Organization", name: "Redstone Technology Solutions", logo: { "@type": "ImageObject", url: "https://www.redstonets.com/redstone-logo.png" } },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    mainEntityOfPage: articleUrl,
    image: "https://www.redstonets.com/og.png",
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.redstonets.com/" },
      { "@type": "ListItem", position: 2, name: "Insights", item: "https://www.redstonets.com/insights" },
      { "@type": "ListItem", position: 3, name: article.title, item: articleUrl },
    ],
  };

  return (
    <main id="top">
      <Helmet>
        <title>{(article.seoTitle ?? article.title) + " | Redstone Technology Solutions"}</title>
        <meta name="description" content={article.seoDescription} />
        <link rel="canonical" href={`https://www.redstonets.com/insights/${article.slug}`} />
        <meta property="og:title" content={article.seoTitle ?? article.title} />
        <meta property="og:description" content={article.seoDescription} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={article.publishedAt} />
      </Helmet>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SiteHeader />
      <article className="insight-article">
        <header className="insight-article-header section-shell">
          <nav aria-label="Breadcrumb" className="insight-breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/insights">Insights</Link></nav>
          <p className="eyebrow">{article.category}</p>
          <h1>{article.title}</h1>
          <p>{article.summary}</p>
          <div className="insight-article-meta">
            <span>{formatInsightDate(article.publishedAt)}</span>
            <span>{article.readingTime}</span>
            <span>{article.author}</span>
          </div>
        </header>

        <div className="section-shell insight-article-layout">
          <div className="insight-article-body">
            {article.body.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </section>
            ))}
          </div>
          <aside className="insight-article-sidebar">
            <div className="insight-service-links">
              <span>Related services</span>
              {article.relatedServiceLinks?.map((link) => <a href={link.href} key={link.label}>{link.label}</a>)}
            </div>
            <div className="insight-cta">
              <h2>{article.cta.label}</h2>
              <p>{article.cta.text}</p>
              <a className="button" href={article.cta.href}>{article.cta.label} <ArrowRight size={18} weight="bold" aria-hidden="true" /></a>
            </div>
          </aside>
        </div>
      </article>

      <section className="related-insights section-pad" aria-labelledby="related-insights-title">
        <div className="section-shell">
          <div className="related-insights-heading">
            <p className="eyebrow">Continue reading</p>
            <h2 id="related-insights-title">Related Redstone insights.</h2>
          </div>
          <div className="insights-list">
            {related.map((relatedArticle) => <InsightCard article={relatedArticle} key={relatedArticle.slug} />)}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
