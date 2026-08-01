/* ============================================================================
   Cloud Infrastructure Skill-Up Roadmap — data model + interactivity
   Peter Nwogoh · Infrastructure Engineer → Solutions Architect → Consultant
   → Founder → CEO
   ========================================================================== */
(() => {
  "use strict";

  /* ---------------------------------------------------------------- icons */
  const ICON = {
    vision:  '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
    server:  '<rect x="3" y="4" width="18" height="6" rx="2"/><rect x="3" y="14" width="18" height="6" rx="2"/><path d="M7 7h.01M7 17h.01"/>',
    code:    '<path d="m8 6-6 6 6 6"/><path d="m16 6 6 6-6 6"/>',
    blueprint:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>',
    ship:    '<path d="M2 12h20l-2 7H4l-2-7Z"/><path d="M6 12V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6"/><path d="M12 4v8"/>',
    infinity:'<path d="M12 12c-2-3-4-4-6-4a4 4 0 0 0 0 8c2 0 4-1 6-4 2 3 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1-6 4Z"/>',
    shield:  '<path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3Z"/><path d="m9 12 2 2 4-4"/>',
    pulse:   '<path d="M3 12h4l2 6 4-14 2 8h6"/>',
    trophy:  '<path d="M8 21h8M12 17v4M7 4h10v4a5 5 0 0 1-10 0V4Z"/><path d="M17 5h3v2a4 4 0 0 1-4 4M7 5H4v2a4 4 0 0 1 4 4"/>',
    book:    '<path d="M4 4h11a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4Z"/><path d="M4 4v14"/>',
    cert:    '<circle cx="12" cy="9" r="6"/><path d="m9 14-2 7 5-3 5 3-2-7"/>',
    rocket:  '<path d="M5 15c-1 2-1 5-1 5s3 0 5-1M9 12a5 5 0 0 1 7-7c3 0 4 1 4 4a5 5 0 0 1-7 7Z"/><circle cx="14.5" cy="9.5" r="1.3"/>',
    ai:      '<path d="M12 3l1.7 4.6L18 9l-4.3 1.4L12 15l-1.7-4.6L6 9l4.3-1.4L12 3Z"/><path d="M18.5 14l.9 2.3 2.3.9-2.3.9-.9 2.3-.9-2.3-2.3-.9 2.3-.9.9-2.3Z"/>',
  };
  const svg = (k) =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[k] || ICON.server}</svg>`;

  /* --------------------------------------------------------------- journey */
  const JOURNEY = [
    { label: "Infrastructure Engineer", note: "Build the foundation", c: "#8b5cf6" },
    { label: "Solutions Architect",     note: "Design the systems",   c: "#0ea5e9" },
    { label: "Consultant",              note: "Deliver outcomes",      c: "#10b981" },
    { label: "Founder",                 note: "Build the company",     c: "#f59e0b" },
    { label: "CEO",                     note: "Scale the vision",      c: "#ec4899" },
  ];

  /* ---------------------------------------------------------------- phases */
  const PHASES = [
    {
      n: 1, kind: "vision", icon: "vision",
      title: "Define the Vision",
      goal: "Set the mission, the focus, and who you serve.",
      c1: "#8b5cf6", c2: "#6366f1",
      mission: "We help startups build secure, automated, scalable cloud infrastructure so they can focus on building their products.",
      focus: ["Cloud Infrastructure", "Cloud Migration", "Infrastructure as Code (IaC)",
              "Automation", "Cloud Security", "Managed Cloud Services"],
      targets: ["Startups", "Growing SaaS companies", "SMBs", "Companies moving to Azure or AWS"],
    },
    {
      n: 2, kind: "skills", icon: "server",
      title: "Become an Elite Infrastructure Engineer",
      goal: "Become exceptional at cloud infrastructure.",
      c1: "#3b82f6", c2: "#0ea5e9",
      groups: [
        { name: "Azure", skills: ["VNets", "NSGs", "Azure Firewall", "Azure Load Balancer",
          "Virtual Machines", "Storage Accounts", "Azure Backup", "Azure Site Recovery",
          "Azure Monitor", "Azure VMware Solution (AVS)", "Azure Virtual Desktop", "Azure DNS"] },
        { name: "AWS", skills: ["EC2", "VPC", "IAM", "Route 53", "ELB", "Auto Scaling",
          "EBS", "S3", "CloudWatch", "RDS"] },
        { name: "Networking", skills: ["TCP/IP", "Routing", "BGP", "VPN", "ExpressRoute",
          "Direct Connect", "DNS", "Load balancing", "Firewalls"] },
      ],
    },
    {
      n: 3, kind: "skills", icon: "code",
      title: "Master Infrastructure as Code",
      goal: "Automate everything.",
      c1: "#06b6d4", c2: "#14b8a6",
      groups: [
        { name: "Terraform", skills: ["Modules", "Variables", "Remote State", "Workspaces",
          "Providers", "Enterprise structure", "CI/CD integration"] },
        { name: "Ansible", skills: ["Playbooks", "Roles", "Inventories", "Jinja2", "AWX",
          "Automation workflows"] },
        { name: "Azure Bicep", skills: ["Templates", "Modules", "Deployments"] },
        { name: "Git", skills: ["Branching", "Pull Requests", "Git Flow"] },
      ],
    },
    {
      n: 4, kind: "skills", icon: "blueprint",
      title: "Become a Cloud Solutions Architect",
      goal: "Design enterprise-grade solutions — build complete environments from scratch.",
      c1: "#10b981", c2: "#22c55e",
      groups: [{ name: "Architecture", skills: ["High Availability", "Disaster Recovery",
        "Cost Optimization", "Multi-region architecture", "Hybrid Cloud",
        "VMware-to-Cloud migrations", "Scalability", "Capacity Planning",
        "Cloud Landing Zones", "Enterprise networking"] }],
    },
    {
      n: 5, kind: "skills", icon: "ship",
      title: "Master Containers & Kubernetes",
      goal: "Understand modern application infrastructure.",
      c1: "#84cc16", c2: "#10b981",
      groups: [
        { name: "Docker", skills: ["Images", "Containers", "Docker Compose", "Dockerfiles"] },
        { name: "Kubernetes", skills: ["Pods", "Deployments", "Services", "Ingress",
          "Persistent Volumes"] },
        { name: "Tooling", skills: ["Helm", "RBAC"] },
        { name: "Managed platforms", skills: ["AKS", "EKS"] },
      ],
    },
    {
      n: 6, kind: "skills", icon: "infinity",
      title: "Master DevOps",
      goal: "Automate deployments.",
      c1: "#f59e0b", c2: "#f97316",
      groups: [{ name: "DevOps", skills: ["GitHub Actions", "Azure DevOps", "Jenkins",
        "CI/CD pipelines", "YAML", "Artifact management", "Release strategies",
        "Version control", "Automated testing"] }],
    },
    {
      n: 7, kind: "skills", icon: "shield",
      title: "Become a Cloud Security Specialist",
      goal: "Make security part of every solution.",
      c1: "#f43f5e", c2: "#ef4444",
      groups: [{ name: "Security", skills: ["Microsoft Defender for Cloud", "Microsoft Sentinel",
        "Microsoft Entra ID", "Conditional Access", "Privileged Identity Management (PIM)",
        "Identity governance", "Zero Trust", "MFA", "Key Vault", "Secrets management",
        "RBAC", "NIST", "CIS Benchmarks", "Microsoft Secure Score"] }],
    },
    {
      n: 8, kind: "skills", icon: "pulse",
      title: "Observability & Operations",
      goal: "Operate environments at enterprise scale — show outcomes, not just technologies.",
      c1: "#ec4899", c2: "#d946ef",
      groups: [{ name: "Ops", skills: ["Azure Monitor", "Log Analytics", "Prometheus", "Grafana",
        "Splunk (optional)", "Elastic Stack", "Alerting", "Dashboards", "Capacity monitoring",
        "Incident management", "Root Cause Analysis (RCA)", "Service Level Objectives (SLOs)"] }],
    },
    {
      n: 9, kind: "skills", icon: "ai",
      title: "Weave AI Into Everything",
      goal: "Use AI to design faster, automate deeper and deliver smarter — for yourself and for clients.",
      c1: "#22d3ee", c2: "#6366f1",
      groups: [
        { name: "Azure AI", skills: ["Azure OpenAI Service", "Azure AI Foundry", "Azure AI Search",
          "Azure AI Services (Cognitive)", "Microsoft Copilot Studio", "Copilot for Azure",
          "AI-102 skills"] },
        { name: "AWS & Google AI", skills: ["Amazon Bedrock", "Amazon SageMaker", "Amazon Q",
          "Google Vertex AI", "Google Gemini"] },
        { name: "Generative AI engineering", skills: ["Prompt engineering", "Retrieval-Augmented Generation (RAG)",
          "Embeddings & vector databases", "LLM APIs", "AI agents & orchestration", "Model fine-tuning"] },
        { name: "AI for operations (AIOps)", skills: ["GitHub Copilot", "AI-assisted troubleshooting",
          "Log & anomaly detection", "Infrastructure automation with AI", "Runbook & script generation"] },
        { name: "MLOps & responsible AI", skills: ["Model deployment & monitoring", "Responsible AI",
          "AI security & prompt-injection defense", "Data privacy & governance", "AI cost management"] },
      ],
    },
    {
      n: 10, kind: "portfolio", icon: "trophy",
      title: "Build an Outstanding Portfolio",
      goal: "Turn real work into proof — document projects that show outcomes.",
      c1: "#a855f7", c2: "#7c3aed",
      projectTypes: ["Azure VMware Solution deployments", "Azure VM migrations",
        "Backup implementations", "Disaster recovery", "Infrastructure automation",
        "Networking", "Complex troubleshooting", "Performance optimization", "Cost optimization"],
      sections: ["Business problem", "Customer environment", "Architecture", "Challenges",
        "Your solution", "Automation used", "Security considerations", "Outcome",
        "Lessons learned"],
    },
    {
      n: 11, kind: "knowledge", icon: "book",
      title: "Build Your Knowledge Base",
      goal: "Capture everything you learn — it becomes the company's intellectual property.",
      c1: "#f472b6", c2: "#fb7185",
      items: ["Customer issues", "Root causes", "Troubleshooting steps", "Migration checklists",
        "PowerShell scripts", "Terraform modules", "Ansible playbooks", "Architecture diagrams",
        "Best practices", "Lessons learned"],
    },
  ];

  /* ----------------------------------------------------------------- certs */
  const CERTS = {
    current: [
      { name: "VMware VCP", org: "VMware" },
      { name: "Azure Administrator Associate", org: "AZ-104" },
      { name: "Azure Network Engineer Associate", org: "AZ-700" },
      { name: "Azure AI Engineer Associate", org: "AI-102" },
    ],
    next: [
      { name: "Security, Compliance & Identity Fundamentals", org: "SC-900" },
      { name: "Azure Security Engineer Associate", org: "AZ-500" },
      { name: "Security Operations Analyst", org: "SC-200" },
      { name: "Identity & Access Administrator", org: "SC-300" },
      { name: "Network+ / Security+", org: "CompTIA" },
      { name: "Azure Solutions Architect Expert", org: "AZ-305" },
      { name: "Terraform Associate", org: "HashiCorp" },
      { name: "Ansible Automation", org: "Red Hat" },
      { name: "AWS Solutions Architect Associate", org: "AWS" },
      { name: "Certified Kubernetes Administrator", org: "CKA" },
      { name: "GitHub Actions / Azure DevOps", org: "DevOps" },
      { name: "AWS Security Specialty", org: "AWS · optional" },
      { name: "CISSP", org: "later in career" },
    ],
  };

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

  /* ------------------- one-time migration: AI track = Phase 9 ---------------
     The AI track was inserted as Phase 9 (2026-08), pushing Portfolio 9->10 and
     Knowledge 10->11. Shift previously-saved localStorage keys so existing
     progress and documented projects are preserved. Idempotent (flag-guarded). */
  (function migrateAiPhase9() {
    const FLAG = "cisr-migrated-ai-phase9";
    try {
      if (localStorage.getItem(FLAG)) return;
      const remap = (id) =>
        id.startsWith("p10-") ? "p11-" + id.slice(4)
        : id.startsWith("p9-") ? "p10-" + id.slice(3)
        : id;
      // checkbox progress ids
      let prog; try { prog = JSON.parse(localStorage.getItem("cisr-progress-v1")); } catch { prog = null; }
      if (Array.isArray(prog)) localStorage.setItem("cisr-progress-v1", JSON.stringify(prog.map(remap)));
      // documented projects keyed by portfolio ptid (p9-* -> p10-*)
      let proj; try { proj = JSON.parse(localStorage.getItem("cisr-projects-v2")); } catch { proj = null; }
      if (proj && typeof proj === "object" && !Array.isArray(proj)) {
        const out = {};
        for (const k in proj) out[k.startsWith("p9-") ? "p10-" + k.slice(3) : k] = proj[k];
        localStorage.setItem("cisr-projects-v2", JSON.stringify(out));
      }
      localStorage.setItem(FLAG, "1");
    } catch { /* migration is best-effort; never block the app */ }
  })();

  /* ---------------------------------------------------------- progress store */
  const STORE = "cisr-progress-v1";
  const load = () => { try { return new Set(JSON.parse(localStorage.getItem(STORE)) || []); }
                       catch { return new Set(); } };
  const done = load();
  const save = () => localStorage.setItem(STORE, JSON.stringify([...done]));

  // registry of every trackable item id -> phase number (for counting)
  const registry = [];
  const reg = (id, phase) => {
    if (!registry.some((r) => r.id === id)) registry.push({ id, phase });
    return id;
  };

  /* --------------------------------------------------- project detail store */
  // Each project TYPE holds an ARRAY of project instances the user documents.
  // Shape: { [ptid]: [ { _name?: str, <sectionSlug>: text, ... }, ... ] }
  const PSTORE = "cisr-projects-v2";
  function ploadAll() {
    try {
      const v2 = JSON.parse(localStorage.getItem(PSTORE));
      if (v2 && typeof v2 === "object" && !Array.isArray(v2)) return v2;
    } catch { /* ignore */ }
    // migrate the older single-form shape { ptid: {section:text} } -> arrays
    try {
      const v1 = JSON.parse(localStorage.getItem("cisr-projects-v1"));
      if (v1 && typeof v1 === "object") {
        const out = {};
        for (const k in v1) { const o = v1[k]; if (o && Object.keys(o).length) out[k] = [o]; }
        return out;
      }
    } catch { /* ignore */ }
    return {};
  }
  let projects = ploadAll();
  const psave = () => localStorage.setItem(PSTORE, JSON.stringify(projects));

  // helpful placeholder prompts for each document section
  const SECTION_HINT = {
    "Business problem":        "What did the customer need solved?",
    "Customer environment":    "Size, stack, constraints, starting point…",
    "Architecture":            "The design you built — services, topology…",
    "Challenges":              "What made this hard?",
    "Your solution":           "What you implemented, and why…",
    "Automation used":         "Terraform / Ansible / Bicep / scripts…",
    "Security considerations": "Identity, network, secrets, compliance…",
    "Outcome":                 "Measurable results — cost, uptime, time saved…",
    "Lessons learned":         "What you'd do differently next time…",
  };

  /* ------------------------------------------------------------ build a chip */
  function chip(label, id) {
    const isDone = done.has(id);
    const c = el("label", "chip" + (isDone ? " is-done" : ""));
    c.setAttribute("for", id);
    c.innerHTML =
      `<input type="checkbox" id="${id}" ${isDone ? "checked" : ""}>` +
      `<span class="chip__tick" aria-hidden="true"></span>` +
      `<span class="chip__txt">${label}</span>`;
    c.querySelector("input").addEventListener("change", (e) => {
      e.target.checked ? done.add(id) : done.delete(id);
      c.classList.toggle("is-done", e.target.checked);
      save();
      updateProgress();
    });
    return c;
  }

  /* --------------------------------------------------------- render journey */
  function renderJourney() {
    const wrap = $("#journey-track");
    JOURNEY.forEach((s, i) => {
      const step = el("div", "jstep");
      step.style.setProperty("--jc", s.c);
      step.innerHTML =
        `<div class="jstep__dot"><span>${i + 1}</span></div>` +
        `<div class="jstep__body"><div class="jstep__label">${s.label}</div>` +
        `<div class="jstep__note">${s.note}</div></div>`;
      wrap.appendChild(step);
      if (i < JOURNEY.length - 1) wrap.appendChild(el("div", "jstep__link", svg("code")));
    });
  }

  /* ---------------------------------------------------------- render phases */
  function skillGroups(p) {
    const box = el("div", "phase__groups");
    p.groups.forEach((g) => {
      const grp = el("div", "group");
      grp.appendChild(el("div", "group__name", `${g.name} <span>${g.skills.length}</span>`));
      const chips = el("div", "chips");
      g.skills.forEach((sk) => chips.appendChild(chip(sk, reg(`p${p.n}-${slug(sk)}`, p.n))));
      grp.appendChild(chips);
      box.appendChild(grp);
    });
    return box;
  }

  function visionBody(p) {
    const box = el("div", "vision");
    box.innerHTML =
      `<blockquote class="vision__mission">${p.mission}</blockquote>`;
    const cols = el("div", "vision__cols");
    const mk = (title, arr, cls) => {
      const c = el("div", "vision__col " + cls);
      c.appendChild(el("h4", null, title));
      const ul = el("ul");
      arr.forEach((x) => ul.appendChild(el("li", null, x)));
      c.appendChild(ul);
      return c;
    };
    cols.appendChild(mk("Focus areas", p.focus, "is-focus"));
    cols.appendChild(mk("Who we serve", p.targets, "is-targets"));
    box.appendChild(cols);
    return box;
  }

  /* ----------------------------------------------- project (Phase 9) helpers */
  const secText = (inst, s) => (inst[slug(s)] || "").trim();
  const instFilled   = (inst, sections) => sections.filter((s) => secText(inst, s)).length;
  const instComplete = (inst, sections) => sections.every((s) => secText(inst, s));
  const instTouched  = (inst, sections) => sections.some((s) => secText(inst, s));
  function typeStats(ptid, sections) {
    const arr = projects[ptid] || [];
    return { count: arr.length, complete: arr.filter((i) => instComplete(i, sections)).length };
  }

  function download(filename, text, mime) {
    const url = URL.createObjectURL(new Blob([text], { type: mime }));
    const a = el("a"); a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  }

  // one expandable project-type panel: header + a list of documented projects
  function projectCard(p, type) {
    const ptid = reg(`p${p.n}-${slug(type)}`, p.n);
    const sections = p.sections;
    const article = /^[aeiou]/i.test(type) ? "an" : "a";

    const card = el("div", "proj");
    card.dataset.pid = ptid;

    const head = el("button", "proj__head");
    head.type = "button";
    head.setAttribute("aria-expanded", "false");
    head.innerHTML =
      `<span class="proj__tick" aria-hidden="true">✓</span>` +
      `<span class="proj__name">${type}</span>` +
      `<span class="proj__meta" data-pmeta></span>` +
      `<svg class="proj__chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" ` +
      `stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">` +
      `<path d="m6 9 6 6 6-6"/></svg>`;

    const body     = el("div", "proj__body");
    const instWrap = el("div", "proj__instances");
    const addBtn   = el("button", "proj__add", `<span>+</span> Add ${article} ${type.toLowerCase()}`);
    addBtn.type = "button";

    function updateType() {
      const { count, complete } = typeStats(ptid, sections);
      head.querySelector("[data-pmeta]").textContent =
        count ? `${count} project${count > 1 ? "s" : ""} · ${complete} complete` : "not started";
      const anyComplete = complete >= 1;
      card.classList.toggle("is-complete", anyComplete);
      if (anyComplete) done.add(ptid); else done.delete(ptid);
      save();
      updateProgress();
    }

    function buildInstance(inst, idx) {
      const wrap = el("div", "pinst");
      if (instComplete(inst, sections)) wrap.classList.add("is-complete");

      const ih = el("div", "pinst__head");
      const badge = el("span", "pinst__badge", `${idx + 1}`);
      const title = el("input", "pinst__title");
      title.type = "text";
      title.placeholder = `${type} #${idx + 1} — project name (optional)`;
      title.value = inst._name || "";
      title.addEventListener("input", () => {
        if (title.value.trim()) inst._name = title.value; else delete inst._name;
        psave();
      });
      const del = el("button", "pinst__del", "✕ Remove");
      del.type = "button";
      del.addEventListener("click", () => {
        const label = inst._name ? `"${inst._name}"` : `${type} #${idx + 1}`;
        if (!confirm(`Remove ${label}? This can't be undone.`)) return;
        projects[ptid].splice(idx, 1);
        if (!projects[ptid].length) delete projects[ptid];
        psave(); renderInstances(); updateType();
      });
      ih.appendChild(badge); ih.appendChild(title); ih.appendChild(del);
      wrap.appendChild(ih);

      const fields = el("div", "pinst__fields");
      sections.forEach((s, i) => {
        const sid = `${ptid}__${idx}--${slug(s)}`;
        const field = el("div", "proj__field");
        field.innerHTML = `<label for="${sid}"><i>${i + 1}</i>${s}</label>`;
        const ta = el("textarea");
        ta.id = sid; ta.rows = 2;
        ta.placeholder = SECTION_HINT[s] || `Describe: ${s}`;
        ta.value = inst[slug(s)] || "";
        ta.addEventListener("input", () => {
          if (ta.value.trim()) inst[slug(s)] = ta.value; else delete inst[slug(s)];
          psave();
          wrap.classList.toggle("is-complete", instComplete(inst, sections));
          updateType();
        });
        field.appendChild(ta);
        fields.appendChild(field);
      });
      wrap.appendChild(fields);
      return wrap;
    }

    function renderInstances() {
      instWrap.innerHTML = "";
      const arr = projects[ptid] || [];
      if (!arr.length) {
        instWrap.appendChild(el("p", "proj__empty",
          `No projects yet — click "Add ${article} ${type.toLowerCase()}" to document one.`));
      }
      arr.forEach((inst, idx) => instWrap.appendChild(buildInstance(inst, idx)));
    }

    addBtn.addEventListener("click", () => {
      (projects[ptid] || (projects[ptid] = [])).push({});
      psave(); renderInstances(); updateType();
      if (!card.classList.contains("is-open")) {
        card.classList.add("is-open"); head.setAttribute("aria-expanded", "true");
      }
      const last = instWrap.querySelector(".pinst:last-child .pinst__title");
      if (last) last.focus();
    });

    head.addEventListener("click", () => {
      const open = card.classList.toggle("is-open");
      head.setAttribute("aria-expanded", String(open));
    });

    body.appendChild(instWrap);
    body.appendChild(addBtn);
    card.appendChild(head);
    card.appendChild(body);

    renderInstances();
    updateType();
    return card;
  }

  function projectsToMarkdown(p) {
    const lines = ["# Cloud Infrastructure — Project Portfolio", ""];
    let any = false;
    p.projectTypes.forEach((type) => {
      const ptid = `p${p.n}-${slug(type)}`;
      const arr = (projects[ptid] || []).filter((i) => instTouched(i, p.sections));
      if (!arr.length) return;
      any = true;
      lines.push(`## ${type}`, "");
      arr.forEach((inst, idx) => {
        lines.push(`### ${inst._name ? inst._name : `${type} #${idx + 1}`}`, "");
        p.sections.forEach((s) => {
          const v = secText(inst, s);
          lines.push(`**${s}**`, "", v || "_—_", "");
        });
      });
    });
    if (!any) lines.push("_No project details captured yet._", "");
    return lines.join("\n");
  }

  function portfolioBody(p) {
    const box = el("div", "portfolio");
    const pt  = el("div", "portfolio__types");
    pt.appendChild(el("h4", null, "Project types"));
    pt.appendChild(el("p", "portfolio__hint",
      "Expand a project type, then use “Add” to document one or more real projects of that " +
      "kind. Every field saves to this browser as you type — no account needed. A type turns " +
      "green once at least one project has all nine sections filled. Use Export to back up or " +
      "move your data to another device."));

    // export / import toolbar
    const bar = el("div", "portfolio__bar");
    const md = el("button", "pbtn", "⬇ Export Markdown"); md.type = "button";
    md.addEventListener("click", () =>
      download("cloud-projects.md", projectsToMarkdown(p), "text/markdown"));
    const js = el("button", "pbtn", "⬇ Backup (JSON)"); js.type = "button";
    js.addEventListener("click", () =>
      download("cloud-projects-backup.json", JSON.stringify(projects, null, 2), "application/json"));
    const imp = el("label", "pbtn pbtn--ghost", "⬆ Restore backup");
    const file = el("input"); file.type = "file"; file.accept = "application/json,.json";
    file.style.display = "none";
    file.addEventListener("change", () => {
      const f = file.files && file.files[0]; if (!f) return;
      const r = new FileReader();
      r.onload = () => {
        try {
          const data = JSON.parse(String(r.result));
          if (!data || typeof data !== "object" || Array.isArray(data)) throw new Error("bad");
          localStorage.setItem(PSTORE, JSON.stringify(data));
          alert("Backup restored. Reloading to apply…");
          location.reload();
        } catch { alert("That file isn't a valid projects backup (.json)."); }
      };
      r.readAsText(f);
    });
    imp.appendChild(file);
    bar.appendChild(md); bar.appendChild(js); bar.appendChild(imp);
    pt.appendChild(bar);

    const list = el("div", "projects");
    p.projectTypes.forEach((t) => list.appendChild(projectCard(p, t)));
    pt.appendChild(list);
    box.appendChild(pt);
    return box;
  }

  function knowledgeBody(p) {
    const box = el("div", "knowledge");
    const chips = el("div", "chips");
    p.items.forEach((t) => chips.appendChild(chip(t, reg(`p${p.n}-${slug(t)}`, p.n))));
    box.appendChild(chips);
    return box;
  }

  function renderPhases() {
    const rail = $("#roadmap");
    PHASES.forEach((p) => {
      const item = el("article", `phase phase--${p.n % 2 ? "left" : "right"}`);
      item.id = `phase-${p.n}`;
      item.style.setProperty("--c1", p.c1);
      item.style.setProperty("--c2", p.c2);

      const node = el("div", "phase__node", svg(p.icon));
      const card = el("div", "phase__card");

      card.appendChild(el("div", "phase__eyebrow",
        `<span class="phase__num">Phase ${p.n}</span>` +
        `<span class="phase__tag">${p.kind === "vision" ? "Foundation" :
           p.kind === "portfolio" ? "Proof" : p.kind === "knowledge" ? "IP" : "Skills"}</span>`));
      card.appendChild(el("h3", "phase__title", p.title));
      card.appendChild(el("p", "phase__goal", p.goal));

      if (p.kind === "skills")         card.appendChild(skillGroups(p));
      else if (p.kind === "vision")    card.appendChild(visionBody(p));
      else if (p.kind === "portfolio") card.appendChild(portfolioBody(p));
      else if (p.kind === "knowledge") card.appendChild(knowledgeBody(p));

      // per-phase progress footer (only when trackable)
      const count = registry.filter((r) => r.phase === p.n).length;
      if (count) {
        const foot = el("div", "phase__foot");
        foot.innerHTML =
          `<div class="phase__bar"><span data-phasebar="${p.n}"></span></div>` +
          `<div class="phase__pct" data-phasepct="${p.n}">0%</div>`;
        card.appendChild(foot);
      }

      item.appendChild(node);
      item.appendChild(card);
      rail.appendChild(item);
    });
  }

  /* ----------------------------------------------------------- render certs */
  function renderCerts() {
    const cur = $("#certs-current");
    CERTS.current.forEach((c) => {
      const b = el("div", "cert cert--earned");
      b.innerHTML = `<div class="cert__ico">${svg("cert")}</div>` +
        `<div class="cert__body"><div class="cert__name">${c.name}</div>` +
        `<div class="cert__org">${c.org}</div></div>` +
        `<div class="cert__badge">Earned</div>`;
      cur.appendChild(b);
    });

    const nxt = $("#certs-next");
    CERTS.next.forEach((c, i) => {
      const id = reg(`cert-${slug(c.org + "-" + c.name)}`, "cert");
      const isDone = done.has(id);
      const b = el("label", "cert cert--next" + (isDone ? " is-done" : ""));
      b.setAttribute("for", id);
      b.innerHTML =
        `<input type="checkbox" id="${id}" ${isDone ? "checked" : ""}>` +
        `<div class="cert__ico">${svg("rocket")}</div>` +
        `<div class="cert__body"><div class="cert__name">${c.name}</div>` +
        `<div class="cert__org">${c.org}</div></div>` +
        `<div class="cert__check" aria-hidden="true"></div>`;
      b.querySelector("input").addEventListener("change", (e) => {
        e.target.checked ? done.add(id) : done.delete(id);
        b.classList.toggle("is-done", e.target.checked);
        save();
        updateProgress();
      });
      nxt.appendChild(b);
    });
  }

  /* -------------------------------------------------------- progress engine */
  function updateProgress() {
    const skillItems = registry.filter((r) => r.phase !== "cert");
    const totalSkills = skillItems.length;
    const doneSkills = skillItems.filter((r) => done.has(r.id)).length;
    const pct = totalSkills ? Math.round((doneSkills / totalSkills) * 100) : 0;

    // overall ring
    const ring = $("#ring-fg");
    if (ring) {
      const len = 2 * Math.PI * 52;
      ring.style.strokeDasharray = `${len}`;
      ring.style.strokeDashoffset = `${len * (1 - pct / 100)}`;
    }
    const pctEl = $("#overall-pct"); if (pctEl) pctEl.textContent = `${pct}%`;
    const cnt = $("#overall-count");
    if (cnt) cnt.textContent = `${doneSkills} / ${totalSkills} skills`;

    // per phase
    PHASES.forEach((p) => {
      const items = registry.filter((r) => r.phase === p.n);
      if (!items.length) return;
      const d = items.filter((r) => done.has(r.id)).length;
      const pp = Math.round((d / items.length) * 100);
      const bar = document.querySelector(`[data-phasebar="${p.n}"]`);
      const txt = document.querySelector(`[data-phasepct="${p.n}"]`);
      if (bar) bar.style.width = `${pp}%`;
      if (txt) txt.textContent = `${pp}%  ·  ${d}/${items.length}`;
    });

    // certs meter
    const certItems = registry.filter((r) => r.phase === "cert");
    const cd = certItems.filter((r) => done.has(r.id)).length;
    const cp = certItems.length ? Math.round((cd / certItems.length) * 100) : 0;
    const cbar = $("#cert-bar"); const cpct = $("#cert-pct");
    if (cbar) cbar.style.width = `${cp}%`;
    if (cpct) cpct.textContent = `${cd} / ${certItems.length} planned`;
  }

  /* --------------------------------------------------------------- reset */
  function wireReset() {
    const btn = $("#reset-progress");
    if (!btn) return;
    btn.addEventListener("click", () => {
      if (!confirm("Clear all tracked progress AND project details on this device?")) return;
      localStorage.removeItem(STORE);
      localStorage.removeItem(PSTORE);
      location.reload();
    });
  }

  /* ---------------------------------------------------------- theme toggle */
  function wireTheme() {
    const root = document.documentElement;
    const KEY = "cisr-theme";
    const saved = localStorage.getItem(KEY);
    if (saved) root.setAttribute("data-theme", saved);
    else root.setAttribute("data-theme",
      matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    $("#theme-toggle")?.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem(KEY, next);
    });
  }

  /* --------------------------------------------------------- mobile nav */
  function wireNav() {
    const toggle = $("#nav-toggle");
    const menu = $("#nav-menu");
    toggle?.addEventListener("click", () => {
      const open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open);
    });
    $$("#nav-menu a").forEach((a) =>
      a.addEventListener("click", () => menu.classList.remove("is-open")));

    // scroll spy
    const links = $$("#nav-menu a[data-spy]");
    const map = new Map(links.map((l) => [l.getAttribute("href").slice(1), l]));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          links.forEach((l) => l.classList.remove("is-active"));
          map.get(e.target.id)?.classList.add("is-active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ["journey", "roadmap-section", "certs"].forEach((id) => {
      const s = document.getElementById(id); if (s) io.observe(s);
    });
  }

  /* --------------------------------------------------------- scroll reveal */
  function wireReveal() {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    $$(".phase, .reveal").forEach((n) => io.observe(n));
  }

  /* ----------------------------------------------------------------- year */
  function stamp() {
    const y = $("#year"); if (y) y.textContent = new Date().getFullYear();
    const t = $("#total-skills");
    if (t) t.textContent = registry.filter((r) => r.phase !== "cert").length;
  }

  /* ------------------------------------------------------------------ init */
  document.addEventListener("DOMContentLoaded", () => {
    wireTheme();
    renderJourney();
    renderPhases();
    renderCerts();
    stamp();
    updateProgress();
    wireReset();
    wireNav();
    wireReveal();
  });
})();
