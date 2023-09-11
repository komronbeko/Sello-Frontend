import { useDispatch } from "react-redux";
import { useState } from "react";
import RegisterForm from "./RegisterForm";
import VerifyForm from "./VerifyForm";
import LoginForm from "./LoginForm";
import { setAuthModalFalse } from "../../features/AuthModalSlice";
import Phone from "../../assets/iphone.svg";
import Logo from "../../assets/sello-logo.svg";

import "./AuthModal.scss";

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
          <img src={Phone} className="img_footer" alt="Phone-img" />
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
