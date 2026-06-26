/*
TemplateMo 618 The Catalyst
https://templatemo.com/tm-618-the-catalyst
*/

/* ===== Mobile Nav Toggle ===== */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    navToggle.setAttribute('aria-expanded',
        navToggle.classList.contains('active'));
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
        navToggle.setAttribute('aria-expanded', 'false');
    });
});

/* ===== FAQ Accordion ===== */
function faqOpen(item) {
    const answer = item.querySelector('.faq-answer');
    item.classList.add('open');
    answer.style.maxHeight = answer.scrollHeight + 'px';
    item.querySelector('.faq-question').setAttribute('aria-expanded', 'true');
}

function faqClose(item) {
    const answer = item.querySelector('.faq-answer');
    item.classList.remove('open');
    answer.style.maxHeight = '0';
    item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
}

document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        if (item.classList.contains('open')) {
            faqClose(item);
        } else {
            faqOpen(item);
        }
    });
});

document.getElementById('faqExpandAll').addEventListener('click', () => {
    document.querySelectorAll('.faq-item').forEach(item => faqOpen(item));
});

document.getElementById('faqCollapseAll').addEventListener('click', () => {
    document.querySelectorAll('.faq-item').forEach(item => faqClose(item));
});

/* ===== Product Gallery — Thumbnail Switcher =====
   Each .product-card has:
     .product-main-image > img   — the large display image
     .product-thumbnails > .thumb[data-src]  — clickable thumbnails

   Clicking a thumbnail:
     1. Updates the main image src and alt to match the thumbnail
     2. Marks the clicked thumb .active and removes it from siblings
*/
document.querySelectorAll('.product-card').forEach(card => {
    const mainImg   = card.querySelector('.product-main-image img');
    const thumbs    = card.querySelectorAll('.thumb');

    thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            const newSrc = thumb.dataset.src;
            const newAlt = thumb.querySelector('img') ? thumb.querySelector('img').alt : '';

            if (mainImg && newSrc) {
                /* Fade out → swap src → fade in */
                mainImg.style.opacity = '0';
                mainImg.style.transition = 'opacity 0.18s ease';
                setTimeout(() => {
                    mainImg.src = newSrc;
                    mainImg.alt = newAlt;
                    mainImg.style.opacity = '1';
                }, 180);
            }

            /* Update active state */
            thumbs.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        });
    });
});

/* ===== Scroll Reveal ===== */
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReduced) {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                entry.target.style.transitionDelay = `${i * 60}ms`;
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => observer.observe(el));

    /* Fallback: force all reveals visible after 3s (iframe preview) */
    setTimeout(() => {
        reveals.forEach(el => el.classList.add('visible'));
    }, 3000);
} else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
}
