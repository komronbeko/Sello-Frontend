import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import http from "../../service/api";
import { setAuthAssetsToLocalStorage } from "../../utils/storage";
import { TextField } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
import PasswordField from "./PasswordField";

const RegisterForm = ({ setAuthNavigator }) => {
  const [valPassword, setValPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  // const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    toast("Please wait...", { type: "info" });

    const { email, password, username } = e.target.elements;
    try {
      const { data } = await http.post("/auth/register", {
        email: email.value,
        password: password.value,
        username: username.value,
      });
      setAuthNavigator("auth-verify");
      toast(data.message, { type: "success" });
      setAuthAssetsToLocalStorage({
        verifyCode: data.data.code,
        user_id: data.data.user_id,
      });
    } catch (error) {
      toast(error.response.data.message[0], { type: "error" });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <h3>Hello!</h3>
      <b>Create an Account!</b>
      <div className="data">
        <TextField
          type="email"
          name="email"
          label="Email"
          placeholder="example@gmail.com"
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          type="text"
          name="username"
          label="Username"
          placeholder="username"
          variant="outlined"
          fullWidth
          required
        />
        <PasswordField
          value={valPassword}
          onChange={(e) => setValPassword(e.target.value)}
          error={passwordError}
          setError={setPasswordError}
        />
        <button className="register-next-btn">Next</button>
        <p
          onClick={() => setAuthNavigator("auth-login")}
          className="auth-hyper-link"
        >
          Already registered?
        </p>
      </div>
    </form>
  );
};

RegisterForm.propTypes = {
  setAuthNavigator: PropTypes.func.isRequired,
};

export default RegisterForm;
