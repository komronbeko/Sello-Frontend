import { useDispatch } from "react-redux";
import { useState } from "react";
import RegisterForm from "./RegisterForm";
import VerifyEmail from "./VerifyEmail";
import LoginForm from "./LoginForm";
import { setAuthModalFalse } from "../../features/AuthModalSlice";
import Phone from "../../assets/iphone.svg";
import Logo from "../../assets/sello-logo.svg";

import "./AuthModal.scss";
import EmailOtp from "./EmailOtp";
import VerifyOtp from "./VerifyOtp";
import PassReset from "./PassReset";

const AuthModal = () => {
  const [authNavigator, setAuthNavigator] = useState("auth-register");

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
            <RegisterForm setAuthNavigator={setAuthNavigator} />
          ) : authNavigator === "auth-verify" ? (
            <VerifyEmail setAuthNavigator={setAuthNavigator} />
          ) : authNavigator === "auth-login" ? (
            <LoginForm setAuthNavigator={setAuthNavigator} />
          ) : authNavigator === "email-otp" ? (
            <EmailOtp setAuthNavigator={setAuthNavigator} />
          ) : authNavigator === "verify-otp" ? (
            <VerifyOtp setAuthNavigator={setAuthNavigator} />
          ) : authNavigator === "pass-reset" ? (
            <PassReset setAuthNavigator={setAuthNavigator} />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
