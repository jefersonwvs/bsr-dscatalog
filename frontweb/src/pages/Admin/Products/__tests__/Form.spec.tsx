import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router, useParams } from 'react-router-dom';
import selectEvent from 'react-select-event';
import { ToastContainer } from 'react-toastify';
import history from 'utils/history';
import Form from '../Form';
import { server } from './fixtures';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('Product form create tests', () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ productId: 'create' });
  });

  test('should show toast and redirect when submit Form correctly', async () => {
    render(
      <Router history={history}>
        <ToastContainer />
        <Form />
      </Router>
    );
    // screen.debug();
    const nameInput = screen.getByTestId('name');
    const categoriesInput = screen.getByLabelText('Categorias');
    const priceInput = screen.getByTestId('price');
    const imgUrlInput = screen.getByTestId('imgUrl');
    const descriptionInput = screen.getByTestId('description');

    const submitButton = screen.getByRole('button', { name: /salvar/i });

    await selectEvent.select(categoriesInput, ['Eletrônicos', 'Computadores']);
    userEvent.type(nameInput, 'Computador');
    userEvent.type(priceInput, '3470.89');
    userEvent.type(
      imgUrlInput,
      'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/desktops/optiplex-desktops/3090-mt-sff/media-gallery/desktop_optiplex_3090mt_sff_gallery_7.psd?fmt=pjpg&pscan=auto&scl=1&hei=402&wid=372&qlt=100,0&resMode=sharp2&size=372,402'
    );
    userEvent.type(descriptionInput, 'OptiPlex 3090 Small Desktop');

    userEvent.click(submitButton);

    await waitFor(() => {
      const toastElement = screen.getByText('Produto cadastrado com sucesso!');
      expect(toastElement).toBeInTheDocument();
    });

    expect(history.location.pathname).toEqual('/admin/products');
  });
});
