/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import MenuIcon from "@mui/icons-material/Menu";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import ClearIcon from "@mui/icons-material/Clear";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import PhoneIcon from "@mui/icons-material/Phone";
import Logo from "../../assets/logo.svg";
import { fetchCatalogs } from "../../features/CatalogsSlice";
import { setAuthModalTrue } from "../../features/AuthModalSlice";
import {
  getAccessTokenFromLocalStorage,
  getAuthAssetsFromLocalStorage,
} from "../../utils/storage";
import { fetchCarts } from "../../features/CartSlice";
import { fetchLikes } from "../../features/LikesSlice";
import "./Header.scss";
import Catalog from "../../components/Catalog/Catalog";
import { searchProducts } from "../../features/SearchSlice";
import { debounce } from "lodash";
import { Link } from "react-scroll";
import { toast } from "react-toastify";
import sliceWords from "../../utils/slice-words";
import { SearchResults } from "../../components/SearchResults/SearchResults";
import { Favorite, Feedback, ShoppingCart } from "@mui/icons-material";

const Header = ({ catalogModal, setCatalogModal }) => {
  const [loading, setLoading] = useState(false);
  const [headerNavbar, setHeaderNavbar] = useState(false);
  const searchInputRef = useRef(null);
  const catalog = useSelector((state) => state.catalog.catalogs);
  const userLikes = useSelector((state) => state.like.likes);
  const carts = useSelector((state) => state.cart.carts);
  const { data: searchedProducts, error } = useSelector(
    (state) => state.searchProducts
  );

  const token = getAccessTokenFromLocalStorage();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCatalogs());
    if (token) {
      dispatch(fetchCarts(token));
      dispatch(fetchLikes(token));
    }

    if (error) {
      toast(error, { type: "error" });
    }
  }, [dispatch, token, error]);

  function handleAuthModal(directory) {
    if (!token) return dispatch(setAuthModalTrue());
    const authAssets = getAuthAssetsFromLocalStorage();
    navigate(`/profile/${authAssets?.user_id}${directory}`);
    setHeaderNavbar(false);
  }

  const debounceSearching = debounce((searchQuery) => {
    if (searchQuery) {
      dispatch(searchProducts(searchQuery));
    } else {
      clearSearchInput();
    }
    setLoading(false);
  }, 500);

  function handleSearching(value) {
    debounceSearching(value);
    setLoading(true);
  }

  function clearSearchInput() {
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
      dispatch(searchProducts(null));
    }
  }

  function handleSearchRouting(id) {
    navigate(`/product/${id}`);
    searchInputRef.current.value = "";
    dispatch(searchProducts(null));
  }

  return (
    <div className="header">
      {headerNavbar ? (
        <div className="header-nav-modal">
          <div className="navbar-heading">
            <p>Menu</p>
            <div>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Flag_of_Uzbekistan.png/1200px-Flag_of_Uzbekistan.png"
                alt="Uzb-flag"
              />{" "}
              <SwapHorizIcon fontSize="large" style={{ color: "#00b3a8" }} />{" "}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/42/Flag_of_the_United_Kingdom.png"
                alt="UK-flag"
              />
            </div>
            <CloseIcon
              fontSize="large"
              style={{
                fontWeight: "bold",
                color: "#00b3a8",
                cursor: "pointer",
              }}
              onClick={() => setHeaderNavbar(false)}
            />
          </div>
          {!token ? (
            <button
              onClick={() => dispatch(setAuthModalTrue())}
              className="navbar-login-btn"
            >
              Login
            </button>
          ) : (
            ""
          )}
          <div className="navbar-main">
            <div className="navbar-main-top">
              <p>Navigation Bar</p>
            </div>
            <ul className="navbar-main-links">
              <li onClick={() => handleAuthModal("/")}>
                <div>
                  <PersonOutlineIcon style={{ color: "gray" }} />{" "}
                  <span>Profile</span>
                </div>
                <NavigateNextIcon style={{ color: "#00b3a8" }} />
              </li>
              <li onClick={() => handleAuthModal("/myproducts")}>
                <div>
                  <AddShoppingCartIcon style={{ color: "gray" }} />{" "}
                  <span>My Products</span>
                </div>
                <NavigateNextIcon style={{ color: "#00b3a8" }} />{" "}
              </li>
              <li onClick={() => handleAuthModal("/orders")}>
                <div>
                  <PlaylistAddCheckIcon style={{ color: "gray" }} />{" "}
                  <span>My Orders</span>
                </div>
                <NavigateNextIcon style={{ color: "#00b3a8" }} />{" "}
              </li>
              <li onClick={() => handleAuthModal("/favourites")}>
                <div>
                  <Favorite style={{ color: "gray" }} /> <span>Favourites</span>
                </div>
                <NavigateNextIcon style={{ color: "#00b3a8" }} />
              </li>
              <li onClick={() => handleAuthModal("/carts")}>
                <div>
                  <ShoppingCart style={{ color: "gray" }} /> <span>Cart</span>
                </div>
                <NavigateNextIcon style={{ color: "#00b3a8" }} />
              </li>
              <li onClick={() => handleAuthModal("/feedback")}>
                <div>
                  <Feedback style={{ color: "gray" }} />{" "}
                  <span>My Feedbacks</span>
                </div>
                <NavigateNextIcon style={{ color: "#00b3a8" }} />
              </li>
            </ul>
          </div>
          <div className="navbar-contact">
            <b>To Improve Our Servive</b>
            <a href="tel:+447769199362">
              <PhoneIcon style={{ color: "#00b3a8" }} /> <span>24/7 help</span>{" "}
            </a>
          </div>
        </div>
      ) : null}

      <div className="header__main">
        <div className="header-bar">
          <MenuIcon
            fontSize="large"
            style={{ color: "#00b3a8" }}
            onClick={() => setHeaderNavbar(true)}
          />
        </div>

        <div onClick={() => navigate("/")} className="header-logo">
          <img src={Logo} alt="header-logo" />
        </div>
        <div className="header-catalog-search">
          <div
            onClick={() => setCatalogModal((prev) => !prev)}
            className="header-catalog"
          >
            {catalogModal ? (
              <ClearIcon
                fontSize="small"
                style={{ color: "#089d93" }}
                onClick={clearSearchInput}
              />
            ) : (
              <FormatListBulletedIcon
                fontSize="small"
                style={{ color: "#089d93" }}
              />
            )}
            <p className="catalogbtn-text">Catalog</p>
          </div>
          <div className="header-search">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="search-input">
                <input
                  ref={searchInputRef}
                  onChange={(e) => handleSearching(e.target.value)}
                  type="text"
                  name="searchInput"
                  placeholder="Search Products"
                />
                {searchInputRef.current?.value ? (
                  <CloseIcon
                    fontSize="small"
                    style={{
                      fontWeight: "bold",
                      color: "#101081",
                      cursor: "pointer",
                    }}
                    onClick={clearSearchInput}
                  />
                ) : null}
              </div>
              <button>
                <SearchIcon
                  fontSize="large"
                  style={{
                    color: "#ffffff",
                    backgroundColor: "#0a867d",
                    padding: "5px",
                  }}
                />
              </button>
            </form>
            <SearchResults
              searchedProducts={searchedProducts}
              loading={loading}
              handleSearchRouting={handleSearchRouting}
              searchInputRef={searchInputRef}
            />
          </div>
        </div>
        <div className="header-menu">
          <div onClick={() => handleAuthModal("/favourites")}>
            <Badge
              badgeContent={userLikes ? userLikes.length : 1}
              color="secondary"
            >
              <FavoriteIcon style={{ color: "#00b3a8" }} />
            </Badge>
            <p>Favourites</p>
          </div>
          <div onClick={() => handleAuthModal("/carts")}>
            <Badge badgeContent={carts ? carts.length : 1} color="warning">
              <AddShoppingCartIcon style={{ color: "#00b3a8" }} />
            </Badge>
            <p>Cart</p>
          </div>
          <div onClick={() => handleAuthModal("/")}>
            <PersonOutlineIcon style={{ color: "#00b3a8" }} />
            <p>Profile</p>
          </div>
        </div>
      </div>
      <p className="header__line" />
      {catalogModal ? (
        <Catalog setCatalogModal={setCatalogModal} catalogs={catalog} />
      ) : (
        ""
      )}
      <div className="header__navbar">
        <ul>
          <li>
            <Link
              activeClass="active"
              to="discounts"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              🔥Discounts
            </Link>
          </li>
          {catalog.map((el) => (
            <li key={el.id} onClick={() => navigate(`/catalog/${el.name}`)}>
              {el.name.includes(",") ? sliceWords(el.name) : el.name}
            </li>
          ))}
          <li>
            <Link
              activeClass="active"
              to="categories"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              Categories
            </Link>
          </li>
        </ul>
      </div>

      <div className="responsive-search">
        <div className="search-input">
          <input
            ref={searchInputRef}
            onChange={(e) => handleSearching(e.target.value)}
            type="text"
            name="searchInput"
            placeholder="Search Products"
          />
          {searchInputRef.current?.value ? (
            <CloseIcon
              fontSize="small"
              style={{
                fontWeight: "bold",
                color: "#101081",
                cursor: "pointer",
              }}
              onClick={clearSearchInput}
            />
          ) : null}
        </div>
        <SearchResults
          searchedProducts={searchedProducts}
          loading={loading}
          handleSearchRouting={handleSearchRouting}
          searchInputRef={searchInputRef}
        />
      </div>
    </div>
  );
};

export default Header;
