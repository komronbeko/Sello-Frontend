/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import http from "../../service/api";
import { fetchCarts } from "../../features/CartSlice";
import { fetchLikes } from "../../features/LikesSlice";
import { URL_IMAGE } from "../../constants/api";
import { dollarToSom } from "../../utils/exchange";
import { addToLike } from "../../utils/add-to-like";
import { setAuthModalTrue } from "../../features/AuthModalSlice";

import "./OrderCard.scss";

const CartCard = ({
  title,
  price,
  discount,
  count,
  id,
  photo,
  cart_item_id,
  setUpdate,
  user_id,
}) => {
  const dispatch = useDispatch();

  async function PlusCount(id) {
    await http.patch(`/cart/count/plus/${id}`);
    dispatch(fetchCarts());
    setUpdate(true);
  }
  async function minusCount(id) {
    await http.patch(`/cart/count/minus/${id}`);
    dispatch(fetchCarts());
    setUpdate(true);
  }
  async function deleteFromCart(id) {
    await http.delete(`/cart/${id}`);
    dispatch(fetchCarts());
    setUpdate(true);
  }

  async function handleLiking(id) {
    if(!user_id){
      return dispatch(setAuthModalTrue());
    }
    await addToLike(id, user_id);
    dispatch(fetchLikes());
  }

  return (
    <div id="card">
      <img src={`${URL_IMAGE}/uploads/${photo}`} alt="" />
      <div className="end-card">
        <Link className="link" to={`/product/${id}`}>
          {title}
        </Link>
        <p className="price">
          {discount
            ? dollarToSom(price - (price * discount) / 100)
            : dollarToSom(price)}{" "}
          somm{" "}
          {discount ? (
            <span>
              Discount: {discount}%
              <b className="discount-minus">{dollarToSom(price)} som</b>
            </span>
          ) : null}
        </p>
        <p className="country">
          Страна доставки: <span>Узбекистан</span>
        </p>
        <div className="end-card-footer">
          <div className="btns">
            <button onClick={() => handleLiking(id)}>
              <i className="fa-regular fa-heart"></i>Add to favorite
            </button>
            <button onClick={() => deleteFromCart(cart_item_id)}>
              <i className="fa-solid fa-xmark"></i>Delete from cart
            </button>
          </div>
          <div className="count-emiter">
            {count === 1 ? (
              <button className="in-active">
                <i className="fa-solid fa-minus"></i>
              </button>
            ) : (
              <button onClick={() => minusCount(cart_item_id)}>
                <i className="fa-solid fa-minus"></i>
              </button>
            )}
            <h3>{count}</h3>
            <button onClick={() => PlusCount(cart_item_id)}>
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
