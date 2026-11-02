let generated = "";
const form = document.querySelector("#appForm");
form.addEventListener("submit", event => {
  event.preventDefault();
  const values = Object.fromEntries(new FormData(form).entries());
  const app = {
    id: crypto.randomUUID ? crypto.randomUUID() : "app-" + Date.now(),
    name: values.name.trim(),
    description: values.description.trim(),
    category: values.category,
    developer: values.developer.trim(),
    version: values.version.trim(),
    size: values.size.trim(),
    minAndroid: values.minAndroid.trim(),
    icon: values.icon.trim(),
    downloadUrl: values.downloadUrl.trim()
  };
  let existingApps = [];
  const oldText = document.querySelector("#existingCatalog").value.trim();
  if (oldText) {
    try {
      const oldCatalog = JSON.parse(oldText);
      if (!Array.isArray(oldCatalog.apps)) throw new Error("El JSON no contiene un arreglo apps.");
      existingApps = oldCatalog.apps;
    } catch (error) {
      alert("No se pudo leer el catálogo existente: " + error.message);
      return;
    }
  }
  const catalog = {storeName:"MINLYPHS STORE", updatedAt:new Date().toISOString(), apps:[...existingApps, app]};
  generated = JSON.stringify(catalog, null, 2);
  document.querySelector("#result").hidden = false;
  document.querySelector("#result").scrollIntoView({behavior:"smooth"});
});
document.querySelector("#downloadJson").addEventListener("click", () => {
  const blob = new Blob([generated], {type:"application/json"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = "apps.json"; a.click();
  URL.revokeObjectURL(url);
});
document.querySelector("#copyJson").addEventListener("click", async () => {
  try { await navigator.clipboard.writeText(generated); alert("JSON copiado."); }
  catch { alert("No se pudo copiar. Usa el botón Descargar apps.json."); }
});
