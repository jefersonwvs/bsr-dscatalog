import { render, screen, waitFor } from '@testing-library/react';
import { Router } from 'react-router-dom';
import history from 'utils/history';
import Catalog from '..';

test('should render Catalog with products', async () => {
  // Arrange
  const text = 'Catálogo de produtos';

  // Act
  render(
    <Router history={history}>
      <Catalog />
    </Router>
  );
  // screen.debug();

  // Assert
  const title = screen.getByText(text);
  expect(title).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText('Smart TV')).toBeInTheDocument();
  });
  expect(screen.getByText('The Lord of the Rings')).toBeInTheDocument();
});
