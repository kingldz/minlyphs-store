const $ = (s) => document.querySelector(s);
let apps = [];
let selectedCategory = "Todas";

async function loadCatalog() {
  try {
    const response = await fetch("data/apps.json", { cache: "no-store" });
    if (!response.ok) throw new Error("No se pudo cargar apps.json");
    const data = await response.json();
    apps = Array.isArray(data.apps) ? data.apps : [];
    renderApps();
  } catch (error) {
    $("#appGrid").innerHTML = '<div class="empty-state"><h3>No se pudo cargar el catálogo</h3><p>Comprueba que data/apps.json exista y tenga formato JSON válido.</p></div>';
  }
}

function renderApps() {
  const query = $("#searchInput").value.trim().toLocaleLowerCase("es");
  const visible = apps.filter(app => {
    const text = [app.name, app.description, app.category, app.developer].join(" ").toLocaleLowerCase("es");
    return (selectedCategory === "Todas" || app.category === selectedCategory) && text.includes(query);
  });
  $("#appCount").textContent = `${visible.length} ${visible.length === 1 ? "aplicación" : "aplicaciones"}`;
  if (!visible.length) {
    $("#appGrid").innerHTML = `<div class="empty-state"><div class="empty-icon">✦</div><h3>${apps.length ? "No encontramos resultados" : "Tu tienda está preparando su catálogo"}</h3><p>${apps.length ? "Prueba con otra búsqueda o categoría." : "Pronto encontrarás aquí las primeras aplicaciones."}</p></div>`;
    return;
  }
  $("#appGrid").innerHTML = visible.map((app, index) => `
    <article class="app-card" tabindex="0" role="button" data-index="${apps.indexOf(app)}" aria-label="Ver ${escapeHtml(app.name)}">
      ${app.icon ? `<img class="app-icon" src="${escapeAttr(app.icon)}" alt="" loading="lazy" onerror="this.outerHTML='<div class=&quot;app-icon&quot;>${escapeHtml(app.name.slice(0,1).toUpperCase())}</div>'">` : `<div class="app-icon">${escapeHtml((app.name || "A").slice(0,1).toUpperCase())}</div>`}
      <div class="app-info"><h3>${escapeHtml(app.name)}</h3><p>${escapeHtml(app.description || "Sin descripción disponible.")}</p><div class="app-meta"><span>${escapeHtml(app.category || "Otros")}</span><span>v${escapeHtml(app.version || "1.0")}</span></div></div>
    </article>`).join("");
  document.querySelectorAll(".app-card").forEach(card => {
    const open = () => showDetails(apps[Number(card.dataset.index)]);
    card.addEventListener("click", open);
    card.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
  });
}

function showDetails(app) {
  if (!app) return;
  const content = $("#dialogContent");
  content.innerHTML = `
    <div style="display:flex;gap:14px;align-items:center;margin-top:16px">
      ${app.icon ? `<img class="app-icon" src="${escapeAttr(app.icon)}" alt="">` : `<div class="app-icon">${escapeHtml((app.name||"A").slice(0,1))}</div>`}
      <div><div class="eyebrow">${escapeHtml(app.category || "APLICACIÓN")}</div><h2 class="dialog-title">${escapeHtml(app.name)}</h2><span style="color:var(--muted);font-size:12px">${escapeHtml(app.developer || "MINLYPHS STORE")} · v${escapeHtml(app.version || "1.0")}</span></div>
    </div>
    <p class="dialog-desc">${escapeHtml(app.description || "Sin descripción disponible.")}</p>
    <p class="dialog-desc">Tamaño: ${escapeHtml(app.size || "No especificado")} · Android: ${escapeHtml(app.minAndroid || "No especificado")}</p>
    ${app.downloadUrl ? `<a class="download-button" href="${escapeAttr(app.downloadUrl)}" target="_blank" rel="noopener noreferrer" download>DESCARGAR APK ↓</a>` : `<p class="warning">Esta aplicación todavía no tiene un enlace de descarga publicado.</p>`}
    <p class="warning">Instala únicamente aplicaciones de fuentes en las que confíes. Android puede solicitar autorización para instalar aplicaciones externas.</p>`;
  $("#appDialog").showModal();
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}
function escapeAttr(value) { return escapeHtml(value); }

$("#searchInput").addEventListener("input", renderApps);
$("#clearSearch").addEventListener("click", () => { $("#searchInput").value = ""; renderApps(); });
$("#categories").addEventListener("click", e => {
  const button = e.target.closest("[data-category]");
  if (!button) return;
  selectedCategory = button.dataset.category;
  document.querySelectorAll(".category").forEach(item => item.classList.toggle("active", item === button));
  renderApps();
});
$("#themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("light");
  localStorage.setItem("minlyphs-theme", document.body.classList.contains("light") ? "light" : "dark");
});
if (localStorage.getItem("minlyphs-theme") === "light") document.body.classList.add("light");
$("#dialogClose").addEventListener("click", () => $("#appDialog").close());
$("#appDialog").addEventListener("click", e => { if (e.target === $("#appDialog")) $("#appDialog").close(); });
$("#year").textContent = new Date().getFullYear();
loadCatalog();
