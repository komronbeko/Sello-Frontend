import "./Header.scss";
import Logo from "../../../../public/logo.svg";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import { Badge } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCatalogs } from "../../../features/CatalogsSlice";
import { setAuthModalTrue } from "../../../features/AuthModalSlice";
import { getAccessTokenFromLocalStorage, getAuthAssetsFromLocalStorage } from "../../../utils/storage";
import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();
  const catalog = useSelector((state) => state.catalog);
  const userLikes = useSelector((state) => state.like.likes);
  const userCarts = useSelector((state) => state.cart.carts);

  const filteredCarts = userCarts.filter(el => el.status === 'unpaid');


  const dispatch = useDispatch();


  function handleAuthModal(directory){
    const token = getAccessTokenFromLocalStorage();
    if(!token) return dispatch(setAuthModalTrue());

    const authAssets = getAuthAssetsFromLocalStorage();

    navigate(`/profile/${authAssets?.user_id}${directory}`)
  }

  useEffect(() => {
    dispatch(fetchCatalogs());
  }, []);
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
            <Badge badgeContent={userLikes ? userLikes.length : 1} color="secondary">
              <FavoriteBorderIcon fontSize="large" color="success" />
            </Badge>
            <p>Favourites</p>
          </div>
          <div onClick={() => handleAuthModal("/carts")}>
            <Badge badgeContent={filteredCarts ? filteredCarts.length : 1} color="warning">
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
