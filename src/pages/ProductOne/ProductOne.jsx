/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card/Card";
import { fetchProductOne } from "../../features/ProductOneSlice";
import http from "../../service/api";
import { fetchProductInfos } from "../../features/ProductInfoSlice";
import { fetchCarts } from "../../features/CartSlice";
import { fetchLikes } from "../../features/LikesSlice";
import {
  getAccessTokenFromLocalStorage,
  getAuthAssetsFromLocalStorage,
} from "../../utils/storage";
import { URL_IMAGE } from "../../constants/api";
import { dollarToSom } from "../../utils/exchange";
import { addToLike } from "../../utils/add-to-like";
import { addToCart } from "../../utils/add-to-cart";
import { setAuthModalTrue } from "../../features/AuthModalSlice";
import UZImage from "../../assets/uz.svg";

import "./ProductOne.scss";

const ProductOne = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const authAssets = getAuthAssetsFromLocalStorage();

  const token = getAccessTokenFromLocalStorage();

  const [tootlip, setTootlip] = useState(0);
  const [rec, setRec] = useState([]);
  const [modal, setModal] = useState(false);
  const [starsActive, setStars] = useState({
    star1: false,
    star2: false,
    star3: false,
    star4: false,
    star5: false,
  });
  const [starCount, setStarCount] = useState(0);

  const productOne = useSelector((state) => state.productOne.productOne);
  const productInfos = useSelector((state) => state.productInfo.productInfos);

  function hover(number) {
    setTootlip(number);
  }

  useEffect(() => {
    dispatch(fetchProductOne(id));
    dispatch(fetchProductInfos(id));

    //   const { data: recomendation } = await http.get(
    //     `/products?category=${productOne.category?.name}`
    //   );
    //   const rec = recomendation.filter((p) => p.id !== productOne.id).slice(0, 12);
    //   setRec(rec);
  }, [id, dispatch, token]);

  async function handleAddingToCart(id) {
    if (!authAssets?.user_id) {
      return dispatch(setAuthModalTrue());
    }
    await addToCart(id, token);
    dispatch(fetchCarts(token));
  }

  async function handleLiking(id) {
    if (!authAssets?.user_id) {
      return dispatch(setAuthModalTrue());
    }
    await addToLike(id, token);
    dispatch(fetchLikes(token));
  }

  async function purchase(id) {
    if (!authAssets?.user_id) {
      return dispatch(setAuthModalTrue());
    }
    try {
      await http.post("/cart", {
        product_id: id,
        user_id: +authAssets?.user_id,
      });
      dispatch(fetchCarts(token));
      navigate(`/profile/${authAssets?.user_id}/carts`);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  }

  return productOne ? (
    <div>
      <section id="product">
        <div className="product_info">
          <div className="product_info_head">
            <div className="start">
              <h2>{productOne?.title}</h2>
              <p>
                <i className="fa-solid fa-star"></i>{" "}
                {productOne?.review?.length} Rating
              </p>
            </div>
            <button onClick={() => handleLiking(productOne?.id)}>
              <i className="fa-regular fa-heart"></i> ADD TO LIKED
            </button>
          </div>
          <div className="product_info_body">
            <div className="start">
              <div
                className="bg"
                style={{
                  backgroundImage: `url('${URL_IMAGE}/${productOne?.photo}')`,
                }}
              ></div>
              <img src={`${URL_IMAGE}/${productOne?.photo}`} alt="" />
            </div>
            <div className="end">
              <div className="end_header">
                <h4>Buy product for</h4>
                <div className="price">
                  <h2>
                    {productOne?.discount?.rate
                      ? dollarToSom(
                          productOne?.price -
                            (productOne?.price * productOne?.discount?.rate) /
                              100
                        )
                      : dollarToSom(productOne?.price)}{" "}
                    som
                  </h2>
                  {productOne?.discount?.rate ? (
                    <p className="discount_rate">
                      With discount_rate {productOne?.discount?.rate}%{" "}
                      <del>{dollarToSom(productOne?.price)} som</del>
                    </p>
                  ) : null}
                </div>
                <p>Brand: {productOne?.brand?.name}</p>
                <div className="btns">
                  <button
                    className="add-to-cart"
                    onClick={() => handleAddingToCart(productOne?.id)}
                  >
                    ADD TO CART
                  </button>
                  <button
                    className="purchase"
                    onClick={() => purchase(productOne?.id)}
                  >
                    PURCHASE
                  </button>
                </div>
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
                    className={`${
                      tootlip === 1 ? "tootlip-1 hovered" : "tootlip-1"
                    }`}
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
                      className={`${
                        tootlip === 2 ? "tootlip-2 hovered" : "tootlip-2"
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
          </div>
        </div>
        <br />
        <hr />
        <div className="product_characteristics">
          <h3>Characteristics</h3>
          <ul className="characteristics">
            <h2>Main characteristics</h2>
            {productInfos?.map((el) => {
              return (
                <li key={el.id}>
                  <span className="key">{el.key}</span>{" "}
                  <span className="value">{el.value}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="product_description">
          <h3>Description</h3>
          <div className="description">
            <h2>{productOne?.description}</h2>
            <p>{productOne?.description}</p>
          </div>
        </div>
        <div className="product_reviews">
          <h3>Reviews</h3>
          <div className="reviews">
            <h3>Customer reviews of this product</h3>
            <button onClick={() => setModal(true)}>Leave feedback +</button>
          </div>
        </div>
        <div className="recomendation">
          <h3>Recomendation</h3>
          <div className="cards">
            {rec?.map((p) => {
              return (
                <Card
                  key={p.id}
                  image={p.photo}
                  title={p.title}
                  price={p.price}
                  id={p.id}
                  discount_rate={p.discount?.rate}
                />
              );
            })}
          </div>
        </div>
      </section>
      <div className={modal ? "modal-review active" : "modal-review"}>
        <form>
          <div className="modal-heading">
            <h3>Leave feedback</h3>
            <button type="button" onClick={() => setModal(false)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <p className="info">You can only change certain information here</p>
          <p className="raiting">
            <i className="fa-solid fa-star"></i>0 Raiting
          </p>
          <div className="modal_aside">
            <p>Photo</p>
            <div className="input">
              <input type="file" name="" id="file" hidden />
              <label htmlFor="file">
                <i className="fa-solid fa-image"></i>
              </label>
            </div>
          </div>
          <div className="modal_body">
            <p>Grade</p>
            <div className="stars">
              <i
                className={`fa-${
                  starsActive.star1 ? "solid" : "regular"
                } fa-star`}
                onClick={() =>
                  (function () {
                    setStars({ ...starsActive, star1: !starsActive.star1 });
                    setStarCount(
                      starsActive.star2 ? starCount - 1 : starCount + 1
                    );
                  })()
                }
              ></i>
              <i
                className={`fa-${
                  starsActive.star2 ? "solid" : "regular"
                } fa-star`}
                onClick={() =>
                  (function () {
                    setStars({ ...starsActive, star2: !starsActive.star2 });
                    setStarCount(
                      starsActive.star2 ? starCount - 1 : starCount + 1
                    );
                  })()
                }
              ></i>
              <i
                className={`fa-${
                  starsActive.star3 ? "solid" : "regular"
                } fa-star`}
                onClick={() =>
                  (function () {
                    setStars({ ...starsActive, star3: !starsActive.star3 });
                    setStarCount(
                      starsActive.star3 ? starCount - 1 : starCount + 1
                    );
                  })()
                }
              ></i>
              <i
                className={`fa-${
                  starsActive.star4 ? "solid" : "regular"
                } fa-star`}
                onClick={() =>
                  (function () {
                    setStars({ ...starsActive, star4: !starsActive.star4 });
                    setStarCount(
                      starsActive.star4 ? starCount - 1 : starCount + 1
                    );
                  })()
                }
              ></i>
              <i
                className={`fa-${
                  starsActive.star5 ? "solid" : "regular"
                } fa-star`}
                onClick={() =>
                  (function () {
                    setStars({ ...starsActive, star5: !starsActive.star5 });
                    setStarCount(
                      starsActive.star5 ? starCount - 1 : starCount + 1
                    );
                  })()
                }
              ></i>
            </div>
          </div>
          <div className="modal_footer">
            <p>Commentary</p>
            <textarea
              name=""
              id=""
              cols="55"
              rows="5"
              placeholder="Commentary"
            ></textarea>
            <div className="btns">
              <button
                type="button"
                onClick={() => setModal(false)}
                className="cancle"
              >
                Cancel
              </button>
              <button className="send">Send</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <div
      style={{
        height: "35vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          marginTop: "40px",
        }}
      >
        Product not found..
      </h1>
    </div>
  );
};

export default ProductOne;
