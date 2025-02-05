/* eslint-disable react/prop-types */
import { toast } from "react-toastify";
import http from "../../service/api";
import { setAuthAssetsToLocalStorage } from "../../utils/storage";
import { TextField } from "@mui/material";

const EmailOtp = ({ setAuthNavigator }) => {
  async function handleSubmit(e) {
    e.preventDefault();
    const { email } = e.target.elements;
    toast("Just a second! We are checking your email...", { type: "info" });

    try {
      const { data } = await http.post("/auth/otp", {
        email: email.value,
      });

      setAuthNavigator("verify-otp");
      toast(data.message, { type: "success" });
      setAuthAssetsToLocalStorage({
        verifyCode: data.data.code,
        user_id: data.data.user_id,
      });
    } catch (error) {
      toast(error.message, { type: "error" });
    }

    e.target.reset();
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="form">
      <b>
        If your email is registered in our system, You will get verifaction code
        shortly!
      </b>
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
        <button className="register-next-btn">Next</button>
      </div>
    </form>
  );
};

export default EmailOtp;
