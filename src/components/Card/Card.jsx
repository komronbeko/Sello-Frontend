/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./Card.scss";
import http from "../../service/api";
import { getAuthAssetsFromLocalStorage } from "../../utils/storage";
import { useDispatch } from "react-redux";
import { fetchLikes } from "../../features/LikesSlice";
import { fetchCarts } from "../../features/CartSlice";
import { URL_IMAGE } from "../../constants/api";

const Card = ({ image, title, price, discount, id, count }) => {
  const dispatch = useDispatch();

  const authAssets = getAuthAssetsFromLocalStorage();
  function $toSom(number) {
    const exchangeRate = 12200;
    const sum = number * exchangeRate;
    return sum.toLocaleString();
  }
  async function addToCart(id) {
    try {
      await http.post("/cart", {
        product_id: id,
        user_id: authAssets.user_id,
      });
      dispatch(fetchCarts());
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  }
  async function addToLike(id) {
    try {
      await http.post("/like", {
        product_id: id,
        user_id: authAssets.user_id,
      });
      dispatch(fetchLikes());
    } catch (error) {
      if (error.response.data.message !== "Product already liked")
        return toast(error.response.data.message, { type: "error" });
      await http.delete(`/like/${id}`);
      dispatch(fetchLikes());
    }
  }
  return (
    <div className="card">
      <button className="add-to-like" onClick={() => addToLike(id)}>
        <i className="fa-regular fa-heart"></i>
      </button>
      <Link className="clicklable_link" to={`/product/${id}`}>
        <img
          src={`${URL_IMAGE}/uploads/${image}`}
          alt=""
          className="start"
        />
        <p>{title}</p>
        {discount ? <h4 className="old-price">{$toSom(price)} som</h4> : ""}
        <h4>
          {discount ? $toSom(price - (price * discount) / 100) : $toSom(price)}{" "}
          som {discount ? <span>-{discount}%</span> : null}
        </h4>
      </Link>
      <div
        className="end"
        style={discount ? { marginTop: "30px" } : { marginTop: "50px" }}
      >
        <button className="add-to-cart" onClick={() => addToCart(id)}>
          {count ? `ADD TO CART ➡️ ${count}` : "ADD TO CART"}
        </button>
      </div>
    </div>
  );
};

export default Card;
