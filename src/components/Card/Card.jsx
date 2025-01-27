/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { fetchLikes } from "../../features/LikesSlice";
import { fetchCarts } from "../../features/CartSlice";
import { URL_IMAGE } from "../../constants/api";
import { addToLike } from "../../utils/add-to-like";
import { addToCart } from "../../utils/add-to-cart";
import { setAuthModalTrue } from "../../features/AuthModalSlice";
import FavoriteBrderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { getAccessTokenFromLocalStorage } from "../../utils/storage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUserOne } from "../../features/UserOneSlice";
import noImagePng from "../../assets/no-image-icon-6.png";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { toast } from "react-toastify";
import { Delete, Edit, Verified } from "@mui/icons-material";
import {
  fetchUnauthorizedProducts,
  fetchUserProducts,
} from "../../features/ProductsSlice";
import http from "../../service/api";

import "./Card.scss";
import VerifyDeleting from "../VerifyDeliting/VerifyDeleting";

const Card = ({
  image,
  title,
  price,
  discount,
  id,
  isAdmin,
  is_verified,
  is_owner,
  is_deleted,
  fetchDeleted,
}) => {
  const dispatch = useDispatch();

  const [verifyClearing, setVerifyClearing] = useState(false);

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

  async function handleAddingToCart(event) {
    event.preventDefault();
    event.stopPropagation();
    if (!token) {
      return dispatch(setAuthModalTrue());
    }
    await addToCart(id, token);
    dispatch(fetchCarts(token));
  }
  async function handleLiking() {
    if (!token) {
      return dispatch(setAuthModalTrue());
    }
    await addToLike(id, token);
    dispatch(fetchLikes(token));
    dispatch(fetchUserOne(token));
  }

  async function handleVerify() {
    try {
      const { data } = await http.patch("/product/verify", {
        product_id: id,
        is_verified: true,
      });

      toast(data.message, { type: "success" });
      dispatch(fetchUnauthorizedProducts(token));
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  }

  async function handleDelete() {
    try {
      const { data } = await http.delete(`/product/${id}`);
      toast(data.message, { type: "success" });
      dispatch(fetchUserProducts(token));
    } catch (error) {
      toast(error.message, { type: "error" });
    }

    setVerifyClearing(false);
  }

  async function handleRestore() {
    try {
      const { data } = await http.patch(`/product/restore/${id}`);
      toast(data.message, { type: "success" });
      fetchDeleted();
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  }

  return (
    <>
      {verifyClearing ? (
        <VerifyDeleting
          verifyDeleting={handleDelete}
          setVerifyModal={setVerifyClearing}
          mainText="Are you sure you want to delete your product?"
          verifyingText="Yes, I want to delete my product"
          cancelingText=" No, I do not want to delete my product"
          darkBg={true}
        />
      ) : null}
      <div className="card">
        {is_owner && is_verified ? (
          <button className="add-to-like">
            <Verified />
          </button>
        ) : !isAdmin ? (
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
        </Link>
        <div className="title">
          <Link to={`/product/${id}`}>
            <p>{title}</p>
          </Link>
          <div className="card_actions">
            {(isAdmin || is_owner) && !is_deleted ? (
              <div>
                {" "}
                <Edit className="edit" fontSize="small" />{" "}
                <Delete
                  className="delete"
                  fontSize="small"
                  onClick={() => setVerifyClearing(true)}
                />
              </div>
            ) : null}
          </div>
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
        <div className="end">
          {isAdmin ? (
            <button onClick={() => handleVerify()}>Verify</button>
          ) : is_deleted ? (
            <button onClick={() => handleRestore()}>Restore</button>
          ) : (
            <div
              type="button"
              className="add-to-cart"
              onClick={(event) => handleAddingToCart(event)}
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
    </>
  );
};

export default Card;
