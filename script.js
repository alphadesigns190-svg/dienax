const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');
const yearEl = document.getElementById('year');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('is-open');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => nav.classList.remove('is-open'));
  });
}

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

function showThankYou() {
  const status = document.getElementById('form-status');
  if (!status) return;
  status.textContent = 'Thank you. Your message has been received.';
}

window.showThankYou = showThankYou;

const productCards = document.querySelectorAll('.product-card');
const productFilterButtons = document.querySelectorAll('.product-filter-btn');
const productScroll = document.querySelector('.product-scroll');

function resetExpandedCards() {
  productCards.forEach((item) => {
    item.classList.remove('expanded');
    item.setAttribute('aria-expanded', 'false');
  });
}

function toggleProductCard(card) {
  if (card.classList.contains('is-hidden')) return;

  const isExpanded = card.classList.contains('expanded');
  resetExpandedCards();

  if (!isExpanded) {
    card.classList.add('expanded');
    card.setAttribute('aria-expanded', 'true');
  }
}

/* ===============================
   PRODUCT FILTER WITH ANIMATION
=================================*/

function setActiveCategory(category) {
  productFilterButtons.forEach((button) => {
    const isActive = button.dataset.filter === category;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });

  resetExpandedCards();

  productCards.forEach((card, index) => {
    const isMatch = card.dataset.category === category;

    if (isMatch) {
      card.classList.remove('is-hidden');

      // Small stagger effect
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 60);

    } else {
      card.style.opacity = '0';
      card.style.transform = 'translateY(15px)';

      setTimeout(() => {
        card.classList.add('is-hidden');
      }, 300);
    }
  });

  if (productScroll) {
    productScroll.scrollLeft = 0;
  }
}

/* ===============================
   EVENT LISTENERS
=================================*/

productCards.forEach((card) => {
  // Set initial animation styles
  card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  card.style.opacity = '0';
  card.style.transform = 'translateY(15px)';

  card.addEventListener('click', () => toggleProductCard(card));

  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleProductCard(card);
    }
  });
});

productFilterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const category = button.dataset.filter;
    if (!category) return;
    setActiveCategory(category);
  });
});

// Default load animation
setActiveCategory('engine');

const reveals = document.querySelectorAll('.reveal');

function revealOnScroll() {
  const triggerBottom = window.innerHeight * 0.85;

  reveals.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;

    if (sectionTop < triggerBottom) {
      section.classList.add('active');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();