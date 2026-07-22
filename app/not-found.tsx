import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

export default function NotFound() {
  return (
    <main id="top">
      <SiteHeader />
      <section className="not-found section-pad" aria-labelledby="not-found-title">
        <div className="section-shell not-found-inner">
          <p className="eyebrow">Page not found</p>
          <h1 id="not-found-title">This page could not be located.</h1>
          <p>The page you are looking for may have been moved, removed, or never existed.</p>
          <div className="not-found-actions">
            <Link className="button" href="/">Return home <ArrowRight size={18} weight="bold" aria-hidden="true" /></Link>
            <Link className="text-link" href="/contact">Contact Redstone <ArrowRight size={17} weight="bold" aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
