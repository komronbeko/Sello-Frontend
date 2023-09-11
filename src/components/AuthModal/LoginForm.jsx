import { toast } from "react-toastify";
import http from "../../service/api";
import { setAuthAssetsToLocalStorage } from "../../utils/storage";

// eslint-disable-next-line react/prop-types
const LoginForm = ({ setAuthNavigator }) => {

  async function handleSubmit(e) {
    toast('Please wait...', {type: 'info'});
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
      toast(error.response.data.message, { type: "error" });
    }

    e.target.reset();
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} id="send">
      <h3>Welcome!</h3>
      <h3>Login</h3>
      <div className="data">
        <input
          type="email"
          name="email"
          placeholder="example@gmail.com"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <button>Next</button>
        <p
          onClick={() => setAuthNavigator("auth-register")}
          className="auth-hyper-link"
        >
          Dont have an account yet?
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
