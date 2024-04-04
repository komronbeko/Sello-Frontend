import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ClearIcon from '@mui/icons-material/Clear';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
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
import Catalog from "../../Catalog/Catalog";
import { searchProducts } from "../../../features/SearchSlice";
import { debounce } from "lodash";
import { URL_IMAGE } from "../../../constants/api";
import { Link } from "react-scroll";


const Header = () => {
  const [catalogModal, setCatalogModal] = useState(false);
  const searchInputRef = useRef(null);
  const catalog = useSelector((state) => state.catalog.catalogs);
  const userLikes = useSelector((state) => state.like.likes);
  const carts = useSelector((state) => state.cart.carts);
  const searchedProducts = useSelector((state) => state.searchProducts.data);



  const token = getAccessTokenFromLocalStorage();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCatalogs());
    if (token) {
      dispatch(fetchCarts(token));
      dispatch(fetchLikes(token));
    }
  }, [dispatch, token]);

  function handleAuthModal(directory) {
    if (!token) return dispatch(setAuthModalTrue());
    const authAssets = getAuthAssetsFromLocalStorage();
    navigate(`/profile/${authAssets?.user_id}${directory}`);
  }

  const debounceSearching = debounce((searchQuery) => {
    if (searchQuery) {
      dispatch(searchProducts(searchQuery));
    } else {
      clearSearchInput();
    }
  }, 1000);

  function handleSearching(value) {
    debounceSearching(value);
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
      <div className="header__main">
        <div onClick={() => navigate("/")} className="header-logo">
          <img src={Logo} alt="header-logo" />
        </div>
        <div className="header-catalog-search">
          <div onClick={() => setCatalogModal(prev => !prev)} className="header-catalog">
            {
              catalogModal ? <ClearIcon fontSize="small" style={{ color: '#00b3a8' }} onClick={clearSearchInput} /> : <FormatListBulletedIcon fontSize="small" style={{ color: '#00b3a8' }} />
            }
            <p className="catalogbtn-text">Catalog</p>
          </div>
          <div className="header-search">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="search-input">
                <input ref={searchInputRef} onChange={(e) => handleSearching(e.target.value)} type="text" name="searchInput" placeholder="Search Products" />
                {searchInputRef.current?.value ? <CloseIcon fontSize="small" style={{ fontWeight: 'bold', color: '#101081', cursor: 'pointer' }} onClick={clearSearchInput} /> : null}
              </div>
              <button>
                <SearchIcon fontSize="large" style={{ color: '#ffffff', backgroundColor: '#0a867d', padding: '5px' }} />
              </button>
            </form>
            {searchedProducts?.length ?
              <div className="search-results">
                <ul>
                  {searchedProducts.map(el => (
                    <li onClick={() => handleSearchRouting(el.id)} key={el.id}>
                      <div className="left">
                        <SearchIcon fontSize="medium" style={{ color: '#898787d2' }} />
                        <p>{el.name}</p>
                      </div>
                      <img src={`${URL_IMAGE}/${el.photo}`} alt="product-img" />
                    </li>
                  ))}
                </ul>
              </div> : searchInputRef.current?.value ? <div className="no-search-results"><p>No results found</p></div> : null
            }
          </div>
        </div>
        <div className="header-menu">
          <div onClick={() => handleAuthModal("/favourites")}>
            <Badge
              badgeContent={userLikes ? userLikes.length : 1}
              color="secondary"
            >
              <FavoriteIcon style={{ color: '#00b3a8' }} />
            </Badge>
            <p>Favourites</p>
          </div>
          <div onClick={() => handleAuthModal("/carts")}>
            <Badge
              badgeContent={carts ? carts.length : 1}
              color="warning"
            >
              <AddShoppingCartIcon style={{ color: '#00b3a8' }} />
            </Badge>
            <p>Cart</p>
          </div>
          <div onClick={() => handleAuthModal("/")}>
            <PersonOutlineIcon style={{ color: '#00b3a8' }} />
            <p>Profile</p>
          </div>
        </div>
      </div>
      <p className="header__line" />
      {catalogModal ? <Catalog setCatalogModal={setCatalogModal} /> : ""}
      <div className="header__navbar">
        <ul>
          <li><Link
            activeClass="active"
            to="discounts"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}>🔥Discounts</Link> </li>
          {catalog.map((el) => <li key={el.id} onClick={() => navigate(`/catalog/${el.name}`)}>{el.name}</li>)}
          <li><Link
            activeClass="active"
            to="categories"
            spy={true}
            smooth={true}
            offset={-70} 
            duration={500}>Categories</Link> </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
