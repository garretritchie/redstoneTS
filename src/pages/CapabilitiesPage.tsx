import { Helmet } from "react-helmet-async";
import { ArrowRight, ArrowUpRight, Brain, Briefcase, ChartLineUp, Compass, FlowArrow, GearSix, HardDrives, MagnifyingGlass, SealCheck, ShieldCheck, TrendUp, Wrench } from "@phosphor-icons/react";
import AssessmentBand from "../components/AssessmentBand";
import PageHero from "../components/PageHero";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

const capabilities = [
  { name: "Ad Hoc Technology Projects", text: "Infrastructure upgrades, office moves, hardware deployments and complex technology changes\u2014planned and delivered with control.", icon: Briefcase },
  { name: "Security & Compliance as a Service", text: "Ongoing governance, risk reviews, policy guidance and compliance support that turn requirements into operating discipline.", icon: SealCheck },
  { name: "AI-Powered Web & Application Development", text: "Premium websites, applications and intelligent business platforms designed around the way your organisation actually works.", icon: Brain },
  { name: "Workflow Automation & Optimisation", text: "Practical automation that connects information, removes repetitive work and gives teams a clearer, faster way to operate.", icon: FlowArrow },
  { name: "vCIO & Technology Strategy", text: "Executive-level guidance, budgeting, roadmaps and lifecycle planning without the complexity of a full-time CIO.", icon: ChartLineUp },
  { name: "Systems Integration & Modernisation", text: "Bring disconnected platforms, data and processes together so the business operates as one coordinated system.", icon: HardDrives },
];

const process = [
  { number: "01", name: "Assess", title: "We learn your business.", text: "Your goals, environment, risks and immediate priorities become the foundation for every decision.", icon: MagnifyingGlass },
  { number: "02", name: "Stabilise", title: "We strengthen the foundation.", text: "Urgent concerns are addressed, standards established and your environment properly documented.", icon: Wrench },
  { number: "03", name: "Manage", title: "We take responsibility.", text: "Monitoring, maintenance, support, protection and vendor coordination happen every day.", icon: GearSix },
  { number: "04", name: "Improve", title: "We make it better over time.", text: "Recurring issues are reduced while performance, security and reliability keep improving.", icon: TrendUp },
  { number: "05", name: "Plan", title: "We prepare for what is next.", text: "Roadmaps, budgets and lifecycle decisions stay aligned with where your business is going.", icon: Compass },
];

export default function CapabilitiesPage() {
  return (
    <main id="top">
      <Helmet>
        <title>Technology Projects, AI, Compliance & Automation | Redstone Technology Solutions</title>
        <meta name="description" content="Redstone delivers technology projects, security compliance, AI-powered web and application development, workflow automation and technology strategy." />
        <link rel="canonical" href="https://www.redstonets.com/capabilities" />
      </Helmet>
      <SiteHeader />
      <PageHero eyebrow="Projects, expertise and added capacity" title={<>Build what is next.<br /><span>Improve what exists.</span></>} description="Engage Redstone for a focused initiative or to strengthen an established IT team with specialist expertise, engineering capacity, project delivery and independent guidance." primaryLabel="Identify your technology gaps" secondaryLabel="See how we work" secondaryHref="#process" tone="dark" />

      <section className="offering-bridge" aria-label="Redstone services and solutions">
        <div className="section-shell offering-bridge-card">
          <div>
            <p className="eyebrow">Services and solutions work together</p>
            <h2>Solutions handle focused needs. Managed services keep the environment operating.</h2>
            <p>This page covers projects, specialist expertise, automation, compliance and advisory work. If you need Redstone to manage the day-to-day technology function, review our five connected managed IT services.</p>
          </div>
          <a className="text-link" href="/managed-it">Explore managed IT services <ArrowRight size={17} weight="bold" aria-hidden="true" /></a>
          <ShieldCheck size={32} weight="duotone" aria-hidden="true" />
        </div>
      </section>

      <section className="capabilities-section section-pad" aria-labelledby="solutions-title">
        <div className="section-shell"><div className="capabilities-heading"><p className="eyebrow">Specialist capabilities</p><h2 id="solutions-title">Serious expertise.<br />Applied with discipline.</h2><p>Bring Redstone in for one initiative, additional capacity during a demanding period or specialist support your internal team does not need to maintain full-time. Every engagement stays connected to business priorities, operational standards and long-term value.</p></div><div className="capabilities-list">{capabilities.map(({ name, text, icon: Icon }, index) => <article key={name}><span>0{index + 1}</span><Icon size={31} weight="light" aria-hidden="true" /><div><h3>{name}</h3><p>{text}</p></div><a href="/contact" aria-label={`Discuss ${name}`}>Discuss this capability <ArrowUpRight size={17} weight="bold" aria-hidden="true" /></a></article>)}</div></div>
      </section>
      <section className="process-section section-pad" id="process" aria-labelledby="process-title">
        <div className="section-shell"><div className="process-intro"><div><p className="eyebrow">A disciplined operating rhythm</p><h2 id="process-title">A proven path to<br />better-managed technology.</h2></div><p>Whether we are managing your environment or delivering a focused project, the work follows a clear progression from understanding to continuous improvement.</p></div><div className="process-grid">{process.map(({ number, name, title, text, icon: Icon }) => <article key={number}><div className="process-number"><span>{number}</span><Icon size={29} weight="light" aria-hidden="true" /></div><p className="process-name">{name}</p><h3>{title}</h3><p>{text}</p></article>)}</div></div>
      </section>
      <AssessmentBand ctaLabel="Identify your technology gaps" />
      <SiteFooter />
    </main>
  );
}
