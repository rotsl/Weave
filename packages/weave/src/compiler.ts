// Copyright 2026 Rohan R
// SPDX-License-Identifier: Apache-2.0
//
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

// Weave Compiler
// Transforms AST to complete HTML pages
// Inspired by Wisp: zero-dependency output, semantic HTML, embedded CSS/JS

import type { WeaveAST, WeaveNode, Theme } from './types';
import { generateThemeCSS, themes } from './themes';

export function compileWeave(ast: WeaveAST, options: { minify?: boolean } = {}): string {
  const theme = themes[ast.theme || 'modern'] || themes.modern;
  
  const css = generateBaseCSS() + generateThemeCSS(ast.theme || 'modern', ast.darkMode || false);
  const js = generateJavaScript(ast);
  const html = generateHTML(ast, theme);

  const output = `<!DOCTYPE html>
<html lang="en"${ast.darkMode ? ' data-theme="dark"' : ''}>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="generator" content="Weave - Natural Language Web Framework">
  ${ast.metadata?.title ? `<title>${escapeHtml(ast.metadata.title)}</title>` : `<title>${escapeHtml(ast.name)}</title>`}
  ${ast.metadata?.description ? `<meta name="description" content="${escapeHtml(ast.metadata.description)}">` : ''}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Nunito:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&family=Source+Sans+3:wght@400;500;600;700&family=Lato:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>${css}</style>
</head>
<body>
  ${html}
  <script>${js}</script>
</body>
</html>`;

  return options.minify ? minify(output) : output;
}

function generateHTML(ast: WeaveAST, theme: Theme): string {
  const sections = ast.children.map(node => compileNode(node, theme, ast.darkMode)).join('\n  ');
  return sections;
}

function compileNode(node: WeaveNode, theme: Theme, darkMode?: boolean): string {
  switch (node.type) {
    case 'header':
      return compileHeader(node, theme, darkMode);
    case 'footer':
      return compileFooter(node, theme);
    case 'navigation':
      return compileNavigation(node, theme);
    case 'hero':
      return compileHero(node, theme);
    case 'section':
      return compileSection(node, theme);
    case 'features':
      return compileFeatures(node, theme);
    case 'cards':
      return compileCards(node, theme);
    case 'testimonials':
      return compileTestimonials(node, theme);
    case 'pricing':
      return compilePricing(node, theme);
    case 'form':
      return compileForm(node, theme);
    case 'newsletter':
      return compileNewsletter(node, theme);
    case 'contact':
      return compileContact(node, theme);
    case 'gallery':
      return compileGallery(node, theme);
    case 'social':
      return compileSocial(node, theme);
    case 'video':
      return compileVideo(node, theme);
    default:
      return '';
  }
}

function compileHeader(node: WeaveNode, theme: Theme, darkMode?: boolean): string {
  const header = node as Extract<WeaveNode, { type: 'header' }>;
  const navItems = header.navigation?.map(item => 
    `<a href="${item.link || '#'}" class="nav-link">${escapeHtml(item.label)}</a>`
  ).join('') || '';

  return `
  <header class="site-header${header.sticky ? ' sticky' : ''}">
    <div class="header-container">
      ${header.logo ? `<img src="${header.logo}" alt="Logo" class="logo">` : ''}
      ${header.title ? `<a href="/" class="site-title">${escapeHtml(header.title)}</a>` : ''}
      ${navItems ? `
      <nav class="nav" aria-label="Main navigation">
        ${navItems}
      </nav>` : ''}
      <div class="header-actions">
        ${darkMode ? `<button class="dark-mode-toggle" data-dark-mode-toggle aria-label="Toggle dark mode">
          <svg class="sun-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
          <svg class="moon-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </button>` : ''}
        <button class="mobile-menu-btn" aria-label="Toggle menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>`;
}

