import { useEffect, useRef } from "react";
import { ArrowUpRight, CheckCircle, Certificate, UsersThree, X } from "@phosphor-icons/react";
import { getContent } from "../contentStore";

type TeamMember = {
  name: string;
  title: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
  imageFocus?: "top";
  imagePending?: boolean;
  responsibility: string;
  description: string;
  profile?: boolean;
};

export default function TeamSection() {
  const teamContent = getContent().team;
  const teamMembers = teamContent.members as TeamMember[];
  const credentialGroups = teamContent.credentialGroups;
  const credentialsDialogRef = useRef<HTMLDialogElement>(null);
  const applicationDialogRef = useRef<HTMLDialogElement>(null);

  const openCredentials = () => credentialsDialogRef.current?.showModal();
  const closeCredentials = () => credentialsDialogRef.current?.close();
  const openApplication = () => applicationDialogRef.current?.showModal();
  const closeApplication = () => applicationDialogRef.current?.close();

  useEffect(() => {
    const dialogs = [credentialsDialogRef.current, applicationDialogRef.current].filter(Boolean) as HTMLDialogElement[];
    if (!dialogs.length) return;

    const closeOnBackdrop = (event: MouseEvent) => {
      const dialog = event.currentTarget as HTMLDialogElement;
      if (event.target === dialog) dialog.close();
    };

    dialogs.forEach((dialog) => dialog.addEventListener("click", closeOnBackdrop));
    return () => dialogs.forEach((dialog) => dialog.removeEventListener("click", closeOnBackdrop));
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
          <button className="team-application-link" type="button" onClick={openApplication} aria-haspopup="dialog" aria-controls="team-application-dialog">
            Interested in joining Redstone?
            <span>Apply here</span>
            <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
          </button>
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
                <h3>{teamContent.supportCard.title}</h3>
              </div>
              <p>{teamContent.supportCard.subtitle}</p>
            </div>
            <div className="team-card-responsibility"><span>Supporting</span><strong>{teamContent.supportCard.supporting}</strong></div>
          </article>
        </div>
      </div>

      <dialog className="team-credentials-dialog" ref={credentialsDialogRef} aria-labelledby="team-credentials-title">
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

      <dialog className="team-application-dialog" id="team-application-dialog" ref={applicationDialogRef} aria-labelledby="team-application-title">
        <div className="team-application-shell">
          <header className="team-application-header">
            <div>
              <p className="eyebrow">Careers at Redstone</p>
              <h2 id="team-application-title">Apply to join our team.</h2>
              <p>Use the secure form below to share your information with Redstone. The form may take a moment to load.</p>
            </div>
            <button type="button" onClick={closeApplication} aria-label="Close application form">
              <X size={20} weight="bold" aria-hidden="true" />
            </button>
          </header>
          <div className="team-application-frame-wrap">
            <iframe
              className="team-application-frame"
              src="https://form.jotform.com/222757234705053"
              title="Redstone team application form"
              loading="lazy"
            />
          </div>
        </div>
      </dialog>
    </section>
  );
}
