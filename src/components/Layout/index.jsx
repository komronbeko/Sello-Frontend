/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import { Home } from "@mui/icons-material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./index.scss";
import { useState } from "react";
import { setActivePage } from "../../features/FooterMenuStatesSlice.";
import { useNavigate } from "react-router";
import { getAuthAssetsFromLocalStorage } from "../../utils/storage";
import { Badge } from "@mui/material";

const Layout = ({ children }) => {
  const [catalogModal, setCatalogModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authAssets = getAuthAssetsFromLocalStorage();

  const auth = useSelector((state) => state.auth.state);
  const footerMenuState = useSelector((state) => state.footerMenuState.state);
  const userLikes = useSelector((state) => state.like.likes);
  const carts = useSelector((state) => state.cart.carts);

  return (
    <div className="layout">
      {auth ? (
        <Header catalogModal={catalogModal} setCatalogModal={setCatalogModal} />
      ) : (
        ""
      )}
      {children}
      {auth ? <Footer /> : ""}
      <ul className="footer-menu">
        <li
          onClick={() => {
            dispatch(setActivePage("main")), navigate("/");
          }}
        >
          <Home
            style={{ color: footerMenuState == "main" ? "#00b3a8" : "#404141" }}
          />{" "}
          <p>Main</p>
        </li>
        <li>
          <FormatListBulletedIcon
            style={{ color: catalogModal ? "#00b3a8" : "#69716f" }}
            onClick={() => setCatalogModal(!catalogModal)}
          />{" "}
          <p>Catalog</p>
        </li>
        <li
          onClick={() => {
            dispatch(setActivePage("cart")),
              navigate(`/profile/${authAssets?.user_id}/carts`);
          }}
        >
          <Badge badgeContent={carts.length} color="warning">
            <AddShoppingCartIcon
              style={{
                color: footerMenuState == "cart" ? "#00b3a8" : "#69716f",
              }}
            />
          </Badge>
          <p>Cart</p>
        </li>
        <li
          onClick={() => {
            dispatch(setActivePage("favourites")),
              navigate(`/profile/${authAssets?.user_id}/favourites`);
          }}
        >
          <Badge badgeContent={userLikes.length} color="secondary">
            <FavoriteIcon
              style={{
                color: footerMenuState == "favourites" ? "#00b3a8" : "#69716f",
              }}
            />
          </Badge>
          <p>Favourites</p>
        </li>
      </ul>
    </div>
  );
};

export default Layout;
