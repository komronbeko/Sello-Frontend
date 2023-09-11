import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import { Badge } from "@mui/material";
import Logo from "../../../assets/logo.svg";
import { fetchCatalogs } from "../../../features/CatalogsSlice";
import { setAuthModalTrue } from "../../../features/AuthModalSlice";
import {
  getAccessTokenFromLocalStorage,
  getAuthAssetsFromLocalStorage,
} from "../../../utils/storage";
import { fetchCarts } from "../../../features/CartSlice";
import { fetchLikes } from "../../../features/LikesSlice";

import "./Header.scss";

const Header = () => {
  const navigate = useNavigate();
  const catalog = useSelector((state) => state.catalog);
  const userLikes = useSelector((state) => state.like.likes);
  const carts = useSelector((state) => state.cart.carts);


  const token = getAccessTokenFromLocalStorage();

  const dispatch = useDispatch();

  function handleAuthModal(directory) {
    if (!token) return dispatch(setAuthModalTrue());

    const authAssets = getAuthAssetsFromLocalStorage();

    navigate(`/profile/${authAssets?.user_id}${directory}`);
  }

  useEffect(() => {
    if (token) {
      dispatch(fetchCatalogs(token));
      dispatch(fetchCarts(token));
      dispatch(fetchLikes(token));
    }
  }, [dispatch, token]);

  return (
    <div className="header">
      <div className="header__main">
        <div onClick={() => navigate("/")}>
          <img src={Logo} alt="header-logo" />
        </div>
        <div>
          <div>
            <FormatListBulletedIcon color="success" />
            <p>Catalog</p>
          </div>
          <div>
            <input type="text" placeholder="Search Products" />
            <button>
              <ManageSearchIcon fontSize="large" color="success" />
            </button>
          </div>
        </div>
        <div>
          <div onClick={() => handleAuthModal("/favourites")}>
            <Badge
              badgeContent={userLikes ? userLikes.length : 1}
              color="secondary"
            >
              <FavoriteBorderIcon fontSize="large" color="success" />
            </Badge>
            <p>Favourites</p>
          </div>
          <div onClick={() => handleAuthModal("/carts")}>
            <Badge
              badgeContent={carts ? carts.length : 1}
              color="warning"
            >
              <AddShoppingCartIcon fontSize="large" color="success" />
            </Badge>
            <p>Cart</p>
          </div>
          <div onClick={() => handleAuthModal("/")}>
            <PersonOutlineIcon color="success" fontSize="large" />
            <p>Profile</p>
          </div>
        </div>
      </div>
      <p className="header__line" />
      <div className="header__navbar">
        <ul>
          <li>🔥Discounts</li>
          {catalog.catalogs
            ? catalog.catalogs.map((el) => <li key={el.id}>{el.name}</li>)
            : ""}
          <li>Brands</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
