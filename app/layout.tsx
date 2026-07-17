import type { Metadata, Viewport } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import SiteBackgroundNetwork from "./SiteBackgroundNetwork";
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
      { url: "/redstone-favicon.ico", sizes: "any" },
      { url: "/redstone-favicon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/redstone-favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
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
        <SiteBackgroundNetwork />
        {children}
      </body>
    </html>
  );
}
