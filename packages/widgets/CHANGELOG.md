# @protorians/widgets

## 0.6.7

### Minor Changes

- Refactor utilities into distinct namespaces for clarity

### Patch Changes

- Updated dependencies
  - @protorians/colorimetric@0.1.0
  - @protorians/animetric@0.2.0
  - @protorians/spectra@0.1.0

## 0.6.6

### Patch Changes

- Sync versions
- Updated dependencies
  - @protorians/colorimetric@0.0.26
  - @protorians/animetric@0.1.5
  - @protorians/spectra@0.0.9
  - @protorians/core@0.3.8

## 0.6.5

### Patch Changes

- Add comprehensive documentation for widgets library
- Add French localization for widgets package README
- Use structuredClone for deep copying in widget-node
- Refactor Manticore engine signal handling and cleanup.
- Refactor widget state handling in `enable` and `disable`.
- Add `prepend` and `callable` methods to WidgetNode
- Move `StateWidget` and `StateWidgetWatcher` for state management
- Add `useStateful` hook for stateful widget composite management
- Add useStateless hook for handling stateless widget composite logic
- Add return type IState<T> to createState function
- Refactor hooks index: modularize state management classes.
- Remove commented-out lifecycle methods from manticore.ts
- Add explicit return type to createRef function
- Add support for associateSelector in stylesheet management
- Add utility types for unwrapping state and props
- Refactor `useStateless` to enforce `IStatelessProps` typing
- Add detachEvent method to widget-node
- Add `detachEvent` method to handle widget event removal

## 0.6.4

### Patch Changes

- Sync version
- Updated dependencies
  - @protorians/animetric@0.1.3
  - @protorians/colorimetric@0.0.25
  - @protorians/core@0.3.5
  - @protorians/spectra@0.0.8

## 0.6.3

### Patch Changes

- Add focus and blur support for widget context handling
- Add focus and blur methods to widget engine API
- Update `show` method to accept optional display parameter
- Add focus, blur, get, and set methods to widget types
- Refactor attribute handling for widget client elements
- Prevent rendering of connected widgets
- Add `Displaying` enum and optional parameter to `show` method
- Update `show` method to support optional display options
- Refine client element bounding rect handling.
- Add association methods for stylesheet declarations.
- Add `clone` method to widget node and its interface
- Refactor `unassociate` to include debug logging.
- Refactor debug logging in style.ts

## 0.6.2

### Patch Changes

- Sync
- Updated dependencies
  - @protorians/colorimetric@0.0.24
  - @protorians/animetric@0.1.2
  - @protorians/spectra@0.0.7
  - @protorians/core@0.3.3

## 0.6.1

### Patch Changes

- Refactor widget context handling and text declaration types

## 0.6.0

### Minor Changes

- Refactor theme types and add Accordion support.

## 0.5.3

### Patch Changes

- Add theme-specific color scheme overrides in core.css

## 0.5.2

### Patch Changes

- Add color scheme switching and optimize stylesheet syncing

## 0.5.1

### Patch Changes

- Up version to publish on NPMJS
- Updated dependencies
  - @protorians/colorimetric@0.0.23
  - @protorians/animetric@0.1.1
  - @protorians/spectra@0.0.6
  - @protorians/core@0.3.1

## 0.5.0

### Minor Changes

- - Refactor theme settings and enhance alert handling.
  - Rename and extend theme interface methods, add animation support
  - Refactor theme utilities and enhance widget handling.
  - Add outline and blurred props to ThemeLayer.
  - Refactor to use ObjectElevation instead of WidgetElevation.
  - Update button styling and resolve coloring method changes
  - Add ThemeAvatar composite to widgets-ui package
  - Add ThemeAspectRatio composite to widgets-ui package
  - Refactor alert-dialog component to streamline props and actions
  - Refactor alert component with enhanced capabilities
  - Refactor widget context handling in state management
  - Add utility functions for creating gradient layers
  - Add ILayerGradient interface in gradient types
  - Add IThemeAction interface to define theme-related actions
  - Rename and add keyframe animations for widget positioning.
  - Update signal types and add computed method to dispatcher
  - Add computed caching to Signal Stack
  - Add utility function to get a random element from an array
  - Add new exports for capabilities and file modules
  - Add Capability class and types for extensible signal handling
  - Add utility function to read Blob files as data URLs
  - Rename WidgetElevation to ObjectElevation for clarity
  - Fix incorrect method call in defuse function
  - Refactor size capabilities to use updated naming conventions.
  - Refactor elevation enum and improve callback safety
  - Add AlertState enum to define alert component states
  - Refactor size enums and update related references
  - Rename capability-related types and classes for clarity

