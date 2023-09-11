import { useSelector } from "react-redux";
import Card from "../../components/Card/Card";

const NewProducts = () => {
  const userAllProducts = useSelector((state) => state.product.products);

  return (
    <div className="all-products">
      <h1>NEW!</h1>
      <div className="products-container">
        {userAllProducts.map((el) => {
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
        })}
      </div>
    </div>
  );
};

export default NewProducts;
