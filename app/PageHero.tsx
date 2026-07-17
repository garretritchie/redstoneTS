import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

type PageHeroProps = {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  tone?: "light" | "dark";
};

export default function PageHero({ eyebrow, title, description, primaryLabel = "Start a conversation", primaryHref = "/contact", secondaryLabel, secondaryHref, tone = "light" }: PageHeroProps) {
  return (
    <section className={`page-hero page-hero--${tone}`} aria-labelledby="page-title">
      <div className="page-hero-grid" aria-hidden="true" />
      <div className="section-shell page-hero-inner">
        <p className={`eyebrow ${tone === "dark" ? "eyebrow--light" : ""}`}>{eyebrow}</p>
        <h1 id="page-title">{title}</h1>
        <p>{description}</p>
        <div className="page-hero-actions">
          <a className={`button ${tone === "dark" ? "button--light" : ""}`} href={primaryHref}>{primaryLabel}<ArrowRight size={18} weight="bold" aria-hidden="true" /></a>
          {secondaryLabel && secondaryHref && <a className={`text-link ${tone === "dark" ? "text-link--inverse" : ""}`} href={secondaryHref}>{secondaryLabel}<ArrowRight size={17} weight="bold" aria-hidden="true" /></a>}
        </div>
      </div>
    </section>
  );
}
