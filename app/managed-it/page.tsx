import type { Metadata } from "next";
import { ArrowRight, Compass, FlowArrow, Gauge, Headset, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import AssessmentBand from "../AssessmentBand";
import PageHero from "../PageHero";
import ServiceExplorer from "../ServiceExplorer";
import SiteFooter from "../SiteFooter";
import SiteHeader from "../SiteHeader";

export const metadata: Metadata = {
  title: "Managed IT Services in The Bahamas",
  description: "Explore Redstone's five connected managed IT services: monitoring, infrastructure maintenance, helpdesk, cybersecurity and cloud services.",
  alternates: { canonical: "/managed-it" },
};

export default function ManagedITPage() {
  return (
    <main id="top">
      <SiteHeader />
      <PageHero eyebrow="The Redstone managed system" title={<>Five services.<br /><span>One accountable team.</span></>} description="A complete operating system for the technology your business depends on—designed to monitor, maintain, support, protect and modernise as one coordinated service." primaryLabel="Request an assessment" secondaryLabel="Explore the five services" secondaryHref="#services" tone="dark" />

      <section className="proof-section section-pad service-principles" aria-labelledby="service-principles-title">
        <div className="section-shell proof-layout">
          <div className="section-heading"><p className="eyebrow">Why the system matters</p><h2 id="service-principles-title">No gaps.<br />No vendor maze.</h2></div>
          <div className="proof-copy"><p>Most technology problems cross boundaries. A user issue may begin in the cloud, expose a security concern and require infrastructure expertise to resolve.</p><p>Redstone’s five managed services share context, standards and accountability, so your business never has to coordinate the response.</p></div>
          <div className="proof-numbers"><div><strong>Monitor</strong><span>Continuous visibility</span></div><div><strong>Maintain</strong><span>Stable foundations</span></div><div><strong>Support</strong><span>Human assistance</span></div><div><strong>Protect</strong><span>Layered security</span></div></div>
        </div>
      </section>

      <section className="services-section section-pad" id="services" aria-labelledby="services-title">
        <div className="section-shell">
          <div className="services-heading"><div><p className="eyebrow eyebrow--light">Explore each service</p><h2 id="services-title">Complete coverage.<br /><span>Built in five layers.</span></h2></div><p>Select any service to understand its role, coverage, delivery model and how it connects to the rest of the Redstone system.</p></div>
          <ServiceExplorer />
          <div className="services-footer"><div className="services-unified"><FlowArrow size={24} weight="duotone" aria-hidden="true" /><p><strong>Five specialist practices. One accountable team.</strong><span>Monitor. Maintain. Support. Protect. Modernise.</span></p></div><a className="text-link text-link--inverse" href="/contact">Discuss your environment <ArrowRight size={17} weight="bold" aria-hidden="true" /></a></div>
        </div>
      </section>

      <section className="coverage-section section-pad" aria-labelledby="coverage-title">
        <div className="section-shell"><div className="section-heading coverage-heading"><p className="eyebrow">What complete coverage feels like</p><h2 id="coverage-title">One relationship.<br />Everyday confidence.</h2></div><div className="coverage-grid"><article><Gauge size={30} weight="light" aria-hidden="true" /><h3>Proactive visibility</h3><p>Health, risk and performance trends are visible before they become disruptive.</p></article><article><Headset size={30} weight="light" aria-hidden="true" /><h3>One support path</h3><p>Your users know exactly where to go and every issue has a clear owner.</p></article><article><ShieldCheck size={30} weight="light" aria-hidden="true" /><h3>Coordinated protection</h3><p>Security controls operate across identity, devices, email, cloud and infrastructure.</p></article><article><Compass size={30} weight="light" aria-hidden="true" /><h3>Better decisions</h3><p>Roadmaps and investments are guided by business goals, evidence and long-term value.</p></article></div></div>
      </section>

      <AssessmentBand />
      <SiteFooter />
    </main>
  );
}
