import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card/Card";
import { getAccessTokenFromLocalStorage } from "../../utils/storage";

import "./AllProducts.scss";
import { fetchProducts } from "../../features/ProductsSlice";

const AllProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userAllProducts = useSelector((state) => state.product.products);
  const token = getAccessTokenFromLocalStorage();

  useEffect(() => {
    if (!token) navigate("/");
    dispatch(fetchProducts());
  }, [token, navigate, dispatch]);



  return (
    <div className="all-products">
      <p className="heading" >All Products</p>
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
