import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import img from "../../assets/success.svg";
import "./Thank.scss";
import { useEffect } from "react";
import { getAccessTokenFromLocalStorage } from "../../utils/storage";

const Thank = () => {
  const user = useSelector((state) => state.user.userOne);

  const navigate = useNavigate();
  const token = getAccessTokenFromLocalStorage();

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!token) return navigate("/");
  }, [token, navigate]);

  return (
    <section id="thank">
      <img src={img} alt="" />
      <h1>Application accepted</h1>
      <p>
        Congratulations, your order has been received. Wait for confirmation of
        our service
      </p>
      <Link to={`/profile/${user?.id}/orders`} className="link">
        View order
      </Link>
    </section>
  );
};

export default Thank;
