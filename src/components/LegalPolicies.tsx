import { useEffect, useRef, useState } from "react";
import { Cookie, FileText, LockKey, ShieldCheck, X } from "@phosphor-icons/react";
import { siteConfig } from "../siteConfig";

type PolicyId = "privacy" | "terms" | "cookies";

const policies = [
  { id: "privacy" as const, label: "Privacy Policy", shortLabel: "Privacy", number: "01", icon: ShieldCheck },
  { id: "terms" as const, label: "Terms of Use", shortLabel: "Terms", number: "02", icon: FileText },
  { id: "cookies" as const, label: "Cookie Policy", shortLabel: "Cookies", number: "03", icon: Cookie },
];

const effectiveDate = "17 July 2026";

function PrivacyPolicy() {
  return (
    <>
      <section><h3>1. Who we are</h3><p>Redstone Technology Solutions Ltd. (“Redstone”, “we”, “our” or “us”) is a Bahamian technology services company. This Privacy Policy explains how we handle personal information collected through redstonets.com, our website contact form and related website communications.</p><p>This policy does not replace a client agreement, managed-services agreement, employment notice or other privacy terms that may apply to a separate relationship with Redstone.</p></section>
      <section><h3>2. Information we collect</h3><p>We may collect information that you provide directly, including your name, work email address, company, telephone number, enquiry details and any other information you choose to include in a message.</p><p>Our website and hosting providers may also process limited technical information such as your IP address, browser type, device information, referring page, requested pages, timestamps and security or diagnostic logs.</p></section>
      <section><h3>3. How we use information</h3><ul><li>To respond to enquiries, schedule conversations and provide requested information.</li><li>To evaluate whether Redstone services may be suitable for your organisation.</li><li>To operate, secure, troubleshoot and improve the website.</li><li>To maintain business records and protect our legal rights.</li><li>To comply with applicable laws, lawful requests and regulatory obligations.</li></ul><p>We do not sell personal information. We do not use contact-form details for unrelated mass marketing without an appropriate basis or permission.</p></section>
      <section><h3>4. Fair processing</h3><p>We process personal information for stated and legitimate purposes, including responding to your request, taking steps toward a business relationship, operating and securing our website, meeting legal obligations and pursuing reasonable business interests that do not override your rights.</p><p>Redstone intends to handle personal information consistently with The Bahamas’ <a href="https://laws.bahamas.gov.bs/cms/images/LEGISLATION/PRINCIPAL/2003/2003-0003/2003-0003_1.pdf" target="_blank" rel="noreferrer">Data Protection (Privacy of Personal Information) Act</a>, as applicable.</p></section>
      <section><h3>5. When information may be shared</h3><p>We may share information with personnel and trusted providers who help us host the website, deliver form messages, maintain security or support business operations. They receive only the information reasonably needed for their role and are expected to handle it appropriately.</p><p>We may also disclose information when required by law, to respond to a lawful request, to protect people or systems, to establish or defend legal rights, or in connection with a business reorganisation or transfer.</p></section>
      <section><h3>6. International services</h3><p>Some technology providers may process or store information outside The Bahamas. Where this occurs, we take reasonable steps to select reputable providers and use appropriate contractual, organisational or technical safeguards for the circumstances.</p></section>
      <section><h3>7. Retention and security</h3><p>We retain personal information only for as long as reasonably needed for the purpose collected, our business records, dispute resolution, security and applicable legal obligations. Retention periods vary according to the information and context.</p><p>We use reasonable administrative, technical and physical safeguards. No internet transmission or storage method can be guaranteed completely secure, so please do not submit passwords, confidential system credentials or highly sensitive information through the general contact form.</p></section>
      <section><h3>8. Your choices and rights</h3><p>Subject to applicable law and relevant exceptions, you may ask whether we hold personal information about you, request access or correction, object to direct marketing, or ask us to review deletion or other concerns. We may need to verify your identity before acting on a request.</p><p>You may also raise a concern with the Office of the Data Protection Commissioner of The Bahamas.</p></section>
      <section><h3>9. Children, links and updates</h3><p>This business website is not directed to children, and we do not knowingly seek personal information from children through it. Links and embedded services operated by third parties are governed by their own notices.</p><p>We may update this policy when our website, practices or legal obligations change. The effective date shown above identifies the current version.</p></section>
      <section><h3>10. Contact us</h3><p>For privacy questions or requests, use our <a href="/contact">website contact form</a>, email <a href={siteConfig.email.href}>{siteConfig.email.display}</a>, call <a href={siteConfig.phone.href}>{siteConfig.phone.display}</a>, or write to {siteConfig.address.short}, {siteConfig.address.region}, {siteConfig.address.country}.</p></section>
    </>
  );
}

