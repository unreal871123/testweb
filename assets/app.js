document.addEventListener('DOMContentLoaded', () => {

  /* ---- mobile nav toggle ---- */
  const nav = document.querySelector('.nav');
  document.querySelector('.nav-toggle')?.addEventListener('click', () => nav.classList.toggle('open'));
  document.querySelectorAll('.nav-links a').forEach(a =>
    a.addEventListener('click', () => nav.classList.remove('open')));

  /* ---- smart email with pre-filled templates ----
     Phone -> native mail app (mailto). Laptop -> Gmail compose tab.
     Each button picks a template via its data-tmpl attribute. */
  const EMAIL_TEMPLATES = {
    general: {
      su: 'RGB RUN — Booking / Reservation',
      body: [
        'Hi RGB RUN team!',
        '',
        "I'd like to reserve a spot to play. Here are my details:",
        '',
        '• Name:',
        '• Phone:',
        '• Preferred date:',
        '• Preferred time:',
        '• Number of players:',
        '',
        'My questions:',
        '',
        'Thanks!'
      ].join('\n')
    },
    party: {
      su: 'RGB RUN — Party Room Booking',
      body: [
        'Hi RGB RUN team!',
        '',
        "I'd like to book a party room. Here are my details:",
        '',
        '• Name:',
        '• Phone:',
        '• Preferred date:',
        '• Preferred time:',
        '• Number of guests / players:',
        '• Room (Small Game / Big Game / + Party Room / Whole Place):',
        '• Occasion (birthday, etc.):',
        '',
        'My questions:',
        '',
        'Thanks!'
      ].join('\n')
    }
  };
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    || (navigator.maxTouchPoints > 1 && /Macintosh/.test(navigator.userAgent));
  document.querySelectorAll('a[href^="mailto:"]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const to = a.getAttribute('href').replace(/^mailto:/, '').split('?')[0];
      const t = EMAIL_TEMPLATES[a.dataset.tmpl] || EMAIL_TEMPLATES.general;
      const su = encodeURIComponent(t.su), body = encodeURIComponent(t.body);
      if (isMobile) {
        window.location.href = 'mailto:' + to + '?subject=' + su + '&body=' + body;
      } else {
        window.open('https://mail.google.com/mail/?view=cm&fs=1&to='
          + encodeURIComponent(to) + '&su=' + su + '&body=' + body, '_blank', 'noopener');
      }
    });
  });

  /* ---- gallery lightbox ---- */
  const lb = document.getElementById('lightbox');
  const lbImg = lb.querySelector('.lb-img');
  let slides = [], idx = 0;
  const show = () => { lbImg.src = slides[idx]; };
  document.querySelectorAll('.gal-item').forEach(item =>
    item.addEventListener('click', () => {
      slides = item.dataset.slides.split(',');
      idx = 0; show(); lb.hidden = false;
    }));
  const move = d => { idx = (idx + d + slides.length) % slides.length; show(); };
  lb.querySelector('.lb-next').addEventListener('click', e => { e.stopPropagation(); move(1); });
  lb.querySelector('.lb-prev').addEventListener('click', e => { e.stopPropagation(); move(-1); });
  lb.querySelector('.lb-close').addEventListener('click', () => lb.hidden = true);
  lb.addEventListener('click', e => { if (e.target === lb) lb.hidden = true; });
  document.addEventListener('keydown', e => {
    if (lb.hidden) return;
    if (e.key === 'Escape') lb.hidden = true;
    if (e.key === 'ArrowRight') move(1);
    if (e.key === 'ArrowLeft') move(-1);
  });

  /* ---- scroll reveal ---- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

});
