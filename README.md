# Development Guidelines for Protorians Umbra

This document provides essential information for developers working on the Protorians Umbra project.

## Build/Configuration Instructions

### Project Setup

1. **Install Dependencies**:
   ```bash
   pnpm install
   ```

2. **Development Mode**:
   ```bash
   # Run development mode for all packages in parallel
   pnpm umbra-dev
   
   # Run development mode for a specific package
   cd packages/<package-name>
   pnpm dev
   ```

3. **Building the Project**:
   ```bash
   # Build all packages
   pnpm umbra-build
   
   # Build in development mode
   pnpm umbra-build:dev
   
   # Build in production mode
   pnpm umbra-build:prod
   
   # Build a specific package
   cd packages/<package-name>
   pnpm build
   ```

### Package Structure

- The project is a monorepo managed with pnpm workspaces
- All packages are located in the `packages/` directory
- Each package has its own TypeScript configuration
- Packages are built to both ESM (`~esm`) and CommonJS (`~cjs`) formats

## Testing Information

### Test Configuration

The project uses Jest for testing. Each package that includes tests should have:

1. **Jest Configuration**:
   - A `jest.config.js` file in the package root
   - Example configuration:
     ```javascript
     export default {
       transform: {'^.+\\.ts?$': 'ts-jest'},
       testEnvironment: 'node',
       testRegex: '/tests/.*\\.(test|spec)?\\.(ts|tsx)$',
       moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
     };
     ```

2. **Test Script**:
   - Add a test script to the package's `package.json`:
     ```json
     "scripts": {
       "test": "jest"
     }
     ```

### Running Tests

```bash
# Run tests for all packages
pnpm -r test

# Run tests for a specific package
cd packages/<package-name>
pnpm test
```

### Adding New Tests

1. Create test files in the `tests/` directory of the package
2. Name test files with `.test.ts` or `.spec.ts` suffix
3. Follow the Jest testing pattern:

```typescript
import { functionToTest } from '../source/path/to/function';

describe('Component or Function Name', () => {
  describe('specific functionality', () => {
    it('should do something specific', () => {
      expect(functionToTest('input')).toBe('expected output');
    });
  });
});
```

### Example Test

Here's an example test for the text utilities in the core package:

```typescript
import { slugify, camelCase, unCamelCase } from '../~esm/utilities/text.js';

describe('Text Utilities', () => {
  describe('slugify', () => {
    it('should convert a string to a slug', () => {
      expect(slugify('Hello World')).toBe('hello-world');
      expect(slugify('Hello  World')).toBe('hello-world');
      expect(slugify('Hello, World!')).toBe('hello-world');
      expect(slugify('Hello World 123')).toBe('hello-world-123');
    });

    it('should handle special characters', () => {
      expect(slugify('Héllö Wörld')).toBe('hellu-wurld');
      expect(slugify('Ñandú')).toBe('-andu');
    });
  });

  describe('camelCase', () => {
    it('should convert a string to camelCase', () => {
      expect(camelCase('hello-world')).toBe('helloWorld');
      expect(camelCase('hello_world')).toBe('helloWorld');
      expect(camelCase('hello world')).toBe('helloWorld');
    });
  });

  describe('unCamelCase', () => {
    it('should convert a camelCase string to kebab-case', () => {
      expect(unCamelCase('helloWorld')).toBe('hello-world');
      expect(unCamelCase('HelloWorld')).toBe('hello-world');
    });

    it('should use the provided separator', () => {
      expect(unCamelCase('helloWorld', '_')).toBe('hello_world');
    });
  });
});
```

## Additional Development Information

### TypeScript Configuration

The project uses TypeScript with the following key configurations:

- Target: ESNext
- Module: NodeNext
- Module Resolution: NodeNext
- Strict type checking enabled
- Experimental decorators enabled

### Version Management

The project uses Changesets for version management:

```bash
# Create a new changeset
pnpm changeset

# Update versions based on changesets
pnpm changeset version

# Combined command for creating and versioning
pnpm version
```

### Git Subtree Management

The project includes Git subtrees for some packages. See the README.md for detailed instructions on managing subtrees, particularly for the Vauban package.

### Code Style

While there's no explicit ESLint or Prettier configuration, the codebase follows these conventions:

- 2-space indentation
- Single quotes for strings
- Semicolons at the end of statements
- Camel case for variable and function names
- PascalCase for class and interface names
- Descriptive naming for functions and variables