function TermsOfUse() {
  return (
    <>
      <section><h3>1. Acceptance of these terms</h3><p>These Terms of Use govern access to redstonets.com. By using the website, you agree to these terms. If you do not agree, please do not use the website.</p></section>
      <section><h3>2. Website information</h3><p>The website provides general information about Redstone, our capabilities and ways to contact us. We aim to keep it useful and accurate, but content may be incomplete, become outdated or contain errors. Nothing on the website is professional, legal, compliance, cybersecurity or technical advice for a specific environment.</p></section>
      <section><h3>3. Enquiries are not service agreements</h3><p>Submitting a form, requesting an assessment, receiving a reply or discussing a possible project does not create a client relationship, duty of care, service commitment or guarantee of availability. Services begin only under an agreement accepted by Redstone and the client.</p><p>Managed services, projects, assessments, Client Portal access and other deliverables may be governed by separate proposals, statements of work, service terms, acceptable-use rules or confidentiality obligations. Those documents control if they conflict with these website terms.</p></section>
      <section><h3>4. Permitted use</h3><p>You may use the website for lawful business and informational purposes. You must not attempt to disrupt the website, bypass security, introduce malicious code, scrape it excessively, impersonate another person, misuse forms, probe systems without written permission, or use the website in a way that violates law or another person’s rights.</p></section>
      <section><h3>5. Intellectual property</h3><p>The website’s original text, presentation, design, graphics, Redstone branding and other Redstone-created materials are owned by or licensed to Redstone and are protected by applicable intellectual-property laws. Technology names and third-party marks belong to their respective owners.</p><p>You may view and print reasonable extracts for internal, non-commercial evaluation of Redstone. You may not republish, sell, modify, remove notices from or commercially exploit website content without prior written permission.</p></section>
      <section><h3>6. Third-party services and links</h3><p>The website may link to or embed services operated by others, including maps, portals and external resources. Redstone does not control their availability, security, content or privacy practices, and a link does not necessarily mean endorsement.</p></section>
      <section><h3>7. Availability and security</h3><p>We may change, suspend or withdraw any part of the website without notice. We do not promise uninterrupted access or that the website will always be free from defects or harmful components. You are responsible for protecting your own devices, accounts and data.</p></section>
      <section><h3>8. Disclaimers and liability</h3><p>To the fullest extent permitted by law, the website and its content are provided “as is” and “as available”, without warranties of accuracy, fitness for a particular purpose, non-infringement or uninterrupted operation.</p><p>To the fullest extent permitted by law, Redstone will not be liable for indirect, incidental, special or consequential loss arising from website use, inability to use the website, reliance on general website content, or third-party services. Nothing in these terms excludes liability that cannot legally be excluded.</p></section>
      <section><h3>9. Governing law</h3><p>These terms are governed by the laws of the Commonwealth of The Bahamas. Subject to any mandatory rights or agreed dispute process, the courts of The Bahamas will have jurisdiction over disputes concerning these website terms.</p></section>
      <section><h3>10. Changes and contact</h3><p>We may update these terms from time to time. Continued website use after an updated version is posted means the revised terms apply from their stated effective date.</p><p>Questions may be sent through our <a href="/contact">website contact form</a>, by email to <a href={siteConfig.email.href}>{siteConfig.email.display}</a>, or to Redstone Technology Solutions Ltd., {siteConfig.address.short}, {siteConfig.address.region}, {siteConfig.address.country}.</p></section>
    </>
  );
}

function CookiePolicy() {
  return (
    <>
      <section><h3>1. What cookies are</h3><p>Cookies are small files or similar browser storage technologies used to remember information, support website functions, measure activity or help protect online services. Some are placed by the website being visited and others may be placed by an embedded third-party service.</p></section>
      <section><h3>2. Redstone’s current website use</h3><p>Redstone does not currently use advertising cookies or a Redstone-controlled analytics cookie on this website. The site may use strictly necessary browser or hosting technologies for delivery, reliability, security and form operation.</p><p>The contact page includes an embedded Google Maps frame. Google may receive technical information and may use cookies or similar technology under its own settings and <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">privacy policy</a> when that map loads.</p></section>
      <section><h3>3. Cookie categories</h3><div className="legal-cookie-categories"><div><strong>Strictly necessary</strong><span>Support core delivery, security, network management and requested website functions. These cannot always be disabled through the website.</span></div><div><strong>Preferences</strong><span>Remember optional choices if preference features are introduced. Redstone does not currently rely on a preference-cookie programme.</span></div><div><strong>Analytics</strong><span>Help understand website use. Redstone does not currently set a Redstone-controlled analytics cookie.</span></div><div><strong>Advertising</strong><span>Track activity for targeted promotion. Redstone does not currently use advertising cookies on this website.</span></div></div></section>
      <section><h3>4. Your controls</h3><p>You can use your browser settings to view, block or delete cookies. Blocking all storage may affect embedded maps, form protection or other website features. Controls for third-party services may also be available through those providers.</p></section>
      <section><h3>5. Future changes</h3><p>If Redstone introduces non-essential analytics, preference or advertising technologies, we will update this policy and, where appropriate, provide a consent or preference control before those technologies are used.</p></section>
      <section><h3>6. Contact</h3><p>Questions about website cookies may be sent through our <a href="/contact">website contact form</a>, by email to <a href={siteConfig.email.href}>{siteConfig.email.display}</a>, or raised by calling <a href={siteConfig.phone.href}>{siteConfig.phone.display}</a>.</p></section>
    </>
  );
}

