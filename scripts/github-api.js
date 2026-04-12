/**
 * Module API GitHub — Récupération des projets avec fallback statique
 *
 * Fonctions globales :
 *   fetchGitHubProjects(username) — récupère les repos GitHub triés
 *   loadFallbackProjects()        — charge data/fallback-projects.json
 *   renderProjectCard(project)    — génère le HTML d'une carte projet
 */

/**
 * Récupère les projets publics depuis l'API GitHub.
 * Tri par nombre d'étoiles décroissant, puis par date de mise à jour décroissante.
 * En cas d'erreur (réseau, HTTP, JSON), retombe sur loadFallbackProjects().
 *
 * @param {string} username — Nom d'utilisateur GitHub
 * @returns {Promise<Object[]>} Liste de projets
 */
async function fetchGitHubProjects(username) {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100`
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const repos = await response.json();

    // Exclure le repo du site lui-même
    const filtered = repos.filter(r => r.name !== 'galiceau.github.io');

    filtered.sort((a, b) => {
      if (b.stargazers_count !== a.stargazers_count) {
        return b.stargazers_count - a.stargazers_count;
      }
      return new Date(b.updated_at) - new Date(a.updated_at);
    });

    return filtered;
  } catch (error) {
    console.warn('API GitHub indisponible, chargement du fallback :', error);
    return loadFallbackProjects();
  }
}

/**
 * Charge les projets de repli depuis le fichier JSON statique.
 * Retourne un tableau vide en cas d'erreur.
 *
 * @returns {Promise<Object[]>} Liste de projets statiques
 */
async function loadFallbackProjects() {
  try {
    const response = await fetch('/data/fallback-projects.json');
    return await response.json();
  } catch (error) {
    console.warn('Impossible de charger le fallback :', error);
    return [];
  }
}

/**
 * Génère le HTML d'une carte projet.
 *
 * @param {Object} project — Données du projet (name, description, html_url, topics, language, stargazers_count)
 * @returns {string} HTML de la carte
 */
function renderProjectCard(project) {
  const description = project.description || 'Pas de description';
  const topics = project.topics || [];
  const language = project.language || '';
  const stars = project.stargazers_count || 0;

  const topicBadges = topics
    .map(function (topic) {
      return '<span class="topic-badge">' + topic + '</span>';
    })
    .join('');

  return (
    '<div class="project-card">' +
      '<h3>' + project.name + '</h3>' +
      '<p>' + description + '</p>' +
      '<div class="project-topics">' + topicBadges + '</div>' +
      '<div class="project-meta">' +
        (language ? '<span class="project-language">' + language + '</span>' : '') +
        '<span class="project-stars">⭐ ' + stars + '</span>' +
      '</div>' +
      '<a href="' + project.html_url + '" target="_blank" rel="noopener noreferrer" class="project-link">Voir sur GitHub</a>' +
    '</div>'
  );
}
