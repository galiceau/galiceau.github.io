# Plan d'implémentation : Portfolio GitHub Pages

## Vue d'ensemble

Implémentation incrémentale d'un site portfolio statique mono-page en HTML/CSS/JavaScript vanilla pour GitHub Pages. Chaque tâche construit sur les précédentes, en commençant par la structure de base, puis les styles, les modules JS, et enfin l'intégration finale.

## Tâches

- [x] 1. Mettre en place la structure du projet et le fichier HTML de base
  - [x] 1.1 Créer la structure de répertoires et les fichiers de configuration
    - Créer les dossiers `styles/`, `scripts/`, `assets/images/`, `assets/icons/`, `data/`
    - Créer le fichier `CNAME` avec la valeur `github.joce.cloud`
    - Créer un fichier `favicon.ico` placeholder
    - _Exigences : 1.2, 1.5, 10.3_

  - [x] 1.2 Créer le squelette HTML de `index.html` avec les balises sémantiques
    - Structurer le document avec `header`, `nav`, `main`, `section`, `footer`
    - Ajouter les sections : Hero (`#hero`), Compétences (`#competences`), Projets (`#projets`), Blog (`#blog`), Contact (`#contact`)
    - Inclure les balises meta Open Graph (titre, description, image)
    - Inclure la balise meta description contenant "Architecte Cloud AWS" et "Sécurité"
    - Inclure les données structurées JSON-LD de type "Person" avec name, jobTitle, url, sameAs
    - Référencer les Google Fonts (Inter + Space Grotesk)
    - Référencer `styles/main.css` et les scripts JS avec `defer`
    - _Exigences : 1.1, 3.1, 3.5, 9.2, 10.1, 10.2, 10.4_

  - [x] 1.3 Remplir le contenu HTML de chaque section
    - Section Hero : nom "Jocelyn Fontaine", pseudonyme "Galiceau", titre "Architecte Cloud AWS / Sécurité", devise "A Curious Mind is A healthy Mind", liens GitHub/LinkedIn/Medium
    - Section Compétences : grille de compétences organisées par catégories (Cloud AWS, Sécurité, DevOps, Autres) avec icônes/badges
    - Section Projets : conteneur vide pour le rendu dynamique + état de chargement
    - Section Blog : conteneur vide pour le rendu dynamique + état de chargement
    - Section Contact : liens vers GitHub, LinkedIn, Medium + localisation "Gaillac-Toulza, France"
    - Barre de navigation avec liens vers chaque section
    - Ajouter les attributs `alt` descriptifs pour toutes les images
    - Ajouter les attributs `target="_blank"` et `rel="noopener noreferrer"` sur les liens externes
    - _Exigences : 3.1, 4.1, 4.2, 4.3, 4.4, 4.5, 5.1, 5.2, 6.5, 8.1, 8.2, 8.3, 9.3_

- [x] 2. Implémenter la feuille de style CSS complète
  - [x] 2.1 Créer `styles/main.css` avec les variables CSS et les styles de base
    - Définir les variables CSS : `--color-navy: #0a0a1e`, `--color-purple: #1e0a1e`, `--color-bordeaux: #6b1d2a`, `--color-white: #ffffff`, `--color-light-gray: #f5f5f5`
    - Définir les variables de typographie : `--font-primary: 'Inter'`, `--font-heading: 'Space Grotesk'`
    - Définir les variables d'espacement
    - Appliquer le reset CSS de base et les styles globaux (fond blanc, Zone_Contenu_Centrale sombre)
    - Assurer un ratio de contraste minimum de 4.5:1 entre texte et arrière-plan
    - _Exigences : 2.1, 2.2, 2.3, 2.4, 9.4_

  - [x] 2.2 Styliser la navigation, les sections et les composants
    - Styliser la Barre_Navigation en position sticky (`position: sticky; top: 0`)
    - Styliser la Section_Hero comme premier élément visible
    - Styliser les grilles de compétences, cartes projets (max 3 colonnes) et cartes blog
    - Styliser la Section_Contact et le footer
    - Styliser le bouton hamburger (masqué par défaut, visible < 768px)
    - _Exigences : 2.5, 3.3, 5.2, 5.3, 6.5_

  - [x] 2.3 Ajouter les media queries responsive
    - Mobile (< 768px) : navigation hamburger, grilles en colonne unique, tailles de police adaptées
    - Tablette (768px - 1024px) : grilles en 2 colonnes, ajustements de marges
    - Desktop (> 1024px) : grilles en 3 colonnes, mise en page complète
    - Assurer la navigation au clavier avec des styles `:focus-visible` sur tous les éléments interactifs
    - _Exigences : 3.4, 9.1, 9.5_

