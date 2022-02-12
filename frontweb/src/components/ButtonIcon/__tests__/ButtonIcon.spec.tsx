import { render, screen } from '@testing-library/react';
import ButtonIcon from '..';

test('ButtonIcon should render button with given text', () => {
  // Arrange
  const text = 'Fazer login';

  // Act
  render(<ButtonIcon text={text} />);
  // screen.debug();

  // Assert
  const result = screen.getByText(text);
  expect(result).toBeInTheDocument();
});
