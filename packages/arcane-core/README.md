# @protorians/arcane-core

A powerful, flexible core library for building command-line interfaces with plugin support.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Core Concepts](#core-concepts)
  - [Program](#program)
  - [Runes](#runes)
  - [Configuration](#configuration)
- [Basic Usage](#basic-usage)
- [Advanced Features](#advanced-features)
  - [Creating Runes](#creating-runes)
  - [Rune Configuration](#rune-configuration)
  - [Downloading and Installing Runes](#downloading-and-installing-runes)
- [API Reference](#api-reference)
  - [Program](#program-1)
    - [Properties](#properties)
    - [Methods](#methods)
  - [Rune](#rune)
    - [Properties](#properties-1)
    - [Methods](#methods-1)
  - [Configuration](#configuration-1)
    - [Properties](#properties-2)
    - [Methods](#methods-2)
- [Types Reference](#types-reference)
- [License](#license)

## Overview

@protorians/arcane-core is a comprehensive library for building command-line interfaces with plugin support. It provides a powerful foundation for creating CLI tools that can be extended with plugins (called "runes"). The library includes functionality for managing runes, handling configuration, and building command-line programs.

## Installation

```bash
# Using npm
npm install @protorians/arcane-core

# Using yarn
yarn add @protorians/arcane-core

# Using pnpm
pnpm add @protorians/arcane-core
```

## Core Concepts

### Program

The Program is the central concept in arcane-core. It represents a command-line interface that can be extended with runes. The Program provides methods for defining commands, options, and arguments, as well as handling the execution of commands.

```typescript
import { ArcaneManager } from '@protorians/arcane-core';

// Create a new program
const program = ArcaneManager.create();

// Configure the program
program
  .name('My CLI')
  .version('1.0.0')
  .description('A command-line interface built with arcane-core');

// Define a command
program
  .command('hello')
  .description('Say hello')
  .action(() => {
    console.log('Hello, world!');
  });

// Parse command-line arguments
program.parse(process.argv);
```

### Runes

Runes are plugins that extend the functionality of a Program. They can add new commands, options, and arguments to the CLI. Runes are defined as classes that implement the `IRunePlugin` interface.

```typescript
import { IRunePlugin, IProgram } from '@protorians/arcane-core';

class MyRune implements IRunePlugin {
  name = 'my-rune';
  description = 'A rune that adds a greeting command';

  register(program: IProgram) {
    program.instance
      .command('greet')
      .description('Greet someone')
      .argument('<name>', 'Name to greet')
      .action((name) => {
        console.log(`Hello, ${name}!`);
      });
    
    return this;
  }
}
```

### Configuration

arcane-core provides a configuration system for managing settings and options. The configuration can be stored in JSON files and loaded at runtime.

```typescript
import { ArcaneConfig } from '@protorians/arcane-core';

// Load configuration from a file
const config = new ArcaneConfig.Loader('./config.json');

// Get a configuration value
const value = config.get('key');

// Update a configuration value
config.update('key', 'new value');

// Save the configuration
config.save();
```

## Basic Usage

```typescript
import { ArcaneManager, ArcaneRunes } from '@protorians/arcane-core';

// Create a new program
const program = ArcaneManager.create();

// Configure the program
program
  .name('My CLI')
  .version('1.0.0')
  .description('A command-line interface built with arcane-core');

// Define a command
program
  .command('hello')
  .description('Say hello')
  .action(() => {
    console.log('Hello, world!');
  });

// Load runes from a directory
const runesDir = './runes';
const runesConfigFile = './runes.config.json';
ArcaneRunes.merge(program, runesDir, process.cwd(), ArcaneRunes.read(runesConfigFile));

// Parse command-line arguments
program.parse(process.argv);
```

## Advanced Features

### Creating Runes

Runes are plugins that extend the functionality of a Program. They can add new commands, options, and arguments to the CLI. Runes are defined as classes that implement the `IRunePlugin` interface.

```typescript
import { IRunePlugin, IProgram } from '@protorians/arcane-core';

class MyRune implements IRunePlugin {
  name = 'my-rune';
  description = 'A rune that adds a greeting command';

  register(program: IProgram) {
    program.instance
      .command('greet')
      .description('Greet someone')
      .argument('<name>', 'Name to greet')
      .action((name) => {
        console.log(`Hello, ${name}!`);
      });
    
    return this;
  }
}

// Register the rune with a program
const program = ArcaneManager.create();
program.manager.register(new MyRune());
```

### Rune Configuration

Runes can have their own configuration files that define their behavior. The configuration is stored in a JSON file named `rune.config.json` in the rune's directory.

```json
{
  "slug": "my-rune",
  "name": "My Rune",
  "description": "A rune that adds a greeting command",
  "command": "greet",
  "options": [
    ["--verbose", "Enable verbose output"]
  ],
  "arguments": [
    ["<name>", "Name to greet"]
  ]
}
```

### Downloading and Installing Runes

arcane-core provides functionality for downloading and installing runes from GitHub repositories.

```typescript
import { GithubDownloader, ArcaneDirectory } from '@protorians/arcane-core';

// Download and install a rune from GitHub
const repository = new GithubDownloader.RepositoryDownloader(
  'owner/repository',
  ArcaneDirectory.initialize('./caches/runes'),
  './runes'
);

repository.process()
  .then((downloaded) => {
    console.log(`Rune downloaded to ${downloaded.basename}`);
  })
  .catch((error) => {
    console.error('Failed to download rune:', error);
  });
```

## API Reference

### Program

The Program is the central concept in arcane-core. It represents a command-line interface that can be extended with runes.

#### Properties

- `token`: Gets the unique token for the program
- `directory`: Gets the directory where the program is located
- `homedir`: Gets the home directory of the user
- `instance`: Gets the Commander instance used by the program
- `workdir`: Gets the working directory of the program
- `manager`: Gets the rune manager for the program
- `mode`: Gets the mode of the program (development, production, etc.)
- `name`: Gets the name of the program
- `description`: Gets the description of the program
- `version`: Gets the version of the program
- `info`: Gets the package information for the program
- `argv`: Gets the command-line arguments passed to the program
- `configFile`: Gets the path to the configuration file
- `config`: Gets the configuration loader for the program
- `bus`: Gets the event bus for the program
- `log`: Gets the logging utility for the program

#### Methods

- `run(argv)`: Runs the program with the specified command-line arguments

### Rune

Runes are plugins that extend the functionality of a Program.

#### Properties

- `name`: Gets the name of the rune
- `description`: Gets the description of the rune

#### Methods

- `register(program)`: Registers the rune with the specified program

### Configuration

The Configuration system manages settings and options for the program and runes.

#### Properties

- `exists`: Checks if the configuration file exists
- `schematic`: Gets the schematic of the configuration

#### Methods

- `get(key)`: Gets a configuration value
- `update(key, value)`: Updates a configuration value
- `save()`: Saves the configuration to the file

## Types Reference

| Category | Type | Description |
|----------|------|-------------|
| **Program Types** | `IProgram` | Interface for the main program |
| | `IProgramConfig` | Interface for program configuration |
| | `IProgramBus` | Interface for program event bus |
| **Rune Types** | `IRunePlugin` | Interface for rune plugins |
| | `IRuneManager` | Interface for managing runes |
| | `IRuneConfig` | Interface for rune configuration |
| | `IRunePayload` | Interface for rune payload |
| | `IRuneScheme` | Interface for rune scheme |
| **Configuration Types** | `IConfigLoader` | Interface for configuration loader |
| | `IRuneDumper` | Interface for rune dumper |
| | `IRuneDumperConfig` | Interface for rune dumper configuration |
| **Downloader Types** | `IRepositoryDownloader` | Interface for repository downloader |
| | `IDownloader` | Interface for downloader |
| | `IDownloaderOptions` | Interface for downloader options |

## License

This project is licensed under the MIT License. See the LICENSE file for details.