- [x] 3. Point de contrôle — Vérifier la structure HTML/CSS
  - Vérifier que le site s'affiche correctement avec le contenu statique, que la navigation est fonctionnelle en HTML pur (liens ancres), et que le responsive fonctionne. Demander à l'utilisateur s'il a des questions.

- [x] 4. Implémenter le module de navigation (`scripts/navigation.js`)
  - [x] 4.1 Créer `scripts/navigation.js` avec les fonctions de navigation
    - Implémenter `initNavigation()` : attacher les écouteurs d'événements sur les liens de navigation et le bouton hamburger
    - Implémenter `toggleMobileMenu()` : basculer la visibilité du menu mobile avec gestion de l'attribut `aria-expanded`
    - Implémenter `scrollToSection(sectionId)` : défilement fluide via `element.scrollIntoView({ behavior: 'smooth' })` avec vérification de l'existence de la section
    - Implémenter `updateActiveNavLink()` : observer les sections visibles via `IntersectionObserver` et mettre à jour la classe active
    - _Exigences : 3.1, 3.2, 3.3, 3.4, 3.5, 9.5_

- [x] 5. Implémenter le module API GitHub (`scripts/github-api.js`)
  - [x] 5.1 Créer `scripts/github-api.js` avec récupération des projets et fallback
    - Implémenter `fetchGitHubProjects('galiceau')` : appel `fetch` vers `https://api.github.com/users/galiceau/repos`, tri par étoiles/date, gestion des erreurs réseau et HTTP
    - Implémenter `loadFallbackProjects()` : chargement de `data/fallback-projects.json` via `fetch`
    - Implémenter `renderProjectCard(project)` : génération du HTML d'une carte avec nom, description, technologies (topics), lien GitHub (`target="_blank"`), langage principal et étoiles
    - Créer le fichier `data/fallback-projects.json` avec des données statiques de projets de démonstration
    - _Exigences : 6.1, 6.2, 6.3, 6.4, 6.5_

  - [ ]* 5.2 Écrire le test de propriété pour les cartes projet
    - **Propriété 1 : Les cartes projet contiennent toutes les informations requises**
    - Utiliser fast-check pour générer des objets Project aléatoires valides
    - Vérifier que le HTML retourné par `renderProjectCard` contient le nom, la description, les technologies et le lien GitHub
    - Minimum 100 itérations
    - **Valide : Exigence 6.1**

