# @protorians/core

A powerful, flexible utility library for modern JavaScript and TypeScript applications.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Core Concepts](#core-concepts)
  - [Signals](#signals)
  - [Dictionaries](#dictionaries)
  - [Collections](#collections)
  - [Environment](#environment)
- [Basic Usage](#basic-usage)
- [Advanced Features](#advanced-features)
  - [Signal Stack](#signal-stack)
  - [Signal Controller](#signal-controller)
  - [Dictionary](#dictionary)
  - [Utilities](#utilities)
- [API Reference](#api-reference)
  - [Signals](#signals-1)
    - [Properties](#properties)
    - [Methods](#methods)
  - [Dictionary](#dictionary-1)
    - [Properties](#properties-1)
    - [Methods](#methods-1)
  - [Utilities](#utilities-1)
    - [Text](#text)
    - [Number](#number)
    - [Object](#object)
    - [Date](#date)
    - [URL](#url)
    - [HTML](#html)
- [Types Reference](#types-reference)
- [License](#license)

## Overview

@protorians/core is a comprehensive utility library that provides a foundation for building modern JavaScript and TypeScript applications. It includes utilities for event handling, state management, data structures, and common operations on strings, numbers, objects, and more.

## Installation

```bash
# Using npm
npm install @protorians/core

# Using yarn
yarn add @protorians/core

# Using pnpm
pnpm add @protorians/core
```

## Core Concepts

### Signals

Signals are a powerful event handling system that allows you to create, dispatch, and listen for events in your application. Protorians Core provides two main interfaces for signals:

- **SignalStack**: A stack-based event system for registering listeners and dispatching events.
- **SignalController**: A reactive state management system that allows you to track and respond to state changes.

```typescript
import { Signal } from '@protorians/core';

// Create a signal stack
const signal = new Signal.Stack<{
  click: { x: number; y: number };
  hover: { element: HTMLElement };
}>();

// Listen for events
signal.listen('click', ({ x, y }) => {
  console.log(`Clicked at (${x}, ${y})`);
});

// Dispatch events
signal.dispatch('click', { x: 100, y: 200 });
```

### Dictionaries

Dictionaries are key-value stores with a rich API for manipulating and accessing data. They provide type-safe access to values and methods for transforming the data.

```typescript
import { Dictionary } from '@protorians/core';

// Create a dictionary
const dict = new Dictionary<{
  name: string;
  age: number;
  email: string;
}>();

// Set values
dict.set('name', 'John Doe');
dict.set('age', 30);
dict.set('email', 'john@example.com');

// Get values
console.log(dict.get('name')); // 'John Doe'

// Convert to array
console.log(dict.array); // [['name', 'John Doe'], ['age', 30], ['email', 'john@example.com']]
```

### Collections

Collections are ordered lists of items with methods for adding, removing, and manipulating items. They provide a more powerful alternative to arrays.

```typescript
import { Collection } from '@protorians/core';

// Create a collection
const collection = new Collection<string>();

// Add items
collection.add('apple');
collection.add('banana');
collection.add('orange');

// Check if an item exists
console.log(collection.has('banana')); // true

// Remove an item
collection.remove('banana');

// Iterate over items
collection.each((item, index) => {
  console.log(`Item ${index}: ${item}`);
});
```

### Environment

The Environment utility provides information about the current execution environment, such as whether the code is running in a browser, Node.js, or a service worker.

```typescript
import { Environment } from '@protorians/core';

if (Environment.Client) {
  // Code running in a browser
  console.log('Running in a browser');
} else if (Environment.Server) {
  // Code running in Node.js
  console.log('Running in Node.js');
}
```

## Basic Usage

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


// Create a signal stack
const signal = new Signal.Stack<{
    update: { value: number };
}>();

// Listen for events
signal.listen('update', ({value}) => {
    console.log(`Value updated to ${value}`);
});

// Create a dictionary
const dict = new Dictionary<{
    count: number;
}>();

// Set initial value
dict.set('count', 0);

// Update the value and dispatch an event
function increment() {
    const currentCount = dict.get('count');
    dict.set('count', currentCount + 1);
    signal.dispatch('update', {value: currentCount + 1});
}

// Use text utilities
const slug = TextUtility.slugify('Hello World!'); // 'hello-world'
const truncated = TextUtility.truncate('This is a long text', 10); // 'This is a...'

// Use number utilities
const formatted = NumberUtility.isNumber(1234.56); // true

// Use array utilities
const merged = ObjectUtility.unWrapArray([[1, 2, 3, [4, 5, 6]], [7, 8], [9]]); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

## Advanced Features

### Signal Stack

The Signal Stack provides a powerful event system with features like:

- **Event Prioritization**: Control the order in which listeners are called.
- **Cancellable Events**: Allow listeners to cancel the event propagation.
- **Computed Values**: Get the computed result of an event dispatch.

```typescript
import { Signal } from '@protorians/core';

const signal = new Signal.Stack<{
  calculate: { a: number; b: number };
}>();

// Add a listener with high priority
signal.listen('calculate', ({ a, b }) => {
  return a + b;
});

// Add a listener with lower priority
signal.listen('calculate', ({ a, b }) => {
  console.log(`Calculating ${a} + ${b}`);
});

// Dispatch and get the computed result
signal.dispatch('calculate', { a: 5, b: 3 });
const result = signal.computed<number>('calculate');
console.log(result); // 8
```

### Signal Controller

The Signal Controller provides reactive state management with features like:

- **State Tracking**: Track changes to state properties.
- **Effect Callbacks**: Execute callbacks when state changes.
- **State Reset**: Reset state to its original values.

```typescript
import { Signal } from '@protorians/core';

// Create a state object
const state = {
  count: 0,
  name: 'John'
};

// Create a signal controller
const controller = new Signal.Controller(state);

// Add an effect callback
controller.effect(({ target, name, value }) => {
  console.log(`Property ${String(name)} changed to ${value}`);
});

// Update state
controller.assign('count', 1); // Logs: Property count changed to 1
controller.assign('name', 'Jane'); // Logs: Property name changed to Jane

// Reset state
controller.reset(state);
```

### Dictionary

The Dictionary class provides advanced features for working with key-value data:

- **Type Safety**: Ensure type safety for keys and values.
- **Data Transformation**: Transform data using parsers.
- **Serialization**: Convert to and from strings.

```typescript
import { Dictionary } from '@protorians/core';

// Create a dictionary with initial values
const dict = new Dictionary<{
  name: string;
  age: number;
  email: string;
}>({
  name: 'John Doe',
  age: 30,
  email: 'john@example.com'
});

// Transform values
dict.parse((key, value) => {
  if (key === 'name') {
    return value.toUpperCase();
  }
  return value;
});

console.log(dict.get('name')); // 'JOHN DOE'

// Convert to string
const str = dict.string;
console.log(str); // '{"name":"JOHN DOE","age":30,"email":"john@example.com"}'

// Create from string
const newDict = new Dictionary<{
  foo: string;
  bar: number;
}>();
newDict.fromString('{"foo":"hello","bar":42}');
console.log(newDict.get('foo')); // 'hello'
```

### Utilities

Protorians Core provides a rich set of utilities for common operations:

```typescript
import {
    HTMLUtility,
    NumberUtility,
    TextUtility,
    ObjectUtility,
} from '@protorians/core';

// Text utilities
const camelCase = TextUtility.camelCase('hello-world'); // 'helloWorld'
const kebabCase = TextUtility.kebabCase('helloWorld'); // 'hello-world'
const capitalize = TextUtility.capitalize('hello'); // 'Hello'

// Number utilities
const clamp = NumberUtility.clamp(150, 0, 100); // 100
const pad = NumberUtility.pad(5, 3); // '005'
const isEven = NumberUtility.isEven(4); // true

// Object utilities
const clone = ObjectUtility.clone({a: 1, b: {c: 2}}); // Object clone
const omit = ObjectUtility.omit({a: 1, b: 2, c: 3}, ['b']); // { a: 1, c: 3 }

// HTML utilities
const escape = HTMLUtility.escape('<div>Hello</div>'); // '&lt;div&gt;Hello&lt;/div&gt;'
const unescape = HTMLUtility.unescape('&lt;div&gt;Hello&lt;/div&gt;'); // '<div>Hello</div>'
const stripTags = HTMLUtility.stripTags('<p>Hello <b>World</b></p>'); // 'Hello World'
```

## API Reference

### Signals

The Signals module provides tools for event handling and state management.

#### Properties

- `Stack`: Class for creating event stacks
- `Controller`: Class for creating reactive state controllers

#### Methods

**Signal.Stack**:
- `listen(type, callable, options)`: Adds a listener for an event
- `dispatch(type, payload)`: Dispatches an event
- `computed<T>(type)`: Gets the computed result of an event
- `remove(type, index)`: Removes a listener by index
- `removeStack(type)`: Removes all listeners for an event
- `removeCallable(callable, type)`: Removes a specific listener
- `clear()`: Removes all listeners

**Signal.Controller**:
- `update(target)`: Updates the state
- `reset(target)`: Resets the state
- `assign(key, value)`: Assigns a value to a state property
- `effect(callable)`: Adds an effect callback
- `trigger(name, value)`: Triggers an effect
- `compute()`: Computes the current state

### Dictionary

The Dictionary class provides a type-safe key-value store.

#### Properties

- `map`: Gets the underlying object
- `array`: Gets the dictionary as an array of key-value pairs
- `string`: Gets the dictionary as a JSON string

#### Methods

- `get(key)`: Gets a value by key
- `set(key, value)`: Sets a value by key
- `remove(key)`: Removes a key
- `clear()`: Removes all keys
- `fromString(data)`: Initializes from a JSON string
- `parse(callable)`: Transforms values using a parser
- `many(values)`: Sets multiple values
- `values()`: Gets all values
- `keys()`: Gets all keys

### Utilities

Protorians Core provides various utility modules for common operations.

#### Text

- `camelCase(str)`: Converts a string to camelCase
- `kebabCase(str)`: Converts a string to kebab-case
- `snakeCase(str)`: Converts a string to snake_case
- `capitalize(str)`: Capitalizes the first letter
- `truncate(str, length, suffix)`: Truncates a string
- `slugify(str)`: Converts a string to a URL-friendly slug
- `trimSpace(str)`: Trims and normalizes whitespace
- `pad(str, length, char)`: Pads a string to a specific length

#### Number

- `format(num, decimals, decimalSeparator, thousandsSeparator)`: Formats a number
- `random(min, max)`: Generates a random number
- `clamp(num, min, max)`: Clamps a number between min and max
- `pad(num, length)`: Pads a number with leading zeros
- `isEven(num)`: Checks if a number is even
- `isOdd(num)`: Checks if a number is odd
- `round(num, decimals)`: Rounds a number to a specific number of decimals

#### Object

- `clone(obj)`: Deep clones an object
- `merge(obj1, obj2)`: Merges two objects
- `pick(obj, keys)`: Creates a new object with selected keys
- `omit(obj, keys)`: Creates a new object without specified keys
- `isEqual(obj1, obj2)`: Checks if two objects are equal
- `isEmpty(obj)`: Checks if an object is empty
- `entries(obj)`: Gets an array of key-value pairs
- `fromEntries(entries)`: Creates an object from key-value pairs

## Types Reference

| Category | Type | Description |
|----------|------|-------------|
| **Signal Types** | `ISignalStack<M>` | Interface for signal stacks with generic event map |
| | `ISignalController<I>` | Interface for reactive state controllers |
| | `ISignalStackCallable<P>` | Type for signal stack callback functions |
| | `ISignalStackOptions` | Options for signal stack listeners |
| **Dictionary Types** | `IDictionary<T>` | Interface for dictionaries with generic value types |
| | `IDictionaryCallbackParser<T>` | Type for dictionary value parsers |
| **Collection Types** | `ICollection<T>` | Interface for collections with generic item types |
| | `ICollectionCallable<T>` | Type for collection callback functions |
| **Environment Types** | `IEnvironment` | Interface for environment detection |
| **Utility Types** | `ITextUtilities` | Interface for text utilities |
| | `INumberUtilities` | Interface for number utilities |
| | `IObjectUtilities` | Interface for object utilities |
| | `IDateUtilities` | Interface for date utilities |
| | `IURLUtilities` | Interface for URL utilities |
| | `IHTMLUtilities` | Interface for HTML utilities |

## License

This project is licensed under the MIT License. See the LICENSE file for details.