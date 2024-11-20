import { useEffect, useState } from "react";
import Products from "../Products/Products";
import Users from "../Users/Users";
import Catalogs from "../Catalogs/Catalogs";
import Banners from "../Banners/Banners";
import Discounts from "../Discounts/Discounts";
import Feedbacks from "../Feedbacks/Feedbacks";
import Orders from "../Orders/Orders";
import Partners from "../Partners/Partners";
import Notifications from "../Notifications/Notifications";
import Reviews from "../Reviews/Reviews";
import Sidebar from "./SideBar";

import "./Main.scss";
import { useDispatch } from "react-redux";
import { setAuthFalse } from "../../features/AuthSlice";
import UnauthorizedProdducts from "../UnauthProds/UnauthProds";

const AdminDashboard = () => {
  const [selectedItem, setSelectedItem] = useState("Products");

  const dispatch = useDispatch();

  // Components mapped to their sidebar items
  const componentMap = {
    Products: <Products />,
    Unauthorized: <UnauthorizedProdducts />,
    Users: <Users />,
    Catalogs: <Catalogs />,
    Banners: <Banners />,
    Discounts: <Discounts />,
    Feedbacks: <Feedbacks />,
    Notifications: <Notifications />,
    Orders: <Orders />,
    Partners: <Partners />,
    Reviews: <Reviews />,
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    dispatch(setAuthFalse());
  }, [dispatch]);

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <Sidebar selectedItem={selectedItem} setSelectedItem={setSelectedItem} />

      {/* Main Content */}
      <main className="content">
        <header className="header">
          <div className="search">
            <input type="text" placeholder="Search..." />
            <button className="search-btn">🔍</button>
          </div>
          <div className="profile">
            <span className="profile-icon">👤</span>
            <span className="profile-name">Admin</span>
          </div>
        </header>
        <div className="dashboard-body">
          {/* Render the selected component */}
          {componentMap[selectedItem]}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
