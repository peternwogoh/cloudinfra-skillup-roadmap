/* ============================================================================
   Notes & Blog — a repo-backed, static blog for GitHub Pages.

   Posts live in the repository as Markdown files under  notes/<file>.md , and
   an index of them lives in  notes/posts.json . Every visitor fetches those
   files, so the blog is public, versioned and permanent — no backend, no
   database, no tokens.

   Publishing a post = committing a Markdown file + one line in posts.json.
   The COMPOSER below is only a writing aid; it renders in your browser and
   cannot touch the repo. It is shown only to the author (localhost, or the
   ?compose flag) and generates the exact file + index for you to commit on
   github.com. Public visitors never see it.
   ========================================================================== */
(() => {
  "use strict";

  /* ------------------------------------------------------------- utilities */
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const el = (tag, cls, html) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  };
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const slugify = (s) => s.toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const fmtDate = (d) => {
    const dt = new Date(d + "T00:00:00");
    return isNaN(dt) ? d : dt.toLocaleDateString(undefined,
      { year: "numeric", month: "short", day: "numeric" });
  };
  const parseTags = (s) => s.split(",").map((t) => t.trim()).filter(Boolean);

  /* --------------------------------------------- tiny, safe markdown render */
  // Escapes first (no raw HTML), then applies a small, well-known subset.
  function md(src) {
    const lines = String(src).replace(/\r\n/g, "\n").split("\n");
    let html = "", inUl = false, inOl = false, inCode = false;
    const closeLists = () => {
      if (inUl) { html += "</ul>"; inUl = false; }
      if (inOl) { html += "</ol>"; inOl = false; }
    };
    const inline = (t) => esc(t)
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>")
      .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener">$1</a>');

    for (const raw of lines) {
      const line = raw.replace(/\s+$/, "");
      if (line.trim() === "```") {
        closeLists();
        html += inCode ? "</code></pre>" : "<pre><code>";
        inCode = !inCode; continue;
      }
      if (inCode) { html += esc(raw) + "\n"; continue; }

      const h = /^(#{1,4})\s+(.*)$/.exec(line);
      if (h) { closeLists(); html += `<h${h[1].length + 2}>${inline(h[2])}</h${h[1].length + 2}>`; continue; }
      if (/^[-*]\s+/.test(line)) {
        if (!inUl) { closeLists(); html += "<ul>"; inUl = true; }
        html += `<li>${inline(line.replace(/^[-*]\s+/, ""))}</li>`; continue;
      }
      if (/^\d+\.\s+/.test(line)) {
        if (!inOl) { closeLists(); html += "<ol>"; inOl = true; }
        html += `<li>${inline(line.replace(/^\d+\.\s+/, ""))}</li>`; continue;
      }
      if (line.trim() === "") { closeLists(); continue; }
      closeLists();
      html += `<p>${inline(line)}</p>`;
    }
    if (inCode) html += "</code></pre>";
    closeLists();
    return html;
  }

  // Plain-text excerpt from markdown (strip syntax, collapse whitespace).
  function excerptFrom(body, max = 180) {
    const txt = String(body)
      .replace(/```[\s\S]*?```/g, " ")
      .replace(/[#>*_`~-]/g, " ")
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/\s+/g, " ")
      .trim();
    return txt.length > max ? txt.slice(0, max).replace(/\s+\S*$/, "") + "…" : txt;
  }

  /* ------------------------------------------------------------------ state */
  let posts = [];          // index entries from posts.json
  let query = "";
  let tagFilter = "";
  const cache = new Map(); // slug -> markdown body (fetched once)

  const isAuthor = () =>
    /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname) ||
    location.protocol === "file:" ||
    /(?:^|[?&])compose(?:&|=|$)/.test(location.search);

  /* --------------------------------------------------------- load the index */
  async function loadIndex() {
    try {
      const res = await fetch("notes/posts.json", { cache: "no-store" });
      if (!res.ok) throw new Error(res.status);
      const data = await res.json();
      posts = (Array.isArray(data) ? data : [])
        .filter((p) => p && p.slug && p.file)
        .map((p) => ({
          slug: String(p.slug),
          title: String(p.title || "Untitled"),
          date: String(p.date || ""),
          tags: Array.isArray(p.tags) ? p.tags.map(String) : [],
          file: String(p.file),
          excerpt: String(p.excerpt || ""),
        }))
        .sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    } catch {
      posts = [];
    }
  }

  async function loadPost(p) {
    if (cache.has(p.slug)) return cache.get(p.slug);
    const res = await fetch("notes/" + p.file, { cache: "no-store" });
    if (!res.ok) throw new Error(res.status);
    const body = await res.text();
    cache.set(p.slug, body);
    return body;
  }

  /* ------------------------------------------------------------- list view */
  function matches(p) {
    if (tagFilter && !p.tags.includes(tagFilter)) return false;
    if (!query) return true;
    const hay = (p.title + " " + p.tags.join(" ") + " " + p.excerpt).toLowerCase();
    return hay.includes(query);
  }

  function allTags() {
    const set = new Set();
    posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return [...set].sort((a, b) => a.localeCompare(b));
  }

  function renderTagBar() {
    const bar = $("#tagbar");
    bar.innerHTML = "";
    const tags = allTags();
    if (!tags.length) { bar.hidden = true; return; }
    bar.hidden = false;
    const mk = (label, value) => {
      const b = el("button", "pchip" + (tagFilter === value ? " is-active" : ""));
      b.type = "button"; b.textContent = label;
      b.addEventListener("click", () => { tagFilter = value; renderList(); });
      return b;
    };
    bar.appendChild(mk("All tags", ""));
    tags.forEach((t) => bar.appendChild(mk("#" + t, t)));
  }

  function postCard(p, i) {
    const c = el("article", "note reveal");
    c.style.setProperty("--ac", `var(--v${(i % 8) + 1})`);

    const head = el("div", "note__head");
    const h = el("h3", "note__title");
    const link = el("a", null, esc(p.title));
    link.href = "?p=" + encodeURIComponent(p.slug);
    link.addEventListener("click", (e) => { e.preventDefault(); openPost(p.slug, true); });
    h.appendChild(link);
    head.appendChild(h);
    c.appendChild(head);

    const meta = el("div", "note__meta");
    meta.appendChild(el("span", null, p.date ? fmtDate(p.date) : "Undated"));
    c.appendChild(meta);

    if (p.excerpt) c.appendChild(el("p", "post__excerpt", esc(p.excerpt)));

    if (p.tags.length) {
      const tg = el("div", "note__tags");
      p.tags.forEach((t) => {
        const b = el("button", "tag"); b.type = "button"; b.textContent = "#" + t;
        b.addEventListener("click", () => { tagFilter = t; renderList(); });
        tg.appendChild(b);
      });
      c.appendChild(tg);
    }

    const more = el("a", "post__more", "Read post →");
    more.href = "?p=" + encodeURIComponent(p.slug);
    more.addEventListener("click", (e) => { e.preventDefault(); openPost(p.slug, true); });
    c.appendChild(more);
    return c;
  }

  function renderList() {
    $("#reader").hidden = true;
    $("#blog-view").hidden = false;

    renderTagBar();
    const list = $("#post-list");
    const empty = $("#post-empty");
    list.innerHTML = "";

    const shown = posts.filter(matches);
    $("#post-count").textContent =
      `${posts.length} post${posts.length === 1 ? "" : "s"}` +
      (shown.length !== posts.length ? ` · ${shown.length} shown` : "");

    if (!posts.length) { empty.hidden = false; list.hidden = true; return; }
    empty.hidden = true; list.hidden = false;

    if (!shown.length) {
      list.appendChild(el("p", "note-none", "No posts match your search or tag filter."));
      return;
    }
    shown.forEach((p, i) => list.appendChild(postCard(p, i)));
    // reveal freshly-added cards
    $$("#post-list .reveal").forEach((n) => n.classList.add("in"));
  }

  /* ----------------------------------------------------------- reader view */
  async function openPost(slug, push) {
    const p = posts.find((x) => x.slug === slug);
    if (!p) { renderList(); return; }

    const art = $("#reader-article");
    $("#blog-view").hidden = true;
    $("#reader").hidden = false;
    window.scrollTo({ top: 0, behavior: "smooth" });

    $("#reader-title").textContent = p.title;
    const meta = $("#reader-meta");
    meta.innerHTML = "";
    meta.appendChild(el("span", null, p.date ? fmtDate(p.date) : "Undated"));
    if (p.tags.length) {
      const tg = el("span", "reader__tags");
      p.tags.forEach((t) => {
        const b = el("a", "tag"); b.textContent = "#" + t;
        b.href = "?p=";
        b.addEventListener("click", (e) => {
          e.preventDefault(); tagFilter = t; go(null); renderList();
        });
        tg.appendChild(b);
      });
      meta.appendChild(tg);
    }

    art.innerHTML = '<p class="reader__loading">Loading…</p>';
    try {
      const body = await loadPost(p);
      art.innerHTML = md(body);
    } catch {
      art.innerHTML =
        '<p class="reader__loading">Could not load this post. ' +
        'The file may not be committed yet.</p>';
    }
    if (push) go(slug);
  }

  // history + querystring plumbing (deep links: ?p=slug)
  function go(slug) {
    const url = slug ? "?p=" + encodeURIComponent(slug) : location.pathname;
    history.pushState({ slug: slug || null }, "", url);
  }
  function route() {
    const m = /[?&]p=([^&]+)/.exec(location.search);
    if (m) openPost(decodeURIComponent(m[1]), false);
    else renderList();
  }

  /* -------------------------------------------------------------- composer */
  function wireComposer() {
    const panel = $("#composer");
    if (!isAuthor()) { panel.hidden = true; return; }
    panel.hidden = false;

    const date = $("#c-date");
    if (date && !date.value) date.value = new Date().toISOString().slice(0, 10);

    $("#c-gen").addEventListener("click", () => {
      const title = $("#c-title").value.trim();
      const body  = $("#c-body").value.trim();
      if (!title) { alert("Give the post a title first."); return; }
      const d = ($("#c-date").value || new Date().toISOString().slice(0, 10)).trim();
      const tags = parseTags($("#c-tags").value);
      const slug = slugify(title) || "post";
      const file = `${d}-${slug}.md`;

      const entry = { slug, title, date: d, tags, file,
        excerpt: excerptFrom(body) };

      // merge into a fresh copy of the current index, newest first
      const merged = posts.filter((p) => p.slug !== slug)
        .concat([entry])
        .sort((a, b) => (b.date || "").localeCompare(a.date || ""));

      $("#c-filename").textContent = "notes/" + file;
      $("#c-md").value = body + (body.endsWith("\n") ? "" : "\n");
      $("#c-json").value = JSON.stringify(merged, null, 2) + "\n";
      $("#c-out").hidden = false;
      $("#c-out").scrollIntoView({ behavior: "smooth", block: "start" });
    });

    const copy = (sel, btn) => $(btn).addEventListener("click", async () => {
      const t = $(sel).value;
      try { await navigator.clipboard.writeText(t); flash($(btn)); }
      catch { $(sel).select(); document.execCommand("copy"); flash($(btn)); }
    });
    copy("#c-md", "#c-copy-md");
    copy("#c-json", "#c-copy-json");

    $("#c-dl-md").addEventListener("click", () => {
      const file = ($("#c-filename").textContent || "post.md").replace(/^notes\//, "");
      download(file, $("#c-md").value, "text/markdown");
    });
    $("#c-dl-json").addEventListener("click", () =>
      download("posts.json", $("#c-json").value, "application/json"));
  }

  function flash(btn) {
    const old = btn.textContent;
    btn.textContent = "Copied ✓";
    setTimeout(() => { btn.textContent = old; }, 1200);
  }
  function download(filename, text, mime) {
    const url = URL.createObjectURL(new Blob([text], { type: mime }));
    const a = el("a"); a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
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
  document.addEventListener("DOMContentLoaded", async () => {
    wireTheme();
    wireNav();
    wireReveal();
    wireComposer();

    $("#search").addEventListener("input", (e) => {
      query = e.target.value.trim().toLowerCase(); renderList();
    });
    $("#reader-back").addEventListener("click", () => { go(null); renderList(); });
    window.addEventListener("popstate", route);

    await loadIndex();
    route();

    const y = $("#year"); if (y) y.textContent = new Date().getFullYear();
  });
})();
