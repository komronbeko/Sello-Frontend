import { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProfileNav from "../../components/ProfileNavbar/ProfileNavbar";
import Empty from "../../assets/empty_orders.png";
import { getAccessTokenFromLocalStorage } from "../../utils/storage";
import Card from "../../components/Card/Card";
import { fetchLikes } from "../../features/LikesSlice";

import "./Favourites.scss";
import axios from "axios";
import { API_BASE_URL } from "../../constants/api";

const Likes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user_id } = useParams();

  const token = getAccessTokenFromLocalStorage();

  const userLikes = useSelector((state) => state.like.likes);

  useEffect(() => {
    if (!token) navigate("/");

    dispatch(fetchLikes(token));
  }, [dispatch, navigate, token]);

  async function clearLikes() {
    await axios.delete(`${API_BASE_URL}/like/all`, {headers: { Authorization: 'Bearer ' + token}});
    toast("Favourites cleared.", { type: "info" });
    dispatch(fetchLikes(token));
  }

  return (
    <div id="liked">
      <ProfileNav activePage={"Favorites"} user_id={user_id} />
      <section id="data">
        <div className="data-head">
          <h3>Favorites</h3>
          {userLikes?.length ? (
            <button onClick={() => clearLikes()}>
              <i className="fa-solid fa-xmark"></i> Clear all
            </button>
          ) : null}
        </div>
        {userLikes?.length ? (
          <div className="data-body">
            {userLikes.map((el) => (
              <Card
                key={el.product.id}
                image={el.product.photo}
                discount={el.product.discount?.rate}
                id={el.product.id}
                price={el.product.price}
                title={el.product.name}
              />
            ))}
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
        )}
      </section>
    </div>
  );
};

export default Likes;
