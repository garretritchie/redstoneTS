import { EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";
import LegalPolicies from "./LegalPolicies";
import { Logo } from "./SiteHeader";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main section-shell">
        <div className="footer-brand">
          <Logo inverse />
          <p>Managed technology. Exceptional service. Lasting partnerships.</p>
          <div className="footer-contact">
            <a href="tel:+12426016014"><Phone size={18} weight="light" aria-hidden="true" />(242) 601-6014</a>
            <span><EnvelopeSimple size={18} weight="light" aria-hidden="true" />msp@redstoneTS.com</span>
            <a href="https://maps.app.goo.gl/Y4spaFH54bomZCFZ6" target="_blank" rel="noreferrer"><MapPin size={18} weight="light" aria-hidden="true" />1st Floor Church St. Bldg, Shirley Street</a>
          </div>
        </div>
        <div className="footer-links">
          <div><h3>Managed Services</h3><a href="/managed-it#overwatch">Overwatch</a><a href="/managed-it#checkmark">Checkmark</a><a href="/managed-it#helpdesk">Helpdesk</a><a href="/managed-it#shield">Shield</a><a href="/managed-it#cirrus">Cirrus</a></div>
          <div><h3>Capabilities</h3><a href="/capabilities">Ad Hoc Projects</a><a href="/capabilities">Security & Compliance</a><a href="/capabilities">AI Web & Applications</a><a href="/capabilities">Workflow Automation</a><a href="/contact">Free Assessment</a></div>
          <div><h3>Redstone</h3><a href="/about">Why Redstone</a><a href="/about#team">Our Team</a><a href="/about#partnerships">Partnerships</a><a href="/capabilities#process">Our Approach</a><a href="/about#director">Leadership</a><a href="tel:+12426018324">Client Support</a><a href="/contact">Contact</a></div>
        </div>
      </div>
      <div className="footer-bottom section-shell">
        <p>© 2026 Redstone Technology Solutions Ltd. All rights reserved.</p>
        <LegalPolicies />
      </div>
    </footer>
  );
}
