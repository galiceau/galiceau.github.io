/**
 * Module Flux Medium — Récupération, cache et rendu des articles
 *
 * Fonctions globales :
 *   fetchMediumArticles(feedUrl, maxArticles) — récupère les articles via rss2json avec cache
 *   getCachedArticles(cacheKey, ttlMs)        — lecture du cache localStorage
 *   cacheArticles(cacheKey, articles)          — stockage dans le cache localStorage
 *   renderArticleCard(article)                 — génère le HTML d'une carte article
 */

/**
 * Récupère les articles Medium via le proxy rss2json.
 * Vérifie d'abord le cache localStorage (TTL 1 h).
 * En cas d'erreur (réseau, HTTP, JSON, proxy), retourne null.
 *
 * @param {string} feedUrl — URL du flux RSS Medium
 * @param {number} [maxArticles=6] — Nombre maximum d'articles
 * @returns {Promise<Object[]|null>} Liste d'articles ou null en cas d'erreur
 */
async function fetchMediumArticles(feedUrl, maxArticles) {
  if (maxArticles === undefined) {
    maxArticles = 6;
  }

  try {
    var cached = getCachedArticles('medium_articles', 3600000);
    if (cached) {
      return cached;
    }

    var response = await fetch(
      'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(feedUrl)
    );

    if (!response.ok) {
      throw new Error('HTTP ' + response.status);
    }

    var result = await response.json();

    if (result.status !== 'ok') {
      throw new Error('rss2json status: ' + result.status);
    }

    var articles = result.items.slice(0, maxArticles).map(function (item) {
      var stripped = item.description
        ? item.description.replace(/<[^>]*>/g, '')
        : '';
      if (stripped.length > 150) {
        stripped = stripped.substring(0, 150) + '…';
      }

      return {
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        description: stripped,
        thumbnail: item.thumbnail || ''
      };
    });

    cacheArticles('medium_articles', articles);

    return articles;
  } catch (error) {
    console.warn('Flux Medium indisponible :', error);
    return null;
  }
}

/**
 * Vérifie si le cache localStorage est encore valide.
 * Retourne les articles en cache ou null si expiré / invalide.
 * Enveloppé dans un try/catch pour la navigation privée.
 *
 * @param {string} cacheKey — Clé du cache
 * @param {number} ttlMs — Durée de vie en millisecondes
 * @returns {Object[]|null} Articles en cache ou null
 */
function getCachedArticles(cacheKey, ttlMs) {
  try {
    var raw = localStorage.getItem(cacheKey);
    if (!raw) {
      return null;
    }

    var parsed = JSON.parse(raw);

    if (!parsed || !parsed.timestamp || !parsed.data) {
      return null;
    }

    if (Date.now() - parsed.timestamp > ttlMs) {
      return null;
    }

    return parsed.data;
  } catch (error) {
    return null;
  }
}

/**
 * Stocke les articles dans le cache localStorage avec un timestamp.
 * Échoue silencieusement si localStorage est indisponible.
 *
 * @param {string} cacheKey — Clé du cache
 * @param {Object[]} articles — Articles à mettre en cache
 */
function cacheArticles(cacheKey, articles) {
  try {
    localStorage.setItem(
      cacheKey,
      JSON.stringify({ timestamp: Date.now(), data: articles })
    );
  } catch (error) {
    // Silently fail (e.g. private browsing, quota exceeded)
  }
}

/**
 * Génère le HTML d'une carte article.
 *
 * @param {Object} article — Données de l'article (title, link, pubDate, description, thumbnail)
 * @returns {string} HTML de la carte
 */
function renderArticleCard(article) {
  var isFr = document.documentElement.lang === 'fr';
  var date = new Date(article.pubDate);
  var formattedDate = date.toLocaleDateString(isFr ? 'fr-FR' : 'en-US');

  return (
    '<div class="article-card">' +
      (article.thumbnail
        ? '<img src="' + article.thumbnail + '" alt="' + article.title + '" class="article-thumbnail">'
        : '') +
      '<h3>' + article.title + '</h3>' +
      '<p class="article-date">' + formattedDate + '</p>' +
      '<p class="article-excerpt">' + article.description + '</p>' +
      '<a href="' + article.link + '" target="_blank" rel="noopener noreferrer" class="article-link">' + (isFr ? 'Lire l\'article' : 'Read article') + '</a>' +
    '</div>'
  );
}
