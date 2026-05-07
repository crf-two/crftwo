/*
  Codex Modern JS
  Mantem a pagina estatica e rapida no GitHub Pages. A UI principal segue o
  index oficial; a camada "uau" fica isolada no overlay dos laboratorios.
*/

(() => {
  const DATA = {
    labs: [
      { name: "CLIMARIO", desc: "Extração direta via URL.", file: "scraper-climario.html", color: "#f59e0b" },
      { name: "FRIGELAR", desc: "Linhas isoladas da planilha.", file: "scraper-frigelar.html", color: "#00a859" },
      { name: "LEVEROS", desc: "Linhas isoladas da planilha.", file: "scraper-leveros.html", color: "#ff6b00" },
      { name: "CENTRAL AR", desc: "Linhas isoladas da planilha.", file: "scraper-centralar.html", color: "#ec4899" },
      { name: "DUFRIO", desc: "Linhas isoladas da planilha.", file: "scraper-dufrio.html", color: "#007bff" },
      { name: "FRIOPEÇAS", desc: "Produtos via link da planilha.", file: "scraper-friopecas.html", color: "#2563eb" },
      { name: "POLO AR", desc: "Produtos via link da planilha.", file: "scraper-poloar.html", color: "#ef4444" },
      { name: "WEBCONTINENTAL", desc: "Produtos via link da planilha.", file: "scraper-webcontinental.html", color: "#14b8a6" }
    ]
  };

  const ICONS = {
    beaker: `<svg viewBox="0 0 24 24"><path d="M9 3v6l-5 9a2 2 0 0 0 1.7 3h12.6a2 2 0 0 0 1.7-3l-5-9V3"/><line x1="9" y1="3" x2="15" y2="3"/><line x1="6" y1="14" x2="18" y2="14"/></svg>`,
    box: `<svg viewBox="0 0 24 24"><path d="m21 8-9-5-9 5 9 5 9-5Z"></path><path d="M3 8v8l9 5 9-5V8"></path><path d="M12 13v8"></path></svg>`,
    grid: `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"></rect><path d="M3 9h18"></path><path d="M9 21V9"></path></svg>`,
    check: `<svg viewBox="0 0 24 24"><path d="M9 11l3 3L22 4"></path><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>`,
    search: `<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"></circle><path d="M20 20l-4-4"></path></svg>`,
    sliders: `<svg viewBox="0 0 24 24"><path d="M4 21v-7"></path><path d="M4 10V3"></path><path d="M12 21v-9"></path><path d="M12 8V3"></path><path d="M20 21v-5"></path><path d="M20 12V3"></path><path d="M1 14h6"></path><path d="M9 8h6"></path><path d="M17 16h6"></path></svg>`,
    clock: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l4 2"></path></svg>`,
    tag: `<svg viewBox="0 0 24 24"><path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8Z"></path><path d="M7 7h.01"></path></svg>`,
    file: `<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"></path><path d="M14 2v6h6"></path><path d="M8 13h8"></path><path d="M8 17h5"></path></svg>`,
    filter: `<svg viewBox="0 0 24 24"><path d="M22 3H2l8 9.5V19l4 2v-8.5L22 3Z"></path></svg>`,
    download: `<svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><path d="M7 10l5 5 5-5"></path><path d="M12 15V3"></path></svg>`
  };

  const GROUPS = [
    { id: "all", label: "Tudo", color: "#4facfe" },
    { id: "camara", label: "Câmara Fria", title: "Soluções em <em>Câmara Fria</em>", num: "01 · seção", color: "#10b981" },
    { id: "ar", label: "Ar Condicionado", title: "Soluções em <em>Ar Condicionado</em>", num: "02 · inteligência", color: "#f59e0b" },
    { id: "outros", label: "Outras Ferramentas", title: "Outras <em>Ferramentas</em>", num: "03 · operação", color: "#8b5cf6" }
  ];

  const TOOLS = [
    {
      id: "gabinete",
      group: "camara",
      title: "Simulador de gabinete 3D",
      titleHtml: "Simulador de <em>Gabinete 3D</em>",
      copy: "Visualização 3D e cálculo de painéis PIR/EPS para câmaras.",
      href: "simulador-gabinete.html",
      color: "#4facfe",
      meta: "Projeto técnico",
      icon: "box",
      size: "hero"
    },
    {
      id: "corte",
      group: "camara",
      title: "Plano de corte",
      titleHtml: "Plano de <em>Corte</em>",
      copy: "Otimização de cortes de painéis EPS/PIR para melhor aproveitamento das chapas de 12m.",
      href: "plano-corte.html",
      color: "#f97316",
      meta: "Painéis 12m",
      icon: "grid"
    },
    {
      id: "checklist",
      group: "camara",
      title: "Checklist câmaras frias",
      titleHtml: "Checklist <em>Câmaras Frias</em>",
      copy: "Formulário passo a passo com geração de PDF para orçamento de câmara frigorífica.",
      href: "CheckList.html",
      color: "#10b981",
      meta: "PDF técnico",
      icon: "check"
    },
    {
      id: "scraper",
      group: "ar",
      title: "Scraper oficial",
      titleHtml: "Scraper <em>Oficial</em>",
      copy: "Comparação de preços em tempo real entre Dufrio, Frigelar, Leveros, Central Ar e Polo Ar.",
      href: "scraper-ar.html",
      color: "#f59e0b",
      meta: "Concorrência",
      icon: "search",
      size: "hero"
    },
    {
      id: "comparador",
      group: "ar",
      title: "Comparador de ar-condicionado",
      titleHtml: "Comparador de <em>Ar</em>",
      copy: "Análise de preços da concorrência em tempo real para leitura comercial rápida.",
      href: "comparador-ar.html",
      color: "#6366f1",
      meta: "Análise",
      icon: "sliders"
    },
    {
      id: "precos-vivo",
      group: "ar",
      title: "Preços ao vivo",
      titleHtml: "Preços ao <em>Vivo</em>",
      copy: "Visualiza em cards os produtos raspados pela extensão das abas abertas nas lojas.",
      href: "precos-ao-vivo.html",
      color: "#00e676",
      meta: "Extensão",
      badge: "Em produção",
      icon: "clock"
    },
    {
      id: "precificacao",
      group: "ar",
      title: "Precificação SKU's",
      titleHtml: "Precificação <em>SKU's</em>",
      copy: "Calculadora para precificar SKU's no 365 usando o valor de referência do site.",
      href: "precificacao-ar.html",
      color: "#0ea5e9",
      meta: "Margem",
      icon: "tag"
    },
    {
      id: "scraper-labs",
      group: "ar",
      title: "Laboratórios de scraper",
      titleHtml: "Laboratórios de <em>Scraper</em>",
      copy: "Scrapers individuais por loja para testar ajustes antes de levar ao Scraper Oficial.",
      href: "#laboratorios",
      color: "#22c55e",
      meta: "8 ambientes",
      badge: "LAB",
      icon: "beaker",
      action: "labs",
      size: "wide"
    },
    {
      id: "cotacao",
      group: "outros",
      title: "Cotação express",
      titleHtml: "Cotação <em>Express</em>",
      copy: "Orçamento rápido para infraestrutura de ar-condicionado.",
      href: "cotacoes.html",
      color: "#8b5cf6",
      meta: "Comercial",
      icon: "file"
    },
    {
      id: "extracao",
      group: "outros",
      title: "Extração de códigos",
      titleHtml: "Extração de <em>Códigos</em>",
      copy: "Extração de códigos com quantidade em estoque para conferências internas.",
      href: "itens-quantidade.html",
      color: "#d946ef",
      meta: "Estoque",
      icon: "filter"
    },
    {
      id: "download",
      group: "outros",
      title: "Baixar projeto",
      titleHtml: "Baixar <em>Projeto</em>",
      copy: "Download do pacote completo do projeto e dos arquivos da extensão.",
      href: "https://github.com/crftwoo/thiago.luz.dufrio/archive/refs/heads/main.zip",
      color: "#94a3b8",
      meta: "ZIP",
      icon: "download",
      action: "download"
    }
  ];

  const state = {
    filter: "all",
    query: ""
  };

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const normalize = (value) => String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  function init() {
    renderFilters();
    renderTools();
    hydrateLastUpdate();
    bindEvents();
  }

  function renderFilters() {
    $("#segmentControl").innerHTML = GROUPS.map((group) => `
      <button class="segment-button${group.id === state.filter ? " is-active" : ""}" type="button"
        data-filter="${group.id}" style="--segment-color:${group.color}">
        ${group.label}
      </button>
    `).join("");
  }

  function renderTools() {
    const filtered = getFilteredTools();
    const visibleGroups = GROUPS
      .filter((group) => group.id !== "all")
      .map((group) => ({ ...group, tools: filtered.filter((tool) => tool.group === group.id) }))
      .filter((group) => group.tools.length);

    $("#toolsBoard").innerHTML = visibleGroups.map((group) => `
      <section class="tool-section" data-section="${group.id}">
        <div class="section-title-row">
          <div>
            <div class="section-num">${group.num}</div>
            <h2 class="section-title">${group.title}</h2>
          </div>
          <span class="section-count">${group.tools.length} ${group.tools.length === 1 ? "ferramenta" : "ferramentas"}</span>
        </div>
        <div class="tool-grid">
          ${group.tools.map(renderToolCard).join("")}
        </div>
      </section>
    `).join("");

    $("#emptyState").hidden = filtered.length > 0;
    $("#resultCount").textContent = `${filtered.length} de ${TOOLS.length} ferramentas visíveis`;
  }

  function renderToolCard(tool) {
    const sizeClass = tool.size === "hero" ? " is-hero" : tool.size === "wide" ? " is-wide" : "";
    const iconMarkup = ICONS[tool.icon] || ICONS.file;
    const action = tool.action ? ` data-action="${tool.action}"` : "";

    return `
      <a class="tool-card${sizeClass}${tool.action === "labs" ? " labs-portal" : ""}"
        href="${tool.href}" data-id="${tool.id}"${action} style="--card-color:${tool.color}">
        ${tool.action === "labs" ? `
          <div class="labs-orbit" aria-hidden="true">
            <div class="labs-orbit-ring"></div>
            <div class="labs-orbit-ring"></div>
            <div class="labs-orbit-ring"></div>
          </div>
        ` : ""}
        <span class="tool-top">
          <span class="tool-icon" aria-hidden="true">${iconMarkup}</span>
          ${tool.badge ? `<span class="tool-badge">${tool.badge}</span>` : ""}
        </span>
        <span class="tool-body">
          <span class="tool-title">${tool.titleHtml}</span>
          <span class="tool-copy">${tool.copy}</span>
        </span>
        <span class="tool-meta">${tool.meta}</span>
      </a>
    `;
  }

  function getFilteredTools() {
    const query = normalize(state.query);
    return TOOLS.filter((tool) => {
      const matchesGroup = state.filter === "all" || tool.group === state.filter;
      const haystack = normalize([tool.title, tool.copy, tool.meta, tool.group].join(" "));
      return matchesGroup && (!query || haystack.includes(query));
    });
  }

  function bindEvents() {
    $("#toolSearch").addEventListener("input", (event) => {
      state.query = event.target.value;
      renderTools();
    });

    document.addEventListener("click", (event) => {
      const filterButton = event.target.closest("[data-filter]");
      const card = event.target.closest(".tool-card");

      if (filterButton) {
        state.filter = filterButton.dataset.filter;
        renderFilters();
        renderTools();
        return;
      }

      if (card?.dataset.action === "labs") {
        event.preventDefault();
        Constellation.open();
        return;
      }

      if (card?.dataset.action === "download" && !window.confirm("Baixar o pacote completo do projeto?")) {
        event.preventDefault();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") Constellation.close();
    });
  }

  function hydrateLastUpdate() {
    const target = $("#lastUpdate");
    try {
      if (typeof LATEST_LOG !== "undefined" && LATEST_LOG?.dateIso) {
        const formatted = new Date(LATEST_LOG.dateIso).toLocaleString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        });
        target.textContent = `${formatted} - ${LATEST_LOG.message}`;
      }
    } catch (error) {
      target.textContent = "Hub sincronizado com o projeto.";
    }
  }

  const Constellation = (() => {
    let overlay = null;
    let dragging = false;
    let startX = 0;
    let baseRot = 0;
    let currentRot = 0;

    function buildSatellite(lab, i, total) {
      const angle = (360 / total) * i;
      return `
        <a class="satellite"
           href="${lab.file}"
           style="--angle:${angle}; --radius:300px; --lab-color:${lab.color}"
           data-name="${lab.name}">
          <div class="satellite-card">
            <div class="satellite-icon">${ICONS.beaker}</div>
            <div>
              <div class="satellite-name">${lab.name}</div>
              <div class="satellite-meta">${lab.desc}</div>
            </div>
          </div>
        </a>
      `;
    }

    function ensureOverlay() {
      if (overlay) return overlay;

      overlay = document.createElement("div");
      overlay.className = "constellation";
      overlay.setAttribute("role", "dialog");
      overlay.setAttribute("aria-modal", "true");
      overlay.setAttribute("aria-label", "Constelação de Laboratórios");
      overlay.innerHTML = `
        <div class="constellation-stars"></div>

        <button class="constellation-close" type="button" aria-label="Fechar constelação">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div class="constellation-system">
          ${DATA.labs.map((lab, i) => buildSatellite(lab, i, DATA.labs.length)).join("")}
        </div>

        <div class="constellation-core" aria-hidden="true"></div>
        <div class="constellation-core-label">
          <div class="kicker">Atelier Lab</div>
          <div class="name">Câmara de <em>Experimentos</em></div>
        </div>

        <div class="constellation-help">
          Arraste para girar · ESC para fechar · Clique para entrar
        </div>
      `;

      overlay.querySelector(".constellation-close").addEventListener("click", close);

      overlay.querySelectorAll(".satellite").forEach((satellite) => {
        satellite.addEventListener("click", (event) => {
          event.preventDefault();
          warpTo(satellite.getAttribute("href"));
        });
      });

      overlay.addEventListener("pointerdown", onDown);
      overlay.addEventListener("pointermove", onDrag);
      overlay.addEventListener("pointerup", onUp);
      overlay.addEventListener("pointercancel", onUp);

      document.body.appendChild(overlay);
      return overlay;
    }

    function open() {
      const currentOverlay = ensureOverlay();
      document.body.style.overflow = "hidden";
      currentOverlay.style.display = "block";
      requestAnimationFrame(() => currentOverlay.classList.add("is-open"));
    }

    function close() {
      if (!overlay) return;
      overlay.classList.remove("is-open");
      document.body.style.overflow = "";
      setTimeout(() => {
        if (overlay) overlay.style.display = "none";
      }, 1200);
    }

    function onDown(event) {
      if (event.target.closest("a, button")) return;
      dragging = true;
      startX = event.clientX;
      baseRot = currentRot;
      overlay.style.setProperty("--spin-state", "paused");
    }

    function onDrag(event) {
      if (!dragging) return;
      const dx = event.clientX - startX;
      currentRot = baseRot + dx * 0.4;
      const system = overlay.querySelector(".constellation-system");
      system.style.transform = `translate(-50%, -50%) rotateX(8deg) rotateY(${currentRot}deg)`;
    }

    function onUp() {
      if (!dragging) return;
      dragging = false;
      overlay.style.setProperty("--spin-state", "running");
      setTimeout(() => {
        const system = overlay.querySelector(".constellation-system");
        system.style.transform = "";
      }, 600);
    }

    function warpTo(href) {
      const flash = document.createElement("div");
      flash.className = "warp-flash";
      document.body.appendChild(flash);
      requestAnimationFrame(() => flash.classList.add("is-firing"));
      setTimeout(() => {
        window.location.href = href;
      }, 280);
    }

    return { open, close };
  })();

  init();
})();
