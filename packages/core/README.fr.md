# @protorians/core

Une bibliothèque d'utilitaires puissante et flexible pour les applications JavaScript et TypeScript modernes.

## Table des matières

- [Aperçu](#aperçu)
- [Installation](#installation)
- [Concepts fondamentaux](#concepts-fondamentaux)
  - [Signaux](#signaux)
  - [Dictionnaires](#dictionnaires)
  - [Collections](#collections)
  - [Environnement](#environnement)
  - [Climbing](#climbing)
- [Utilisation de base](#utilisation-de-base)
- [Fonctionnalités avancées](#fonctionnalités-avancées)
  - [Pile de signaux](#pile-de-signaux)
  - [Contrôleur de signaux](#contrôleur-de-signaux)
  - [Dictionnaire](#dictionnaire)
  - [Utilitaires](#utilitaires)
- [Référence API](#référence-api)
  - [Signaux](#signaux-1)
    - [Propriétés](#propriétés)
    - [Méthodes](#méthodes)
  - [Dictionnaire](#dictionnaire-1)
    - [Propriétés](#propriétés-1)
    - [Méthodes](#méthodes-1)
  - [Climbing](#climbing-1)
    - [Propriétés](#propriétés-2)
    - [Méthodes](#méthodes-2)
  - [Utilitaires](#utilitaires-1)
    - [Texte](#texte)
    - [Nombre](#nombre)
    - [Objet](#objet)
    - [Date](#date)
    - [URL](#url)
    - [HTML](#html)
- [Référence des types](#référence-des-types)
- [Licence](#licence)

## Aperçu

@protorians/core est une bibliothèque d'utilitaires complète qui fournit une base pour la construction d'applications JavaScript et TypeScript modernes. Elle comprend des utilitaires pour la gestion des événements, la gestion d'état, les structures de données et les opérations courantes sur les chaînes de caractères, les nombres, les objets, et plus encore.

## Installation

```bash
# Utilisation de npm
npm install @protorians/core

# Utilisation de yarn
yarn add @protorians/core

# Utilisation de pnpm
pnpm add @protorians/core
```

## Concepts fondamentaux

### Signaux

Les signaux sont un système puissant de gestion d'événements qui vous permet de créer, dispatcher et écouter des événements dans votre application. La bibliothèque fournit deux interfaces principales pour les signaux :

- **SignalStack** : Un système d'événements basé sur une pile pour enregistrer des écouteurs et dispatcher des événements.
- **SignalController** : Un système de gestion d'état réactif qui vous permet de suivre et de répondre aux changements d'état.

```typescript
import { Signal } from '@protorians/core';

// Créer une pile de signaux
const signal = new Signal.Stack<{
  click: { x: number; y: number };
  hover: { element: HTMLElement };
}>();

// Écouter les événements
signal.listen('click', ({ x, y }) => {
  console.log(`Cliqué à (${x}, ${y})`);
});

// Dispatcher des événements
signal.dispatch('click', { x: 100, y: 200 });
```

### Dictionnaires

Les dictionnaires sont des magasins clé-valeur avec une API riche pour manipuler et accéder aux données. Ils fournissent un accès typé aux valeurs et des méthodes pour transformer les données.

```typescript
import { Dictionary } from '@protorians/core';

// Créer un dictionnaire
const dict = new Dictionary<{
  name: string;
  age: number;
  email: string;
}>();

// Définir des valeurs
dict.set('name', 'John Doe');
dict.set('age', 30);
dict.set('email', 'john@example.com');

// Obtenir des valeurs
console.log(dict.get('name')); // 'John Doe'

// Convertir en tableau
console.log(dict.array); // [['name', 'John Doe'], ['age', 30], ['email', 'john@example.com']]
```

### Collections

Les collections sont des listes ordonnées d'éléments avec des méthodes pour ajouter, supprimer et manipuler des éléments. Elles fournissent une alternative plus puissante aux tableaux.

```typescript
import { Collection } from '@protorians/core';

// Créer une collection
const collection = new Collection<string>();

// Ajouter des éléments
collection.add('pomme');
collection.add('banane');
collection.add('orange');

// Vérifier si un élément existe
console.log(collection.has('banane')); // true

// Supprimer un élément
collection.remove('banane');

// Itérer sur les éléments
collection.each((item, index) => {
  console.log(`Élément ${index}: ${item}`);
});
```

### Environnement

L'utilitaire Environment fournit des informations sur l'environnement d'exécution actuel, comme si le code s'exécute dans un navigateur, Node.js ou un service worker.

```typescript
import { Environment } from '@protorians/core';

if (Environment.Client) {
  // Code s'exécutant dans un navigateur
  console.log('Exécution dans un navigateur');
} else if (Environment.Server) {
  // Code s'exécutant dans Node.js
  console.log('Exécution dans Node.js');
}
```

### Climbing

L'utilitaire Climbing fournit un moyen de traiter des tableaux d'éléments de manière asynchrone et séquentielle. Il est particulièrement utile pour gérer des opérations qui doivent être effectuées l'une après l'autre, chaque étape pouvant être asynchrone.

```typescript
import { Climbing } from '@protorians/core';

// Tableau d'éléments à traiter
const items = [1, 2, 3, 4, 5];

// Créer une nouvelle instance de Climbing
const climbing = new Climbing(
  items,
  // Fonction de callback asynchrone qui traite chaque élément
  async (index) => {
    const item = items[index];
    console.log(`Traitement de l'élément ${item}`);

    // Simuler une opération asynchrone
    await new Promise(resolve => setTimeout(resolve, 1000));

    return item * 2; // Retourner le résultat traité
  }
);

// Déclencher le processus d'escalade
climbing.trigger((result) => {
  console.log('Tous les éléments ont été traités');
  console.log('Résultats:', result.responses); // [2, 4, 6, 8, 10]
});
```

La classe Climbing fournit les fonctionnalités suivantes :
- Traitement séquentiel des éléments du tableau
- Support des opérations asynchrones
- Collection des résultats traités
- Gestion des erreurs avec des modes strict et non-strict
- Contrôle du point de départ du traitement

## Utilisation de base

```typescript
import {
    Signal,
    Dictionary,
    Collection,
    Environment,
    NumberUtility,
    TextUtility,
    ObjectUtility,
} from '@protorians/core';


// Créer une pile de signaux
const signal = new Signal.Stack<{
    update: { value: number };
}>();

// Écouter les événements
signal.listen('update', ({value}) => {
    console.log(`Valeur mise à jour à ${value}`);
});

// Créer un dictionnaire
const dict = new Dictionary<{
    count: number;
}>();

// Définir une valeur initiale
dict.set('count', 0);

// Mettre à jour la valeur et dispatcher un événement
function increment() {
    const currentCount = dict.get('count');
    dict.set('count', currentCount + 1);
    signal.dispatch('update', {value: currentCount + 1});
}

// Utiliser les utilitaires de texte
const slug = TextUtility.slugify('Bonjour le monde !'); // 'bonjour-le-monde'
const truncated = TextUtility.truncate('Ceci est un texte long', 10); // 'Ceci est u...'

// Utiliser les utilitaires de nombre
const formatted = NumberUtility.isNumber(1234.56); // true

// Utiliser les utilitaires d'objet
const merged = ObjectUtility.unWrap([[1, 2, 3, [4, 5, 6]], [7, 8], [9]]); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

## Fonctionnalités avancées

### Pile de signaux

La pile de signaux fournit un système d'événements puissant avec des fonctionnalités comme :

- **Priorisation des événements** : Contrôlez l'ordre dans lequel les écouteurs sont appelés.
- **Événements annulables** : Permettez aux écouteurs d'annuler la propagation de l'événement.
- **Valeurs calculées** : Obtenez le résultat calculé d'un dispatch d'événement.

```typescript
import { Signal } from '@protorians/core';

const signal = new Signal.Stack<{
  calculate: { a: number; b: number };
}>();

// Ajouter un écouteur avec une priorité élevée
signal.listen('calculate', ({ a, b }) => {
  return a + b;
});

// Ajouter un écouteur avec une priorité plus basse
signal.listen('calculate', ({ a, b }) => {
  console.log(`Calcul de ${a} + ${b}`);
});

// Dispatcher et obtenir le résultat calculé
signal.dispatch('calculate', { a: 5, b: 3 });
const result = signal.computed<number>('calculate');
console.log(result); // 8
```

### Contrôleur de signaux

Le contrôleur de signaux fournit une gestion d'état réactive avec des fonctionnalités comme :

- **Suivi d'état** : Suivez les changements des propriétés d'état.
- **Callbacks d'effet** : Exécutez des callbacks lorsque l'état change.
- **Réinitialisation d'état** : Réinitialisez l'état à ses valeurs d'origine.

```typescript
import { Signal } from '@protorians/core';

// Créer un objet d'état
const state = {
  count: 0,
  name: 'John'
};

// Créer un contrôleur de signal
const controller = new Signal.Controller(state);

// Ajouter un callback d'effet
controller.effect(({ target, name, value }) => {
  console.log(`Propriété ${String(name)} changée à ${value}`);
});

// Mettre à jour l'état
controller.assign('count', 1); // Logs: Propriété count changée à 1
controller.assign('name', 'Jane'); // Logs: Propriété name changée à Jane

// Réinitialiser l'état
controller.reset(state);
```

### Dictionnaire

La classe Dictionary fournit des fonctionnalités avancées pour travailler avec des données clé-valeur :

- **Sécurité de type** : Assurez la sécurité de type pour les clés et les valeurs.
- **Transformation de données** : Transformez les données à l'aide d'analyseurs.
- **Sérialisation** : Convertissez vers et depuis des chaînes.

```typescript
import { Dictionary } from '@protorians/core';

// Créer un dictionnaire avec des valeurs initiales
const dict = new Dictionary<{
  name: string;
  age: number;
  email: string;
}>({
  name: 'John Doe',
  age: 30,
  email: 'john@example.com'
});

// Transformer les valeurs
dict.parse((key, value) => {
  if (key === 'name') {
    return value.toUpperCase();
  }
  return value;
});

console.log(dict.get('name')); // 'JOHN DOE'

// Convertir en chaîne
const str = dict.string;
console.log(str); // '{"name":"JOHN DOE","age":30,"email":"john@example.com"}'

// Créer à partir d'une chaîne
const newDict = new Dictionary<{
  foo: string;
  bar: number;
}>();
newDict.fromString('{"foo":"hello","bar":42}');
console.log(newDict.get('foo')); // 'hello'
```

### Utilitaires

La bibliothèque fournit un riche ensemble d'utilitaires pour les opérations courantes :

```typescript
import {
    HTMLUtility,
    NumberUtility,
    TextUtility,
    ObjectUtility,
} from '@protorians/core';

// Utilitaires de texte
const camelCase = TextUtility.camelCase('hello-world'); // 'helloWorld'
const kebabCase = TextUtility.kebabCase('helloWorld'); // 'hello-world'
const capitalize = TextUtility.capitalize('hello'); // 'Hello'

// Utilitaires de nombre
const clamp = NumberUtility.clamp(150, 0, 100); // 100
const pad = NumberUtility.pad(5, 3); // '005'
const isEven = NumberUtility.isEven(4); // true

// Utilitaires d'objet
const clone = ObjectUtility.clone({a: 1, b: {c: 2}}); // Object clone
const omit = ObjectUtility.omit({a: 1, b: 2, c: 3}, ['b']); // { a: 1, c: 3 }

// Utilitaires HTML
const escape = HTMLUtility.escape('<div>Hello</div>'); // '&lt;div&gt;Hello&lt;/div&gt;'
const unescape = HTMLUtility.unescape('&lt;div&gt;Hello&lt;/div&gt;'); // '<div>Hello</div>'
const stripTags = HTMLUtility.stripTags('<p>Hello <b>World</b></p>'); // 'Hello World'
```

## Référence API

### Signaux

Le module Signals fournit des outils pour la gestion des événements et des états.

#### Propriétés

- `Stack` : Classe pour créer des piles d'événements
- `Controller` : Classe pour créer des contrôleurs d'état réactifs

#### Méthodes

**Signal.Stack** :
- `listen(type, callable, options)` : Ajoute un écouteur pour un événement
- `dispatch(type, payload)` : Dispatche un événement
- `computed<T>(type)` : Obtient le résultat calculé d'un événement
- `remove(type, index)` : Supprime un écouteur par index
- `removeStack(type)` : Supprime tous les écouteurs pour un événement
- `removeCallable(callable, type)` : Supprime un écouteur spécifique
- `clear()` : Supprime tous les écouteurs

**Signal.Controller** :
- `update(target)` : Met à jour l'état
- `reset(target)` : Réinitialise l'état
- `assign(key, value)` : Assigne une valeur à une propriété d'état
- `effect(callable)` : Ajoute un callback d'effet
- `trigger(name, value)` : Déclenche un effet
- `compute()` : Calcule l'état actuel

### Dictionnaire

La classe Dictionary fournit un magasin clé-valeur typé.

#### Propriétés

- `map` : Obtient l'objet sous-jacent
- `array` : Obtient le dictionnaire sous forme de tableau de paires clé-valeur
- `string` : Obtient le dictionnaire sous forme de chaîne JSON

#### Méthodes

- `get(key)` : Obtient une valeur par clé
- `set(key, value)` : Définit une valeur par clé
- `remove(key)` : Supprime une clé
- `clear()` : Supprime toutes les clés
- `fromString(data)` : Initialise à partir d'une chaîne JSON
- `parse(callable)` : Transforme les valeurs à l'aide d'un analyseur
- `many(values)` : Définit plusieurs valeurs
- `values()` : Obtient toutes les valeurs
- `keys()` : Obtient toutes les clés

### Climbing

La classe Climbing fournit un moyen de traiter des tableaux d'éléments de manière asynchrone et séquentielle.

#### Propriétés

- `responses` : Tableau contenant les résultats des opérations traitées
- `entries` : Tableau d'éléments à traiter
- `callback` : Fonction de callback asynchrone pour traiter chaque élément
- `strictMode` : Mode de gestion des erreurs (strict ou non-strict)

#### Méthodes

- `trigger(done, start)` : Déclenche le processus d'escalade à partir d'un index spécifique
- `create(entries, callback)` : Crée une nouvelle instance d'escalade
- `next(prepared, next)` : Passe à l'étape suivante dans le processus d'escalade

### Utilitaires

La bibliothèque fournit divers modules d'utilitaires pour les opérations courantes.

#### Text

- `camelCase(str)` : Convertit une chaîne en camelCase
- `kebabCase(str)` : Convertit une chaîne en kebab-case
- `snakeCase(str)` : Convertit une chaîne en snake_case
- `capitalize(str)` : Met en majuscule la première lettre
- `truncate(str, length, suffix)` : Tronque une chaîne
- `slugify(str)` : Convertit une chaîne en slug URL-friendly
- `trimSpace(str)` : Supprime et normalise les espaces blancs
- `pad(str, length, char)` : Remplit une chaîne à une longueur spécifique

#### Number

- `format(num, decimals, decimalSeparator, thousandsSeparator)` : Formate un nombre
- `random(min, max)` : Génère un nombre aléatoire
- `clamp(num, min, max)` : Limite un nombre entre min et max
- `pad(num, length)` : Remplit un nombre avec des zéros en tête
- `isEven(num)` : Vérifie si un nombre est pair
- `isOdd(num)` : Vérifie si un nombre est impair
- `round(num, decimals)` : Arrondit un nombre à un nombre spécifique de décimales

#### Object

- `clone(obj)` : Clone profondément un objet
- `merge(obj1, obj2)` : Fusionne deux objets
- `pick(obj, keys)` : Crée un nouvel objet avec des clés sélectionnées
- `omit(obj, keys)` : Crée un nouvel objet sans les clés spécifiées
- `isEqual(obj1, obj2)` : Vérifie si deux objets sont égaux
- `isEmpty(obj)` : Vérifie si un objet est vide
- `entries(obj)` : Obtient un tableau de paires clé-valeur
- `fromEntries(entries)` : Crée un objet à partir de paires clé-valeur

## Référence des types

| Catégorie | Type | Description |
|-----------|------|-------------|
| **Types de signal** | `ISignalStack<M>` | Interface pour les piles de signaux avec une carte d'événements générique |
| | `ISignalController<I>` | Interface pour les contrôleurs d'état réactifs |
| | `ISignalStackCallable<P>` | Type pour les fonctions de callback de pile de signaux |
| | `ISignalStackOptions` | Options pour les écouteurs de pile de signaux |
| **Types de dictionnaire** | `IDictionary<T>` | Interface pour les dictionnaires avec des types de valeur génériques |
| | `IDictionaryCallbackParser<T>` | Type pour les analyseurs de valeur de dictionnaire |
| **Types de collection** | `ICollection<T>` | Interface pour les collections avec des types d'élément génériques |
| | `ICollectionCallable<T>` | Type pour les fonctions de callback de collection |
| **Types d'environnement** | `IEnvironment` | Interface pour la détection d'environnement |
| **Utility Types** | `ITextUtilities` | Interface pour les utilitaires de texte |
| | `INumberUtilities` | Interface pour les utilitaires de nombre |
| | `IObjectUtilities` | Interface pour les utilitaires d'objet |
| | `IDateUtilities` | Interface pour les utilitaires de date |
| | `IURLUtilities` | Interface pour les utilitaires d'URL |
| | `IHTMLUtilities` | Interface pour les utilitaires HTML |

## Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.
