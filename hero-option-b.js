// The Option B slideshow remains disabled. This module only enhances WhatsApp links.
(() => {
  'use strict';
  if (document.getElementById('l14-whatsapp-icons')) return;
  const destination = 'https://wa.me/447585904849';
  const specs = [
    ['.nav > a', 'WhatsApp L14', false],
    ['.contact-links a', 'WhatsApp', true],
    ['.mobile-actions a', 'WhatsApp', false]
  ];
  const style = document.createElement('style');
  style.id = 'l14-whatsapp-icons';
  style.textContent = `
    a.wa-icon{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-width:44px;min-height:44px}
    a.wa-icon svg{display:block;width:28px;height:28px;flex:none;fill:currentColor}
    .nav > a.wa-icon{background:#fff;color:#128c4b;padding:10px 14px;border:1px solid #128c4b}
    .nav > a.wa-icon:hover{background:#eefaf3}
    .contact-links a.wa-icon{justify-content:flex-start;width:max-content;max-width:100%}
    .contact-links a.wa-icon svg{color:#fff;background:#128c4b;border-radius:50%;padding:4px;width:32px;height:32px}
    .mobile-actions a.wa-icon{background:#fff;color:#128c4b}
    .mobile-actions a.wa-icon:hover{background:#eefaf3}
  `;
  document.head.append(style);
  const ns = 'http://www.w3.org/2000/svg';
  specs.forEach(([selector, label, keepText]) => {
    const link = Array.from(document.querySelectorAll(selector)).find(a => a.getAttribute('href') === destination);
    if (!link) return;
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    const outline = document.createElementNS(ns, 'path');
    outline.setAttribute('fill-rule', 'evenodd');
    outline.setAttribute('d', 'M12 1a10.5 10.5 0 0 0-9.1 15.75L1.5 22.5l5.9-1.55A10.5 10.5 0 1 0 12 1Zm0 2a8.5 8.5 0 1 1-4.35 15.8l-.36-.22-3.08.81.73-3.02-.24-.38A8.5 8.5 0 0 1 12 3Z');
    const phone = document.createElementNS(ns, 'path');
    phone.setAttribute('d', 'M8.2 6.7c-.3 0-.6.1-.8.4-.5.6-.8 1.3-.7 2.1.2 2.8 3.7 6.3 6.6 7.1 1.1.3 2.3.1 2.9-.6.3-.4.6-1.4.4-1.6l-2.4-1.2c-.2-.1-.4 0-.5.2l-.9 1c-.2.2-.4.2-.6.1-1.5-.6-2.7-1.7-3.4-3.1-.1-.2-.1-.4.1-.6l.7-.9c.2-.2.2-.4.1-.6l-1-2.1c-.1-.2-.3-.2-.5-.2Z');
    svg.append(outline, phone);
    link.replaceChildren(svg);
    if (keepText) {
      const text = document.createElement('span');
      text.textContent = 'WhatsApp';
      link.append(text);
    }
    link.classList.add('wa-icon');
    link.setAttribute('aria-label', label);
    link.setAttribute('title', label);
  });
})();
