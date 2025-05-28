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
