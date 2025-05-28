# @widgetui/core

Une bibliothèque de composants UI puissante et flexible avec des capacités de thématisation complètes.

## Table des matières

- [Aperçu](#aperçu)
- [Installation](#installation)
- [Concepts fondamentaux](#concepts-fondamentaux)
  - [Thèmes](#thèmes)
  - [Composants UI](#composants-ui)
  - [Positionnement](#positionnement)
  - [Coloration](#coloration)
- [Utilisation de base](#utilisation-de-base)
- [Fonctionnalités avancées](#fonctionnalités-avancées)
  - [Personnalisation des thèmes](#personnalisation-des-thèmes)
  - [Composition de composants](#composition-de-composants)
  - [Design responsive](#design-responsive)
- [Référence API](#référence-api)
  - [WidgetTheme](#widgettheme)
    - [Propriétés](#propriétés)
    - [Méthodes](#méthodes)
  - [WidgetUi](#widgetui)
  - [Composants UI](#composants-ui-1)
- [Référence des types](#référence-des-types)
- [Licence](#licence)

## Aperçu

@widgetui/core est une bibliothèque complète de composants UI qui fournit un système de thématisation flexible et une large gamme de composants UI. Elle est construite sur plusieurs packages Protorians, notamment @protorians/widgets, @protorians/core, @protorians/colorimetric et @protorians/animetric. La bibliothèque offre une API cohérente pour créer et styliser des composants UI avec prise en charge des thèmes, du positionnement, de la coloration et des animations.

## Installation

```bash
# Utilisation de npm
npm install @widgetui/core

# Utilisation de yarn
yarn add @widgetui/core

# Utilisation de pnpm
pnpm add @widgetui/core
```

## Concepts fondamentaux

### Thèmes

Les thèmes sont au cœur de la bibliothèque @widgetui/core. Un thème définit l'apparence visuelle des composants UI, y compris les couleurs, la typographie, l'espacement, les bordures et les animations. La classe `WidgetTheme` fournit des méthodes pour créer et gérer des thèmes, ainsi que pour créer des composants UI thématisés.

```typescript
import { WidgetTheme } from '@widgetui/core';

// Créer un nouveau thème
const theme = new WidgetTheme({
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: '#e2e8f0',
  radius: '0.25rem',
  fontFamily: 'sans-serif',
  fontSize: '1rem',
  spacing: '1rem',
  gap: '0.5rem',
  transitionDuration: '150ms',
});

// Attacher le thème au document
theme.attach(document.body);
```

### Composants UI

La bibliothèque fournit une large gamme de composants UI, notamment des boutons, des alertes, des dialogues, des modales, des formulaires, de la navigation, et plus encore. Chaque composant est créé via l'instance du thème, assurant un style cohérent dans toute l'application.

```typescript
import { WidgetTheme, LayerVariant } from '@widgetui/core';

const theme = new WidgetTheme();

// Créer un bouton
const button = theme.Button({
  text: 'Cliquez-moi',
  variant: LayerVariant.Primary,
  onClick: () => console.log('Bouton cliqué'),
});

// Créer une alerte
const alert = theme.Alert({
  title: 'Succès',
  message: 'Opération terminée avec succès',
  variant: LayerVariant.Success,
});

// Ajouter les composants au DOM
document.body.appendChild(button.element);
document.body.appendChild(alert.element);
```

### Positionnement

La bibliothèque fournit des utilitaires pour positionner les éléments UI via la classe `WidgetUi`. Elle inclut des positions prédéfinies comme Center, LeftTop, RightBottom, etc., et des méthodes pour convertir les positions en valeurs d'alignement.

```typescript
import { WidgetUi } from '@widgetui/core';

// Utiliser des positions prédéfinies
const centerPosition = WidgetUi.Position.Center;
const topRightPosition = WidgetUi.Position.RightTop;

// Convertir les positions en valeurs d'alignement
const horizontalAlignment = WidgetUi.horizontally(centerPosition[0]);
const verticalAlignment = WidgetUi.vertically(centerPosition[1]);
```

### Coloration

La bibliothèque fournit une approche structurée de la gestion des couleurs via l'interface `IColoringLayer`, qui définit les couleurs d'avant-plan, d'arrière-plan et de bordure pour les composants UI. L'énumération `LayerVariant` fournit des variantes de couleur prédéfinies comme Primary, Secondary, Success, Error, etc.

```typescript
import { WidgetTheme, LayerVariant } from '@widgetui/core';

const theme = new WidgetTheme();

// Obtenir les valeurs de couleur pour une variante
const primaryColors = theme.coloringResolves(LayerVariant.Primary);
const successColors = theme.coloringResolves(LayerVariant.Success);

console.log(primaryColors.fore.hex); // Couleur d'avant-plan
console.log(primaryColors.back?.hex); // Couleur d'arrière-plan
console.log(primaryColors.edge?.hex); // Couleur de bordure
```

## Utilisation de base

```typescript
import { WidgetTheme, LayerVariant, LayerSize } from '@widgetui/core';

// Créer un thème
const theme = new WidgetTheme();

// Créer un bouton
const button = theme.Button({
  text: 'Soumettre',
  variant: LayerVariant.Primary,
  size: LayerSize.M,
  onClick: () => console.log('Formulaire soumis'),
});

// Créer un dialogue
const dialog = theme.Dialog({
  title: 'Confirmation',
  content: 'Êtes-vous sûr de vouloir continuer ?',
  actions: [
    theme.Button({
      text: 'Annuler',
      variant: LayerVariant.Secondary,
      onClick: () => dialog.close(),
    }),
    theme.Button({
      text: 'Confirmer',
      variant: LayerVariant.Primary,
      onClick: () => {
        console.log('Action confirmée');
        dialog.close();
      },
    }),
  ],
});

// Ajouter le bouton au DOM
document.body.appendChild(button.element);

// Afficher le dialogue lorsque le bouton est cliqué
button.on('click', () => dialog.open());
```

## Fonctionnalités avancées

### Personnalisation des thèmes

Vous pouvez personnaliser les thèmes en définissant des propriétés spécifiques ou en étendant la classe `WidgetTheme`.

```typescript
import { WidgetTheme } from '@widgetui/core';

// Créer un thème avec des paramètres personnalisés
const theme = new WidgetTheme({
  borderWidth: '2px',
  borderStyle: 'solid',
  borderColor: '#cbd5e0',
  radius: '0.5rem',
  fontFamily: 'Inter, sans-serif',
  fontSize: '0.875rem',
  spacing: '1.25rem',
  gap: '0.75rem',
  transitionDuration: '200ms',
  transitionTiming: 'ease-in-out',
});

// Mettre à jour un paramètre spécifique
theme.setSetting('borderColor', '#a0aec0');

// Synchroniser les paramètres avec le DOM
theme.syncSettings();
```

### Composition de composants

Vous pouvez composer des structures UI complexes en imbriquant des composants.

```typescript
import { WidgetTheme, LayerVariant } from '@widgetui/core';

const theme = new WidgetTheme();

// Créer une carte avec des composants imbriqués
const card = theme.Layer({
  variant: LayerVariant.Normal,
  children: [
    theme.Helmet({
      title: 'Profil utilisateur',
      subtitle: 'Informations personnelles',
    }),
    theme.Layer({
      children: [
        theme.Avatar({
          src: 'user-avatar.jpg',
          alt: 'Avatar utilisateur',
          size: 'large',
        }),
        theme.Layer({
          children: [
            theme.View({ text: 'John Doe', tag: 'h3' }),
            theme.View({ text: 'john.doe@example.com', tag: 'p' }),
          ],
        }),
      ],
    }),
    theme.Button({
      text: 'Modifier le profil',
      variant: LayerVariant.Primary,
      onClick: () => console.log('Modification du profil cliquée'),
    }),
  ],
});

// Ajouter la carte au DOM
document.body.appendChild(card.element);
```

### Design responsive

La bibliothèque prend en charge le design responsive grâce à des composants de mise en page flexibles et des variantes de taille.

```typescript
import { WidgetTheme, LayerVariant, LayerSize } from '@widgetui/core';

const theme = new WidgetTheme();

// Créer une barre de navigation responsive
const navbar = theme.Navbar({
  brand: 'Mon application',
  items: [
    { text: 'Accueil', href: '#' },
    { text: 'Fonctionnalités', href: '#features' },
    { text: 'Tarifs', href: '#pricing' },
    { text: 'Contact', href: '#contact' },
  ],
  actions: [
    theme.Button({
      text: 'Se connecter',
      variant: LayerVariant.Secondary,
      size: LayerSize.S,
    }),
    theme.Button({
      text: 'S\'inscrire',
      variant: LayerVariant.Primary,
      size: LayerSize.S,
    }),
  ],
  responsive: true,
});

// Ajouter la barre de navigation au DOM
document.body.appendChild(navbar.element);
```

## Référence API

### WidgetTheme

La classe principale pour créer et gérer des thèmes, ainsi que pour créer des composants UI thématisés.

#### Propriétés

- `name` : Obtient le nom du thème
- `selector` : Obtient le sélecteur CSS pour le thème
- `settings` : Obtient les paramètres du thème
- `repository` : Obtient l'élément de style contenant le CSS du thème
- `stylesheets` : Obtient les feuilles de style du thème

#### Méthodes

- **Gestion des thèmes**
  - `getSetting(name)` : Obtient un paramètre de thème spécifique
  - `setSetting(key, value)` : Définit un paramètre de thème spécifique
  - `setSettings(settings)` : Définit plusieurs paramètres de thème
  - `syncSettings()` : Synchronise les paramètres du thème avec le DOM
  - `attach(target)` : Attache le thème à un élément cible
  - `detach(target)` : Détache le thème d'un élément cible

- **Utilitaires de style**
  - `outlineColoringResolves(color)` : Résout les couleurs de contour pour une variante
  - `coloringResolves(color)` : Résout les couleurs pour une variante
  - `roundedResolves(rounded)` : Résout les coins arrondis
  - `animate(widget, options)` : Anime un widget

- **Création de composants**
  - `Accordion(declaration)` : Crée un composant accordéon
  - `Alert(declaration)` : Crée un composant alerte
  - `AlertDialog(declaration)` : Crée un composant dialogue d'alerte
  - `AspectRatio(declaration)` : Crée un conteneur à ratio d'aspect
  - `Avatar(declaration)` : Crée un composant avatar
  - `Avatars(declaration)` : Crée un composant groupe d'avatars
  - `Badge(declaration)` : Crée un composant badge
  - `Button(declaration)` : Crée un composant bouton
  - `Dialog(declaration)` : Crée un composant dialogue
  - `Helmet(declaration)` : Crée un composant helmet (en-tête)
  - `Layer(declaration)` : Crée un composant layer (conteneur)
  - `Modal(declaration)` : Crée un composant modal
  - `Navbar(declaration)` : Crée un composant barre de navigation
  - `Progress(declaration)` : Crée un composant de progression
  - `ScrollArea(declaration)` : Crée un composant zone de défilement
  - `Select(declaration)` : Crée un composant de sélection
  - `Sheet(declaration)` : Crée un composant feuille
  - `Skeleton(declaration)` : Crée un composant squelette
  - `View(declaration)` : Crée un composant vue (texte)
  - ... et de nombreuses autres méthodes de création de composants

### WidgetUi

Une classe utilitaire pour positionner les éléments UI.

- `Position` : Propriété statique avec des positions prédéfinies (Center, LeftTop, RightBottom, etc.)
- `horizontally(x)` : Convertit une position horizontale en valeur d'alignement
- `vertically(y)` : Convertit une position verticale en valeur d'alignement

### Composants UI

La bibliothèque fournit une large gamme de composants UI, notamment :

- **Composants de mise en page** : Layer, AspectRatio, ScrollArea, Sheet
- **Composants typographiques** : View, Helmet
- **Composants de formulaire** : Button, Select, Input, Checkbox, RadioGroup, Switch
- **Composants de feedback** : Alert, Progress, Skeleton
- **Composants de dialogue** : Dialog, Modal, AlertDialog
- **Composants de navigation** : Navbar, Tabs, Breadcrumb
- **Composants d'affichage de données** : Avatar, Badge, Table, List
- **Composants de superposition** : Tooltip, Popover, HoverCard

## Référence des types

| Catégorie | Type | Description |
|----------|------|-------------|
| **Types de thème** | `ITheme` | Interface pour les thèmes |
| | `IThemeSettings` | Paramètres pour les thèmes |
| | `IThemeComposite` | Type pour les fabriques de composants de thème |
| | `IThemeCompositeScheme` | Schéma pour les composants de thème |
| **Types de couleur** | `IColoringLayer` | Couche de couleurs (avant-plan, arrière-plan, bordure) |
| | `LayerVariant` | Énumération pour les variantes de couleur |
| **Types de taille** | `LayerSize` | Énumération pour les variantes de taille |
| **Types de composant** | Diverses interfaces d'options de composant | Options pour créer des composants |

## Licence

Ce projet est sous licence ISC. Voir le fichier LICENSE pour plus de détails.