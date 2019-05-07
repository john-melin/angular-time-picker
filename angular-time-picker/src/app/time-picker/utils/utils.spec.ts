import { isNumber, toInteger } from './utils';

describe('Utils', () => {
  describe('isNumber', () => {
    it('argument: 1 should be true', () => {
      const result = isNumber('1');
      expect(result).toBe(true);
    });

    it('argument: 21 should be true', () => {
      const result = isNumber('21');
      expect(result).toBe(true);
    });

    it('argument: b should be false', () => {
      const result = isNumber('b');
      expect(result).toBe(false);
    });

    it('argument: 2b should be false', () => {
      const result = isNumber('2b');
      expect(result).toBe(false);
    });
  });

  describe('toInteger', () => {
    it('argument: "1" should return 1', () => {
      const result = toInteger('1');
      expect(result).toBe(1);
    });

    it('argument: 21 should be true', () => {
      const result = toInteger('21');
      expect(result).toBe(21);
    });

    it('argument: b should be false', () => {
      const result = toInteger('b');
      expect(result).toBe(0);
    });

    it('argument: 2b should be false', () => {
      const result = toInteger('2b');
      expect(result).toBe(0);
    });
  });
});
