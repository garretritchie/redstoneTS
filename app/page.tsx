import {
  ArrowRight,
  ArrowUpRight,
  Brain,
  Briefcase,
  ChartLineUp,
  ChatCircleText,
  CheckCircle,
  CloudArrowUp,
  Compass,
  EnvelopeSimple,
  FlowArrow,
  GearSix,
  GlobeHemisphereWest,
  HardDrives,
  Headset,
  Heart,
  Lightning,
  List,
  LockKey,
  MagnifyingGlass,
  MapPin,
  Phone,
  Pulse,
  Quotes,
  SealCheck,
  ShieldCheck,
  TrendUp,
  UserFocus,
  UsersThree,
  Wrench,
} from "@phosphor-icons/react/dist/ssr";

const assessmentHref =
  "mailto:msp@redstoneTS.com?subject=Request%20a%20Free%20Technology%20Assessment";

const services = [
  {
    brand: "Overwatch",
    name: "Remote Monitoring & Management",
    promise: "See issues early. Act before impact.",
    description:
      "Continuous visibility, alerting and proactive management across the technology your business depends on.",
    icon: Pulse,
    covers: ["24/7/365 monitoring", "Proactive remediation", "Device health & visibility"],
  },
  {
    brand: "Checkmark",
    name: "Core Infrastructure Support & Maintenance",
    promise: "Keep the foundation stable and dependable.",
    description:
      "Structured maintenance and expert support for servers, networks, workstations and the systems at the centre of your operation.",
    icon: GearSix,
    covers: ["Preventive maintenance", "Patching & lifecycle", "Network & server support"],
  },
  {
    brand: "Helpdesk",
    name: "End User Support",
    promise: "Give every user a human path back to productive.",
    description:
      "Fast, friendly support that resolves day-to-day issues clearly and stays involved until your people are moving again.",
    icon: Headset,
    covers: ["Remote & onsite support", "User administration", "Vendor coordination"],
  },
  {
    brand: "Shield",
    name: "Security Services",
    promise: "Protect every layer of the business.",
    description:
      "Coordinated protection across users, devices, identity, email and infrastructure reduces risk without slowing work down.",
    icon: ShieldCheck,
    covers: ["Endpoint & email security", "Identity protection", "Security awareness"],
  },
  {
    brand: "Cirrus",
    name: "Cloud Services",
    promise: "Make cloud simpler, safer and more useful.",
    description:
      "Microsoft 365, migrations, backup, identity and licensing—designed and managed under one accountable team.",
    icon: CloudArrowUp,
    covers: ["Microsoft 365", "Cloud migrations", "Backup & continuity"],
  },
];

const process = [
  {
    number: "01",
    name: "Assess",
    title: "We learn your business.",
    text: "Your goals, environment, risks and immediate priorities become the foundation for every decision.",
    icon: MagnifyingGlass,
  },
  {
    number: "02",
    name: "Stabilise",
    title: "We strengthen the foundation.",
    text: "Urgent concerns are addressed, standards established and your environment properly documented.",
    icon: Wrench,
  },
  {
    number: "03",
    name: "Manage",
    title: "We take responsibility.",
    text: "Monitoring, maintenance, support, protection and vendor coordination happen every day.",
    icon: GearSix,
  },
  {
    number: "04",
    name: "Improve",
    title: "We make it better over time.",
    text: "Recurring issues are reduced while performance, security and reliability keep improving.",
    icon: TrendUp,
  },
  {
    number: "05",
    name: "Plan",
    title: "We prepare for what is next.",
    text: "Roadmaps, budgets and lifecycle decisions stay aligned with where your business is going.",
    icon: Compass,
  },
];

const capabilities = [
  {
    name: "Ad Hoc Technology Projects",
    text: "Infrastructure upgrades, office moves, hardware deployments and complex technology changes—planned and delivered with control.",
    icon: Briefcase,
  },
  {
    name: "Security & Compliance as a Service",
    text: "Ongoing security governance, risk reviews, policy guidance and compliance support that turn requirements into an operating discipline.",
    icon: SealCheck,
  },
  {
    name: "AI-Powered Web & Application Development",
    text: "Premium websites, applications and intelligent business platforms designed around the way your organisation actually works.",
    icon: Brain,
  },
  {
    name: "Workflow Automation & Optimisation",
    text: "Practical automation that connects information, removes repetitive work and gives teams a clearer, faster way to operate.",
    icon: FlowArrow,
  },
  {
    name: "vCIO & Technology Strategy",
    text: "Executive-level guidance, budgeting, roadmaps and lifecycle planning without the cost or complexity of a full-time CIO.",
    icon: ChartLineUp,
  },
  {
    name: "Systems Integration & Modernisation",
    text: "Bring disconnected platforms, data and processes together so the business operates as one coordinated system.",
    icon: HardDrives,
  },
];

