/* ==========================================================================
   Point d'entrée — scripts/main.js
   Orchestre l'initialisation de tous les modules au chargement de la page.
   Exigences : 1.3, 3.2
   ========================================================================== */

/**
 * Charge les projets GitHub et les affiche dans la grille.
 * En cas d'erreur, affiche un message de repli.
 */
async function loadProjects() {
  var isFr = document.documentElement.lang === 'fr';
  try {
    var projects = await fetchGitHubProjects('galiceau');
    var container = document.getElementById('projects-grid');
    if (!container) return;

    if (!projects || projects.length === 0) {
      container.innerHTML = '<p class="empty-message">' + (isFr ? 'Aucun projet disponible' : 'No projects available') + '</p>';
      return;
    }

    container.innerHTML = projects.map(renderProjectCard).join('');
  } catch (error) {
    console.error('Error loading projects:', error);
    var container = document.getElementById('projects-grid');
    if (container) {
      container.innerHTML = '<p class="error-message">' + (isFr ? 'Impossible de charger les projets.' : 'Unable to load projects.') + '</p>';
    }
  }
}

/**
 * Charge les articles Medium et les affiche dans la grille.
 * En cas d'erreur ou de flux indisponible, affiche un message avec lien vers le blog.
 */
async function loadBlogArticles() {
  var isFr = document.documentElement.lang === 'fr';
  var fallbackMsg = isFr
    ? 'Impossible de charger les articles. Retrouvez-les sur <a href="https://medium.joce.cloud" target="_blank" rel="noopener noreferrer">medium.joce.cloud</a>.'
    : 'Unable to load articles. Find them on <a href="https://medium.joce.cloud" target="_blank" rel="noopener noreferrer">medium.joce.cloud</a>.';
  try {
    var articles = await fetchMediumArticles('https://medium.joce.cloud/feed');
    var container = document.getElementById('blog-grid');
    if (!container) return;

    if (articles === null) {
      container.innerHTML = '<p class="fallback-message">' + fallbackMsg + '</p>';
      return;
    }

    container.innerHTML = articles.map(renderArticleCard).join('');
  } catch (error) {
    console.error('Error loading articles:', error);
    var container = document.getElementById('blog-grid');
    if (container) {
      container.innerHTML = '<p class="fallback-message">' + fallbackMsg + '</p>';
    }
  }
}

/**
 * Met à jour l'année dans le footer.
 */
function updateFooterYear() {
  var yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

/**
 * Initialisation globale au chargement du DOM.
 */
document.addEventListener('DOMContentLoaded', function () {
  initNavigation();
  loadProjects();
  loadBlogArticles();
  updateFooterYear();
});