function compileFooter(node: WeaveNode, theme: Theme): string {
  const footer = node as Extract<WeaveNode, { type: 'footer' }>;
  const links = footer.links?.map(link => 
    `<a href="${link.url || '#'}">${escapeHtml(link.label)}</a>`
  ).join('') || '';

  const socialLinks = footer.social?.map(s => 
    `<a href="${s.url}" class="social-link" target="_blank" rel="noopener" aria-label="${s.platform}">
      ${getSocialIcon(s.platform)}
    </a>`
  ).join('') || '';

  return `
  <footer class="site-footer">
    <div class="footer-container">
      ${links ? `<div class="footer-links">${links}</div>` : ''}
      ${socialLinks ? `<div class="footer-social">${socialLinks}</div>` : ''}
      ${footer.copyright ? `<p class="copyright">${escapeHtml(footer.copyright)}</p>` : ''}
    </div>
  </footer>`;
}

function compileNavigation(node: WeaveNode, theme: Theme): string {
  const nav = node as Extract<WeaveNode, { type: 'navigation' }>;
  const items = nav.items.map(item => 
    `<a href="${item.link || '#'}" class="nav-link">${escapeHtml(item.label)}</a>`
  ).join('');

  return `
  <nav class="nav ${nav.style || 'horizontal'}" aria-label="Navigation">
    ${items}
  </nav>`;
}

function compileHero(node: WeaveNode, theme: Theme): string {
  const hero = node as Extract<WeaveNode, { type: 'hero' }>;
  const buttons = hero.buttons?.map(btn => 
    `<a href="${btn.link || '#'}" class="btn ${btn.style || 'primary'}">${escapeHtml(btn.text)}</a>`
  ).join('') || '';

  const bgStyle = hero.backgroundImage 
    ? `background-image: url('${hero.backgroundImage}'); background-size: cover; background-position: center;`
    : hero.background 
    ? `background: ${hero.background};`
    : '';

  return `
  <section class="hero ${hero.size || 'large'} ${hero.alignment || 'center'}" style="${bgStyle}">
    <div class="hero-content">
      ${hero.title ? `<h1 class="hero-title">${escapeHtml(hero.title)}</h1>` : ''}
      ${hero.subtitle ? `<p class="hero-subtitle">${escapeHtml(hero.subtitle)}</p>` : ''}
      ${buttons ? `<div class="hero-buttons">${buttons}</div>` : ''}
    </div>
  </section>`;
}

function compileSection(node: WeaveNode, theme: Theme): string {
  const section = node as Extract<WeaveNode, { type: 'section' }>;
  const bgStyle = section.background ? `background: ${section.background};` : '';
  const children = section.children?.map(c => compileNode(c, theme)).join('\n') || '';

  return `
  <section class="section"${section.id ? ` id="${section.id}"` : ''} style="${bgStyle}">
    <div class="section-container">
      ${section.title ? `<h2 class="section-title">${escapeHtml(section.title)}</h2>` : ''}
      ${section.subtitle ? `<p class="section-subtitle">${escapeHtml(section.subtitle)}</p>` : ''}
      ${children}
    </div>
  </section>`;
}

function compileFeatures(node: WeaveNode, theme: Theme): string {
  const features = node as Extract<WeaveNode, { type: 'features' }>;
  const items = features.features.map(f => `
    <div class="feature">
      ${f.icon ? `<div class="feature-icon">${getIcon(f.icon)}</div>` : '<div class="feature-icon">✦</div>'}
      <h3 class="feature-title">${escapeHtml(f.title)}</h3>
      ${f.description ? `<p class="feature-description">${escapeHtml(f.description)}</p>` : ''}
    </div>
  `).join('');

  return `
  <section class="features-section">
    <div class="section-container">
      <div class="features-grid" style="grid-template-columns: repeat(${features.columns || 3}, 1fr);">
        ${items}
      </div>
    </div>
  </section>`;
}

