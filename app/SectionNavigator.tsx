"use client";

import { useEffect, useState } from "react";
import {
  ArrowUp,
  FlowArrow,
  House,
  Path,
  ShieldCheck,
  Sparkle,
  UsersThree,
} from "@phosphor-icons/react";

const sections = [
  { id: "top", label: "Home", icon: House },
  { id: "services", label: "Managed IT", icon: ShieldCheck },
  { id: "solutions", label: "Capabilities", icon: Sparkle },
  { id: "process", label: "How we work", icon: FlowArrow },
  { id: "about", label: "Why Redstone", icon: UsersThree },
  { id: "director", label: "Our director", icon: Path },
];

export default function SectionNavigator() {
  const [activeSection, setActiveSection] = useState("top");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showNavigator, setShowNavigator] = useState(false);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(".hero");
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

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-30% 0px -55%", threshold: [0, 0.1, 0.35, 0.6] },
    );

    sections.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => {
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
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
        {sections.map(({ id, label, icon: Icon }) => (
          <a
            key={id}
            className={activeSection === id ? "is-active" : ""}
            href={`#${id}`}
            aria-label={`Jump to ${label}`}
            aria-current={activeSection === id ? "location" : undefined}
            tabIndex={showNavigator ? undefined : -1}
          >
            <Icon size={17} weight={activeSection === id ? "fill" : "regular"} aria-hidden="true" />
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
