import { ArrowUpRight, List, LockKey } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import HeaderBehavior from "./HeaderBehavior";
import SectionNavigator from "./SectionNavigator";
import { siteConfig } from "./siteConfig";

const clientPortalHref = "https://msp2.rdstn.com/";

export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link className={`brand ${inverse ? "brand--inverse" : ""}`} href="/" aria-label="Redstone Technology Solutions, home">
      <img src="/redstone-logo.png" alt="Redstone Technology Solutions" width="286" height="50" />
    </Link>
  );
}

const navItems = [
  ["Services", "/managed-it"],
  ["Solutions", "/capabilities"],
  ["About", "/about"],
  ["Insights", "/insights"],
  ["Contact", "/contact"],
];

export default function SiteHeader() {
  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <Logo />
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
          </nav>
          <div className="header-actions">
            <a className="button button--small button--portal" href={clientPortalHref} target="_blank" rel="noopener noreferrer">
              <LockKey size={16} weight="bold" aria-hidden="true" /> Client Portal <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
            </a>
          </div>
          <details className="mobile-nav">
            <summary aria-label="Open navigation"><List size={25} weight="bold" aria-hidden="true" /></summary>
            <nav aria-label="Mobile navigation">
              {navItems.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
              <a href={siteConfig.phone.href}>Client Support</a>
              <a className="button button--portal" href={clientPortalHref} target="_blank" rel="noopener noreferrer"><LockKey size={16} weight="bold" aria-hidden="true" />Client Portal</a>
            </nav>
          </details>
        </div>
      </header>
      <HeaderBehavior />
      <SectionNavigator />
    </>
  );
}