function compileCards(node: WeaveNode, theme: Theme): string {
  const cards = node as Extract<WeaveNode, { type: 'cards' }>;
  const items = cards.cards.map(card => `
    <article class="card ${cards.style || 'default'}">
      ${card.image ? `<img src="${card.image}" alt="${card.title || ''}" class="card-image">` : ''}
      ${card.badge ? `<span class="card-badge">${escapeHtml(card.badge)}</span>` : ''}
      ${card.title ? `<h3 class="card-title">${escapeHtml(card.title)}</h3>` : ''}
      ${card.description ? `<p class="card-description">${escapeHtml(card.description)}</p>` : ''}
      ${card.price ? `<p class="card-price">${escapeHtml(card.price)}</p>` : ''}
      ${card.button ? `<a href="${card.button.link || '#'}" class="btn ${card.button.style || 'primary'}">${escapeHtml(card.button.text)}</a>` : ''}
    </article>
  `).join('');

  return `
  <section class="cards-section">
    <div class="section-container">
      <div class="cards-grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));">
        ${items}
      </div>
    </div>
  </section>`;
}

function compileTestimonials(node: WeaveNode, theme: Theme): string {
  const testimonials = node as Extract<WeaveNode, { type: 'testimonials' }>;
  const items = testimonials.testimonials.map(t => `
    <article class="testimonial ${testimonials.style || 'cards'}">
      ${t.rating ? `<div class="testimonial-rating">${'★'.repeat(t.rating)}${'☆'.repeat(5 - t.rating)}</div>` : ''}
      <blockquote class="testimonial-quote">"${escapeHtml(t.quote)}"</blockquote>
      <div class="testimonial-author">
        ${t.avatar ? `<img src="${t.avatar}" alt="${t.author}" class="testimonial-avatar">` : ''}
        <div class="testimonial-author-info">
          <cite class="testimonial-name">${escapeHtml(t.author)}</cite>
          ${t.role ? `<span class="testimonial-role">${escapeHtml(t.role)}</span>` : ''}
        </div>
      </div>
    </article>
  `).join('');

  return `
  <section class="testimonials-section">
    <div class="section-container">
      <div class="testimonials-grid">
        ${items}
      </div>
    </div>
  </section>`;
}

function compilePricing(node: WeaveNode, theme: Theme): string {
  const pricing = node as Extract<WeaveNode, { type: 'pricing' }>;
  const plans = pricing.plans.map(plan => `
    <article class="pricing-card${plan.popular ? ' popular' : ''}">
      ${plan.popular ? '<span class="pricing-badge">Most Popular</span>' : ''}
      <h3 class="pricing-name">${escapeHtml(plan.name)}</h3>
      <div class="pricing-price">
        <span class="price">${escapeHtml(plan.price)}</span>
        ${plan.period ? `<span class="period">/${escapeHtml(plan.period)}</span>` : ''}
      </div>
      <ul class="pricing-features">
        ${plan.features.map(f => `<li>${escapeHtml(f)}</li>`).join('')}
      </ul>
      ${plan.button ? `<a href="${plan.button.link || '#'}" class="btn ${plan.popular ? 'primary' : 'outline'} full-width">${escapeHtml(plan.button.text)}</a>` : ''}
    </article>
  `).join('');

  return `
  <section class="pricing-section">
    <div class="section-container">
      <div class="pricing-grid">
        ${plans}
      </div>
    </div>
  </section>`;
}

function compileForm(node: WeaveNode, theme: Theme): string {
  const form = node as Extract<WeaveNode, { type: 'form' }>;
  const fields = form.fields.map(field => {
    const inputId = `field-${field.name || field.label.toLowerCase().replace(/\s+/g, '-')}`;
    const required = field.required ? ' required' : '';
    
    if (field.type === 'textarea') {
      return `
        <div class="form-group">
          <label for="${inputId}">${escapeHtml(field.label)}${field.required ? ' *' : ''}</label>
          <textarea id="${inputId}" name="${field.name || field.label}" placeholder="${field.placeholder || ''}"${required}></textarea>
        </div>
      `;
    }
    
    if (field.type === 'select') {
      const options = field.options?.map(opt => `<option value="${opt}">${escapeHtml(opt)}</option>`).join('') || '';
      return `
        <div class="form-group">
          <label for="${inputId}">${escapeHtml(field.label)}${field.required ? ' *' : ''}</label>
          <select id="${inputId}" name="${field.name || field.label}"${required}>
            <option value="">Select...</option>
            ${options}
          </select>
        </div>
      `;
    }
    
    if (field.type === 'checkbox') {
      return `
        <div class="form-group checkbox">
          <input type="checkbox" id="${inputId}" name="${field.name || field.label}"${required}>
          <label for="${inputId}">${escapeHtml(field.label)}</label>
        </div>
      `;
    }
    
    return `
      <div class="form-group">
        <label for="${inputId}">${escapeHtml(field.label)}${field.required ? ' *' : ''}</label>
        <input type="${field.type}" id="${inputId}" name="${field.name || field.label}" placeholder="${field.placeholder || ''}"${required}>
      </div>
    `;
  }).join('');

  return `
  <section class="form-section">
    <div class="section-container">
      <form class="contact-form ${form.style || 'stacked'}" action="${form.action || ''}" method="${form.method || 'POST'}">
        ${fields}
        <button type="submit" class="btn primary">${escapeHtml(form.submitText || 'Submit')}</button>
      </form>
    </div>
  </section>`;
}

