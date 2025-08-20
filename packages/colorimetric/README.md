# @protorians/colorimetric

A powerful, flexible color management library for modern web applications.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Core Concepts](#core-concepts)
  - [Color Formats](#color-formats)
  - [Color Conversion](#color-conversion)
  - [Color Manipulation](#color-manipulation)
- [Basic Usage](#basic-usage)
- [Advanced Features](#advanced-features)
  - [Color Variants](#color-variants)
  - [Color Schemes](#color-schemes)
  - [Color Intensity](#color-intensity)
- [API Reference](#api-reference)
  - [Colorimetric](#colorimetric)
    - [Properties](#properties)
    - [Methods](#methods)
  - [Color Classes](#color-classes)
    - [Hex](#hex)
    - [Rgba](#rgba)
    - [Hsl](#hsl)
    - [Oklch](#oklch)
    - [Lch](#lch)
    - [Lab](#lab)
    - [Xyz](#xyz)
- [Types Reference](#types-reference)
- [License](#license)

## Overview

@protorians/colorimetric is a comprehensive color management library that allows you to work with colors in various formats, convert between formats, manipulate colors, and generate color schemes. It provides powerful utilities for color manipulation, including lightness/darkness adjustments, color inversion, and color variant generation.

## Installation

```bash
# Using npm
npm install @protorians/colorimetric

# Using yarn
yarn add @protorians/colorimetric

# Using pnpm
pnpm add @protorians/colorimetric
```

## Core Concepts

### Color Formats

The library supports multiple color formats:

- **Hex**: Standard hexadecimal color format (`#RRGGBB` or `#RRGGBBAA`)
- **RGB/RGBA**: Red, Green, Blue (with optional Alpha) format
- **HSL**: Hue, Saturation, Lightness format
- **OKLCH**: Perceptually uniform color space with lightness, chroma, and hue
- **LCH**: Lightness, Chroma, Hue color space
- **LAB**: L*a*b* color space
- **XYZ**: CIE XYZ color space

### Color Conversion

The library provides utilities to convert colors between different formats:

```typescript
import { Colorimetric } from '@protorians/colorimetric';

// Convert hex to RGB
const rgb = Colorimetric.Hex.toRgb('#FF5733');
console.log(rgb); // { red: 255, green: 87, blue: 51 }

// Convert RGB to hex
const hex = Colorimetric.Rgba.toHex(255, 87, 51);
console.log(hex); // '#FF5733'

// Convert hex to OKLCH
const oklch = Colorimetric.Hex.toOklch('#FF5733');
console.log(oklch); // { lightness: 0.67, chroma: 0.24, hue: 27.2 }
```

### Color Manipulation

The library provides various methods to manipulate colors:

```typescript
import { Colorimetric } from '@protorians/colorimetric';

// Lighten a color
const lightened = Colorimetric.lightness('#FF5733', 50);
console.log(lightened); // '#FF8C73'

// Darken a color
const darkened = Colorimetric.darkness('#FF5733', 50);
console.log(darkened); // '#B31F00'

// Invert a color
const inverted = Colorimetric.invert('#FF5733');
console.log(inverted); // '#00A8CC'

// Adjust alpha
const withAlpha = Colorimetric.alpha('#FF5733', 50);
console.log(withAlpha); // '#FF573380'
```

## Basic Usage

```typescript
import { Colorimetric } from '@protorians/colorimetric';

// Create a color
const color = '#3498DB';

// Get color information
console.log(Colorimetric.red(color)); // 52
console.log(Colorimetric.green(color)); // 152
console.log(Colorimetric.blue(color)); // 219
console.log(Colorimetric.intensity(color)); // 134

// Convert to different formats
console.log(Colorimetric.Rgba.toString(color)); // 'rgb(52, 152, 219)'
console.log(Colorimetric.Oklch.toString(Colorimetric.Hex.toOklch(color))); // 'oklch(60% 0.15 235.4)'

// Manipulate the color
const lighter = Colorimetric.lightness(color, 30);
const darker = Colorimetric.darkness(color, 30);
const saturated = Colorimetric.saturate(color, 30);
const withHue = Colorimetric.hue(color, 30);

// Generate color variants
const variants = Colorimetric.generates('primary', color);
console.log(variants['primary-500']); // A mid-tone variant
console.log(variants['primary-900']); // A dark variant
console.log(variants['primary-alpha-5']); // A semi-transparent variant
```

## Advanced Features

### Color Variants

The library can generate a complete set of color variants from a base color:

```typescript
import { Colorimetric } from '@protorians/colorimetric';

// Generate variants for a primary color
const primaryVariants = Colorimetric.generates('primary', '#3498DB');

// Access different variants
console.log(primaryVariants['primary']); // Base color
console.log(primaryVariants['primary-100']); // Lightest variant
console.log(primaryVariants['primary-900']); // Darkest variant
console.log(primaryVariants['primary-alpha']); // Semi-transparent variant
console.log(primaryVariants['primary-invert']); // Inverted color
```

### Color Schemes

You can create color schemes by generating variants for multiple base colors:

```typescript
import { Colorimetric } from '@protorians/colorimetric';

// Create a color scheme
const colorScheme = {
  ...Colorimetric.generates('primary', '#3498DB'),
  ...Colorimetric.generates('secondary', '#2ECC71'),
  ...Colorimetric.generates('accent', '#E74C3C'),
  ...Colorimetric.generates('neutral', '#95A5A6')
};

// Use the color scheme in your application
document.body.style.backgroundColor = colorScheme['neutral-100'];
document.body.style.color = colorScheme['neutral-900'];
document.querySelector('.button').style.backgroundColor = colorScheme['primary'];
document.querySelector('.button:hover').style.backgroundColor = colorScheme['primary-700'];
```

### Color Intensity

The library provides a way to calculate the intensity of a color, which can be useful for determining if a color is light or dark:

```typescript
import { Colorimetric } from '@protorians/colorimetric';

// Calculate color intensity
const intensity = Colorimetric.intensity('#3498DB');
console.log(intensity); // 134

// Use intensity to determine text color
const textColor = intensity > 160 ? '#000000' : '#FFFFFF';
console.log(textColor); // '#FFFFFF'
```

## API Reference

### Colorimetric

The main namespace that provides color manipulation utilities.

#### Properties

- `RGB_PATTERN`: Regular expression for matching RGB color strings
- `RGBA_PATTERN`: Regular expression for matching RGBA color strings
- `OKLCH_PATTERN`: Regular expression for matching OKLCH color strings
- `HEX_PATTERN`: Regular expression for matching hexadecimal color strings
- `HEX_ALPHA_PATTERN`: Regular expression for matching hexadecimal color strings with alpha
- `Settings`: Configuration settings for the colorimetric library

#### Methods

- **Color Conversion**
  - `serialize(color)`: Converts a color to a hexadecimal string
  - `render(hex, alpha)`: Renders a color with the specified alpha
  - `validate(value)`: Validates if a string is a valid CSS color

- **Color Information**
  - `red(color)`: Gets the red component of a color
  - `green(color)`: Gets the green component of a color
  - `blue(color)`: Gets the blue component of a color
  - `intensity(color)`: Calculates the intensity of a color
  - `getOpacity(color)`: Gets the opacity of a color

- **Color Manipulation**
  - `adjust(color, amount)`: Adjusts a color by the specified amount
  - `scale(color, amount, sens)`: Scales a color by the specified amount
  - `lightness(color, amount)`: Lightens a color by the specified amount
  - `darkness(color, amount)`: Darkens a color by the specified amount
  - `hue(color, amount)`: Adjusts the hue of a color
  - `saturate(color, amount)`: Adjusts the saturation of a color
  - `whiteness(color, amount)`: Adjusts the whiteness of a color
  - `blackness(color, amount)`: Adjusts the blackness of a color
  - `alpha(color, alpha)`: Sets the alpha of a color
  - `invert(color)`: Inverts a color

- **Color Generation**
  - `generates(key, color, drift)`: Generates a complete set of color variants
  - `generateVariants(key, color, drift)`: Generates color variants
  - `generateVariant(color, index, drift)`: Generates a specific color variant
  - `resolveVariant(color, ...variants)`: Resolves a specific color variant

### Color Classes

#### Hex

Class for working with hexadecimal colors.

- `toString(hexColor)`: Converts a string to a hexadecimal color
- `decimal(value)`: Converts a decimal value to a hexadecimal string
- `toOklch(hex)`: Converts a hexadecimal color to OKLCH
- `toRgb(color)`: Converts a hexadecimal color to RGB
- `toRgba(color)`: Converts a hexadecimal color to RGBA

#### Rgba

Class for working with RGB/RGBA colors.

- `toHex(red, green, blue)`: Converts RGB values to a hexadecimal color
- `alphaToHex(red, green, blue, alpha)`: Converts RGBA values to a hexadecimal color
- `toString(color)`: Converts a color to an RGB string
- `toAlphaString(color, alpha)`: Converts a color to an RGBA string
- `toXyz(rgb)`: Converts RGB values to XYZ

#### Hsl

Class for working with HSL colors.

- `to(color)`: Converts a color to HSL
- `toRgb(hsl)`: Converts HSL values to RGB

#### Oklch

Object for working with OKLCH colors.

- `toString(color)`: Converts OKLCH values to a string
- `parse(color)`: Parses an OKLCH color string
- `variation(color, value)`: Creates a variation of an OKLCH color
- `toHex(oklch)`: Converts OKLCH values to a hexadecimal color
- `toLch(oklch)`: Converts OKLCH values to LCH

#### Lch

Class for working with LCH colors.

- `toString(color)`: Converts LCH values to a string
- `toOklch(lch)`: Converts LCH values to OKLCH
- `toLab(lch)`: Converts LCH values to LAB

#### Lab

Class for working with LAB colors.

- `toString(lab)`: Converts LAB values to a string
- `toLch(lab)`: Converts LAB values to LCH
- `toXyz(lab)`: Converts LAB values to XYZ

#### Xyz

Class for working with XYZ colors.

- `toLab(xyz)`: Converts XYZ values to LAB
- `toRgb(xyz)`: Converts XYZ values to RGB

## Types Reference

| Category | Type | Description |
|----------|------|-------------|
| **Color Format Types** | `IColorHex` | Type for hexadecimal color strings |
| | `IColorRgb` | Interface for RGB color values |
| | `IColorRgbAlpha` | Interface for RGBA color values |
| | `IColorHslProps` | Interface for HSL color values |
| | `IColorOklch` | Interface for OKLCH color values |
| | `IColorLch` | Interface for LCH color values |
| | `IColorLab` | Interface for LAB color values |
| | `IColorXyz` | Interface for XYZ color values |
| **Color Syntax Types** | `IColorRgbSyntax` | Type for RGB color syntax |
| | `IColorRgbAlphaSyntax` | Type for RGBA color syntax |
| | `IColorValueSyntax` | Union type for all color syntax types |
| **Color Key Types** | `IColorKey` | Type for color keys (one, two, three, etc.) |
| | `IColorIntensities` | Type for color intensities (100, 200, 300, etc.) |
| | `IColorAlphas` | Type for color alphas (a1, a2, a3, etc.) |
| **Color Scheme Types** | `IColorScheme` | Type for color schemes |
| | `IColorSlots` | Type for color slots |
| | `IColorPalette` | Type for color palettes |
| | `IColorSchemes` | Type for light and dark color schemes |
| **Settings Types** | `IColorimetricSettings` | Interface for colorimetric settings |
| | `IColorimetricLightnessSetting` | Interface for lightness settings |
| **Algorithm Types** | `IColorimetricAlgo` | Interface for colorimetric algorithms |
| | `IOklchAlgo` | Interface for OKLCH algorithms |

## License

This project is licensed under the MIT License. See the LICENSE file for details.