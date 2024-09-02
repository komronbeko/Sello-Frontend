/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import { Home } from "@mui/icons-material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./index.scss";
import { useState } from "react";

const Layout = ({ children }) => {
  const [catalogModal, setCatalogModal] = useState(false);

  const auth = useSelector((state) => state.auth.state);
  const footerMenuState = useSelector((state) => state.footerMenuState.state);

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
        <li>
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
        <li>
          <AddShoppingCartIcon
            style={{ color: footerMenuState == "cart" ? "#00b3a8" : "#69716f" }}
          />{" "}
          <p>Cart</p>
        </li>
        <li>
          <FavoriteIcon
            style={{
              color: footerMenuState == "favourites" ? "#00b3a8" : "#69716f",
            }}
          />{" "}
          <p>Favourites</p>
        </li>
      </ul>
    </div>
  );
};

export default Layout;
