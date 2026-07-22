import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play, Quotes } from "@phosphor-icons/react";

const testimonials = [
  { quote: "\u201CIn radiology today, consistent availability and access to our applications, data and patient images are absolutely crucial. Because of Redstone\u2019s remote monitoring and responsive support, our issues are addressed quickly before they result in unplanned downtime.\u201D", name: "Stanley R. Darville", role: "President", company: "Fourth Terrace Diagnostic Centre" },
  { quote: "\u201COur scheduled backup and real-time replication solution provided by Redstone, helps us to sleep well at night knowing our important company data and servers are fully protected and recoverable should anything go wrong. We had a disaster and the team at Redstone was able to get us up and running right away!\u201D", name: "Mitzi Thompson", company: "Executive Printers of The Bahamas" },
  { quote: "\u201COur company relies on rapid response to any computer problems we encounter. For over the past year we have been relying on Redstone for our computer needs. We have been pleased with the high level of professionalism this company exhibits through their well-trained and pleasant staff.\u201D", name: "Lois Major", company: "Administrative Assistance & Associates Ltd." },
  { quote: "\u201CWe needed a comprehensive security solution to protect our network resources from future attacks and threats. Redstone locked down our network with NextGen products that help us to stay ahead of security threats.\u201D", name: "Christian Dean", role: "IT Manager", company: "Sun Oil" },
  { quote: "\u201CIn the banking industry, data security, availability and integrity are our highest priorities. The team at Redstone took the time to understand our needs, and provided a custom offsite cloud and virtualization solution to keep our financial data and applications accessible, secure and safe.\u201D", name: "\u00D2scar Paris Vives", role: "IT Manager", company: "AndBank" },
];

export default function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "previous">("next");
  const [paused, setPaused] = useState(false);
  const [pointerInside, setPointerInside] = useState(false);
  const isRunning = !paused && !pointerInside;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const respectMotionPreference = (event: MediaQueryListEvent | MediaQueryList) => { if (event.matches) setPaused(true); };
    respectMotionPreference(mediaQuery);
    mediaQuery.addEventListener("change", respectMotionPreference);
    return () => mediaQuery.removeEventListener("change", respectMotionPreference);
  }, []);

  useEffect(() => {
    if (!isRunning) return;
    const timer = window.setInterval(() => { setDirection("next"); setActiveIndex((c) => (c + 1) % testimonials.length); }, 10000);
    return () => window.clearInterval(timer);
  }, [activeIndex, isRunning]);

  const showPrevious = () => { setDirection("previous"); setActiveIndex((c) => c === 0 ? testimonials.length - 1 : c - 1); };
  const showNext = () => { setDirection("next"); setActiveIndex((c) => (c + 1) % testimonials.length); };
  const activeTestimonial = testimonials[activeIndex];

  return (
    <div className="testimonial-carousel" role="region" aria-roledescription="carousel" aria-label="Client testimonials" onMouseEnter={() => setPointerInside(true)} onMouseLeave={() => setPointerInside(false)}>
      <Quotes size={48} weight="fill" aria-hidden="true" />
      <div className="testimonial-stage" aria-live={isRunning ? "off" : "polite"} aria-atomic="true">
        <article className={`testimonial-slide testimonial-slide--${direction}`} key={activeTestimonial.name} role="group" aria-roledescription="slide" aria-label={`${activeIndex + 1} of ${testimonials.length}`}>
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
          {testimonials.map((t, i) => <button type="button" key={t.name} className={i === activeIndex ? "is-active" : ""} aria-label={`Show testimonial from ${t.name}`} aria-current={i === activeIndex ? "true" : undefined} onClick={() => { setDirection(i >= activeIndex ? "next" : "previous"); setActiveIndex(i); }} />)}
        </div>
        <div className="testimonial-actions">
          <span aria-hidden="true">{String(activeIndex + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}</span>
          <button type="button" onClick={showPrevious} aria-label="Previous testimonial"><ArrowLeft size={18} weight="bold" aria-hidden="true" /></button>
          <button type="button" onClick={() => setPaused((c) => !c)} aria-label={paused ? "Play testimonial rotation" : "Pause testimonial rotation"} aria-pressed={paused}>{paused ? <Play size={16} weight="fill" aria-hidden="true" /> : <Pause size={16} weight="fill" aria-hidden="true" />}</button>
          <button type="button" onClick={showNext} aria-label="Next testimonial"><ArrowRight size={18} weight="bold" aria-hidden="true" /></button>
        </div>
      </div>
    </div>
  );
}
