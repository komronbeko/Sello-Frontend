import { useNavigate } from "react-router";
import "./DiscountProducts.scss";
import { getAccessTokenFromLocalStorage } from "../../utils/storage";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "../../components/Card/Card";

const DiscountProducts = () => {
  const navigate = useNavigate();

  const token = getAccessTokenFromLocalStorage();

  const userAllProducts = useSelector((state) => state.product.products);

  useEffect(() => {
    if (!token) navigate("/");
  }, []);

  return (
    <div className="all-products discounts">
      <h1>Discounts</h1>
      <div className="products-container">
        {userAllProducts.length
          ? userAllProducts.map((el) => {
              if (el.discount_id) {
                return (
                  <Card
                    key={el.id}
                    image={el.photo}
                    discount={el.discount_rate}
                    id={el.id}
                    price={el.price}
                    title={el.name}
                  />
                );
              }
            })
          : ""}
      </div>
    </div>
  );
};

export default DiscountProducts;
