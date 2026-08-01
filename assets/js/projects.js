/* ============================================================================
   Projects showcase — a standalone, read-friendly gallery of the real projects
   documented in Phase 9 of the roadmap. Reads the SAME browser storage
   (cisr-projects-v2) the roadmap writes to, so anything you fill in there shows
   up here automatically.
   ========================================================================== */
(() => {
  "use strict";

  /* ------- Phase 9 model (mirrors PHASES[8] in roadmap.js — keep in sync) --- */
  const PROJECT_TYPES = [
    "Azure VMware Solution deployments", "Azure VM migrations",
    "Backup implementations", "Disaster recovery", "Infrastructure automation",
    "Networking", "Complex troubleshooting", "Performance optimization",
    "Cost optimization",
  ];
  const SECTIONS = [
    "Business problem", "Customer environment", "Architecture", "Challenges",
    "Your solution", "Automation used", "Security considerations", "Outcome",
    "Lessons learned",
  ];

  /* ------------------------------------------------------------- utilities */
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const el = (tag, cls, html) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  };
  const esc = (s) => s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* --------------------------------------------------- project detail store */
  const PSTORE = "cisr-projects-v2";
  function ploadAll() {
    try {
      const v2 = JSON.parse(localStorage.getItem(PSTORE));
      if (v2 && typeof v2 === "object" && !Array.isArray(v2)) return v2;
    } catch { /* ignore */ }
    return {};
  }
  let projects = ploadAll();

  const ptid = (type) => `p9-${slug(type)}`;
  const secText = (inst, s) => (inst[slug(s)] || "").trim();
  const instFilled   = (inst) => SECTIONS.filter((s) => secText(inst, s)).length;
  const instComplete = (inst) => SECTIONS.every((s) => secText(inst, s));
  const instTouched  = (inst) => SECTIONS.some((s) => secText(inst, s));

  // Flatten storage into a list of showcase entries (only touched projects).
  function collect() {
    const out = [];
    PROJECT_TYPES.forEach((type) => {
      const arr = projects[ptid(type)] || [];
      arr.forEach((inst, idx) => {
        if (!instTouched(inst)) return;
        out.push({
          type,
          name: (inst._name || "").trim() || `${type} #${idx + 1}`,
          inst,
          filled: instFilled(inst),
          complete: instComplete(inst),
        });
      });
    });
    return out;
  }

  /* ---------------------------------------------------------------- filters */
  let activeType = "all";

  function renderFilters(entries) {
    const bar = $("#pfilters");
    bar.innerHTML = "";
    const types = [...new Set(entries.map((e) => e.type))];
    const mk = (label, value, count) => {
      const b = el("button", "pchip" + (activeType === value ? " is-active" : ""));
      b.type = "button";
      b.innerHTML = `${esc(label)}<span class="pchip__n">${count}</span>`;
      b.addEventListener("click", () => { activeType = value; render(); });
      return b;
    };
    bar.appendChild(mk("All projects", "all", entries.length));
    types.forEach((t) =>
      bar.appendChild(mk(t, t, entries.filter((e) => e.type === t).length)));
  }

  /* ------------------------------------------------------------------ cards */
  function card(entry) {
    const c = el("article", "pcard" + (entry.complete ? " is-complete" : ""));
    const ai = Math.max(0, PROJECT_TYPES.indexOf(entry.type)) % 8;
    c.style.setProperty("--ac", `var(--v${ai + 1})`);

    const head = el("div", "pcard__head");
    head.appendChild(el("span", "pcard__type", esc(entry.type)));
    const badge = el("span", "pcard__badge",
      entry.complete ? "✓ Complete" : `${entry.filled}/${SECTIONS.length} sections`);
    head.appendChild(badge);
    c.appendChild(head);

    c.appendChild(el("h3", "pcard__name", esc(entry.name)));

    const body = el("div", "pcard__sections");
    SECTIONS.forEach((s) => {
      const v = secText(entry.inst, s);
      if (!v) return;
      const sec = el("div", "psec");
      sec.appendChild(el("span", "psec__label", esc(s)));
      sec.appendChild(el("p", "psec__text", esc(v).replace(/\n/g, "<br>")));
      body.appendChild(sec);
    });
    c.appendChild(body);

    const foot = el("div", "pcard__foot");
    const a = el("a", "pcard__edit", "Edit in the roadmap ↗");
    a.href = "index.html#roadmap-section";
    foot.appendChild(a);
    c.appendChild(foot);
    return c;
  }

  /* --------------------------------------------------------------- render */
  function render() {
    const entries = collect();

    // stats
    $("#stat-total").textContent = entries.length;
    $("#stat-complete").textContent = entries.filter((e) => e.complete).length;
    $("#stat-types").textContent = new Set(entries.map((e) => e.type)).size;

    renderFilters(entries);

    const grid = $("#pgrid");
    const empty = $("#pempty");
    grid.innerHTML = "";

    if (!entries.length) {
      grid.hidden = true;
      empty.hidden = false;
      return;
    }
    empty.hidden = true;
    grid.hidden = false;

    const shown = activeType === "all"
      ? entries : entries.filter((e) => e.type === activeType);
    shown.forEach((e) => grid.appendChild(card(e)));
  }

  /* ------------------------------------------------------- export / import */
  function download(filename, text, mime) {
    const url = URL.createObjectURL(new Blob([text], { type: mime }));
    const a = el("a"); a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  }

  function toMarkdown() {
    const lines = ["# Cloud Infrastructure — Project Portfolio", ""];
    let any = false;
    PROJECT_TYPES.forEach((type) => {
      const arr = (projects[ptid(type)] || []).filter(instTouched);
      if (!arr.length) return;
      any = true;
      lines.push(`## ${type}`, "");
      arr.forEach((inst, idx) => {
        lines.push(`### ${inst._name ? inst._name : `${type} #${idx + 1}`}`, "");
        SECTIONS.forEach((s) => {
          const v = secText(inst, s);
          lines.push(`**${s}**`, "", v || "_—_", "");
        });
      });
    });
    if (!any) lines.push("_No project details captured yet._", "");
    return lines.join("\n");
  }

  function wireToolbar() {
    $("#exp-md")?.addEventListener("click", () =>
      download("cloud-infra-projects.md", toMarkdown(), "text/markdown"));
    $("#exp-json")?.addEventListener("click", () =>
      download("cloud-infra-projects.json", JSON.stringify(projects, null, 2),
        "application/json"));

    const file = $("#imp-file");
    $("#imp-json")?.addEventListener("click", () => file?.click());
    file?.addEventListener("change", (e) => {
      const f = e.target.files?.[0]; if (!f) return;
      const r = new FileReader();
      r.onload = () => {
        try {
          const data = JSON.parse(r.result);
          if (!data || typeof data !== "object" || Array.isArray(data))
            throw new Error("bad shape");
          if (!confirm("Import will REPLACE the project data saved in this browser. Continue?"))
            return;
          localStorage.setItem(PSTORE, JSON.stringify(data));
          projects = ploadAll();
          render();
          alert("Projects imported.");
        } catch { alert("That file could not be read as a valid projects backup."); }
        finally { file.value = ""; }
      };
      r.readAsText(f);
    });
  }

  /* ------------------------------------------------------------- theme/nav */
  function wireTheme() {
    const root = document.documentElement;
    const KEY = "cisr-theme";
    const saved = localStorage.getItem(KEY);
    root.setAttribute("data-theme",
      saved || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"));
    $("#theme-toggle")?.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem(KEY, next);
    });
  }
  function wireNav() {
    const toggle = $("#nav-toggle"), menu = $("#nav-menu");
    toggle?.addEventListener("click", () => {
      const open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open);
    });
    $$("#nav-menu a").forEach((a) =>
      a.addEventListener("click", () => menu.classList.remove("is-open")));
  }

  function wireReveal() {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    $$(".reveal").forEach((n) => io.observe(n));
  }

  /* ------------------------------------------------------------------ init */
  document.addEventListener("DOMContentLoaded", () => {
    wireTheme();
    wireNav();
    wireToolbar();
    wireReveal();
    render();
    const y = $("#year"); if (y) y.textContent = new Date().getFullYear();
    // reflect live edits made in another tab
    window.addEventListener("storage", (e) => {
      if (e.key === PSTORE) { projects = ploadAll(); render(); }
    });
  });
})();
