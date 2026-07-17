"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle,
  CloudArrowUp,
  GearSix,
  Headset,
  Pulse,
  ShieldCheck,
  X,
} from "@phosphor-icons/react";

const services = [
  {
    brand: "Overwatch",
    name: "Remote Monitoring & Management",
    promise: "See issues early. Act before impact.",
    description:
      "Continuous visibility into device health, availability and developing issues so problems do not remain unnoticed.",
    responsibility: "Monitoring, visibility, alerting, device health and early intervention across the managed environment.",
    ongoing: "Technology conditions change throughout the day. Continuous monitoring is what reveals failures, negative trends and capacity concerns before users or customers feel the impact.",
    detail:
      "Overwatch feeds live health and performance information from your environment to Redstone. That visibility helps our team identify failures, negative trends and maintenance needs early - often before users notice a problem.",
    outcome:
      "A clearer view of your technology, fewer avoidable interruptions and recommendations based on how your systems are actually performing.",
    role: "The visibility layer",
    bestFor: "Organisations that rely on always-available servers, workstations, connectivity and line-of-business systems.",
    connectsTo: "Overwatch detects and prioritises. Checkmark remediates infrastructure issues, Helpdesk coordinates user impact, Shield correlates security events and Cirrus extends visibility into cloud services.",
    photo: "/service-overwatch.jpg",
    photoAlt: "Technology monitoring dashboard displaying performance and availability analytics",
    delivery: [
      "Health and performance telemetry is collected continuously across managed devices.",
      "Meaningful alerts create tickets and follow an escalation path instead of disappearing into dashboard noise.",
      "Trend data informs maintenance, capacity planning and lifecycle recommendations.",
    ],
    benefits: ["Earlier issue detection", "Fewer avoidable interruptions", "Evidence-based technology planning"],
    icon: Pulse,
    covers: [
      "24/7/365 network, server and endpoint monitoring",
      "Health, availability and performance baselines",
      "Automated alerts, tickets and escalation",
      "Scheduled maintenance and proactive remediation",
      "Usage-based upgrade and lifecycle recommendations",
    ],
  },
  {
    brand: "Checkmark",
    name: "Core Infrastructure Support & Maintenance",
    promise: "Keep the foundation stable and dependable.",
    description:
      "Disciplined maintenance of servers, networks, workstations and core systems so the foundation stays current and dependable.",
    responsibility: "Infrastructure maintenance, patching, configuration, documentation, standards and long-term reliability.",
    ongoing: "Patches, configurations, hardware lifecycles and business requirements keep changing. Without active maintenance, reliability and security decline gradually—often without a single obvious failure.",
    detail:
      "Checkmark manages the core server and network environment on an ongoing basis. Preventive maintenance, careful configuration and experienced engineering keep the foundation current, documented and ready to support changing business needs.",
    outcome:
      "A stable, maintainable infrastructure with fewer recurring faults, better performance and a clearer path for growth.",
    role: "The stability layer",
    bestFor: "Businesses that need their servers, network, virtual infrastructure and core systems maintained as one dependable foundation.",
    connectsTo: "Checkmark acts on Overwatch alerts, supports Helpdesk escalations, applies Shield requirements and keeps the infrastructure beneath Cirrus services properly configured.",
    photo: "/service-checkmark.jpg",
    photoAlt: "Network servers and connected infrastructure in a secure data centre",
    delivery: [
      "Preventive maintenance keeps core systems current, supportable and documented.",
      "Experienced engineers make controlled configuration, performance and security changes.",
      "Redstone coordinates infrastructure work with application vendors and future business projects.",
    ],
    benefits: ["A more stable foundation", "Fewer recurring infrastructure faults", "Controlled growth and lifecycle planning"],
    icon: GearSix,
    covers: [
      "Server, network and workstation maintenance",
      "Security, performance and configuration changes",
      "Patching, lifecycle planning and documentation",
      "Virtual server replication and failover support",
      "Coordination with line-of-business vendors",
    ],
  },
  {
    brand: "Helpdesk",
    name: "End User Support",
    promise: "Give every user a human path back to productive.",
    description:
      "Responsive, accountable support that keeps employees productive and gives every user a professional path to resolution.",
    responsibility: "User support, issue resolution, communication, service experience and employee productivity.",
    ongoing: "People encounter new issues, requests and changes every day. A managed helpdesk provides consistent ownership, prioritisation and follow-through instead of leaving employees to find their own workaround.",
    detail:
      "Helpdesk gives your team one clear place to request assistance by telephone, email or web. Redstone resolves issues remotely whenever practical and provides onsite support when the situation requires a hands-on response.",
    outcome:
      "Less time lost to technology problems and a support experience that feels responsive, professional and personal.",
    role: "The people layer",
    bestFor: "Teams that need one clear, friendly and accountable place to get help with everyday technology issues and requests.",
    connectsTo: "Helpdesk translates the managed system into a human experience, using Overwatch context and escalating into Checkmark, Shield or Cirrus when deeper expertise is needed.",
    photo: "/service-helpdesk.jpg",
    photoAlt: "IT support professional assisting users from a multi-screen helpdesk workstation",
    delivery: [
      "Requests are logged, prioritised, tracked and owned through to resolution.",
      "Technicians resolve issues remotely whenever practical and coordinate onsite support when required.",
      "Users receive clear updates while Redstone works with third-party application and service vendors behind the scenes.",
    ],
    benefits: ["Less employee downtime", "Clear ownership and follow-through", "A professional, human support experience"],
    icon: Headset,
    covers: [
      "Remote and onsite end-user support",
      "Workstations, printers and common applications",
      "User administration, email and remote access",
      "Ticket tracking, prioritisation and escalation",
      "Third-party application and vendor coordination",
    ],
  },
  {
    brand: "Shield",
    name: "Security Services",
    promise: "Protect every layer of the business.",
    description:
      "Ongoing protection across users, devices, identity, email and infrastructure—not simply security software installed once.",
    responsibility: "Cybersecurity, data protection, threat response, access security and continuous risk reduction.",
    ongoing: "Threats, vulnerabilities, users and access patterns continually change. Security controls must be reviewed, maintained and improved to remain effective as the business evolves.",
    detail:
      "Shield brings network, endpoint and identity protection together so security controls can work as a coordinated system. Redstone helps businesses prevent, detect and respond to threats while building the policies and operating discipline needed for stronger compliance.",
    outcome:
      "Layered protection, clearer security posture and practical guidance that keeps risk decisions connected to the business.",
    role: "The protection layer",
    bestFor: "Organisations that need coordinated, continuously managed security across users, identities, endpoints, email, networks and business data.",
    connectsTo: "Shield uses Overwatch telemetry, sets standards for Checkmark, guides secure Helpdesk practices and protects the identities, data and workloads managed through Cirrus.",
    photo: "/service-shield.jpg",
    photoAlt: "Digital security interface representing coordinated cybersecurity protection",
    delivery: [
      "Layered controls are managed as a coordinated security system rather than isolated products.",
      "Security events, vulnerabilities and control gaps are reviewed and translated into practical action.",
      "Policies, awareness and compliance guidance help people and technology improve together.",
    ],
    benefits: ["Reduced cyber risk", "Faster detection and containment", "A stronger security and compliance posture"],
    icon: ShieldCheck,
    covers: [
      "Next-generation firewall management",
      "Endpoint, server and ransomware protection",
      "Email, web and application security controls",
      "Security audits and vulnerability assessments",
      "Security awareness, governance and compliance support",
      "Managed backup, recovery and ransomware resilience",
    ],
  },
  {
    brand: "Cirrus",
    name: "Cloud Services",
    promise: "Make cloud simpler, safer and more useful.",
    description:
      "Managed cloud access, collaboration, identity, backup and recovery that keep people and information available as circumstances change.",
    responsibility: "Cloud services, secure access, collaboration, backup, recovery and business continuity.",
    ongoing: "Cloud platforms, licences, identities, data and recovery needs evolve with the business. Ongoing management keeps access secure, costs controlled and information recoverable when it matters.",
    detail:
      "Cirrus combines cloud platforms and virtualisation with the planning, migration and ongoing management needed to make them dependable. Solutions can be private, public or hybrid and are shaped around access, cost, resilience and security requirements.",
    outcome:
      "More flexible systems, predictable operating costs and business information that remains accessible and recoverable when it matters.",
    role: "The modernisation layer",
    bestFor: "Businesses that want Microsoft 365, cloud platforms, virtualisation, identity and backup to operate as a secure, well-managed service.",
    connectsTo: "Cirrus extends the managed system beyond the office: Overwatch monitors availability, Checkmark supports the underlying platform, Helpdesk assists users and Shield secures access and data.",
    photo: "/service-cirrus.jpg",
    photoAlt: "Connected cities viewed from orbit representing secure cloud services",
    delivery: [
      "Redstone designs the right private, public or hybrid model around access, resilience, security and cost.",
      "Migrations are planned and executed with user impact, data protection and operational continuity in mind.",
      "Licensing, identity, backup and platform optimisation continue after the initial project is complete.",
    ],
    benefits: ["Simpler cloud operations", "Secure access from anywhere", "Predictable cost, resilience and recoverability"],
    icon: CloudArrowUp,
    covers: [
      "Microsoft 365 and cloud identity",
      "Azure, AWS and hybrid cloud solutions",
      "Hyper-V and VMware virtualisation",
      "Cloud migration, licensing and optimisation",
      "Backup, replication and disaster recovery",
    ],
  },
];

