import { useNavigate } from "react-router";
import { getAccessTokenFromLocalStorage } from "../../utils/storage";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "../../components/Card/Card";

const NewProducts = () => {
  const navigate = useNavigate();

  const token = getAccessTokenFromLocalStorage();

  const userAllProducts = useSelector((state) => state.product.products);

  useEffect(() => {
    if (!token) navigate("/");
  }, [navigate, token]);

  return (
    <div className="all-products">
      <h1>NEW!</h1>
      <div className="products-container">
        {userAllProducts.length
          ? userAllProducts.map((el) => {
              if (el.new) {
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
            })
          : ""}
      </div>
    </div>
  );
};

export default NewProducts;
