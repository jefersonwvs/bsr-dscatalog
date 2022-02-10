import { formatPrice } from 'utils/formatters';

describe('formatPrice for positive numbers', function () {
  test('formatPrice should format number pt-BR when given 10.1', () => {
    // Arrange
    const value = 10.1;

    // Act
    const result = formatPrice(value);

    // Assert
    expect(result).toEqual('10,10');
  });

  test('formatPrice should format number pt-BR when given 0.1', () => {
    const value = 0.1;
    const result = formatPrice(value);
    expect(result).toEqual('0,10');
  });
});

describe('formatPrice for non-positive numbers', function () {
  test('formatPrice should format number pt-BR when given 0', () => {
    const value = 0;
    const result = formatPrice(value);
    expect(result).toEqual('0,00');
  });

  test('formatPrice should format number pt-BR when given -5.3', () => {
    const value = -5.3;
    const result = formatPrice(value);
    expect(result).toEqual('-5,30');
  });
});
