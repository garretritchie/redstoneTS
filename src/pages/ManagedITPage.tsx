import { Helmet } from "react-helmet-async";
import { ArrowRight, Buildings, Compass, FlowArrow, Gauge, Headset, ShieldCheck, UsersThree } from "@phosphor-icons/react";
import AssessmentBand from "../components/AssessmentBand";
import PageHero from "../components/PageHero";
import ServiceExplorer from "../components/ServiceExplorer";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

export default function ManagedITPage() {
  return (
    <main id="top">
      <Helmet>
        <title>Managed IT Services in The Bahamas | Redstone Technology Solutions</title>
        <meta name="description" content="Explore Redstone's five connected managed IT services: monitoring, infrastructure maintenance, helpdesk, cybersecurity and cloud services." />
        <link rel="canonical" href="https://www.redstonets.com/managed-it" />
      </Helmet>
      <SiteHeader />
      <PageHero eyebrow="Professional technology management" title={<>Five services.<br /><span>One accountable team.</span></>} description="Five distinct, ongoing responsibilities managed as one coordinated technology function\u2014so your business can operate reliably, securely and with clear accountability." primaryLabel="Review your technology standard" secondaryLabel="Explore the five services" secondaryHref="#services" tone="dark" />

      <section className="proof-section section-pad service-principles" aria-labelledby="service-principles-title">
        <div className="section-shell proof-layout">
          <div className="section-heading"><p className="eyebrow">Why the system matters</p><h2 id="service-principles-title">Every responsibility.<br />Clearly managed.</h2></div>
          <div className="proof-copy"><p>Monitoring, maintenance, user support, security and cloud continuity are different business responsibilities. None stays complete after a one-time installation because your people, systems, risks and priorities keep changing.</p><p>Redstone&rsquo;s five managed services share context, standards and accountability. Each has a defined role, and together they prevent gaps, duplicated effort and confusion between providers.</p></div>
          <div className="proof-numbers"><div><strong>Monitor</strong><span>Continuous visibility</span></div><div><strong>Maintain</strong><span>Stable foundations</span></div><div><strong>Support</strong><span>Human assistance</span></div><div><strong>Protect</strong><span>Layered security</span></div></div>
        </div>
      </section>

      <section className="services-section section-pad" id="services" aria-labelledby="services-title">
        <div className="section-shell">
          <div className="services-heading"><div><p className="eyebrow eyebrow--light">Explore each responsibility</p><h2 id="services-title">Different roles.<br /><span>One coordinated standard.</span></h2></div><p>Select any service to see what it manages, why the work is ongoing, what Redstone does and how it connects to the wider managed system.</p></div>
          <ServiceExplorer />
          <div className="services-footer"><div className="services-unified"><FlowArrow size={24} weight="duotone" aria-hidden="true" /><p><strong>Five specialist practices. One accountable team.</strong><span>See. Maintain. Support. Protect. Enable.</span></p></div><a className="text-link text-link--inverse" href="/contact">Discuss your environment <ArrowRight size={17} weight="bold" aria-hidden="true" /></a></div>
        </div>
      </section>

      <section className="coverage-section section-pad" aria-labelledby="coverage-title">
        <div className="section-shell">
          <div className="section-heading coverage-heading"><p className="eyebrow">What complete coverage feels like</p><h2 id="coverage-title">One relationship.<br />Everyday confidence.</h2></div>
          <div className="coverage-grid"><article><Gauge size={30} weight="light" aria-hidden="true" /><h3>Proactive visibility</h3><p>Health, risk and performance trends are visible before they become disruptive.</p></article><article><Headset size={30} weight="light" aria-hidden="true" /><h3>One support path</h3><p>Your users know exactly where to go and every issue has a clear owner.</p></article><article><ShieldCheck size={30} weight="light" aria-hidden="true" /><h3>Coordinated protection</h3><p>Security controls operate across identity, devices, email, cloud and infrastructure.</p></article><article><Compass size={30} weight="light" aria-hidden="true" /><h3>Better decisions</h3><p>Roadmaps and investments are guided by business goals, evidence and long-term value.</p></article></div>

          <div className="service-models" id="partnership-models" aria-labelledby="service-models-title">
            <div className="service-models-intro"><p className="eyebrow">One partner. Two ways to work.</p><h2 id="service-models-title">Your technology department&mdash;or an extension of it.</h2><p>Redstone can take responsibility for your complete environment or work side by side with the internal team already leading it.</p></div>
            <article><Buildings size={30} weight="light" aria-hidden="true" /><span>01 / Fully Managed IT</span><h3>Complete technology responsibility.</h3><p>For organisations without an internal IT function, Redstone becomes the professionally managed technology department&mdash;providing standards, planning, support, security, projects, vendor coordination and ongoing accountability.</p><a className="text-link" href="/contact">Explore fully managed IT <ArrowRight size={17} weight="bold" aria-hidden="true" /></a></article>
            <article><UsersThree size={30} weight="light" aria-hidden="true" /><span>02 / Co-Managed IT</span><h3>More capability for your existing team.</h3><p>Your internal team keeps its relationships and institutional knowledge while Redstone adds specialist expertise, tools, engineering capacity, projects, escalation support and coverage where defined gaps exist.</p><a className="text-link" href="/contact">Strengthen your internal IT team <ArrowRight size={17} weight="bold" aria-hidden="true" /></a></article>
          </div>
        </div>
      </section>

      <AssessmentBand ctaLabel="Review your technology environment" />
      <SiteFooter />
    </main>
  );
}
