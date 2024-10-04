/* eslint-disable react/prop-types */
import Card from "../../components/Card/Card";
import "./ProductsContainer.scss";
import { Skeleton } from "@mui/material";

const ProductsContainer = ({ data, loading, heading, isDiscount }) => {
  return (
    <div className={`products-cover ${isDiscount ? "discounts" : null}`}>
      <p className="heading">{heading}</p>
      {loading ? (
        <div className="products-skeleton">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el) => (
            <div key={el.id}>
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
                    image={el.photo}
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
    </div>
  );
};

export default ProductsContainer;
