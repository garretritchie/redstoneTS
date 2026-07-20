"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, CheckCircle, Certificate, UsersThree, X } from "@phosphor-icons/react";

const teamMembers = [
  {
    name: "Garret Ritchie",
    title: "Managing Director",
    image: "/team-garret-ritchie-v2.jpg",
    imageWidth: 640,
    imageHeight: 640,
    imageAlt: "Garret Ritchie, Managing Director at Redstone Technology Solutions",
    responsibility: "Technology Strategy, Client Solutions & Operations",
    description: "Guides Redstone’s technical operations, client solutions, project delivery and long-term technology strategy.",
    profile: true,
  },
  {
    name: "Devon Leslie",
    title: "Director of Training Support & Business Adviser",
    image: "/team-devon-leslie.png",
    imageWidth: 285,
    imageHeight: 345,
    imageFocus: "top",
    imageAlt: "Devon Leslie, Director of Training Support and Business Adviser at Redstone Technology Solutions",
    responsibility: "Training Support, Professional Development & Business Advisory",
    description: "Supports professional development and advises on business priorities and client outcomes.",
  },
  {
    name: "Trey Curling",
    title: "Technical Supervisor",
    image: "/team-trey-curling.png",
    imageWidth: 1254,
    imageHeight: 1254,
    imageAlt: "Trey Curling, Technical Supervisor at Redstone Technology Solutions",
    responsibility: "Technical Team Leadership",
    description: "Leads technical coordination, service quality and the day-to-day delivery of client support.",
  },
  {
    name: "Demetris Robinson",
    title: "IT Specialist",
    image: "/team-demetris-robinson.png",
    imageWidth: 1254,
    imageHeight: 1254,
    imageAlt: "Demetris Robinson, IT Specialist at Redstone Technology Solutions",
    responsibility: "Helpdesk & Server Maintenance",
    description: "Supports end users and helps maintain the server systems our clients rely on every day.",
  },
  {
    name: "Jayson Greene",
    title: "IT Specialist",
    image: "/team-jayson-greene.jpg",
    imageWidth: 640,
    imageHeight: 734,
    imageAlt: "Jayson Greene, IT Specialist at Redstone Technology Solutions",
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
          <p>Redstone hires talented technology professionals who combine technical discipline with clear communication, sound judgment and genuine care for client outcomes. These selected roles are part of a wider team responsible for keeping our service personal, coordinated and accountable.</p>
          <button className="team-credentials-button" type="button" onClick={openCredentials} aria-haspopup="dialog">
            <Certificate size={20} weight="duotone" aria-hidden="true" />
            Explore our technical credentials
            <ArrowUpRight size={17} weight="bold" aria-hidden="true" />
          </button>
          <a className="team-application-link" href="https://form.jotform.com/222757234705053" target="_blank" rel="noreferrer">
            Interested in joining Redstone?
            <span>Apply here</span>
            <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
          </a>
        </div>

        <div className="team-grid" aria-label="Selected Redstone leadership and delivery roles">
          {teamMembers.map((member, index) => (
            <article key={member.name}>
              <div className={`team-card-portrait${member.imagePending ? " team-card-portrait--pending" : ""}${member.imageFocus === "top" ? " team-card-portrait--top" : ""}`}>
                <img src={member.image} alt={member.imageAlt} width={member.imageWidth} height={member.imageHeight} loading="lazy" decoding="async" />
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
              {member.profile ? <a className="team-card-profile-link" href="#director">View leadership profile <ArrowUpRight size={15} weight="bold" aria-hidden="true" /></a> : null}
            </article>
          ))}
          <article className="team-card--support">
            <div className="team-card-portrait team-card-portrait--support" aria-hidden="true"><UsersThree size={31} weight="duotone" /></div>
            <div className="team-card-heading">
              <div className="team-card-name-line">
                <span className="team-card-number">06</span>
                <h3>Admin &amp; Business Operations</h3>
              </div>
              <p>The people behind the service</p>
            </div>
            <div className="team-card-responsibility"><span>Supporting</span><strong>Helpdesk Administration, Finance, Sales &amp; Marketing, and Human Resources</strong></div>
          </article>
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
