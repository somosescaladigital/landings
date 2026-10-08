# Estudio Ledesma & Asociados — Plantilla One-Page para Estudios Profesionales

Plantilla web *one-page* reutilizable y de alto impacto, diseñada específicamente para estudios jurídicos y contables en Argentina.

Inspirada en una identidad arquitectónica sobria y moderna (ladrillo visto, perfilería de hierro negro, iluminación cálida de aplique, texturas de travertino y acentos mostaza/ámbar), con redacción en español rioplatense profesional (tratamiento de usted/impersonal) y optimizada para máxima velocidad y conversión directa a WhatsApp sin dependencias ni backend.

---

## 📁 Estructura del Proyecto

```text
estudio-ledesma/
│
├── index.html                  # Portal selector de demos (Jurídico y Contable)
├── README.md                   # Esta guía paso a paso
│
├── juridico/                   # Demo autocontenida: Estudio Jurídico
│   ├── index.html              # HTML semántico con Schema.org LegalService
│   ├── styles.css              # Variables CSS en :root al inicio para rebranding
│   ├── script.js               # Menú mobile, acordeón FAQ, quick chips y WhatsApp
│   ├── sitemap.xml             # Mapa del sitio escrito a mano
│   ├── robots.txt              # Directivas para rastreadores
│   └── assets/
│       ├── estudio-real.webp   # Fotografía interior del estudio (66 KB)
│       ├── hero.webp           # Fotografía optimizada (111 KB)
│       ├── equipo-1.webp       # Foto profesional Socio Fundador
│       ├── equipo-2.webp       # Foto profesional Socia
│       ├── equipo-3.webp       # Foto profesional Asociado
│       └── favicon.svg         # Isotipo vectorial de la balanza
│
├── contable/                   # Demo autocontenida: Estudio Contable & Tributario
│   ├── index.html              # HTML semántico con Schema.org AccountingService
│   ├── styles.css              # Variables CSS en :root (paleta petróleo & ámbar)
│   ├── script.js               # Menú mobile, acordeón FAQ, quick chips y WhatsApp
│   ├── sitemap.xml             # Mapa del sitio escrito a mano
│   ├── robots.txt              # Directivas para rastreadores
│   └── assets/
│       ├── estudio-real.webp   # Fotografía interior del estudio
│       ├── hero.webp           # Fotografía optimizada (124 KB)
│       ├── equipo-1.webp       # Foto profesional Socio Fundador
│       ├── equipo-2.webp       # Foto profesional Socia
│       ├── equipo-3.webp       # Foto profesional Asociado
│       └── favicon.svg         # Isotipo vectorial contable
│
└── src/
    └── config/
        └── site.ts             # Archivo TypeScript de configuración centralizada
```

---

## 🚀 Cómo Abrir el Proyecto Localmente

No requiere Node.js, npm, ni ningún paso de compilación (*build*). Es 100% web estándar:

1. **Opción Directa**: Haga doble clic en `index.html` (o en `juridico/index.html` o `contable/index.html`) para abrirlo en cualquier navegador (Chrome, Edge, Firefox, Safari).
2. **Con Live Server (VS Code / Antigravity IDE)**:
   - Abra la carpeta `estudio-ledesma/` en el editor.
   - Clic derecho en `index.html` -> **Open with Live Server**.
3. **Con Servidor Local Rápido (Python)**:
   ```bash
   python -m http.server 8080
   ```
   Abra `http://localhost:8080` en su navegador.

---

## 🎨 Rebranding en 1 Minuto para un Nuevo Cliente

### 1. Cambiar Colores y Tipografías
Al inicio de cada archivo `styles.css` (`juridico/styles.css` o `contable/styles.css`) encontrará el bloque `:root`:

