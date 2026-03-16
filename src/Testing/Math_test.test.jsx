import { add } from './Math_test';

describe('add function logic', () => {
  it('should correctly handle positive cases', () => {
    expect(add(2, 3)).toBe(5);
  });

  it('should correctly handle negative cases', () => {
    expect(add(5, -3)).toBe(2);
    expect(add(-5, -5)).toBe(-10);
  });

  it('should handle zero cases correctly', () => {
    expect(add(0, 5)).toBe(5);
    expect(add(0, 0)).toBe(0);
  });
});