const outcomes = [
  ["Fewer recurring problems", "Issues are documented and solved at the root—not allowed to keep interrupting the same people."],
  ["Faster, clearer support", "Your team knows where to go and always receives a professional, human response."],
  ["Stronger security", "Users, devices, systems and business information are protected by coordinated controls."],
  ["One clear owner", "No confusion between vendors, providers and internal staff when something needs attention."],
  ["Better decisions", "Projects and investments are evaluated through business impact, risk and long-term value."],
  ["More confidence", "Leadership can see the environment, understand the risks and plan what comes next."],
];

function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <a className={`brand ${inverse ? "brand--inverse" : ""}`} href="#top" aria-label="Redstone Technology Solutions, home">
      <img src="/redstone-logo.png" alt="Redstone Technology Solutions" width="286" height="50" />
    </a>
  );
}

function ArrowLink({ href, children, inverse = false }: { href: string; children: React.ReactNode; inverse?: boolean }) {
  return (
    <a className={`text-link ${inverse ? "text-link--inverse" : ""}`} href={href}>
      <span>{children}</span>
      <ArrowRight size={17} weight="bold" aria-hidden="true" />
    </a>
  );
}

export default function Home() {
  return (
    <main id="top">
      <header className="site-header">
        <div className="header-inner">
          <Logo />
          <nav className="desktop-nav" aria-label="Primary navigation">
            <a href="#services">Managed Services</a>
            <a href="#solutions">Solutions</a>
            <a href="#why-redstone">Why Redstone</a>
            <a href="#process">Our Approach</a>
            <a href="#about">About</a>
          </nav>
          <div className="header-actions">
            <a className="support-link" href="tel:+12426018324">Client Support</a>
            <a className="button button--small" href={assessmentHref}>
              Free Assessment <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
            </a>
          </div>
          <details className="mobile-nav">
            <summary aria-label="Open navigation">
              <List size={25} weight="bold" aria-hidden="true" />
            </summary>
            <nav aria-label="Mobile navigation">
              <a href="#services">Managed Services</a>
              <a href="#solutions">Solutions</a>
              <a href="#why-redstone">Why Redstone</a>
              <a href="#process">Our Approach</a>
              <a href="#about">About</a>
              <a href="tel:+12426018324">Client Support</a>
              <a className="button" href={assessmentHref}>Request a Free Assessment</a>
            </nav>
          </details>
        </div>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-media" aria-hidden="true">
          <img src="/redstone-hero.png" alt="" />
        </div>
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">Managed IT for serious businesses</p>
            <h1 id="hero-title">
              Mind-blowing service.
              <span>Effortless IT<span className="red-dot">.</span></span>
            </h1>
            <p className="hero-lede">
              Redstone brings your support, infrastructure, cybersecurity, cloud services and technology planning together under one responsive, accountable team.
            </p>
            <div className="hero-actions">
              <a className="button" href={assessmentHref}>
                Request a Free Assessment <ArrowRight size={18} weight="bold" aria-hidden="true" />
              </a>
              <ArrowLink href="#services">Explore our services</ArrowLink>
            </div>
            <div className="hero-trust" aria-label="Redstone service promise">
              <SealCheck size={22} weight="duotone" aria-hidden="true" />
              <strong>Local. Proactive. Human.</strong>
              <span>Nassau, The Bahamas</span>
            </div>
          </div>
        </div>
      </section>

      <section className="promise-strip" aria-label="The Redstone service promise">
        <div className="promise-grid">
          <article>
            <UsersThree size={27} weight="light" aria-hidden="true" />
            <div><strong>Experts who know your business</strong><span>Real people. Real context.</span></div>
          </article>
          <article>
            <Lightning size={27} weight="light" aria-hidden="true" />
            <div><strong>Help when you need it</strong><span>Fast, clear, accountable.</span></div>
          </article>
          <article>
            <ShieldCheck size={27} weight="light" aria-hidden="true" />
            <div><strong>Problems prevented</strong><span>Not simply repaired.</span></div>
          </article>
          <article>
            <FlowArrow size={27} weight="light" aria-hidden="true" />
            <div><strong>Technology aligned</strong><span>To the way you do business.</span></div>
          </article>
        </div>
      </section>

      <section className="proof-section section-pad" id="why-redstone" aria-labelledby="proof-title">
        <div className="section-shell proof-layout">
          <div className="section-heading">
            <p className="eyebrow">Built around your business</p>
            <h2 id="proof-title">Order from chaos.<br />Confidence from technology.</h2>
          </div>
          <div className="proof-copy">
            <p>
              The best IT partner is not the one with the longest list of tools. It is the one that takes responsibility, understands what matters and quietly keeps your business moving.
            </p>
            <p>
              For more than a decade, Redstone has helped Bahamian organisations turn disconnected technology into a secure, dependable business foundation.
            </p>
          </div>
          <div className="proof-numbers" aria-label="Redstone at a glance">
            <div><strong>24/7/365</strong><span>Continuous environment monitoring</span></div>
            <div><strong>5</strong><span>Connected managed services</span></div>
            <div><strong>1</strong><span>Accountable technology partner</span></div>
            <div><strong>10+ yrs</strong><span>Serving the Bahamian market</span></div>
          </div>
        </div>
      </section>

      <section className="services-section section-pad" id="services" aria-labelledby="services-title">
        <div className="section-shell">
          <div className="services-heading">
            <div>
              <p className="eyebrow eyebrow--light">The Redstone managed system</p>
              <h2 id="services-title">Five services.<br /><span>One complete coverage system.</span></h2>
            </div>
            <p>
              Each service has a distinct role. Together, they monitor, maintain, support, protect and modernise your entire technology environment—with no gaps between providers.
            </p>
          </div>
          <div className="services-grid">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <article className="service-card" key={service.brand}>
                  <div className="service-topline">
                    <span className="service-index">0{index + 1}</span>
                    <Icon size={32} weight="light" aria-hidden="true" />
                  </div>
                  <p className="service-brand">{service.brand}</p>
                  <h3>{service.name}</h3>
                  <p className="service-promise">{service.promise}</p>
                  <p>{service.description}</p>
                  <ul>
                    {service.covers.map((item) => (
                      <li key={item}><CheckCircle size={15} weight="fill" aria-hidden="true" />{item}</li>
                    ))}
                  </ul>
                  <a href={assessmentHref} aria-label={`Ask Redstone about ${service.brand} ${service.name}`}>
                    Explore {service.brand} <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
                  </a>
                </article>
              );
            })}
          </div>
          <div className="services-footer">
            <div className="services-unified">
              <FlowArrow size={24} weight="duotone" aria-hidden="true" />
              <p><strong>Five specialist practices. One accountable team.</strong><span>Monitor. Maintain. Support. Protect. Modernise.</span></p>
            </div>
            <ArrowLink href={assessmentHref} inverse>Explore all managed services</ArrowLink>
          </div>
        </div>
      </section>

      <section className="process-section section-pad" id="process" aria-labelledby="process-title">
        <div className="section-shell">
          <div className="process-intro">
            <div>
              <p className="eyebrow">How Redstone works</p>
              <h2 id="process-title">A proven path to<br />better-managed technology.</h2>
            </div>
            <p>
              Managed IT should be more than a collection of subscriptions. Our process moves your business from uncertainty and recurring problems to a stable, secure environment that improves over time.
            </p>
          </div>
          <div className="process-grid">
            {process.map((step) => {
              const Icon = step.icon;
              return (
                <article key={step.name}>
                  <div className="process-number"><span>{step.number}</span><Icon size={25} weight="light" aria-hidden="true" /></div>
                  <p className="process-name">{step.name}</p>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="human-section" aria-labelledby="human-title">
        <div className="human-quote">
          <div>
            <Quotes size={48} weight="fill" aria-hidden="true" />
            <blockquote>“Our issues are addressed quickly before they result in unplanned downtime.”</blockquote>
            <p><strong>Stanley R. Darville</strong><span>President, Fourth Terrace Diagnostic Centre</span></p>
          </div>
        </div>
        <div className="human-copy" id="about">
          <p className="eyebrow eyebrow--light">Human-centred support</p>
          <h2 id="human-title">Technology support that feels personal.</h2>
          <p className="human-lede">
            The quality of an IT provider is measured by how people feel when they need help. Our team explains what is happening, owns the issue and stays involved until it is properly resolved.
          </p>
          <div className="human-promises">
            <article><UserFocus size={25} weight="light" aria-hidden="true" /><div><strong>Responsive</strong><span>We are there when you need us.</span></div></article>
            <article><Heart size={25} weight="light" aria-hidden="true" /><div><strong>Accountable</strong><span>We take the outcome personally.</span></div></article>
            <article><ChatCircleText size={25} weight="light" aria-hidden="true" /><div><strong>Clear</strong><span>We explain, not overwhelm.</span></div></article>
            <article><LockKey size={25} weight="light" aria-hidden="true" /><div><strong>Disciplined</strong><span>Great service is our operating standard.</span></div></article>
          </div>
        </div>
      </section>

      <section className="capabilities-section section-pad" id="solutions" aria-labelledby="solutions-title">
        <div className="section-shell">
          <div className="capabilities-heading">
            <p className="eyebrow">Beyond managed services</p>
            <h2 id="solutions-title">Specialist capabilities.<br />Still one trusted partner.</h2>
            <p>
              When your business needs more than day-to-day IT, Redstone can design, deliver and continuously improve the projects, compliance programmes, applications and workflows that move it forward.
            </p>
          </div>
          <div className="capabilities-list">
            {capabilities.map((capability, index) => {
              const Icon = capability.icon;
              return (
                <article key={capability.name}>
                  <span>0{index + 1}</span>
                  <Icon size={28} weight="light" aria-hidden="true" />
                  <div><h3>{capability.name}</h3><p>{capability.text}</p></div>
                  <a href={assessmentHref} aria-label={`Discuss ${capability.name} with Redstone`}><ArrowUpRight size={20} weight="bold" aria-hidden="true" /></a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="outcomes-section section-pad" aria-labelledby="outcomes-title">
        <div className="section-shell outcomes-layout">
          <div className="outcomes-heading">
            <p className="eyebrow">What better-managed IT changes</p>
            <h2 id="outcomes-title">Less disruption.<br />More confidence.</h2>
            <p>The real value is not in software licences or technical reports. It is in what your people and leaders experience every day.</p>
          </div>
          <div className="outcomes-grid">
            {outcomes.map(([title, text], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="director-section section-pad" aria-labelledby="director-title">
        <div className="section-shell director-layout">
          <div className="director-marker"><GlobeHemisphereWest size={34} weight="light" aria-hidden="true" /><span>A local partner<br />with a long view.</span></div>
          <div className="director-message">
            <p className="eyebrow">A message from our director</p>
            <h2 id="director-title">“Technology should give business leaders confidence—not another problem to manage.”</h2>
            <p>
              Redstone was built on a simple principle: businesses deserve an IT partner that takes their success personally. Our goal is not simply to support your technology, but to become a trusted adviser that helps your organisation operate more securely, efficiently and confidently.
            </p>
            <div className="signature"><strong>Garret Ritchie</strong><span>Director, Redstone Technology Solutions</span></div>
          </div>
        </div>
      </section>

      <section className="assessment-section" id="assessment" aria-labelledby="assessment-title">
        <div className="assessment-card">
          <div className="assessment-copy">
            <p className="eyebrow eyebrow--light">Start with clarity</p>
            <h2 id="assessment-title">Find out what your technology environment is not telling you.</h2>
            <p>
              Get a practical review of your network, infrastructure, security posture and operational risks—with clear recommendations and no pressure.
            </p>
            <div className="assessment-actions">
              <a className="button" href={assessmentHref}>Request Your Free Assessment <ArrowRight size={18} weight="bold" aria-hidden="true" /></a>
              <a className="assessment-phone" href="tel:+12426016014"><Phone size={19} weight="fill" aria-hidden="true" /> (242) 601-6014</a>
            </div>
          </div>
          <div className="assessment-points" aria-label="Assessment benefits">
            <p><CheckCircle size={21} weight="fill" aria-hidden="true" /> A practical, business-first review</p>
            <p><CheckCircle size={21} weight="fill" aria-hidden="true" /> Clear priorities and recommendations</p>
            <p><CheckCircle size={21} weight="fill" aria-hidden="true" /> No generic sales presentation</p>
            <p><CheckCircle size={21} weight="fill" aria-hidden="true" /> No obligation and no pressure</p>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-main section-shell">
          <div className="footer-brand">
            <Logo inverse />
            <p>Managed technology. Exceptional service. Lasting partnerships.</p>
            <div className="footer-contact">
              <a href="tel:+12426016014"><Phone size={18} weight="light" aria-hidden="true" />(242) 601-6014</a>
              <a href="mailto:msp@redstoneTS.com"><EnvelopeSimple size={18} weight="light" aria-hidden="true" />msp@redstoneTS.com</a>
              <span><MapPin size={18} weight="light" aria-hidden="true" />Shirley Street, Nassau, The Bahamas</span>
            </div>
          </div>
          <div className="footer-links">
            <div><h3>Managed Services</h3><a href="#services">Overwatch</a><a href="#services">Checkmark</a><a href="#services">Helpdesk</a><a href="#services">Shield</a><a href="#services">Cirrus</a></div>
            <div><h3>Solutions</h3><a href="#solutions">Ad Hoc Projects</a><a href="#solutions">Security & Compliance</a><a href="#solutions">AI Web & Applications</a><a href="#solutions">Workflow Automation</a><a href={assessmentHref}>Free Assessment</a></div>
            <div><h3>Redstone</h3><a href="#why-redstone">Why Redstone</a><a href="#process">Our Approach</a><a href="#about">About</a><a href="tel:+12426018324">Client Support</a><a href={assessmentHref}>Contact</a></div>
          </div>
        </div>
        <div className="footer-bottom section-shell">
          <p>© 2026 Redstone Technology Solutions Ltd. All rights reserved.</p>
          <div><a href="#top">Privacy Policy</a><a href="#top">Terms of Use</a><a href="#top">Cookie Policy</a></div>
        </div>
      </footer>
    </main>
  );
}
