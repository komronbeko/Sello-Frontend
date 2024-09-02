/* eslint-disable react/prop-types */
import Card from "../../components/Card/Card";
import "./ProductsContainer.scss";
import { Grid, Skeleton } from "@mui/material";

const ProductsContainer = ({ data, loading, heading, isDiscount }) => {
  return (
    <div
      className={isDiscount ? "discounts products-wrapper" : "products-wrapper"}
    >
      <p className="heading">{heading}</p>
      {loading || !data.length ? (
        <Grid
          container
          columnSpacing={2}
          rowSpacing={3}
          columns={5}
          justifyContent="center"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el) => (
            <Grid item key={el}>
              <Skeleton variant="rounded" width={244} height={180} />
              <Skeleton width="60%" sx={{ marginTop: "20px" }} />
              <Skeleton sx={{ margin: "10px 0" }} height={40} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid
          container
          columnSpacing={2}
          rowSpacing={3}
          columns={5}
          justifyContent={"space-between"}
        >
          {data.length ? (
            data.map((el) => {
              return (
                <Grid item key={el.id}>
                  <Card
                    key={el.id}
                    image={el.photo}
                    discount={el.discount?.rate}
                    id={el.id}
                    price={el.price}
                    title={el.name}
                  />
                </Grid>
              );
            })
          ) : (
            <p>No Products at all!</p>
          )}
        </Grid>
      )}
    </div>
  );
};

export default ProductsContainer;
