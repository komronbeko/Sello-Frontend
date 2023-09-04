/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";

const Layout = ({ children }) => {
    const auth = useSelector(state => state.auth.state)
  return (
    <div className="layout">
      {auth ? <Header /> : ''}
      {children}
      {auth ? <Footer /> : ''}
    </div>
  );
};

export default Layout;
