/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "./Card.scss";
import { getAuthAssetsFromLocalStorage } from "../../utils/storage";
import { useDispatch } from "react-redux";
import { fetchLikes } from "../../features/LikesSlice";
import { fetchCarts } from "../../features/CartSlice";
import { URL_IMAGE } from "../../constants/api";
import { dollarToSom } from "../../utils/exchange";
import { addToLike } from "../../utils/add-to-like";
import { addToCart } from "../../utils/add-to-cart";

const Card = ({ image, title, price, discount, id, count }) => {
  const dispatch = useDispatch();

  const { user_id } = getAuthAssetsFromLocalStorage();

  async function handleAddingToCart(id) {
    await addToCart(id, user_id);
    dispatch(fetchCarts());
  }

  async function handleLiking(id) {
    await addToLike(id, user_id);
    dispatch(fetchLikes());
  }

  return (
    <div className="card">
      <button className="add-to-like" onClick={() => handleLiking(id)}>
        <i className="fa-regular fa-heart"></i>
      </button>
      <Link className="clicklable_link" to={`/product/${id}`}>
        <img src={`${URL_IMAGE}/uploads/${image}`} alt="" className="start" />
        <p>{title}</p>
        {discount ? (
          <h4 className="old-price">{dollarToSom(price)} som</h4>
        ) : (
          ""
        )}
        <h4>
          {discount
            ? dollarToSom(price - (price * discount) / 100)
            : dollarToSom(price)}{" "}
          som {discount ? <span>-{discount}%</span> : null}
        </h4>
      </Link>
      <div
        className="end"
        style={discount ? { marginTop: "30px" } : { marginTop: "50px" }}
      >
        <button className="add-to-cart" onClick={() => handleAddingToCart(id)}>
          {count ? `ADD TO CART ➡️ ${count}` : "ADD TO CART"}
        </button>
      </div>
    </div>
  );
};

export default Card;
