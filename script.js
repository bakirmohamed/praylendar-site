const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('[data-menu-button]');
const menu = document.querySelector('[data-menu]');

const setHeaderState = () => {
  header?.classList.toggle('scrolled', window.scrollY > 16);
};

setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

menuButton?.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

menu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menu.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

document.querySelectorAll('.faq-item button').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const willOpen = !item.classList.contains('open');

    document.querySelectorAll('.faq-item.open').forEach((openItem) => {
      openItem.classList.remove('open');
      openItem.querySelector('button')?.setAttribute('aria-expanded', 'false');
    });

    if (willOpen) {
      item.classList.add('open');
      button.setAttribute('aria-expanded', 'true');
    }
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();

document.querySelectorAll('.footer-links').forEach((footerLinks) => {
  if (footerLinks.querySelector('.social-links')) return;

  const socialLinks = document.createElement('div');
  socialLinks.className = 'social-links';
  socialLinks.innerHTML = `
    <strong>Social</strong>
    <a href="https://x.com/praylendar" target="_blank" rel="noopener noreferrer">X</a>
    <a href="https://www.instagram.com/praylendar/" target="_blank" rel="noopener noreferrer">Instagram</a>
    <a href="https://www.tiktok.com/@praylendar" target="_blank" rel="noopener noreferrer">TikTok</a>
  `;
  footerLinks.append(socialLinks);
});
