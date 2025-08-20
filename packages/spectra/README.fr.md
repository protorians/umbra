# @protorians/spectra

Une bibliothèque puissante et flexible de rendu côté serveur pour créer et manipuler des éléments similaires au DOM.

## Table des matières

- [Aperçu](#aperçu)
- [Installation](#installation)
- [Concepts fondamentaux](#concepts-fondamentaux)
  - [SpectraElement](#spectraelement)
  - [Enfants](#enfants)
  - [Attributs et Styles](#attributs-et-styles)
- [Utilisation de base](#utilisation-de-base)
- [Fonctionnalités avancées](#fonctionnalités-avancées)
  - [Enfants asynchrones](#enfants-asynchrones)
  - [Manipulation des styles](#manipulation-des-styles)
  - [Gestion des classes](#gestion-des-classes)
- [Référence API](#référence-api)
  - [SpectraElement](#spectraelement-1)
    - [Propriétés](#propriétés)
    - [Méthodes](#méthodes)
- [Référence des types](#référence-des-types)
- [Licence](#licence)

## Aperçu

@protorians/spectra est une bibliothèque complète de rendu côté serveur qui vous permet de créer, manipuler et rendre des éléments similaires au DOM sur le serveur. Elle fournit une API flexible pour construire des structures HTML de manière programmatique, avec prise en charge des attributs, des styles, des classes et des enfants imbriqués.

## Installation

```bash
# Utilisation de npm
npm install @protorians/spectra

# Utilisation de yarn
yarn add @protorians/spectra

# Utilisation de pnpm
pnpm add @protorians/spectra
```

## Concepts fondamentaux

### SpectraElement

Le `SpectraElement` est l'élément de base de la bibliothèque Spectra. Il représente un élément similaire au DOM avec des propriétés et des méthodes pour manipuler ses attributs, styles, enfants et rendu. Chaque élément a un nom de balise, des attributs, des styles, des classes et peut contenir des éléments enfants.

```typescript
import { SpectraElement } from '@protorians/spectra';

// Créer un nouvel élément div
const div = new SpectraElement('div');

// Ajouter des attributs, styles et enfants
div.attribute({ id: 'container', role: 'main' })
   .style({ backgroundColor: 'white', padding: '20px' })
   .classname('container main-content')
   .children('Ceci est un conteneur');
```

### Enfants

Les éléments peuvent contenir différents types d'enfants, y compris des chaînes de caractères, des nombres, d'autres SpectraElements, ou même des promesses qui se résolvent en enfants (pour le rendu asynchrone).

```typescript
import { SpectraElement } from '@protorians/spectra';

// Créer des éléments avec différents types d'enfants
const textElement = new SpectraElement('p').children('Contenu texte simple');
const numberElement = new SpectraElement('span').children(42);
const nestedElement = new SpectraElement('div').children([
  new SpectraElement('h1').children('Titre'),
  new SpectraElement('p').children('Paragraphe')
]);
```

### Attributs et Styles

Les SpectraElements peuvent avoir des attributs et des styles, qui sont gérés par des méthodes dédiées :

```typescript
import { SpectraElement } from '@protorians/spectra';

const element = new SpectraElement('div');

// Ajouter des attributs
element.attribute({
  id: 'main',
  'data-role': 'container',
  'aria-label': 'Contenu principal'
});

// Ajouter des attributs de données (raccourci)
element.data({
  testId: 'container-principal',
  index: 1
});

// Ajouter des styles
element.style({
  color: 'black',
  fontSize: '16px',
  marginX: '10px', // Propriété spéciale pour margin-left et margin-right
  paddingY: '5px'  // Propriété spéciale pour padding-top et padding-bottom
});
```

## Utilisation de base

```typescript
import { SpectraElement } from '@protorians/spectra';

// Créer une structure HTML simple
async function createPage() {
  const page = new SpectraElement('html');

  const head = new SpectraElement('head');
  head.append([
    new SpectraElement('title').children('Ma Page Spectra'),
    new SpectraElement('meta').attribute({ charset: 'utf-8' })
  ]);

  const body = new SpectraElement('body').style({ margin: 0, padding: 0 });

  const header = new SpectraElement('header')
    .classname('page-header')
    .children(new SpectraElement('h1').children('Bienvenue sur Spectra'));

  const main = new SpectraElement('main')
    .classname('content')
    .children('Cette page a été rendue avec Spectra');

  const footer = new SpectraElement('footer')
    .classname('page-footer')
    .children('© 2023 Protorians');

  body.append([header, main, footer]);
  page.append([head, body]);

  // Rendre la page en chaîne HTML
  return await page.render();
}

createPage().then(html => console.log(html));
```

## Fonctionnalités avancées

### Enfants asynchrones

Spectra prend en charge les enfants asynchrones, vous permettant d'inclure du contenu qui est chargé ou généré de manière asynchrone :

```typescript
import { SpectraElement } from '@protorians/spectra';

async function fetchUserData() {
  // Simuler un appel API
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        new SpectraElement('li').children('Utilisateur 1'),
        new SpectraElement('li').children('Utilisateur 2'),
        new SpectraElement('li').children('Utilisateur 3')
      ]);
    }, 1000);
  });
}

const userList = new SpectraElement('ul')
  .classname('user-list')
  .children(fetchUserData());

// Plus tard, lors du rendu :
const html = await userList.render();
console.log(html); // <ul class="user-list"><li>Utilisateur 1</li><li>Utilisateur 2</li><li>Utilisateur 3</li></ul>
```

### Manipulation des styles

Spectra fournit une façon flexible de manipuler les styles, y compris des propriétés raccourcies spéciales :

```typescript
import { SpectraElement } from '@protorians/spectra';

const box = new SpectraElement('div');

// Ajouter plusieurs styles à la fois
box.style({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#f5f5f5',
  borderRadius: '4px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',

  // Propriétés raccourcies spéciales
  paddingX: '20px', // Définit padding-left et padding-right
  paddingY: '15px', // Définit padding-top et padding-bottom
  marginX: 'auto',  // Définit margin-left et margin-right
  marginY: '10px'   // Définit margin-top et margin-bottom
});
```

### Gestion des classes

Vous pouvez facilement ajouter des classes aux éléments :

```typescript
import { SpectraElement } from '@protorians/spectra';

const element = new SpectraElement('div');

// Ajouter une seule classe
element.classname('container');

// Ajouter plusieurs classes sous forme de chaîne
element.classname('flex-column align-center');

// Ajouter plusieurs classes sous forme de tableau
element.classname(['card', 'shadow', 'rounded']);
```

## Référence API

### SpectraElement

La classe principale pour créer et manipuler des éléments similaires au DOM.

#### Propriétés

- `tagName` : Le nom de la balise de l'élément (en lecture seule)
- `blueprint` : Obtient le plan interne de l'élément
- `tree` : Obtient l'arborescence des éléments enfants
- `attributes` : Obtient les attributs de l'élément
- `dataset` : Obtient les attributs de données de l'élément
- `textContent` : Obtient ou définit le contenu textuel de l'élément
- `value` : Obtient ou définit la valeur de l'élément (pour les éléments de formulaire)
- `removed` : Vérifie si l'élément a été supprimé

#### Méthodes

- **Gestion des attributs**
  - `attribute(attributes)` : Définit les attributs sur l'élément
  - `data(attributes)` : Définit les attributs de données sur l'élément

- **Gestion des styles**
  - `style(styles)` : Définit les styles CSS sur l'élément
  - `classname(classname)` : Ajoute des classes CSS à l'élément

- **Gestion des enfants**
  - `children(children)` : Définit les enfants de l'élément
  - `append(children)` : Ajoute des enfants à l'élément
  - `prepend(children)` : Ajoute des enfants au début de l'élément
  - `appendChild(child)` : Ajoute un seul élément enfant

- **Cycle de vie de l'élément**
  - `remove()` : Marque l'élément comme supprimé
  - `render()` : Rend l'élément en une chaîne HTML

## Référence des types

| Catégorie | Type | Description |
|----------|------|-------------|
| **Types d'élément** | `ISpectraElement` | Interface pour les éléments Spectra |
| | `ISpectraBlueprint` | Plan interne pour les éléments |
| **Types d'enfant** | `ISpectraChild` | Type pour les éléments enfants (chaîne, nombre, élément, etc.) |
| | `ISpectraAsyncChild` | Type pour les enfants asynchrones |
| | `ISpectraChildren` | Type d'union pour tous les types d'enfants possibles |
| **Types de style** | `ISpectraStyleKeys` | Clés pour les propriétés de style |
| | `ISpectraStyleValue` | Valeurs pour les propriétés de style |
| | `ISpectraStyleValues` | Objet mappant les clés de style aux valeurs |
| **Types d'attribut** | `ISpectraAttributes` | Objet mappant les noms d'attribut aux valeurs |
| | `ISpectraAttributesBlueprint` | Map interne pour les attributs |

## Licence

Ce projet est sous licence ISC. Voir le fichier LICENSE pour plus de détails.
