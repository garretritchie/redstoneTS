import {
  ArrowRight,
  ArrowUpRight,
  Brain,
  Briefcase,
  ChartLineUp,
  CheckCircle,
  CloudArrowUp,
  FlowArrow,
  GearSix,
  Headset,
  Lightning,
  Pulse,
  SealCheck,
  ShieldCheck,
  Sparkle,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import AssessmentBand from "./AssessmentBand";
import HeroSpotlight from "./HeroSpotlight";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import TestimonialCarousel from "./TestimonialCarousel";
import { siteConfig, siteContent } from "./siteConfig";
import InsightCard from "./insights/InsightCard";
import { getLatestInsights } from "./insights/content";

const businessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": "https://www.redstonets.com/#business",
  name: "Redstone Technology Solutions",
  url: "https://www.redstonets.com/",
  logo: "https://www.redstonets.com/redstone-logo.png",
  image: "https://www.redstonets.com/og.png",
  description: "A Bahamian managed IT services provider delivering proactive monitoring, infrastructure support, helpdesk, cybersecurity, cloud services and technology strategy.",
  telephone: siteConfig.phone.schema,
  email: siteConfig.email.display,
  address: { "@type": "PostalAddress", streetAddress: siteConfig.address.street, addressLocality: siteConfig.address.locality, addressRegion: siteConfig.address.region, addressCountry: siteConfig.address.countryCode },
  areaServed: { "@type": "Country", name: siteConfig.address.country },
};

const services = [
  { brand: "Overwatch", name: "Remote Monitoring & Management", role: "Know when something is going wrong.", icon: Pulse },
  { brand: "Checkmark", name: "Core Infrastructure Support", role: "Keep systems properly maintained.", icon: GearSix },
  { brand: "Helpdesk", name: "End User Support", role: "Keep your people productive.", icon: Headset },
  { brand: "Shield", name: "Security Services", role: "Manage security continuously.", icon: ShieldCheck },
  { brand: "Cirrus", name: "Cloud Services", role: "Keep people and data available.", icon: CloudArrowUp },
];

const capabilities = [
  { name: "Ad Hoc Technology Projects", href: "/capabilities", icon: Briefcase },
  { name: "Security & Compliance as a Service", href: "/capabilities", icon: ShieldCheck },
  { name: "AI-Powered Web & Application Development", href: "/capabilities", icon: Brain },
  { name: "Workflow Automation & Optimisation", href: "/capabilities", icon: FlowArrow },
  { name: "vCIO & Technology Strategy", href: "/capabilities", icon: ChartLineUp },
  { name: "Systems Integration & Modernisation", href: "/capabilities", icon: GearSix },
];

