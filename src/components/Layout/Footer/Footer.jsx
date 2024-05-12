import Img from "../../../assets/footer_start.png";
import Logo from "../../../assets/logo.svg";
// import Payment1 from "../../../assets/sellopay.svg";
// import Payment2 from "../../../assets/humo.svg";
// import Payment3 from "../../../assets/zoomrad.svg";
// import Payment4 from "../../../assets/uzcard.svg";
import zenithLogo from "../../../assets/logo-black.png";
import uelLogo from "../../../assets/uel-logo.png";
// import App from "../../../assets/iphone.svg";
import { Link } from "react-router-dom";
import "./Footer.scss";
import { useDispatch } from "react-redux";
import { setAuthModalTrue } from "../../../features/AuthModalSlice";
import { getAccessTokenFromLocalStorage } from "../../../utils/storage";
import axios from "axios";
import { API_BASE_URL } from "../../../constants/api";
import { toast } from "react-toastify";


const Footer = () => {
  const dispatch = useDispatch();

  const token = getAccessTokenFromLocalStorage();

  async function handleFeedback(e) {
    e.preventDefault();

    if (!token) {
      return dispatch(setAuthModalTrue());
    }

    const { feedback } = e.target.elements;

    try {
      await axios.post(`${API_BASE_URL}/feedback`,
        { text: feedback.value },
        { headers: { Authorization: `Bearer ${token}` } })

      toast("Thank you for your feedback", { type: "success" });

    } catch (error) {
      toast(error.message, { type: "error" });
    }

    feedback.value = null;
  }

  return (
    <footer id="footer">
      <div id="footer-top">
        <img src={Img} alt="" />
        <div id="feedback">
          <h4>
            {token ? "Leave your feedback about the app" : "Subscribe and be the first to know about discounts and promotions!"}
          </h4>
          <form onSubmit={(e) => handleFeedback(e)}>
            {token ? <input
              type="text"
              name="feedback"
              placeholder="Type your comments..."
              required
            /> : <input
              type="text"
              name="email"
              placeholder="Enter your email address"
              required
            />}
            <button>Send</button>
          </form>
        </div>
      </div>
      <div id="footer-main">
        <div className="footer-row footer-row-1">
          <img className="logo" src={Logo} alt="" />
          <p>© 2024 «Online Market»</p>
          <div className="partners">
            <p>Our partners</p>
            <img src={zenithLogo} alt="zenith-logo" />
            <img src={uelLogo} alt="uel-logo" />
          </div>
        </div>
        <div className="footer-row footer-row-2">
          <h4>Why choose us</h4>
          <ul>
            <li>
              <p className="li-link">Non-profit</p>
            </li>
            <li>
              <p className="li-link">Reasonable Price</p>
            </li>
            <li>
              <p className="li-link">User Friendly Experience</p>
            </li>
            <li>
              <p className="li-link">Community Engagement</p>
            </li>
            <li>
              <p className="li-link">Personalized Recommendations</p>
            </li>
            <li>
              <p className="li-link">Regular Updates</p>
            </li>
          </ul>
        </div>
        <div className="footer-row footer-row-3">
          <h4>About company</h4>
          <ul>
            <li>
              <Link className="li-link">About Us</Link>
            </li>
            <li>
              <Link className="li-link">Contacts</Link>
            </li>
            <li>
              <Link className="li-link">Privacy Policy</Link>
            </li>
            <li>
              <Link className="li-link">Terms of use</Link>
            </li>
            <li>
              <Link className="li-link">FAQ</Link>
            </li>
          </ul>
        </div>
        <div className="footer-row footer-row-4">
          <h4>Contacts</h4>
          <ul>
            <li>
              <div className="contacts-link">
                Call us: <span><a href="tel:+447769199362">+44 (0) 776 919 93 62</a></span>
              </div>
            </li>
            <li>
              <div className="contacts-link">
                Write to us: <span><a href="mailto:komronbekolimovme@gmail.com">komronbekolimovme@gmail.com</a></span>
              </div>
            </li>
            <li>
              <div className="contacts-link" to="https://t.me/olimov0825">
                Telegram: <span><a href="https://t.me/olimov0825">@kolimov0825</a> </span>
              </div>
            </li>
            <li>
              <p>Social media:</p>
              <div className="social-medias">
                <Link to="https://t.me/olimov0825">
                  <i className="fa-brands fa-telegram"></i>
                </Link>
                <Link to="https://www.instagram.com/komronbek.olimov">
                  <i className="fa-brands fa-instagram"></i>
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
