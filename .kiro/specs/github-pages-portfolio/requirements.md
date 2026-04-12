# Document d'Exigences

## Introduction

Ce document définit les exigences pour la création d'un site portfolio GitHub Pages pour Jocelyn Fontaine (alias "Galiceau" sur GitHub). Le site sera hébergé sur `galiceau.github.io` avec le domaine personnalisé `github.joce.cloud`. Il reflétera l'identité visuelle LinkedIn de l'utilisateur (palette sombre navy/violet/bordeaux sur fond blanc) et mettra en valeur son expertise en tant qu'Architecte Cloud AWS / Sécurité. Le site intégrera un blog technique via Medium et présentera des projets de démonstration.

## Glossaire

- **Site_Portfolio** : Le site web statique GitHub Pages hébergé sur `galiceau.github.io` et accessible via `github.joce.cloud`
- **Visiteur** : Toute personne accédant au Site_Portfolio via un navigateur web
- **Zone_Contenu_Centrale** : La zone principale de contenu du site utilisant la palette sombre (bleu navy #0a0a1e, violet foncé #1e0a1e, bordeaux foncé) sur fond blanc
- **Section_Hero** : La section d'accueil principale affichant le nom, le titre professionnel et un résumé
- **Section_Blog** : La section du site affichant les articles techniques provenant du flux RSS Medium
- **Section_Projets** : La section du site présentant les projets de démonstration et dépôts GitHub
- **Section_Compétences** : La section du site listant les compétences techniques AWS/Cloud/Sécurité
- **Section_Contact** : La section du site contenant les liens de contact et profils professionnels
- **Barre_Navigation** : Le composant de navigation principal permettant d'accéder aux différentes sections du site
- **Flux_RSS_Medium** : Le flux RSS du blog Medium joce.cloud utilisé pour récupérer les articles
- **Fichier_CNAME** : Le fichier de configuration DNS pour le domaine personnalisé github.joce.cloud

## Exigences

### Exigence 1 : Structure et hébergement du site

**User Story :** En tant que Visiteur, je veux accéder au portfolio via `github.joce.cloud`, afin de consulter le profil professionnel de Jocelyn Fontaine.

#### Critères d'acceptation

1. LE Site_Portfolio DOIT être un site statique compatible avec GitHub Pages
2. LE Site_Portfolio DOIT contenir un Fichier_CNAME configuré avec la valeur `github.joce.cloud`
3. QUAND un Visiteur accède à `github.joce.cloud`, LE Site_Portfolio DOIT afficher la page d'accueil dans un délai de 3 secondes
4. QUAND un Visiteur accède à `galiceau.github.io`, LE Site_Portfolio DOIT rediriger vers `github.joce.cloud`
5. LE Site_Portfolio DOIT être déployé depuis le dépôt `galiceau.github.io` existant sur GitHub

### Exigence 2 : Identité visuelle et charte graphique

**User Story :** En tant que Visiteur, je veux voir un design cohérent avec le branding LinkedIn de Jocelyn Fontaine, afin de reconnaître immédiatement son identité professionnelle.

#### Critères d'acceptation

1. LE Site_Portfolio DOIT utiliser un fond blanc/clair (~66% de la surface visible) avec une Zone_Contenu_Centrale sombre
2. LA Zone_Contenu_Centrale DOIT utiliser les couleurs suivantes : bleu navy foncé (#0a0a1e), violet foncé (#1e0a1e), et des accents bordeaux/rouge foncé
3. LE Site_Portfolio DOIT utiliser une typographie professionnelle lisible avec un style tech/futuriste
4. LE Site_Portfolio DOIT présenter des marges et bordures blanches encadrant la Zone_Contenu_Centrale
5. QUAND un Visiteur compare le Site_Portfolio avec le profil LinkedIn, LE Site_Portfolio DOIT refléter la même identité visuelle (palette de couleurs, style, disposition)

### Exigence 3 : Navigation et structure des pages

**User Story :** En tant que Visiteur, je veux naviguer facilement entre les différentes sections du portfolio, afin de trouver rapidement les informations recherchées.

#### Critères d'acceptation

1. LA Barre_Navigation DOIT contenir des liens vers les sections suivantes : Accueil, Compétences, Projets, Blog, Contact
2. QUAND un Visiteur clique sur un lien de la Barre_Navigation, LE Site_Portfolio DOIT faire défiler la page vers la section correspondante de manière fluide
3. TANT QUE le Visiteur fait défiler la page, LA Barre_Navigation DOIT rester visible en position fixe en haut de l'écran
4. QUAND un Visiteur visualise le site sur un écran de largeur inférieure à 768px, LA Barre_Navigation DOIT se transformer en menu hamburger
5. LE Site_Portfolio DOIT être une application mono-page (single-page) avec navigation par ancres

### Exigence 4 : Section Hero et présentation

**User Story :** En tant que Visiteur, je veux voir immédiatement qui est Jocelyn Fontaine et son domaine d'expertise, afin de comprendre son profil professionnel en quelques secondes.

#### Critères d'acceptation

1. LA Section_Hero DOIT afficher le nom "Jocelyn Fontaine" et le pseudonyme "Galiceau"
2. LA Section_Hero DOIT afficher le titre professionnel "Architecte Cloud AWS / Sécurité"
3. LA Section_Hero DOIT afficher la devise du blog Medium : "A Curious Mind is A healthy Mind"
4. LA Section_Hero DOIT contenir des liens vers les profils GitHub, LinkedIn et Medium
5. QUAND un Visiteur charge la page d'accueil, LA Section_Hero DOIT être le premier élément visible sans défilement

### Exigence 5 : Section Compétences techniques

**User Story :** En tant que Visiteur, je veux consulter les compétences techniques de Jocelyn Fontaine, afin d'évaluer son expertise en Cloud et Sécurité.

#### Critères d'acceptation

1. LA Section_Compétences DOIT organiser les compétences par catégories (Cloud AWS, Sécurité, DevOps, Autres)
2. LA Section_Compétences DOIT présenter chaque compétence avec une représentation visuelle (icône ou badge)
3. QUAND un Visiteur consulte la Section_Compétences, LE Site_Portfolio DOIT afficher les compétences dans un agencement en grille responsive

### Exigence 6 : Section Projets de démonstration

**User Story :** En tant que Visiteur, je veux explorer les projets de démonstration de Jocelyn Fontaine, afin de voir des exemples concrets de son travail.

#### Critères d'acceptation

1. LA Section_Projets DOIT afficher les projets sous forme de cartes avec titre, description, technologies utilisées et lien vers le dépôt GitHub
2. QUAND un Visiteur clique sur un lien de projet, LE Site_Portfolio DOIT ouvrir le dépôt GitHub correspondant dans un nouvel onglet
3. LA Section_Projets DOIT récupérer dynamiquement les informations des dépôts publics via l'API GitHub de l'utilisateur `galiceau`
4. SI l'API GitHub est indisponible, ALORS LA Section_Projets DOIT afficher une liste statique de projets en solution de repli
5. QUAND un Visiteur consulte la Section_Projets, LE Site_Portfolio DOIT afficher les projets dans un agencement en grille responsive avec un maximum de 3 colonnes

### Exigence 7 : Intégration du blog Medium

**User Story :** En tant que Visiteur, je veux lire les derniers articles du blog technique de Jocelyn Fontaine, afin de suivre ses publications et réflexions.

#### Critères d'acceptation

1. LA Section_Blog DOIT récupérer les articles depuis le Flux_RSS_Medium de joce.cloud
2. LA Section_Blog DOIT afficher les 6 articles les plus récents sous forme de cartes avec titre, date de publication, extrait et image de couverture
3. QUAND un Visiteur clique sur une carte d'article, LE Site_Portfolio DOIT ouvrir l'article complet sur Medium dans un nouvel onglet
4. SI le Flux_RSS_Medium est indisponible, ALORS LA Section_Blog DOIT afficher un message informatif avec un lien direct vers le profil Medium
5. QUAND le Site_Portfolio charge la Section_Blog, LE Site_Portfolio DOIT mettre en cache les articles récupérés dans le stockage local du navigateur pendant 1 heure

### Exigence 8 : Section Contact

**User Story :** En tant que Visiteur, je veux contacter Jocelyn Fontaine facilement, afin de proposer une collaboration ou poser une question.

#### Critères d'acceptation

1. LA Section_Contact DOIT afficher des liens vers les profils GitHub, LinkedIn et Medium
2. LA Section_Contact DOIT afficher la localisation "Gaillac-Toulza, France"
3. QUAND un Visiteur clique sur un lien de profil, LE Site_Portfolio DOIT ouvrir le profil correspondant dans un nouvel onglet

### Exigence 9 : Design responsive et accessibilité

**User Story :** En tant que Visiteur, je veux consulter le portfolio sur tout type d'appareil, afin d'avoir une expérience de lecture optimale.

#### Critères d'acceptation

1. LE Site_Portfolio DOIT s'adapter aux résolutions d'écran suivantes : mobile (< 768px), tablette (768px - 1024px), desktop (> 1024px)
2. LE Site_Portfolio DOIT utiliser des balises HTML sémantiques (header, nav, main, section, footer)
3. LE Site_Portfolio DOIT fournir des attributs alt descriptifs pour toutes les images
4. LE Site_Portfolio DOIT maintenir un ratio de contraste minimum de 4.5:1 entre le texte et l'arrière-plan
5. QUAND un Visiteur utilise la navigation au clavier, LE Site_Portfolio DOIT permettre l'accès à tous les éléments interactifs via la touche Tab
6. LE Site_Portfolio DOIT obtenir un score Lighthouse Performance supérieur à 90 sur desktop

### Exigence 10 : Métadonnées et SEO

**User Story :** En tant que Visiteur, je veux que le site soit bien référencé sur les moteurs de recherche, afin de trouver facilement le portfolio de Jocelyn Fontaine.

#### Critères d'acceptation

1. LE Site_Portfolio DOIT inclure des balises meta Open Graph pour le partage sur les réseaux sociaux (titre, description, image)
2. LE Site_Portfolio DOIT inclure une balise meta description pertinente contenant "Architecte Cloud AWS" et "Sécurité"
3. LE Site_Portfolio DOIT inclure un fichier favicon cohérent avec l'identité visuelle
4. LE Site_Portfolio DOIT inclure des données structurées JSON-LD de type "Person" avec les informations professionnelles
