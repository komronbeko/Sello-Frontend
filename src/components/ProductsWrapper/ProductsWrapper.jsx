/* eslint-disable react/prop-types */

import { Skeleton } from "@mui/material";
import Card from "../Card/Card";
import "./ProductsWrapper.scss";
import NoProducts from "../NoProducts/NoProducts";

const ProductsWrapper = ({ data, loading }) => {
  return (
    <div className="products_wrapper">
      {loading ? (
        [1, 2, 3, 4, 5, 6, 7, 8, 9].map((el) => (
          <div key={el}>
            <Skeleton variant="rounded" height={200} />
            <Skeleton width="60%" sx={{ marginTop: "20px" }} />
            <Skeleton sx={{ margin: "10px 0" }} height={40} />
          </div>
        ))
      ) : !data.length ? (
        <NoProducts />
      ) : (
        <div className="products_content">
          {data.map((el) => (
            <Card
              key={el.id}
              image={el.photos[0]?.path}
              discount={el.discount?.rate}
              id={el.id}
              price={el.price}
              title={el.name}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsWrapper;
