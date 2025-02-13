import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ProfileNav from "../../components/ProfileNavbar/ProfileNavbar";
import { getAccessTokenFromLocalStorage } from "../../utils/storage";
import Card from "../../components/Card/Card";
import { fetchLikes } from "../../features/LikesSlice";

import "./Favourites.scss";
import axios from "axios";
import { API_BASE_URL } from "../../constants/api";
import NoProducts from "../../components/NoProducts/NoProducts";
import VerifyDeleting from "../../components/VerifyDeliting/VerifyDeleting";
import { SkeletonContainer } from "../../components/SkeletonContainer/SkeletonContainer";

const Likes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [verifyClearing, setVerifyClearing] = useState(false);

  const { user_id } = useParams();

  const token = getAccessTokenFromLocalStorage();

  const { likes, loading } = useSelector((state) => state.like);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!token) navigate("/");

    window.scrollTo(0, 0);

    dispatch(fetchLikes(token));
  }, [token]);

  async function clearLikes() {
    try {
      await axios.delete(`${API_BASE_URL}/like/all`, {
        headers: { Authorization: "Bearer " + token },
      });
      toast("Favourites cleared.", { type: "info" });
      dispatch(fetchLikes(token));
      setVerifyClearing(false);
    } catch (error) {
      toast(error.message, { type: "error" });
      setVerifyClearing(false);
    }
  }

  return (
    <div id="liked">
      {verifyClearing ? (
        <VerifyDeleting
          verifyDeleting={clearLikes}
          setVerifyModal={setVerifyClearing}
          mainText="Are you sure you want to clear your likes?"
          verifyingText="Yes, I want to clear my likes"
          cancelingText=" No, I do not want to clear my likes"
          darkBg={true}
        />
      ) : null}
      <ProfileNav activePage={"Favorites"} user_id={user_id} />
      <section id="liked-data">
        <div className="data-head">
          <h3>Favourites</h3>
          {likes?.length ? (
            <button onClick={() => setVerifyClearing(true)}>
              <i className="fa-solid fa-xmark"></i> Clear all
            </button>
          ) : null}
        </div>
        {loading ? (
          <SkeletonContainer />
        ) : likes?.length ? (
          <div className="data-body">
            {likes.map((el) => (
              <Card
                key={el.product.id}
                image={el.product?.photos[0]?.path}
                discount={el.product.discount?.rate}
                id={el.product.id}
                price={el.product.price}
                title={el.product.name}
              />
            ))}
          </div>
        ) : (
          <NoProducts />
        )}
      </section>
    </div>
  );
};

export default Likes;
