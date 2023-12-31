import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CartCard from "../../components/OrderCard/OrderCard";
import { fetchCarts } from "../../features/CartSlice";
import { fetchUserOne } from "../../features/UserOneSlice";
import { dollarToSom } from "../../utils/exchange";
import { getAccessTokenFromLocalStorage } from "../../utils/storage";
import { API_BASE_URL } from "../../constants/api";
import UZImage from "../../assets/uz.svg";

import "./Carts.scss";
import NoProducts from "../../components/NoProducts/NoProducts";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user_id } = useParams();
  const token = getAccessTokenFromLocalStorage();

  const carts = useSelector((state) => state.cart.carts);

  const [tootlip, setTootlip] = useState(0);
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [updateCart, setUpdateCart] = useState(false);

  function hover(number) {
    setTootlip(number);
  }

  useEffect(() => {
    if (!token) return navigate("/");
    (function handleTotal() {
      let count = 0;
      let price = 0;
      let discount = 0;
      let total = 0;
      setUpdateCart(false);
      for (let i = 0; i < carts.length; i++) {
        count += carts[i].count;
        price += +carts[i].product.price * carts[i].count;
        if (carts[i].product.discount?.rate) {
          discount +=
            (+carts[i].product.price *
              carts[i].count *
              carts[i].product.discount?.rate) /
            100;
        }
      }
      total = price - discount;

      setCount(count);
      setTotal(total);
      setDiscount(discount);
      setPrice(price);
    })();
  }, [updateCart, carts, token, navigate]);

  async function clearCart() {
    if (carts.length) {
      await axios.delete(`${API_BASE_URL}/cart/all`, {
        headers: { Authorization: "Bearer " + token },
      });
      toast("Carts cleared.", { type: "info" });
      dispatch(fetchCarts(token));
      dispatch(fetchUserOne(token));
      setUpdateCart(true);
    } else {
      toast("Cart is empty", { type: "error" });
    }
  }

  function Order() {
    if (!carts.length) return toast("Cart is empty.", { type: "error" });
    navigate(`/${user_id}/checkout`);
  }

  return (
    <section id="cart">
      <div className="cart-start">
        <dir className="start-head">
          <h2>Cart</h2>
          <h4>Delivery is carried out by the Sello Logistics service.</h4>
          {carts.length ? <div className="btn-clear">
            <button onClick={() => clearCart()}>
              <i className="fa-solid fa-xmark"></i>Clear all
            </button>
          </div> : null}

        </dir>
        <div className="cards">
          {carts.length ? carts?.map((i) => {
            return (
              <CartCard
                key={i.id}
                title={i.product.name}
                photo={i.product.photo}
                id={i.product.id}
                count={i.count}
                price={i.product.price}
                discount={i.product.discount?.rate}
                cart_item_id={i.id}
                setUpdate={setUpdateCart}
                user_id={user_id}
              />
            );
          }) : <NoProducts />}
        </div>
      </div>
      <div className="cart-end">
        <div className="cart-end_head">
          <h3>Order price</h3>
          <ul>
            <li>
              Count of products: <span>{count}</span>
            </li>
            <li>
              Price <span>{dollarToSom(price)} som</span>
            </li>
            <li>
              Discount
              <span>-{discount ? dollarToSom(discount) : null} som</span>
            </li>
            <li>
              Delivery<span>0</span>
            </li>
            <li>
              Total payable:<span>{dollarToSom(total)} som</span>
            </li>
          </ul>
          <button id="checkout-btn" onClick={Order}>
            Go to checkout
          </button>
        </div>
        <div className="end_body">
          <div className="info">
            <div className="body_info">
              <h5>
                <i className="fa-solid fa-truck"></i>DeliveryShipping:
              </h5>
              <p>The cost of delivery in the city is from 15,000 som.</p>
            </div>
            <p
              className={`${tootlip === 1 ? "tootlip-1 hovered" : "tootlip-1"}`}
            >
              Delivery is carried out to the point of your choice within 2
              working days from the date of order.
            </p>
            <button
              className="info_tootlip-1"
              onMouseEnter={() => hover(1)}
              onMouseLeave={() => hover(0)}
            >
              <i className="fa-solid fa-circle-info"></i>{" "}
            </button>
          </div>
          <div className="info">
            <div className="body_info">
              <h5>
                <i className="fa-solid fa-cube"></i>Pickup from{" "}
                <span>sello !</span>
              </h5>
              <p
                className={`${tootlip === 2 ? "tootlip-2 hovered" : "tootlip-2"
                  }`}
              >
                You can pick up at our branches
              </p>
            </div>
            <button
              className="info_tootlip-2"
              onMouseEnter={() => hover(2)}
              onMouseLeave={() => hover(0)}
            >
              <i className="fa-solid fa-circle-info"></i>
            </button>
          </div>
        </div>
        <div className="end_footer">
          <h5>
            <img src={UZImage} alt="" />
            Delivery country: <span>Uzbekistan</span>
          </h5>
          <div className="end_footer_end">
            <p>
              1. Return of product: <span>No</span>
            </p>
            <p>
              2. Open the package: <span>Yes</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
