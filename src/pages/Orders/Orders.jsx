import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import ProfileNav from "../../components/ProfileNavbar/ProfileNavbar";
import { API_BASE_URL, URL_IMAGE } from "../../constants/api";
import { fetchOrders } from "../../features/OrdersSlice";
import { getAccessTokenFromLocalStorage } from "../../utils/storage";
import noImagePng from "../../assets/no-image-icon-6.png";
import NoProducts from "../../components/NoProducts/NoProducts";
import VerifyDeleting from "../../components/VerifyDeliting/VerifyDeleting";
import { Skeleton } from "@mui/material";

import "./Orders.scss";
const Orders = () => {
  const [verifyModal, setVerifyModal] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const { orders, loading } = useSelector((state) => state.order);
  const token = getAccessTokenFromLocalStorage();

  const { user_id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleOrderCancelation() {
    try {
      await axios.delete(`${API_BASE_URL}/order/cancel/${orderId}`, {
        headers: { Authorization: "Bearer " + token },
      });
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
      <ProfileNav activePage={"My Orders"} user_id={user_id} />
      <section id="data">
        <div className="data-head">
          <h3>My orders</h3>
        </div>
        {loading ? (
          <div id="orders">
            <div className="order">
              <div className="order-aside">
                <Skeleton width="30%" height={70} />
                <Skeleton width="30%" height={70} />
                <Skeleton width="30%" height={70} />
              </div>
              <div className="order-body">
                <div className="product">
                  <Skeleton width="70%" />
                  <Skeleton width="25%" />
                </div>
                <div className="product">
                  <Skeleton width="70%" />
                  <Skeleton width="25%" />
                </div>
              </div>
              <Skeleton height={60} />
              <div className="order-footer">
                <Skeleton width="25%" height={40} />
                <div className="about">
                  <Skeleton width="30%" height={70} />
                  <Skeleton width="30%" height={70} />
                  <Skeleton width="30%" height={70} />
                </div>
              </div>
            </div>
            <div className="order">
              <div className="order-aside">
                <Skeleton width="30%" height={70} />
                <Skeleton width="30%" height={70} />
                <Skeleton width="30%" height={70} />
              </div>
              <div className="order-body">
                <div className="product">
                  <Skeleton width="70%" />
                  <Skeleton width="25%" />
                </div>
                <div className="product">
                  <Skeleton width="70%" />
                  <Skeleton width="25%" />
                </div>
              </div>
              <Skeleton height={60} />
              <div className="order-footer">
                <Skeleton width="25%" height={40} />
                <div className="about">
                  <Skeleton width="30%" height={70} />
                  <Skeleton width="30%" height={70} />
                  <Skeleton width="30%" height={70} />
                </div>
              </div>
            </div>
          </div>
        ) : orders?.length ? (
          <div id="orders">
            {orders?.map((order) => {
              const loc = JSON.parse(order.location);
              return (
                <div className="order" key={order.id}>
                  {order.status != "canceled" ? (
                    <button
                      onClick={() => handleCancelBtn(order.id)}
                      className="cancel-order-btn"
                    >
                      ❌
                    </button>
                  ) : (
                    ""
                  )}
                  {verifyModal ? (
                    <VerifyDeleting
                      verifyDeleting={handleOrderCancelation}
                      setVerifyModal={setVerifyModal}
                      mainText="Are you sure you want to cancel the order?"
                      verifyingText="Yes, I want to cancel the order"
                      cancelingText=" No, I do not want to cancel the order"
                    />
                  ) : null}
                  {
                    <div className="order-aside">
                      <ul>
                        <li>
                          Cart number : <span>№ {order.id}</span>
                        </li>
                        <li>
                          Order date :{" "}
                          <span>{`${order.createdAt
                            .split("T")[0]
                            .split("-")
                            .join(".")} ${
                            order.createdAt.split("T")[1].split(".")[0]
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
                          Secret code : <span>{order.secret_code}</span>
                        </li>
                        <li>Fiscal check : </li>
                      </ul>
                    </div>
                  }
                  {
                    <div className="order-body">
                      {order.carts.map((cart) => {
                        console.log(cart);

                        return (
                          <div className="product" key={cart.id}>
                            <div className="product-start">
                              <img
                                src={
                                  cart.product?.photos.length
                                    ? `${URL_IMAGE}/${cart.product?.photos[0]?.path}`
                                    : noImagePng
                                }
                                alt=""
                              />
                            </div>
                            <div className="product-end">
                              <Link
                                to={`/product/${cart.product.id}`}
                                className="link"
                              >
                                {cart.product.name}
                              </Link>
                              <ul>
                                <li>Price : £{cart.product.price}</li>
                                <li>
                                  Description : {cart.product.description}
                                </li>
                                <li>Count: {cart.count}</li>
                              </ul>
                            </div>
                          </div>
                        );
                      })}
                      <p className={`type ${order.status}`}>{order.status}</p>
                    </div>
                  }
                  {
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
                          <p className="value">£{order.cost}</p>
                        </div>
                      </div>
                    </div>
                  }
                </div>
              );
            })}
          </div>
        ) : (
          <NoProducts />
        )}
      </section>
    </div>
  );
};

export default Orders;
