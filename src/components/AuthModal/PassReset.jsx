/* eslint-disable react/prop-types */
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import http from "../../service/api";
import {
  getAuthAssetsFromLocalStorage,
  setAccessTokenToLocalStorage,
} from "../../utils/storage";
import { setAuthModalFalse } from "../../features/AuthModalSlice";

const PassReset = () => {
  const dispatch = useDispatch();

  const authAssets = getAuthAssetsFromLocalStorage();

  async function handleSubmit(e) {
    e.preventDefault();
    const { password } = e.target.elements;
    try {
      const { data } = await http.patch(
        `/auth/pass-reset/${authAssets?.user_id}`,
        {
          new_pass: password.value,
        }
      );
      toast(data.message, { type: "success" });
      setAccessTokenToLocalStorage(data.token);

      dispatch(setAuthModalFalse());
    } catch (error) {
      toast(error.message, { type: "error" });
    }

    e.target.reset();
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} id="send">
      <div className="data">
        <label htmlFor="verify-code">Enter New Password</label>
        <input
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <button>Update</button>
      </div>
    </form>
  );
};

export default PassReset;
