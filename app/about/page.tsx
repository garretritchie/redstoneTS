import type { Metadata } from "next";
import { CheckCircle, ChatCircleText, Heart, Headset, ShieldCheck, UserFocus } from "@phosphor-icons/react/dist/ssr";
import AssessmentBand from "../AssessmentBand";
import AboutRedstoneDetails from "../AboutRedstoneDetails";
import DirectorProfile from "../DirectorProfile";
import PageHero from "../PageHero";
import SiteFooter from "../SiteFooter";
import SiteHeader from "../SiteHeader";
import TeamSection from "../TeamSection";
import TestimonialCarousel from "../TestimonialCarousel";

export const metadata: Metadata = {
  title: "About Redstone Technology Solutions",
  description: "Meet Redstone, a Bahamian technology partner built around proactive service, accountable relationships, experienced leadership and human support.",
  alternates: { canonical: "/about" },
};

const outcomes = [
  ["Fewer recurring problems", "Issues are documented and solved at the root—not allowed to keep interrupting the same people."],
  ["Faster, clearer support", "Your team knows where to go and receives a professional, human response."],
  ["Stronger security", "Users, devices, systems and business information are protected by coordinated controls."],
  ["One clear owner", "No confusion between vendors, providers and internal staff when something needs attention."],
  ["Better decisions", "Projects and investments are evaluated through business impact, risk and long-term value."],
  ["More confidence", "Leadership can see the environment, understand the risks and plan what comes next."],
];

const technologyPartners = [
  ["Microsoft", "Cloud & productivity"],
  ["Sophos", "Cybersecurity"],
  ["Cisco", "Networking & infrastructure"],
  ["Juniper", "Networking & infrastructure"],
  ["Veeam", "Backup & resilience"],
  ["Wasabi", "Cloud storage"],
  ["CompTIA", "Professional ecosystem"],
  ["Dell", "Business infrastructure"],
  ["HP", "Business infrastructure"],
  ["VMware", "Virtualisation"],
  ["Digium", "Business communications"],
  ["Asterisk", "Business communications"],
  ["Ubiquiti", "Networking & connectivity"],
];

export default function AboutPage() {
  return (
    <main id="top">
      <SiteHeader />
      <PageHero eyebrow="Technology managed with intention" title={<>Higher standards.<br /><span>Better business confidence.</span></>} description="We believe technology should be managed as intentionally as finance, operations and customer service—with clear responsibility, proven standards and decisions grounded in business impact." primaryLabel="Book a technology conversation" secondaryLabel="Our leadership" secondaryHref="#director" tone="dark" />

      <section className="proof-section section-pad" aria-labelledby="about-proof-title">
        <div className="section-shell proof-layout"><div className="section-heading"><p className="eyebrow">Why Redstone</p><h2 id="about-proof-title">A higher standard<br />for technology.</h2></div><div className="proof-copy"><p>Business-critical systems should not depend on guesswork. Redstone combines prevention, responsive service and disciplined technical management so clients understand what is being managed, why it matters and who is accountable.</p><p>We work best with organisations that manage technology intentionally, invest according to business impact and value long-term outcomes over shortcuts. We can lead the complete technology function or strengthen the internal team already in place.</p><AboutRedstoneDetails /></div><div className="proof-numbers"><div><strong>20+ years</strong><span>Serving The Bahamas</span></div><div><strong>24/7/365</strong><span>Managed visibility</span></div><div><strong>5</strong><span>Connected service practices</span></div><div><strong>1</strong><span>Accountable relationship</span></div></div></div>
      </section>

      <section className="partnerships-section section-pad" id="partnerships" aria-labelledby="partnerships-title">
        <div className="section-shell partnerships-layout">
          <div className="partnerships-intro">
            <p className="eyebrow">Technology partners &amp; affiliations</p>
            <h2 id="partnerships-title">Proven technology.<br /><span>One accountable partner.</span></h2>
            <p>We are proud to be registered and affiliated with organisations across cloud, cybersecurity, infrastructure, networking, continuity and professional development.</p>
            <p className="partnerships-note">This broad ecosystem helps Redstone recommend and support the right-fit technology for each client environment—without forcing every business into the same stack.</p>
          </div>
          <div className="partnerships-grid" aria-label="Redstone technology partners and affiliations">
            {technologyPartners.map(([name, category], index) => (
              <article key={name}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{name}</h3>
                <p>{category}</p>
              </article>
            ))}
            <div className="partnerships-summary">
              <span>Connected by Redstone</span>
              <p>One integrated environment.<br />One accountable team.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="human-section" aria-labelledby="human-title">
        <TestimonialCarousel />
        <div className="human-copy"><p className="eyebrow eyebrow--light">Human-centred support</p><h2 id="human-title">Technology support that feels personal.</h2><p className="human-lede">The quality of an IT provider is measured by how people feel when they need help. Our team explains what is happening, owns the issue and stays involved until it is properly resolved.</p><div className="human-promises"><article><Headset size={23} weight="light" aria-hidden="true" /><div><strong>Responsive</strong><span>We are there when you need us.</span></div></article><article><Heart size={23} weight="light" aria-hidden="true" /><div><strong>Accountable</strong><span>We take the outcome personally.</span></div></article><article><ChatCircleText size={23} weight="light" aria-hidden="true" /><div><strong>Clear</strong><span>We explain, not overwhelm.</span></div></article><article><ShieldCheck size={23} weight="light" aria-hidden="true" /><div><strong>Disciplined</strong><span>Great service is our standard.</span></div></article></div></div>
      </section>

      <TeamSection />

      <section className="director-section section-pad" id="director" aria-labelledby="director-title">
        <div className="section-shell director-layout"><div className="director-visual"><div className="director-portrait"><img src="/director-garret-natural-cutout.png" alt="Garret Ritchie, Managing Director of Redstone Technology Solutions in Nassau, The Bahamas" width="1046" height="1155" loading="lazy" decoding="async" /></div><span className="director-marker"><UserFocus size={22} weight="duotone" aria-hidden="true" />A local partner<br />with a long view.</span></div><div className="director-message"><p className="eyebrow">A message from our director</p><h2 id="director-title">“Technology should give business leaders confidence—not another problem to manage.”</h2><p>Redstone’s goal is not simply to support your technology, but to become a trusted adviser that helps your organisation operate more securely, efficiently and confidently.</p><div className="director-signature"><strong>Garret Ritchie</strong><span>Managing Director, Redstone Technology Solutions</span></div><DirectorProfile /></div></div>
      </section>

      <section className="outcomes-section section-pad" aria-labelledby="outcomes-title">
        <div className="section-shell outcomes-layout"><div className="outcomes-heading"><p className="eyebrow">What the relationship changes</p><h2 id="outcomes-title">Less disruption.<br />More confidence.</h2><p>What worked when the business was smaller may no longer be enough. As more people, customers and critical processes depend on technology, the support model should grow to match the organisation you are becoming.</p></div><div className="outcomes-grid">{outcomes.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><CheckCircle size={24} weight="light" aria-hidden="true" /><h3>{title}</h3><p>{text}</p></article>)}</div></div>
      </section>

      <AssessmentBand ctaLabel="Book a technology conversation" />
      <SiteFooter />
    </main>
  );
}
