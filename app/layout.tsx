import type { Metadata, Viewport } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import SiteBackgroundNetwork from "./SiteBackgroundNetwork";
import { siteConfig, siteContent } from "./siteConfig";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#101820",
};

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.redstonets.com/#organization",
      name: "Redstone Technology Solutions",
      url: "https://www.redstonets.com/",
      logo: {
        "@type": "ImageObject",
        url: "https://www.redstonets.com/redstone-logo.png",
      },
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

function AnalyticsScripts() {
  const { analytics } = siteContent;

  if (!analytics.enabled) return null;

  if (analytics.provider === "plausible" && analytics.plausibleDomain) {
    return <script defer data-domain={analytics.plausibleDomain} src="https://plausible.io/js/script.js" />;
  }

  if (analytics.provider === "google-analytics" && analytics.gaMeasurementId) {
    return (
      <>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${analytics.gaMeasurementId}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${analytics.gaMeasurementId}');`,
          }}
        />
      </>
    );
  }

  return null;
}

export const metadata: Metadata = {
  metadataBase: new URL("https://www.redstonets.com"),
  title: {
    default: "Managed IT Services Bahamas | Redstone Technology Solutions",
    template: "%s | Redstone Technology Solutions",
  },
  description:
    "Managed IT services in The Bahamas, including cybersecurity, cloud, helpdesk, infrastructure support, monitoring and technology strategy for businesses.",
  applicationName: "Redstone Technology Solutions",
  authors: [{ name: "Redstone Technology Solutions", url: "https://www.redstonets.com" }],
  creator: "Redstone Technology Solutions",
  publisher: "Redstone Technology Solutions",
  category: "Managed Information Technology Services",
  classification: "Managed IT Services, Cybersecurity, Cloud Services, IT Support",
  manifest: "/site.webmanifest",
  keywords: [
    "managed IT services Bahamas",
    "IT support Nassau",
    "cybersecurity Bahamas",
    "business IT support",
    "remote monitoring and management",
    "Microsoft 365 Bahamas",
    "cloud services Bahamas",
    "IT helpdesk services",
    "technology consulting Bahamas",
    "security compliance services",
    "workflow automation",
    "AI application development",
    "local IT support Bahamas",
    "co-managed IT services",
    "IT project support Bahamas",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/redstone-favicon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
  },
  other: {
    "geo.region": "BS-NP",
    "geo.placename": "Nassau, New Providence, The Bahamas",
    "ICBM": "25.0600, -77.3450",
    "business:contact_data:country_name": "The Bahamas",
    "business:contact_data:locality": "Nassau",
    "business:contact_data:region": "New Providence",
  },
  openGraph: {
    title: "Managed IT Services in The Bahamas | Redstone",
    description:
      "One responsive, accountable team for IT support, infrastructure, cybersecurity, cloud services and technology planning.",
    url: "/",
    siteName: "Redstone Technology Solutions",
    locale: "en_BS",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1729,
        height: 910,
        alt: "Redstone Technology Solutions — mind-blowing service and effortless IT for businesses in The Bahamas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Managed IT Services in The Bahamas | Redstone",
    description: "Managed IT, cybersecurity, cloud and human support from one accountable Bahamian technology partner.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${spaceGrotesk.variable}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }} />
        <AnalyticsScripts />
        <script defer src="/analytics.js" />
        <SiteBackgroundNetwork />
        {children}
      </body>
    </html>
  );
}
