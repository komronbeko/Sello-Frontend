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
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

import "./Card.scss";
import axios from "axios";
import { toast } from "react-toastify";
import { Verified } from "@mui/icons-material";
import { fetchUnauthorizedProducts } from "../../features/ProductsSlice";

const Card = ({ image, title, price, discount, id, isAdmin, is_verified }) => {
  const dispatch = useDispatch();

  const token = getAccessTokenFromLocalStorage();
  const userOne = useSelector((state) => state.user.userOne);
  const userCarts = useSelector((state) => state.cart.carts);

  const specCart = userCarts.find(
    (el) =>
      el.product_id == id && el.user_id == userOne?.id && el.status == "unpaid"
  );

  useEffect(() => {
    if (token) {
      dispatch(fetchUserOne(token));
    }
  }, [token, dispatch]);

  async function handleAddingToCart(event, id) {
    event.preventDefault();
    event.stopPropagation();
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

      toast(data.message, { type: "success" });
      dispatch(fetchUnauthorizedProducts(token));
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
        <div className="title">
          <p>{title}</p>
          {is_verified ? <Verified fontSize="small" /> : null}
        </div>
        {discount ? (
          <div className="discount">
            <div>
              <h4 className="old-price">£{price}</h4>
              <h4>£{price - (price * 10) / 100}</h4>
            </div>
            <span>{10}%</span>
          </div>
        ) : (
          <h4>£{price}</h4>
        )}
      </Link>
      <div className="end">
        {isAdmin ? (
          <button onClick={() => handleVerify(id)}>Verify</button>
        ) : (
          <div
            type="button"
            className="add-to-cart"
            onClick={(event) => handleAddingToCart(event, id)}
          >
            {specCart?.count ? (
              <>
                <span>Add to Cart</span>
                <ArrowRightAltIcon fontSize="small" />
                <span>{specCart.count}</span>
              </>
            ) : (
              "Add to Cart"
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