export default function Home() {
  const latestInsights = getLatestInsights(3);
  const hero = siteContent.homeHero;

  return (
    <main id="top">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }} />
      <SiteHeader />

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-media">
          <img src={hero.image} alt={hero.imageAlt} width="1774" height="887" fetchPriority="high" decoding="async" />
        </div>
        <HeroSpotlight />
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">{hero.eyebrow}</p>
            <h1 id="hero-title">{hero.title}</h1>
            <p className="hero-lede">{hero.description}</p>
            <div className="hero-actions">
              <a className="button" href={hero.primaryCtaHref}>{hero.primaryCtaLabel} <ArrowRight size={18} weight="bold" aria-hidden="true" /></a>
              <a className="text-link" href={hero.secondaryCtaHref}>{hero.secondaryCtaLabel} <ArrowRight size={17} weight="bold" aria-hidden="true" /></a>
            </div>
            <div className="hero-trust" aria-label="Redstone service promise"><SealCheck size={22} weight="duotone" aria-hidden="true" /><strong>{hero.trustLabel}</strong><span>{hero.trustLocation}</span></div>
          </div>
        </div>
      </section>

      <section className="promise-strip" aria-label="The Redstone service promise">
        <div className="promise-grid">
          <article><UsersThree size={27} weight="light" aria-hidden="true" /><div><strong>Experts who know your business</strong><span>Real people. Real context.</span></div></article>
          <article><Lightning size={27} weight="light" aria-hidden="true" /><div><strong>Help when you need it</strong><span>Fast, clear, accountable.</span></div></article>
          <article><ShieldCheck size={27} weight="light" aria-hidden="true" /><div><strong>Problems prevented</strong><span>Not simply repaired.</span></div></article>
          <article><FlowArrow size={27} weight="light" aria-hidden="true" /><div><strong>Technology aligned</strong><span>To the way you do business.</span></div></article>
        </div>
      </section>

      <section className="proof-section section-pad home-proof" id="why-redstone" aria-labelledby="proof-title">
        <div className="section-shell proof-layout">
          <div className="section-heading"><p className="eyebrow">A professional operating standard</p><h2 id="proof-title">Managed technology designed to move your business forward.</h2></div>
          <div className="proof-copy"><p>Technology affects productivity, security, customer service and growth. It should be managed as intentionally as every other business-critical function.</p><p>Since 2006, Redstone has helped Bahamian organisations replace fragmented, reactive support with clear standards, ongoing oversight and one accountable relationship.</p><a className="text-link" href="/about">Why businesses choose Redstone <ArrowRight size={17} weight="bold" aria-hidden="true" /></a></div>
          <div className="proof-numbers" aria-label="Redstone at a glance"><div><strong>24/7/365</strong><span>Continuous monitoring</span></div><div><strong>5</strong><span>Connected managed services</span></div><div><strong>1</strong><span>Accountable partner</span></div><div><strong>20+ years</strong><span>Serving The Bahamas</span></div></div>
        </div>
      </section>

      <section className="home-services section-pad" aria-labelledby="home-services-title">
        <div className="section-shell">
          <div className="home-section-heading"><div><p className="eyebrow eyebrow--light">The Redstone managed system</p><h2 id="home-services-title">Five responsibilities.<br /><span>One managed system.</span></h2></div><div><p>Each service manages a different ongoing responsibility. Together they provide the visibility, maintenance, support, security and continuity a professionally run business requires.</p><a className="text-link text-link--inverse" href="/managed-it">Explore the complete system <ArrowRight size={17} weight="bold" aria-hidden="true" /></a></div></div>
          <div className="home-services-grid">
            {services.map(({ brand, name, role, icon: Icon }, index) => <a href="/managed-it" key={brand}><span>0{index + 1}</span><Icon size={30} weight="light" aria-hidden="true" /><small>{brand}</small><h3>{name}</h3><p>{role}</p><ArrowUpRight className="home-card-arrow" size={18} weight="bold" aria-hidden="true" /></a>)}
          </div>
        </div>
      </section>

      <section className="home-pathways section-pad" aria-labelledby="pathways-title">
        <div className="section-shell home-pathways-grid">
          <div className="home-pathways-intro"><p className="eyebrow">Beyond managed services</p><h2 id="pathways-title">Specialist capability.<br />Connected to your operation.</h2><p>Engage Redstone for a focused project or to add expertise and capacity to your internal team. The work remains aligned with your standards, risks and long-term technology plan.</p><a className="button" href="/capabilities">Explore our capabilities <ArrowRight size={18} weight="bold" aria-hidden="true" /></a></div>
          <div className="home-capability-list">
            {capabilities.map(({ name, href, icon: Icon }, index) => <a href={href} key={name}><span>0{index + 1}</span><Icon size={27} weight="light" aria-hidden="true" /><strong>{name}</strong><ArrowUpRight size={17} weight="bold" aria-hidden="true" /></a>)}
          </div>
          <aside className="home-process-preview"><Sparkle size={28} weight="duotone" aria-hidden="true" /><p className="eyebrow">How we work</p><h3>Assess. Stabilise. Manage. Improve. Plan.</h3><p>A disciplined operating rhythm turns technology from a collection of tools into a business system that keeps getting better.</p><a className="text-link" href="/capabilities#process">See our approach <ArrowRight size={17} weight="bold" aria-hidden="true" /></a></aside>
        </div>
      </section>

      <section className="human-section home-testimonial" aria-labelledby="human-title">
        <TestimonialCarousel />
        <div className="human-copy"><p className="eyebrow eyebrow--light">Human-centred support</p><h2 id="human-title">Technology support that feels personal.</h2><p className="human-lede">Our team explains what is happening, owns the issue and stays involved until it is properly resolved.</p><div className="human-promises"><article><Headset size={23} weight="light" aria-hidden="true" /><div><strong>Responsive</strong><span>There when you need us.</span></div></article><article><CheckCircle size={23} weight="light" aria-hidden="true" /><div><strong>Accountable</strong><span>We take outcomes personally.</span></div></article></div><a className="text-link text-link--inverse" href="/about">Meet Redstone <ArrowRight size={17} weight="bold" aria-hidden="true" /></a></div>
      </section>

      <section className="home-insights section-pad" aria-labelledby="home-insights-title">
        <div className="section-shell">
          <div className="home-section-heading">
            <div><p className="eyebrow">Insights</p><h2 id="home-insights-title">Practical guidance for<br /><span>better technology decisions.</span></h2></div>
            <div><p>Ideas for owners, executives and IT leaders who want technology managed with more clarity, security and business discipline.</p><Link className="text-link" href="/insights">Explore our insights <ArrowRight size={17} weight="bold" aria-hidden="true" /></Link></div>
          </div>
          <div className="insights-list insights-list--home">
            {latestInsights.map((article) => <InsightCard article={article} key={article.slug} />)}
          </div>
        </div>
      </section>

      <AssessmentBand />
      <SiteFooter />
    </main>
  );
}