```css
:root {
  --color-iron: #141416;         /* Color principal oscuro */
  --color-brick: #7c3520;        /* Color secundario / terracota */
  --color-amber: #d99424;        /* Color de acento / botones y llamadas a la acción */
  --color-travertine: #f8f5ef;   /* Fondo cálido marfil/piedra */
  ...
}
```
Modifique esos valores hexadecimales y toda la landing se adaptará instantáneamente.

### 2. Cambiar Datos de Contacto y Profesional
En el archivo `index.html`, todos los datos sensibles están marcados con el comentario `<!-- EDITAR: ... -->`:
- **Número de WhatsApp**: Busque `5491155550192` en los enlaces `https://wa.me/...` y en el atributo `data-phone="5491155550192"` del formulario `<form id="whatsapp-form">`. (Formato: código de país 54 + 9 + código de área sin 0 + número sin 15).
- **Teléfono directo**: Busque `tel:+541155550192`.
- **Email**: Busque `mailto:consultas@estudioledesma.com.ar`.
- **Dirección física y horarios**: En la sección de Contacto y Footer.
- **Mapa de Google Maps**: Reemplace el atributo `src` del `<iframe>` en la sección de Contacto con el link de inserción que le proporcione Google Maps del cliente.
- **Integrantes del equipo**: En la sección `#equipo`, actualice nombres, títulos, matrículas (CPACF/CPCECABA) y reemplace las imágenes en `assets/`.
- **Reseñas**: En la sección `#opiniones`, pegue testimonios reales de Google Maps de los clientes.

### 3. Configuración en `src/config/site.ts` (Opcional)
Si prefiere tener un único archivo de configuración estructurado para consultar o integrar con un framework futuro, en `src/config/site.ts` dispone de ambas configuraciones tipadas (`juridicoConfig` y `contableConfig`) y un switch `currentBranch`.

---

## 🌐 Cómo Desplegar a Producción

Dado que cada carpeta (`/juridico` y `/contable`) es completamente autocontenida:

### Opción A: Netlify (La más rápida - 30 segundos)
1. Inicie sesión en [app.netlify.com](https://app.netlify.com).
2. Vaya a **Sites** y arrastre la carpeta elegida (`juridico` o `contable`, o la raíz `estudio-ledesma`) directamente sobre la zona de **Drag and drop your site output folder here**.
3. El sitio quedará publicado al instante con certificado SSL gratuito y CDN global.

### Opción B: GitHub Pages
1. Suba los archivos a un repositorio en GitHub.
2. Ingrese a **Settings** -> **Pages**.
3. En **Source**, elija la rama `main` (carpeta `/root`).
4. Guarde y en 1 minuto estará en `https://tu-usuario.github.io/tu-repo/`.

### Opción C: Hosting Tradicional con cPanel (DonWeb, Hostinger, GoDaddy, etc.)
1. Ingrese a su cPanel y abra el **Administrador de Archivos** (*File Manager*).
2. Ingrese a la carpeta `public_html/`.
3. Suba todos los archivos de la carpeta (`index.html`, `styles.css`, `script.js`, `sitemap.xml`, `robots.txt` y la carpeta `assets/`).
4. Verifique que los permisos de archivos sean `644` y carpetas `755`.

### Opción D: Vercel
1. Instale la CLI o importe el repositorio desde vercel.com.
2. Como es HTML estático, no configure ningún framework ni comando de build.
3. Despliegue con un clic.

---

## ⚡ Rendimiento y Buenas Prácticas
- **Score Lighthouse 90+**: HTML limpio, CSS sin librerías pesadas, JavaScript vanilla sin dependencias.
- **Imágenes WebP**: Peso inferior a 130 KB en la foto principal y ~15 KB en fotografías de equipo.
- **SEO & Datos Estructurados**: Metadatos Open Graph, Twitter Cards, `sitemap.xml`, `robots.txt` y marcado `LegalService` / `AccountingService` en formato JSON-LD.
- **Accesibilidad**: Navegación por teclado completa, atributos ARIA en menú y acordeones, contraste cromático validado y respeto por `prefers-reduced-motion`.
