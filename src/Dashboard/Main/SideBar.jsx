/* eslint-disable react/prop-types */
// import React from "react";

const Sidebar = ({ selectedItem, setSelectedItem }) => {
  const menuItems = [
    "Products",
    "Unauthorized",
    "Users",
    "Catalogs",
    "Banners",
    "Discounts",
    "Feedbacks",
    "Notifications",
    "Orders",
    "Partners",
    "Reviews",
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>Sello Admin</h2>
      </div>
      <nav className="menu">
        {menuItems.map((item) => (
          <div
            key={item}
            className={`menu-item ${selectedItem === item ? "active" : ""}`}
            onClick={() => setSelectedItem(item)}
          >
            {item}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
