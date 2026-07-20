import type { Metadata } from "next";
import { ArrowRight, NewspaperClipping } from "@phosphor-icons/react/dist/ssr";
import AssessmentBand from "../AssessmentBand";
import PageHero from "../PageHero";
import SiteFooter from "../SiteFooter";
import SiteHeader from "../SiteHeader";
import InsightCard from "./InsightCard";
import { getAllInsights, getFeaturedInsight } from "./content";

export const metadata: Metadata = {
  title: "Technology Insights for Bahamian Businesses",
  description: "Practical Redstone insights on managed IT, cybersecurity, technology standards, co-managed IT and business technology planning.",
  alternates: { canonical: "/insights" },
  openGraph: {
    title: "Technology Insights for Bahamian Businesses | Redstone",
    description: "Practical Redstone guidance on managed IT, cybersecurity, technology standards and business technology planning.",
    url: "/insights",
    type: "website",
    images: [{ url: "/og.png", width: 1729, height: 910, alt: "Redstone Technology Solutions insights" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Technology Insights for Bahamian Businesses | Redstone",
    description: "Practical guidance on managed IT, cybersecurity and technology standards.",
    images: ["/og.png"],
  },
};

export default function InsightsPage() {
  const articles = getAllInsights();
  const featured = getFeaturedInsight();
  const remaining = articles.filter((article) => article.slug !== featured.slug);

  return (
    <main id="top">
      <SiteHeader />
      <PageHero eyebrow="Insights from Redstone" title={<>Practical thinking for<br /><span>better-run technology.</span></>} description="Clear guidance for business owners, executives, operations leaders and internal IT teams who want technology managed with more discipline, security and business context." primaryLabel="Start a technology conversation" primaryHref="/contact" secondaryLabel="Explore services" secondaryHref="/managed-it" tone="dark" />

      <section className="insights-index section-pad" aria-labelledby="insights-title">
        <div className="section-shell insights-index-layout">
          <div className="insights-index-intro">
            <p className="eyebrow">Featured insight</p>
            <h2 id="insights-title">Guidance that supports better decisions.</h2>
            <p>These articles are written for decision-makers who need practical technology clarity without unnecessary jargon or exaggerated claims.</p>
          </div>
          <InsightCard article={featured} featured />
          <div className="insights-list" aria-label="All Redstone insights">
            {remaining.map((article) => <InsightCard article={article} key={article.slug} />)}
          </div>
          <aside className="insights-index-note">
            <NewspaperClipping size={29} weight="duotone" aria-hidden="true" />
            <div>
              <h3>Looking for guidance specific to your environment?</h3>
              <p>Redstone can help translate these principles into a practical plan for your organisation.</p>
            </div>
            <a className="text-link" href="/contact">Talk with Redstone <ArrowRight size={17} weight="bold" aria-hidden="true" /></a>
          </aside>
        </div>
      </section>

      <AssessmentBand ctaLabel="Start a technology conversation" />
      <SiteFooter />
    </main>
  );
}