### Patch Changes

- Updated dependencies
  - @protorians/animetric@0.1.0
  - @protorians/core@0.3.0

## 0.4.0

### Minor Changes

- db470c8: Use Protorians/Spectra

## 0.3.14

### Patch Changes

- Clear
- Updated dependencies
  - @protorians/animetric@0.0.21
  - @protorians/colorimetric@0.0.21
  - @protorians/core@0.2.14

## 0.3.13

### Patch Changes

- Fix Spectra dependencies version
- Updated dependencies
  - @protorians/animetric@0.0.20
  - @protorians/colorimetric@0.0.20
  - @protorians/core@0.2.13

## 0.3.12

### Patch Changes

- Add Spectra to workflow
- f9fe44d: Prepare next version
- Updated dependencies
- Updated dependencies [f9fe44d]
  - @protorians/animetric@0.0.19
  - @protorians/colorimetric@0.0.19
  - @protorians/core@0.2.12

## 0.3.11

### Patch Changes

- Umbra Patch
- Updated dependencies
  - @protorians/animetric@0.0.18
  - @protorians/colorimetric@0.0.18
  - @protorians/core@0.2.11

## 0.3.10

### Patch Changes

- 59c12b3: Fixing
- 59c12b3: Initiate Widget Project Example
- 3b864db: Patch
- 85c0453: Fix State Manager
- cd1813c: Fix Widget Project Example
- 59c12b3: Fix typing
- 59c12b3: Fix event listen payload
- Updated dependencies [3b864db]
  - @protorians/animetric@0.0.17
  - @protorians/colorimetric@0.0.17
  - @protorians/core@0.2.10

## 0.3.9

### Patch Changes

- Patching
- Updated dependencies
  - @protorians/animetric@0.0.16
  - @protorians/colorimetric@0.0.16
  - @protorians/core@0.2.9

## 0.3.8

### Patch Changes

- Fixing workflow
- Updated dependencies
  - @protorians/animetric@0.0.15
  - @protorians/colorimetric@0.0.15
  - @protorians/core@0.2.8

## 0.3.7

### Patch Changes

- Fix workflow
- Updated dependencies
  - @protorians/animetric@0.0.14
  - @protorians/colorimetric@0.0.14
  - @protorians/core@0.2.7

## 0.3.6

### Patch Changes

- Update workflow
- Updated dependencies
  - @protorians/animetric@0.0.13
  - @protorians/colorimetric@0.0.13
  - @protorians/core@0.2.6

## 0.3.5

### Patch Changes

- Patching
- Updated dependencies
  - @protorians/animetric@0.0.12
  - @protorians/colorimetric@0.0.12
  - @protorians/core@0.2.5

## 0.3.4

### Patch Changes

- Stabilize version
- Updated dependencies
  - @protorians/animetric@0.0.11
  - @protorians/colorimetric@0.0.11
  - @protorians/core@0.2.4

## 0.3.3

### Patch Changes

- patching
- Updated dependencies
  - @protorians/colorimetric@0.0.10
  - @protorians/animetric@0.0.10
  - @protorians/core@0.2.3

## 0.4.0

### Minor Changes

- Patch version

### Patch Changes

- Patch version
- Updated dependencies
- Updated dependencies
- Updated dependencies [0d0a854]
  - @protorians/animetric@0.1.0
  - @protorians/colorimetric@0.1.0
  - @protorians/core@0.3.0
