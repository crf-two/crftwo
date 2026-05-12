const HUB_BASE_URL = "https://crftwoo.github.io/thiago.luz.dufrio/";
const SHEET_URL = "https://opensheet.elk.sh/1ml7XpwZfzM4ElRJb4G62b93VMqUw3jeprTtgxdigiD8/Sheet1";
const TIPO_ORDER = ["Hiwall", "Piso Teto", "Cassete"];

const ICONS = {
    grid: `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`,
    search: `<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>`,
    chart: `<svg viewBox="0 0 24 24"><path d="M4 19V5"/><path d="M4 19h16"/><path d="M8 16v-5"/><path d="M13 16V8"/><path d="M18 16v-8"/></svg>`,
    cube: `<svg viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="M3.3 7 12 12l8.7-5"/><path d="M12 22V12"/></svg>`,
    cut: `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>`,
    check: `<svg viewBox="0 0 24 24"><path d="M9 11l2 2 4-4"/><path d="M20 6 9 17l-5-5"/></svg>`,
    price: `<svg viewBox="0 0 24 24"><path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8Z"/><path d="M7 7h.01"/><path d="M6 18 18 6"/></svg>`
};

const HUB_TOOLS = [
    {
        section: "Ar-Condicionado",
        tools: [
            { title: "Scraper Oficial", url: HUB_BASE_URL + "scraper-ar.html", icon: ICONS.search, accent: "#f59e0b" },
            { title: "Comparador de Preços de Ar-Condicionado", url: HUB_BASE_URL + "comparador-ar.html", icon: ICONS.chart, accent: "#6366f1" },
            { title: "Precificação de SKU’s — Site x 365", url: HUB_BASE_URL + "precificacao-ar.html", icon: ICONS.price, accent: "#0ea5e9" }
        ]
    },
    {
        section: "Câmara Fria",
        tools: [
            { title: "Simulador 3D de Câmara Fria", url: HUB_BASE_URL + "simulador-gabinete.html", icon: ICONS.cube, accent: "#4facfe" },
            { title: "Otimizador de Corte de Painéis PIR/EPS", url: HUB_BASE_URL + "plano-corte.html", icon: ICONS.cut, accent: "#f97316" },
            { title: "Checklist Câmaras Frias - Gerar PDF", url: HUB_BASE_URL + "CheckList.html", icon: ICONS.check, accent: "#10b981" }
        ]
    }
];

function openUrlInBackground(url) {
    if (!url) return;
    try {
        if (typeof chrome !== "undefined" && chrome.tabs && typeof chrome.tabs.create === "function") {
            chrome.tabs.create({ url, active: false }, () => {
                if (chrome.runtime && chrome.runtime.lastError) {
                    console.error("Erro ao abrir em segundo plano:", chrome.runtime.lastError);
                }
            });
            return;
        }
    } catch (error) {
        console.error("Fallback ao abrir link:", error);
    }
    window.open(url, "_blank", "noopener");
}

function setApp(html) {
    document.getElementById("app").innerHTML = html;
}

function viewHeader(title, kicker = "", withBack = false) {
    return `
        <div class="view-head">
            <div>
                <h1 class="view-title">${title}</h1>
                ${kicker ? `<p class="view-kicker">${kicker}</p>` : ""}
            </div>
            ${withBack ? `<button class="back-btn" type="button" data-action="home">Voltar</button>` : ""}
        </div>
    `;
}

function renderHome() {
    setApp(`
        ${viewHeader("Hub Dufrio", "Ferramentas internas")}
        <div class="home-grid">
            <button class="home-card" type="button" data-action="mini-hub" style="--accent:#4facfe">
                <span class="card-icon">${ICONS.grid}</span>
                <span class="home-card-title">Mini Hub</span>
            </button>
            <button class="home-card" type="button" data-action="busca-ar" style="--accent:#10b981">
                <span class="card-icon">${ICONS.search}</span>
                <span class="home-card-title">Busca Ar</span>
            </button>
        </div>
    `);
}

function renderMiniHub() {
    setApp(`
        ${viewHeader("Mini Hub", "", true)}
        ${HUB_TOOLS.map(section => `
            <section class="section-block">
                <h2 class="section-title">${section.section}</h2>
                <div class="tool-list">
                    ${section.tools.map(tool => `
                        <button class="tool-card" type="button" data-url="${tool.url}" style="--accent:${tool.accent}">
                            <span class="card-icon">${tool.icon}</span>
                            <span class="tool-title">${tool.title}</span>
                        </button>
                    `).join("")}
                </div>
            </section>
        `).join("")}
    `);
}

function renderBuscaAr() {
    setApp(`
        ${viewHeader("Busca Ar", "", true)}
        <div id="results">
            <p class="info-msg">Carregando opções de ar-condicionado...</p>
        </div>
    `);
    initBuscaAr();
}

function createChip(label, value, currentValue, onSelect) {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "chip";

    if (["Hiwall", "Piso Teto", "Cassete"].includes(label)) {
        let imgSrc = "";
        if (label === "Hiwall") imgSrc = "img/hi_wall.png";
        if (label === "Piso Teto") imgSrc = "img/piso_teto.png";
        if (label === "Cassete") imgSrc = "img/cassete.png";

        chip.classList.add("chip-type");
        chip.innerHTML = `<img src="${imgSrc}" alt=""><span>${label}</span>`;
    } else {
        chip.textContent = label;
    }

    if (value === currentValue) chip.classList.add("selected");
    chip.addEventListener("click", () => onSelect(value));
    return chip;
}

function formatBtusLabel(raw) {
    const s = String(raw || "").trim();
    if (!s) return "";

    const nums = (s.match(/\d[\d.]*/g) || [])
        .map(n => parseInt(n.replace(/\./g, ""), 10))
        .filter(n => Number.isFinite(n) && n > 0);

    if (nums.length === 0) return `${s} Btus`;

    const formatInt = (n) => n.toLocaleString("pt-BR", { maximumFractionDigits: 0 });
    if (s.toLowerCase().includes(" a ") && nums.length >= 2) {
        return `${formatInt(nums[0])} a ${formatInt(nums[1])} Btus`;
    }
    if (nums.length === 1) return `${formatInt(nums[0])} Btus`;
    return `${nums.map(formatInt).join(" / ")} Btus`;
}

async function initBuscaAr() {
    const resultsDiv = document.getElementById("results");
    if (!resultsDiv) return;

    resultsDiv.innerHTML = '<p class="info-msg">Carregando opções de ar-condicionado...</p>';

    try {
        const response = await fetch(SHEET_URL);
        if (!response.ok) throw new Error("Não foi possível carregar a planilha.");

        const rows = await response.json();
        const validRows = rows.filter(row =>
            row &&
            typeof row.Site === "string" &&
            row.Site.toLowerCase().includes("dufrio") &&
            row.Link
        );

        if (validRows.length === 0) {
            resultsDiv.innerHTML = '<p class="error-msg">Nenhum link configurado na planilha (colunas Site e Link).</p>';
            return;
        }

        const mapByTipo = {};
        validRows.forEach(row => {
            const tipo = (row.Tipo || "").trim();
            const btus = (row.BTUs || "").trim();
            const ciclo = (row.Ciclo || "").trim();
            const site = row.Site.trim();
            const link = row.Link.trim();
            if (!tipo || !btus || !ciclo || !site || !link) return;

            if (!mapByTipo[tipo]) mapByTipo[tipo] = {};
            if (!mapByTipo[tipo][btus]) mapByTipo[tipo][btus] = {};
            if (!mapByTipo[tipo][btus][ciclo]) mapByTipo[tipo][btus][ciclo] = {};
            if (!mapByTipo[tipo][btus][ciclo][site]) mapByTipo[tipo][btus][ciclo][site] = link;
        });

        const tipos = TIPO_ORDER.filter(t => mapByTipo[t]).concat(
            Object.keys(mapByTipo).filter(t => !TIPO_ORDER.includes(t)).sort()
        );

        if (tipos.length === 0) {
            resultsDiv.innerHTML = '<p class="error-msg">Não foi possível organizar os dados de busca.</p>';
            return;
        }

        let selectedTipo = null;
        let selectedBtus = null;
        let selectedCiclo = null;

        resultsDiv.innerHTML = "";
        const container = document.createElement("div");
        container.className = "filters-container";

        const errorsP = document.createElement("p");
        errorsP.className = "error-msg";
        errorsP.style.display = "none";

        const tipoGroup = document.createElement("div");
        tipoGroup.className = "filter-group";
        const tipoLabel = document.createElement("div");
        tipoLabel.className = "filter-label";
        const labelText = document.createElement("span");
        labelText.textContent = "Tipo";
        const resetBtn = document.createElement("button");
        resetBtn.type = "button";
        resetBtn.textContent = "Limpar filtros";
        resetBtn.className = "reset-link hidden";
        const tipoRow = document.createElement("div");
        tipoRow.className = "chip-row";

        const btusGroup = document.createElement("div");
        btusGroup.className = "filter-group hidden";
        const btusLabel = document.createElement("div");
        btusLabel.className = "filter-label";
        btusLabel.textContent = "BTUs";
        const btusRow = document.createElement("div");
        btusRow.className = "chip-row";

        const cicloGroup = document.createElement("div");
        cicloGroup.className = "filter-group hidden";
        const cicloLabel = document.createElement("div");
        cicloLabel.className = "filter-label";
        cicloLabel.textContent = "Ciclo";
        const cicloRow = document.createElement("div");
        cicloRow.className = "chip-row";

        const summaryDiv = document.createElement("div");
        summaryDiv.className = "summary-text hidden";
        const storesGroup = document.createElement("div");
        storesGroup.className = "stores-group hidden";

        function renderSummary() {
            if (!selectedTipo || !selectedBtus || !selectedCiclo) {
                summaryDiv.classList.add("hidden");
                summaryDiv.textContent = "";
                return;
            }
            const btusLabelText = formatBtusLabel(selectedBtus);
            const cicloLower = selectedCiclo.toLowerCase();
            const emojiCycle = (
                cicloLower.includes("quente/frio") ||
                cicloLower.includes("quente e frio") ||
                cicloLower.includes("quente frio") ||
                cicloLower.includes("q/f")
            ) ? "🔥❄️" : "❄️";
            summaryDiv.textContent = `${emojiCycle} ${selectedTipo} · ${btusLabelText} · ${selectedCiclo}`;
            summaryDiv.classList.remove("hidden");
        }

        function renderTipoChips() {
            tipoRow.innerHTML = "";
            if (selectedTipo) {
                resetBtn.classList.remove("hidden");
                const chip = createChip(selectedTipo, selectedTipo, selectedTipo, () => {});
                chip.disabled = true;
                tipoRow.appendChild(chip);
                return;
            }

            tipos.forEach(tipo => {
                tipoRow.appendChild(createChip(tipo, tipo, selectedTipo, (newTipo) => {
                    if (selectedTipo === newTipo) return;
                    selectedTipo = newTipo;
                    selectedBtus = null;
                    selectedCiclo = null;
                    errorsP.style.display = "none";
                    renderTipoChips();
                    renderBtusChips();
                    renderCicloChips();
                    btusGroup.classList.remove("hidden");
                    cicloGroup.classList.add("hidden");
                    storesGroup.classList.add("hidden");
                    btusGroup.scrollIntoView({ behavior: "smooth", block: "center" });
                }));
            });
        }

        function getBtusOptions() {
            if (!selectedTipo) return [];
            const mapBtus = mapByTipo[selectedTipo] || {};
            return Object.keys(mapBtus).sort((a, b) => a.localeCompare(b, "pt-BR", { numeric: true }));
        }

        function renderBtusChips() {
            btusRow.innerHTML = "";
            const btusOptions = getBtusOptions();
            if (selectedBtus) {
                const chip = document.createElement("button");
                chip.type = "button";
                chip.className = "chip selected";
                chip.textContent = formatBtusLabel(selectedBtus);
                chip.disabled = true;
                btusRow.appendChild(chip);
                return;
            }

            if (!btusOptions.includes(selectedBtus)) selectedBtus = null;
            btusOptions.forEach(btus => {
                btusRow.appendChild(createChip(formatBtusLabel(btus), btus, selectedBtus, (newBtus) => {
                    if (selectedBtus === newBtus) return;
                    selectedBtus = newBtus;
                    selectedCiclo = null;
                    errorsP.style.display = "none";
                    renderBtusChips();
                    renderCicloChips();
                    cicloGroup.classList.remove("hidden");
                    storesGroup.classList.add("hidden");
                    cicloGroup.scrollIntoView({ behavior: "smooth", block: "center" });
                }));
            });
        }

        function getCicloOptions() {
            if (!selectedTipo || !selectedBtus) return [];
            const mapBtus = mapByTipo[selectedTipo] || {};
            const mapCiclo = mapBtus[selectedBtus] || {};
            return Object.keys(mapCiclo).sort();
        }

        function renderCicloChips() {
            cicloRow.innerHTML = "";
            const ciclos = getCicloOptions();
            if (selectedCiclo) {
                const chip = document.createElement("button");
                chip.type = "button";
                chip.className = "chip selected";
                chip.textContent = selectedCiclo;
                chip.disabled = true;
                cicloRow.appendChild(chip);
                renderSummary();
                return;
            }

            if (!ciclos.includes(selectedCiclo)) selectedCiclo = null;
            ciclos.forEach(ciclo => {
                cicloRow.appendChild(createChip(ciclo, ciclo, selectedCiclo, (newCiclo) => {
                    selectedCiclo = newCiclo;
                    errorsP.style.display = "none";
                    renderCicloChips();
                    renderSummary();
                    renderStoreButtons();
                    storesGroup.classList.remove("hidden");
                    storesGroup.scrollIntoView({ behavior: "smooth", block: "center" });
                }));
            });
        }

        function renderStoreButtons() {
            storesGroup.innerHTML = "";
            if (!selectedTipo || !selectedBtus || !selectedCiclo) return;

            const mapBtus = mapByTipo[selectedTipo] || {};
            const mapCiclo = mapBtus[selectedBtus] || {};
            const storeLinks = mapCiclo[selectedCiclo] || {};
            const availableStores = Object.keys(storeLinks);

            if (availableStores.length === 0) {
                errorsP.textContent = "Nenhum site configurado para essa combinação.";
                errorsP.style.display = "block";
                return;
            }

            availableStores.forEach(siteName => {
                const searchBtn = document.createElement("button");
                searchBtn.type = "button";
                searchBtn.className = "primary-btn";
                searchBtn.textContent = "Abrir no " + siteName.toUpperCase();

                searchBtn.addEventListener("click", () => {
                    errorsP.style.display = "none";
                    const link = storeLinks[siteName];
                    if (!link) {
                        errorsP.textContent = `Link ausente para ${siteName}.`;
                        errorsP.style.display = "block";
                        return;
                    }
                    openUrlInBackground(link);
                });

                storesGroup.appendChild(searchBtn);
            });
        }

        resetBtn.onclick = () => {
            selectedTipo = null;
            selectedBtus = null;
            selectedCiclo = null;
            resetBtn.classList.add("hidden");
            btusGroup.classList.add("hidden");
            cicloGroup.classList.add("hidden");
            storesGroup.classList.add("hidden");
            errorsP.style.display = "none";
            renderSummary();
            renderTipoChips();
        };

        tipoLabel.appendChild(labelText);
        tipoLabel.appendChild(resetBtn);
        tipoGroup.appendChild(tipoLabel);
        tipoGroup.appendChild(tipoRow);
        btusGroup.appendChild(btusLabel);
        btusGroup.appendChild(btusRow);
        cicloGroup.appendChild(cicloLabel);
        cicloGroup.appendChild(cicloRow);

        container.appendChild(tipoGroup);
        container.appendChild(btusGroup);
        container.appendChild(cicloGroup);
        container.appendChild(summaryDiv);
        container.appendChild(errorsP);
        container.appendChild(storesGroup);
        resultsDiv.appendChild(container);

        renderTipoChips();
    } catch (error) {
        console.error("Erro ao carregar planilha da Dufrio:", error);
        const message = error && error.message ? error.message : "Erro desconhecido.";
        resultsDiv.innerHTML = `<p class="error-msg">Erro ao carregar os dados da planilha.<br>${message}</p>`;
    }
}

document.addEventListener("click", (event) => {
    const actionEl = event.target.closest("[data-action]");
    if (actionEl) {
        const action = actionEl.dataset.action;
        if (action === "home") renderHome();
        if (action === "mini-hub") renderMiniHub();
        if (action === "busca-ar") renderBuscaAr();
        return;
    }

    const toolEl = event.target.closest("[data-url]");
    if (toolEl) {
        openUrlInBackground(toolEl.dataset.url);
    }
});

document.getElementById("open-hub-btn").addEventListener("click", () => {
    openUrlInBackground(HUB_BASE_URL + "index.html");
});

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderHome);
} else {
    renderHome();
}
