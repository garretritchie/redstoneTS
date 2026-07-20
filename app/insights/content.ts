export type InsightArticle = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: string;
  author: string;
  featured?: boolean;
  seoTitle?: string;
  seoDescription: string;
  keywords?: string[];
  relatedServiceLinks?: {
    label: string;
    href: string;
  }[];
  cta: {
    label: string;
    href: string;
    text: string;
  };
  body: {
    heading: string;
    paragraphs: string[];
  }[];
};

// Local content provider for the public site. Replace these accessors with the
// future client-portal CMS/API provider without changing the article components.
const articles: InsightArticle[] = [
  {
    slug: "bahamian-businesses-cybersecurity",
    title: "How Bahamian Businesses Should Think About Cybersecurity",
    summary: "Cybersecurity is not a one-time product decision. It is an operating discipline that protects availability, trust and continuity.",
    category: "Cybersecurity",
    publishedAt: "2026-07-09",
    readingTime: "7 min read",
    author: "Redstone Technology Solutions",
    featured: true,
    seoDescription: "A practical cybersecurity guide for Bahamian business leaders covering phishing, MFA, patching, backups, recoverability, vendor risk and managed oversight.",
    keywords: ["cybersecurity Bahamas", "business cybersecurity", "managed security", "phishing", "MFA"],
    relatedServiceLinks: [
      { label: "Shield Security Services", href: "/managed-it#services" },
      { label: "Security & Compliance", href: "/capabilities" },
    ],
    cta: {
      label: "Review your security posture",
      href: "/contact",
      text: "If you are unsure where your organisation is most exposed, Redstone can help you review practical risks and prioritise the controls that matter.",
    },
    body: [
      {
        heading: "Security is a business issue before it is a technical issue",
        paragraphs: [
          "For many Bahamian organisations, technology now sits at the centre of daily operations. Email, cloud applications, online banking, point-of-sale systems, patient information, customer records, file sharing and remote access are no longer back-office conveniences. They are how the business runs.",
          "That means cybersecurity should be treated as an ongoing management responsibility, not as a one-time software purchase. Antivirus, firewalls and password policies are useful, but they only work when they are part of a broader operating standard: monitored, maintained, documented and adjusted as the business changes.",
        ],
      },
      {
        heading: "Smaller markets are not protected by obscurity",
        paragraphs: [
          "A common assumption is that attackers are focused only on large international companies. In practice, many incidents are opportunistic. Automated phishing, credential stuffing, malicious attachments and exposed remote-access systems do not care whether a business is in Nassau, Miami, Toronto or London.",
          "Local companies also work with banks, insurers, suppliers, government agencies and international partners. A single compromised mailbox or unavailable system can affect reputation, cash flow, customer service and confidence far beyond the IT department.",
        ],
      },
      {
        heading: "The fundamentals still matter",
        paragraphs: [
          "Most practical security programmes begin with disciplined basics: multifactor authentication, strong password practices, patch management, endpoint protection, email filtering, secure remote access, backup testing and user awareness. These controls are not glamorous, but they reduce the most common paths into a business environment.",
          "The challenge is consistency. A control that is deployed once and never reviewed becomes less reliable over time. New employees join, devices change, cloud applications are added, vendors request access and old systems remain in place longer than expected. Security needs ownership so these changes do not quietly create gaps.",
        ],
      },
      {
        heading: "Recoverability is part of security",
        paragraphs: [
          "Business leaders should ask not only whether systems are protected, but whether the organisation can recover. Backups should be monitored, protected from tampering and tested. Critical applications should have clear recovery expectations. Staff should know who makes decisions during an incident.",
          "A good security posture balances prevention with resilience. Even well-managed environments can experience user mistakes, vendor issues or service disruption. The question is whether the business can respond calmly, preserve evidence, restore access and continue serving customers.",
        ],
      },
      {
        heading: "Security should fit operational reality",
        paragraphs: [
          "Security that makes work impossible will be bypassed. Security that is too loose will fail. The right approach considers the organisation’s actual workflow: who needs access, from where, on which devices, to which systems and under what level of risk.",
          "Redstone’s view is practical: protect the business without losing sight of how people work. That usually means layered controls, clear communication, user education and ongoing oversight rather than a single product or policy expected to solve everything.",
        ],
      },
    ],
  },
  {
    slug: "what-co-managed-it-looks-like",
    title: "What Co-Managed IT Actually Looks Like",
    summary: "Co-managed IT gives internal teams extra capacity, tools and specialist support without replacing their knowledge or role.",
    category: "Managed IT",
    publishedAt: "2026-05-22",
    readingTime: "6 min read",
    author: "Redstone Technology Solutions",
    seoDescription: "Learn how co-managed IT works for organisations with internal IT teams, including escalation, monitoring, after-hours support, projects and strategic planning.",
    keywords: ["co-managed IT", "internal IT support", "IT escalation", "managed IT Bahamas"],
    relatedServiceLinks: [
      { label: "Managed IT Services", href: "/managed-it" },
      { label: "vCIO & Technology Strategy", href: "/capabilities" },
    ],
    cta: {
      label: "Explore co-managed IT support",
      href: "/managed-it#partnership-models",
      text: "If your internal team needs more coverage, specialist support or project capacity, co-managed IT can strengthen the function without disrupting what already works.",
    },
    body: [
      {
        heading: "Co-managed IT is not outsourcing by another name",
        paragraphs: [
          "Some organisations already have capable internal IT people. They know the business, understand the users and carry valuable institutional knowledge. Co-managed IT is designed to strengthen that team, not erase it.",
          "In a co-managed model, responsibilities are defined clearly. The internal team may continue leading daily relationships, application ownership and business-specific priorities, while Redstone adds monitoring, documentation, escalation support, security oversight, after-hours coverage or project engineering where extra capacity is needed.",
        ],
      },
      {
        heading: "The value is clarity of responsibility",
        paragraphs: [
          "Co-managed IT works best when everyone knows who owns what. For example, Redstone might monitor servers and network devices, handle endpoint maintenance, support cybersecurity tools and assist with complex issues. The internal team might retain approval authority, vendor relationships, line-of-business applications and executive communication.",
          "The exact division depends on the organisation. The important point is that the arrangement should reduce confusion, not add another layer of handoffs.",
        ],
      },
      {
        heading: "Coverage gaps are often the real problem",
        paragraphs: [
          "Internal teams are frequently stretched by competing demands: user support, leadership requests, projects, compliance, hardware refreshes, documentation, licensing, cybersecurity and vendor coordination. Even strong teams can struggle when urgent issues interrupt planned work every day.",
          "Redstone can absorb defined responsibilities so internal staff can focus on higher-value work. That may include routine maintenance, backup monitoring, helpdesk overflow, security reviews, project delivery or advisory support for budgeting and lifecycle planning.",
        ],
      },
      {
        heading: "The relationship should be collaborative",
        paragraphs: [
          "A productive co-managed arrangement depends on respect. Redstone should not treat internal IT as a barrier, and internal IT should not have to defend its role. The shared objective is a healthier technology environment and better outcomes for the organisation.",
          "Good documentation, escalation paths, recurring reviews and transparent communication make the model work. Over time, the business gains more resilience because knowledge, tools and responsibility are no longer concentrated in one person or one provider.",
        ],
      },
    ],
  },
  {
    slug: "hidden-cost-below-modern-technology-standard",
    title: "The Hidden Cost of Operating Below a Modern Technology Standard",
    summary: "Technology gaps rarely show up as one clean line item. They appear as downtime, frustration, risk, rework and missed opportunity.",
    category: "Technology Standard",
    publishedAt: "2026-03-18",
    readingTime: "7 min read",
    author: "Redstone Technology Solutions",
    seoDescription: "Understand the business cost of operating below a modern technology standard, from downtime and security risk to technical debt and missed automation opportunities.",
    keywords: ["technology standard", "IT modernisation", "technical debt", "business continuity", "workflow automation"],
    relatedServiceLinks: [
      { label: "Our Process", href: "/capabilities#process" },
      { label: "Workflow Automation", href: "/capabilities" },
    ],
    cta: {
      label: "See where your environment stands",
      href: "/contact",
      text: "A practical technology review can identify the gaps that are creating friction, risk or unnecessary cost in your environment.",
    },
    body: [
      {
        heading: "The cost is not always obvious",
        paragraphs: [
          "When technology is treated as an afterthought, the cost rarely appears as a single invoice. It appears in smaller, repeated ways: slow systems, recurring support calls, delayed work, frustrated employees, avoidable downtime and decisions made without reliable information.",
          "These issues are easy to normalise. People work around them, managers accept them as part of the job and leadership only sees the problem when a major failure occurs. A modern technology standard is intended to stop that drift.",
        ],
      },
      {
        heading: "Reactive support keeps the business behind the problem",
        paragraphs: [
          "Break-fix support has a role, but it should not be the operating model for a business that depends heavily on technology. If every issue is handled only after someone complains, the organisation is always reacting to symptoms.",
          "Managed standards shift attention toward prevention: patching, monitoring, documentation, lifecycle planning, security controls, backup validation and user support processes. The goal is not perfection. The goal is fewer surprises and clearer ownership when issues do occur.",
        ],
      },
      {
        heading: "Technical debt becomes operational debt",
        paragraphs: [
          "Old systems, undocumented configurations, inconsistent permissions, unmanaged devices and disconnected applications may seem manageable for a while. Over time they make every change slower and riskier.",
          "Technical debt can delay new projects, complicate onboarding, weaken security and make it harder to scale. It can also increase dependence on individual employees or vendors who are the only people who understand how something was set up.",
        ],
      },
      {
        heading: "A standard creates a basis for improvement",
        paragraphs: [
          "A technology standard gives leadership a way to judge whether the environment is being managed intentionally. Are systems documented? Are backups tested? Are users protected with MFA? Are devices maintained? Are vendors coordinated? Are projects aligned with business goals?",
          "Once those questions have clear answers, the business can prioritise intelligently. Some improvements will be urgent. Others can be planned over time. The important shift is moving from guesswork to a managed operating model.",
        ],
      },
    ],
  },
  {
    slug: "when-to-move-from-reactive-support-to-managed-it",
    title: "When Should a Business Move from Reactive IT Support to Managed IT?",
    summary: "Managed IT becomes important when technology is too central to the business to be handled only after something breaks.",
    category: "Managed IT",
    publishedAt: "2026-01-29",
    readingTime: "6 min read",
    author: "Redstone Technology Solutions",
    seoDescription: "Signs that a business should move from reactive IT support to managed IT, including growth, cloud reliance, security expectations and accountability needs.",
    keywords: ["managed IT", "reactive IT support", "IT support Bahamas", "business continuity"],
    relatedServiceLinks: [
      { label: "Explore Managed IT", href: "/managed-it" },
      { label: "Contact Redstone", href: "/contact" },
    ],
    cta: {
      label: "Explore managed IT",
      href: "/managed-it",
      text: "If reactive support is no longer enough, Redstone can help you move toward a managed model built around prevention, accountability and continuous improvement.",
    },
    body: [
      {
        heading: "Reactive support works until the business outgrows it",
        paragraphs: [
          "Many organisations begin with informal or reactive IT support. Someone calls when a computer fails, email stops working or a printer causes trouble. For a very small business with simple needs, that may be enough for a period of time.",
          "The model starts to break down when technology becomes central to revenue, service delivery, compliance, security or employee productivity. At that point, waiting for problems to surface is usually more expensive than managing the environment properly.",
        ],
      },
      {
        heading: "Growth changes the risk profile",
        paragraphs: [
          "More employees, more devices, more cloud accounts and more locations create more moving parts. Remote and hybrid work add another layer. So do line-of-business applications, customer portals, shared files, payment systems and vendor integrations.",
          "As the environment grows, leadership needs predictable support, documented systems, clear ownership and visibility into risk. Managed IT provides an operating model for that complexity.",
        ],
      },
      {
        heading: "Security and continuity expectations are higher",
        paragraphs: [
          "Insurers, customers, banks, regulators and partners increasingly expect organisations to demonstrate basic technology discipline. Multifactor authentication, patching, backup recoverability, endpoint protection and access control are no longer optional extras for many businesses.",
          "Managed IT helps keep those responsibilities active. It does not simply add more people to call when something breaks. It creates routines, reviews and standards that reduce preventable disruption.",
        ],
      },
      {
        heading: "The decision is about accountability",
        paragraphs: [
          "The strongest sign that a business needs managed IT is not a specific employee count. It is the absence of clear accountability. If no one can say who owns monitoring, backups, patching, user support, security reviews, lifecycle planning and vendor coordination, the environment is probably under-managed.",
          "Moving to managed IT gives the organisation a defined partner, a clear support path and a more deliberate way to improve over time.",
        ],
      },
    ],
  },
];

export function getAllInsights() {
  return [...articles].sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
}

export function getFeaturedInsight() {
  return getAllInsights().find((article) => article.featured) ?? getAllInsights()[0];
}

export function getLatestInsights(limit = 3) {
  return getAllInsights().slice(0, limit);
}

export function getInsightBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getRelatedInsights(currentSlug: string, limit = 2) {
  return getAllInsights().filter((article) => article.slug !== currentSlug).slice(0, limit);
}

export function formatInsightDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  return new Intl.DateTimeFormat("en-BS", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(year, month - 1, day),
  );
}
