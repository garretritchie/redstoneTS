"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  ArrowUp,
  Buildings,
  EnvelopeSimple,
  House,
  NewspaperClipping,
  ShieldCheck,
  Sparkle,
} from "@phosphor-icons/react";

const sections = [
  { href: "/", path: "/", label: "Home", icon: House },
  { href: "/managed-it", path: "/managed-it", label: "Managed IT", icon: ShieldCheck },
  { href: "/capabilities", path: "/capabilities", label: "Capabilities", icon: Sparkle },
  { href: "/about", path: "/about", label: "About Redstone", icon: Buildings },
  { href: "/insights", path: "/insights", label: "Insights", icon: NewspaperClipping },
  { href: "/contact", path: "/contact", label: "Contact", icon: EnvelopeSimple },
];

export default function SectionNavigator() {
  const activeSection = usePathname();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showNavigator, setShowNavigator] = useState(false);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(".hero, .page-hero");
    let heroBottom = 0;

    const measure = () => {
      heroBottom = hero ? hero.getBoundingClientRect().bottom + window.scrollY : 700;
    };

    const updateScrollState = () => {
      setShowBackToTop(window.scrollY > 700);
      setShowNavigator(window.scrollY >= heroBottom);
    };

    const handleResize = () => {
      measure();
      updateScrollState();
    };

    measure();
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <nav
        className={`section-jumper ${showNavigator ? "is-visible" : ""}`}
        aria-label="Jump to page section"
        aria-hidden={!showNavigator}
      >
        <span className="section-jumper-title" aria-hidden="true">Navigate</span>
        {sections.map(({ href, path, label, icon: Icon }) => (
          <a
            key={path}
            className={activeSection === path ? "is-active" : ""}
            href={href}
            aria-label={`Go to ${label}`}
            aria-current={activeSection === path ? "page" : undefined}
            tabIndex={showNavigator ? undefined : -1}
          >
            <Icon size={17} weight={activeSection === path ? "fill" : "regular"} aria-hidden="true" />
            <span>{label}</span>
          </a>
        ))}
      </nav>

      <a
        className={`back-to-top ${showBackToTop ? "is-visible" : ""}`}
        href="#top"
        aria-label="Back to top"
      >
        <ArrowUp size={19} weight="bold" aria-hidden="true" />
      </a>
    </>
  );
}
