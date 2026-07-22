import { useEffect, useRef } from "react";
import { ArrowUpRight, CheckCircle, Compass, X } from "@phosphor-icons/react";

const values = [
  {
    title: "Customer Commitment",
    summary: "Memorable, responsive and genuinely exceptional service in every client interaction.",
    detail: "We value relationships over transactions. We take time to understand our clients, communicate clearly, follow through on our commitments and continuously improve their experience.",
  },
  {
    title: "People and Teamwork",
    summary: "People are at the centre of our business.",
    detail: "We hire talented professionals, invest in their development and collaborate across roles to solve problems, support one another and deliver the best possible outcome for every client.",
  },
  {
    title: "Expertise and Professionalism",
    summary: "Informed, responsible and effective technology guidance.",
    detail: "We invest continuously in training, professional development, industry certifications and proven technical standards. Every recommendation must be carefully considered, professionally delivered and appropriate for the client’s needs.",
  },
  {
    title: "Personal Accountability",
    summary: "We take ownership of our work and our commitments.",
    detail: "Every team member is responsible for delivering on promises, communicating openly, addressing problems promptly and maintaining the standards our clients expect from Redstone.",
  },
  {
    title: "Integrity",
    summary: "Trust is earned through consistency, transparency and doing what is right.",
    detail: "We provide honest advice, protect our clients’ interests and recommend solutions based on what will deliver the greatest long-term value—even when it is not the easiest option.",
  },
  {
    title: "Sustainable Profitability",
    summary: "Financial strength allows us to keep improving the service our clients rely on.",
    detail: "Profitability helps us invest in better people, tools, systems, training and services. It supports a stable company, but our purpose remains creating meaningful value and helping our clients succeed.",
  },
];

export default function AboutRedstoneDetails() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openDetails = () => dialogRef.current?.showModal();
  const closeDetails = () => dialogRef.current?.close();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const closeOnBackdrop = (event: MouseEvent) => {
      if (event.target === dialog) closeDetails();
    };

    dialog.addEventListener("click", closeOnBackdrop);
    return () => dialog.removeEventListener("click", closeOnBackdrop);
  }, []);

  return (
    <>
      <button className="about-story-link" type="button" onClick={openDetails} aria-haspopup="dialog">
        <Compass size={20} weight="duotone" aria-hidden="true" />
        Vision, mission &amp; the Redstone Code
        <ArrowUpRight size={17} weight="bold" aria-hidden="true" />
      </button>

      <dialog className="about-details-dialog" ref={dialogRef} aria-labelledby="about-details-title">
        <div className="about-details-shell">
          <header className="about-details-header">
            <div>
              <p className="eyebrow eyebrow--light">About Redstone</p>
              <h2 id="about-details-title">Well-run businesses manage technology intentionally.</h2>
              <p>Redstone Technology Solutions helps organisations build, manage, protect and improve the technology they depend on every day.</p>
              <p>We combine technical expertise with responsive, human-centred service and clear accountability. The goal is not merely to fix problems, but to help clients reduce risk, improve productivity, protect their reputation and use technology more effectively as the business grows.</p>
            </div>
            <button type="button" onClick={closeDetails} aria-label="Close About Redstone">
              <X size={20} weight="bold" aria-hidden="true" />
            </button>
          </header>

          <div className="about-direction-grid">
            <section>
              <span>01 / Our vision</span>
              <h3>To set the professional technology management standard for the businesses we serve.</h3>
              <p>Dependable technology, informed decisions and service that contribute directly to client success.</p>
            </section>
            <section>
              <span>02 / Our mission</span>
              <h3>Help clients achieve business goals through dependable, responsibly managed technology.</h3>
              <p>We build lasting partnerships through professionalism, expertise, reliability, integrity and an uncompromising commitment to exceptional customer service.</p>
            </section>
          </div>

          <section className="redstone-code" aria-labelledby="redstone-code-title">
            <div className="redstone-code-intro">
              <div>
                <p className="eyebrow">The Redstone Code</p>
                <h2 id="redstone-code-title">The standards behind every decision.</h2>
              </div>
              <p>Our values are not statements that sit on a wall. They guide how we support clients, work with one another and measure success—keeping us focused on excellent work, earned trust and meaningful client outcomes.</p>
            </div>

            <div className="redstone-code-grid">
              {values.map((value, index) => (
                <article key={value.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <CheckCircle size={21} weight="duotone" aria-hidden="true" />
                  <h3>{value.title}</h3>
                  <strong>{value.summary}</strong>
                  <p>{value.detail}</p>
                </article>
              ))}
            </div>
          </section>

          <footer className="about-details-footer">
            <Compass size={24} weight="duotone" aria-hidden="true" />
            <p>Professional expertise. Human commitment. Long-term value.</p>
          </footer>
        </div>
      </dialog>
    </>
  );
}
