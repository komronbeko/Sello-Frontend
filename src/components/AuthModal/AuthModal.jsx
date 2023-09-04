import { useDispatch } from "react-redux";
import Logo from "../../../public/sello-logo.svg";
import Phone from "../../../public/iphone.svg";
import { setAuthModalFalse } from "../../features/AuthModalSlice";
import "./AuthModal.scss";
import RegisterForm from "./RegisterForm";
import { useState } from "react";
import VerifyForm from "./VerifyForm";
import LoginForm from "./LoginForm";

const AuthModal = () => {
  const [authNavigator, setAuthNavigator] = useState("auth-login");
  const dispatch = useDispatch();
  function closeAuthModal() {
    dispatch(setAuthModalFalse());
  }
  return (
    <div className="auth-modal">
      <div className="block">
        <button onClick={() => closeAuthModal()} className="close-auth-modal">
          ✖️
        </button>
        <div className="start_auth">
          <img src={Logo} className="img_head" alt="" />
          <h3>New super app Sello!</h3>
          <p>Sign in in a minute to register in three applications at once.</p>
          <img src={Phone} className="img_footer" alt="" />
        </div>
        <div className="end_auth">
          {authNavigator === "auth-register" ? (
            <RegisterForm
              setAuthNavigator={setAuthNavigator}
            />
          ) : authNavigator === "auth-verify" ? (
            <VerifyForm
              setAuthNavigator={setAuthNavigator}
            />
          ) : authNavigator === "auth-login" ? (
            <LoginForm
              setAuthNavigator={setAuthNavigator}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
