# @protorians/colorimetric

Une bibliothèque de gestion des couleurs puissante et flexible pour les applications web modernes.

## Table des matières

- [Aperçu](#aperçu)
- [Installation](#installation)
- [Concepts fondamentaux](#concepts-fondamentaux)
  - [Formats de couleur](#formats-de-couleur)
  - [Conversion de couleur](#conversion-de-couleur)
  - [Manipulation de couleur](#manipulation-de-couleur)
- [Utilisation de base](#utilisation-de-base)
- [Fonctionnalités avancées](#fonctionnalités-avancées)
  - [Variantes de couleur](#variantes-de-couleur)
  - [Schémas de couleur](#schémas-de-couleur)
  - [Intensité de couleur](#intensité-de-couleur)
- [Référence API](#référence-api)
  - [Colorimetric](#colorimetric)
    - [Propriétés](#propriétés)
    - [Méthodes](#méthodes)
  - [Classes de couleur](#classes-de-couleur)
    - [Hex](#hex)
    - [Rgba](#rgba)
    - [Hsl](#hsl)
    - [Oklch](#oklch)
    - [Lch](#lch)
    - [Lab](#lab)
    - [Xyz](#xyz)
- [Référence des types](#référence-des-types)
- [Licence](#licence)

## Aperçu

@protorians/colorimetric est une bibliothèque complète de gestion des couleurs qui vous permet de travailler avec des couleurs dans différents formats, de convertir entre les formats, de manipuler les couleurs et de générer des schémas de couleur. Elle fournit des utilitaires puissants pour la manipulation des couleurs, y compris les ajustements de luminosité/obscurité, l'inversion des couleurs et la génération de variantes de couleur.

## Installation

```bash
# Utilisation de npm
npm install @protorians/colorimetric

# Utilisation de yarn
yarn add @protorians/colorimetric

# Utilisation de pnpm
pnpm add @protorians/colorimetric
```

## Concepts fondamentaux

### Formats de couleur

La bibliothèque prend en charge plusieurs formats de couleur :

- **Hex** : Format de couleur hexadécimal standard (`#RRGGBB` ou `#RRGGBBAA`)
- **RGB/RGBA** : Format Rouge, Vert, Bleu (avec Alpha optionnel)
- **HSL** : Format Teinte, Saturation, Luminosité
- **OKLCH** : Espace colorimétrique perceptuellement uniforme avec luminosité, chroma et teinte
- **LCH** : Espace colorimétrique Luminosité, Chroma, Teinte
- **LAB** : Espace colorimétrique L*a*b*
- **XYZ** : Espace colorimétrique CIE XYZ

### Conversion de couleur

La bibliothèque fournit des utilitaires pour convertir les couleurs entre différents formats :

```typescript
import { Colorimetric } from '@protorians/colorimetric';

// Convertir hex en RGB
const rgb = Colorimetric.Hex.toRgb('#FF5733');
console.log(rgb); // { red: 255, green: 87, blue: 51 }

// Convertir RGB en hex
const hex = Colorimetric.Rgba.toHex(255, 87, 51);
console.log(hex); // '#FF5733'

// Convertir hex en OKLCH
const oklch = Colorimetric.Hex.toOklch('#FF5733');
console.log(oklch); // { lightness: 0.67, chroma: 0.24, hue: 27.2 }
```

### Manipulation de couleur

La bibliothèque fournit diverses méthodes pour manipuler les couleurs :

```typescript
import { Colorimetric } from '@protorians/colorimetric';

// Éclaircir une couleur
const lightened = Colorimetric.lightness('#FF5733', 50);
console.log(lightened); // '#FF8C73'

// Assombrir une couleur
const darkened = Colorimetric.darkness('#FF5733', 50);
console.log(darkened); // '#B31F00'

// Inverser une couleur
const inverted = Colorimetric.invert('#FF5733');
console.log(inverted); // '#00A8CC'

// Ajuster l'alpha
const withAlpha = Colorimetric.alpha('#FF5733', 50);
console.log(withAlpha); // '#FF573380'
```

## Utilisation de base

```typescript
import { Colorimetric } from '@protorians/colorimetric';

// Créer une couleur
const color = '#3498DB';

// Obtenir des informations sur la couleur
console.log(Colorimetric.red(color)); // 52
console.log(Colorimetric.green(color)); // 152
console.log(Colorimetric.blue(color)); // 219
console.log(Colorimetric.intensity(color)); // 134

// Convertir en différents formats
console.log(Colorimetric.Rgba.toString(color)); // 'rgb(52, 152, 219)'
console.log(Colorimetric.Oklch.toString(Colorimetric.Hex.toOklch(color))); // 'oklch(60% 0.15 235.4)'

// Manipuler la couleur
const lighter = Colorimetric.lightness(color, 30);
const darker = Colorimetric.darkness(color, 30);
const saturated = Colorimetric.saturate(color, 30);
const withHue = Colorimetric.hue(color, 30);

// Générer des variantes de couleur
const variants = Colorimetric.generates('primary', color);
console.log(variants['primary-500']); // Une variante de ton moyen
console.log(variants['primary-900']); // Une variante sombre
console.log(variants['primary-alpha-5']); // Une variante semi-transparente
```

## Fonctionnalités avancées

### Variantes de couleur

La bibliothèque peut générer un ensemble complet de variantes de couleur à partir d'une couleur de base :

```typescript
import { Colorimetric } from '@protorians/colorimetric';

// Générer des variantes pour une couleur primaire
const primaryVariants = Colorimetric.generates('primary', '#3498DB');

// Accéder à différentes variantes
console.log(primaryVariants['primary']); // Couleur de base
console.log(primaryVariants['primary-100']); // Variante la plus claire
console.log(primaryVariants['primary-900']); // Variante la plus sombre
console.log(primaryVariants['primary-alpha']); // Variante semi-transparente
console.log(primaryVariants['primary-invert']); // Couleur inversée
```

### Schémas de couleur

Vous pouvez créer des schémas de couleur en générant des variantes pour plusieurs couleurs de base :

```typescript
import { Colorimetric } from '@protorians/colorimetric';

// Créer un schéma de couleur
const colorScheme = {
  ...Colorimetric.generates('primary', '#3498DB'),
  ...Colorimetric.generates('secondary', '#2ECC71'),
  ...Colorimetric.generates('accent', '#E74C3C'),
  ...Colorimetric.generates('neutral', '#95A5A6')
};

// Utiliser le schéma de couleur dans votre application
document.body.style.backgroundColor = colorScheme['neutral-100'];
document.body.style.color = colorScheme['neutral-900'];
document.querySelector('.button').style.backgroundColor = colorScheme['primary'];
document.querySelector('.button:hover').style.backgroundColor = colorScheme['primary-700'];
```

### Intensité de couleur

La bibliothèque fournit un moyen de calculer l'intensité d'une couleur, ce qui peut être utile pour déterminer si une couleur est claire ou sombre :

```typescript
import { Colorimetric } from '@protorians/colorimetric';

// Calculer l'intensité de la couleur
const intensity = Colorimetric.intensity('#3498DB');
console.log(intensity); // 134

// Utiliser l'intensité pour déterminer la couleur du texte
const textColor = intensity > 160 ? '#000000' : '#FFFFFF';
console.log(textColor); // '#FFFFFF'
```

## Référence API

### Colorimetric

L'espace de noms principal qui fournit des utilitaires de manipulation de couleur.

#### Propriétés

- `RGB_PATTERN` : Expression régulière pour correspondre aux chaînes de couleur RGB
- `RGBA_PATTERN` : Expression régulière pour correspondre aux chaînes de couleur RGBA
- `OKLCH_PATTERN` : Expression régulière pour correspondre aux chaînes de couleur OKLCH
- `HEX_PATTERN` : Expression régulière pour correspondre aux chaînes de couleur hexadécimales
- `HEX_ALPHA_PATTERN` : Expression régulière pour correspondre aux chaînes de couleur hexadécimales avec alpha
- `Settings` : Paramètres de configuration pour la bibliothèque colorimétrique

#### Méthodes

- **Conversion de couleur**
  - `serialize(color)` : Convertit une couleur en chaîne hexadécimale
  - `render(hex, alpha)` : Rend une couleur avec l'alpha spécifié
  - `validate(value)` : Valide si une chaîne est une couleur CSS valide

- **Informations sur la couleur**
  - `red(color)` : Obtient la composante rouge d'une couleur
  - `green(color)` : Obtient la composante verte d'une couleur
  - `blue(color)` : Obtient la composante bleue d'une couleur
  - `intensity(color)` : Calcule l'intensité d'une couleur
  - `getOpacity(color)` : Obtient l'opacité d'une couleur

- **Manipulation de couleur**
  - `adjust(color, amount)` : Ajuste une couleur de la quantité spécifiée
  - `scale(color, amount, sens)` : Redimensionne une couleur de la quantité spécifiée
  - `lightness(color, amount)` : Éclaircit une couleur de la quantité spécifiée
  - `darkness(color, amount)` : Assombrit une couleur de la quantité spécifiée
  - `hue(color, amount)` : Ajuste la teinte d'une couleur
  - `saturate(color, amount)` : Ajuste la saturation d'une couleur
  - `whiteness(color, amount)` : Ajuste la blancheur d'une couleur
  - `blackness(color, amount)` : Ajuste la noirceur d'une couleur
  - `alpha(color, alpha)` : Définit l'alpha d'une couleur
  - `invert(color)` : Inverse une couleur

- **Génération de couleur**
  - `generates(key, color, drift)` : Génère un ensemble complet de variantes de couleur
  - `generateVariants(key, color, drift)` : Génère des variantes de couleur
  - `generateVariant(color, index, drift)` : Génère une variante de couleur spécifique
  - `resolveVariant(color, ...variants)` : Résout une variante de couleur spécifique

### Classes de couleur

#### Hex

Classe pour travailler avec des couleurs hexadécimales.

- `toString(hexColor)` : Convertit une chaîne en couleur hexadécimale
- `decimal(value)` : Convertit une valeur décimale en chaîne hexadécimale
- `toOklch(hex)` : Convertit une couleur hexadécimale en OKLCH
- `toRgb(color)` : Convertit une couleur hexadécimale en RGB
- `toRgba(color)` : Convertit une couleur hexadécimale en RGBA

#### Rgba

Classe pour travailler avec des couleurs RGB/RGBA.

- `toHex(red, green, blue)` : Convertit des valeurs RGB en couleur hexadécimale
- `alphaToHex(red, green, blue, alpha)` : Convertit des valeurs RGBA en couleur hexadécimale
- `toString(color)` : Convertit une couleur en chaîne RGB
- `toAlphaString(color, alpha)` : Convertit une couleur en chaîne RGBA
- `toXyz(rgb)` : Convertit des valeurs RGB en XYZ

#### Hsl

Classe pour travailler avec des couleurs HSL.

- `to(color)` : Convertit une couleur en HSL
- `toRgb(hsl)` : Convertit des valeurs HSL en RGB

#### Oklch

Objet pour travailler avec des couleurs OKLCH.

- `toString(color)` : Convertit des valeurs OKLCH en chaîne
- `parse(color)` : Analyse une chaîne de couleur OKLCH
- `variation(color, value)` : Crée une variation d'une couleur OKLCH
- `toHex(oklch)` : Convertit des valeurs OKLCH en couleur hexadécimale
- `toLch(oklch)` : Convertit des valeurs OKLCH en LCH

#### Lch

Classe pour travailler avec des couleurs LCH.

- `toString(color)` : Convertit des valeurs LCH en chaîne
- `toOklch(lch)` : Convertit des valeurs LCH en OKLCH
- `toLab(lch)` : Convertit des valeurs LCH en LAB

#### Lab

Classe pour travailler avec des couleurs LAB.

- `toString(lab)` : Convertit des valeurs LAB en chaîne
- `toLch(lab)` : Convertit des valeurs LAB en LCH
- `toXyz(lab)` : Convertit des valeurs LAB en XYZ

#### Xyz

Classe pour travailler avec des couleurs XYZ.

- `toLab(xyz)` : Convertit des valeurs XYZ en LAB
- `toRgb(xyz)` : Convertit des valeurs XYZ en RGB

## Référence des types

| Catégorie | Type | Description |
|-----------|------|-------------|
| **Types de format de couleur** | `IColorHex` | Type pour les chaînes de couleur hexadécimales |
| | `IColorRgb` | Interface pour les valeurs de couleur RGB |
| | `IColorRgbAlpha` | Interface pour les valeurs de couleur RGBA |
| | `IColorHslProps` | Interface pour les valeurs de couleur HSL |
| | `IColorOklch` | Interface pour les valeurs de couleur OKLCH |
| | `IColorLch` | Interface pour les valeurs de couleur LCH |
| | `IColorLab` | Interface pour les valeurs de couleur LAB |
| | `IColorXyz` | Interface pour les valeurs de couleur XYZ |
| **Types de syntaxe de couleur** | `IColorRgbSyntax` | Type pour la syntaxe de couleur RGB |
| | `IColorRgbAlphaSyntax` | Type pour la syntaxe de couleur RGBA |
| | `IColorValueSyntax` | Type d'union pour tous les types de syntaxe de couleur |
| **Types de clé de couleur** | `IColorKey` | Type pour les clés de couleur (one, two, three, etc.) |
| | `IColorIntensities` | Type pour les intensités de couleur (100, 200, 300, etc.) |
| | `IColorAlphas` | Type pour les alphas de couleur (a1, a2, a3, etc.) |
| **Types de schéma de couleur** | `IColorScheme` | Type pour les schémas de couleur |
| | `IColorSlots` | Type pour les emplacements de couleur |
| | `IColorPalette` | Type pour les palettes de couleur |
| | `IColorSchemes` | Type pour les schémas de couleur clairs et sombres |
| **Types de paramètres** | `IColorimetricSettings` | Interface pour les paramètres colorimétriques |
| | `IColorimetricLightnessSetting` | Interface pour les paramètres de luminosité |
| **Types d'algorithme** | `IColorimetricAlgo` | Interface pour les algorithmes colorimétriques |
| | `IOklchAlgo` | Interface pour les algorithmes OKLCH |

## Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.