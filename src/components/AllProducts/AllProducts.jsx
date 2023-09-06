import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "../../components/Card/Card";
import { getAccessTokenFromLocalStorage } from "../../utils/storage";

import "./AllProducts.scss";

const AllProducts = () => {
  const navigate = useNavigate();

  const token = getAccessTokenFromLocalStorage();

  useEffect(() => {
    if (!token) navigate("/");
  }, [token, navigate]);


  const userAllProducts = useSelector((state) => state.product.products);


  return (
    <div className="all-products">
      <h1>All Products</h1>
      <div className="products-container">
      {userAllProducts.length
        ? userAllProducts.map((el) => {
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
          })
        : ""}
      </div>
    </div>
  );
};

export default AllProducts;
