import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ProfileNav from "../../components/ProfileNavbar/ProfileNavbar";
import { getAccessTokenFromLocalStorage } from "../../utils/storage";
import Card from "../../components/Card/Card";
import axios from "axios";
import { API_BASE_URL } from "../../constants/api";
import NoProducts from "../../components/NoProducts/NoProducts";
import VerifyDeleting from "../../components/VerifyDeliting/VerifyDeleting";
import { SkeletonContainer } from "../../components/SkeletonContainer/SkeletonContainer";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Add } from "@mui/icons-material";
import { fetchUserProducts } from "../../features/ProductsSlice";

import "./MyProducts.scss";
import PostModal from "../../components/PostModal/PostModal";

const MyProducts = () => {
  // Call Redux states
  const { userProducts, loading } = useSelector((state) => state.product);

  const { user_id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = getAccessTokenFromLocalStorage();

  // state to handle verification of user products delete
  const [verifyClearing, setVerifyClearing] = useState(false);

  // state to handle modal for posting products
  const [postModal, setPostModal] = useState(false);

  // Handle deleting all user products
  async function clearUserProducts() {
    try {
      await axios.delete(`${API_BASE_URL}/product/delete/user-products`, {
        headers: { Authorization: "Bearer " + token },
      });
      toast("Products cleared.", { type: "info" });
      dispatch(fetchUserProducts(token));
      setVerifyClearing(false);
    } catch (error) {
      toast(error.message, { type: "error" });
      setVerifyClearing(false);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!token) navigate("/");

    dispatch(fetchUserProducts(token));
  }, [token]);

  return (
    <div id="myproducts">
      {verifyClearing ? (
        <VerifyDeleting
          verifyDeleting={clearUserProducts}
          setVerifyModal={setVerifyClearing}
          mainText="Are you sure you want to clear your products?"
          verifyingText="Yes, I want to clear my products"
          cancelingText=" No, I do not want to clear my products"
          darkBg={true}
        />
      ) : null}
      {postModal ? (
        <PostModal setPostModal={setPostModal} token={token} />
      ) : null}
      <ProfileNav activePage={"My Products"} user_id={user_id} />
      <section id="myproducts-data">
        <div className="data-head">
          <h3>My Products</h3>
          <div className="actions">
            {userProducts.length ? (
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => setVerifyClearing(true)}
              >
                ALl
              </Button>
            ) : null}
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setPostModal(true)}
            >
              Add
            </Button>
          </div>
        </div>
        {loading ? (
          <SkeletonContainer />
        ) : userProducts.length ? (
          <div className="data-body">
            {userProducts.map((el) => (
              <Card
                key={el.id}
                image={el.photos[0]?.path}
                discount={el.discount?.rate}
                id={el.id}
                price={el.price}
                title={el.name}
                is_verified={el.is_verified}
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

export default MyProducts;
