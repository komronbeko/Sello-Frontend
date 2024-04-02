import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ProfileNav from "../../components/ProfileNavbar/ProfileNavbar";
import { API_BASE_URL, URL_IMAGE } from "../../constants/api";
import { fetchOrders } from "../../features/OrdersSlice";
import { dollarToSom } from "../../utils/exchange";
import { getAccessTokenFromLocalStorage } from "../../utils/storage";

import "./Orders.scss";
import axios from "axios";
import NoProducts from "../../components/NoProducts/NoProducts";
import VerifyDeleting from "../../components/VerifyDeliting/VerifyDeleting";

const Orders = () => {
  const [verifyModal, setVerifyModal] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const orders = useSelector((state) => state.order.orders);
  const token = getAccessTokenFromLocalStorage();

  const { user_id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleOrderCancelation() {
    try {
      await axios.delete(`${API_BASE_URL}/order/cancel/${orderId}`, { headers: { Authorization: 'Bearer ' + token } });
      toast("Order canceled", { type: "info" });
      dispatch(fetchOrders(token));
      setVerifyModal(false);
    } catch (error) {
      toast(error.response.data.message, { type: "error" });
      setVerifyModal(false);
    }
  }

  function handleCancelBtn(id) {
    setVerifyModal(true);
    setOrderId(id);
  }

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!token) navigate("/");
    dispatch(fetchOrders(token));
  }, [dispatch, token, navigate]);

  return (
    <div id="purchase">
      <ProfileNav activePage={"My orders"} user_id={user_id} />
      <section id="data">
        <div className="data-head">
          <h3>My orders</h3>
        </div>
        {orders?.length ? (
          <div id="orders">
            {orders?.map((o) => {
              const loc = JSON.parse(o.location);
              return (
                <div className="order" key={o.id}>
                  {o.status != "canceled" ?
                    <button
                      onClick={() => handleCancelBtn(o.id)}
                      className="cancel-order-btn"
                    >
                      ❌
                    </button> : ""
                  }
                  {verifyModal ? (
                    <VerifyDeleting verifyDeleting={handleOrderCancelation} setVerifyModal={setVerifyModal} mainText="Are you sure you want to cancel the order?" verifyingText="Yes, I want to cancel the order" cancelingText=" No, I do not want to cancel the order" />
                  ) : null}
                  <div className="order-aside">
                    <ul>
                      <li>
                        Cart number : <span>№ {o.id}</span>
                      </li>
                      <li>
                        Order date :{" "}
                        <span>{`${o.createdAt
                          .split("T")[0]
                          .split("-")
                          .join(".")} ${o.createdAt.split("T")[1].split(".")[0]
                          }`}</span>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        Delivery amount : <span>0</span>
                      </li>
                      <li>
                        Payment Type : <span>Paid✅</span>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        Secret code : <span>{o.secret_code}</span>
                      </li>
                      <li>Fiscal check : </li>
                    </ul>
                  </div>
                  <div className="order-body">
                    {o.carts.map((p) => {
                      return (
                        <div className="product" key={p.id}>
                          <div className="product-start">
                            <img
                              src={`${URL_IMAGE}/${p.product.photo}`}
                              alt=""
                            />
                          </div>
                          <div className="product-end">
                            <Link
                              to={`/product/${p.product.id}`}
                              className="link"
                            >
                              {p.product.name}
                            </Link>
                            <ul>
                              <li>
                                Price : {dollarToSom(p.product.price)} som
                              </li>
                              <li>Description : {p.product.description}</li>
                              <li>Count: {p.count}</li>
                            </ul>
                          </div>
                        </div>
                      );
                    })}
                    <p className={`type ${o.status}`}>{o.status}</p>
                  </div>
                  <div className="order-footer">
                    <h4>About delivery</h4>
                    <div className="about">
                      <div className="table">
                        <p className="key">Address : </p>
                        <p className="value">
                          {`${loc.city}, ${loc.district}, ${loc.avenue}, ${loc.street}`}
                        </p>
                      </div>
                      <div className="table">
                        <p className="key">Delivery :</p>
                        <p className="value">Courier</p>
                      </div>
                      <div className="table">
                        <p className="key">Total amount :</p>
                        <p className="value">{dollarToSom(o.cost)} som</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : <NoProducts />}
      </section>
    </div>
  );
};

export default Orders;
