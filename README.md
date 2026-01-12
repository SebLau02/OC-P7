# PureStatic

## Démarrage rapide

Initialiser une nouvelle application PureStatic :

```bash
purestatic init mon-app
cd mon-app
pnpm install # ou npm install, ou yarn install
```

## Commandes CLI disponibles

- Générer une nouvelle page HTML :

```bash
purestatic new nom-de-ma-page
```

Cela crée un dossier `nom-de-ma-page` avec un index.html basé sur le layout commun, et ajoute automatiquement l'entrée dans vite.config.mjs.

## Personnalisation du layout

Pour ajouter un en-tête, un formulaire ou tout autre élément commun à toutes les pages, modifiez simplement le fichier :

- `layout/layout.html` (servira de template pour toutes les nouvelles pages)

## Structure générée

- `public/` : Dossier public pour vos assets statiques
- `assets/` : Dossier pour vos ressources (images, polices, etc.)
- `scripts/` : Contient `main.js` (point d'entrée JS)
- `styles/` : Contient `input.css` (config Tailwind) et `output.css`
- `layout/` : Contient `layout.html` (template de page)
- `index.html` : Page d'accueil générée

## Astuces

- Vous pouvez modifier le titre par défaut dans le layout ou lors de la génération de nouvelles pages.
- Pour des pages personnalisées, éditez le HTML généré dans chaque dossier de page.
- Le build Vite prend en compte toutes les pages ajoutées via la commande CLI.

---

Développé avec ❤️ pour accélérer vos projets statiques modernes.
