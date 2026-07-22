import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight } from "@phosphor-icons/react";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

export default function NotFoundPage() {
  return (
    <main id="top">
      <Helmet>
        <title>Page Not Found | Redstone Technology Solutions</title>
      </Helmet>
      <SiteHeader />
      <section className="not-found section-pad" aria-labelledby="not-found-title">
        <div className="section-shell not-found-inner">
          <p className="eyebrow">Page not found</p>
          <h1 id="not-found-title">This page could not be located.</h1>
          <p>The page you are looking for may have been moved, removed, or never existed.</p>
          <div className="not-found-actions">
            <Link className="button" to="/">Return home <ArrowRight size={18} weight="bold" aria-hidden="true" /></Link>
            <Link className="text-link" to="/contact">Contact Redstone <ArrowRight size={17} weight="bold" aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
