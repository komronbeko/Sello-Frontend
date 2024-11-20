/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { fetchLikes } from "../../features/LikesSlice";
import { fetchCarts } from "../../features/CartSlice";
import { API_BASE_URL, URL_IMAGE } from "../../constants/api";
import { addToLike } from "../../utils/add-to-like";
import { addToCart } from "../../utils/add-to-cart";
import { setAuthModalTrue } from "../../features/AuthModalSlice";
import FavoriteBrderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { getAccessTokenFromLocalStorage } from "../../utils/storage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserOne } from "../../features/UserOneSlice";
import noImagePng from "../../assets/no-image-icon-6.png";

import "./Card.scss";
import axios from "axios";
import { toast } from "react-toastify";
import { fetchUnauthorizedProducts } from "../../features/ProductsSlice";

const Card = ({ image, title, price, discount, id, count, isAdmin }) => {
  const dispatch = useDispatch();

  const token = getAccessTokenFromLocalStorage();
  const userOne = useSelector((state) => state.user.userOne);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserOne(token));
    }
  }, [token, dispatch]);

  async function handleAddingToCart(id) {
    if (!token) {
      return dispatch(setAuthModalTrue());
    }
    await addToCart(id, token);
    dispatch(fetchCarts(token));
  }
  async function handleLiking(id) {
    if (!token) {
      return dispatch(setAuthModalTrue());
    }
    await addToLike(id, token);
    dispatch(fetchLikes(token));
    dispatch(fetchUserOne(token));
  }

  async function handleVerify(id) {
    try {
      const { data } = await axios.patch(
        `${API_BASE_URL}/product/verify`,
        {
          product_id: id,
          is_verified: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      dispatch(fetchUnauthorizedProducts(token));
      toast(data.message, { type: "success" });
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  }

  return (
    <div className="card">
      {!isAdmin ? (
        <button className="add-to-like" onClick={() => handleLiking(id)}>
          {userOne?.likes?.some((el) => el.product_id == id) ? (
            <FavoriteIcon style={{ color: "#00b3a8" }} />
          ) : (
            <FavoriteBrderIcon style={{ color: "#00b3a8" }} />
          )}
        </button>
      ) : null}
      <Link className="clicklable_link" to={`/product/${id}`}>
        <div className="img-wrapper">
          <img
            src={image ? `${URL_IMAGE}/${image}` : noImagePng}
            alt=""
            className="start"
          />
        </div>
        <p>{title}</p>
        {discount ? <h4 className="old-price">£{price}</h4> : ""}
        <h4>
          {discount ? `£${price - (price * discount) / 100}` : `£${price}`}
          {discount ? <span>{discount}%</span> : null}
        </h4>
      </Link>
      <div
        className="end"
        style={discount ? { marginTop: "30px" } : { marginTop: "50px" }}
      >
        {!isAdmin ? (
          <button
            className="add-to-cart"
            onClick={() => handleAddingToCart(id)}
          >
            {count ? `ADD TO CART ➡️ ${count}` : "ADD TO CART"}
          </button>
        ) : (
          <button onClick={() => handleVerify(id)}>Verify</button>
        )}
      </div>
    </div>
  );
};

export default Card;
