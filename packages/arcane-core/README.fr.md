# @protorians/arcane-core

Une bibliothèque core puissante et flexible pour construire des interfaces en ligne de commande avec support de plugins.

## Table des matières

- [Aperçu](#aperçu)
- [Installation](#installation)
- [Concepts fondamentaux](#concepts-fondamentaux)
  - [Programme](#programme)
  - [Runes](#runes)
  - [Configuration](#configuration)
- [Utilisation de base](#utilisation-de-base)
- [Fonctionnalités avancées](#fonctionnalités-avancées)
  - [Création de Runes](#création-de-runes)
  - [Configuration des Runes](#configuration-des-runes)
  - [Téléchargement et installation de Runes](#téléchargement-et-installation-de-runes)
- [Référence API](#référence-api)
  - [Programme](#programme-1)
    - [Propriétés](#propriétés)
    - [Méthodes](#méthodes)
  - [Rune](#rune)
    - [Propriétés](#propriétés-1)
    - [Méthodes](#méthodes-1)
  - [Configuration](#configuration-1)
    - [Propriétés](#propriétés-2)
    - [Méthodes](#méthodes-2)
- [Référence des types](#référence-des-types)
- [Licence](#licence)

## Aperçu

@protorians/arcane-core est une bibliothèque complète pour construire des interfaces en ligne de commande avec support de plugins. Elle fournit une base puissante pour créer des outils CLI qui peuvent être étendus avec des plugins (appelés "runes"). La bibliothèque inclut des fonctionnalités pour gérer les runes, manipuler la configuration et construire des programmes en ligne de commande.

## Installation

```bash
# Utilisation de npm
npm install @protorians/arcane-core

# Utilisation de yarn
yarn add @protorians/arcane-core

# Utilisation de pnpm
pnpm add @protorians/arcane-core
```

## Concepts fondamentaux

### Programme

Le Programme est le concept central dans arcane-core. Il représente une interface en ligne de commande qui peut être étendue avec des runes. Le Programme fournit des méthodes pour définir des commandes, des options et des arguments, ainsi que pour gérer l'exécution des commandes.

```typescript
import { ArcaneManager } from '@protorians/arcane-core';

// Créer un nouveau programme
const program = ArcaneManager.create();

// Configurer le programme
program
  .name('Mon CLI')
  .version('1.0.0')
  .description('Une interface en ligne de commande construite avec arcane-core');

// Définir une commande
program
  .command('bonjour')
  .description('Dire bonjour')
  .action(() => {
    console.log('Bonjour, monde !');
  });

// Analyser les arguments de la ligne de commande
program.parse(process.argv);
```

### Runes

Les Runes sont des plugins qui étendent la fonctionnalité d'un Programme. Elles peuvent ajouter de nouvelles commandes, options et arguments au CLI. Les Runes sont définies comme des classes qui implémentent l'interface `IRunePlugin`.

```typescript
import { IRunePlugin, IProgram } from '@protorians/arcane-core';

class MaRune implements IRunePlugin {
  name = 'ma-rune';
  description = 'Une rune qui ajoute une commande de salutation';

  register(program: IProgram) {
    program.instance
      .command('saluer')
      .description('Saluer quelqu\'un')
      .argument('<nom>', 'Nom à saluer')
      .action((nom) => {
        console.log(`Bonjour, ${nom} !`);
      });
    
    return this;
  }
}
```

### Configuration

arcane-core fournit un système de configuration pour gérer les paramètres et les options. La configuration peut être stockée dans des fichiers JSON et chargée au moment de l'exécution.

```typescript
import { ArcaneConfig } from '@protorians/arcane-core';

// Charger la configuration à partir d'un fichier
const config = new ArcaneConfig.Loader('./config.json');

// Obtenir une valeur de configuration
const valeur = config.get('clé');

// Mettre à jour une valeur de configuration
config.update('clé', 'nouvelle valeur');

// Sauvegarder la configuration
config.save();
```

## Utilisation de base

```typescript
import { ArcaneManager, ArcaneRunes } from '@protorians/arcane-core';

// Créer un nouveau programme
const program = ArcaneManager.create();

// Configurer le programme
program
  .name('Mon CLI')
  .version('1.0.0')
  .description('Une interface en ligne de commande construite avec arcane-core');

// Définir une commande
program
  .command('bonjour')
  .description('Dire bonjour')
  .action(() => {
    console.log('Bonjour, monde !');
  });

// Charger les runes à partir d'un répertoire
const runesDir = './runes';
const runesConfigFile = './runes.config.json';
ArcaneRunes.merge(program, runesDir, process.cwd(), ArcaneRunes.read(runesConfigFile));

// Analyser les arguments de la ligne de commande
program.parse(process.argv);
```

## Fonctionnalités avancées

### Création de Runes

Les Runes sont des plugins qui étendent la fonctionnalité d'un Programme. Elles peuvent ajouter de nouvelles commandes, options et arguments au CLI. Les Runes sont définies comme des classes qui implémentent l'interface `IRunePlugin`.

```typescript
import { IRunePlugin, IProgram } from '@protorians/arcane-core';

class MaRune implements IRunePlugin {
  name = 'ma-rune';
  description = 'Une rune qui ajoute une commande de salutation';

  register(program: IProgram) {
    program.instance
      .command('saluer')
      .description('Saluer quelqu\'un')
      .argument('<nom>', 'Nom à saluer')
      .action((nom) => {
        console.log(`Bonjour, ${nom} !`);
      });
    
    return this;
  }
}

// Enregistrer la rune avec un programme
const program = ArcaneManager.create();
program.manager.register(new MaRune());
```

### Configuration des Runes

Les Runes peuvent avoir leurs propres fichiers de configuration qui définissent leur comportement. La configuration est stockée dans un fichier JSON nommé `rune.config.json` dans le répertoire de la rune.

```json
{
  "slug": "ma-rune",
  "name": "Ma Rune",
  "description": "Une rune qui ajoute une commande de salutation",
  "command": "saluer",
  "options": [
    ["--verbose", "Activer la sortie détaillée"]
  ],
  "arguments": [
    ["<nom>", "Nom à saluer"]
  ]
}
```

### Téléchargement et installation de Runes

arcane-core fournit des fonctionnalités pour télécharger et installer des runes à partir de dépôts GitHub.

```typescript
import { GithubDownloader, ArcaneDirectory } from '@protorians/arcane-core';

// Télécharger et installer une rune depuis GitHub
const repository = new GithubDownloader.RepositoryDownloader(
  'propriétaire/dépôt',
  ArcaneDirectory.initialize('./caches/runes'),
  './runes'
);

repository.process()
  .then((downloaded) => {
    console.log(`Rune téléchargée vers ${downloaded.basename}`);
  })
  .catch((error) => {
    console.error('Échec du téléchargement de la rune:', error);
  });
```

## Référence API

### Programme

Le Programme est le concept central dans arcane-core. Il représente une interface en ligne de commande qui peut être étendue avec des runes.

#### Propriétés

- `token`: Obtient le jeton unique pour le programme
- `directory`: Obtient le répertoire où se trouve le programme
- `homedir`: Obtient le répertoire personnel de l'utilisateur
- `instance`: Obtient l'instance Commander utilisée par le programme
- `workdir`: Obtient le répertoire de travail du programme
- `manager`: Obtient le gestionnaire de runes pour le programme
- `mode`: Obtient le mode du programme (développement, production, etc.)
- `name`: Obtient le nom du programme
- `description`: Obtient la description du programme
- `version`: Obtient la version du programme
- `info`: Obtient les informations du package pour le programme
- `argv`: Obtient les arguments de ligne de commande passés au programme
- `configFile`: Obtient le chemin vers le fichier de configuration
- `config`: Obtient le chargeur de configuration pour le programme
- `bus`: Obtient le bus d'événements pour le programme
- `log`: Obtient l'utilitaire de journalisation pour le programme

#### Méthodes

- `run(argv)`: Exécute le programme avec les arguments de ligne de commande spécifiés

### Rune

Les Runes sont des plugins qui étendent la fonctionnalité d'un Programme.

#### Propriétés

- `name`: Obtient le nom de la rune
- `description`: Obtient la description de la rune

#### Méthodes

- `register(program)`: Enregistre la rune avec le programme spécifié

### Configuration

Le système de Configuration gère les paramètres et les options pour le programme et les runes.

#### Propriétés

- `exists`: Vérifie si le fichier de configuration existe
- `schematic`: Obtient le schéma de la configuration

#### Méthodes

- `get(key)`: Obtient une valeur de configuration
- `update(key, value)`: Met à jour une valeur de configuration
- `save()`: Sauvegarde la configuration dans le fichier

## Référence des types

| Catégorie | Type | Description |
|-----------|------|-------------|
| **Types de Programme** | `IProgram` | Interface pour le programme principal |
| | `IProgramConfig` | Interface pour la configuration du programme |
| | `IProgramBus` | Interface pour le bus d'événements du programme |
| **Types de Rune** | `IRunePlugin` | Interface pour les plugins de rune |
| | `IRuneManager` | Interface pour gérer les runes |
| | `IRuneConfig` | Interface pour la configuration des runes |
| | `IRunePayload` | Interface pour la charge utile des runes |
| | `IRuneScheme` | Interface pour le schéma des runes |
| **Types de Configuration** | `IConfigLoader` | Interface pour le chargeur de configuration |
| | `IRuneDumper` | Interface pour le dumper de runes |
| | `IRuneDumperConfig` | Interface pour la configuration du dumper de runes |
| **Types de Téléchargeur** | `IRepositoryDownloader` | Interface pour le téléchargeur de dépôt |
| | `IDownloader` | Interface pour le téléchargeur |
| | `IDownloaderOptions` | Interface pour les options du téléchargeur |

## Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.