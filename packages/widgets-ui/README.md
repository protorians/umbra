# @widgetui/core

A powerful, flexible UI component library with comprehensive theming capabilities.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Core Concepts](#core-concepts)
  - [Themes](#themes)
  - [UI Components](#ui-components)
  - [Positioning](#positioning)
  - [Coloring](#coloring)
- [Basic Usage](#basic-usage)
- [Advanced Features](#advanced-features)
  - [Theme Customization](#theme-customization)
  - [Component Composition](#component-composition)
  - [Responsive Design](#responsive-design)
- [API Reference](#api-reference)
  - [WidgetTheme](#widgettheme)
    - [Properties](#properties)
    - [Methods](#methods)
  - [WidgetUi](#widgetui)
  - [UI Components](#ui-components-1)
- [Types Reference](#types-reference)
- [License](#license)

## Overview

@widgetui/core is a comprehensive UI component library that provides a flexible theming system and a wide range of UI components. It's built on top of several Protorians packages, including @protorians/widgets, @protorians/core, @protorians/colorimetric, and @protorians/animetric. The library offers a consistent API for creating and styling UI components with support for themes, positioning, coloring, and animations.

## Installation

```bash
# Using npm
npm install @widgetui/core

# Using yarn
yarn add @widgetui/core

# Using pnpm
pnpm add @widgetui/core
```

## Core Concepts

### Themes

Themes are at the heart of the @widgetui/core library. A theme defines the visual appearance of UI components, including colors, typography, spacing, borders, and animations. The `WidgetTheme` class provides methods for creating and managing themes, as well as for creating themed UI components.

```typescript
import { WidgetTheme } from '@widgetui/core';

// Create a new theme
const theme = new WidgetTheme({
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: '#e2e8f0',
  radius: '0.25rem',
  fontFamily: 'sans-serif',
  fontSize: '1rem',
  spacing: '1rem',
  gap: '0.5rem',
  transitionDuration: '150ms',
});

// Attach the theme to the document
theme.attach(document.body);
```

### UI Components

The library provides a wide range of UI components, including buttons, alerts, dialogs, modals, forms, navigation, and more. Each component is created through the theme instance, ensuring consistent styling across the application.

```typescript
import { WidgetTheme, LayerVariant } from '@widgetui/core';

const theme = new WidgetTheme();

// Create a button
const button = theme.Button({
  text: 'Click me',
  variant: LayerVariant.Primary,
  onClick: () => console.log('Button clicked'),
});

// Create an alert
const alert = theme.Alert({
  title: 'Success',
  message: 'Operation completed successfully',
  variant: LayerVariant.Success,
});

// Add components to the DOM
document.body.appendChild(button.element);
document.body.appendChild(alert.element);
```

### Positioning

The library provides utilities for positioning UI elements through the `WidgetUi` class. It includes predefined positions like Center, LeftTop, RightBottom, etc., and methods for converting positions to alignment values.

```typescript
import { WidgetUi } from '@widgetui/core';

// Use predefined positions
const centerPosition = WidgetUi.Position.Center;
const topRightPosition = WidgetUi.Position.RightTop;

// Convert positions to alignment values
const horizontalAlignment = WidgetUi.horizontally(centerPosition[0]);
const verticalAlignment = WidgetUi.vertically(centerPosition[1]);
```

### Coloring

The library provides a structured approach to color management through the `IColoringLayer` interface, which defines foreground, background, and edge colors for UI components. The `LayerVariant` enum provides predefined color variants like Primary, Secondary, Success, Error, etc.

```typescript
import { WidgetTheme, LayerVariant } from '@widgetui/core';

const theme = new WidgetTheme();

// Get color values for a variant
const primaryColors = theme.coloringResolves(LayerVariant.Primary);
const successColors = theme.coloringResolves(LayerVariant.Success);

console.log(primaryColors.fore.hex); // Foreground color
console.log(primaryColors.back?.hex); // Background color
console.log(primaryColors.edge?.hex); // Edge color
```

## Basic Usage

```typescript
import { WidgetTheme, LayerVariant, LayerSize } from '@widgetui/core';

// Create a theme
const theme = new WidgetTheme();

// Create a button
const button = theme.Button({
  text: 'Submit',
  variant: LayerVariant.Primary,
  size: LayerSize.M,
  onClick: () => console.log('Form submitted'),
});

// Create a dialog
const dialog = theme.Dialog({
  title: 'Confirmation',
  content: 'Are you sure you want to proceed?',
  actions: [
    theme.Button({
      text: 'Cancel',
      variant: LayerVariant.Secondary,
      onClick: () => dialog.close(),
    }),
    theme.Button({
      text: 'Confirm',
      variant: LayerVariant.Primary,
      onClick: () => {
        console.log('Action confirmed');
        dialog.close();
      },
    }),
  ],
});

// Add button to the DOM
document.body.appendChild(button.element);

// Show dialog when button is clicked
button.on('click', () => dialog.open());
```

## Advanced Features

### Theme Customization

You can customize themes by setting specific properties or by extending the `WidgetTheme` class.

```typescript
import { WidgetTheme } from '@widgetui/core';

// Create a theme with custom settings
const theme = new WidgetTheme({
  borderWidth: '2px',
  borderStyle: 'solid',
  borderColor: '#cbd5e0',
  radius: '0.5rem',
  fontFamily: 'Inter, sans-serif',
  fontSize: '0.875rem',
  spacing: '1.25rem',
  gap: '0.75rem',
  transitionDuration: '200ms',
  transitionTiming: 'ease-in-out',
});

// Update a specific setting
theme.setSetting('borderColor', '#a0aec0');

// Sync settings with the DOM
theme.syncSettings();
```

### Component Composition

You can compose complex UI structures by nesting components.

```typescript
import { WidgetTheme, LayerVariant } from '@widgetui/core';

const theme = new WidgetTheme();

// Create a card with nested components
const card = theme.Layer({
  variant: LayerVariant.Normal,
  children: [
    theme.Helmet({
      title: 'User Profile',
      subtitle: 'Personal information',
    }),
    theme.Layer({
      children: [
        theme.Avatar({
          src: 'user-avatar.jpg',
          alt: 'User Avatar',
          size: 'large',
        }),
        theme.Layer({
          children: [
            theme.View({ text: 'John Doe', tag: 'h3' }),
            theme.View({ text: 'john.doe@example.com', tag: 'p' }),
          ],
        }),
      ],
    }),
    theme.Button({
      text: 'Edit Profile',
      variant: LayerVariant.Primary,
      onClick: () => console.log('Edit profile clicked'),
    }),
  ],
});

// Add card to the DOM
document.body.appendChild(card.element);
```

### Responsive Design

The library supports responsive design through flexible layout components and size variants.

```typescript
import { WidgetTheme, LayerVariant, LayerSize } from '@widgetui/core';

const theme = new WidgetTheme();

// Create a responsive navbar
const navbar = theme.Navbar({
  brand: 'My App',
  items: [
    { text: 'Home', href: '#' },
    { text: 'Features', href: '#features' },
    { text: 'Pricing', href: '#pricing' },
    { text: 'Contact', href: '#contact' },
  ],
  actions: [
    theme.Button({
      text: 'Sign In',
      variant: LayerVariant.Secondary,
      size: LayerSize.S,
    }),
    theme.Button({
      text: 'Sign Up',
      variant: LayerVariant.Primary,
      size: LayerSize.S,
    }),
  ],
  responsive: true,
});

// Add navbar to the DOM
document.body.appendChild(navbar.element);
```

## API Reference

### WidgetTheme

The main class for creating and managing themes, as well as for creating themed UI components.

#### Properties

- `name`: Gets the name of the theme
- `selector`: Gets the CSS selector for the theme
- `settings`: Gets the theme settings
- `repository`: Gets the style element containing the theme's CSS
- `stylesheets`: Gets the theme's stylesheets

#### Methods

- **Theme Management**
  - `getSetting(name)`: Gets a specific theme setting
  - `setSetting(key, value)`: Sets a specific theme setting
  - `setSettings(settings)`: Sets multiple theme settings
  - `syncSettings()`: Synchronizes theme settings with the DOM
  - `attach(target)`: Attaches the theme to a target element
  - `detach(target)`: Detaches the theme from a target element

- **Style Utilities**
  - `outlineColoringResolves(color)`: Resolves outline colors for a variant
  - `coloringResolves(color)`: Resolves colors for a variant
  - `roundedResolves(rounded)`: Resolves rounded corners
  - `animate(widget, options)`: Animates a widget

- **Component Creation**
  - `Accordion(declaration)`: Creates an accordion component
  - `Alert(declaration)`: Creates an alert component
  - `AlertDialog(declaration)`: Creates an alert dialog component
  - `AspectRatio(declaration)`: Creates an aspect ratio container
  - `Avatar(declaration)`: Creates an avatar component
  - `Avatars(declaration)`: Creates an avatars group component
  - `Badge(declaration)`: Creates a badge component
  - `Button(declaration)`: Creates a button component
  - `Dialog(declaration)`: Creates a dialog component
  - `Helmet(declaration)`: Creates a helmet component (header)
  - `Layer(declaration)`: Creates a layer component (container)
  - `Modal(declaration)`: Creates a modal component
  - `Navbar(declaration)`: Creates a navbar component
  - `Progress(declaration)`: Creates a progress component
  - `ScrollArea(declaration)`: Creates a scroll area component
  - `Select(declaration)`: Creates a select component
  - `Sheet(declaration)`: Creates a sheet component
  - `Skeleton(declaration)`: Creates a skeleton component
  - `View(declaration)`: Creates a view component (text)
  - ... and many more component creation methods

### WidgetUi

A utility class for positioning UI elements.

- `Position`: Static property with predefined positions (Center, LeftTop, RightBottom, etc.)
- `horizontally(x)`: Converts a horizontal position to an alignment value
- `vertically(y)`: Converts a vertical position to an alignment value

### UI Components

The library provides a wide range of UI components, including:

- **Layout Components**: Layer, AspectRatio, ScrollArea, Sheet
- **Typography Components**: View, Helmet
- **Form Components**: Button, Select, Input, Checkbox, RadioGroup, Switch
- **Feedback Components**: Alert, Progress, Skeleton
- **Dialog Components**: Dialog, Modal, AlertDialog
- **Navigation Components**: Navbar, Tabs, Breadcrumb
- **Data Display Components**: Avatar, Badge, Table, List
- **Overlay Components**: Tooltip, Popover, HoverCard

## Types Reference

| Category | Type | Description |
|----------|------|-------------|
| **Theme Types** | `ITheme` | Interface for themes |
| | `IThemeSettings` | Settings for themes |
| | `IThemeComposite` | Type for theme component factories |
| | `IThemeCompositeScheme` | Scheme for theme components |
| **Color Types** | `IColoringLayer` | Layer of colors (fore, back, edge) |
| | `LayerVariant` | Enum for color variants |
| **Size Types** | `LayerSize` | Enum for size variants |
| **Component Types** | Various component option interfaces | Options for creating components |

## License

This project is licensed under the ISC License. See the LICENSE file for details.