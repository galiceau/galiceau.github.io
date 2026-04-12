/* ==========================================================================
   Navigation Module — scripts/navigation.js
   Gère la navigation sticky, le défilement fluide, le menu hamburger
   et la mise à jour du lien actif via IntersectionObserver.
   Exigences : 3.1, 3.2, 3.3, 3.4, 3.5, 9.5
   ========================================================================== */

/**
 * Bascule la visibilité du menu mobile et met à jour aria-expanded.
 */
function toggleMobileMenu() {
  var navMenu = document.getElementById('nav-menu');
  var hamburgerBtn = document.getElementById('hamburger-btn');
  if (!navMenu || !hamburgerBtn) return;

  var isOpen = navMenu.classList.toggle('open');
  hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
}

/**
 * Défilement fluide vers une section identifiée par son id.
 * Ferme le menu mobile s'il est ouvert.
 * @param {string} sectionId — L'identifiant de la section cible (sans #).
 */
function scrollToSection(sectionId) {
  var section = document.getElementById(sectionId);
  if (!section) return;

  section.scrollIntoView({ behavior: 'smooth' });

  // Fermer le menu mobile s'il est ouvert
  var navMenu = document.getElementById('nav-menu');
  if (navMenu && navMenu.classList.contains('open')) {
    toggleMobileMenu();
  }
}

/**
 * Met à jour la classe "active" sur le lien de navigation correspondant
 * à la section actuellement visible, via IntersectionObserver.
 */
function updateActiveNavLink() {
  var sections = document.querySelectorAll('main > section[id]');
  var navLinks = document.querySelectorAll('#nav-menu a');

  if (!sections.length || !navLinks.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var targetId = entry.target.id;
        navLinks.forEach(function (link) {
          if (link.getAttribute('href') === '#' + targetId) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(function (section) {
    observer.observe(section);
  });
}

/**
 * Initialise la navigation du site :
 * - Écouteurs de clic sur les liens de navigation (smooth scroll)
 * - Écouteur de clic sur le bouton hamburger (toggle menu mobile)
 * - IntersectionObserver pour la mise à jour du lien actif
 */
function initNavigation() {
  // Attacher le clic sur le bouton hamburger
  var hamburgerBtn = document.getElementById('hamburger-btn');
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', toggleMobileMenu);
  }

  // Attacher le clic sur chaque lien de navigation
  var navLinks = document.querySelectorAll('#nav-menu a');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        scrollToSection(href.substring(1));
      }
    });
  });

  // Lancer l'observation des sections pour le lien actif
  updateActiveNavLink();
}
