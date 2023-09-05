/* eslint-disable no-unused-vars */
import {useEffect, useState } from "react";
import "./Orders.scss";
import Empty from "../../../public/empty_orders.png";
import { Link, useParams } from "react-router-dom";
import ProfileNav from "../../components/ProfileNavbar/ProfileNavbar";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { URL_IMAGE } from "../../constants/api";
import { fetchOrders } from "../../features/OrdersSlice";
import { dollarToSom } from "../../utils/exchange";

const Orders = () => {
  const orders = useSelector((state) => state.order.orders);
  const user = useSelector((state) => state.user.userOne);
  
  const {user_id} = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [])

  const [selected, setSelected] = useState(null);

  async function Cancel(id) {
    try {
      toast("Order canceled", { type: "info" });
    } catch (error) {
      toast(error.response.data.message, { type: "error" });
    }
  }

  return user?.is_verified ? (
    <div id="purchase">
      <ProfileNav activePage={"My orders"} user_id={user_id}/>
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
                  <div className="order-head">
                    <button
                      className="bar"
                      onClick={() => {
                        selected === o.id
                          ? setSelected(null)
                          : setSelected(o.id);
                      }}
                    >
                      <i className="fa-solid fa-bars"></i>
                    </button>
                    {selected === o.id ? (
                      <ul className="bars active">
                        {!o.canceled && o.status === "waiting" ? (
                          <li>
                            <button onClick={() => Cancel(o.id)}>
                              <i className="fa-solid fa-ban"></i> Cancel
                            </button>
                          </li>
                        ) : null}
                      </ul>
                    ) : (
                      <ul className="bars">
                        {!o.canceled && o.status === "waiting" ? (
                          <li>
                            <button>
                              <i className="fa-solid fa-ban"></i> Cancel
                            </button>
                          </li>
                        ) : null}
                      </ul>
                    )}
                  </div>
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
                          .join(".")} ${
                          o.createdAt.split("T")[1].split(".")[0]
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
                              src={`${URL_IMAGE}/uploads/${p.product.photo}`}
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
                              <li>Price : {dollarToSom(p.product.price)} som</li>
                              <li>Description : {p.product.description}</li>
                              <li>Count: {p.count}</li>
                            </ul>
                          </div>
                        </div>
                      );
                    })}
                    {o.canceled ? (
                      <p className="type">Canceled</p>
                    ) : o.status === "waiting" ? (
                      <p className="type waiting">Waiting</p>
                    ) : o.status === "process" ? (
                      <p className="type process">Process</p>
                    ) : o.status === "delivered" ? (
                      <p className="type delivered">Delivered</p>
                    ) : (
                      <p className="type delivered">{o.status}</p>
                    )}
                  </div>
                  <div className="order-footer">
                    <h4>About delivery</h4>
                    <div className="about">
                      <div className="table">
                        <p className="key">Address : </p>
                        <p className="value">
                          {`${loc.city}, ${loc.district}, ${loc.evenue}, ${loc.street}`}
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
        ) : (
          <div className="no-products">
            <div className="start">
              <p className="no-products-text">
                Delivery is carried out by the Sello Logistics service.
              </p>
              <Link to="/" className="link">
                Start shopping
              </Link>
            </div>
            <img src={Empty} alt="" />
          </div>
        )}
      </section>
    </div>
  ) : null;
};

export default Orders;