function compileNewsletter(node: WeaveNode, theme: Theme): string {
  const newsletter = node as Extract<WeaveNode, { type: 'newsletter' }>;
  
  return `
  <section class="newsletter-section">
    <div class="section-container">
      <div class="newsletter-content">
        ${newsletter.title ? `<h3>${escapeHtml(newsletter.title)}</h3>` : ''}
        ${newsletter.description ? `<p>${escapeHtml(newsletter.description)}</p>` : ''}
        <form class="newsletter-form">
          <input type="email" placeholder="${newsletter.placeholder || 'Enter your email'}" required>
          <button type="submit" class="btn primary">${escapeHtml(newsletter.buttonText || 'Subscribe')}</button>
        </form>
      </div>
    </div>
  </section>`;
}

function compileContact(node: WeaveNode, theme: Theme): string {
  const contact = node as Extract<WeaveNode, { type: 'contact' }>;
  
  return `
  <section class="contact-section">
    <div class="section-container">
      <div class="contact-info">
        ${contact.address ? `<div class="contact-item"><span class="contact-icon">📍</span><span>${escapeHtml(contact.address)}</span></div>` : ''}
        ${contact.phone ? `<div class="contact-item"><span class="contact-icon">📞</span><a href="tel:${contact.phone}">${escapeHtml(contact.phone)}</a></div>` : ''}
        ${contact.email ? `<div class="contact-item"><span class="contact-icon">✉️</span><a href="mailto:${contact.email}">${escapeHtml(contact.email)}</a></div>` : ''}
        ${contact.hours ? `<div class="contact-item"><span class="contact-icon">🕐</span><span>${escapeHtml(contact.hours)}</span></div>` : ''}
      </div>
      ${contact.map ? '<div class="contact-map"><p>Map placeholder</p></div>' : ''}
    </div>
  </section>`;
}

function compileGallery(node: WeaveNode, theme: Theme): string {
  const gallery = node as Extract<WeaveNode, { type: 'gallery' }>;
  const images = gallery.images.map(img => `
    <figure class="gallery-item">
      <img src="${img.src}" alt="${img.alt || ''}" loading="lazy">
      ${img.caption ? `<figcaption>${escapeHtml(img.caption)}</figcaption>` : ''}
    </figure>
  `).join('');

  return `
  <section class="gallery-section">
    <div class="section-container">
      <div class="gallery-grid" style="grid-template-columns: repeat(${gallery.columns || 3}, 1fr);">
        ${images}
      </div>
    </div>
  </section>`;
}

function compileSocial(node: WeaveNode, theme: Theme): string {
  const social = node as Extract<WeaveNode, { type: 'social' }>;
  const links = social.links.map(link => `
    <a href="${link.url}" class="social-link ${social.style || 'icons'}" target="_blank" rel="noopener" aria-label="${link.platform}">
      ${getSocialIcon(link.platform)}
    </a>
  `).join('');

  return `
  <div class="social-links">
    ${links}
  </div>`;
}

