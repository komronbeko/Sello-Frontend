/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import Card from "../../components/Card/Card";
import "./ProductsContainer.scss";
import { Skeleton } from "@mui/material";
import { setPage } from "../../features/ProductsSlice";
const ProductsContainer = ({
  data,
  loading,
  heading,
  isDiscount,
  currentPage,
  totalPages,
}) => {
  const dispatch = useDispatch();

  const handlePageChange = (page) => {
    dispatch(setPage(page));
  };

  return (
    <div className={`products-cover ${isDiscount ? "discounts" : null}`}>
      <p className="heading">{heading}</p>
      {loading ? (
        <div className="products-skeleton">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el) => (
            <div key={el}>
              <Skeleton variant="rounded" height={200} />
              <Skeleton width="60%" sx={{ marginTop: "20px" }} />
              <Skeleton sx={{ margin: "10px 0" }} height={40} />
            </div>
          ))}
        </div>
      ) : (
        <div className="products-container">
          {data.length ? (
            data.map((el) => {
              return (
                <div key={el.id}>
                  <Card
                    key={el.id}
                    image={el.photos[0]?.path}
                    discount={el.discount?.rate}
                    id={el.id}
                    price={el.price}
                    title={el.name}
                  />
                </div>
              );
            })
          ) : (
            <p>No Products at all!</p>
          )}
        </div>
      )}
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={currentPage === index + 1 ? "active" : ""}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductsContainer;
