/* eslint-disable react/prop-types */
import { toast } from "react-toastify";
// import { useDispatch } from "react-redux";
import http from "../../service/api";
import {
  getAuthAssetsFromLocalStorage,
  //   setAccessTokenToLocalStorage,
  //   setAuthAssetsToLocalStorage,
} from "../../utils/storage";
// import { setAuthModalFalse } from "../../features/AuthModalSlice";

const VerifyOtp = ({ setAuthNavigator }) => {
  //   const dispatch = useDispatch();

  const authAssets = getAuthAssetsFromLocalStorage();

  async function handleSubmit(e) {
    toast("Just a second! We are checking your code", { type: "info" });

    e.preventDefault();
    const { code } = e.target.elements;
    try {
      const { data } = await http.post(
        `/auth/verify-otp/${authAssets?.user_id}`,
        {
          verify_code: code.value,
          code: authAssets?.verifyCode,
        }
      );
      setAuthNavigator("pass-reset");
      toast(data.message, { type: "success" });
    } catch (error) {
      toast(error.message, { type: "error" });
    }

    e.target.reset();
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} id="send">
      <div className="data">
        <label htmlFor="verify-code">Enter verifaction code</label>
        <input type="number" name="code" placeholder="••••••••" required />
        <button>Next</button>
      </div>
    </form>
  );
};

export default VerifyOtp;