function compileVideo(node: WeaveNode, theme: Theme): string {
  const video = node as Extract<WeaveNode, { type: 'video' }>;
  
  // Check if it's a YouTube/Vimeo URL
  if (video.src.includes('youtube.com') || video.src.includes('youtu.be')) {
    const videoId = video.src.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)?.[1];
    if (videoId) {
      return `
      <section class="video-section">
        <div class="section-container">
          <div class="video-wrapper">
            <iframe src="https://www.youtube.com/embed/${videoId}" allowfullscreen loading="lazy"></iframe>
          </div>
        </div>
      </section>`;
    }
  }
  
  return `
  <section class="video-section">
    <div class="section-container">
      <div class="video-wrapper">
        <video src="${video.src}"${video.poster ? ` poster="${video.poster}"` : ''}${video.controls ? ' controls' : ''}${video.autoplay ? ' autoplay' : ''}${video.muted ? ' muted' : ''}></video>
      </div>
    </div>
  </section>`;
}

function generateBaseCSS(): string {
  return `
/* Weave Base CSS - Zero-dependency, semantic-first */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; }

body {
  font-family: var(--wisp-body-font);
  font-size: var(--wisp-base-size);
  line-height: var(--wisp-line-height);
  color: var(--wisp-text);
  background: var(--wisp-background);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--wisp-heading-font);
  font-weight: 600;
  line-height: 1.2;
  color: var(--wisp-text);
}

h1 { font-size: clamp(2rem, 5vw, 3.5rem); }
h2 { font-size: clamp(1.5rem, 4vw, 2.5rem); }
h3 { font-size: clamp(1.25rem, 3vw, 1.75rem); }

a { color: var(--wisp-primary); text-decoration: none; transition: color var(--wisp-transition); }
a:hover { color: var(--wisp-secondary); }

img { max-width: 100%; height: auto; display: block; }

/* Header */
.site-header {
  position: relative;
  background: var(--wisp-surface);
  border-bottom: 1px solid var(--wisp-border);
  z-index: 100;
}

.site-header.sticky { position: sticky; top: 0; }

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

.logo { height: 40px; width: auto; }
.site-title { font-size: 1.5rem; font-weight: 700; color: var(--wisp-text); }
.site-title:hover { color: var(--wisp-primary); }

.nav { display: flex; gap: 1.5rem; align-items: center; }
.nav-link { color: var(--wisp-text-muted); font-weight: 500; transition: color var(--wisp-transition); }
.nav-link:hover { color: var(--wisp-primary); }

.mobile-menu-btn {
  display: none;
  flex-direction: column;
  gap: 4px;
  padding: 8px;
  background: none;
  border: none;
  cursor: pointer;
}

.mobile-menu-btn span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--wisp-text);
  transition: transform var(--wisp-transition);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.dark-mode-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--wisp-radius-full);
  background: var(--wisp-background);
  border: 1px solid var(--wisp-border);
  cursor: pointer;
  transition: all var(--wisp-transition);
  color: var(--wisp-text);
}

.dark-mode-toggle:hover {
  background: var(--wisp-surface);
  border-color: var(--wisp-primary);
}

.dark-mode-toggle .moon-icon { display: block; }
.dark-mode-toggle .sun-icon { display: none; }

[data-theme="dark"] .dark-mode-toggle .moon-icon { display: none; }
[data-theme="dark"] .dark-mode-toggle .sun-icon { display: block; }

@media (max-width: 768px) {
  .mobile-menu-btn { display: flex; }
  .nav { display: none; position: absolute; top: 100%; left: 0; right: 0; background: var(--wisp-surface); flex-direction: column; padding: 1rem; border-bottom: 1px solid var(--wisp-border); }
  .nav.active { display: flex; }
}

/* Hero */
.hero {
  padding: 6rem 1.5rem;
  text-align: center;
  background: linear-gradient(135deg, var(--wisp-surface) 0%, var(--wisp-background) 100%);
}

.hero.small { padding: 4rem 1.5rem; }
.hero.large { padding: 8rem 1.5rem; }
.hero.full { min-height: 100vh; display: flex; align-items: center; justify-content: center; }

.hero.left { text-align: left; }
.hero.left .hero-content { margin-left: 0; }
.hero.right { text-align: right; }
.hero.right .hero-content { margin-left: auto; }

.hero-content { max-width: 800px; margin: 0 auto; }
.hero-title { margin-bottom: 1rem; }
.hero-subtitle { font-size: 1.25rem; color: var(--wisp-text-muted); margin-bottom: 2rem; }
.hero-buttons { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
.hero.left .hero-buttons { justify-content: flex-start; }
.hero.right .hero-buttons { justify-content: flex-end; }

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  border-radius: var(--wisp-radius-md);
  border: 2px solid transparent;
  cursor: pointer;
  transition: all var(--wisp-transition);
  text-decoration: none;
}

.btn.primary {
  background: var(--wisp-primary);
  color: white;
}

.btn.primary:hover {
  background: var(--wisp-secondary);
  transform: translateY(-2px);
  box-shadow: var(--wisp-shadow-md);
}

.btn.secondary {
  background: var(--wisp-surface);
  color: var(--wisp-text);
  border-color: var(--wisp-border);
}

.btn.secondary:hover {
  border-color: var(--wisp-primary);
  color: var(--wisp-primary);
}

.btn.outline {
  background: transparent;
  color: var(--wisp-primary);
  border-color: var(--wisp-primary);
}

.btn.outline:hover {
  background: var(--wisp-primary);
  color: white;
}

.btn.full-width { width: 100%; }

/* Sections */
.section { padding: var(--wisp-section-gap) 1.5rem; }
.section-container { max-width: 1200px; margin: 0 auto; }
.section-title { text-align: center; margin-bottom: 0.5rem; }
.section-subtitle { text-align: center; color: var(--wisp-text-muted); margin-bottom: 3rem; font-size: 1.125rem; }

/* Features */
.features-section { padding: var(--wisp-section-gap) 1.5rem; }
.features-grid { display: grid; gap: 2rem; }

.feature { text-align: center; padding: 2rem; }
.feature-icon { font-size: 2.5rem; margin-bottom: 1rem; color: var(--wisp-primary); }
.feature-title { margin-bottom: 0.75rem; }
.feature-description { color: var(--wisp-text-muted); }

@media (max-width: 768px) {
  .features-grid { grid-template-columns: 1fr !important; }
}

/* Cards */
.cards-section { padding: var(--wisp-section-gap) 1.5rem; }
.cards-grid { display: grid; gap: 2rem; }

.card {
  background: var(--wisp-surface);
  border-radius: var(--wisp-radius-lg);
  overflow: hidden;
  transition: transform var(--wisp-transition), box-shadow var(--wisp-transition);
}

.card:hover { transform: translateY(-4px); box-shadow: var(--wisp-shadow-lg); }

.card.elevated { box-shadow: var(--wisp-shadow-md); }
.card.bordered { border: 1px solid var(--wisp-border); }

.card-image { width: 100%; aspect-ratio: 16/10; object-fit: cover; }
.card-badge { position: absolute; top: 1rem; right: 1rem; background: var(--wisp-accent); color: white; padding: 0.25rem 0.75rem; border-radius: var(--wisp-radius-full); font-size: 0.875rem; font-weight: 500; }
.card-title, .card-description, .card-price { padding: 0 1.5rem; }
.card-title { margin-top: 1.25rem; }
.card-description { color: var(--wisp-text-muted); margin-top: 0.5rem; }
.card-price { font-size: 1.5rem; font-weight: 700; color: var(--wisp-primary); margin: 1rem 0; }
.card .btn { margin: 1rem 1.5rem 1.5rem; }

/* Testimonials */
.testimonials-section { padding: var(--wisp-section-gap) 1.5rem; background: var(--wisp-surface); }
.testimonials-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }

.testimonial { background: var(--wisp-background); padding: 2rem; border-radius: var(--wisp-radius-lg); }
.testimonial-rating { color: var(--wisp-accent); margin-bottom: 1rem; }
.testimonial-quote { font-size: 1.125rem; font-style: italic; margin-bottom: 1.5rem; line-height: 1.7; }
.testimonial-author { display: flex; align-items: center; gap: 1rem; }
.testimonial-avatar { width: 48px; height: 48px; border-radius: 50%; object-fit: cover; }
.testimonial-name { font-weight: 600; font-style: normal; display: block; }
.testimonial-role { color: var(--wisp-text-muted); font-size: 0.875rem; }

/* Pricing */
.pricing-section { padding: var(--wisp-section-gap) 1.5rem; }
.pricing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; max-width: 1000px; margin: 0 auto; }

.pricing-card { background: var(--wisp-surface); border: 1px solid var(--wisp-border); border-radius: var(--wisp-radius-lg); padding: 2rem; text-align: center; position: relative; }
.pricing-card.popular { border-color: var(--wisp-primary); box-shadow: var(--wisp-shadow-lg); transform: scale(1.05); }
.pricing-badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: var(--wisp-primary); color: white; padding: 0.25rem 1rem; border-radius: var(--wisp-radius-full); font-size: 0.875rem; font-weight: 500; }
.pricing-name { font-size: 1.25rem; margin-bottom: 1rem; }
.pricing-price { margin-bottom: 1.5rem; }
.pricing-price .price { font-size: 3rem; font-weight: 700; color: var(--wisp-primary); }
.pricing-price .period { color: var(--wisp-text-muted); }
.pricing-features { list-style: none; margin-bottom: 2rem; text-align: left; }
.pricing-features li { padding: 0.75rem 0; border-bottom: 1px solid var(--wisp-border); }
.pricing-features li:last-child { border-bottom: none; }

/* Forms */
.form-section { padding: var(--wisp-section-gap) 1.5rem; }
.contact-form { max-width: 600px; margin: 0 auto; }
.contact-form.stacked .form-group { margin-bottom: 1.5rem; }
.contact-form.inline { display: flex; gap: 1rem; flex-wrap: wrap; }

.form-group { margin-bottom: 1.5rem; }
.form-group label { display: block; margin-bottom: 0.5rem; font-weight: 500; }
.form-group input, .form-group textarea, .form-group select {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid var(--wisp-border);
  border-radius: var(--wisp-radius-md);
  background: var(--wisp-background);
  color: var(--wisp-text);
  transition: border-color var(--wisp-transition), box-shadow var(--wisp-transition);
}

.form-group input:focus, .form-group textarea:focus, .form-group select:focus {
  outline: none;
  border-color: var(--wisp-primary);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.form-group textarea { min-height: 150px; resize: vertical; }
.form-group.checkbox { display: flex; align-items: center; gap: 0.5rem; }
.form-group.checkbox input { width: auto; }
.form-group.checkbox label { margin-bottom: 0; }

/* Newsletter */
.newsletter-section { padding: var(--wisp-section-gap) 1.5rem; background: var(--wisp-primary); color: white; }
.newsletter-content { max-width: 600px; margin: 0 auto; text-align: center; }
.newsletter-content h3 { color: white; margin-bottom: 0.5rem; }
.newsletter-content p { opacity: 0.9; margin-bottom: 1.5rem; }
.newsletter-form { display: flex; gap: 0.75rem; }
.newsletter-form input { flex: 1; padding: 0.75rem 1rem; border-radius: var(--wisp-radius-md); border: none; font-size: 1rem; }
.newsletter-form .btn { background: white; color: var(--wisp-primary); }
.newsletter-form .btn:hover { background: var(--wisp-surface); }

@media (max-width: 480px) {
  .newsletter-form { flex-direction: column; }
}

/* Contact */
.contact-section { padding: var(--wisp-section-gap) 1.5rem; }
.contact-info { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; max-width: 800px; margin: 0 auto; }
.contact-item { display: flex; align-items: center; gap: 1rem; }
.contact-icon { font-size: 1.5rem; }

/* Gallery */
.gallery-section { padding: var(--wisp-section-gap) 1.5rem; }
.gallery-grid { display: grid; gap: 1rem; }
.gallery-item { position: relative; overflow: hidden; border-radius: var(--wisp-radius-md); }
.gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform var(--wisp-transition-slow); }
.gallery-item:hover img { transform: scale(1.05); }
.gallery-item figcaption { position: absolute; bottom: 0; left: 0; right: 0; padding: 1rem; background: linear-gradient(transparent, rgba(0,0,0,0.7)); color: white; font-size: 0.875rem; }

/* Video */
.video-section { padding: var(--wisp-section-gap) 1.5rem; }
.video-wrapper { max-width: 900px; margin: 0 auto; position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: var(--wisp-radius-lg); }
.video-wrapper iframe, .video-wrapper video { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }

/* Social Links */
.social-links { display: flex; gap: 1rem; justify-content: center; }
.social-link { display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: var(--wisp-radius-full); background: var(--wisp-surface); color: var(--wisp-text); transition: all var(--wisp-transition); }
.social-link:hover { background: var(--wisp-primary); color: white; transform: translateY(-2px); }

/* Footer */
.site-footer { background: var(--wisp-surface); border-top: 1px solid var(--wisp-border); padding: 3rem 1.5rem; }
.footer-container { max-width: 1200px; margin: 0 auto; text-align: center; }
.footer-links { display: flex; gap: 2rem; justify-content: center; margin-bottom: 1.5rem; flex-wrap: wrap; }
.footer-links a { color: var(--wisp-text-muted); }
.footer-links a:hover { color: var(--wisp-primary); }
.footer-social { display: flex; gap: 1rem; justify-content: center; margin-bottom: 1.5rem; }
.copyright { color: var(--wisp-text-muted); font-size: 0.875rem; }

/* Utility */
.visually-hidden { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }

/* Animations */
@keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
.fade-in { animation: fadeIn 0.6s ease forwards; }

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
  html { scroll-behavior: auto; }
}
`;
}

