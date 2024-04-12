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
import { Grid, Skeleton } from "@mui/material";


const Likes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [verifyClearing, setVerifyClearing] = useState(false);

  const { user_id } = useParams();

  const token = getAccessTokenFromLocalStorage();

  const { likes, loading, error } = useSelector((state) => state.like);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!token) navigate("/");

    if (error) {
      toast(error, { type: "error" });
    }

    window.scrollTo(0, 0);

    dispatch(fetchLikes(token));
  }, [token, error]);

  async function clearLikes() {
    try {
      await axios.delete(`${API_BASE_URL}/like/all`, { headers: { Authorization: 'Bearer ' + token } });
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
      {verifyClearing ? <VerifyDeleting verifyDeleting={clearLikes} setVerifyModal={setVerifyClearing} mainText="Are you sure you want to clear your likes?" verifyingText="Yes, I want to clear my likes" cancelingText=" No, I do not want to clear my likes" darkBg={true} /> : null}
      <ProfileNav activePage={"Favorites"} user_id={user_id} />
      <section id="data">
        <div className="data-head">
          <h3>Favorites</h3>
          {likes?.length ?
            <button onClick={() => setVerifyClearing(true)}>
              <i className="fa-solid fa-xmark"></i> Clear all
            </button>
            : null}
        </div>
        {loading ?
          <Grid container columnSpacing={2} rowSpacing={3} columns={4} justifyContent="center">
            {
              [1, 2, 3, 4, 5, 6, 7, 8].map(el => (
                <Grid item key={el}>
                  <Skeleton variant="rounded" width={215} height={180} />
                  <Skeleton width="60%" sx={{ marginTop: "20px" }} />
                  <Skeleton sx={{ margin: "10px 0" }} height={40} />
                </Grid>
              ))
            }
          </Grid> : likes?.length ? (
            <div className="data-body">
              {likes.map((el) => (
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
            <NoProducts />
          )}
      </section>
    </div>
  );
};

export default Likes;
