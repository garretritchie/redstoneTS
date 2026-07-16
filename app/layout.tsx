import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

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

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "redstonets.com";
  const protocol = host.includes("localhost") ? "http" : "https";
  const origin = `${protocol}://${host}`;

  return {
    title: "Redstone Technology Solutions | Managed IT in The Bahamas",
    description:
      "Responsive managed IT, cybersecurity, cloud services and technology strategy for businesses in The Bahamas.",
    icons: {
      icon: "/redstone-logo.png",
      shortcut: "/redstone-logo.png",
    },
    openGraph: {
      title: "Mind-blowing service. Effortless IT.",
      description:
        "One responsive, accountable team for your support, infrastructure, cybersecurity, cloud and technology planning.",
      type: "website",
      images: [{ url: `${origin}/og.png`, width: 1728, height: 914, alt: "Mind-blowing service. Effortless IT." }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Mind-blowing service. Effortless IT.",
      description: "One accountable team for the technology your business depends on.",
      images: [`${origin}/og.png`],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${spaceGrotesk.variable}`}>{children}</body>
    </html>
  );
}
