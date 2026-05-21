(function () {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  function initHeader() {
    const header = $('.site-header');
    const toggle = $('[data-nav-toggle]');
    const mobileNav = $('.mobile-nav');
    const overlay = $('[data-overlay]');
    if (!header) return;

    const setOpen = (open) => {
      header.classList.toggle('is-menu-open', open);
      mobileNav?.classList.toggle('is-open', open);
      overlay?.toggleAttribute('hidden', !open);
      overlay?.classList.toggle('is-visible', open);
      document.body.style.overflow = open ? 'hidden' : '';
    };

    toggle?.addEventListener('click', () => setOpen(!header.classList.contains('is-menu-open')));
    overlay?.addEventListener('click', () => setOpen(false));
    $$('.mobile-nav__link').forEach((l) => l.addEventListener('click', () => setOpen(false)));

    window.addEventListener('scroll', () => header.classList.toggle('is-scrolled', window.scrollY > 20), { passive: true });
  }

  function initReveal() {
    const els = $$('.reveal');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) {
      els.forEach((e) => e.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    els.forEach((e) => io.observe(e));
  }

  function initTestimonials() {
    const slider = $('.testimonials__slider');
    const track = $('.testimonials__track', slider);
    const cards = $$('.testimonial-card', track);
    const dots = $$('.testimonials__dot');
    if (!slider || !cards.length) return;

    let index = 0;
    let timer;

    const perView = () => (window.innerWidth >= 990 ? 3 : window.innerWidth >= 768 ? 2 : 1);

    const go = (i) => {
      const max = Math.max(0, cards.length - perView());
      index = ((i % (max + 1)) + (max + 1)) % (max + 1);
      track.style.transform = `translateX(-${index * cards[0].offsetWidth}px)`;
      dots.forEach((d, n) => d.classList.toggle('is-active', n === index));
    };

    const autoplay = () => { clearInterval(timer); timer = setInterval(() => go(index + 1), 5000); };
    dots.forEach((d, n) => d.addEventListener('click', () => { go(n); autoplay(); }));
    window.addEventListener('resize', () => go(index), { passive: true });
    go(0);
    autoplay();
  }

  function initStickyATC() {
    const sticky = $('.sticky-atc');
    const btn = $('.product-form__submit');
    if (!sticky || !btn) return;
    new IntersectionObserver(([e]) => sticky.classList.toggle('is-visible', !e.isIntersecting), { threshold: 0 }).observe(btn);
    $('[data-sticky-atc]', sticky)?.addEventListener('click', () => btn.click());
  }

  function initVariants() {
    $$('.variant-picker__option').forEach((btn) => {
      btn.addEventListener('click', () => {
        const group = btn.closest('.variant-picker__options');
        $$('.variant-picker__option', group).forEach((b) => b.classList.remove('is-selected'));
        btn.classList.add('is-selected');
        const sel = $('select[name="id"]', btn.closest('form'));
        if (sel) { sel.value = btn.dataset.variantId; sel.dispatchEvent(new Event('change', { bubbles: true })); }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initReveal();
    initTestimonials();
    initStickyATC();
    initVariants();
  });
})();
