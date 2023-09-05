/* eslint-disable react/prop-types */
import { toast } from "react-toastify";
import http from "../../service/api";
import { setAuthAssetsToLocalStorage } from "../../utils/storage";

const RegisterForm = ({ setAuthNavigator }) => {
  async function handleSubmit(e) {
    e.preventDefault();
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
      toast(error.message, { type: "error" });
      toast(error.response.data.message, { type: "error" });
    }

    e.target.reset();
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} id="send">
      <h3>Hello!</h3>
      <h3>Register</h3>
      <div className="data">
        <input
          type="email"
          name="email"
          placeholder="example@gmail.com"
          required
        />
        <input type="text" name="username" placeholder="username" required />
        <input
          type="password"
          name="password"
          placeholder="••••••••"
          required
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

export default RegisterForm;
