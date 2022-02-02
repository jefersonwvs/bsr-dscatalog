import { ReactComponent as ArrowIcon } from 'assets/images/arrow.svg';
import ReactPaginate from 'react-paginate';
import './styles.css';

const Pagination = function () {
  return (
    <>
      <ReactPaginate
        pageCount={10}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        containerClassName="pagination-container"
        pageLinkClassName="pagination-item"
        activeLinkClassName="pagination-item-active"
        breakClassName="pagination-item"
        disabledClassName="arrow-inactive"
        previousLabel={<ArrowIcon />}
        previousClassName="arrow-previous"
        nextLabel={<ArrowIcon />}
        nextClassName="arrow-next"
      />
    </>
  );
};

export default Pagination;
