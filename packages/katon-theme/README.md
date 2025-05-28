# @widgetui/katon-theme

A modern, flexible theme for the @widgetui framework, providing consistent styling and animations for UI components.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Core Concepts](#core-concepts)
  - [Theme Settings](#theme-settings)
  - [Color Variants](#color-variants)
  - [Component Styling](#component-styling)
  - [Animations](#animations)
- [Basic Usage](#basic-usage)
- [Advanced Features](#advanced-features)
  - [Custom Component Styling](#custom-component-styling)
  - [Color Resolvers](#color-resolvers)
  - [Animation Integration](#animation-integration)
- [API Reference](#api-reference)
  - [KatonTheme](#katontheme)
    - [Properties](#properties)
    - [Methods](#methods)
  - [KatonModalAnimations](#katonmodalanimations)
    - [Properties](#properties-1)
- [Types Reference](#types-reference)
- [License](#license)

## Overview

@widgetui/katon-theme is a comprehensive theme for the @widgetui framework. It provides a consistent, modern styling system for UI components, with support for customization, color variants, and animations. The theme is designed to be flexible and extensible, allowing you to create beautiful, responsive user interfaces with minimal effort.

## Installation

```bash
# Using npm
npm install @widgetui/katon-theme

# Using yarn
yarn add @widgetui/katon-theme

# Using pnpm
pnpm add @widgetui/katon-theme
```

## Core Concepts

### Theme Settings

The Katon theme provides a set of default settings that define the visual appearance of UI components. These settings include:

- **Gap**: Spacing between elements
- **Radius**: Border radius for components
- **Border**: Border width, style, and color
- **Shadow**: Box shadow for components
- **Blurred**: Backdrop filter blur amount

These settings are used consistently across all components to ensure a cohesive look and feel.

### Color Variants

The theme supports multiple color variants for components, including:

- **Primary**: Main brand color
- **Secondary**: Secondary brand color
- **Error**: For error states and messages
- **Success**: For success states and messages
- **Warning**: For warning states and messages
- **Info**: For informational states and messages
- **Link**: For hyperlinks
- **Text**: For text content
- **White**: White color variant
- **Black**: Black color variant
- **Revert**: Reversed color scheme

Each variant defines foreground, background, and edge (border) colors.

### Component Styling

The theme provides custom styling for various UI components, including:

- **Accordion**: Collapsible content panels
- **AlertDialog**: Modal dialogs for alerts and confirmations
- **Select**: Dropdown selection components

Each component is styled consistently with the theme settings while providing specific customizations for optimal usability.

### Animations

The theme includes animations for UI components, enhancing the user experience with smooth transitions. Currently, it provides animations for:

- **Modal Entry**: Animation for when a modal appears
- **Modal Exit**: Animation for when a modal disappears

## Basic Usage

```typescript
import { KatonTheme } from '@widgetui/katon-theme';
import { ThemeProvider } from '@widgetui/core';

// Create a new instance of the Katon theme
const theme = new KatonTheme();

// Use the theme with the ThemeProvider
const app = ThemeProvider({
  theme: theme,
  children: [
    // Your application components
  ]
});
```

## Advanced Features

### Custom Component Styling

You can customize the styling of specific components while maintaining the overall theme consistency:

```typescript
import { KatonTheme } from '@widgetui/katon-theme';
import { Accordion } from '@widgetui/core';

// Create a new instance of the Katon theme
const theme = new KatonTheme();

// Create an accordion with custom styling
const accordion = theme.Accordion({
  items: [
    {
      trigger: 'Section 1',
      content: 'Content for section 1'
    },
    {
      trigger: 'Section 2',
      content: 'Content for section 2'
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

### Color Resolvers

The theme provides color resolvers for different layer variants, allowing you to apply consistent coloring to your components:

```typescript
import { KatonTheme } from '@widgetui/katon-theme';
import { LayerVariant } from '@widgetui/core';

// Create a new instance of the Katon theme
const theme = new KatonTheme();

// Get colors for a primary variant
const primaryColors = theme.coloringResolves(LayerVariant.Primary);
console.log(primaryColors); // { fore: 'white', back: 'one', edge: 'one-100' }

// Get colors for an outline variant
const outlineColors = theme.outlineColoringResolves(LayerVariant.Primary);
console.log(outlineColors); // { fore: 'one', back: null, edge: 'one' }
```

### Animation Integration

The theme integrates with the @protorians/animetric library to provide smooth animations for components:

```typescript
import { KatonTheme } from '@widgetui/katon-theme';
import { KatonModalAnimations } from '@widgetui/katon-theme/animations/modal';

// Create a new instance of the Katon theme
const theme = new KatonTheme();

// Create an alert dialog with custom animations
const alertDialog = theme.AlertDialog({
  title: 'Confirmation',
  content: 'Are you sure you want to proceed?',
  animateIn: KatonModalAnimations.entry,
  animateOut: KatonModalAnimations.exit
});
```

## API Reference

### KatonTheme

The main theme class that extends WidgetTheme from @widgetui/core.

#### Properties

- `name`: Gets the name of the theme ('katon')
- `stylesheets`: Gets the default stylesheets for the theme

#### Methods

- `prepareSettings(settings)`: Prepares the theme settings with default values
- `outlineColoringResolves(color)`: Resolves colors for outline variants
- `coloringResolves(color)`: Resolves colors for filled variants
- `Accordion(declaration)`: Creates an Accordion component with theme styling
- `AlertDialog(declaration)`: Creates an AlertDialog component with theme styling
- `Select(declaration)`: Creates a Select component with theme styling

### KatonModalAnimations

A class that provides animations for modal components.

#### Properties

- `entry`: Gets the animation for modal entry
- `exit`: Gets the animation for modal exit

## Types Reference

| Category | Type | Description |
|----------|------|-------------|
| **Theme Types** | `IThemeSettings` | Interface for theme settings |
| | `IColoringLayer` | Interface for color layer definitions |
| | `LayerVariant` | Enum for layer color variants |
| **Component Types** | `IThemeAccordionOptions` | Interface for accordion options |
| | `ThemeAlertDialogOptions` | Interface for alert dialog options |
| | `IThemeSelectOptions` | Interface for select component options |
| | `IThemeSelectStyles` | Interface for select component styles |
| **Animation Types** | `IAnimetricSlimOptions` | Interface for animation options |

## License

This project is licensed under the ISC License. See the LICENSE file for details.