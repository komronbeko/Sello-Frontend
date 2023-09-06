import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import img from "../../assets/success.svg";
import "./Thank.scss";

const Thank = () => {
  const user = useSelector((state) => state.user.userOne);

  return user?.is_verified ? (
    <section id="thank">
      <img src={img} alt="" />
      <h1>Application accepted</h1>
      <p>
        Congratulations, your order has been received. Wait for confirmation of
        our service
      </p>
      <Link to={`/profile/${user.id}/orders`} className="link">
        View order
      </Link>
    </section>
  ) : null;
};

export default Thank;
