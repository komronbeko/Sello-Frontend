import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import http from "../../service/api";
import { setAuthAssetsToLocalStorage } from "../../utils/storage";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const LoginForm = ({ setAuthNavigator }) => {
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e) {
    toast("Please wait...", { type: "info" });
    e.preventDefault();
    const { email, password } = e.target.elements;
    try {
      const { data } = await http.post("/auth/login-user", {
        email: email.value,
        password: password.value,
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

    e.target.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <h3>Welcome!</h3>
      <b>Login to your Account</b>
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
          type={showPassword ? "text" : "password"}
          name="password"
          label="Password"
          placeholder="••••••••"
          variant="outlined"
          fullWidth
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <button className="register-next-btn">Next</button>

        <p
          onClick={() => setAuthNavigator("auth-register")}
          className="auth-hyper-link"
        >
          Don&apos;t have an account yet?
        </p>
        <p
          onClick={() => setAuthNavigator("email-otp")}
          className="auth-hyper-link"
        >
          Forgot password?
        </p>
      </div>
    </form>
  );
};

LoginForm.propTypes = {
  setAuthNavigator: PropTypes.func.isRequired,
};

export default LoginForm;
