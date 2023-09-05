/* eslint-disable react/prop-types */
import { toast } from "react-toastify";
import http from "../../service/api";
import {
  getAuthAssetsFromLocalStorage,
  setAccessTokenToLocalStorage,
} from "../../utils/storage";
import { useDispatch } from "react-redux";
import { setAuthModalFalse } from "../../features/AuthModalSlice";

const VerifyForm = () => {
  const dispatch = useDispatch();

  const {user_id, verifyCode} = getAuthAssetsFromLocalStorage();

  async function handleSubmit(e) {
    e.preventDefault();

    const { code } = e.target.elements;
    try {
      const { data } = await http.post(
        `/auth/verify-user/${user_id}`,
        {
          verify_code: code.value,
          code: verifyCode,
          user_id: user_id,
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
      <h3>Gratefull to welcoming you again!</h3>
      <div className="data">
        <label htmlFor="password">Enter verifaction code</label>
        <input type="password" name="code" placeholder="••••••••" required />
        <button>Next</button>
      </div>
    </form>
  );
};

export default VerifyForm;
