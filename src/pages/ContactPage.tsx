import { Helmet } from "react-helmet-async";
import { MapPin, NavigationArrow } from "@phosphor-icons/react";
import ContactForm from "../components/ContactForm";
import PageHero from "../components/PageHero";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { siteConfig } from "../siteConfig";

export default function ContactPage() {
  return (
    <main id="top">
      <Helmet>
        <title>Contact Redstone | IT Support in Nassau | Redstone Technology Solutions</title>
        <meta name="description" content="Contact Redstone Technology Solutions in Nassau for managed IT, cybersecurity, cloud services, technology projects or a free technology assessment." />
        <link rel="canonical" href="https://www.redstonets.com/contact" />
      </Helmet>
      <SiteHeader />
      <PageHero eyebrow="Start a conversation" title={<>Tell us what matters.<br /><span>We will take it from there.</span></>} description="Whether you need Redstone to manage the complete environment, strengthen an internal IT team or deliver a focused project, you will speak with someone who understands both the business and technical context." primaryLabel="Start your technology review" primaryHref="#location" secondaryLabel={`Call ${siteConfig.phone.localDisplay}`} secondaryHref={siteConfig.phone.href} tone="dark" />

      <section className="contact-section section-pad" id="location" aria-labelledby="contact-title">
        <div className="section-shell"><div className="contact-layout"><div className="contact-location-column"><div className="contact-intro"><p className="eyebrow">Visit or contact Redstone</p><h2 id="contact-title">Local when it matters.<br />Easy to reach.</h2><p>Meet with our team at our Nassau office or send us a note. We will connect you with someone who understands the business and technical context.</p></div><article className="location-card"><div className="location-map"><iframe title="Map showing Redstone Technology Solutions on Shirley Street in Nassau" src="https://www.google.com/maps?q=Church+Street+Plaza,+Shirley+Street,+Nassau,+The+Bahamas&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /></div><div className="location-details"><div className="location-icon"><MapPin size={25} weight="duotone" aria-hidden="true" /></div><div><span>Redstone Technology Solutions</span><h3>1st Floor, Church St. Building</h3><p>Shirley Street<br />New Providence, The Bahamas</p></div><a className="location-directions" href={siteConfig.address.mapHref} target="_blank" rel="noreferrer">Get directions <NavigationArrow size={17} weight="fill" aria-hidden="true" /></a></div><div className="location-hours"><span>Office hours</span><strong>Monday&ndash;Friday &middot; 9:00 AM&ndash;5:00 PM</strong></div></article></div><ContactForm /></div></div>
      </section>
      <SiteFooter />
    </main>
  );
}
