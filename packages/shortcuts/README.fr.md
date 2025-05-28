# @protorians/shortcuts

Une bibliothèque puissante et flexible de gestion des raccourcis clavier pour les applications web modernes.

## Table des matières

- [Aperçu](#aperçu)
- [Installation](#installation)
- [Concepts fondamentaux](#concepts-fondamentaux)
  - [Portées des raccourcis](#portées-des-raccourcis)
  - [Séquences de touches](#séquences-de-touches)
  - [Déclencheurs](#déclencheurs)
- [Utilisation de base](#utilisation-de-base)
- [Fonctionnalités avancées](#fonctionnalités-avancées)
  - [Touches modificatrices](#touches-modificatrices)
  - [Cibles multiples](#cibles-multiples)
  - [Gestion de la portée](#gestion-de-la-portée)
  - [Événements de signal](#événements-de-signal)
- [Référence API](#référence-api)
  - [Shortcut](#shortcut)
    - [Propriétés](#propriétés)
    - [Méthodes](#méthodes)
  - [createShortcut](#createshortcut)
  - [Fonctions utilitaires](#fonctions-utilitaires)
- [Référence des types](#référence-des-types)
- [Licence](#licence)

## Aperçu

@protorians/shortcuts est une bibliothèque complète de gestion des raccourcis clavier qui vous permet de définir, gérer et répondre facilement aux raccourcis clavier dans vos applications web. Elle fournit une API flexible pour définir des séquences de touches, gérer les événements clavier et gérer les portées des raccourcis.

## Installation

```bash
# Utilisation de npm
npm install @protorians/shortcuts

# Utilisation de yarn
yarn add @protorians/shortcuts

# Utilisation de pnpm
pnpm add @protorians/shortcuts
```

## Concepts fondamentaux

### Portées des raccourcis

Les raccourcis peuvent être limités à différents niveaux :

- **Self** : Le raccourci s'applique uniquement à l'élément cible spécifique
- **Global** : Le raccourci s'applique globalement, indépendamment du focus
- **Active** : Le raccourci s'applique lorsque l'élément cible est actif (a le focus)

```typescript
import { ShortcutScope } from '@protorians/shortcuts';

// Différentes options de portée
const selfScope = ShortcutScope.Self;
const globalScope = ShortcutScope.Global;
const activeScope = ShortcutScope.Active;
```

### Séquences de touches

Les séquences de touches sont des tableaux de combinaisons de touches qui déclenchent un raccourci. Elles peuvent inclure des touches modificatrices (Ctrl, Alt, Shift, Meta) et des touches régulières.

```typescript
// Séquence de touches simple
const simpleSequence = ['a'];

// Séquence de touches avec modificateur
const modifierSequence = ['ctrl+s'];

// Séquence de touches complexe
const complexSequence = ['ctrl+shift+a'];
```

### Déclencheurs

Les déclencheurs sont des fonctions qui sont exécutées lorsqu'un raccourci est activé. Ils reçoivent l'événement clavier qui a déclenché le raccourci.

```typescript
// Fonction de déclenchement simple
const trigger = (event: KeyboardEvent) => {
  console.log('Raccourci déclenché !', event);
};
```

## Utilisation de base

```typescript
import { createShortcut } from '@protorians/shortcuts';

// Créer un raccourci pour Ctrl+S
const saveShortcut = createShortcut(['ctrl+s'], {
  trigger: (event) => {
    console.log('Raccourci de sauvegarde déclenché !');
    event.preventDefault(); // Empêcher la boîte de dialogue de sauvegarde du navigateur
    saveDocument();
  }
});

// Créer un raccourci pour Ctrl+Z
const undoShortcut = createShortcut(['ctrl+z'], {
  trigger: (event) => {
    console.log('Raccourci d\'annulation déclenché !');
    event.preventDefault();
    undoLastAction();
  }
});

// Désactiver un raccourci
undoShortcut.disable();

// Réactiver un raccourci
undoShortcut.enable();

// Supprimer un raccourci
saveShortcut.unmount(['ctrl+s']);

// Effacer tous les raccourcis
saveShortcut.clear();

// Détruire l'instance de raccourci (supprimer les écouteurs d'événements)
saveShortcut.destroy();
```

## Fonctionnalités avancées

### Touches modificatrices

La bibliothèque fournit des méthodes d'aide pour travailler avec les touches modificatrices :

```typescript
import { Shortcut } from '@protorians/shortcuts';

// Créer une instance de raccourci
const shortcut = new Shortcut(document.body, {
  trigger: (event) => console.log('Raccourci déclenché !'),
});

// Ajouter des raccourcis avec différents modificateurs
shortcut.mount(shortcut.Ctrl(['s']), (event) => {
  console.log('Ctrl+S déclenché !');
  event.preventDefault();
});

shortcut.mount(shortcut.Shift(['a']), (event) => {
  console.log('Shift+A déclenché !');
  event.preventDefault();
});

shortcut.mount(shortcut.Alt(['f4']), (event) => {
  console.log('Alt+F4 déclenché !');
  event.preventDefault();
});

shortcut.mount(shortcut.Meta(['c']), (event) => {
  console.log('Meta+C déclenché !');
  event.preventDefault();
});

// Modificateurs spécifiques à la plateforme
shortcut.mount(shortcut.Command(['s']), (event) => {
  console.log('Command+S déclenché sur Mac !');
  event.preventDefault();
});

shortcut.mount(shortcut.Option(['a']), (event) => {
  console.log('Option+A déclenché sur Mac !');
  event.preventDefault();
});
```

### Cibles multiples

Vous pouvez appliquer des raccourcis à plusieurs éléments cibles :

```typescript
import { Shortcut } from '@protorians/shortcuts';

// Obtenir plusieurs éléments
const textareas = document.querySelectorAll('textarea');

// Créer un raccourci pour toutes les zones de texte
const textareaShortcut = new Shortcut(textareas, {
  trigger: (event) => console.log('Raccourci de zone de texte déclenché !'),
  scope: ShortcutScope.Active, // Déclencher uniquement lorsque la zone de texte a le focus
});

// Ajouter un raccourci pour Ctrl+B pour mettre le texte en gras
textareaShortcut.mount(['ctrl+b'], (event) => {
  event.preventDefault();
  const textarea = event.target as HTMLTextAreaElement;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const text = textarea.value;
  
  textarea.value = text.substring(0, start) + 
                  '**' + text.substring(start, end) + '**' + 
                  text.substring(end);
});
```

### Gestion de la portée

Vous pouvez contrôler la portée des raccourcis pour déterminer quand ils doivent être déclenchés :

```typescript
import { Shortcut, ShortcutScope } from '@protorians/shortcuts';

// Créer un raccourci global (fonctionne partout)
const globalShortcut = new Shortcut(document.body, {
  trigger: (event) => console.log('Raccourci global déclenché !'),
  scope: ShortcutScope.Global,
});

// Créer un raccourci qui ne fonctionne que lorsqu'un élément spécifique a le focus
const modalShortcut = new Shortcut(document.getElementById('modal'), {
  trigger: (event) => console.log('Raccourci modal déclenché !'),
  scope: ShortcutScope.Self,
});

// Créer un raccourci qui fonctionne lorsqu'un élément avec une classe spécifique est actif
const editorShortcut = new Shortcut(document.querySelectorAll('.editor'), {
  trigger: (event) => console.log('Raccourci d\'éditeur déclenché !'),
  scope: ShortcutScope.Active,
});
```

### Événements de signal

La classe Shortcut fournit un système de signaux pour répondre aux événements de raccourci :

```typescript
import { Shortcut } from '@protorians/shortcuts';

const shortcut = new Shortcut(document.body, {
  trigger: (event) => console.log('Raccourci déclenché !'),
});

// Écouter les événements de déclenchement
shortcut.signal.listen('trigger', (event) => {
  console.log('Raccourci déclenché via signal !', event);
});

// Écouter les événements de montage
shortcut.signal.listen('mount', (sequence) => {
  console.log('Nouveau raccourci monté :', sequence);
});

// Écouter les événements de démontage
shortcut.signal.listen('unmount', (keys) => {
  console.log('Raccourci démonté :', keys);
});

// Écouter les événements d'activation/désactivation
shortcut.signal.listen('enable', () => {
  console.log('Raccourcis activés');
});

shortcut.signal.listen('disable', () => {
  console.log('Raccourcis désactivés');
});

// Écouter les événements non focalisés (lorsqu'un raccourci est déclenché mais que la cible n'a pas le focus)
shortcut.signal.listen('unfocused', (event) => {
  console.log('Raccourci déclenché sans focus :', event);
});
```

## Référence API

### Shortcut

La classe principale pour créer et gérer des raccourcis.

#### Propriétés

- `targets` : Obtient les éléments cibles du raccourci
- `signal` : Pile de signaux pour les événements de raccourci
- `shortcuts` : Obtient la liste des séquences de raccourcis
- `focused` : Vérifie si un élément cible a le focus

#### Méthodes

- **Aides pour les modificateurs**
  - `Ctrl(keys)` : Crée une séquence de touches avec le modificateur Ctrl
  - `Shift(keys)` : Crée une séquence de touches avec le modificateur Shift
  - `Meta(keys)` : Crée une séquence de touches avec le modificateur Meta
  - `Alt(keys)` : Crée une séquence de touches avec le modificateur Alt
  - `Command(keys)` : Crée une séquence de touches avec le modificateur Command (Mac)
  - `Option(keys)` : Crée une séquence de touches avec le modificateur Option (Mac)

- **Gestion des raccourcis**
  - `enable()` : Active le raccourci
  - `disable()` : Désactive le raccourci
  - `mount(keys, callback)` : Ajoute un nouveau raccourci
  - `unmount(keys)` : Supprime un raccourci
  - `clear()` : Supprime tous les raccourcis
  - `destroy()` : Nettoie les ressources et supprime les écouteurs d'événements

- **Méthodes utilitaires**
  - `resolveScope(target, scope)` : Résout l'élément cible en fonction de la portée

### createShortcut

Une fonction d'aide pour créer des instances de raccourci.

```typescript
function createShortcut(
  keys: string[], 
  options: IShortcutOptions, 
  target: HTMLElement | HTMLElement[] | NodeListOf<HTMLElement> = document.body
): Shortcut
```

### Fonctions utilitaires

- `matches(sequence)` : Vérifie si une séquence de touches correspond à l'état actuel des touches

## Référence des types

| Catégorie | Type | Description |
|-----------|------|-------------|
| **Types de raccourci** | `IShortcutTrigger` | Type de fonction pour les déclencheurs de raccourci |
| | `IShortcutSequence` | Interface pour les séquences de touches et leurs déclencheurs |
| | `IShortcutOptions` | Options pour configurer les raccourcis |
| | `IShortcut` | Interface pour la fonctionnalité de raccourci |
| **Types d'énumération** | `ShortcutScope` | Énumération pour les portées de raccourci (Self, Global, Active) |
| **Types de signal** | `IShortcutSignalMap` | Carte de signaux pour les événements de raccourci |

## Licence

Ce projet est sous licence ISC. Voir le fichier LICENSE pour plus de détails.