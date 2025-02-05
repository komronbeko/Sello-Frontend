/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import "./ProfileNavbar.scss";

const ProfileNav = ({ activePage, user_id }) => {
  const navigate = useNavigate();

  const links = [
    {
      icon: "fa-regular fa-user",
      text: "Profile",
      link: `/`,
    },
    {
      icon: "fa-solid fa-cart-plus",
      text: "My Products",
      link: "/myproducts",
    },
    {
      icon: "fa-solid fa-box",
      text: "My Orders",
      link: "/orders",
    },
    {
      icon: "fa-regular fa-heart",
      text: "Favorites",
      link: "/favourites",
    },
    {
      icon: "fa-solid fa-wallet",
      text: "Wallet",
      link: "/wallet",
    },

    {
      icon: "fa-solid fa-history",
      text: "History",
      link: "/history",
    },
  ];

  function page(link) {
    navigate(`/profile/${user_id}${link}`);
  }

  function logout() {
    console.log("logout");

    localStorage.removeItem("access-token");
    localStorage.removeItem("auth-assets");
    navigate("/");
  }

  return (
    <div id="navigate">
      {links.map((l) => {
        return (
          <button
            className={activePage === l.text ? "link active" : "link"}
            key={l.icon}
            onClick={() => page(l.link)}
          >
            <i className={l.icon}></i>
            {l.text}
          </button>
        );
      })}
      <button onClick={logout} className="link logout">
        <i className="fa-solid fa-arrow-right-from-bracket"></i>
        Logout
      </button>
    </div>
  );
};

export default ProfileNav;
