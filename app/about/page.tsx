import type { Metadata } from "next";
import { CheckCircle, ChatCircleText, Heart, Headset, ShieldCheck, UserFocus } from "@phosphor-icons/react/dist/ssr";
import AssessmentBand from "../AssessmentBand";
import DirectorProfile from "../DirectorProfile";
import PageHero from "../PageHero";
import SiteFooter from "../SiteFooter";
import SiteHeader from "../SiteHeader";
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
      <PageHero eyebrow="A local partner with a long view" title={<>Technology expertise.<br /><span>Human commitment.</span></>} description="Redstone combines disciplined technical operations with real relationships, clear communication and a service standard designed to make business leaders feel confident." primaryLabel="Meet with our team" secondaryLabel="Our leadership" secondaryHref="#director" />

      <section className="proof-section section-pad" aria-labelledby="about-proof-title">
        <div className="section-shell proof-layout"><div className="section-heading"><p className="eyebrow">Why Redstone</p><h2 id="about-proof-title">More than IT.<br />A partner in your success.</h2></div><div className="proof-copy"><p>Redstone was built on a simple belief: businesses deserve an IT partner that takes their success personally.</p><p>Since 2006, our Bahamian team has combined proactive management, cybersecurity, cloud, strategy and project delivery to help organisations operate with less disruption and more confidence.</p></div><div className="proof-numbers"><div><strong>20+ years</strong><span>Serving The Bahamas</span></div><div><strong>24/7/365</strong><span>Managed visibility</span></div><div><strong>5</strong><span>Connected service practices</span></div><div><strong>1</strong><span>Accountable relationship</span></div></div></div>
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

      <section className="outcomes-section section-pad" aria-labelledby="outcomes-title">
        <div className="section-shell outcomes-layout"><div className="outcomes-heading"><p className="eyebrow">What the relationship changes</p><h2 id="outcomes-title">Less disruption.<br />More confidence.</h2><p>The result is not only better technology. It is what your people and leaders experience every day.</p></div><div className="outcomes-grid">{outcomes.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><CheckCircle size={24} weight="light" aria-hidden="true" /><h3>{title}</h3><p>{text}</p></article>)}</div></div>
      </section>

      <section className="director-section section-pad" id="director" aria-labelledby="director-title">
        <div className="section-shell director-layout"><div className="director-visual"><div className="director-portrait"><img src="/director-garret-natural-cutout.png" alt="Garret Ritchie, Director of Redstone Technology Solutions in Nassau, The Bahamas" width="1046" height="1155" loading="lazy" decoding="async" /></div><span className="director-marker"><UserFocus size={22} weight="duotone" aria-hidden="true" />A local partner<br />with a long view.</span></div><div className="director-message"><p className="eyebrow">A message from our director</p><h2 id="director-title">“Technology should give business leaders confidence—not another problem to manage.”</h2><p>Redstone’s goal is not simply to support your technology, but to become a trusted adviser that helps your organisation operate more securely, efficiently and confidently.</p><div className="director-signature"><strong>Garret Ritchie</strong><span>Director, Redstone Technology Solutions</span></div><DirectorProfile /></div></div>
      </section>

      <AssessmentBand />
      <SiteFooter />
    </main>
  );
}