export default function ServiceExplorer() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const active = services[activeIndex];
  const ActiveIcon = active.icon;

  const openService = (index: number) => {
    setActiveIndex(index);
    dialogRef.current?.showModal();
    requestAnimationFrame(() => contentRef.current?.scrollTo({ top: 0 }));
  };

  const closeService = () => dialogRef.current?.close();

  const selectService = (index: number) => {
    setActiveIndex(index);
    contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClick = (event: MouseEvent) => {
      if (event.target === dialog) closeService();
    };
    dialog.addEventListener("click", handleClick);
    return () => dialog.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <div className="services-grid">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <article className="service-card" id={service.brand.toLowerCase()} key={service.brand}>
              <button
                className="service-card-hitarea"
                type="button"
                onClick={() => openService(index)}
                aria-haspopup="dialog"
                aria-label={`Explore ${service.brand}: ${service.name}`}
              >
                <span className="sr-only">Open {service.brand} service details</span>
              </button>
              <div className="service-topline">
                <span className="service-index">0{index + 1}</span>
                <Icon size={32} weight="light" aria-hidden="true" />
              </div>
              <p className="service-brand">{service.brand}</p>
              <h3>{service.name}</h3>
              <p className="service-promise">{service.promise}</p>
              <p>{service.description}</p>
              <ul>
                {service.covers.slice(0, 3).map((item) => (
                  <li key={item}><CheckCircle size={15} weight="fill" aria-hidden="true" />{item}</li>
                ))}
              </ul>
              <span className="service-learn" aria-hidden="true">
                Explore {service.brand} <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
              </span>
            </article>
          );
        })}
      </div>

      <dialog className="service-dialog" ref={dialogRef} aria-labelledby="service-dialog-title">
        <div className="service-dialog-shell">
          <div className="service-dialog-rail">
            <img src={active.photo} alt={active.photoAlt} loading="lazy" decoding="async" />
            <div className="service-dialog-rail-shade" aria-hidden="true" />
            <div className="service-dialog-rail-top">
              <span>{String(activeIndex + 1).padStart(2, "0")} / 05</span>
              <ActiveIcon size={42} weight="light" aria-hidden="true" />
            </div>
            <div className="service-dialog-rail-copy">
              <span>{active.role}</span>
              <h3>{active.brand}</h3>
              <p>{active.promise}</p>
            </div>
          </div>
          <div className="service-dialog-content" ref={contentRef}>
            <button className="service-dialog-close" type="button" onClick={closeService} aria-label="Close service details">
              <X size={20} weight="bold" aria-hidden="true" />
            </button>

            <nav className="service-dialog-switcher" aria-label="Explore Redstone managed services">
              {services.map((service, index) => (
                <button className={index === activeIndex ? "is-active" : ""} type="button" onClick={() => selectService(index)} key={service.brand} aria-current={index === activeIndex ? "page" : undefined}>
                  <span>{String(index + 1).padStart(2, "0")}</span>{service.brand}
                </button>
              ))}
            </nav>

            <header className="service-dialog-header">
              <p className="service-dialog-kicker">The Redstone managed system / {active.brand}</p>
              <h2 id="service-dialog-title">{active.name}</h2>
              <p className="service-dialog-promise">{active.promise}</p>
              <p className="service-dialog-detail">{active.detail}</p>
            </header>

            <section className="service-dialog-responsibilities" aria-label={`${active.brand} service responsibilities`}>
              <div>
                <span>What it manages</span>
                <p>{active.responsibility}</p>
              </div>
              <div>
                <span>Why it requires ongoing attention</span>
                <p>{active.ongoing}</p>
              </div>
            </section>

            <section className="service-dialog-best-fit" aria-labelledby="service-best-fit-title">
              <span id="service-best-fit-title">Best suited for</span>
              <p>{active.bestFor}</p>
            </section>

            <div className="service-dialog-information">
              <section aria-labelledby="service-coverage-title">
                <p className="service-dialog-section-label" id="service-coverage-title">What it covers</p>
                <ul className="service-dialog-checklist">
                  {active.covers.map((item) => (
                    <li key={item}><CheckCircle size={17} weight="fill" aria-hidden="true" />{item}</li>
                  ))}
                </ul>
              </section>
              <section aria-labelledby="service-delivery-title">
                <p className="service-dialog-section-label" id="service-delivery-title">How Redstone delivers it</p>
                <ol className="service-dialog-delivery">
                  {active.delivery.map((item, index) => (
                    <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></li>
                  ))}
                </ol>
              </section>
            </div>

            <section className="service-dialog-value" aria-labelledby="service-value-title">
              <div className="service-dialog-value-intro">
                <span id="service-value-title">Business value</span>
                <p>{active.outcome}</p>
              </div>
              <div className="service-dialog-benefits">
                {active.benefits.map((benefit, index) => (
                  <div key={benefit}><span>0{index + 1}</span><strong>{benefit}</strong></div>
                ))}
              </div>
            </section>

            <section className="service-dialog-system" aria-labelledby="service-system-title">
              <div><ActiveIcon size={25} weight="duotone" aria-hidden="true" /><span id="service-system-title">How {active.brand} connects</span></div>
              <p>{active.connectsTo}</p>
            </section>

            <div className="service-dialog-actions">
              <a className="button" href="/contact" onClick={closeService}>
                Discuss {active.brand} <ArrowRight size={18} weight="bold" aria-hidden="true" />
              </a>
              <span>One specialist practice. One coordinated Redstone coverage system.</span>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
