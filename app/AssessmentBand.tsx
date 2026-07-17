import { ArrowRight, CheckCircle, Phone } from "@phosphor-icons/react/dist/ssr";

export default function AssessmentBand() {
  return (
    <section className="assessment-section" aria-labelledby="assessment-title">
      <div className="assessment-card section-shell">
        <div className="assessment-copy">
          <p className="eyebrow eyebrow--light">Raise your technology standard</p>
          <h2 id="assessment-title">See how your environment measures up.</h2>
          <p>A focused conversation with a senior Redstone adviser can clarify what is being managed, where responsibility is unclear and which improvements matter most to the business.</p>
          <div className="assessment-actions">
            <a className="button button--light" href="/contact">Assess your technology standard <ArrowRight size={18} weight="bold" aria-hidden="true" /></a>
            <a className="assessment-phone" href="tel:+12426016014"><Phone size={18} weight="light" aria-hidden="true" />242-601-6014</a>
          </div>
        </div>
        <div className="assessment-points">
          <p><CheckCircle size={21} weight="fill" aria-hidden="true" /> Clear view of responsibilities and gaps</p>
          <p><CheckCircle size={21} weight="fill" aria-hidden="true" /> Priorities based on impact and risk</p>
          <p><CheckCircle size={21} weight="fill" aria-hidden="true" /> A practical next step for your business</p>
        </div>
      </div>
    </section>
  );
}
