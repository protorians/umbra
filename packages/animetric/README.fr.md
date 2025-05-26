# @protorians/animetric

Un moteur d'animation puissant et flexible pour les applications web modernes.

## Table des matières

- [Aperçu](#aperçu)
- [Installation](#installation)
- [Concepts fondamentaux](#concepts-fondamentaux)
  - [Fonctions d'assouplissement](#fonctions-dassouplissement)
  - [Moteur d'animation](#moteur-danimation)
  - [Groupes d'animations](#groupes-danimations)
- [Utilisation de base](#utilisation-de-base)
- [Fonctionnalités avancées](#fonctionnalités-avancées)
  - [Fonctions d'assouplissement personnalisées](#fonctions-dassouplissement-personnalisées)
  - [Séquences d'animation](#séquences-danimation)
  - [Animations parallèles et séquentielles](#animations-parallèles-et-séquentielles)
- [Référence API](#référence-api)
  - [Animetric](#animetric)
    - [Propriétés](#propriétés)
    - [Méthodes](#méthodes)
  - [AnimetricGroup](#animetricgroup)
    - [Propriétés](#propriétés-1)
    - [Méthodes](#méthodes-1)
  - [Easing](#easing)
    - [Propriétés](#propriétés-2)
    - [Méthodes](#méthodes-2)
- [Référence des types](#référence-des-types)
- [Licence](#licence)

## Aperçu

@protorians/animetric est une bibliothèque d'animation complète qui vous permet de créer des animations dynamiques et fluides pour les interfaces web. Elle fournit un moteur puissant pour définir, contrôler et regrouper des animations avec un timing précis et des fonctions d'assouplissement.

## Installation

```bash
# Utilisation de npm
npm install @protorians/animetric

# Utilisation de yarn
yarn add @protorians/animetric

# Utilisation de pnpm
pnpm add @protorians/animetric
```

## Concepts fondamentaux

### Fonctions d'assouplissement

Les fonctions d'assouplissement définissent comment les animations accélèrent ou décélèrent au fil du temps, ajoutant un mouvement naturel à vos animations. Animetric fournit une variété de fonctions d'assouplissement intégrées et vous permet d'en créer des personnalisées.

```typescript
import { Ease } from '@protorians/animetric';

// Utilisation d'une fonction d'assouplissement intégrée
const animation = Animetric({
  ease: Ease.easeInOutQuad
});
```

### Moteur d'animation

Le moteur d'animation est le cœur d'Animetric. Il gère le calcul des valeurs d'animation au fil du temps, applique des fonctions d'assouplissement et déclenche des callbacks à chaque image.

```typescript
import { Animetric } from '@protorians/animetric';

// Créer une animation simple
const animation = Animetric({
  from: [0],
  to: [100],
  duration: 1000, // 1 seconde
  ease: Ease.linear
});

// Ajouter un callback pour gérer les mises à jour d'animation
animation.callable((payload) => {
  console.log(`Progression de l'animation: ${payload.percent}%`);
  console.log(`Valeur actuelle: ${payload.frames[0]}`);
});

// Démarrer l'animation
animation.play();
```

### Groupes d'animations

Les groupes d'animations vous permettent de combiner plusieurs animations et de les contrôler comme une seule unité. Vous pouvez exécuter des animations en parallèle ou séquentiellement.

```typescript
import { AnimetricGroup, Animetric } from '@protorians/animetric';

// Créer des animations individuelles
const animation1 = Animetric({
  from: [0],
  to: [100],
  duration: 1000
});

const animation2 = Animetric({
  from: [200],
  to: [0],
  duration: 500
});

// Grouper des animations pour les exécuter en parallèle
const parallelGroup = AnimetricGroup({
  timelines: [animation1, animation2],
  parallel: true
});

// Grouper des animations pour les exécuter séquentiellement
const sequentialGroup = AnimetricGroup({
  timelines: [animation1, animation2],
  parallel: false
});

// Contrôler le groupe comme une seule unité
parallelGroup.play();
```

## Utilisation de base

```typescript
import { Animetric, Ease } from '@protorians/animetric';

// Créer une animation qui va de 0 à 100 sur 1 seconde
const animation = Animetric({
  from: [0],
  to: [100],
  duration: 1000,
  ease: Ease.easeInOutQuad
});

// Ajouter un callback pour gérer les mises à jour d'animation
animation.callable((payload) => {
  // Utiliser la valeur actuelle pour mettre à jour votre interface utilisateur
  const element = document.getElementById('animated-element');
  element.style.left = `${payload.frames[0]}px`;
});

// Démarrer l'animation
animation.play();

// Vous pouvez contrôler l'animation
document.getElementById('pause-button').addEventListener('click', () => {
  animation.pause();
});

document.getElementById('resume-button').addEventListener('click', () => {
  animation.resume();
});

document.getElementById('stop-button').addEventListener('click', () => {
  animation.stop();
});
```

## Fonctionnalités avancées

### Fonctions d'assouplissement personnalisées

Vous pouvez créer des fonctions d'assouplissement personnalisées pour obtenir des effets d'animation spécifiques.

```typescript
import { createEase } from '@protorians/animetric';

// Créer une fonction d'assouplissement personnalisée
const customEase = createEase({
  name: 'customBounce',
  formula: (x) => {
    // Un simple effet de rebond
    return Math.sin(x * Math.PI * 2) * Math.exp(-x * 3);
  }
});

// Utiliser la fonction d'assouplissement personnalisée
const animation = Animetric({
  from: [0],
  to: [100],
  duration: 1000,
  ease: customEase
});
```

### Séquences d'animation

Vous pouvez animer plusieurs propriétés simultanément en fournissant des tableaux de valeurs.

```typescript
import { Animetric } from '@protorians/animetric';

// Animer la position et l'opacité simultanément
const animation = Animetric({
  from: [0, 0],   // [x, opacité]
  to: [100, 1],   // [x, opacité]
  duration: 1000
});

animation.callable((payload) => {
  const element = document.getElementById('animated-element');
  element.style.left = `${payload.frames[0]}px`;
  element.style.opacity = payload.frames[1];
});
```

### Animations parallèles et séquentielles

Vous pouvez créer des séquences d'animation complexes en combinant des animations parallèles et séquentielles.

```typescript
import { AnimetricGroup, Animetric } from '@protorians/animetric';

// Première séquence: déplacer vers la droite et apparaître en fondu
const sequence1 = AnimetricGroup({
  timelines: [
    Animetric({ from: [0], to: [100], duration: 500 }),  // déplacer vers la droite
    Animetric({ from: [0], to: [1], duration: 500 })     // apparaître en fondu
  ],
  parallel: true
});

// Deuxième séquence: déplacer vers le bas et agrandir
const sequence2 = AnimetricGroup({
  timelines: [
    Animetric({ from: [0], to: [50], duration: 500 }),   // déplacer vers le bas
    Animetric({ from: [1], to: [1.5], duration: 500 })   // agrandir
  ],
  parallel: true
});

// Combiner les séquences pour les exécuter l'une après l'autre
const animation = AnimetricGroup({
  timelines: [sequence1, sequence2],
  parallel: false
});

// Démarrer toute la séquence d'animation
animation.play();
```

## Référence API

### Animetric

La classe principale pour créer et contrôler les animations.

#### Propriétés

- `status`: Obtient l'état actuel de l'animation (true pour en cours de lecture, false pour en pause, null pour arrêté)
- `percent`: Obtient le pourcentage actuel de l'animation (0-100)
- `ready`: Vérifie si l'animation est prête à être lue
- `state`: Obtient l'état actuel de l'animation (pourcentage et images)
- `options`: Obtient les options utilisées pour configurer l'animation
- `completed`: Vérifie si l'animation est terminée
- `waves`: Obtient la liste des négativités de la propriété 'to'
- `gaps`: Obtient la liste des écarts entre les valeurs 'from' et 'to'

#### Méthodes

- **Initialisation**
  - `initialize()`: Initialise l'animation
  - `from(...values)`: Définit les valeurs de départ
  - `to(...values)`: Définit les valeurs finales
  - `duration(milliseconds)`: Définit la durée de l'animation
  - `delay(milliseconds)`: Définit un délai avant le début de l'animation
  - `decimal(value)`: Définit la précision décimale pour les calculs
  - `infinite(value)`: Définit si l'animation doit se répéter indéfiniment
  - `ease(easing)`: Définit la fonction d'assouplissement à utiliser

- **Contrôle**
  - `play()`: Démarre l'animation
  - `pause()`: Met l'animation en pause
  - `resume()`: Reprend une animation en pause
  - `stop()`: Arrête l'animation et la réinitialise

- **Callbacks**
  - `callable(callback)`: Définit une fonction de callback à appeler à chaque image

### AnimetricGroup

Une classe pour regrouper et contrôler plusieurs animations.

#### Propriétés

- `timelines`: Obtient la liste des animations dans le groupe
- `options`: Obtient les options utilisées pour configurer le groupe

#### Méthodes

- **Contrôle**
  - `play()`: Démarre toutes les animations du groupe
  - `pause()`: Met en pause toutes les animations du groupe
  - `resume()`: Reprend toutes les animations en pause du groupe
  - `stop()`: Arrête toutes les animations du groupe
  - `replay(delay)`: Rejoue toutes les animations du groupe avec un délai optionnel

- **Navigation**
  - `next()`: Obtient l'animation suivante dans le groupe
  - `previous()`: Obtient l'animation précédente dans le groupe
  - `go(index)`: Va à une animation spécifique dans le groupe

### Easing

Une classe pour créer et utiliser des fonctions d'assouplissement.

#### Propriétés

- `name`: Obtient le nom de la fonction d'assouplissement
- `cubicBezier`: Obtient la représentation cubic-bezier de la fonction d'assouplissement
- `formula`: Obtient la fonction formule de la fonction d'assouplissement

#### Méthodes

- `compute(x)`: Calcule la valeur d'assouplissement pour une entrée donnée (0-1)

## Référence des types

| Catégorie | Type | Description |
|-----------|------|-------------|
| **Types d'assouplissement** | `IEasingFormula` | Un type de fonction pour les formules d'assouplissement qui prennent un nombre et retournent un nombre |
| | `IEasingBase` | Interface de base pour les fonctions d'assouplissement avec des propriétés signal et name |
| | `IEasing` | Interface pour les fonctions d'assouplissement avec des propriétés cubicBezier, formula et compute |
| **Types d'animation** | `IAnimetricCallable` | Un type de fonction pour les callbacks d'animation |
| | `IAnimetricPayload` | Interface pour la charge utile d'animation avec des propriétés percent et frames |
| | `IAnimetricBaseOptions` | Options de base pour les animations, y compris les propriétés infinite, duration, decimal, delay et ease |
| | `IAnimetricOptions` | Options complètes pour les animations étendant IAnimetricBaseOptions |
| | `IAnimetricController` | Interface pour les contrôleurs d'animation avec des méthodes play, pause, resume et stop |
| | `IAnimetric` | Interface d'animation principale étendant IAnimetricController avec des propriétés et méthodes supplémentaires |
| **Types de groupe** | `IAnimetricGroupOptions` | Options pour les groupes d'animation avec une propriété parallel |
| | `IAnimetricGroup` | Interface pour les groupes d'animation étendant IAnimetricController |
| **Types de signal** | `IAnimetricSignalMap` | Carte de signaux pour les événements d'animation |
| | `IEasingEmitterScheme` | Schéma pour les émetteurs d'assouplissement avec une propriété change |

## Licence

Ce projet est sous licence ISC. Voir le fichier LICENSE pour plus de détails.