- [x] 6. Implémenter le module flux Medium (`scripts/medium-feed.js`)
  - [x] 6.1 Créer `scripts/medium-feed.js` avec récupération, cache et rendu des articles
    - Implémenter `fetchMediumArticles(feedUrl, maxArticles)` : appel au proxy rss2json, limitation à 6 articles, gestion des erreurs avec message de repli + lien vers le profil Medium
    - Implémenter `getCachedArticles(cacheKey, ttlMs)` : lecture du localStorage, vérification du TTL (1h = 3600000ms), retour `null` si expiré ou invalide, `try/catch` pour la navigation privée
    - Implémenter `cacheArticles(cacheKey, articles)` : stockage dans localStorage avec timestamp, `try/catch` pour la navigation privée
    - Implémenter `renderArticleCard(article)` : génération du HTML d'une carte avec titre, date de publication, extrait, image de couverture et lien vers l'article (`target="_blank"`)
    - _Exigences : 7.1, 7.2, 7.3, 7.4, 7.5_

  - [ ]* 6.2 Écrire le test de propriété pour les cartes article
    - **Propriété 2 : Les cartes article contiennent toutes les informations requises**
    - Utiliser fast-check pour générer des objets Article aléatoires valides
    - Vérifier que le HTML retourné par `renderArticleCard` contient le titre, la date, l'extrait et l'image de couverture
    - Minimum 100 itérations
    - **Valide : Exigence 7.2**

  - [ ]* 6.3 Écrire le test de propriété pour le cache localStorage
    - **Propriété 3 : Aller-retour du cache localStorage**
    - Utiliser fast-check pour générer des listes d'articles et des timestamps aléatoires
    - Vérifier que `cacheArticles` suivi de `getCachedArticles` avec TTL non expiré retourne les mêmes articles
    - Vérifier que `getCachedArticles` retourne `null` quand le TTL est dépassé
    - Minimum 100 itérations
    - **Valide : Exigence 7.5**

- [x] 7. Point de contrôle — Vérifier les modules JS
  - Vérifier que les projets GitHub se chargent dynamiquement (ou via fallback), que les articles Medium s'affichent avec le cache, et que la navigation fonctionne (smooth scroll, hamburger, lien actif). Demander à l'utilisateur s'il a des questions.

- [x] 8. Implémenter le point d'entrée et les métadonnées SEO
  - [x] 8.1 Créer `scripts/main.js` pour orchestrer l'initialisation
    - Écouter l'événement `DOMContentLoaded`
    - Appeler `initNavigation()`, charger les projets GitHub, charger les articles Medium
    - Gérer l'ordre d'initialisation et les erreurs globales
    - _Exigences : 1.3, 3.2_

  - [ ]* 8.2 Écrire le test de propriété pour les données JSON-LD
    - **Propriété 4 : Aller-retour des données structurées JSON-LD**
    - Utiliser fast-check pour générer des objets Person aléatoires avec name, jobTitle, url, sameAs
    - Vérifier que la sérialisation en JSON-LD puis le parsing retourne les mêmes valeurs
    - Minimum 100 itérations
    - **Valide : Exigence 10.4**

- [x] 9. Intégration finale et vérifications
  - [x] 9.1 Vérifier l'intégration complète et la cohérence
    - S'assurer que tous les modules sont correctement importés et câblés dans `main.js`
    - Vérifier que le fichier CNAME est présent avec `github.joce.cloud`
    - Vérifier que le favicon est référencé dans le HTML
    - Vérifier que les variables CSS contiennent les bonnes couleurs
    - Vérifier que tous les liens externes s'ouvrent dans un nouvel onglet
    - _Exigences : 1.1, 1.2, 2.2, 6.2, 7.3, 8.3, 10.3_

  - [ ]* 9.2 Écrire les tests unitaires de vérification
    - Tester la présence des balises sémantiques dans le HTML (header, nav, main, section, footer)
    - Tester la présence des balises meta Open Graph et de la meta description
    - Tester le mécanisme de fallback des projets quand l'API GitHub échoue
    - Tester le message de repli quand le flux RSS Medium échoue
    - _Exigences : 6.4, 7.4, 9.2, 10.1, 10.2_

- [x] 10. Point de contrôle final — Validation complète
  - Vérifier que tous les tests passent, que le site est fonctionnel et responsive, et que toutes les exigences sont couvertes. Demander à l'utilisateur s'il a des questions.

## Notes

- Les tâches marquées avec `*` sont optionnelles et peuvent être ignorées pour un MVP plus rapide
- Chaque tâche référence les exigences spécifiques pour la traçabilité
- Les points de contrôle assurent une validation incrémentale
- Les tests de propriété valident les propriétés de correction universelles définies dans le design
- Les tests unitaires valident des exemples spécifiques et des cas limites
- Bibliothèque de tests de propriété : **fast-check** (JavaScript)
