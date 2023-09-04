/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./OrderCard.scss";
import http from "../../service/api";
import { useDispatch } from "react-redux";
import { fetchCarts } from "../../features/CartSlice";
import { fetchLikes } from "../../features/LikesSlice";
import { getAuthAssetsFromLocalStorage } from "../../utils/storage";

const CartCard = ({
  title,
  price,
  discount,
  count,
  id,
  photo,
  cart_item_id,
  setUpdate,
}) => {
  const dispatch = useDispatch();
  const authAssets = getAuthAssetsFromLocalStorage()
  function $toSom(number) {
    const exchangeRate = 12000;
    const sum = number * exchangeRate;
    return sum.toLocaleString();
  }
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
    <div id="card">
      <img src={`http://localhost:3000/uploads/${photo}`} alt="" />
      <div className="end-card">
        <Link className="link" to={`/product/${id}`}>
          {title}
        </Link>
        <p className="price">
          {discount ? $toSom(price - (price * discount) / 100) : $toSom(price)}{" "}
          somm{" "}
          {discount ? (
            <span>
              Discount: {discount}%
              <b className="discount-minus">{$toSom(price)} som</b>
            </span>
          ) : null}
        </p>
        <p className="country">
          Страна доставки: <span>Узбекистан</span>
        </p>
        <div className="end-card-footer">
          <div className="btns">
            <button onClick={() => addToLike(id)}>
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
