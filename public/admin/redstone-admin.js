(function () {
  const source = window.REDSTONE_CMS_DATA || { site: {}, team: {}, insights: [] };
  const draftKey = "redstoneCmsDraft";
  const sectionTitles = {
    overview: "Overview",
    site: "Hero & Contact",
    team: "Our Team",
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
      return JSON.parse(saved);
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

  function makeField({ label, path, type = "text", rows = 4, help = "" }) {
    const value = get(path) ?? "";
    const id = path.replace(/[^a-z0-9]/gi, "-");
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
      input.addEventListener("input", (event) => {
        const target = event.currentTarget;
        set(target.dataset.path, target.type === "checkbox" ? target.checked : target.value);
      });
    });
  }

  function renderOverview() {
    const metrics = [
      ["Hero", data.site.homeHero?.title || "Configured"],
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
      makeField({ label: "Hero image path", path: "site.homeHero.image" }),
      makeField({ label: "Hero image alt text", path: "site.homeHero.imageAlt" }),
      makeField({ label: "Primary CTA label", path: "site.homeHero.primaryCtaLabel" }),
      makeField({ label: "Primary CTA link", path: "site.homeHero.primaryCtaHref" }),
      makeField({ label: "Secondary CTA label", path: "site.homeHero.secondaryCtaLabel" }),
      makeField({ label: "Secondary CTA link", path: "site.homeHero.secondaryCtaHref" }),
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
          <label class="field"><span>Image path</span><input value="${html(member.image)}" data-team-index="${index}" data-team-field="image" /></label>
          <label class="field"><span>Alt text</span><input value="${html(member.imageAlt)}" data-team-index="${index}" data-team-field="imageAlt" /></label>
          <label class="field"><span>Responsible for</span><textarea rows="2" data-team-index="${index}" data-team-field="responsibility">${html(member.responsibility)}</textarea></label>
          <label class="field"><span>Description</span><textarea rows="3" data-team-index="${index}" data-team-field="description">${html(member.description)}</textarea></label>
        </div>
      </article>`)
      .join("");
    document.querySelectorAll("[data-team-index]").forEach((input) => {
      input.addEventListener("input", (event) => {
        const target = event.currentTarget;
        data.team.members[Number(target.dataset.teamIndex)][target.dataset.teamField] = target.value;
        refresh();
      });
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
        ${makeField({ label: "Profile image path", path: "team.directorProfile.image" })}
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

  function bindListInputs(scope) {
    scope.querySelectorAll("[data-list-path]").forEach((input) => {
      input.addEventListener("input", (event) => set(event.currentTarget.dataset.listPath, textToList(event.currentTarget.value)));
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
      <label class="field"><span>Category</span><input value="${html(article.category)}" data-article-field="category" /></label>
      <label class="field"><span>Date</span><input type="date" value="${html(article.publishedAt)}" data-article-field="publishedAt" /></label>
      <label class="field"><span>Reading time</span><input value="${html(article.readingTime)}" data-article-field="readingTime" /></label>
      <label class="field"><span>Author</span><input value="${html(article.author)}" data-article-field="author" /></label>
      <label class="field field--wide"><span>Summary</span><textarea rows="3" data-article-field="summary">${html(article.summary)}</textarea></label>
      <label class="field field--wide"><span>SEO description</span><textarea rows="3" data-article-field="seoDescription">${html(article.seoDescription)}</textarea></label>
      <label class="field field--wide"><span>Keywords</span><textarea rows="3" data-article-list="keywords">${html(listToText(article.keywords))}</textarea><small>One keyword per line.</small></label>
      <label class="field field--wide"><span>Article body</span><textarea rows="16" data-article-body>${html(bodyToText(article))}</textarea><small>Use ## headings followed by paragraph lines.</small></label>
    </div>`;
    document.querySelectorAll("[data-article-field]").forEach((input) => {
      input.addEventListener("input", (event) => {
        data.insights[selectedInsight][event.currentTarget.dataset.articleField] = event.currentTarget.value;
        refresh();
      });
    });
    document.querySelectorAll("[data-article-list]").forEach((input) => {
      input.addEventListener("input", (event) => {
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
      makeField({ label: "Provider", path: "site.analytics.provider" }),
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
    renderTeam();
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
