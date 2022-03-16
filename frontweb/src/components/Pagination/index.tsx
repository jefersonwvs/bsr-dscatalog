import { ReactComponent as ArrowIcon } from 'assets/images/arrow.svg';
import ReactPaginate from 'react-paginate';
import './styles.css';

type Props = {
  forcePage?: number;
  pageCount: number;
  range: number;
  onChange?: (pageNumber: number) => void;
};

const Pagination = function (props: Props) {
  const { forcePage, pageCount, range, onChange } = props;
  return (
    <ReactPaginate
      forcePage={forcePage}
      pageCount={pageCount}
      pageRangeDisplayed={range}
      marginPagesDisplayed={1}
      containerClassName="pagination-container"
      pageLinkClassName="pagination-item"
      activeLinkClassName="pagination-item-active"
      breakClassName="pagination-item"
      disabledClassName="arrow-inactive"
      previousLabel={
        <div
          className="pagination-arrow-container"
          data-testid="arrow-previous"
        >
          <ArrowIcon />
        </div>
      }
      previousClassName="arrow-previous"
      nextLabel={
        <div className="pagination-arrow-container" data-testid="arrow-next">
          <ArrowIcon />
        </div>
      }
      nextClassName="arrow-next"
      onPageChange={(items) => (onChange ? onChange(items.selected) : {})}
    />
  );
};

export default Pagination;
