/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarts } from "../../features/CartSlice";
import { fetchLikes } from "../../features/LikesSlice";
import { API_BASE_URL, URL_IMAGE } from "../../constants/api";
import { dollarToSom } from "../../utils/exchange";
import { addToLike } from "../../utils/add-to-like";
import { setAuthModalTrue } from "../../features/AuthModalSlice";

import "./OrderCard.scss";
import { getAccessTokenFromLocalStorage } from "../../utils/storage";
import axios from "axios";
import { fetchUserOne } from "../../features/UserOneSlice";
import { useEffect } from "react";

const CartCard = ({
  title,
  price,
  discount,
  count,
  id,
  photo,
  cart_item_id,
  user_id,
}) => {
  const dispatch = useDispatch();
  const userOne = useSelector((state) => state.user.userOne);

  const token = getAccessTokenFromLocalStorage();

  useEffect(() => {
    dispatch(fetchUserOne(token));
  }, [dispatch, token]);

  async function PlusCount(id) {
    await axios.patch(`${API_BASE_URL}/cart/count/plus/${id}`, "", { headers: { Authorization: 'Bearer ' + token } });
    dispatch(fetchCarts(token));
  }
  async function minusCount(id) {
    await axios.patch(`${API_BASE_URL}/cart/count/minus/${id}`, "", { headers: { Authorization: 'Bearer ' + token } });
    dispatch(fetchCarts(token));
  }
  async function deleteFromCart(id) {
    await axios.delete(`${API_BASE_URL}/cart/${id}`, { headers: { Authorization: 'Bearer ' + token } });
    dispatch(fetchCarts(token));
  }

  async function handleLiking(id) {
    if (!user_id) {
      return dispatch(setAuthModalTrue());
    }
    await addToLike(id, token);
    dispatch(fetchLikes(token));
    dispatch(fetchUserOne(token));
  }

  return (
    <div id="card">
      <img src={`${URL_IMAGE}/${photo}`} alt="" />
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
              {userOne?.likes?.some(el => el.product_id == id) ? <p className="like-add"><i className="fa-solid fa-heart"></i>Delete from favorite</p> : <p className="like-add"><i className="fa-regular fa-heart"></i>Add to favorite</p> }
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
