/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./ProductOne.scss";
import UZImage from "../../../public/uz.svg";
import Card from "../../components/Card/Card";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductOne } from "../../features/ProductOneSlice";
import http from "../../service/api";
import { fetchProductInfos } from "../../features/ProductInfoSlice";
import { fetchCarts } from "../../features/CartSlice";
import { fetchLikes } from "../../features/LikesSlice";
import { getAuthAssetsFromLocalStorage } from "../../utils/storage";


const ProductOne = () => {
  const { id } = useParams();
  const [tootlip, setTootlip] = useState(0);
  const [rec, setRec] = useState([]);
  const [starsActive, setStars] = useState({
    star1: false,
    star2: false,
    star3: false,
    star4: false,
    star5: false,
  });
  const [starCount, setStarCount] = useState(0);
  const dispatch = useDispatch();
  const productOne = useSelector((state) => state.productOne.productOne);
  const productInfos = useSelector((state) => state.productInfo.productInfos);

  const authAssets = getAuthAssetsFromLocalStorage();


  function hover(number) {
    setTootlip(number);
  }

  function $toSom(number) {
    const exchangeRate = 12000;
    const sum = number * exchangeRate;
    return sum.toLocaleString();
  }
  const [modal, setModal] = useState(false);

  useEffect(() => {
    dispatch(fetchProductOne(id));
    dispatch(fetchCarts());
    (async function () {
      window.scrollTo({
        top: 1,
        behavior: "smooth",
      });

      dispatch(fetchProductInfos(id));
    //   const { data: recomendation } = await http.get(
    //     `/products?category=${productOne.category?.name}`
    //   );
    //   const rec = recomendation.filter((p) => p.id !== productOne.id).slice(0, 12);
    //   setRec(rec);
    })();

  }, [id]);
  async function addToCart(id) {
    try {
      await http.post("/cart", {
        product_id: id,
        user_id: authAssets.user_id,
      });
      dispatch(fetchCarts());
    } catch (error) {
      toast(error.message, { type: "error" });
    }
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

  const navigate = useNavigate();

  async function purchase(id) {
     try {
      await http.post("/cart", {
        product_id: id,
        user_id: authAssets.user_id,
      });
      dispatch(fetchCarts());
      navigate(`/profile/${authAssets.user_id}/carts`)
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
                <i className="fa-solid fa-star"></i> {productOne?.review?.length}{" "}
                Rating
              </p>
            </div>
            <button onClick={() => addToLike(productOne?.id)}>
              <i className="fa-regular fa-heart"></i> ADD TO LIKED
            </button>
          </div>
          <div className="product_info_body">
            <div className="start">
              <div
                className="bg"
                style={{
                  backgroundImage: `url('http://localhost:3000/uploads/${productOne?.photo}')`,
                }}
              ></div>
              <img src={`http://localhost:3000/uploads/${productOne?.photo}`} alt="" />
            </div>
            <div className="end">
              <div className="end_header">
                <h4>Buy product for</h4>
                <div className="price">
                  <h2>
                    {productOne?.discount_rate
                      ? $toSom(
                          productOne?.price -
                            (productOne?.price * productOne?.discount_rate) / 100
                        )
                      : $toSom(productOne?.price)}{" "}
                    som
                  </h2>
                  {productOne?.discount_rate ? (
                    <p className="discount_rate">
                      With discount_rate {productOne?.discount_rate}%{" "}
                      <del>{$toSom(productOne?.price)} som</del>
                    </p>
                  ) : null}
                </div>
                <p>Brand: {productOne?.brand?.name}</p>
                <div className="btns">
                  <button
                    className="add-to-cart"
                    onClick={() => addToCart(productOne?.id)}
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
                  discount_rate={p.discount_rate}
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
                Cancle
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
