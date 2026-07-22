import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SiteBackgroundNetwork from "./components/SiteBackgroundNetwork";
import { siteConfig } from "./siteConfig";

const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.redstonets.com/#organization",
      name: "Redstone Technology Solutions",
      url: "https://www.redstonets.com/",
      logo: { "@type": "ImageObject", url: "https://www.redstonets.com/redstone-logo.png" },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: siteConfig.phone.schema,
        contactType: "customer support",
        areaServed: siteConfig.address.countryCode,
        availableLanguage: "English",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.address.street,
        addressLocality: siteConfig.address.locality,
        addressRegion: siteConfig.address.region,
        addressCountry: siteConfig.address.countryCode,
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://www.redstonets.com/#website",
      url: "https://www.redstonets.com/",
      name: "Redstone Technology Solutions",
      publisher: { "@id": "https://www.redstonets.com/#organization" },
      inLanguage: "en",
    },
  ],
};

export default function Layout() {
  return (
    <>
      <Helmet>
        <meta name="application-name" content="Redstone Technology Solutions" />
        <meta name="author" content="Redstone Technology Solutions" />
        <meta name="robots" content="index, follow" />
        <meta property="og:site_name" content="Redstone Technology Solutions" />
        <meta property="og:locale" content="en_BS" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.redstonets.com/og.png" />
        <meta property="og:image:width" content="1729" />
        <meta property="og:image:height" content="910" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://www.redstonets.com/og.png" />
        <meta name="geo.region" content="BS-NP" />
        <meta name="geo.placename" content="Nassau, New Providence, The Bahamas" />
        <script type="application/ld+json">{JSON.stringify(siteSchema)}</script>
      </Helmet>
      <SiteBackgroundNetwork />
      <Outlet />
    </>
  );
}
