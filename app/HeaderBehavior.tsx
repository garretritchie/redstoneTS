"use client";

import { useEffect } from "react";

export default function HeaderBehavior() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>(".site-header");
    const hero = document.querySelector<HTMLElement>(".hero, .page-hero");
    const mobileNav = document.querySelector<HTMLDetailsElement>(".mobile-nav");
    const mobileNavSummary = mobileNav?.querySelector<HTMLElement>("summary");

    if (!header || !hero) return;

    let heroBottom = 0;
    let frame = 0;

    const measure = () => {
      heroBottom = hero.getBoundingClientRect().bottom + window.scrollY;
    };

    const update = () => {
      frame = 0;
      header.classList.toggle("is-fixed", window.scrollY >= heroBottom);
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const handleResize = () => {
      measure();
      requestUpdate();
    };

    const closeMobileNav = () => {
      if (!mobileNav?.open) return;
      mobileNav.open = false;
      mobileNavSummary?.setAttribute("aria-label", "Open navigation");
    };

    const handleMobileNavToggle = () => {
      mobileNavSummary?.setAttribute(
        "aria-label",
        mobileNav?.open ? "Close navigation" : "Open navigation",
      );
    };

    const handleMobileNavClick = (event: Event) => {
      if ((event.target as HTMLElement).closest("a")) closeMobileNav();
    };

    const handleDocumentPointerDown = (event: PointerEvent) => {
      if (mobileNav?.open && !mobileNav.contains(event.target as Node)) closeMobileNav();
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && mobileNav?.open) {
        closeMobileNav();
        mobileNavSummary?.focus();
      }
    };

    measure();
    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", handleResize);
    mobileNav?.addEventListener("toggle", handleMobileNavToggle);
    mobileNav?.addEventListener("click", handleMobileNavClick);
    document.addEventListener("pointerdown", handleDocumentPointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", handleResize);
      mobileNav?.removeEventListener("toggle", handleMobileNavToggle);
      mobileNav?.removeEventListener("click", handleMobileNavClick);
      document.removeEventListener("pointerdown", handleDocumentPointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return null;
}
