# @protorians/widgets

Create your web user interfaces with widgets - a powerful, flexible UI library for modern web applications.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Core Concepts](#core-concepts)
  - [Widgets](#widgets)
  - [Engine](#engine)
  - [State Management](#state-management)
  - [Styling](#styling)
  - [Widget Declaration](#widget-declaration)
- [Basic Usage](#basic-usage)
- [Advanced Features](#advanced-features)
  - [Lifecycle Hooks](#lifecycle-hooks)
  - [Styling](#styling-1)
    - [Basic Styling](#basic-styling)
    - [StyleWidget](#stylewidget)
      - [Key Features](#key-features)
      - [Use Cases](#use-cases)
      - [Advanced Configuration](#advanced-configuration)
  - [State Management](#state-management-1)
  - [Widget References](#widget-references)
    - [Creating and Using References](#creating-and-using-references)
    - [Use Cases](#use-cases-1)
    - [Reference API](#reference-api)
  - [Application with Views](#application-with-views)
    - [Creating an Application](#creating-an-application)
    - [Working with Views](#working-with-views)
    - [Routing](#routing)
    - [Use Cases](#use-cases-2)
- [API Reference](#api-reference)
  - [WidgetNode](#widgetnode)
    - [Properties](#properties)
    - [Methods](#methods)
  - [Widgets](#widgets-1)
    - [Properties](#properties-1)
- [Overlay Components](#overlay-components)
  - [Layer Components](#layer-components)
  - [Text Components](#text-components)
  - [Input Components](#input-components)
  - [Media Components](#media-components)
  - [Table Components](#table-components)
- [Layout Components](#layout-components)
  - [Stack Components](#stack-components)
  - [Divider Component](#divider-component)
- [Composite Components](#composite-components)
  - [Container Component](#container-component)
  - [Glyph Component](#glyph-component)
  - [Animation Components](#animation-components)
  - [Intersection Component](#intersection-component)
- [Types Reference](#types-reference)
- [License](#license)

## Overview

@protorians/widgets is a comprehensive UI library that allows you to create dynamic, responsive web interfaces using a widget-based approach. It supports both client-side and server-side rendering, provides powerful styling capabilities, and includes a robust state management system.

## Installation

```bash
# Using npm
npm install @protorians/widgets

# Using yarn
yarn add @protorians/widgets

# Using pnpm
pnpm add @protorians/widgets
```

## Core Concepts

### Widgets

Widgets are the building blocks of your UI. Each widget represents a DOM element with enhanced capabilities for styling, event handling, state management, and more.

### Engine

The engine is responsible for rendering widgets. The package supports both client-side and server-side rendering through pluggable engines.

### State Management

Widgets include built-in state management capabilities, allowing you to create reactive UIs that update in response to state changes.

### Styling

The package provides a powerful styling system that allows you to apply styles directly to widgets, with support for style aliases, class names, and more.

### Widget Declaration

At the heart of the widget system is the `IWidgetDeclaration` interface. This is the foundation for creating all widgets in the library and defines the structure that every widget follows.

```typescript
// The basic structure of IWidgetDeclaration
type IWidgetDeclaration<E extends HTMLElement, A extends IAttributes> = A & INativeProperties<E, A>
```

In simple terms, a widget declaration combines:
1. **HTML Element Attributes** (`A`): These are the standard HTML attributes specific to the element type (like `href` for links, `type` for buttons)
2. **Native Widget Properties** (`INativeProperties<E, A>`): These are special properties that enhance the element with widget functionality

When you create a widget, you're essentially providing a declaration object that follows this structure:

```typescript
import {createRef} from "./ref";

const buttonRef = createRef()

// Example of a button widget declaration
const buttonDeclaration = {
  // HTML Button attributes
  type: 'button',
  disabled: false,

  // Native widget properties
  children: 'Click me',        // Content inside the button
  className: 'primary-button', // CSS classes
  style: {color: 'white', backgroundColor: 'blue'}, // Inline styles
  on: {                        // Event handlers
    click: () => console.log('Button clicked')
  },
  ref: buttonRef // Reference to the widget instance
}
```

The key native properties you can use in any widget declaration include:

- `children`: Content to be placed inside the element
- `className`: CSS class names to apply
- `style`: Inline styles to apply
- `on`: Event handlers for DOM events
- `listen`: Event listeners for DOM events
- `ref`: Function to capture the widget instance
- `signal`: Lifecycle event handlers
- `data`: Custom data attributes
- `elevate`: Z-index elevation level
- `features`: Additional features for specialized widgets

Understanding the widget declaration structure is essential as it forms the basis for creating and configuring all widgets in your application.

## Basic Usage

```typescript
import {Button} from '@protorians/widgets';

// Create a simple button widget
const button = Button({
    class: 'my-button',
    type: 'button',
    children: 'Click me',
    onPress: () => console.log('Statement Clicked')
});

// Add event listener
button.listen('click', () => {
    console.log('Button Listener clicked!');
});

// Mount to DOM with customElement API using
Mount('WidgetButton', () => button);
```
```html
<!doctype html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Protorians Widgets</title>
</head>
<body>
    ...
    <widget-button>
      <span>WidgetButton is not available</span>
    </widget-button>
    ...
</body>
</html>
```

## Advanced Features

### Lifecycle Hooks

Widgets provide lifecycle hooks for executing code at specific points in a widget's lifecycle.

```typescript
widget.mount((payload) => {
  console.log('Widget mounted!', payload);
});

widget.unmount((payload) => {
  console.log('Widget unmounted!', payload);
});

widget.ready((payload) => {
  console.log('Widget ready!', payload);
});
```

### Styling

#### Basic Styling

Apply styles directly to widgets:

```typescript
widget.style({
  color: 'red',
  fontSize: '16px',
  paddingX: '10px' // Uses style aliases for paddingLeft and paddingRight
});

// Add, remove, or replace class names
widget.className('active');
widget.removeClassName('inactive');
widget.replaceClassName('old-class', 'new-class');
```

#### StyleWidget

The `StyleWidget` class provides a powerful way to create, manage, and apply CSS styles to your widgets. It allows you to define styles programmatically and apply them to widgets with ease.

```typescript
import {Style} from "@protorians/widgets";

// Create a style instance
const buttonStyle = Style({
  backgroundColor: 'blue',
  color: 'white',
  padding: '10px 15px',
  borderRadius: '4px',
  border: 'none',
  cursor: 'pointer'
});

// Apply the style to a widget
buttonStyle.bind(button);

// Update a specific style property
buttonStyle.update('backgroundColor', 'red');

// Remove a style property
buttonStyle.remove('border');

// Add a hover effect using style cascades
buttonStyle.merge({
  '&:hover': Style({
    backgroundColor: 'darkblue'
  })
});
```

##### Key Features

1. **Style Aliases**: Define shorthand properties that expand to multiple CSS properties.
   ```typescript
   // paddingX expands to paddingLeft and paddingRight
   Style({
     paddingX: '10px' // Equivalent to {paddingLeft: '10px', paddingRight: '10px'}
   });
   ```

2. **Style Cascades**: Define nested styles for different states or child elements.
   ```typescript
   Style({
     color: 'black',
     '&:hover': Style({
       color: 'blue'
     }),
     '& .child': Style({
       color: 'green'
     })
   });
   ```

3. **Unit Conversion**: Automatically converts numeric values to the appropriate unit.
   ```typescript
   Style({
     fontSize: 16 // Automatically converted to '16rem' (or the configured unit)
   });
   ```

4. **Style Binding**: Bind styles directly to widgets for automatic updates.
   ```typescript
   const style = Style({color: 'red'});
   style.bind(widget);
   ```

##### Use Cases

1. **Theme Creation**:
   ```typescript
   // Define a theme with consistent styles
   const theme = {
     primary: Style({
       color: 'white',
       backgroundColor: '#007bff'
     }),
     secondary: Style({
       color: 'white',
       backgroundColor: '#6c757d'
     }),
     success: Style({
       color: 'white',
       backgroundColor: '#28a745'
     })
   };

   // Apply theme styles to widgets
   const primaryButton = Button({
     children: 'Primary Button',
     style: theme.primary
   });

   const secondaryButton = Button({
     children: 'Secondary Button',
     style: theme.secondary
   });
   ```

2. **Responsive Styles**:
   ```typescript
   const responsiveStyle = Style({
     width: '100%',
     padding: '10px',
     '@media (min-width: 768px)': {
       width: '50%',
       padding: '20px'
     },
     '@media (min-width: 1200px)': {
       width: '33.33%',
       padding: '30px'
     }
   });

   const responsiveWidget = Layer({
     children: 'Responsive Content',
     style: responsiveStyle
   });
   ```

3. **Dynamic Styling Based on State**:
   ```typescript
   import {createState} from "@protorians/widgets";

   const isActive = createState(false);
   const dynamicStyle = Style({
     backgroundColor: 'gray',
     color: 'black',
     transition: 'all 0.3s ease'
   });

   isActive.effect((active) => {
     if (active) {
       dynamicStyle.merge({
         backgroundColor: 'blue',
         color: 'white'
       }).sync();
     } else {
       dynamicStyle.merge({
         backgroundColor: 'gray',
         color: 'black'
       }).sync();
     }
   });

   const toggleButton = Button({
     children: 'Toggle Style',
     style: dynamicStyle,
     on: {
       click: () => isActive.set(!isActive.value)
     }
   });
   ```

##### Advanced Configuration

The `StyleWidget` class provides several configuration options:

```typescript
// Configure global style settings
StyleWidget.settings = {
  bytes: 4,              // Base unit size
  unit: RelativeUnit.Rem, // Default unit (Rem, Em, Px, etc.)
  spacing: 4,            // Default spacing value
  corner: 0              // Default corner radius
};

// Define custom style aliases
StyleWidget.alias.set('customPadding', ['paddingTop', 'paddingBottom']);

// Create a style with specific options
const customStyle = new StyleWidget({
  attach: true,     // Automatically attach to the DOM
  lock: false,      // Allow style updates
  fingerprint: '.custom-selector' // Custom CSS selector
}).merge({
  color: 'purple',
  customPadding: '20px' // Uses the custom alias
});
```

### State Management

Manage widget state:

```typescript
import {createState} from "@protorians/widgets";

const state = createState<number>(0);

// Get state
const currentValue = state.value

// Set state
state.set(1 + currentValue)

// Detect changement
state.effect((current)=> 
    console.log('State changed', current)
)

// Reset to initial value
state.reset();

// Bind widget
state.bind(widget)

// Inject state in widget directly
widget.content(state)
```

### Widget References

Widget references allow you to capture and store a reference to a widget instance, giving you the ability to interact with the widget directly. This is particularly useful when you need to:

- Access widget properties or methods after creation
- Manipulate the widget from outside its declaration
- Share a widget instance across different parts of your application
- Trigger actions on a widget in response to events from other components

#### Creating and Using References

```typescript
import {createRef} from "@protorians/widgets";

// Create a reference
const buttonRef = createRef();

// Create a widget with the reference
const button = Button({
  children: 'Click me',
  className: 'primary-button',
  ref: buttonRef // Attach the reference to the widget
});

// Later, you can access the widget through the reference
if (buttonRef.current) {
  // Access widget properties
  console.log(buttonRef.current.isConnected);

  // Call widget methods
  buttonRef.current.style({
    backgroundColor: 'blue',
    color: 'white'
  });

  buttonRef.current.disable(); // Disable the button
}
```

#### Use Cases

1. **Form Validation**:
   ```typescript
   const inputRef = createRef();
   const errorMessageRef = createRef();

   const input = Input({
     type: 'email',
     placeholder: 'Enter your email',
     ref: inputRef
   });

   const errorMessage = Text({
     children: 'Invalid email format',
     style: { color: 'red', display: 'none' },
     ref: errorMessageRef
   });

   // Validate on button click
   Button({
     children: 'Submit',
     on: {
       click: () => {
         const email = inputRef.current?.element.value;
         const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

         if (!isValid && errorMessageRef.current) {
           errorMessageRef.current.show();
         } else if (errorMessageRef.current) {
           errorMessageRef.current.hide();
         }
       }
     }
   });
   ```

2. **Dynamic Content Updates**:
   ```typescript
   const counterRef = createRef();
   const displayRef = createRef();

   const display = Text({
     children: '0',
     ref: displayRef
   });

   const counter = Button({
     children: 'Increment',
     ref: counterRef,
     on: {
       click: () => {
         const currentValue = parseInt(displayRef.current?.element.textContent || '0');
         displayRef.current?.content(currentValue + 1);
       }
     }
   });
   ```

3. **Controlling Widget State from External Events**:
   ```typescript
   const modalRef = createRef();

   // Create a modal widget
   const modal = Layer({
     className: 'modal',
     style: { display: 'none' },
     children: [
       Text({ children: 'Modal Content' }),
       Button({
         children: 'Close',
         on: { click: () => modalRef.current?.hide() }
       })
     ],
     ref: modalRef
   });

   // Show modal from another widget
   Button({
     children: 'Open Modal',
     on: { click: () => modalRef.current?.show() }
   });

   // Show modal based on some external condition
   window.addEventListener('keydown', (event) => {
     if (event.key === 'Escape' && modalRef.current) {
       modalRef.current.hide();
     }
   });
   ```

#### Reference API

The widget reference object provides the following methods:

- `current`: Gets the current widget instance or undefined if not attached
- `attach(widget)`: Attaches a widget to the reference (automatically called when using the `ref` property)
- `detach()`: Detaches the widget from the reference

Widget references are a powerful feature that enables more complex interactions between widgets and helps create more dynamic and responsive user interfaces.

### Application with Views

The @protorians/widgets library provides a powerful way to create complete applications using views and routing. This approach allows you to build single-page applications (SPAs) with multiple views that users can navigate between.

#### Creating an Application

The `Application` class is the foundation for creating applications. It provides a structured way to define your application's configuration, routing, and main layout.

```typescript
import {createApplication, createRouter} from "@protorians/widgets";

// Create a router with routes
const router = createRouter({
  useHash: true,  // Use hash-based routing
  baseUrl: '/',   // Base URL for the application
  index: 'home',  // Default route
  errors: {
    404: NotFoundView // Route for 404 errors
  }
});

// Define routes
router.use({
  path: 'home',
  view: HomeView
});

router.use({
  path: 'about',
  view: AboutView
});

router.use({
  path: 'notFound',
  view: NotFoundView
});

// Create the application
const app = createApplication({
  alias: 'my-app',  // Custom element name for mounting
  router: router,   // Router instance
  name: 'My App',   // Application name
  title: 'Welcome to My App', // Application title
  icon: '/assets/icon.png'    // Application icon
});

// Run the application
app.run();
```

The `createApplication` function creates an instance of the `Application` class with the provided configuration. The `run` method mounts the application to the DOM and sets up the router to handle navigation.

#### Working with Views

Views are the building blocks of your application's UI. The @protorians/widgets library provides two types of views:

1. **StatelessView**: Views that don't maintain internal state between renders
2. **StatefulView**: Views that maintain state between renders

Here's how to create a simple view:

```typescript
import {StatefulView, Section, Text, Button} from "@protorians/widgets";
import {Override} from "./decorators";

class HomeView extends StatefulView {
  // Define properties
  title = 'Home Page';

  // Define states
  counter = createState(0);

  // Render method that returns the view's widget
  @Override() render(props) {
    return Section({
      children: [
        Text({
          children: this.title
        }),
        Text({
          children: `Counter: ${this.counter.value}`
        }),
        Button({
          children: 'Increment',
          on: {
            click: () => this.counter.set(this.counter.value + 1)
          }
        })
      ]
    });
  }

  // Lifecycle methods
  onMount(payload) {
    console.log('Home view mounted', payload);
  }

  onUnmount(payload) {
    console.log('Home view unmounted', payload);
  }
}
```

#### Routing

The router is responsible for navigating between views based on the URL. When a user navigates to a route, the router constructs the corresponding view and replaces the current content with it.

```typescript
// Navigate programmatically
router.navigate('/about');

// Navigate with parameters
router.navigate('/user/123', { role: 'admin' });

// Open a specific route
router.open('about');

// Create a navigation link
Link({
  href: '#/about',
  children: 'About'
});
```

When the router navigates to a route, it:

1. Constructs the view using the `construct` method
2. Unmounts the current view
3. Mounts the new view
4. Updates the document title

#### Use Cases

1. **Single-Page Applications**:
   ```typescript
   // Create a complete SPA with multiple views
   const app = createApplication({
     alias: 'my-spa',
     router: router,
     name: 'My SPA',
     title: 'My Single-Page Application'
   });

   app.run();
   ```

2. **Dashboard Applications**:
   ```typescript
   // Create a dashboard with different sections
   router.use({
     path: 'dashboard',
     view: DashboardView
   });

   router.use({
     path: 'dashboard/analytics',
     view: AnalyticsView
   });

   router.use({
     path: 'dashboard/settings',
     view: SettingsView
   });
   ```

3. **Authentication Flow**:
   ```typescript
   // Create an authentication flow with protected routes
   class AuthRouter extends Router {
     navigate(to, props) {
       // Check if user is authenticated for protected routes
       if (to.startsWith('/protected') && !isAuthenticated()) {
         return super.navigate('/login', { redirect: to });
       }
       return super.navigate(to, props);
     }
   }

   const router = new AuthRouter({
     useHash: true,
     index: 'home'
   });

   router.use({
     path: 'login',
     view: LoginView
   });

   router.use({
     path: 'protected/profile',
     view: ProfileView
   });
   ```

The Application with Views pattern provides a powerful way to structure your web applications, making them more maintainable, scalable, and user-friendly.

## API Reference

### WidgetNode

The core class for creating widgets.

#### Properties

- `tag`: Gets the HTML tag of the widget
- `fingerprint`: Gets the unique identifier of the widget
- `isConnected`: Checks if the widget is connected to the DOM
- `clientElement`: Gets the client-side DOM element
- `serverElement`: Gets the server-side DOM element
- `children`: Gets the children of the widget
- `attributes`: Gets the attributes of the widget
- `props`: Gets the props of the widget
- `datasets`: Gets the datasets of the widget
- `reference`: Gets the reference of the widget
- `locked`: Gets or sets whether the widget is locked
- `signal`: Gets the signal stack of the widget
- `measure`: Gets the measurements of the widget
- `stylesheet`: Gets the stylesheet of the widget
- `context`: Gets the context of the widget

#### Methods

- **Lifecycle**
  - `construct(callback)`: Executes when the widget is constructed
  - `mount(callback)`: Executes when the widget is mounted
  - `unmount(callback)`: Executes when the widget is unmounted
  - `ready(callback)`: Executes when the widget is ready
  - `before(callback)`: Executes before the widget is rendered
  - `after(callback)`: Executes after the widget is rendered

- **State Management**
  - `value`: Gets a state value
  - `set(state)`: Sets state values

- **DOM Manipulation**
  - `clear()`: Clears the widget's content
  - `remove()`: Removes the widget from the DOM
  - `html(code)`: Sets the HTML content of the widget
  - `content(children)`: Sets the content of the widget
  - `append(children)`: Appends children to the widget
  - `clone()`: Creates a clone of the widget

- **Styling**
  - `style(declaration)`: Applies styles to the widget
  - `className(token)`: Adds a class name to the widget
  - `removeClassName(token)`: Removes a class name from the widget
  - `replaceClassName(oldToken, token)`: Replaces a class name
  - `clearClassName()`: Clears all class names
  - `elevate(elevation)`: Sets the elevation of the widget

- **Attributes**
  - `attribute(attributes)`: Sets attributes on the widget
  - `attributeLess(attributes)`: Removes attributes from the widget
  - `data(dataset)`: Sets data attributes on the widget

- **Events**
  - `listen(type, callback, options)`: Adds an event listener
  - `on(type, callback)`: Adds a custom event listener
  - `trigger(type)`: Triggers an event

- **Visibility**
  - `show(display)`: Shows the widget
  - `hide()`: Hides the widget
  - `toggle(option)`: Toggles the visibility of the widget

- **Focus**
  - `focus()`: Focuses the widget
  - `blur()`: Removes focus from the widget

- **State**
  - `enable()`: Enables the widget
  - `disable()`: Disables the widget
  - `lock()`: Locks the widget
  - `unlock()`: Unlocks the widget

### Widgets

A static class that provides engine management.

#### Properties

- `ServerEngine`: The server-side engine constructor
- `ClientEngine`: The client-side engine constructor
- `Engine`: An engine map for creating server-side and client-side widget engines

## Overlay Components

The overlay module provides components for creating various UI elements that overlay on the page.

### Layer Components

Components for creating semantic HTML layout elements:

- `Layer(declaration)`: Creates a generic widget node
  - **Properties**:
    - `children: IChildren`: Content to be placed inside the element
    - `className: string | string[]`: CSS class names
    - `style: IStyleDeclaration`: Inline styles to apply
    - `id: string`: Element ID
    - `hidden: boolean`: Whether the element is hidden
    - `tabindex: number`: Tab index for keyboard navigation
    - `role: string`: ARIA role
    - `signal: IWidgetSignalMap`: Signal handlers for lifecycle events

- `Section(declaration)`: Creates a section element
  - **Properties**: Same as Layer

- `MainFrame(declaration)`: Creates a main element
  - **Properties**: Same as Layer

- `HeaderFrame(declaration)`: Creates a header element
  - **Properties**: Same as Layer

- `FooterFrame(declaration)`: Creates a footer element
  - **Properties**: Same as Layer

- `AsideFrame(declaration)`: Creates an aside element
  - **Properties**: Same as Layer

### Text Components

Components for creating text elements with different styles:

- `Text(declaration)`: Creates a regular text element (span with medium font size)
  - **Properties**:
    - `children: IChildren`: Content to be placed inside the element
    - `className: string | string[]`: CSS class names
    - `style: IStyleDeclaration`: Inline styles to apply
    - `id: string`: Element ID
    - `hidden: boolean`: Whether the element is hidden

- `SmallText(declaration)`: Creates a small text element (span with small font size)
  - **Properties**: Same as Text

- `SmallerText(declaration)`: Creates a smaller text element (span with smaller font size)
  - **Properties**: Same as Text

- `LargeText(declaration)`: Creates a large text element (span with large font size)
  - **Properties**: Same as Text

- `LargerText(declaration)`: Creates a larger text element (span with larger font size)
  - **Properties**: Same as Text

- `StrongText(declaration)`: Creates a strong (bold) text element
  - **Properties**: Same as Text

- `ItalicText(declaration)`: Creates an italic text element
  - **Properties**: Same as Text

- `Link(declaration)`: Creates a hyperlink element
  - **Properties**:
    - `href: string`: URL to link to (required)
    - `target: ITarget`: Where to open the link (_blank, _self, etc.)
    - `rel: string`: Relationship between the current document and the linked document
    - `download: string`: Whether the target will be downloaded
    - `children: IChildren`: Content to be placed inside the element
    - `className: string | string[]`: CSS class names
    - `style: IStyleDeclaration`: Inline styles to apply

### Input Components

Components for creating form input elements:

- `Input(declaration)`: Creates an input element
  - **Properties**:
    - `type: IInputType`: Input type (text, password, email, number, etc.)
    - `name: string`: Input name
    - `value: string`: Input value
    - `placeholder: string`: Placeholder text
    - `disabled: boolean`: Whether the input is disabled
    - `required: boolean`: Whether the input is required
    - `readonly: boolean`: Whether the input is read-only
    - `autofocus: boolean`: Whether the input should be focused automatically
    - `min: number | string`: Minimum value (for number inputs)
    - `max: number | string`: Maximum value (for number inputs)
    - `minlength: number`: Minimum length (for text inputs)
    - `maxlength: number`: Maximum length (for text inputs)
    - `pattern: RegExp`: Validation pattern
    - `className: string | string[]`: CSS class names
    - `style: IStyleDeclaration`: Inline styles to apply

- `InputArea(declaration)`: Creates a textarea element
  - **Properties**:
    - `name: string`: Input name
    - `value: string`: Input value
    - `placeholder: string`: Placeholder text
    - `disabled: boolean`: Whether the textarea is disabled
    - `required: boolean`: Whether the textarea is required
    - `readonly: boolean`: Whether the textarea is read-only
    - `autofocus: boolean`: Whether the textarea should be focused automatically
    - `minlength: number`: Minimum length
    - `maxlength: number`: Maximum length
    - `children: IChildren`: Content to be placed inside the element
    - `className: string | string[]`: CSS class names
    - `style: IStyleDeclaration`: Inline styles to apply

- `Form(declaration)`: Creates a form element
  - **Properties**:
    - `action: string`: Form submission URL
    - `method: 'get' | 'post'`: HTTP method
    - `enctype: string`: Form encoding type
    - `target: ITarget`: Where to display the response
    - `novalidate: boolean`: Whether to disable form validation
    - `children: IChildren`: Form elements
    - `className: string | string[]`: CSS class names
    - `style: IStyleDeclaration`: Inline styles to apply

- `Label(declaration)`: Creates a label element
  - **Properties**:
    - `for: string`: ID of the form element this label is for
    - `children: IChildren`: Label text or elements
    - `className: string | string[]`: CSS class names
    - `style: IStyleDeclaration`: Inline styles to apply

- `Select(declaration)`: Creates a select dropdown
  - **Properties**:
    - `name: string`: Select name
    - `disabled: boolean`: Whether the select is disabled
    - `required: boolean`: Whether the select is required
    - `multiple: boolean`: Whether multiple options can be selected
    - `children: IChildren`: Option elements
    - `className: string | string[]`: CSS class names
    - `style: IStyleDeclaration`: Inline styles to apply

- `Option(declaration)`: Creates an option for a select element
  - **Properties**:
    - `value: string | number`: Option value
    - `selected: boolean`: Whether the option is selected
    - `disabled: boolean`: Whether the option is disabled
    - `label: string`: Option label
    - `children: IChildren`: Option text

- `OptionGroup(declaration)`: Creates an option group
  - **Properties**:
    - `label: string`: Group label
    - `disabled: boolean`: Whether the group is disabled
    - `children: IChildren`: Option elements

### Media Components

Components for creating media elements:

- `Image(declaration)`: Creates an image element
  - **Properties**:
    - `src: string`: Image source URL
    - `alt: string`: Alternative text for the image
    - `width: string | number`: Image width
    - `height: string | number`: Image height
    - `loading: 'lazy' | 'eager'`: Loading strategy
    - `decoding: 'sync' | 'async' | 'auto'`: Decoding strategy
    - `className: string | string[]`: CSS class names
    - `style: IStyleDeclaration`: Inline styles to apply

- `Video(declaration)`: Creates a video element
  - **Properties**:
    - `src: string`: Video source URL
    - `autoplay: boolean`: Whether the video should play automatically
    - `controls: boolean`: Whether to show video controls
    - `loop: boolean`: Whether the video should loop
    - `muted: boolean`: Whether the video should be muted
    - `poster: string`: URL of an image to show before the video plays
    - `preload: 'auto' | 'metadata' | 'none'`: How the video should be preloaded
    - `width: string | number`: Video width
    - `height: string | number`: Video height
    - `children: IChildren`: Source elements or fallback content
    - `className: string | string[]`: CSS class names
    - `style: IStyleDeclaration`: Inline styles to apply

- `Picture(declaration)`: Creates a picture element
  - **Properties**:
    - `source: ISourceProps | ISourceProps[]`: Source elements or array of source elements
    - `src: string`: Fallback image source URL
    - `alt: string`: Alternative text for the image
    - `children: IChildren`: Source elements and img element
    - `className: string | string[]`: CSS class names
    - `style: IStyleDeclaration`: Inline styles to apply

- `Source(declaration)`: Creates a source element for media elements
  - **Properties**:
    - `src: string`: Media source URL
    - `srcset: string`: Set of image sources for responsive images
    - `media: string`: Media query for when to use this source
    - `type: string`: MIME type of the media
    - `sizes: string`: Image sizes for different viewport sizes

### Table Components

Components for creating table elements:

- `Table(declaration)`: Creates a table element
  - **Properties**:
    - `children: IChildren`: Table content (thead, tbody, tfoot, tr, etc.)
    - `className: string | string[]`: CSS class names
    - `style: IStyleDeclaration`: Inline styles to apply

- `TableHead(declaration)`: Creates a table head element (`<thead>`)
  - **Properties**:
    - `children: IChildren`: Table row elements
    - `className: string | string[]`: CSS class names
    - `style: IStyleDeclaration`: Inline styles to apply

- `TableBody(declaration)`: Creates a table body element (`<tbody>`)
  - **Properties**:
    - `children: IChildren`: Table row elements
    - `className: string | string[]`: CSS class names
    - `style: IStyleDeclaration`: Inline styles to apply

- `TableFoot(declaration)`: Creates a table foot element (`<tfoot>`)
  - **Properties**:
    - `children: IChildren`: Table row elements
    - `className: string | string[]`: CSS class names
    - `style: IStyleDeclaration`: Inline styles to apply

- `TableRow(declaration)`: Creates a table row element (`<tr>`)
  - **Properties**:
    - `children: IChildren`: Table cell elements
    - `className: string | string[]`: CSS class names
    - `style: IStyleDeclaration`: Inline styles to apply

- `TableCell(declaration)`: Creates a table cell element (`<td>`)
  - **Properties**:
    - `colspan: number`: Number of columns the cell spans
    - `rowspan: number`: Number of rows the cell spans
    - `headers: string`: IDs of header cells this cell relates to
    - `children: IChildren`: Cell content
    - `className: string | string[]`: CSS class names
    - `style: IStyleDeclaration`: Inline styles to apply

- `TableHeadCell(declaration)`: Creates a table header cell element (`<th>`)
  - **Properties**:
    - `colspan: number`: Number of columns the cell spans
    - `rowspan: number`: Number of rows the cell spans
    - `scope: 'row' | 'col' | 'rowgroup' | 'colgroup'`: Scope of the header cell
    - `children: IChildren`: Cell content
    - `className: string | string[]`: CSS class names
    - `style: IStyleDeclaration`: Inline styles to apply

- `TableCaption(declaration)`: Creates a table caption element (`<caption>`)
  - **Properties**:
    - `children: IChildren`: Caption content
    - `className: string | string[]`: CSS class names
    - `style: IStyleDeclaration`: Inline styles to apply

- `TableColumnGroup(declaration)`: Creates a table column group element (`<colgroup>`)
  - **Properties**:
    - `children: IChildren`: Column elements
    - `className: string | string[]`: CSS class names
    - `style: IStyleDeclaration`: Inline styles to apply

- `TableColumn(declaration)`: Creates a table column element (`<col>`)
  - **Properties**:
    - `span: number`: Number of columns the element spans
    - `className: string | string[]`: CSS class names
    - `style: IStyleDeclaration`: Inline styles to apply

## Layout Components

The layout module provides components for creating various layout structures.

### Stack Components

Components for creating flexible layouts:

- `Stack(declaration)`: Creates a flexible container with customizable direction and alignment
  - **Properties**:
    - `children: IChildren`: Content to be placed inside the container
    - `direction: AligningDirection`: Flex direction
    - `alignItems: string`: Alignment of items along the cross axis
    - `justifyContent: string`: Alignment of items along the main axis
    - `className: string | string[]`: CSS class names
    - `style: IStyleDeclaration`: Inline styles to apply

- `Row(declaration)`: Creates a row-oriented flexible container
  - **Properties**:
    - `children: IChildren`: Content to be placed inside the container
    - `justifyContent: string`: Alignment of items along the horizontal axis
    - `className: string | string[]`: CSS class names
    - `style: IStyleDeclaration`: Inline styles to apply

- `Column(declaration)`: Creates a column-oriented flexible container
  - **Properties**:
    - `children: IChildren`: Content to be placed inside the container
    - `alignItems: string`: Alignment of items along the horizontal axis
    - `className: string | string[]`: CSS class names
    - `style: IStyleDeclaration`: Inline styles to apply

### Divider Component

Component for creating dividers:

- `Divider(declaration)`: Creates a divider element with customizable size and direction
  - **Properties**:
    - `features.size: string | number`: Size of the divider (width for horizontal, height for vertical)
    - `features.direction: AligningDirection`: Direction of the divider (row or column)
    - `class: string | string[]`: CSS class names
    - `style: IStyleDeclaration`: Inline styles to apply

## Composite Components

The composite module provides higher-level components that combine multiple widgets or add advanced functionality.

### Container Component

- `Container(declaration)`: Creates a centered container with customizable size and content
  - **Properties**:
    - `size: string | number | ObjectSize`: Container size (number or predefined size like 'small', 'medium', 'large')
    - `children: IChildren`: Content to be placed inside the container
    - `contentAttributes: ICommonAttributes`: Attributes for the content wrapper
    - `style: IStyleDeclaration`: Inline styles to apply to the container

### Glyph Component

- `Glyph({name, pack, size, color})`: Creates an icon/glyph element with customizable size and color
  - **Properties**:
    - `name: string`: Icon name
    - `pack: string`: Icon pack name (optional)
    - `size: number`: Icon size (number, default: 4)
    - `color: string`: Icon color

### Animation Components

- `Animate({children, frame, from, to, duration, ...})`: Animates a single widget using the specified animation parameters
  - **Properties**:
    - `children: IWidgetNode<E, A>`: Widget to animate
    - `frame: (payload: IAnimateFramePayload<E, A>) => void`: Animation frame callback function
    - `from: number[]`: Starting values for the animation
    - `to: number[]`: Ending values for the animation
    - `duration: number`: Animation duration in milliseconds (default: 1000)
    - `decimal: number`: Decimal precision for animation values
    - `delay: number`: Delay before starting the animation
    - `ease: IEasing | (t: number) => number`: Easing class in `@protorians/core` or Easing function
    - `infinite: boolean`: Whether the animation should repeat infinitely

- `AnimateGroup({children, frame, from, to, duration, ...})`: Animates a group of widgets using the specified animation parameters
  - **Properties**: Same as Animate, but `children: IWidgetNode<any, any>[]` is an array of widgets

### Intersection Component

- `Intersection(declaration)`: Creates an intersection observer for a widget, with callbacks for when the widget enters or exits the viewport
  - **Properties**:
    - `children: IWidgetNode<E, A>`: Widget to observe
    - `release: ICallable<E, A>`: Callback function when the widget enters the viewport
    - `unrelease: ICallable<E, A>`: Callback function when the widget exits the viewport
    - `threshold: number`: Intersection threshold (0 to 1, default: 1)
    - `detector: IntersectionDetector`: Detection method ('ratio' or 'intersecting')
    - `root: IWidgetNode<any, any>`: Root element for intersection observation
    - `rootMargin: string`: Margin around the root element

## Types Reference

This section provides a comprehensive overview of the TypeScript types used in the @protorians/widgets library. These types help ensure type safety and provide better development experience with autocompletion and documentation.

| Category | Type | Description |
|----------|------|-------------|
| **Widget Types** | `IWidgetNode` | The core interface for all widgets, providing methods for DOM manipulation, event handling, styling, etc. |
| | `IWidgetElement` | Represents the DOM element associated with a widget. |
| | `IWidgetDeclaration` | Defines the structure for widget creation parameters. |
| | `IWidgetCollection` | Represents a collection of widgets. |
| **Attribute Types** | `IAttributes` | Base interface for HTML element attributes. |
| | `ICommonAttributes` | Common attributes shared by most HTML elements. |
| | `IAccessibilityAttributes` | Attributes related to accessibility (ARIA). |
| | `IInputAttributes` | Attributes specific to input elements. |
| | `IButtonAttributes` | Attributes specific to button elements. |
| | `ILinkAttributes` | Attributes specific to anchor (link) elements. |
| **Style Types** | `IStyleDeclaration` | Interface for CSS style declarations. |
| | `IStyleSheet` | Interface for managing stylesheets. |
| | `IStyleExtendedDeclaration` | Extended style properties like paddingX, paddingY, etc. |
| | `IStyleSupportedValue` | Types that can be used as style values. |
| **Event Types** | `INativeEventMap` | Map of native DOM events. |
| | `IGlobalEventMap` | Map of global events. |
| | `ICallable` | Function type for event callbacks. |
| **State Types** | `IStateStack` | Interface for managing widget state. |
| | `IPropStack` | Interface for managing widget properties. |
| **Layout Types** | `IGridAttributes` | Attributes for grid layouts. |
| | `IRowAttributes` | Attributes for row layouts. |
| | `IColumnAttributes` | Attributes for column layouts. |
| **Component Types** | `IComponentProps` | Properties for components. |
| | `IComponentState` | State for components. |
| **Children Types** | `IChildren` | Types that can be used as children of widgets. |
| | `IChildrenSupported` | Interface for widgets that support children. |
| **Value Types** | `IPrimitive` | Basic primitive types (string, number, boolean). |
| | `IPrimitives` | Array of primitive types. |
| | `IStringToken` | String token type. |
| **Measurement Types** | `IMeasure` | Interface for widget measurements. |
| **Animation Types** | `IAnimateFramePayload` | Payload for animation frames. |
| | `IAnimateOptions` | Options for animations. |
| **Router Types** | `IRouterOptions` | Options for router configuration. |
| | `IRouteOptions` | Options for individual routes. |
| **Application Types** | `IApplicationOptions` | Options for application configuration. |
| | `IApplicationState` | State for applications. |

This table provides a high-level overview of the main types used in the library. Each type is designed to make development more predictable and provide better tooling support through TypeScript's static type checking.


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC
