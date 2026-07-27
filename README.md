# joce.cloud — Portfolio Personnel

[![GitHub Pages](https://img.shields.io/badge/live-joce.cloud-blue)](https://joce.cloud)

Site portfolio statique de **Jocelyn Fontaine** — Cloud & AI Architect, AWS Community Builder.

## 🚀 Live

👉 [joce.cloud](https://joce.cloud) | [Version française](https://joce.cloud/fr/)

## ✨ Fonctionnalités

- **Projets GitHub** — récupérés dynamiquement via l'API GitHub (tri par étoiles), avec fallback JSON statique
- **Articles Medium** — flux RSS chargé automatiquement via [rss2json](https://rss2json.com), cache localStorage (1h)
- **Bilingue** — anglais (racine) + français (`/fr/`)
- **Responsive** — design adaptatif mobile/desktop
- **Zéro dépendance** — HTML/CSS/JS vanilla, pas de framework ni build step

## 📁 Structure

```
.
├── index.html              # Page principale (EN)
├── fr/                     # Version française
├── assets/                 # Images et ressources
├── data/
│   └── fallback-projects.json  # Projets en fallback si API GitHub indisponible
├── scripts/
│   ├── main.js             # Point d'entrée, orchestration
│   ├── github-api.js       # Fetch repos GitHub + rendu cartes
│   ├── medium-feed.js      # Fetch flux RSS Medium + cache
│   └── navigation.js       # Navigation responsive
├── styles/
│   └── main.css            # Feuille de style principale
├── CNAME                   # Domaine custom → joce.cloud
└── .nojekyll               # Désactive le build Jekyll
```

## 🛠️ Déploiement

Hébergé sur **GitHub Pages** depuis la branche `master`. Le déploiement est automatique à chaque push.

### Domaine custom

Le fichier `CNAME` pointe vers `joce.cloud`. Le DNS doit avoir un enregistrement CNAME vers `galiceau.github.io`.

## 📝 Ajouter du contenu

- **Nouveaux articles** : publier sur [medium.joce.cloud](https://medium.joce.cloud) → apparaît automatiquement sous 1h
- **Nouveaux projets** : créer un repo public sur [github.com/galiceau](https://github.com/galiceau) → apparaît automatiquement

## 📄 Licence

© Jocelyn Fontaine. Tous droits réservés.
