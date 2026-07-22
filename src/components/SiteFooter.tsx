import { Link } from "react-router-dom";
import { EnvelopeSimple, LinkedinLogo, LockKey, MapPin, Phone } from "@phosphor-icons/react";
import LegalPolicies from "./LegalPolicies";
import { Logo } from "./SiteHeader";
import { siteConfig } from "../siteConfig";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main section-shell">
        <div className="footer-brand">
          <Logo inverse />
          <p>Professional technology management for businesses that take success seriously.</p>
          <div className="footer-contact">
            <a href={siteConfig.phone.href}><Phone size={18} weight="light" aria-hidden="true" />{siteConfig.phone.display}</a>
            <a href={siteConfig.email.href}><EnvelopeSimple size={18} weight="light" aria-hidden="true" />{siteConfig.email.display}</a>
            <a href={siteConfig.address.mapHref} target="_blank" rel="noreferrer"><MapPin size={18} weight="light" aria-hidden="true" />{siteConfig.address.short}</a>
            <a className="footer-social-link" href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Follow Redstone on LinkedIn"><LinkedinLogo size={18} weight="fill" aria-hidden="true" />Redstone on LinkedIn</a>
            <a className="footer-social-link" href="/admin/" rel="nofollow"><LockKey size={18} weight="fill" aria-hidden="true" />Site Admin</a>
          </div>
        </div>
        <div className="footer-links">
          <div><h3>Managed Services</h3><a href="/managed-it#overwatch">Overwatch</a><a href="/managed-it#checkmark">Checkmark</a><a href="/managed-it#helpdesk">Helpdesk</a><a href="/managed-it#shield">Shield</a><a href="/managed-it#cirrus">Cirrus</a></div>
          <div><h3>Capabilities</h3><a href="/capabilities">Ad Hoc Projects</a><a href="/capabilities">Security & Compliance</a><a href="/capabilities">AI Web & Applications</a><a href="/capabilities">Workflow Automation</a><Link to="/insights">Insights</Link></div>
          <div><h3>Redstone</h3><a href="/about">Why Redstone</a><a href="/about#team">Our Team</a><a href="/about#partnerships">Partnerships</a><a href="/capabilities#process">Our Approach</a><a href="/about#director">Leadership</a><a href={siteConfig.phone.href}>Client Support</a><a href="/contact">Contact</a></div>
        </div>
      </div>
      <div className="footer-bottom section-shell">
        <p>&copy; 2026 Redstone Technology Solutions Ltd. All rights reserved.</p>
        <LegalPolicies />
      </div>
    </footer>
  );
}
