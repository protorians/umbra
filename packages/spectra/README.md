# @protorians/spectra

A powerful, flexible server-side rendering library for creating and manipulating DOM-like elements.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Core Concepts](#core-concepts)
  - [SpectraElement](#spectraelement)
  - [Children](#children)
  - [Attributes and Styles](#attributes-and-styles)
- [Basic Usage](#basic-usage)
- [Advanced Features](#advanced-features)
  - [Async Children](#async-children)
  - [Style Manipulation](#style-manipulation)
  - [Class Management](#class-management)
- [API Reference](#api-reference)
  - [SpectraElement](#spectraelement-1)
    - [Properties](#properties)
    - [Methods](#methods)
- [Types Reference](#types-reference)
- [License](#license)

## Overview

@protorians/spectra is a comprehensive server-side rendering library that allows you to create, manipulate, and render DOM-like elements on the server. It provides a flexible API for building HTML structures programmatically, with support for attributes, styles, classes, and nested children.

## Installation

```bash
# Using npm
npm install @protorians/spectra

# Using yarn
yarn add @protorians/spectra

# Using pnpm
pnpm add @protorians/spectra
```

## Core Concepts

### SpectraElement

The `SpectraElement` is the core building block of the Spectra library. It represents a DOM-like element with properties and methods for manipulating its attributes, styles, children, and rendering. Each element has a tag name, attributes, styles, classes, and can contain child elements.

```typescript
import { SpectraElement } from '@protorians/spectra';

// Create a new div element
const div = new SpectraElement('div');

// Add attributes, styles, and children
div.attribute({ id: 'container', role: 'main' })
   .style({ backgroundColor: 'white', padding: '20px' })
   .classname('container main-content')
   .children('This is a container');
```

### Children

Elements can contain various types of children, including strings, numbers, other SpectraElements, or even promises that resolve to children (for async rendering).

```typescript
import { SpectraElement } from '@protorians/spectra';

// Create elements with different types of children
const textElement = new SpectraElement('p').children('Simple text content');
const numberElement = new SpectraElement('span').children(42);
const nestedElement = new SpectraElement('div').children([
  new SpectraElement('h1').children('Title'),
  new SpectraElement('p').children('Paragraph')
]);
```

### Attributes and Styles

SpectraElements can have attributes and styles, which are managed through dedicated methods:

```typescript
import { SpectraElement } from '@protorians/spectra';

const element = new SpectraElement('div');

// Add attributes
element.attribute({
  id: 'main',
  'data-role': 'container',
  'aria-label': 'Main content'
});

// Add data attributes (shorthand)
element.data({
  testId: 'main-container',
  index: 1
});

// Add styles
element.style({
  color: 'black',
  fontSize: '16px',
  marginX: '10px', // Special property for margin-left and margin-right
  paddingY: '5px'  // Special property for padding-top and padding-bottom
});
```

## Basic Usage

```typescript
import { SpectraElement } from '@protorians/spectra';

// Create a simple HTML structure
async function createPage() {
  const page = new SpectraElement('html');

  const head = new SpectraElement('head');
  head.append([
    new SpectraElement('title').children('My Spectra Page'),
    new SpectraElement('meta').attribute({ charset: 'utf-8' })
  ]);

  const body = new SpectraElement('body').style({ margin: 0, padding: 0 });

  const header = new SpectraElement('header')
    .classname('page-header')
    .children(new SpectraElement('h1').children('Welcome to Spectra'));

  const main = new SpectraElement('main')
    .classname('content')
    .children('This page was rendered with Spectra');

  const footer = new SpectraElement('footer')
    .classname('page-footer')
    .children('© 2023 Protorians');

  body.append([header, main, footer]);
  page.append([head, body]);

  // Render the page to HTML string
  return await page.render();
}

createPage().then(html => console.log(html));
```

## Advanced Features

### Async Children

Spectra supports asynchronous children, allowing you to include content that is loaded or generated asynchronously:

```typescript
import { SpectraElement } from '@protorians/spectra';

async function fetchUserData() {
  // Simulate API call
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        new SpectraElement('li').children('User 1'),
        new SpectraElement('li').children('User 2'),
        new SpectraElement('li').children('User 3')
      ]);
    }, 1000);
  });
}

const userList = new SpectraElement('ul')
  .classname('user-list')
  .children(fetchUserData());

// Later, when rendering:
const html = await userList.render();
console.log(html); // <ul class="user-list"><li>User 1</li><li>User 2</li><li>User 3</li></ul>
```

### Style Manipulation

Spectra provides a flexible way to manipulate styles, including special shorthand properties:

```typescript
import { SpectraElement } from '@protorians/spectra';

const box = new SpectraElement('div');

// Add multiple styles at once
box.style({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#f5f5f5',
  borderRadius: '4px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',

  // Special shorthand properties
  paddingX: '20px', // Sets padding-left and padding-right
  paddingY: '15px', // Sets padding-top and padding-bottom
  marginX: 'auto',  // Sets margin-left and margin-right
  marginY: '10px'   // Sets margin-top and margin-bottom
});
```

### Class Management

You can easily add classes to elements:

```typescript
import { SpectraElement } from '@protorians/spectra';

const element = new SpectraElement('div');

// Add a single class
element.classname('container');

// Add multiple classes as a string
element.classname('flex-column align-center');

// Add multiple classes as an array
element.classname(['card', 'shadow', 'rounded']);
```

## API Reference

### SpectraElement

The main class for creating and manipulating DOM-like elements.

#### Properties

- `tagName`: The tag name of the element (readonly)
- `blueprint`: Gets the internal blueprint of the element
- `tree`: Gets the tree of child elements
- `attributes`: Gets the element's attributes
- `dataset`: Gets the element's data attributes
- `textContent`: Gets or sets the text content of the element
- `value`: Gets or sets the value of the element (for form elements)
- `removed`: Checks if the element has been removed

#### Methods

- **Attribute Management**
  - `attribute(attributes)`: Sets attributes on the element
  - `data(attributes)`: Sets data attributes on the element

- **Style Management**
  - `style(styles)`: Sets CSS styles on the element
  - `classname(classname)`: Adds CSS classes to the element

- **Child Management**
  - `children(children)`: Sets the children of the element
  - `append(children)`: Appends children to the element
  - `prepend(children)`: Prepends children to the element
  - `appendChild(child)`: Appends a single child element

- **Element Lifecycle**
  - `remove()`: Marks the element as removed
  - `render()`: Renders the element to an HTML string

## Types Reference

| Category | Type | Description |
|----------|------|-------------|
| **Element Types** | `ISpectraElement` | Interface for Spectra elements |
| | `ISpectraBlueprint` | Internal blueprint for elements |
| **Child Types** | `ISpectraChild` | Type for child elements (string, number, element, etc.) |
| | `ISpectraAsyncChild` | Type for asynchronous children |
| | `ISpectraChildren` | Union type for all possible children types |
| **Style Types** | `ISpectraStyleKeys` | Keys for style properties |
| | `ISpectraStyleValue` | Values for style properties |
| | `ISpectraStyleValues` | Object mapping style keys to values |
| **Attribute Types** | `ISpectraAttributes` | Object mapping attribute names to values |
| | `ISpectraAttributesBlueprint` | Internal map for attributes |

## License

This project is licensed under the ISC License. See the LICENSE file for details.
