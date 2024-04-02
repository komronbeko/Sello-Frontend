/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { fetchLikes } from "../../features/LikesSlice";
import { fetchCarts } from "../../features/CartSlice";
import { URL_IMAGE } from "../../constants/api";
import { dollarToSom } from "../../utils/exchange";
import { addToLike } from "../../utils/add-to-like";
import { addToCart } from "../../utils/add-to-cart";
import { setAuthModalTrue } from "../../features/AuthModalSlice";

import FavoriteBrderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";


import "./Card.scss";
import { getAccessTokenFromLocalStorage } from "../../utils/storage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserOne } from "../../features/UserOneSlice";

const Card = ({ image, title, price, discount, id, count }) => {
  const dispatch = useDispatch();

  const token = getAccessTokenFromLocalStorage();
  const userOne = useSelector((state) => state.user.userOne);

  useEffect(() => {
    if(token){
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

  return (
    <div className="card">
      <button className="add-to-like" onClick={() => handleLiking(id)}>
        {userOne?.likes?.some(el => el.product_id == id) ? <FavoriteIcon style={{ color: '#00b3a8' }} /> : <FavoriteBrderIcon style={{ color: '#00b3a8' }} />}
         </button>
      <Link className="clicklable_link" to={`/product/${id}`}>
        <img src={`${URL_IMAGE}/${image}`} alt="" className="start" />
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
          som {discount ? <span>{discount}%</span> : null}
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
