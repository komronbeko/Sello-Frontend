import { useSelector } from "react-redux";
import Card from "../../components/Card/Card";

import "./DiscountProducts.scss";

const DiscountProducts = () => {
  const userAllProducts = useSelector((state) => state.product.products);

  return (
    <div className="all-products discounts">
      <h1>Discounts</h1>
      <div className="products-container">
        {userAllProducts.map((el) => {
          if (el.discount_id) {
            return (
              <Card
                key={el.id}
                image={el.photo}
                discount={el.discount?.rate}
                id={el.id}
                price={el.price}
                title={el.name}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default DiscountProducts;
