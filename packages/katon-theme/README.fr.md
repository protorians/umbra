# @widgetui/katon-theme

Un thème moderne et flexible pour le framework @widgetui, offrant un style cohérent et des animations pour les composants d'interface utilisateur.

## Table des matières

- [Aperçu](#aperçu)
- [Installation](#installation)
- [Concepts fondamentaux](#concepts-fondamentaux)
  - [Paramètres du thème](#paramètres-du-thème)
  - [Variantes de couleur](#variantes-de-couleur)
  - [Style des composants](#style-des-composants)
  - [Animations](#animations)
- [Utilisation de base](#utilisation-de-base)
- [Fonctionnalités avancées](#fonctionnalités-avancées)
  - [Style personnalisé des composants](#style-personnalisé-des-composants)
  - [Résolveurs de couleur](#résolveurs-de-couleur)
  - [Intégration d'animations](#intégration-danimations)
- [Référence API](#référence-api)
  - [KatonTheme](#katontheme)
    - [Propriétés](#propriétés)
    - [Méthodes](#méthodes)
  - [KatonModalAnimations](#katonmodalanimations)
    - [Propriétés](#propriétés-1)
- [Référence des types](#référence-des-types)
- [Licence](#licence)

## Aperçu

@widgetui/katon-theme est un thème complet pour le framework @widgetui. Il fournit un système de style moderne et cohérent pour les composants d'interface utilisateur, avec prise en charge de la personnalisation, des variantes de couleur et des animations. Le thème est conçu pour être flexible et extensible, vous permettant de créer des interfaces utilisateur belles et réactives avec un minimum d'effort.

## Installation

```bash
# Utilisation de npm
npm install @widgetui/katon-theme

# Utilisation de yarn
yarn add @widgetui/katon-theme

# Utilisation de pnpm
pnpm add @widgetui/katon-theme
```

## Concepts fondamentaux

### Paramètres du thème

Le thème Katon fournit un ensemble de paramètres par défaut qui définissent l'apparence visuelle des composants d'interface utilisateur. Ces paramètres comprennent :

- **Gap** : Espacement entre les éléments
- **Radius** : Rayon de bordure pour les composants
- **Border** : Largeur, style et couleur de bordure
- **Shadow** : Ombre portée pour les composants
- **Blurred** : Quantité de flou pour le filtre d'arrière-plan

Ces paramètres sont utilisés de manière cohérente dans tous les composants pour assurer une apparence homogène.

### Variantes de couleur

Le thème prend en charge plusieurs variantes de couleur pour les composants, notamment :

- **Primary** : Couleur principale de la marque
- **Secondary** : Couleur secondaire de la marque
- **Error** : Pour les états d'erreur et les messages
- **Success** : Pour les états de succès et les messages
- **Warning** : Pour les états d'avertissement et les messages
- **Info** : Pour les états informatifs et les messages
- **Link** : Pour les hyperliens
- **Text** : Pour le contenu textuel
- **White** : Variante de couleur blanche
- **Black** : Variante de couleur noire
- **Revert** : Schéma de couleur inversé

Chaque variante définit des couleurs de premier plan, d'arrière-plan et de bordure.

### Style des composants

Le thème fournit un style personnalisé pour divers composants d'interface utilisateur, notamment :

- **Accordion** : Panneaux de contenu repliables
- **AlertDialog** : Boîtes de dialogue modales pour les alertes et les confirmations
- **Select** : Composants de sélection déroulante

Chaque composant est stylisé de manière cohérente avec les paramètres du thème tout en offrant des personnalisations spécifiques pour une utilisation optimale.

### Animations

Le thème inclut des animations pour les composants d'interface utilisateur, améliorant l'expérience utilisateur avec des transitions fluides. Actuellement, il fournit des animations pour :

- **Modal Entry** : Animation pour l'apparition d'une modale
- **Modal Exit** : Animation pour la disparition d'une modale

## Utilisation de base

```typescript
import { KatonTheme } from '@widgetui/katon-theme';
import { ThemeProvider } from '@widgetui/core';

// Créer une nouvelle instance du thème Katon
const theme = new KatonTheme();

// Utiliser le thème avec le ThemeProvider
const app = ThemeProvider({
  theme: theme,
  children: [
    // Vos composants d'application
  ]
});
```

## Fonctionnalités avancées

### Style personnalisé des composants

Vous pouvez personnaliser le style de composants spécifiques tout en maintenant la cohérence globale du thème :

```typescript
import { KatonTheme } from '@widgetui/katon-theme';
import { Accordion } from '@widgetui/core';

// Créer une nouvelle instance du thème Katon
const theme = new KatonTheme();

// Créer un accordéon avec un style personnalisé
const accordion = theme.Accordion({
  items: [
    {
      trigger: 'Section 1',
      content: 'Contenu pour la section 1'
    },
    {
      trigger: 'Section 2',
      content: 'Contenu pour la section 2'
    }
  ],
  styles: {
    widget: {
      backgroundColor: '#f5f5f5',
      borderRadius: '0.5rem'
    },
    trigger: {
      backgroundColor: '#e0e0e0',
      color: '#333333'
    }
  }
});
```

### Résolveurs de couleur

Le thème fournit des résolveurs de couleur pour différentes variantes de couche, vous permettant d'appliquer une coloration cohérente à vos composants :

```typescript
import { KatonTheme } from '@widgetui/katon-theme';
import { LayerVariant } from '@widgetui/core';

// Créer une nouvelle instance du thème Katon
const theme = new KatonTheme();

// Obtenir les couleurs pour une variante primaire
const primaryColors = theme.coloringResolves(LayerVariant.Primary);
console.log(primaryColors); // { fore: 'white', back: 'one', edge: 'one-100' }

// Obtenir les couleurs pour une variante contour
const outlineColors = theme.outlineColoringResolves(LayerVariant.Primary);
console.log(outlineColors); // { fore: 'one', back: null, edge: 'one' }
```

### Intégration d'animations

Le thème s'intègre à la bibliothèque @protorians/animetric pour fournir des animations fluides pour les composants :

```typescript
import { KatonTheme } from '@widgetui/katon-theme';
import { KatonModalAnimations } from '@widgetui/katon-theme/animations/modal';

// Créer une nouvelle instance du thème Katon
const theme = new KatonTheme();

// Créer une boîte de dialogue d'alerte avec des animations personnalisées
const alertDialog = theme.AlertDialog({
  title: 'Confirmation',
  content: 'Êtes-vous sûr de vouloir continuer ?',
  animateIn: KatonModalAnimations.entry,
  animateOut: KatonModalAnimations.exit
});
```

## Référence API

### KatonTheme

La classe principale du thème qui étend WidgetTheme de @widgetui/core.

#### Propriétés

- `name` : Obtient le nom du thème ('katon')
- `stylesheets` : Obtient les feuilles de style par défaut pour le thème

#### Méthodes

- `prepareSettings(settings)` : Prépare les paramètres du thème avec des valeurs par défaut
- `outlineColoringResolves(color)` : Résout les couleurs pour les variantes de contour
- `coloringResolves(color)` : Résout les couleurs pour les variantes pleines
- `Accordion(declaration)` : Crée un composant Accordion avec le style du thème
- `AlertDialog(declaration)` : Crée un composant AlertDialog avec le style du thème
- `Select(declaration)` : Crée un composant Select avec le style du thème

### KatonModalAnimations

Une classe qui fournit des animations pour les composants modaux.

#### Propriétés

- `entry` : Obtient l'animation pour l'entrée modale
- `exit` : Obtient l'animation pour la sortie modale

## Référence des types

| Catégorie | Type | Description |
|-----------|------|-------------|
| **Types de thème** | `IThemeSettings` | Interface pour les paramètres du thème |
| | `IColoringLayer` | Interface pour les définitions de couche de couleur |
| | `LayerVariant` | Enum pour les variantes de couleur de couche |
| **Types de composant** | `IThemeAccordionOptions` | Interface pour les options d'accordéon |
| | `ThemeAlertDialogOptions` | Interface pour les options de boîte de dialogue d'alerte |
| | `IThemeSelectOptions` | Interface pour les options de composant de sélection |
| | `IThemeSelectStyles` | Interface pour les styles de composant de sélection |
| **Types d'animation** | `IAnimetricSlimOptions` | Interface pour les options d'animation |

## Licence

Ce projet est sous licence ISC. Voir le fichier LICENSE pour plus de détails.