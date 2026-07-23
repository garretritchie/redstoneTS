(function () {
  var SUPABASE_URL = "https://hnfdrolietieeqotxgqq.supabase.co";
  var SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhuZmRyb2xpZXRpZWVxb3R4Z3FxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ3NDA3NTcsImV4cCI6MjEwMDMxNjc1N30.Avdto-_gKj5qInBXGp0yGY-JKShYOBEFuemwvjLbWtY";

  var SESSION_KEY = "redstone_cms_session";
  var source = window.REDSTONE_CMS_DATA || { site: {}, team: {}, insights: [] };
  var draftKey = "redstoneCmsDraft:v3:compact-media-footer";
  var sectionTitles = {
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
    analytics: "Site Analytics",
    export: "Export CMS Draft",
  };

  var data = loadDraft();
  var selectedInsight = 0;
  var accessToken = null;

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function loadDraft() {
    var saved = localStorage.getItem(draftKey);
    if (!saved) return clone(source);
    try {
      var parsed = JSON.parse(saved);
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
    return path.split(".").reduce(function (current, key) { return current ? current[key] : undefined; }, data);
  }

  function set(path, value) {
    var parts = path.split(".");
    var last = parts.pop();
    var target = parts.reduce(function (current, key) { return current[key]; }, data);
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
    var toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.setTimeout(function () { toast.classList.remove("is-visible"); }, 2400);
  }

  var linkOptions = [
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

  var insightCategoryOptions = ["Managed IT", "Cybersecurity", "Technology Standard", "Cloud Services", "Workflow Automation", "AI Applications", "Business Continuity", "Local Support"];
  var readingTimeOptions = ["3 min read", "4 min read", "5 min read", "6 min read", "7 min read", "8 min read", "10 min read"];

  function onEdit(input, handler) {
    input.addEventListener("input", handler);
    input.addEventListener("change", handler);
  }

  function makeSelectOptions(options, value) {
    var hasCurrentValue = options.some(function (option) { return String(Array.isArray(option) ? option[0] : option) === String(value); });
    var normalizedOptions = hasCurrentValue || value === "" || value == null ? options : [[value, "Custom: " + value]].concat(options);
    return normalizedOptions.map(function (option) {
      var optionValue = Array.isArray(option) ? option[0] : option;
      var optionLabel = Array.isArray(option) ? option[1] : option;
      return '<option value="' + html(optionValue) + '" ' + (String(optionValue) === String(value) ? "selected" : "") + ">" + html(optionLabel) + "</option>";
    }).join("");
  }

  function makeField(opts) {
    var label = opts.label, path = opts.path, type = opts.type || "text", rows = opts.rows || 4, help = opts.help || "", options = opts.options || [];
    var value = get(path) ?? "";
    var id = path.replace(/[^a-z0-9]/gi, "-");
    if (type === "select") {
      return '<label class="field" for="' + id + '"><span>' + label + '</span><select id="' + id + '" data-path="' + path + '">' + makeSelectOptions(options, value) + '</select>' + (help ? '<small>' + help + '</small>' : '') + '</label>';
    }
    if (type === "image") {
      return '<label class="field image-field" for="' + id + '"><span>' + label + '</span><div class="image-upload"><img src="' + html(value) + '" alt="" data-image-preview="' + path + '" /><div><input id="' + id + '" type="file" accept="image/*" data-image-upload="' + path + '" /><details class="advanced-source"><summary>Advanced: current image source</summary><input type="text" value="' + html(value) + '" data-path="' + path + '" aria-label="' + html(label) + ' current image source" /></details><small>' + (help || 'Choose an image from your computer. The CMS stores a browser draft/export for now; final publishing still needs the asset committed into /public.') + '</small></div></div></label>';
    }
    if (type === "textarea") {
      return '<label class="field" for="' + id + '"><span>' + label + '</span><textarea id="' + id + '" rows="' + rows + '" data-path="' + path + '">' + html(value) + '</textarea>' + (help ? '<small>' + help + '</small>' : '') + '</label>';
    }
    if (type === "checkbox") {
      return '<label class="field field--checkbox" for="' + id + '"><input id="' + id + '" type="checkbox" data-path="' + path + '" ' + (value ? "checked" : "") + ' /><span>' + label + '</span>' + (help ? '<small>' + help + '</small>' : '') + '</label>';
    }
    return '<label class="field" for="' + id + '"><span>' + label + '</span><input id="' + id + '" type="' + type + '" value="' + html(value) + '" data-path="' + path + '" />' + (help ? '<small>' + help + '</small>' : '') + '</label>';
  }

  function listToText(items) {
    return (items || []).join("\n");
  }

  function textToList(value) {
    return String(value || "").split(/\r?\n/).map(function (item) { return item.trim(); }).filter(Boolean);
  }

  function bodyToText(article) {
    return (article.body || []).map(function (section) { return ["## " + section.heading].concat(section.paragraphs || []).join("\n\n"); }).join("\n\n");
  }

  function textToBody(value) {
    return String(value || "").split(/\n(?=##\s+)/).map(function (block) {
      var lines = block.split(/\r?\n/).map(function (line) { return line.trim(); }).filter(Boolean);
      var heading = (lines.shift() || "Article section").replace(/^##\s+/, "");
      return { heading: heading, paragraphs: lines.filter(function (line) { return !line.startsWith("## "); }) };
    }).filter(function (section) { return section.heading || section.paragraphs.length; });
  }

  function bindInputs(scope) {
    scope = scope || document;
    scope.querySelectorAll("[data-path]").forEach(function (input) {
      onEdit(input, function (event) {
        var target = event.currentTarget;
        set(target.dataset.path, target.type === "checkbox" ? target.checked : target.value);
      });
    });
    scope.querySelectorAll("[data-image-upload]").forEach(function (input) {
      input.addEventListener("change", function (event) {
        var target = event.currentTarget;
        var file = target.files && target.files[0];
        if (!file) return;
        var reader = new FileReader();
        reader.addEventListener("load", function () {
          set(target.dataset.imageUpload, reader.result);
          document.querySelectorAll('[data-image-preview="' + target.dataset.imageUpload + '"]').forEach(function (img) { img.src = reader.result; });
          notify("Image preview added to draft.");
        });
        reader.readAsDataURL(file);
      });
    });
  }

  function renderOverview() {
    var metrics = [
      ["Hero", data.site.homeHero && data.site.homeHero.title || "Configured"],
      ["Services", (data.frontend && data.frontend.services ? data.frontend.services.length : 0) + " managed categories"],
      ["Team", (data.team.members || []).length + " people + operations"],
      ["Insights", (data.insights || []).length + " articles"],
    ];
    document.getElementById("overviewMetrics").innerHTML = metrics.map(function (m) {
      return '<article><span>' + html(m[0]) + '</span><strong>' + html(m[1]) + '</strong></article>';
    }).join("");
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
    var members = data.team.members || [];
    document.getElementById("teamCards").innerHTML = members.map(function (member, index) {
      return '<article class="edit-card"><div class="edit-card__image"><img src="' + html(member.image) + '" alt="' + html(member.imageAlt || member.name) + '" /></div><div class="edit-card__body"><p class="admin-kicker">' + String(index + 1).padStart(2, "0") + '</p><label class="field"><span>Name</span><input value="' + html(member.name) + '" data-team-index="' + index + '" data-team-field="name" /></label><label class="field"><span>Title</span><input value="' + html(member.title) + '" data-team-index="' + index + '" data-team-field="title" /></label><label class="field image-field"><span>Image</span><div class="image-upload image-upload--compact"><img src="' + html(member.image) + '" alt="" data-team-preview="' + index + '" /><div><input type="file" accept="image/*" data-team-image="' + index + '" /><details class="advanced-source"><summary>Advanced: current image source</summary><input value="' + html(member.image) + '" data-team-index="' + index + '" data-team-field="image" /></details></div></div></label><label class="field"><span>Alt text</span><input value="' + html(member.imageAlt) + '" data-team-index="' + index + '" data-team-field="imageAlt" /></label><label class="field"><span>Responsible for</span><textarea rows="2" data-team-index="' + index + '" data-team-field="responsibility">' + html(member.responsibility) + '</textarea></label><label class="field"><span>Description</span><textarea rows="3" data-team-index="' + index + '" data-team-field="description">' + html(member.description) + '</textarea></label></div></article>';
    }).join("");
    document.querySelectorAll("[data-team-index]").forEach(function (input) {
      onEdit(input, function (event) {
        var target = event.currentTarget;
        data.team.members[Number(target.dataset.teamIndex)][target.dataset.teamField] = target.value;
        refresh();
      });
    });
    document.querySelectorAll("[data-team-image]").forEach(function (input) {
      input.addEventListener("change", function (event) {
        var target = event.currentTarget;
        var file = target.files && target.files[0];
        if (!file) return;
        var index = Number(target.dataset.teamImage);
        var reader = new FileReader();
        reader.addEventListener("load", function () {
          data.team.members[index].image = reader.result;
          document.querySelector('[data-team-preview="' + index + '"]').src = reader.result;
          var sourceInput = document.querySelector('[data-team-index="' + index + '"][data-team-field="image"]');
          if (sourceInput) sourceInput.value = reader.result;
          refresh();
          notify("Team image preview added to draft.");
        });
        reader.readAsDataURL(file);
      });
    });
  }

  function renderTextCollection(opts) {
    var containerId = opts.containerId, path = opts.path, titleField = opts.titleField || "name", fields = opts.fields;
    var items = get(path) || [];
    var container = document.getElementById(containerId);
    container.innerHTML = items.map(function (item, index) {
      return '<article class="edit-card edit-card--text"><div class="edit-card__number">' + String(index + 1).padStart(2, "0") + '</div><div class="edit-card__body"><h4>' + html(item[titleField] || item.brand || "Item " + (index + 1)) + '</h4><div class="form-grid">' + fields.map(function (field) {
        var value = item[field.key];
        if (Array.isArray(value)) {
          return '<label class="field field--wide"><span>' + field.label + '</span><textarea rows="' + (field.rows || 5) + '" data-array-collection="' + path + '" data-array-index="' + index + '" data-array-field="' + field.key + '">' + html(listToText(value)) + '</textarea><small>One item per line.</small></label>';
        }
        if (field.type === "select") {
          return '<label class="field ' + (field.wide ? "field--wide" : "") + '"><span>' + field.label + '</span><select data-collection="' + path + '" data-index="' + index + '" data-field="' + field.key + '">' + makeSelectOptions(field.options || [], value) + '</select></label>';
        }
        var textarea = field.type === "textarea";
        return '<label class="field ' + (field.wide ? "field--wide" : "") + '"><span>' + field.label + '</span>' + (textarea ? '<textarea rows="' + (field.rows || 3) + '" data-collection="' + path + '" data-index="' + index + '" data-field="' + field.key + '">' + html(value) + '</textarea>' : '<input value="' + html(value) + '" data-collection="' + path + '" data-index="' + index + '" data-field="' + field.key + '" />') + '</label>';
      }).join("") + '</div></div></article>';
    }).join("");

    container.querySelectorAll("[data-collection]").forEach(function (input) {
      onEdit(input, function (event) {
        var target = event.currentTarget;
        get(target.dataset.collection)[Number(target.dataset.index)][target.dataset.field] = target.value;
        refresh();
      });
    });
    container.querySelectorAll("[data-array-collection]").forEach(function (input) {
      onEdit(input, function (event) {
        var target = event.currentTarget;
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
    var director = data.team.directorProfile || {};
    document.getElementById("directorForm").innerHTML = '<div class="profile-editor"><aside class="profile-preview"><img src="' + html(director.image) + '" alt="' + html(director.imageAlt) + '" /><div><strong>' + html(director.name) + '</strong><span>' + html(director.role) + '</span></div></aside><div class="form-grid">' + makeField({ label: "Name", path: "team.directorProfile.name" }) + makeField({ label: "Role line", path: "team.directorProfile.role" }) + makeField({ label: "Profile image", path: "team.directorProfile.image", type: "image" }) + makeField({ label: "Image alt text", path: "team.directorProfile.imageAlt" }) + makeField({ label: "Email", path: "team.directorProfile.email" }) + makeField({ label: "Phone", path: "team.directorProfile.phoneDisplay" }) + makeField({ label: "LinkedIn URL", path: "team.directorProfile.linkedin" }) + makeField({ label: "Location", path: "team.directorProfile.location" }) + '<label class="field field--wide"><span>Intro paragraphs</span><textarea rows="8" data-list-path="team.directorProfile.intro">' + html(listToText(director.intro)) + '</textarea><small>One paragraph per line.</small></label><label class="field field--wide"><span>Areas of focus</span><textarea rows="6" data-list-path="team.directorProfile.focusAreas">' + html(listToText(director.focusAreas)) + '</textarea><small>One item per line.</small></label><label class="field field--wide"><span>Highlighted professional credentials</span><textarea rows="8" data-list-path="team.directorProfile.professionalCredentials">' + html(listToText(director.professionalCredentials)) + '</textarea></label><label class="field field--wide"><span>Trainer credentials</span><textarea rows="5" data-list-path="team.directorProfile.trainerCredentials">' + html(listToText(director.trainerCredentials)) + '</textarea></label></div></div>';
    bindInputs(document.getElementById("directorForm"));
    bindListInputs(document.getElementById("directorForm"));
  }

  function renderFooter() {
    var footer = data.frontend && data.frontend.footer || {};
    document.getElementById("footerBrandForm").innerHTML = '<p class="admin-kicker">Brand footer</p><div class="form-grid form-grid--one">' + makeField({ label: "Footer tagline", path: "frontend.footer.tagline", type: "textarea", rows: 3 }) + makeField({ label: "Copyright line", path: "frontend.footer.copyright" }) + '</div>';
    document.getElementById("footerSocialForm").innerHTML = '<p class="admin-kicker">Social / utility links</p><div class="mini-stack">' + (footer.socialProfiles || []).map(function (profile, index) {
      return '<article class="mini-card"><label class="field"><span>Platform</span><select data-footer-social="' + index + '" data-field="platform">' + makeSelectOptions(["LinkedIn", "Facebook", "Instagram", "X / Twitter", "YouTube", "Site Admin", "Other"], profile.platform) + '</select></label><label class="field"><span>Label</span><input value="' + html(profile.label) + '" data-footer-social="' + index + '" data-field="label" /></label><label class="field"><span>URL</span><input value="' + html(profile.url) + '" data-footer-social="' + index + '" data-field="url" /></label><label class="field field--checkbox"><input type="checkbox" ' + (profile.enabled ? "checked" : "") + ' data-footer-social="' + index + '" data-field="enabled" /><span>Enabled</span></label></article>';
    }).join("") + '</div>';
    document.getElementById("footerColumns").innerHTML = (footer.columns || []).map(function (column, columnIndex) {
      return '<article class="edit-card edit-card--text"><div class="edit-card__number">' + String(columnIndex + 1).padStart(2, "0") + '</div><div class="edit-card__body"><label class="field"><span>Column heading</span><input value="' + html(column.heading) + '" data-footer-column="' + columnIndex + '" data-field="heading" /></label><div class="mini-stack">' + (column.links || []).map(function (link, linkIndex) {
        return '<div class="footer-link-row"><input value="' + html(link.label) + '" aria-label="Footer link label" data-footer-link-column="' + columnIndex + '" data-footer-link="' + linkIndex + '" data-field="label" /><select aria-label="Footer link destination" data-footer-link-column="' + columnIndex + '" data-footer-link="' + linkIndex + '" data-field="url">' + makeSelectOptions(linkOptions, link.url) + '</select></div>';
      }).join("") + '</div></div></article>';
    }).join("");
    bindInputs(document.getElementById("footerBrandForm"));
    document.querySelectorAll("[data-footer-social]").forEach(function (input) {
      onEdit(input, function (event) {
        var target = event.currentTarget;
        var value = target.type === "checkbox" ? target.checked : target.value;
        data.frontend.footer.socialProfiles[Number(target.dataset.footerSocial)][target.dataset.field] = value;
        refresh();
      });
    });
    document.querySelectorAll("[data-footer-column]").forEach(function (input) {
      onEdit(input, function (event) {
        var target = event.currentTarget;
        data.frontend.footer.columns[Number(target.dataset.footerColumn)][target.dataset.field] = target.value;
        refresh();
      });
    });
    document.querySelectorAll("[data-footer-link]").forEach(function (input) {
      onEdit(input, function (event) {
        var target = event.currentTarget;
        data.frontend.footer.columns[Number(target.dataset.footerLinkColumn)].links[Number(target.dataset.footerLink)][target.dataset.field] = target.value;
        refresh();
      });
    });
  }

  function bindListInputs(scope) {
    scope.querySelectorAll("[data-list-path]").forEach(function (input) {
      onEdit(input, function (event) { set(event.currentTarget.dataset.listPath, textToList(event.currentTarget.value)); });
    });
  }

  function renderInsights() {
    var insights = data.insights || [];
    var article = insights[selectedInsight] || insights[0];
    document.getElementById("insightList").innerHTML = insights.map(function (item, index) {
      return '<button type="button" class="' + (index === selectedInsight ? "is-active" : "") + '" data-insight-index="' + index + '"><span>' + html(item.category) + '</span><strong>' + html(item.title) + '</strong><small>' + html(item.publishedAt) + ' · ' + html(item.readingTime) + '</small></button>';
    }).join("");
    document.querySelectorAll("[data-insight-index]").forEach(function (button) {
      button.addEventListener("click", function () {
        selectedInsight = Number(button.dataset.insightIndex);
        renderInsights();
      });
    });
    if (!article) return;
    document.getElementById("insightEditor").innerHTML = '<div class="form-grid"><label class="field"><span>Title</span><input value="' + html(article.title) + '" data-article-field="title" /></label><label class="field"><span>Slug</span><input value="' + html(article.slug) + '" data-article-field="slug" /></label><label class="field"><span>Category</span><select data-article-field="category">' + makeSelectOptions(insightCategoryOptions, article.category) + '</select></label><label class="field"><span>Date</span><input type="date" value="' + html(article.publishedAt) + '" data-article-field="publishedAt" /></label><label class="field"><span>Reading time</span><select data-article-field="readingTime">' + makeSelectOptions(readingTimeOptions, article.readingTime) + '</select></label><label class="field"><span>Author</span><input value="' + html(article.author) + '" data-article-field="author" /></label><label class="field field--wide"><span>Summary</span><textarea rows="3" data-article-field="summary">' + html(article.summary) + '</textarea></label><label class="field field--wide"><span>SEO description</span><textarea rows="3" data-article-field="seoDescription">' + html(article.seoDescription) + '</textarea></label><label class="field field--wide"><span>Keywords</span><textarea rows="3" data-article-list="keywords">' + html(listToText(article.keywords)) + '</textarea><small>One keyword per line.</small></label><label class="field field--wide"><span>Article body</span><textarea rows="16" data-article-body>' + html(bodyToText(article)) + '</textarea><small>Use ## headings followed by paragraph lines.</small></label></div>';
    document.querySelectorAll("[data-article-field]").forEach(function (input) {
      onEdit(input, function (event) {
        data.insights[selectedInsight][event.currentTarget.dataset.articleField] = event.currentTarget.value;
        refresh();
      });
    });
    document.querySelectorAll("[data-article-list]").forEach(function (input) {
      onEdit(input, function (event) {
        data.insights[selectedInsight][event.currentTarget.dataset.articleList] = textToList(event.currentTarget.value);
        refresh();
      });
    });
    var bodyInput = document.querySelector("[data-article-body]");
    if (bodyInput) {
      bodyInput.addEventListener("input", function (event) {
        data.insights[selectedInsight].body = textToBody(event.currentTarget.value);
        refresh();
      });
    }
  }

  function renderExport() {
    var preview = document.getElementById("jsonPreview");
    if (preview) preview.value = JSON.stringify(data, null, 2);
  }

  function refresh() {
    renderOverview();
    renderExport();
  }

  function sectionFromHash() {
    var hash = window.location.hash.toLowerCase();
    if (hash.includes("team")) return "team";
    if (hash.includes("services") || hash.includes("managed-it")) return "services";
    if (hash.includes("capabilities") || hash.includes("solutions")) return "capabilities";
    if (hash.includes("testimonial")) return "testimonials";
    if (hash.includes("partner")) return "partnerships";
    if (hash.includes("footer") || hash.includes("social")) return "footer";
    if (hash.includes("insights")) return "insights";
    if (hash.includes("analytics")) return "analytics";
    if (hash.includes("director") || hash.includes("leadership")) return "director";
    if (hash.includes("export")) return "export";
    if (hash.includes("settings") || hash.includes("site")) return "site";
    return "overview";
  }

  function activateSection(section, updateHash) {
    document.querySelectorAll("[data-section]").forEach(function (item) { item.classList.toggle("is-active", item.dataset.section === section); });
    document.querySelectorAll(".admin-section").forEach(function (item) { item.classList.toggle("is-active", item.id === "section-" + section); });
    document.getElementById("admin-section-title").textContent = sectionTitles[section] || "Redstone CMS";
    if (updateHash !== false) window.history.replaceState(null, "", "#/redstone/" + section);
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (section === "analytics") loadAnalytics();
  }

  function fullRender() {
    renderOverview();
    renderSite();
    renderFrontendCollections();
    renderTeam();
    renderFooter();
    renderDirector();
    renderInsights();
    renderExport();
  }

  // ---- Authentication ----

  function showLogin() {
    document.getElementById("loginScreen").style.display = "flex";
    document.getElementById("adminShell").style.display = "none";
  }

  function showAdmin() {
    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("adminShell").style.display = "grid";
    fullRender();
    activateSection(sectionFromHash(), false);
  }

  function handleLogin(event) {
    event.preventDefault();
    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;
    var errorEl = document.getElementById("loginError");
    var button = document.getElementById("loginButton");

    errorEl.textContent = "";
    button.textContent = "Signing in...";
    button.disabled = true;

    fetch(SUPABASE_URL + "/auth/v1/token?grant_type=password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then(function (res) {
        if (!res.ok) throw new Error("Invalid credentials");
        return res.json();
      })
      .then(function (result) {
        accessToken = result.access_token;
        sessionStorage.setItem(SESSION_KEY, JSON.stringify({ token: accessToken, expires_at: Date.now() + result.expires_in * 1000 }));
        showAdmin();
        notify("Signed in successfully.");
      })
      .catch(function (err) {
        errorEl.textContent = "Invalid email or password. Please try again.";
        button.textContent = "Sign in";
        button.disabled = false;
      });
  }

  function handleSignOut() {
    accessToken = null;
    sessionStorage.removeItem(SESSION_KEY);
    showLogin();
    document.getElementById("loginForm").reset();
    document.getElementById("loginButton").textContent = "Sign in";
    document.getElementById("loginButton").disabled = false;
    notify("Signed out.");
  }

  function checkSession() {
    var saved = sessionStorage.getItem(SESSION_KEY);
    if (!saved) return false;
    try {
      var session = JSON.parse(saved);
      if (session.expires_at && Date.now() > session.expires_at) {
        sessionStorage.removeItem(SESSION_KEY);
        return false;
      }
      accessToken = session.token;
      return true;
    } catch {
      return false;
    }
  }

  // ---- Analytics ----

  function loadAnalytics() {
    var loadingEl = document.getElementById("analyticsLoading");
    var contentEl = document.getElementById("analyticsContent");
    loadingEl.style.display = "block";
    contentEl.style.display = "none";

    var headers = {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      Authorization: "Bearer " + accessToken,
    };

    var thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    var yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    var sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    Promise.all([
      fetch(SUPABASE_URL + "/rest/v1/page_views?select=id&created_at=gte." + thirtyDaysAgo, { headers: headers }).then(function (r) { return r.json(); }),
      fetch(SUPABASE_URL + "/rest/v1/page_views?select=id&created_at=gte." + yesterday, { headers: headers }).then(function (r) { return r.json(); }),
      fetch(SUPABASE_URL + "/rest/v1/page_views?select=id&created_at=gte." + sevenDaysAgo, { headers: headers }).then(function (r) { return r.json(); }),
      fetch(SUPABASE_URL + "/rest/v1/page_views?select=path,created_at&created_at=gte." + thirtyDaysAgo + "&order=created_at.desc&limit=1000", { headers: headers }).then(function (r) { return r.json(); }),
      fetch(SUPABASE_URL + "/rest/v1/page_views?select=referrer&created_at=gte." + thirtyDaysAgo + "&order=created_at.desc&limit=1000", { headers: headers }).then(function (r) { return r.json(); }),
    ])
      .then(function (results) {
        var total30 = results[0].length;
        var total24 = results[1].length;
        var total7 = results[2].length;
        var pageViews = results[3];
        var referrerData = results[4];

        renderAnalyticsSummary(total30, total24, total7);
        renderAnalyticsChart(pageViews);
        renderTopPages(pageViews);
        renderTopReferrers(referrerData);

        loadingEl.style.display = "none";
        contentEl.style.display = "block";
      })
      .catch(function (err) {
        loadingEl.textContent = "Failed to load analytics. Please sign in again.";
        loadingEl.style.color = "var(--red)";
      });
  }

  function renderAnalyticsSummary(total30, total24, total7) {
    var avgPerDay = Math.round(total30 / 30 * 10) / 10;
    document.getElementById("analyticsSummary").innerHTML = [
      ["Last 24 hours", total24],
      ["Last 7 days", total7],
      ["Last 30 days", total30],
      ["Avg / day (30d)", avgPerDay],
    ].map(function (m) {
      return '<article class="analytics-metric"><span>' + html(m[0]) + '</span><strong>' + html(m[1]) + '</strong></article>';
    }).join("");
  }

  function renderAnalyticsChart(pageViews) {
    var buckets = {};
    for (var i = 29; i >= 0; i--) {
      var d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
      var key = d.toISOString().slice(0, 10);
      buckets[key] = 0;
    }
    pageViews.forEach(function (pv) {
      var key = pv.created_at.slice(0, 10);
      if (key in buckets) buckets[key]++;
    });

    var maxVal = Math.max.apply(null, Object.values(buckets));
    if (maxVal === 0) maxVal = 1;
    var keys = Object.keys(buckets);

    var bars = keys.map(function (key) {
      var val = buckets[key];
      var heightPct = (val / maxVal) * 100;
      var label = key.slice(5);
      return '<div class="analytics-bar" title="' + label + ': ' + val + ' views"><div class="analytics-bar-fill" style="height:' + heightPct + '%"></div><span>' + label + '</span></div>';
    }).join("");

    document.getElementById("analyticsChart").innerHTML = bars;
  }

  function renderTopPages(pageViews) {
    var counts = {};
    pageViews.forEach(function (pv) {
      counts[pv.path] = (counts[pv.path] || 0) + 1;
    });
    var sorted = Object.entries(counts).sort(function (a, b) { return b[1] - a[1]; }).slice(0, 10);
    document.querySelector("#topPagesTable tbody").innerHTML = sorted.map(function (row) {
      return '<tr><td>' + html(row[0]) + '</td><td>' + row[1] + '</td></tr>';
    }).join("");
  }

  function renderTopReferrers(referrerData) {
    var counts = {};
    referrerData.forEach(function (r) {
      var ref = r.referrer || "(direct)";
      try { ref = new URL(ref).hostname; } catch (e) {}
      counts[ref] = (counts[ref] || 0) + 1;
    });
    var sorted = Object.entries(counts).sort(function (a, b) { return b[1] - a[1]; }).slice(0, 10);
    document.querySelector("#topReferrersTable tbody").innerHTML = sorted.map(function (row) {
      return '<tr><td>' + html(row[0]) + '</td><td>' + row[1] + '</td></tr>';
    }).join("");
  }

  // ---- Publish / Load Published ----

  function publishToSupabase() {
    var btn = document.getElementById("publishBtn");
    btn.textContent = "Publishing...";
    btn.disabled = true;
    localStorage.setItem(draftKey, JSON.stringify(data));

    var sections = [
      { key: "site", payload: data.site || {} },
      { key: "team", payload: data.team || {} },
      { key: "insights", payload: data.insights || [] },
      { key: "frontend", payload: data.frontend || {} },
    ];

    var promises = sections.map(function (s) {
      return fetch(SUPABASE_URL + "/rest/v1/cms_content?on_conflict=section", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY,
          Authorization: "Bearer " + accessToken,
          Prefer: "resolution=merge-duplicates,return=minimal",
        },
        body: JSON.stringify({ section: s.key, content: s.payload }),
      }).then(function (res) {
        if (!res.ok) throw new Error("Failed to publish " + s.key);
        return res;
      });
    });

    Promise.all(promises)
      .then(function () {
        notify("Published successfully. Site is now live.");
        btn.textContent = "Publish live";
        btn.disabled = false;
      })
      .catch(function (err) {
        notify("Publish failed: " + (err.message || "unknown error"));
        btn.textContent = "Publish live";
        btn.disabled = false;
      });
  }

  function loadPublishedContent() {
    return fetch(SUPABASE_URL + "/rest/v1/cms_content?select=section,content", {
      headers: { apikey: SUPABASE_ANON_KEY },
    })
      .then(function (res) { return res.json(); })
      .then(function (rows) {
        var published = {};
        (rows || []).forEach(function (row) { published[row.section] = row.content; });
        return published;
      });
  }

  function applyPublishedToData(published) {
    if (published.site) data.site = clone(published.site);
    if (published.team) data.team = clone(published.team);
    if (published.insights) data.insights = clone(published.insights);
    if (published.frontend) data.frontend = clone(published.frontend);
    fullRender();
  }

  // ---- Init ----

  document.getElementById("loginForm").addEventListener("submit", handleLogin);
  document.getElementById("signOutBtn").addEventListener("click", handleSignOut);

  document.querySelectorAll("[data-section]").forEach(function (button) {
    button.addEventListener("click", function () { activateSection(button.dataset.section); });
  });

  window.addEventListener("hashchange", function () { activateSection(sectionFromHash(), false); });

  document.getElementById("saveDraft").addEventListener("click", function () {
    localStorage.setItem(draftKey, JSON.stringify(data));
    notify("Local draft saved in this browser. It is not live until you click Publish live.");
  });

  document.getElementById("resetDraft").addEventListener("click", function () {
    localStorage.removeItem(draftKey);
    data = clone(source);
    fullRender();
    notify("Draft reset to current frontend content.");
  });

  document.getElementById("publishBtn").addEventListener("click", publishToSupabase);

  document.getElementById("resetToPublished").addEventListener("click", function () {
    var btn = document.getElementById("resetToPublished");
    btn.textContent = "Loading...";
    btn.disabled = true;
    loadPublishedContent()
      .then(function (published) {
        if (Object.keys(published).length === 0) {
          notify("No published content found yet.");
        } else {
          applyPublishedToData(published);
          notify("Loaded published content.");
        }
      })
      .catch(function () { notify("Failed to load published content."); })
      .finally(function () {
        btn.textContent = "Load published";
        btn.disabled = false;
      });
  });

  document.getElementById("downloadBundle").addEventListener("click", function () {
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "redstone-cms-draft.json";
    link.click();
    URL.revokeObjectURL(link.href);
  });

  document.getElementById("copyBundle").addEventListener("click", function () {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2)).then(function () { notify("JSON copied to clipboard."); });
  });

  document.addEventListener("mousemove", function (event) {
    document.documentElement.style.setProperty("--admin-mouse-x", event.clientX + "px");
    document.documentElement.style.setProperty("--admin-mouse-y", event.clientY + "px");
  });

  if (checkSession()) {
    showAdmin();
    loadPublishedContent()
      .then(function (published) {
        if (Object.keys(published).length > 0) {
          applyPublishedToData(published);
          notify("Loaded latest published content.");
        }
      })
      .catch(function () {});
  } else {
    showLogin();
  }
})();
