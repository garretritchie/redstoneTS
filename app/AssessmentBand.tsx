import { ArrowRight, CheckCircle, Phone } from "@phosphor-icons/react/dist/ssr";

export default function AssessmentBand() {
  return (
    <section className="assessment-section" aria-labelledby="assessment-title">
      <div className="assessment-card section-shell">
        <div className="assessment-copy">
          <p className="eyebrow eyebrow--light">Start with clarity</p>
          <h2 id="assessment-title">Find out what your technology environment is not telling you.</h2>
          <p>A focused conversation with a senior Redstone advisor can reveal risk, recurring friction and practical opportunities to improve.</p>
          <div className="assessment-actions">
            <a className="button button--light" href="/contact">Request a free assessment <ArrowRight size={18} weight="bold" aria-hidden="true" /></a>
            <a className="assessment-phone" href="tel:+12426016014"><Phone size={18} weight="light" aria-hidden="true" />242-601-6014</a>
          </div>
        </div>
        <div className="assessment-points">
          <p><CheckCircle size={21} weight="fill" aria-hidden="true" /> Clear priorities and recommendations</p>
          <p><CheckCircle size={21} weight="fill" aria-hidden="true" /> No generic sales presentation</p>
          <p><CheckCircle size={21} weight="fill" aria-hidden="true" /> No obligation and no pressure</p>
        </div>
      </div>
    </section>
  );
}