function generateJavaScript(ast: WeaveAST): string {
  return `
// Weave JavaScript - Minimal interactivity
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav');
  
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function() {
      nav.classList.toggle('active');
      const expanded = nav.classList.contains('active');
      menuBtn.setAttribute('aria-expanded', expanded);
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        // Close mobile menu if open
        if (nav) nav.classList.remove('active');
      }
    });
  });

  // Dark mode toggle (if present)
  const darkModeToggle = document.querySelector('[data-dark-mode-toggle]');
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function() {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
      localStorage.setItem('theme', isDark ? 'light' : 'dark');
    });
    
    // Check saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }

  // Intersection Observer for fade-in animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.feature, .card, .testimonial, .pricing-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });

  // Form submission handling
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
      const btn = form.querySelector('button[type="submit"]');
      if (btn && !form.action) {
        e.preventDefault();
        const originalText = btn.textContent;
        btn.textContent = 'Sent!';
        btn.disabled = true;
        setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
          form.reset();
        }, 2000);
      }
    });
  });
});
`;
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

function getSocialIcon(platform: string): string {
  const icons: Record<string, string> = {
    twitter: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    facebook: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
    instagram: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>',
    linkedin: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
    github: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
    youtube: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
    tiktok: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>',
  };
  return icons[platform] || '';
}

function getIcon(name: string): string {
  const icons: Record<string, string> = {
    fast: '⚡',
    secure: '🔒',
    simple: '✨',
    star: '⭐',
    check: '✓',
    heart: '❤️',
    rocket: '🚀',
    globe: '🌐',
    mobile: '📱',
    desktop: '💻',
    code: '💻',
    cloud: '☁️',
    database: '🗄️',
    api: '🔌',
    email: '✉️',
    phone: '📞',
    location: '📍',
    time: '🕐',
    user: '👤',
    users: '👥',
    chart: '📊',
    settings: '⚙️',
    search: '🔍',
    link: '🔗',
    download: '⬇️',
    upload: '⬆️',
    share: '📤',
    edit: '✏️',
    delete: '🗑️',
    add: '➕',
    remove: '➖',
    info: 'ℹ️',
    warning: '⚠️',
    error: '❌',
    success: '✅',
  };
  return icons[name.toLowerCase()] || name;
}

function minify(html: string): string {
  return html
    .replace(/\n\s*\n/g, '\n')
    .replace(/>\s+</g, '><')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

export { escapeHtml };
