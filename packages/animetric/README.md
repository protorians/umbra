# @protorians/animetric

A powerful, flexible animation engine for modern web applications.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Core Concepts](#core-concepts)
  - [Easing Functions](#easing-functions)
  - [Animation Engine](#animation-engine)
  - [Animation Groups](#animation-groups)
- [Basic Usage](#basic-usage)
- [Advanced Features](#advanced-features)
  - [Custom Easing Functions](#custom-easing-functions)
  - [Animation Sequences](#animation-sequences)
  - [Parallel and Sequential Animations](#parallel-and-sequential-animations)
- [API Reference](#api-reference)
  - [Animetric](#animetric)
    - [Properties](#properties)
    - [Methods](#methods)
  - [AnimetricGroup](#animetricgroup)
    - [Properties](#properties-1)
    - [Methods](#methods-1)
  - [Easing](#easing)
    - [Properties](#properties-2)
    - [Methods](#methods-2)
- [Types Reference](#types-reference)
- [License](#license)

## Overview

@protorians/animetric is a comprehensive animation library that allows you to create dynamic, smooth animations for web interfaces. It provides a powerful engine for defining, controlling, and grouping animations with precise timing and easing functions.

## Installation

```bash
# Using npm
npm install @protorians/animetric

# Using yarn
yarn add @protorians/animetric

# Using pnpm
pnpm add @protorians/animetric
```

## Core Concepts

### Easing Functions

Easing functions define how animations accelerate or decelerate over time, adding natural motion to your animations. Animetric provides a variety of built-in easing functions and allows you to create custom ones.

```typescript
import { Ease } from '@protorians/animetric';

// Using a built-in easing function
const animation = Animetric({
  ease: Ease.easeInOutQuad
});
```

### Animation Engine

The animation engine is the core of Animetric. It handles the calculation of animation values over time, applying easing functions, and triggering callbacks on each frame.

```typescript
import { Animetric } from '@protorians/animetric';

// Create a simple animation
const animation = Animetric({
  from: [0],
  to: [100],
  duration: 1000, // 1 second
  ease: Ease.linear
});

// Add a callback to handle animation updates
animation.callable((payload) => {
  console.log(`Animation progress: ${payload.percent}%`);
  console.log(`Current value: ${payload.frames[0]}`);
});

// Start the animation
animation.play();
```

### Animation Groups

Animation groups allow you to combine multiple animations and control them as a single unit. You can run animations in parallel or sequentially.

```typescript
import { AnimetricGroup, Animetric } from '@protorians/animetric';

// Create individual animations
const animation1 = Animetric({
  from: [0],
  to: [100],
  duration: 1000
});

const animation2 = Animetric({
  from: [200],
  to: [0],
  duration: 500
});

// Group animations to run in parallel
const parallelGroup = AnimetricGroup({
  timelines: [animation1, animation2],
  parallel: true
});

// Group animations to run sequentially
const sequentialGroup = AnimetricGroup({
  timelines: [animation1, animation2],
  parallel: false
});

// Control the group as a single unit
parallelGroup.play();
```

## Basic Usage

```typescript
import { Animetric, Ease } from '@protorians/animetric';

// Create an animation that goes from 0 to 100 over 1 second
const animation = Animetric({
  from: [0],
  to: [100],
  duration: 1000,
  ease: Ease.easeInOutQuad
});

// Add a callback to handle animation updates
animation.callable((payload) => {
  // Use the current value to update your UI
  const element = document.getElementById('animated-element');
  element.style.left = `${payload.frames[0]}px`;
});

// Start the animation
animation.play();

// You can control the animation
document.getElementById('pause-button').addEventListener('click', () => {
  animation.pause();
});

document.getElementById('resume-button').addEventListener('click', () => {
  animation.resume();
});

document.getElementById('stop-button').addEventListener('click', () => {
  animation.stop();
});
```

## Advanced Features

### Custom Easing Functions

You can create custom easing functions to achieve specific animation effects.

```typescript
import { createEase } from '@protorians/animetric';

// Create a custom easing function
const customEase = createEase({
  name: 'customBounce',
  formula: (x) => {
    // A simple bounce effect
    return Math.sin(x * Math.PI * 2) * Math.exp(-x * 3);
  }
});

// Use the custom easing function
const animation = Animetric({
  from: [0],
  to: [100],
  duration: 1000,
  ease: customEase
});
```

### Animation Sequences

You can animate multiple properties simultaneously by providing arrays of values.

```typescript
import { Animetric } from '@protorians/animetric';

// Animate position and opacity simultaneously
const animation = Animetric({
  from: [0, 0],   // [x, opacity]
  to: [100, 1],   // [x, opacity]
  duration: 1000
});

animation.callable((payload) => {
  const element = document.getElementById('animated-element');
  element.style.left = `${payload.frames[0]}px`;
  element.style.opacity = payload.frames[1];
});
```

### Parallel and Sequential Animations

You can create complex animation sequences by combining parallel and sequential animations.

```typescript
import { AnimetricGroup, Animetric } from '@protorians/animetric';

// First sequence: move right and fade in
const sequence1 = AnimetricGroup({
  timelines: [
    Animetric({ from: [0], to: [100], duration: 500 }),  // move right
    Animetric({ from: [0], to: [1], duration: 500 })     // fade in
  ],
  parallel: true
});

// Second sequence: move down and scale up
const sequence2 = AnimetricGroup({
  timelines: [
    Animetric({ from: [0], to: [50], duration: 500 }),   // move down
    Animetric({ from: [1], to: [1.5], duration: 500 })   // scale up
  ],
  parallel: true
});

// Combine sequences to run one after another
const animation = AnimetricGroup({
  timelines: [sequence1, sequence2],
  parallel: false
});

// Start the entire animation sequence
animation.play();
```

## API Reference

### Animetric

The main class for creating and controlling animations.

#### Properties

- `status`: Gets the current status of the animation (true for playing, false for paused, null for stopped)
- `percent`: Gets the current percentage of the animation (0-100)
- `ready`: Checks if the animation is ready to play
- `state`: Gets the current state of the animation (percent and frames)
- `options`: Gets the options used to configure the animation
- `completed`: Checks if the animation is completed
- `waves`: Gets the list of negativities of the 'to' property
- `gaps`: Gets the list of gaps between 'from' and 'to' values

#### Methods

- **Initialization**
  - `initialize()`: Initializes the animation
  - `from(...values)`: Sets the starting values
  - `to(...values)`: Sets the ending values
  - `duration(milliseconds)`: Sets the duration of the animation
  - `delay(milliseconds)`: Sets a delay before the animation starts
  - `decimal(value)`: Sets the decimal precision for calculations
  - `infinite(value)`: Sets whether the animation should loop infinitely
  - `ease(easing)`: Sets the easing function to use

- **Control**
  - `play()`: Starts the animation
  - `pause()`: Pauses the animation
  - `resume()`: Resumes a paused animation
  - `stop()`: Stops the animation and resets it

- **Callbacks**
  - `callable(callback)`: Sets a callback function to be called on each frame

### AnimetricGroup

A class for grouping and controlling multiple animations.

#### Properties

- `timelines`: Gets the list of animations in the group
- `options`: Gets the options used to configure the group

#### Methods

- **Control**
  - `play()`: Starts all animations in the group
  - `pause()`: Pauses all animations in the group
  - `resume()`: Resumes all paused animations in the group
  - `stop()`: Stops all animations in the group
  - `replay(delay)`: Replays all animations in the group with an optional delay

- **Navigation**
  - `next()`: Gets the next animation in the group
  - `previous()`: Gets the previous animation in the group
  - `go(index)`: Goes to a specific animation in the group

### Easing

A class for creating and using easing functions.

#### Properties

- `name`: Gets the name of the easing function
- `cubicBezier`: Gets the cubic bezier representation of the easing function
- `formula`: Gets the formula function of the easing function

#### Methods

- `compute(x)`: Computes the easing value for a given input (0-1)

## Types Reference

| Category | Type | Description |
|----------|------|-------------|
| **Easing Types** | `IEasingFormula` | A function type for easing formulas that take a number and return a number |
| | `IEasingBase` | Base interface for easing functions with signal and name properties |
| | `IEasing` | Interface for easing functions with cubicBezier, formula, and compute properties |
| **Animation Types** | `IAnimetricCallable` | A function type for animation callbacks |
| | `IAnimetricPayload` | Interface for animation payload with percent and frames properties |
| | `IAnimetricBaseOptions` | Base options for animations including infinite, duration, decimal, delay, and ease properties |
| | `IAnimetricOptions` | Full options for animations extending IAnimetricBaseOptions |
| | `IAnimetricController` | Interface for animation controllers with play, pause, resume, and stop methods |
| | `IAnimetric` | Main animation interface extending IAnimetricController with additional properties and methods |
| **Group Types** | `IAnimetricGroupOptions` | Options for animation groups with a parallel property |
| | `IAnimetricGroup` | Interface for animation groups extending IAnimetricController |
| **Signal Types** | `IAnimetricSignalMap` | Signal map for animation events |
| | `IEasingEmitterScheme` | Scheme for easing emitters with a change property |

## License

This project is licensed under the ISC License. See the LICENSE file for details.