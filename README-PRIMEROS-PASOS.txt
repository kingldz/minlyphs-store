MINLYPHS STORE - PRIMEROS PASOS
================================

CONTENIDO
- index.html, style.css, app.js: tienda pública.
- data/apps.json: catálogo público.
- admin/: generador local de catálogo.
- assets/: recursos visuales.

PROBAR EN SPCK EDITOR
1. Extrae el ZIP en una carpeta.
2. Abre la carpeta del proyecto en SPCK Editor.
3. Abre index.html con la vista previa.
4. El catálogo inicia vacío intencionalmente.

PUBLICAR EN GITHUB PAGES
1. Crea un repositorio público llamado minlyphs-store.
2. Sube el contenido de esta carpeta a la raíz del repositorio.
3. En GitHub abre Settings > Pages.
4. En Build and deployment selecciona Deploy from a branch.
5. Selecciona la rama main y la carpeta /(root), guarda.
6. Espera a que GitHub Pages publique el sitio.

PUBLICAR UN APK
1. En el repositorio abre Releases > Create a new release.
2. Crea una etiqueta de versión, por ejemplo v1.0.0.
3. Adjunta el APK y publica el release.
4. Copia la URL directa del archivo APK.
5. Abre /admin/ en tu sitio o usa el generador local.
6. Completa los datos y genera apps.json.
7. Para conservar aplicaciones anteriores, pega el contenido actual de apps.json en el campo 'Catálogo actual' antes de generar el nuevo archivo. El generador añadirá la aplicación nueva al final.
8. Sube el apps.json actualizado a data/apps.json.

LIMITACIONES Y SEGURIDAD
- Este primer panel NO sube archivos ni publica cambios automáticamente.
- No introduzcas tokens de GitHub en páginas HTML/JavaScript públicas.
- GitHub Pages es alojamiento estático; no ofrece una base de datos ni autenticación privada para este panel.
- La carpeta /admin/ no está protegida por contraseña. Es una herramienta de preparación, no un panel privado seguro.
- Los enlaces de APK son públicos. Verifica cada archivo, su origen, permisos y compatibilidad antes de publicarlo.
- GitHub Pages tiene límites y políticas de uso; revisa la documentación oficial antes de distribuir a gran escala.
- Los archivos APK deben distribuirse desde Releases, no dentro del historial normal del repositorio.

DOCUMENTACIÓN
GitHub Pages: https://docs.github.com/pages
GitHub Releases: https://docs.github.com/repositories/releasing-projects-on-github