export default function LegalPolicies() {
  const [activePolicy, setActivePolicy] = useState<PolicyId>("privacy");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const active = policies.find((policy) => policy.id === activePolicy) ?? policies[0];

  const openPolicy = (policy: PolicyId) => {
    setActivePolicy(policy);
    if (!dialogRef.current?.open) dialogRef.current?.showModal();
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#${policy}-policy`);
    requestAnimationFrame(() => contentRef.current?.scrollTo({ top: 0, behavior: "smooth" }));
  };
  const selectPolicy = (policy: PolicyId) => {
    setActivePolicy(policy);
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#${policy}-policy`);
    contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };
  const closePolicies = () => dialogRef.current?.close();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClick = (event: MouseEvent) => { if (event.target === dialog) closePolicies(); };
    const handleClose = () => {
      if (policies.some((policy) => window.location.hash === `#${policy.id}-policy`)) {
        window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
      }
    };
    const openFromHash = () => {
      const policy = policies.find((item) => window.location.hash === `#${item.id}-policy`);
      if (!policy) return;
      setActivePolicy(policy.id);
      if (!dialog.open) dialog.showModal();
    };
    dialog.addEventListener("click", handleClick);
    dialog.addEventListener("close", handleClose);
    window.addEventListener("hashchange", openFromHash);
    openFromHash();
    return () => {
      dialog.removeEventListener("click", handleClick);
      dialog.removeEventListener("close", handleClose);
      window.removeEventListener("hashchange", openFromHash);
    };
  }, []);

  return (
    <>
      <nav className="footer-legal-links" aria-label="Legal information">
        {policies.map((policy) => <a href={`#${policy.id}-policy`} onClick={(event) => { event.preventDefault(); openPolicy(policy.id); }} key={policy.id}>{policy.label}</a>)}
      </nav>
      <dialog className="legal-dialog" ref={dialogRef} aria-labelledby="legal-policy-title">
        <div className="legal-dialog-shell">
          <aside className="legal-dialog-rail">
            <div className="legal-dialog-brand"><LockKey size={23} weight="duotone" aria-hidden="true" /><span>Redstone legal centre</span></div>
            <div><p className="legal-dialog-kicker">Clear terms / Plain language</p><h2>Website policies built around trust.</h2><p>These documents govern use of the public Redstone website. Client services and portal access may have separate agreements.</p></div>
            <nav aria-label="Choose a legal policy">
              {policies.map((policy) => { const Icon = policy.icon; return <button className={policy.id === activePolicy ? "is-active" : ""} type="button" onClick={() => selectPolicy(policy.id)} aria-label={policy.label} aria-current={policy.id === activePolicy ? "page" : undefined} key={policy.id}><span className="legal-policy-number">{policy.number}</span><Icon size={19} weight="light" aria-hidden="true" /><span className="legal-policy-label"><span className="legal-policy-label-full">{policy.label}</span><span className="legal-policy-label-short" aria-hidden="true">{policy.shortLabel}</span></span></button>; })}
            </nav>
          </aside>
          <div className="legal-dialog-content" ref={contentRef}>
            <button className="legal-dialog-close" type="button" onClick={closePolicies} aria-label="Close legal policies"><X size={20} weight="bold" aria-hidden="true" /></button>
            <header className="legal-document-header"><p>Policy {active.number} / 03</p><h2 id="legal-policy-title">{active.label}</h2><div><span>Effective {effectiveDate}</span><span>Redstone Technology Solutions Ltd.</span></div></header>
            <article className="legal-document-copy">{activePolicy === "privacy" && <PrivacyPolicy />}{activePolicy === "terms" && <TermsOfUse />}{activePolicy === "cookies" && <CookiePolicy />}</article>
            <footer className="legal-document-footer"><strong>Questions about these policies?</strong><p>Use our <a href="/contact">contact form</a>, email <a href={siteConfig.email.href}>{siteConfig.email.display}</a> or call <a href={siteConfig.phone.href}>{siteConfig.phone.display}</a>.</p></footer>
          </div>
        </div>
      </dialog>
    </>
  );
}
