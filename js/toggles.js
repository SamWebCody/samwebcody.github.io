const checkbox_theme = document.getElementById('checkbox_theme');
const checkbox_lang = document.getElementById('checkbox_lang');
const cssLink = document.querySelector('link[rel="stylesheet"]');

// === TEMA ===
const temaGuardado = localStorage.getItem('tema');
if (temaGuardado === 'oscuro') {
  checkbox_theme.checked = true;
  cssLink.href = 'css/sam-dark.css?v=1.0.1.3';
} else {
  checkbox_theme.checked = false;
  cssLink.href = 'css/sam-lgt.css?v=1.0.1.3';
}

checkbox_theme.addEventListener('change', () => {
  if (checkbox_theme.checked) {
    cssLink.href = 'css/sam-dark.css?v=1.0.1.3';
    localStorage.setItem('tema', 'oscuro');
  } else {
    cssLink.href = 'css/sam-lgt.css?v=1.0.1.3';
    localStorage.setItem('tema', 'claro');
  }
});

// === IDIOMA ===
const aplicarIdioma = (lang) => {
  document.documentElement.setAttribute('lang', lang);
  fetch('lang-content/content-index.json')
    .then(res => res.json())
    .then(data => {
      const years = new Date().getFullYear() - 1989;
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const texto = data[lang][key];
        if (texto) {
          el.innerHTML = texto.replace('{years}', years);
        }
      });
    });
};

const langGuardado = localStorage.getItem('lang') || 'es';
checkbox_lang.checked = langGuardado === 'en';
aplicarIdioma(langGuardado);

checkbox_lang.addEventListener('change', () => {
  const idioma = checkbox_lang.checked ? 'en' : 'es';
  localStorage.setItem('lang', idioma);
  aplicarIdioma(idioma);
});