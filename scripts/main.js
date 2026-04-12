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
  try {
    var projects = await fetchGitHubProjects('galiceau');
    var container = document.getElementById('projects-grid');
    if (!container) return;

    if (!projects || projects.length === 0) {
      container.innerHTML = '<p class="empty-message">Aucun projet disponible</p>';
      return;
    }

    container.innerHTML = projects.map(renderProjectCard).join('');
  } catch (error) {
    console.error('Erreur lors du chargement des projets :', error);
    var container = document.getElementById('projects-grid');
    if (container) {
      container.innerHTML = '<p class="error-message">Impossible de charger les projets.</p>';
    }
  }
}

/**
 * Charge les articles Medium et les affiche dans la grille.
 * En cas d'erreur ou de flux indisponible, affiche un message avec lien vers le blog.
 */
async function loadBlogArticles() {
  try {
    var articles = await fetchMediumArticles('https://medium.joce.cloud/feed');
    var container = document.getElementById('blog-grid');
    if (!container) return;

    if (articles === null) {
      container.innerHTML =
        '<p class="fallback-message">Impossible de charger les articles. ' +
        'Retrouvez-les sur <a href="https://medium.joce.cloud" target="_blank" rel="noopener noreferrer">medium.joce.cloud</a>.</p>';
      return;
    }

    container.innerHTML = articles.map(renderArticleCard).join('');
  } catch (error) {
    console.error('Erreur lors du chargement des articles :', error);
    var container = document.getElementById('blog-grid');
    if (container) {
      container.innerHTML =
        '<p class="fallback-message">Impossible de charger les articles. ' +
        'Retrouvez-les sur <a href="https://medium.joce.cloud" target="_blank" rel="noopener noreferrer">medium.joce.cloud</a>.</p>';
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
