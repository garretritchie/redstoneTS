"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Pause,
  Play,
  Quotes,
} from "@phosphor-icons/react";

const testimonials = [
  {
    quote:
      "“In radiology today, consistent availability and access to our applications, data and patient images are absolutely crucial. Because of Redstone’s remote monitoring and responsive support, our issues are addressed quickly before they result in unplanned downtime.”",
    name: "Stanley R. Darville",
    role: "President",
    company: "Fourth Terrace Diagnostic Centre",
  },
  {
    quote:
      "“Our scheduled backup and real-time replication solution provided by Redstone, helps us to sleep well at night knowing our important company data and servers are fully protected and recoverable should anything go wrong. We had a disaster and the team at Redstone was able to get us up and running right away!”",
    name: "Mitzi Thompson",
    company: "Executive Printers of The Bahamas",
  },
  {
    quote:
      "“Our company relies on rapid response to any computer problems we encounter. For over the past year we have been relying on Redstone for our computer needs. We have been pleased with the high level of professionalism this company exhibits through their well-trained and pleasant staff.”",
    name: "Lois Major",
    company: "Administrative Assistance & Associates Ltd.",
  },
  {
    quote:
      "“We needed a comprehensive security solution to protect our network resources from future attacks and threats. Redstone locked down our network with NextGen products that help us to stay ahead of security threats.”",
    name: "Christian Dean",
    role: "IT Manager",
    company: "Sun Oil",
  },
  {
    quote:
      "“In the banking industry, data security, availability and integrity are our highest priorities. The team at Redstone took the time to understand our needs, and provided a custom offsite cloud and virtualization solution to keep our financial data and applications accessible, secure and safe.”",
    name: "Òscar Paris Vives",
    role: "IT Manager",
    company: "AndBank",
  },
];

export default function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "previous">("next");
  const [paused, setPaused] = useState(false);
  const [pointerInside, setPointerInside] = useState(false);
  const isRunning = !paused && !pointerInside;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const respectMotionPreference = (event: MediaQueryListEvent | MediaQueryList) => {
      if (event.matches) setPaused(true);
    };

    respectMotionPreference(mediaQuery);
    mediaQuery.addEventListener("change", respectMotionPreference);
    return () => mediaQuery.removeEventListener("change", respectMotionPreference);
  }, []);

  useEffect(() => {
    if (!isRunning) return;

    const timer = window.setInterval(() => {
      setDirection("next");
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 10000);

    return () => window.clearInterval(timer);
  }, [activeIndex, isRunning]);

  const showPrevious = () => {
    setDirection("previous");
    setActiveIndex((current) =>
      current === 0 ? testimonials.length - 1 : current - 1,
    );
  };

  const showNext = () => {
    setDirection("next");
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <div
      className="testimonial-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      onMouseEnter={() => setPointerInside(true)}
      onMouseLeave={() => setPointerInside(false)}
    >
      <Quotes size={48} weight="fill" aria-hidden="true" />
      <div
        className="testimonial-stage"
        aria-live={isRunning ? "off" : "polite"}
        aria-atomic="true"
      >
        <article
          className={`testimonial-slide testimonial-slide--${direction}`}
          key={activeTestimonial.name}
          role="group"
          aria-roledescription="slide"
          aria-label={`${activeIndex + 1} of ${testimonials.length}`}
        >
          <blockquote>{activeTestimonial.quote}</blockquote>
          <p className="testimonial-credit">
            <strong>{activeTestimonial.name}</strong>
            {activeTestimonial.role && <span>{activeTestimonial.role}</span>}
            <span>{activeTestimonial.company}</span>
          </p>
        </article>
      </div>

      <div className="testimonial-controls">
        <div className="testimonial-dots" aria-label="Choose a testimonial">
          {testimonials.map((testimonial, index) => (
            <button
              type="button"
              key={testimonial.name}
              className={index === activeIndex ? "is-active" : ""}
              aria-label={`Show testimonial from ${testimonial.name}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => {
                setDirection(index >= activeIndex ? "next" : "previous");
                setActiveIndex(index);
              }}
            />
          ))}
        </div>

        <div className="testimonial-actions">
          <span aria-hidden="true">
            {String(activeIndex + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
          </span>
          <button type="button" onClick={showPrevious} aria-label="Previous testimonial">
            <ArrowLeft size={18} weight="bold" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setPaused((current) => !current)}
            aria-label={paused ? "Play testimonial rotation" : "Pause testimonial rotation"}
            aria-pressed={paused}
          >
            {paused ? <Play size={16} weight="fill" aria-hidden="true" /> : <Pause size={16} weight="fill" aria-hidden="true" />}
          </button>
          <button type="button" onClick={showNext} aria-label="Next testimonial">
            <ArrowRight size={18} weight="bold" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
