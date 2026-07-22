(function () {
  const source = window.REDSTONE_CMS_DATA || { site: {}, team: {}, insights: [] };
  const draftKey = "redstoneCmsDraft:v3:compact-media-footer";
  const sectionTitles = {
    overview: "Overview",
    site: "Hero & Contact",
    services: "Services",
    capabilities: "Solutions",
    team: "Our Team",
    testimonials: "Testimonials",
    partnerships: "Partners",
    footer: "Footer & Social",
    director: "Leadership Profile",
    insights: "Insights",
    analytics: "Basic Analytics",
    export: "Export CMS Draft",
  };

  let data = loadDraft();
  let selectedInsight = 0;

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function loadDraft() {
    const saved = localStorage.getItem(draftKey);
    if (!saved) return clone(source);
    try {
      const parsed = JSON.parse(saved);
      return {
        ...clone(source),
        ...parsed,
        site: { ...clone(source.site), ...(parsed.site || {}) },
        team: { ...clone(source.team), ...(parsed.team || {}) },
        frontend: { ...clone(source.frontend || {}), ...(parsed.frontend || {}) },
        insights: parsed.insights || clone(source.insights || []),
      };
    } catch {
      return clone(source);
    }
  }

  function get(path) {
    return path.split(".").reduce((current, key) => current?.[key], data);
  }

  function set(path, value) {
    const parts = path.split(".");
    const last = parts.pop();
    const target = parts.reduce((current, key) => current[key], data);
    target[last] = value;
    refresh();
  }

  function html(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function notify(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.setTimeout(() => toast.classList.remove("is-visible"), 2400);
  }

  const linkOptions = [
    ["/", "Home"],
    ["/managed-it", "Services"],
    ["/managed-it#services", "Service section"],
    ["/managed-it#overwatch", "Overwatch service"],
    ["/managed-it#checkmark", "Checkmark service"],
    ["/managed-it#helpdesk", "Helpdesk service"],
    ["/managed-it#shield", "Shield service"],
    ["/managed-it#cirrus", "Cirrus service"],
    ["/capabilities", "Solutions"],
    ["/capabilities#process", "Process"],
    ["/about", "About"],
    ["/about#team", "Our Team"],
    ["/about#director", "Leadership"],
    ["/about#partnerships", "Partners"],
    ["/insights", "Insights"],
    ["/contact", "Contact"],
    ["/admin/", "Site Admin"],
    ["https://msp2.rdstn.com/", "Client Portal"],
    ["tel:+12426016014", "Client Support phone"],
  ];

  const insightCategoryOptions = ["Managed IT", "Cybersecurity", "Technology Standard", "Cloud Services", "Workflow Automation", "AI Applications", "Business Continuity", "Local Support"];
  const readingTimeOptions = ["3 min read", "4 min read", "5 min read", "6 min read", "7 min read", "8 min read", "10 min read"];

  function onEdit(input, handler) {
    input.addEventListener("input", handler);
    input.addEventListener("change", handler);
  }

  function makeSelectOptions(options, value) {
    const hasCurrentValue = options.some((option) => String(Array.isArray(option) ? option[0] : option) === String(value));
    const normalizedOptions = hasCurrentValue || value === "" || value == null ? options : [[value, `Custom: ${value}`], ...options];
    return normalizedOptions.map((option) => {
      const optionValue = Array.isArray(option) ? option[0] : option;
      const optionLabel = Array.isArray(option) ? option[1] : option;
      return `<option value="${html(optionValue)}" ${String(optionValue) === String(value) ? "selected" : ""}>${html(optionLabel)}</option>`;
    }).join("");
  }

  function makeField({ label, path, type = "text", rows = 4, help = "", options = [] }) {
    const value = get(path) ?? "";
    const id = path.replace(/[^a-z0-9]/gi, "-");
    if (type === "select") {
      return `<label class="field" for="${id}">
        <span>${label}</span>
        <select id="${id}" data-path="${path}">${makeSelectOptions(options, value)}</select>
        ${help ? `<small>${help}</small>` : ""}
      </label>`;
    }
    if (type === "image") {
      return `<label class="field image-field" for="${id}">
        <span>${label}</span>
        <div class="image-upload">
          <img src="${html(value)}" alt="" data-image-preview="${path}" />
          <div>
            <input id="${id}" type="file" accept="image/*" data-image-upload="${path}" />
            <details class="advanced-source">
              <summary>Advanced: current image source</summary>
              <input type="text" value="${html(value)}" data-path="${path}" aria-label="${html(label)} current image source" />
            </details>
            <small>${help || "Choose an image from your computer. The CMS stores a browser draft/export for now; final publishing still needs the asset committed into /public."}</small>
          </div>
        </div>
      </label>`;
    }
    if (type === "textarea") {
      return `<label class="field" for="${id}">
        <span>${label}</span>
        <textarea id="${id}" rows="${rows}" data-path="${path}">${html(value)}</textarea>
        ${help ? `<small>${help}</small>` : ""}
      </label>`;
    }
    if (type === "checkbox") {
      return `<label class="field field--checkbox" for="${id}">
        <input id="${id}" type="checkbox" data-path="${path}" ${value ? "checked" : ""} />
        <span>${label}</span>
        ${help ? `<small>${help}</small>` : ""}
      </label>`;
    }
    return `<label class="field" for="${id}">
      <span>${label}</span>
      <input id="${id}" type="${type}" value="${html(value)}" data-path="${path}" />
      ${help ? `<small>${help}</small>` : ""}
    </label>`;
  }

  function listToText(items) {
    return (items || []).join("\n");
  }

  function textToList(value) {
    return String(value || "")
      .split(/\r?\n/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  function bodyToText(article) {
    return (article.body || [])
      .map((section) => [`## ${section.heading}`, ...(section.paragraphs || [])].join("\n\n"))
      .join("\n\n");
  }

  function textToBody(value) {
    return String(value || "")
      .split(/\n(?=##\s+)/)
      .map((block) => {
        const lines = block.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
        const heading = (lines.shift() || "Article section").replace(/^##\s+/, "");
        return { heading, paragraphs: lines.filter((line) => !line.startsWith("## ")) };
      })
      .filter((section) => section.heading || section.paragraphs.length);
  }

  function bindInputs(scope = document) {
    scope.querySelectorAll("[data-path]").forEach((input) => {
      onEdit(input, (event) => {
        const target = event.currentTarget;
        set(target.dataset.path, target.type === "checkbox" ? target.checked : target.value);
      });
    });
    scope.querySelectorAll("[data-image-upload]").forEach((input) => {
      input.addEventListener("change", (event) => {
        const target = event.currentTarget;
        const file = target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          set(target.dataset.imageUpload, reader.result);
          document.querySelectorAll(`[data-image-preview="${target.dataset.imageUpload}"]`).forEach((img) => {
            img.src = reader.result;
          });
          notify("Image preview added to draft.");
        });
        reader.readAsDataURL(file);
      });
    });
  }

  function renderOverview() {
    const metrics = [
      ["Hero", data.site.homeHero?.title || "Configured"],
      ["Services", `${data.frontend?.services?.length || 0} managed categories`],
      ["Team", `${data.team.members?.length || 0} people + operations`],
      ["Insights", `${data.insights?.length || 0} articles`],
      ["Analytics", data.site.analytics?.enabled ? data.site.analytics.provider : "Disabled"],
    ];
    document.getElementById("overviewMetrics").innerHTML = metrics
      .map(([label, value]) => `<article><span>${html(label)}</span><strong>${html(value)}</strong></article>`)
      .join("");
  }

  function renderSite() {
    document.getElementById("siteForm").innerHTML = [
      makeField({ label: "Site name", path: "site.site.name" }),
      makeField({ label: "Site URL", path: "site.site.url" }),
      makeField({ label: "Hero eyebrow", path: "site.homeHero.eyebrow" }),
      makeField({ label: "Hero title", path: "site.homeHero.title" }),
      makeField({ label: "Hero supporting copy", path: "site.homeHero.description", type: "textarea" }),
      makeField({ label: "Hero image", path: "site.homeHero.image", type: "image" }),
      makeField({ label: "Hero image alt text", path: "site.homeHero.imageAlt" }),
      makeField({ label: "Primary CTA label", path: "site.homeHero.primaryCtaLabel" }),
      makeField({ label: "Primary CTA link", path: "site.homeHero.primaryCtaHref", type: "select", options: linkOptions }),
      makeField({ label: "Secondary CTA label", path: "site.homeHero.secondaryCtaLabel" }),
      makeField({ label: "Secondary CTA link", path: "site.homeHero.secondaryCtaHref", type: "select", options: linkOptions }),
      makeField({ label: "Public phone display", path: "site.contact.phoneDisplay" }),
      makeField({ label: "Public email", path: "site.contact.emailDisplay" }),
      makeField({ label: "LinkedIn company URL", path: "site.contact.linkedin" }),
      makeField({ label: "Street address", path: "site.address.street" }),
      makeField({ label: "Map link", path: "site.address.mapHref" }),
    ].join("");
    bindInputs(document.getElementById("siteForm"));
  }

  function renderTeam() {
    const members = data.team.members || [];
    document.getElementById("teamCards").innerHTML = members
      .map((member, index) => `<article class="edit-card">
        <div class="edit-card__image"><img src="${html(member.image)}" alt="${html(member.imageAlt || member.name)}" /></div>
        <div class="edit-card__body">
          <p class="admin-kicker">${String(index + 1).padStart(2, "0")}</p>
          <label class="field"><span>Name</span><input value="${html(member.name)}" data-team-index="${index}" data-team-field="name" /></label>
          <label class="field"><span>Title</span><input value="${html(member.title)}" data-team-index="${index}" data-team-field="title" /></label>
          <label class="field image-field"><span>Image</span><div class="image-upload image-upload--compact"><img src="${html(member.image)}" alt="" data-team-preview="${index}" /><div><input type="file" accept="image/*" data-team-image="${index}" /><details class="advanced-source"><summary>Advanced: current image source</summary><input value="${html(member.image)}" data-team-index="${index}" data-team-field="image" /></details></div></div></label>
          <label class="field"><span>Alt text</span><input value="${html(member.imageAlt)}" data-team-index="${index}" data-team-field="imageAlt" /></label>
          <label class="field"><span>Responsible for</span><textarea rows="2" data-team-index="${index}" data-team-field="responsibility">${html(member.responsibility)}</textarea></label>
          <label class="field"><span>Description</span><textarea rows="3" data-team-index="${index}" data-team-field="description">${html(member.description)}</textarea></label>
        </div>
      </article>`)
      .join("");
    document.querySelectorAll("[data-team-index]").forEach((input) => {
      onEdit(input, (event) => {
        const target = event.currentTarget;
        data.team.members[Number(target.dataset.teamIndex)][target.dataset.teamField] = target.value;
        refresh();
      });
    });
    document.querySelectorAll("[data-team-image]").forEach((input) => {
      input.addEventListener("change", (event) => {
        const target = event.currentTarget;
        const file = target.files?.[0];
        if (!file) return;
        const index = Number(target.dataset.teamImage);
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          data.team.members[index].image = reader.result;
          document.querySelector(`[data-team-preview="${index}"]`).src = reader.result;
          const sourceInput = document.querySelector(`[data-team-index="${index}"][data-team-field="image"]`);
          if (sourceInput) sourceInput.value = reader.result;
          refresh();
          notify("Team image preview added to draft.");
        });
        reader.readAsDataURL(file);
      });
    });
  }

  function renderTextCollection({ containerId, path, titleField = "name", fields }) {
    const items = get(path) || [];
    const container = document.getElementById(containerId);
    container.innerHTML = items
      .map((item, index) => `<article class="edit-card edit-card--text">
        <div class="edit-card__number">${String(index + 1).padStart(2, "0")}</div>
        <div class="edit-card__body">
          <h4>${html(item[titleField] || item.brand || `Item ${index + 1}`)}</h4>
          <div class="form-grid">
            ${fields.map((field) => {
              const value = item[field.key];
              if (Array.isArray(value)) {
                return `<label class="field field--wide"><span>${field.label}</span><textarea rows="${field.rows || 5}" data-array-collection="${path}" data-array-index="${index}" data-array-field="${field.key}">${html(listToText(value))}</textarea><small>One item per line.</small></label>`;
              }
              if (field.type === "select") {
                return `<label class="field ${field.wide ? "field--wide" : ""}"><span>${field.label}</span><select data-collection="${path}" data-index="${index}" data-field="${field.key}">${makeSelectOptions(field.options || [], value)}</select></label>`;
              }
              const textarea = field.type === "textarea";
              return `<label class="field ${field.wide ? "field--wide" : ""}"><span>${field.label}</span>${textarea ? `<textarea rows="${field.rows || 3}" data-collection="${path}" data-index="${index}" data-field="${field.key}">${html(value)}</textarea>` : `<input value="${html(value)}" data-collection="${path}" data-index="${index}" data-field="${field.key}" />`}</label>`;
            }).join("")}
          </div>
        </div>
      </article>`)
      .join("");

    container.querySelectorAll("[data-collection]").forEach((input) => {
      onEdit(input, (event) => {
        const target = event.currentTarget;
        get(target.dataset.collection)[Number(target.dataset.index)][target.dataset.field] = target.value;
        refresh();
      });
    });
    container.querySelectorAll("[data-array-collection]").forEach((input) => {
      onEdit(input, (event) => {
        const target = event.currentTarget;
        get(target.dataset.arrayCollection)[Number(target.dataset.arrayIndex)][target.dataset.arrayField] = textToList(target.value);
        refresh();
      });
    });
  }

  function renderFrontendCollections() {
    renderTextCollection({
      containerId: "servicesCards",
      path: "frontend.services",
      titleField: "brand",
      fields: [
        { key: "brand", label: "Brand" },
        { key: "name", label: "Service name" },
        { key: "role", label: "System role", type: "select", options: ["The visibility layer", "The stability layer", "The people layer", "The protection layer", "The modernisation layer"] },
        { key: "promise", label: "Promise", wide: true },
        { key: "description", label: "Short description", type: "textarea", wide: true },
        { key: "responsibility", label: "Responsibility", type: "textarea", wide: true },
        { key: "bestFor", label: "Best for", type: "textarea", wide: true },
        { key: "covers", label: "What it covers", rows: 6 },
      ],
    });

    renderTextCollection({
      containerId: "capabilitiesCards",
      path: "frontend.capabilities",
      fields: [
        { key: "name", label: "Capability" },
        { key: "text", label: "Description", type: "textarea", wide: true },
      ],
    });

    renderTextCollection({
      containerId: "testimonialCards",
      path: "frontend.testimonials",
      titleField: "name",
      fields: [
        { key: "name", label: "Name" },
        { key: "role", label: "Role" },
        { key: "company", label: "Company" },
        { key: "quote", label: "Quote", type: "textarea", rows: 5, wide: true },
      ],
    });

    renderTextCollection({
      containerId: "partnershipCards",
      path: "frontend.partnerships",
      fields: [{ key: "name", label: "Partner / affiliation" }],
    });
  }

  function renderDirector() {
    const director = data.team.directorProfile || {};
    document.getElementById("directorForm").innerHTML = `<div class="profile-editor">
      <aside class="profile-preview">
        <img src="${html(director.image)}" alt="${html(director.imageAlt)}" />
        <div><strong>${html(director.name)}</strong><span>${html(director.role)}</span></div>
      </aside>
      <div class="form-grid">
        ${makeField({ label: "Name", path: "team.directorProfile.name" })}
        ${makeField({ label: "Role line", path: "team.directorProfile.role" })}
        ${makeField({ label: "Profile image", path: "team.directorProfile.image", type: "image" })}
        ${makeField({ label: "Image alt text", path: "team.directorProfile.imageAlt" })}
        ${makeField({ label: "Email", path: "team.directorProfile.email" })}
        ${makeField({ label: "Phone", path: "team.directorProfile.phoneDisplay" })}
        ${makeField({ label: "LinkedIn URL", path: "team.directorProfile.linkedin" })}
        ${makeField({ label: "Location", path: "team.directorProfile.location" })}
        <label class="field field--wide"><span>Intro paragraphs</span><textarea rows="8" data-list-path="team.directorProfile.intro">${html(listToText(director.intro))}</textarea><small>One paragraph per line.</small></label>
        <label class="field field--wide"><span>Areas of focus</span><textarea rows="6" data-list-path="team.directorProfile.focusAreas">${html(listToText(director.focusAreas))}</textarea><small>One item per line.</small></label>
        <label class="field field--wide"><span>Highlighted professional credentials</span><textarea rows="8" data-list-path="team.directorProfile.professionalCredentials">${html(listToText(director.professionalCredentials))}</textarea></label>
        <label class="field field--wide"><span>Trainer credentials</span><textarea rows="5" data-list-path="team.directorProfile.trainerCredentials">${html(listToText(director.trainerCredentials))}</textarea></label>
      </div>
    </div>`;
    bindInputs(document.getElementById("directorForm"));
    bindListInputs(document.getElementById("directorForm"));
  }

  function renderFooter() {
    const footer = data.frontend?.footer || {};
    document.getElementById("footerBrandForm").innerHTML = `
      <p class="admin-kicker">Brand footer</p>
      <div class="form-grid form-grid--one">
        ${makeField({ label: "Footer tagline", path: "frontend.footer.tagline", type: "textarea", rows: 3 })}
        ${makeField({ label: "Copyright line", path: "frontend.footer.copyright" })}
      </div>`;

    document.getElementById("footerSocialForm").innerHTML = `
      <p class="admin-kicker">Social / utility links</p>
      <div class="mini-stack">
        ${(footer.socialProfiles || []).map((profile, index) => `<article class="mini-card">
          <label class="field"><span>Platform</span><select data-footer-social="${index}" data-field="platform">${makeSelectOptions(["LinkedIn", "Facebook", "Instagram", "X / Twitter", "YouTube", "Site Admin", "Other"], profile.platform)}</select></label>
          <label class="field"><span>Label</span><input value="${html(profile.label)}" data-footer-social="${index}" data-field="label" /></label>
          <label class="field"><span>URL</span><input value="${html(profile.url)}" data-footer-social="${index}" data-field="url" /></label>
          <label class="field field--checkbox"><input type="checkbox" ${profile.enabled ? "checked" : ""} data-footer-social="${index}" data-field="enabled" /><span>Enabled</span></label>
        </article>`).join("")}
      </div>`;

    document.getElementById("footerColumns").innerHTML = (footer.columns || []).map((column, columnIndex) => `<article class="edit-card edit-card--text">
      <div class="edit-card__number">${String(columnIndex + 1).padStart(2, "0")}</div>
      <div class="edit-card__body">
        <label class="field"><span>Column heading</span><input value="${html(column.heading)}" data-footer-column="${columnIndex}" data-field="heading" /></label>
        <div class="mini-stack">
          ${(column.links || []).map((link, linkIndex) => `<div class="footer-link-row">
            <input value="${html(link.label)}" aria-label="Footer link label" data-footer-link-column="${columnIndex}" data-footer-link="${linkIndex}" data-field="label" />
            <select aria-label="Footer link destination" data-footer-link-column="${columnIndex}" data-footer-link="${linkIndex}" data-field="url">${makeSelectOptions(linkOptions, link.url)}</select>
          </div>`).join("")}
        </div>
      </div>
    </article>`).join("");

    bindInputs(document.getElementById("footerBrandForm"));
    document.querySelectorAll("[data-footer-social]").forEach((input) => {
      onEdit(input, (event) => {
        const target = event.currentTarget;
        const value = target.type === "checkbox" ? target.checked : target.value;
        data.frontend.footer.socialProfiles[Number(target.dataset.footerSocial)][target.dataset.field] = value;
        refresh();
      });
    });
    document.querySelectorAll("[data-footer-column]").forEach((input) => {
      onEdit(input, (event) => {
        const target = event.currentTarget;
        data.frontend.footer.columns[Number(target.dataset.footerColumn)][target.dataset.field] = target.value;
        refresh();
      });
    });
    document.querySelectorAll("[data-footer-link]").forEach((input) => {
      onEdit(input, (event) => {
        const target = event.currentTarget;
        data.frontend.footer.columns[Number(target.dataset.footerLinkColumn)].links[Number(target.dataset.footerLink)][target.dataset.field] = target.value;
        refresh();
      });
    });
  }

  function bindListInputs(scope) {
    scope.querySelectorAll("[data-list-path]").forEach((input) => {
      onEdit(input, (event) => set(event.currentTarget.dataset.listPath, textToList(event.currentTarget.value)));
    });
  }

  function renderInsights() {
    const insights = data.insights || [];
    const article = insights[selectedInsight] || insights[0];
    document.getElementById("insightList").innerHTML = insights
      .map((item, index) => `<button type="button" class="${index === selectedInsight ? "is-active" : ""}" data-insight-index="${index}">
        <span>${html(item.category)}</span>
        <strong>${html(item.title)}</strong>
        <small>${html(item.publishedAt)} · ${html(item.readingTime)}</small>
      </button>`)
      .join("");
    document.querySelectorAll("[data-insight-index]").forEach((button) => {
      button.addEventListener("click", () => {
        selectedInsight = Number(button.dataset.insightIndex);
        renderInsights();
      });
    });
    if (!article) return;
    document.getElementById("insightEditor").innerHTML = `<div class="form-grid">
      <label class="field"><span>Title</span><input value="${html(article.title)}" data-article-field="title" /></label>
      <label class="field"><span>Slug</span><input value="${html(article.slug)}" data-article-field="slug" /></label>
      <label class="field"><span>Category</span><select data-article-field="category">${makeSelectOptions(insightCategoryOptions, article.category)}</select></label>
      <label class="field"><span>Date</span><input type="date" value="${html(article.publishedAt)}" data-article-field="publishedAt" /></label>
      <label class="field"><span>Reading time</span><select data-article-field="readingTime">${makeSelectOptions(readingTimeOptions, article.readingTime)}</select></label>
      <label class="field"><span>Author</span><input value="${html(article.author)}" data-article-field="author" /></label>
      <label class="field field--wide"><span>Summary</span><textarea rows="3" data-article-field="summary">${html(article.summary)}</textarea></label>
      <label class="field field--wide"><span>SEO description</span><textarea rows="3" data-article-field="seoDescription">${html(article.seoDescription)}</textarea></label>
      <label class="field field--wide"><span>Keywords</span><textarea rows="3" data-article-list="keywords">${html(listToText(article.keywords))}</textarea><small>One keyword per line.</small></label>
      <label class="field field--wide"><span>Article body</span><textarea rows="16" data-article-body>${html(bodyToText(article))}</textarea><small>Use ## headings followed by paragraph lines.</small></label>
    </div>`;
    document.querySelectorAll("[data-article-field]").forEach((input) => {
      onEdit(input, (event) => {
        data.insights[selectedInsight][event.currentTarget.dataset.articleField] = event.currentTarget.value;
        refresh();
      });
    });
    document.querySelectorAll("[data-article-list]").forEach((input) => {
      onEdit(input, (event) => {
        data.insights[selectedInsight][event.currentTarget.dataset.articleList] = textToList(event.currentTarget.value);
        refresh();
      });
    });
    document.querySelector("[data-article-body]")?.addEventListener("input", (event) => {
      data.insights[selectedInsight].body = textToBody(event.currentTarget.value);
      refresh();
    });
  }

  function renderAnalytics() {
    document.getElementById("analyticsForm").innerHTML = [
      makeField({ label: "Enable analytics", path: "site.analytics.enabled", type: "checkbox" }),
      makeField({ label: "Provider", path: "site.analytics.provider", type: "select", options: [["none", "None"], ["plausible", "Plausible"], ["google-analytics", "Google Analytics"]] }),
      makeField({ label: "Plausible domain", path: "site.analytics.plausibleDomain" }),
      makeField({ label: "Google Analytics measurement ID", path: "site.analytics.gaMeasurementId" }),
    ].join("");
    bindInputs(document.getElementById("analyticsForm"));
  }

  function renderExport() {
    const preview = document.getElementById("jsonPreview");
    if (preview) preview.value = JSON.stringify(data, null, 2);
  }

  function refresh() {
    renderOverview();
    renderExport();
  }

  function sectionFromHash() {
    const hash = window.location.hash.toLowerCase();
    if (hash.includes("team")) return "team";
    if (hash.includes("services") || hash.includes("managed-it")) return "services";
    if (hash.includes("capabilities") || hash.includes("solutions")) return "capabilities";
    if (hash.includes("testimonial")) return "testimonials";
    if (hash.includes("partner")) return "partnerships";
    if (hash.includes("footer") || hash.includes("social")) return "footer";
    if (hash.includes("insights")) return "insights";
    if (hash.includes("settings") || hash.includes("site")) return "site";
    if (hash.includes("analytics")) return "analytics";
    if (hash.includes("director") || hash.includes("leadership")) return "director";
    if (hash.includes("export")) return "export";
    return "overview";
  }

  function activateSection(section, updateHash = true) {
    document.querySelectorAll("[data-section]").forEach((item) => item.classList.toggle("is-active", item.dataset.section === section));
    document.querySelectorAll(".admin-section").forEach((item) => item.classList.toggle("is-active", item.id === `section-${section}`));
    document.getElementById("admin-section-title").textContent = sectionTitles[section] || "Redstone CMS";
    if (updateHash) window.history.replaceState(null, "", `#/redstone/${section}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function fullRender() {
    renderOverview();
    renderSite();
    renderFrontendCollections();
    renderTeam();
    renderFooter();
    renderDirector();
    renderInsights();
    renderAnalytics();
    renderExport();
  }

  document.querySelectorAll("[data-section]").forEach((button) => {
    button.addEventListener("click", () => {
      activateSection(button.dataset.section);
    });
  });

  window.addEventListener("hashchange", () => {
    activateSection(sectionFromHash(), false);
  });

  document.getElementById("saveDraft").addEventListener("click", () => {
    localStorage.setItem(draftKey, JSON.stringify(data));
    notify("Draft saved in this browser.");
  });

  document.getElementById("resetDraft").addEventListener("click", () => {
    localStorage.removeItem(draftKey);
    data = clone(source);
    fullRender();
    notify("Draft reset to current frontend content.");
  });

  document.getElementById("downloadBundle").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "redstone-cms-draft.json";
    link.click();
    URL.revokeObjectURL(link.href);
  });

  document.getElementById("copyBundle").addEventListener("click", async () => {
    await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    notify("JSON copied to clipboard.");
  });

  document.addEventListener("mousemove", (event) => {
    document.documentElement.style.setProperty("--admin-mouse-x", `${event.clientX}px`);
    document.documentElement.style.setProperty("--admin-mouse-y", `${event.clientY}px`);
  });

  fullRender();
  activateSection(sectionFromHash(), false);
})();
