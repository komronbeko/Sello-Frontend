/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import { Home } from "@mui/icons-material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import "./index.scss"

const Layout = ({ children }) => {
  const auth = useSelector(state => state.auth.state)
  return (
    <div className="layout">
      {auth ? <Header /> : ''}
      {children}
      {auth ? <Footer /> : ''}
      <ul className="footer-menu">
        <li><Home color="action" /> <p>Main</p></li>
        <li><FormatListBulletedIcon color="action" /> <p>Catalog</p></li>
        <li><AddShoppingCartIcon color="action" /> <p>Cart</p></li>
        <li><FavoriteIcon color="action" /> <p>Favourites</p></li>
        <li><MoreVertIcon color="action" /> <p>Main</p></li>
      </ul>
    </div>
  );
};

export default Layout;
