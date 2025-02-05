/* eslint-disable react/prop-types */
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import http from "../../service/api";
import {
  getAuthAssetsFromLocalStorage,
  setAccessTokenToLocalStorage,
} from "../../utils/storage";
import { setAuthModalFalse } from "../../features/AuthModalSlice";
import PasswordField from "./PasswordField";

const PassReset = () => {
  const dispatch = useDispatch();
  const authAssets = getAuthAssetsFromLocalStorage();
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return "Password must be at least 8 characters long.";
    }
    if (!hasUpperCase) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!hasLowerCase) {
      return "Password must contain at least one lowercase letter.";
    }
    if (!hasNumber) {
      return "Password must contain at least one number.";
    }
    if (!hasSpecialChar) {
      return "Password must contain at least one special character.";
    }
    return "";
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const error = validatePassword(password);
    if (error) {
      setPasswordError(error);
      return;
    }

    try {
      const { data } = await http.patch(
        `/auth/pass-reset/${authAssets?.user_id}`,
        {
          new_pass: password,
        }
      );
      toast(data.message, { type: "success" });
      setAccessTokenToLocalStorage(data.token);
      dispatch(setAuthModalFalse());
    } catch (error) {
      toast(error.response.data.message, { type: "error" });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <h3>Reset Password</h3>
      <div className="data">
        <PasswordField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="New Password"
          error={passwordError}
          setError={setPasswordError}
        />
        <button className="register-next-btn">Reset Password</button>
      </div>
    </form>
  );
};

export default PassReset;
