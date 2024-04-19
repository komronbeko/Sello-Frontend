import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductOne } from "../../features/ProductOneSlice";
import { fetchProductInfos } from "../../features/ProductInfoSlice";
import { fetchCarts } from "../../features/CartSlice";
import { fetchLikes } from "../../features/LikesSlice";
import {
  getAccessTokenFromLocalStorage,
} from "../../utils/storage";
import { API_BASE_URL, URL_IMAGE } from "../../constants/api";
import { dollarToPound } from "../../utils/exchange";
import { addToLike } from "../../utils/add-to-like";
import { addToCart } from "../../utils/add-to-cart";
import { setAuthModalTrue } from "../../features/AuthModalSlice";
import UZImage from "../../assets/uz.svg";
import axios from "axios";

import "./ProductOne.scss";
import { fetchUserOne } from "../../features/UserOneSlice";
import { fetchProductReviews } from "../../features/ReviewsSlice";
import { Rating } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Skeleton, Grid } from "@mui/material";
import http from "../../service/api";
import { fetchReviewOne } from "../../features/ReviewOneSlice";

const ProductOne = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const token = getAccessTokenFromLocalStorage();


  const [tootlip, setTootlip] = useState(0);
  const [modal, setModal] = useState(false);
  const [stars, setStars] = useState(0);
  const [commentary, setCommentary] = useState("");


  const productOne = useSelector((state) => state.productOne.productOne);
  const productInfos = useSelector((state) => state.productInfo.productInfos);
  const userOne = useSelector((state) => state.user.userOne);
  const { reviews, loading, error, review_rate } = useSelector((state) => state.productReview);
  const exactReview = useSelector((state) => state.reviewOne.review);



  function hover(number) {
    setTootlip(number);
  }

  useEffect(() => {
    window.scrollTo(0, 0);

    dispatch(fetchProductOne(id));
    dispatch(fetchProductInfos(id));
    if (token) {
      dispatch(fetchUserOne(token));
      dispatch(fetchProductReviews({ token, product_id: id }));
      dispatch(fetchReviewOne({ token, product_id: id }));
    }

    if (error) {
      toast(error, { type: "error" });
    }
  }, [id, token, error]);


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

  async function purchase(id) {
    if (!token) {
      return dispatch(setAuthModalTrue());
    }
    try {
      await axios.post(
        `${API_BASE_URL}/cart`,
        {
          product_id: id,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(fetchCarts(token));
      navigate(`/profile/${userOne?.id}/carts`);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  }

  async function handlePostingReview(e) {
    e.preventDefault();
    if (stars < 1) {
      return toast("Please, Rate!", { type: "warning" });
    }
    if (exactReview) {
      await http.patch(`${API_BASE_URL}/product-review`, { stars, commentary: commentary, id: exactReview.id })
      toast("Your review updated", { type: "info" });
    } else {
      await http.post(`${API_BASE_URL}/product-review`, { stars, commentary: commentary, product_id: +id })
      toast("Thank you for your review!", { type: "info" });
    }
    dispatch(fetchReviewOne({ token, product_id: id }));
    dispatch(fetchProductReviews({ token, product_id: id }));
    setModal(false);
  }

  return productOne ? (
    <div>
      <section id="product">
        {loading ?
          <div className="product_info_skeleton">
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Skeleton height={60} width={140}/>
                <Skeleton height={30} width={140} style={{marginTop: "-8px"}}/>
              </Grid>
              <Grid item>
                <Skeleton height={50} width={200} variant="rounded"/>
              </Grid>
            </Grid>
            <Grid container justifyContent="center" spacing={4} marginTop={-14}>
              <Grid item xs={8}>
                <Skeleton height={500} />
              </Grid>
              <Grid item xs={4}>
                <Skeleton height={500} />
              </Grid>
            </Grid>
          </div>
          :
          <div className="product_info">
            <div className="product_info_head">
              <div className="start">
                <h2>{productOne?.name}</h2>
                <Rating precision={0.5} readOnly value={review_rate} />
              </div>
              <button onClick={() => handleLiking(productOne?.id)}>
                {userOne?.likes?.some(el => el.product_id == id) ? <p><i className="fa-solid fa-heart"></i> REMOVE LIKED</p> : <p><i className="fa-regular fa-heart"></i> ADD TO LIKED</p>}
              </button>
            </div>
            <div className="product_info_body">
              {/* <Skeleton width="90%" height="100%" style={{ marginTop: "-120px" }} /> */}
              <div className="start">
                <div
                  className="bg"
                  style={{
                    backgroundImage: `url('${URL_IMAGE}/${productOne?.photo}')`,
                  }}
                >
                </div>
                <img src={`${URL_IMAGE}/${productOne?.photo}`} alt="" />
              </div>
              <div className="end">
                <div className="end_header">
                  <h4>Buy product for</h4>
                  <div className="price">
                    <h2>
                      {productOne?.discount?.rate
                        ? dollarToPound(
                          productOne?.price -
                          (productOne?.price * productOne?.discount?.rate) /
                          100
                        )
                        : dollarToPound(productOne?.price)}{" "}
                      pounds
                    </h2>
                    {productOne?.discount?.rate ? (
                      <p className="discount_rate">
                        With discount_rate {productOne?.discount?.rate}%{" "}
                        <del>{dollarToPound(productOne?.price)} pounds</del>
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
                      <p>The cost of delivery in the city is from 5 pounds.</p>
                    </div>
                    <p
                      className={`${tootlip === 1 ? "tootlip-1 hovered" : "tootlip-1"
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
            </div>
          </div>
        }
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
            <div className="reviews-head">
              <h3>Customer reviews of this product</h3>
              {exactReview?.id ? <button onClick={() => { setModal(true), setStars(exactReview.stars), setCommentary(exactReview.commentary) }}>Edit your feedback</button> : <button onClick={() => { setModal(true), setStars(5) }}>Leave feedback +</button>}
            </div>
            {exactReview?.id ? <div className="self-review">
              <div><AccountCircleIcon fontSize="large" style={{ color: 'black' }} /> <span>You</span> </div>
              <Rating name="read-only" value={exactReview.stars} readOnly />
              <p>{exactReview.commentary}</p>
            </div> : null}
            {reviews.length ? <ul className="reviews-list">
              {reviews.map((el) => (
                <li key={el.id}>
                  <div><AccountCircleIcon fontSize="large" style={{ color: 'gray' }} /> <span>{el.user.username}</span> </div>
                  <Rating name="read-only" value={el.stars} readOnly />
                  <p>{el.commentary}</p>
                </li>
              ))}
            </ul> : null}
          </div>
        </div>
      </section>
      <div className={modal ? "modal-review active" : "modal-review"}>
        <form onSubmit={(e) => handlePostingReview(e)}>
          <div className="modal-heading">
            <h3>Leave feedback</h3>
            <button type="button" onClick={() => setModal(false)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <p className="info">You can only change certain information here</p>
          <p className="raiting">
            <i className="fa-solid fa-star"></i>{exactReview?.id ? reviews?.length + 1 : reviews.length}
          </p>
          <div className="modal_body">
            <p>Grade</p>
            <Rating
              name="simple-controlled"
              value={stars}
              onChange={(event, newValue) => {
                setStars(newValue);
              }}
            />
          </div>
          <div className="modal_footer">
            <p>Commentary</p>
            <textarea
              name="commentary"
              value={commentary}
              cols="55"
              rows="5"
              placeholder="Commentary"
              onChange={(e) => setCommentary(e.target.value)}
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