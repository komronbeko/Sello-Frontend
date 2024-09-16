/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./Checkout.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import logistic from "../../assets/logistic.svg";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import http from "../../service/api";
import { fetchCarts } from "../../features/CartSlice";
import { dollarToPound } from "../../utils/exchange";
import { handleTotal } from "../../utils/total";
import { getAccessTokenFromLocalStorage } from "../../utils/storage";
import axios from "axios";
import { API_BASE_URL } from "../../constants/api";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user_id } = useParams();

  const token = getAccessTokenFromLocalStorage();

  const [updateCart, setUpdateCart] = useState(false);
  const [values, setValues] = useState({
    city: "",
    district: "",
    street: "",
    avenue: "",
  });
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);

  const carts = useSelector((state) => state.cart.carts);
  const user = useSelector((state) => state.user.userOne);

  function onChange(e) {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  }

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!token) return navigate("/");

    const { count, discount, price, total } = handleTotal(carts, setUpdateCart);
    setCount(count);
    setPrice(price);
    setDiscount(discount);
    setTotal(total);
  }, [updateCart, carts, token, navigate]);

  async function newPurchase(e) {
    e.preventDefault();
    if (!values.avenue || !values.city || !values.district || !values.street)
      return toast("Please field all the fields", { type: "error" });
    try {
      const data = await axios.post(
        `${API_BASE_URL}/order`,
        {
          cost: Math.round(total),
          location: values,
        },
        { headers: { Authorization: "Bearer " + token } }
      );
      dispatch(fetchCarts(token));
      toast(data.data.message, { type: "success" });
      navigate(`/${user_id}/thank`);
    } catch (error) {
      toast(error.response.data.message, { type: "error" });
    }
  }

  return (
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
                Price <span>{dollarToPound(price)} £</span>
              </li>
              <li>
                Discount
                <span>-{discount ? dollarToPound(discount) : null} £</span>
              </li>
              <li>
                Delivery<span>0</span>
              </li>
              <li>
                Total payable:<span>{dollarToPound(total)} £</span>
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
  );
};

export default Checkout;
