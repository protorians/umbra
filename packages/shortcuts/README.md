# @protorians/shortcuts

A powerful, flexible keyboard shortcut management library for modern web applications.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Core Concepts](#core-concepts)
  - [Shortcut Scopes](#shortcut-scopes)
  - [Key Sequences](#key-sequences)
  - [Triggers](#triggers)
- [Basic Usage](#basic-usage)
- [Advanced Features](#advanced-features)
  - [Modifier Keys](#modifier-keys)
  - [Multiple Targets](#multiple-targets)
  - [Scope Management](#scope-management)
  - [Signal Events](#signal-events)
- [API Reference](#api-reference)
  - [Shortcut](#shortcut)
    - [Properties](#properties)
    - [Methods](#methods)
  - [createShortcut](#createshortcut)
  - [Helper Functions](#helper-functions)
- [Types Reference](#types-reference)
- [License](#license)

## Overview

@protorians/shortcuts is a comprehensive keyboard shortcut management library that allows you to easily define, manage, and respond to keyboard shortcuts in your web applications. It provides a flexible API for defining key sequences, handling keyboard events, and managing shortcut scopes.

## Installation

```bash
# Using npm
npm install @protorians/shortcuts

# Using yarn
yarn add @protorians/shortcuts

# Using pnpm
pnpm add @protorians/shortcuts
```

## Core Concepts

### Shortcut Scopes

Shortcuts can be scoped to different levels:

- **Self**: The shortcut only applies to the specific target element
- **Global**: The shortcut applies globally, regardless of focus
- **Active**: The shortcut applies when the target element is active (focused)

```typescript
import { ShortcutScope } from '@protorians/shortcuts';

// Different scope options
const selfScope = ShortcutScope.Self;
const globalScope = ShortcutScope.Global;
const activeScope = ShortcutScope.Active;
```

### Key Sequences

Key sequences are arrays of key combinations that trigger a shortcut. They can include modifier keys (Ctrl, Alt, Shift, Meta) and regular keys.

```typescript
// Simple key sequence
const simpleSequence = ['a'];

// Key sequence with modifier
const modifierSequence = ['ctrl+s'];

// Complex key sequence
const complexSequence = ['ctrl+shift+a'];
```

### Triggers

Triggers are functions that are executed when a shortcut is activated. They receive the keyboard event that triggered the shortcut.

```typescript
// Simple trigger function
const trigger = (event: KeyboardEvent) => {
  console.log('Shortcut triggered!', event);
};
```

## Basic Usage

```typescript
import { createShortcut } from '@protorians/shortcuts';

// Create a shortcut for Ctrl+S
const saveShortcut = createShortcut(['ctrl+s'], {
  trigger: (event) => {
    console.log('Save shortcut triggered!');
    event.preventDefault(); // Prevent the browser's save dialog
    saveDocument();
  }
});

// Create a shortcut for Ctrl+Z
const undoShortcut = createShortcut(['ctrl+z'], {
  trigger: (event) => {
    console.log('Undo shortcut triggered!');
    event.preventDefault();
    undoLastAction();
  }
});

// Disable a shortcut
undoShortcut.disable();

// Re-enable a shortcut
undoShortcut.enable();

// Remove a shortcut
saveShortcut.unmount(['ctrl+s']);

// Clear all shortcuts
saveShortcut.clear();

// Destroy the shortcut instance (remove event listeners)
saveShortcut.destroy();
```

## Advanced Features

### Modifier Keys

The library provides helper methods for working with modifier keys:

```typescript
import { Shortcut } from '@protorians/shortcuts';

// Create a shortcut instance
const shortcut = new Shortcut(document.body, {
  trigger: (event) => console.log('Shortcut triggered!'),
});

// Add shortcuts with different modifiers
shortcut.mount(shortcut.Ctrl(['s']), (event) => {
  console.log('Ctrl+S triggered!');
  event.preventDefault();
});

shortcut.mount(shortcut.Shift(['a']), (event) => {
  console.log('Shift+A triggered!');
  event.preventDefault();
});

shortcut.mount(shortcut.Alt(['f4']), (event) => {
  console.log('Alt+F4 triggered!');
  event.preventDefault();
});

shortcut.mount(shortcut.Meta(['c']), (event) => {
  console.log('Meta+C triggered!');
  event.preventDefault();
});

// Platform-specific modifiers
shortcut.mount(shortcut.Command(['s']), (event) => {
  console.log('Command+S triggered on Mac!');
  event.preventDefault();
});

shortcut.mount(shortcut.Option(['a']), (event) => {
  console.log('Option+A triggered on Mac!');
  event.preventDefault();
});
```

### Multiple Targets

You can apply shortcuts to multiple target elements:

```typescript
import { Shortcut } from '@protorians/shortcuts';

// Get multiple elements
const textareas = document.querySelectorAll('textarea');

// Create a shortcut for all textareas
const textareaShortcut = new Shortcut(textareas, {
  trigger: (event) => console.log('Textarea shortcut triggered!'),
  scope: ShortcutScope.Active, // Only trigger when the textarea is focused
});

// Add a shortcut for Ctrl+B to make text bold
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

### Scope Management

You can control the scope of shortcuts to determine when they should be triggered:

```typescript
import { Shortcut, ShortcutScope } from '@protorians/shortcuts';

// Create a global shortcut (works anywhere)
const globalShortcut = new Shortcut(document.body, {
  trigger: (event) => console.log('Global shortcut triggered!'),
  scope: ShortcutScope.Global,
});

// Create a shortcut that only works when a specific element is focused
const modalShortcut = new Shortcut(document.getElementById('modal'), {
  trigger: (event) => console.log('Modal shortcut triggered!'),
  scope: ShortcutScope.Self,
});

// Create a shortcut that works when any element with a specific class is active
const editorShortcut = new Shortcut(document.querySelectorAll('.editor'), {
  trigger: (event) => console.log('Editor shortcut triggered!'),
  scope: ShortcutScope.Active,
});
```

### Signal Events

The Shortcut class provides a signal system for responding to shortcut events:

```typescript
import { Shortcut } from '@protorians/shortcuts';

const shortcut = new Shortcut(document.body, {
  trigger: (event) => console.log('Shortcut triggered!'),
});

// Listen for trigger events
shortcut.signal.listen('trigger', (event) => {
  console.log('Shortcut triggered via signal!', event);
});

// Listen for mount events
shortcut.signal.listen('mount', (sequence) => {
  console.log('New shortcut mounted:', sequence);
});

// Listen for unmount events
shortcut.signal.listen('unmount', (keys) => {
  console.log('Shortcut unmounted:', keys);
});

// Listen for enable/disable events
shortcut.signal.listen('enable', () => {
  console.log('Shortcuts enabled');
});

shortcut.signal.listen('disable', () => {
  console.log('Shortcuts disabled');
});

// Listen for unfocused events (when a shortcut is triggered but the target is not focused)
shortcut.signal.listen('unfocused', (event) => {
  console.log('Shortcut triggered while unfocused:', event);
});
```

## API Reference

### Shortcut

The main class for creating and managing shortcuts.

#### Properties

- `targets`: Gets the target elements for the shortcut
- `signal`: Signal stack for shortcut events
- `shortcuts`: Gets the list of shortcut sequences
- `focused`: Checks if any target element is focused

#### Methods

- **Modifier Helpers**
  - `Ctrl(keys)`: Creates a key sequence with the Ctrl modifier
  - `Shift(keys)`: Creates a key sequence with the Shift modifier
  - `Meta(keys)`: Creates a key sequence with the Meta modifier
  - `Alt(keys)`: Creates a key sequence with the Alt modifier
  - `Command(keys)`: Creates a key sequence with the Command modifier (Mac)
  - `Option(keys)`: Creates a key sequence with the Option modifier (Mac)

- **Shortcut Management**
  - `enable()`: Enables the shortcut
  - `disable()`: Disables the shortcut
  - `mount(keys, callback)`: Adds a new shortcut
  - `unmount(keys)`: Removes a shortcut
  - `clear()`: Removes all shortcuts
  - `destroy()`: Cleans up resources and removes event listeners

- **Utility Methods**
  - `resolveScope(target, scope)`: Resolves the target element based on the scope

### createShortcut

A helper function for creating shortcut instances.

```typescript
function createShortcut(
  keys: string[], 
  options: IShortcutOptions, 
  target: HTMLElement | HTMLElement[] | NodeListOf<HTMLElement> = document.body
): Shortcut
```

### Helper Functions

- `matches(sequence)`: Checks if a key sequence matches the current key state

## Types Reference

| Category | Type | Description |
|----------|------|-------------|
| **Shortcut Types** | `IShortcutTrigger` | Function type for shortcut triggers |
| | `IShortcutSequence` | Interface for key sequences and their triggers |
| | `IShortcutOptions` | Options for configuring shortcuts |
| | `IShortcut` | Interface for shortcut functionality |
| **Enum Types** | `ShortcutScope` | Enum for shortcut scopes (Self, Global, Active) |
| **Signal Types** | `IShortcutSignalMap` | Signal map for shortcut events |

## License

This project is licensed under the ISC License. See the LICENSE file for details.