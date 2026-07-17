"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, CheckCircle, Certificate, X } from "@phosphor-icons/react";

const teamMembers = [
  {
    name: "Garret Ritchie",
    title: "Managing Director",
    image: "/team-garret-ritchie.png",
    imageAlt: "Garret Ritchie, Managing Director at Redstone Technology Solutions",
    responsibility: "Technology Strategy, Client Solutions & Operations",
    description: "Guides Redstone’s technical operations, client solutions, project delivery and long-term technology strategy.",
    featured: true,
  },
  {
    name: "Devon Leslie",
    title: "Director of Training Support & Business Adviser",
    image: "/team-devon-leslie.png",
    imageAlt: "Devon Leslie, Director of Training Support and Business Adviser at Redstone Technology Solutions",
    responsibility: "Training Support, Professional Development & Business Advisory",
    description: "Supports professional development and advises on business priorities and client outcomes.",
  },
  {
    name: "Trey Curling",
    title: "Technical Supervisor",
    image: "/redstone-favicon.png",
    imageAlt: "Portrait placeholder for Trey Curling",
    imagePending: true,
    responsibility: "Technical Team Leadership",
    description: "Leads technical coordination, service quality and the day-to-day delivery of client support.",
  },
  {
    name: "Demetris Robinson",
    title: "IT Specialist",
    image: "/redstone-favicon.png",
    imageAlt: "Portrait placeholder for Demetris Robinson",
    imagePending: true,
    responsibility: "Helpdesk & Server Maintenance",
    description: "Supports end users and helps maintain the server systems our clients rely on every day.",
  },
  {
    name: "Jayson Greene",
    title: "IT Specialist",
    image: "/redstone-favicon.png",
    imageAlt: "Portrait placeholder for Jayson Greene",
    imagePending: true,
    responsibility: "Helpdesk & Server Maintenance",
    description: "Provides responsive user support and assists with the ongoing care of client server environments.",
  },
];

const credentialGroups = [
  {
    title: "Security & risk",
    items: [
      "Certified Information Systems Security Officer",
      "Certified Penetration Testing Engineer",
      "Certified Ethical Hacker",
      "Cisco Certified Network Associate Security",
      "CheckPoint Certified Security Administrator",
    ],
  },
  {
    title: "Networking & infrastructure",
    items: [
      "Cisco Certified Entry Networking Technician",
      "Cisco Certified Network Associate",
      "Cisco Certified Network Professional",
      "Cisco Certified Design Professional",
      "Cisco Certified Internetwork Professional",
      "Brocade Certified Network Professional",
      "Juniper Networks Certified Associate",
      "Juniper Network Certified Internet Professional – Service Provider",
      "Juniper Network Certified Internet Professional – Enterprise Routing & Switching",
      "Juniper Network Certified Internet Professional – Security",
      "Juniper Network Certified Design Specialist – Data Center",
    ],
  },
  {
    title: "Systems & user support",
    items: [
      "MTA Networking Fundamentals",
      "MTA Operating System Fundamentals",
      "CompTIA A+ IT Support Technician",
      "CompTIA Network+",
      "CompTIA IT Fundamentals",
      "Microsoft Certified Systems Engineer",
      "Microsoft Certified Systems Administrator | Security",
      "Microsoft Certified Systems Administrator | Messaging",
      "Microsoft Certified Professional",
      "Microsoft Technology Specialist",
      "Microsoft Small Business Specialist",
      "Microsoft Office Specialist",
    ],
  },
  {
    title: "Training & service management",
    items: [
      "CompTIA Certified Trainer",
      "Microsoft Certified Trainer",
      "CBP Project Management",
      "ITIL Foundations",
    ],
  },
];

export default function TeamSection() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openCredentials = () => dialogRef.current?.showModal();
  const closeCredentials = () => dialogRef.current?.close();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const closeOnBackdrop = (event: MouseEvent) => {
      if (event.target === dialog) closeCredentials();
    };

    dialog.addEventListener("click", closeOnBackdrop);
    return () => dialog.removeEventListener("click", closeOnBackdrop);
  }, []);

  return (
    <section className="team-section section-pad" id="team" aria-labelledby="team-title">
      <div className="section-shell team-layout">
        <div className="team-intro">
          <p className="eyebrow">Our team</p>
          <h2 id="team-title">Expertise you can reach.<br /><span>People you can trust.</span></h2>
          <p>Redstone hires talented technology professionals who combine technical discipline with clear communication, sound judgment and genuine care for client outcomes.</p>
          <p className="team-note">These are selected leadership and delivery roles—not a complete employee directory. They represent some of the people responsible for keeping our service personal, coordinated and accountable.</p>
          <button className="team-credentials-button" type="button" onClick={openCredentials} aria-haspopup="dialog">
            <Certificate size={20} weight="duotone" aria-hidden="true" />
            Explore our technical credentials
            <ArrowUpRight size={17} weight="bold" aria-hidden="true" />
          </button>
        </div>

        <div className="team-grid" aria-label="Selected Redstone leadership and delivery roles">
          {teamMembers.map((member, index) => (
            <article key={member.name} className={member.featured ? "team-card--featured" : undefined}>
              <div className={`team-card-portrait${member.imagePending ? " team-card-portrait--pending" : ""}`}>
                <img src={member.image} alt={member.imageAlt} width="310" height="394" loading="lazy" decoding="async" />
              </div>
              <div className="team-card-heading">
                <div className="team-card-name-line">
                  <span className="team-card-number">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{member.name}</h3>
                </div>
                <p>{member.title}</p>
              </div>
              <div className="team-card-responsibility">
                <span>Responsible for</span>
                <strong>{member.responsibility}</strong>
              </div>
              <p className="team-card-description">{member.description}</p>
              {member.featured ? <a className="team-card-profile-link" href="#director">View leadership profile <ArrowUpRight size={15} weight="bold" aria-hidden="true" /></a> : null}
            </article>
          ))}
        </div>
      </div>

      <dialog className="team-credentials-dialog" ref={dialogRef} aria-labelledby="team-credentials-title">
        <div className="team-credentials-shell">
          <header>
            <div>
              <p className="eyebrow">Certified expertise</p>
              <h2 id="team-credentials-title">Technical standards that support world-class service.</h2>
              <p>Members of Redstone’s technical team hold one or more respected international certifications. These credentials reinforce industry-standard practices across security, infrastructure, support, training and service management.</p>
            </div>
            <button type="button" onClick={closeCredentials} aria-label="Close technical credentials">
              <X size={20} weight="bold" aria-hidden="true" />
            </button>
          </header>

          <div className="team-credentials-grid">
            {credentialGroups.map((group) => (
              <section key={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((credential) => (
                    <li key={credential}><CheckCircle size={16} weight="fill" aria-hidden="true" />{credential}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <footer>
            <Certificate size={23} weight="duotone" aria-hidden="true" />
            <p>Individual credentials vary by team member and may evolve as certifications are renewed or expanded.</p>
          </footer>
        </div>
      </dialog>
    </section>
  );
}
