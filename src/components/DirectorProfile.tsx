import { useEffect, useRef } from "react";
import { ArrowUpRight, CheckCircle, EnvelopeSimple, GlobeHemisphereWest, LinkedinLogo, Phone, X } from "@phosphor-icons/react";
import { getContent } from "../contentStore";

export default function DirectorProfile() {
  const director = getContent().team.directorProfile;
  const credentials = director.professionalCredentials;
  const trainerCredentials = director.trainerCredentials;
  const focusAreas = director.focusAreas;
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
              <img src={director.image} alt={director.imageAlt} width="1046" height="1155" loading="lazy" decoding="async" />
            </div>
            <div className="director-profile-visual-contact" aria-label={`Contact ${director.name}`}>
              <span>Leadership contact</span>
              <div><EnvelopeSimple size={17} weight="light" aria-hidden="true" />{director.email}</div>
              <a href={director.phoneHref}><Phone size={17} weight="light" aria-hidden="true" />{director.phoneDisplay}</a>
              <div><GlobeHemisphereWest size={17} weight="light" aria-hidden="true" />{director.location}</div>
              <a className="director-profile-linkedin" href={director.linkedin} target="_blank" rel="noreferrer">
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

            <p className="director-profile-kicker">{director.kicker}</p>
            <h2 id="director-profile-title">{director.name}</h2>
            <p className="director-profile-role">{director.role}</p>
            {director.intro.map((paragraph) => (
              <p className="director-profile-intro" key={paragraph}>{paragraph}</p>
            ))}

            <div className="director-profile-stats" aria-label="Professional profile highlights">
              {director.stats.map((stat) => (
                <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>
              ))}
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
