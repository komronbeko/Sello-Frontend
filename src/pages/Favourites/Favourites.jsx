import { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProfileNav from "../../components/ProfileNavbar/ProfileNavbar";
import Empty from "../../assets/empty_orders.png";
import { getAccessTokenFromLocalStorage } from "../../utils/storage";
import Card from "../../components/Card/Card";
import http from "../../service/api";
import { fetchLikes } from "../../features/LikesSlice";

import "./Favourites.scss";

const Likes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user_id } = useParams();

  const token = getAccessTokenFromLocalStorage();

  const userLikes = useSelector((state) => state.like.likes);

  useEffect(() => {
    if (!token) navigate("/");
    dispatch(fetchLikes());
  }, [dispatch, navigate, token]);

  async function clearLikes() {
    await http.delete(`/like/all/${user_id}`);
    toast("Cart cleared.", { type: "info" });
    dispatch(fetchLikes());
  }

  return (
    <div id="liked">
      <ProfileNav activePage={"Favorites"} />
      <section id="data">
        <div className="data-head">
          <h3>Favorites</h3>
          {userLikes?.length ? (
            <button onClick={() => clearLikes()}>
              <i className="fa-solid fa-xmark"></i> Clear all
            </button>
          ) : null}
        </div>
        {userLikes ? (
          userLikes?.length ? (
            <div className="data-body">
              {userLikes.length
                ? userLikes.map((el) => (
                    <Card
                      key={el.product.id}
                      image={el.product.photo}
                      discount={el.product.discount?.rate}
                      id={el.product.id}
                      price={el.product.price}
                      title={el.product.name}
                    />
                  ))
                : ""}
            </div>
          ) : (
            <div className="no-products">
              <div className="start">
                <p className="no-products-text">
                  Sorry, there are no favorite products here yet.
                </p>
                <Link to="/" className="link">
                  Start shopping
                </Link>
              </div>
              <img src={Empty} alt="" />
            </div>
          )
        ) : (
          ""
        )}
      </section>
    </div>
  );
};

export default Likes;
