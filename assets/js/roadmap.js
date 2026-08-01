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
      n: 9, kind: "portfolio", icon: "trophy",
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
      n: 10, kind: "knowledge", icon: "book",
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

  /* ---------------------------------------------------------- progress store */
  const STORE = "cisr-progress-v1";
  const load = () => { try { return new Set(JSON.parse(localStorage.getItem(STORE)) || []); }
                       catch { return new Set(); } };
  const done = load();
  const save = () => localStorage.setItem(STORE, JSON.stringify([...done]));

  // registry of every trackable item id -> phase number (for counting)
  const registry = [];
  const reg = (id, phase) => { registry.push({ id, phase }); return id; };

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

  function portfolioBody(p) {
    const box = el("div", "portfolio");
    const pt = el("div", "portfolio__types");
    pt.appendChild(el("h4", null, "Project types"));
    const chips = el("div", "chips");
    p.projectTypes.forEach((t) => chips.appendChild(chip(t, reg(`p${p.n}-${slug(t)}`, p.n))));
    pt.appendChild(chips);
    box.appendChild(pt);

    const tpl = el("div", "portfolio__tpl");
    tpl.appendChild(el("h4", null, "Every project documents"));
    const flow = el("div", "flow");
    p.sections.forEach((s, i) => {
      flow.appendChild(el("span", "flow__step", `<i>${i + 1}</i>${s}`));
    });
    tpl.appendChild(flow);
    box.appendChild(tpl);
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
      if (!confirm("Clear all tracked progress on this device?")) return;
      done.clear(); save();
      $$('input[type="checkbox"]').forEach((c) => (c.checked = false));
      $$(".chip.is-done, .cert.is-done").forEach((c) => c.classList.remove("is-done"));
      updateProgress();
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
