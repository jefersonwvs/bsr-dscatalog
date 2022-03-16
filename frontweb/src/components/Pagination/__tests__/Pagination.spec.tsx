import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from '..';

describe('Pagination tests', () => {
  test('should render Pagination', () => {
    // Arrange
    const pageCount = 3;
    const range = 3;

    // Act
    render(<Pagination pageCount={pageCount} range={range} />);

    // Assert
    const page1 = screen.getByText('1');
    const page2 = screen.getByText('2');
    const page3 = screen.getByText('3');
    const page4 = screen.queryByText('4');

    expect(page1).toBeInTheDocument();
    expect(page1).toHaveClass('pagination-item-active');
    expect(page2).toBeInTheDocument();
    expect(page2).not.toHaveClass('pagination-item-active');
    expect(page3).toBeInTheDocument();
    expect(page3).not.toHaveClass('pagination-item-active');
    expect(page4).not.toBeInTheDocument();
  });

  test('next arrow should call onChange', () => {
    // Arrange
    const pageCount = 3;
    const range = 3;
    const onChange = jest.fn();

    // Act
    render(
      <Pagination pageCount={pageCount} range={range} onChange={onChange} />
    );
    const arrowNext = screen.getByTestId('arrow-next');
    userEvent.click(arrowNext);

    // Assert
    expect(onChange).toHaveBeenCalledWith(1);
  });

  test('previous arrow should call onChange', () => {
    // Arrange
    const forcePage = 1;
    const pageCount = 3;
    const range = 3;
    const onChange = jest.fn();

    // Act
    render(
      <Pagination
        forcePage={forcePage}
        pageCount={pageCount}
        range={range}
        onChange={onChange}
      />
    );
    const arrowPrevious = screen.getByTestId('arrow-previous');
    userEvent.click(arrowPrevious);

    // Assert
    expect(onChange).toHaveBeenCalledWith(0);
  });

  test('page link should call onChange', () => {
    // Arrange
    const pageCount = 3;
    const range = 3;
    const onChange = jest.fn();

    // Act
    render(
      <Pagination pageCount={pageCount} range={range} onChange={onChange} />
    );

    const page2 = screen.getByText('2');
    userEvent.click(page2);

    // Assert
    expect(onChange).toHaveBeenCalledWith(1);
  });
});
