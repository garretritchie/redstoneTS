"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, CheckCircle, EnvelopeSimple, GlobeHemisphereWest, LinkedinLogo, Phone, X } from "@phosphor-icons/react";

const credentials = [
  "Certified Information Systems Security Officer",
  "Certified Ethical Hacker",
  "Certified Penetration Testing Engineer",
  "Microsoft MCSE / MCSA",
  "CompTIA A+ / Network+",
  "Cisco CCENT",
];

const trainerCredentials = [
  "Microsoft Certified Trainer (MCT)",
  "CompTIA Certified Trainer (CTT+)",
  "Certified Mile2 Instructor",
];

const focusAreas = [
  "Managed IT, infrastructure and cybersecurity",
  "AI-powered applications and workflow automation",
  "Technology strategy and business operations",
  "Technical education, mentorship and enablement",
];

export default function DirectorProfile() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openProfile = () => dialogRef.current?.showModal();
  const closeProfile = () => dialogRef.current?.close();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClick = (event: MouseEvent) => {
      if (event.target === dialog) closeProfile();
    };

    dialog.addEventListener("click", handleClick);
    return () => dialog.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <button className="director-profile-link" type="button" onClick={openProfile} aria-haspopup="dialog">
        About the director <ArrowUpRight size={17} weight="bold" aria-hidden="true" />
      </button>

      <dialog className="director-profile-dialog" ref={dialogRef} aria-labelledby="director-profile-title">
        <div className="director-profile-shell">
          <aside className="director-profile-visual">
            <span className="director-profile-number">01 / Leadership profile</span>
            <div className="director-profile-portrait">
              <img src="/director-garret-natural-cutout.png" alt="Garret Ritchie, Managing Director of Redstone Technology Solutions in Nassau, The Bahamas" width="1046" height="1155" loading="lazy" decoding="async" />
            </div>
            <div className="director-profile-visual-contact" aria-label="Contact Garret Ritchie">
              <span>Leadership contact</span>
              <div><EnvelopeSimple size={17} weight="light" aria-hidden="true" />gritchie@redstoneTS.com</div>
              <a href="tel:+12426016014"><Phone size={17} weight="light" aria-hidden="true" />242-601-6014 ext 311</a>
              <div><GlobeHemisphereWest size={17} weight="light" aria-hidden="true" />Nassau, The Bahamas</div>
              <a className="director-profile-linkedin" href="https://bs.linkedin.com/in/garretritchie" target="_blank" rel="noreferrer">
                <LinkedinLogo size={17} weight="fill" aria-hidden="true" />
                <span>View LinkedIn profile</span>
                <ArrowUpRight className="director-profile-linkedin-arrow" size={15} weight="bold" aria-hidden="true" />
              </a>
            </div>
          </aside>

          <div className="director-profile-content">
            <button className="director-profile-close" type="button" onClick={closeProfile} aria-label="Close director profile">
              <X size={20} weight="bold" aria-hidden="true" />
            </button>

            <p className="director-profile-kicker">Technology leadership / Human-centred systems</p>
            <h2 id="director-profile-title">Garret Ritchie</h2>
            <p className="director-profile-role">Managing Director, Technology Strategist, Systems Builder and Educator.</p>
            <p className="director-profile-intro">
              Garret is a Bahamian technology entrepreneur with more than 25 years of experience helping organisations solve practical business problems through technology. As Managing Director of Redstone, he guides technical operations, client solutions, project delivery and team execution.
            </p>
            <p className="director-profile-intro">
              His work connects managed IT, infrastructure, cybersecurity, artificial intelligence, software development, automation and user experience. He approaches them as parts of one operating system - bringing people, technology and business priorities together so the whole organisation can work better.
            </p>
            <p className="director-profile-intro">
              His experience is grounded in hands-on IT management and long-running technical instruction. He has served as a Lead Technical Trainer since 2006, helping students and working professionals turn complex technology into practical capability.
            </p>

            <div className="director-profile-stats" aria-label="Professional profile highlights">
              <div><strong>25+</strong><span>Years in technology</span></div>
              <div><strong>Director</strong><span>Redstone leadership</span></div>
              <div><strong>Instructor</strong><span>Lead technical trainer since 2006</span></div>
            </div>

            <section className="director-profile-focus" aria-labelledby="director-focus-title">
              <h3 id="director-focus-title">Areas of focus</h3>
              <ul>
                {focusAreas.map((item) => (
                  <li key={item}><CheckCircle size={16} weight="fill" aria-hidden="true" />{item}</li>
                ))}
              </ul>
            </section>

            <div className="director-profile-credentials" aria-label="Professional and trainer credentials">
              <section>
                <h3>Highlighted professional credentials</h3>
                <ul>
                  {credentials.map((item) => (
                    <li key={item}><CheckCircle size={16} weight="fill" aria-hidden="true" />{item}</li>
                  ))}
                </ul>
              </section>
              <section>
                <h3>Trainer credentials</h3>
                <ul>
                  {trainerCredentials.map((item) => (
                    <li key={item}><CheckCircle size={16} weight="fill" aria-hidden="true" />{item}</li>
                  ))}
                </ul>
              </section>
            </div>

          </div>
        </div>
      </dialog>
    </>
  );
}
