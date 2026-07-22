import { Helmet } from "react-helmet-async";
import { ArrowRight, NewspaperClipping } from "@phosphor-icons/react";
import AssessmentBand from "../components/AssessmentBand";
import PageHero from "../components/PageHero";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import InsightCard from "../components/InsightCard";
import { getAllInsights, getFeaturedInsight } from "../content";

export default function InsightsPage() {
  const articles = getAllInsights();
  const featured = getFeaturedInsight();
  const remaining = articles.filter((article) => article.slug !== featured.slug);

  return (
    <main id="top">
      <Helmet>
        <title>Technology Insights for Bahamian Businesses | Redstone Technology Solutions</title>
        <meta name="description" content="Practical Redstone insights on managed IT, cybersecurity, technology standards, co-managed IT and business technology planning." />
        <link rel="canonical" href="https://www.redstonets.com/insights" />
      </Helmet>
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
