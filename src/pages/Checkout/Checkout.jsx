/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./Checkout.scss";
import { Link, useNavigate } from "react-router-dom";
import logistic from "../../../public/logistic.svg";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getAuthAssetsFromLocalStorage } from "../../utils/storage";
import http from "../../service/api";
import { fetchCarts } from "../../features/CartSlice";

const Checkout = () => {
  const dispatch = useDispatch();

  const carts = useSelector((state) => state.cart.carts);
  const user = useSelector((state) => state.user.userOne);

  const filteredCarts = carts.filter(el => el.status === "unpaid");

  const { user_id } = getAuthAssetsFromLocalStorage();
  const [values, setValues] = useState({
    city: "",
    district: "",
    street: "",
    avenue: "",
  });
  function onChange(e) {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  }
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [updateCart, setUpdateCart] = useState(false);

  const somToDolllar = Math.round(total / 12000);

  function $toSom(number) {
    const exchangeRate = 12000;
    const sum = number * exchangeRate;
    return sum.toLocaleString();
  }
  useEffect(() => {
    (function handleTotal() {
      let count = 0;
      let price = 0;
      let discount = 0;
      let total = 0;
      setUpdateCart(false);
      for (let i = 0; i < filteredCarts.length; i++) {
        count += filteredCarts[i].count;
        price += +filteredCarts[i].product.price * filteredCarts[i].count;
        total += price;
        if (filteredCarts[i].product.discount_rate) {
          discount +=
            +filteredCarts[i].product.price * filteredCarts[i].count -
            (+filteredCarts[i].product.price *
              filteredCarts[i].count *
              filteredCarts[i].product.discount_rate) /
              100;
        }
        total = price - discount;
      }

      setCount(count);
      setTotal(total);
      setDiscount(discount);
      setPrice(price);
    })();
  }, [updateCart, filteredCarts]);

  const navigate = useNavigate();
  async function newPurchase(e) {
    e.preventDefault();
    if (!values.avenue || !values.city || !values.district || !values.street)
      return toast("Please field all the fields", { type: "error" });
    try {
      const data = await http.post("/order", {
        user_id,
        cost: somToDolllar,
        location: values,
      });
      navigate("/thank");
      toast(data.data.message, { type: "success" });
      dispatch(fetchCarts());
    } catch (error) {
      toast(error.response.data.message, { type: "error" });
    }
  }
  return user?.is_verified ? (
    <section id="purchase">
      <div className="purchase-header">
        <div className="header-start">
          <h2>Checkout</h2>
          <p>It will take a little time to fill in the following data</p>
        </div>
        <Link to={`/profile/${user_id}/carts`} className="link">
          <i className="fa-solid fa-arrow-left"></i>Back to shopping
        </Link>
      </div>
      <div className="purchase-body">
        <div className="body-start">
          <form className="location-info" onSubmit={newPurchase}>
            <div className="table">
              <div className="inp-label">
                <label htmlFor="city">City</label>
                <input
                  onChange={onChange}
                  value={values.city}
                  type="text"
                  name="city"
                  id="city"
                  placeholder="Tashkent"
                />
              </div>
              <div className="inp-label">
                <label htmlFor="district">District</label>
                <input
                  onChange={onChange}
                  value={values.district}
                  type="text"
                  name="district"
                  id="district"
                  placeholder="Sergeli"
                />
              </div>
            </div>
            <div className="table">
              <div className="inp-label">
                <label htmlFor="street">Street</label>
                <input
                  onChange={onChange}
                  value={values.street}
                  type="text"
                  name="street"
                  id="street"
                  placeholder="Sohibqiron"
                />
              </div>
              <div className="inp-label">
                <label htmlFor="avenue">Avenue</label>
                <input
                  onChange={onChange}
                  value={values.aveune}
                  type="text"
                  name="avenue"
                  id="avenue"
                  placeholder="Shovot.uz cafe"
                />
              </div>
            </div>
            <button id="checkout-btn">Order</button>
          </form>
        </div>
        <div className="body-end">
          <div className="end_head">
            <h3>Order price</h3>
            <ul>
              <li>
                Count of products: <span>{count}</span>
              </li>
              <li>
                Price <span>{$toSom(price)} som</span>
              </li>
              <li>
                Discount<span>-{discount ? $toSom(discount) : null} som</span>
              </li>
              <li>
                Delivery<span>0</span>
              </li>
              <li>
                Total payable:<span>{$toSom(total)} som</span>
              </li>
            </ul>
            <button onClick={newPurchase} type="submit" id="checkout-btn">
              Order
            </button>
          </div>
          <div className="end-body"></div>
          <div className="end-footer">
            <div className="footer-head">
              <h4>Sello Logistics</h4>
              <p>
                Efficient logistics service. We will deliver goods or mail from
                1 day to anywhere in the country - reliably, quickly and on
                time!
              </p>
            </div>
            <div className="footer">
              <img src={logistic} alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : null;
};

export default Checkout;
