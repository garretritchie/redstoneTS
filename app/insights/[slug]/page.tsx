import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import SiteFooter from "../../SiteFooter";
import SiteHeader from "../../SiteHeader";
import InsightCard from "../InsightCard";
import { formatInsightDate, getAllInsights, getInsightBySlug, getRelatedInsights } from "../content";

type InsightArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllInsights().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: InsightArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getInsightBySlug(slug);
  if (!article) return {};

  return {
    title: article.seoTitle ?? article.title,
    description: article.seoDescription,
    keywords: article.keywords,
    alternates: { canonical: `/insights/${article.slug}` },
    openGraph: {
      title: article.seoTitle ?? article.title,
      description: article.seoDescription,
      url: `/insights/${article.slug}`,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? article.publishedAt,
      authors: [article.author],
      images: [{ url: "/og.png", width: 1729, height: 910, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.seoTitle ?? article.title,
      description: article.seoDescription,
      images: ["/og.png"],
    },
  };
}

export default async function InsightArticlePage({ params }: InsightArticlePageProps) {
  const { slug } = await params;
  const article = getInsightBySlug(slug);
  if (!article) notFound();
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SiteHeader />
      <article className="insight-article">
        <header className="insight-article-header section-shell">
          <nav aria-label="Breadcrumb" className="insight-breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/insights">Insights</Link></nav>
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
