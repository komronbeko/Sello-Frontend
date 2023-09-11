/* eslint-disable react/prop-types */
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import http from "../../service/api";
import {
  getAuthAssetsFromLocalStorage,
  setAccessTokenToLocalStorage,
} from "../../utils/storage";
import { setAuthModalFalse } from "../../features/AuthModalSlice";


const VerifyForm = () => {
  const dispatch = useDispatch();

  const authAssets = getAuthAssetsFromLocalStorage();

  async function handleSubmit(e) {
    toast('Just a second! We are checking your code', {type: 'info'});


    e.preventDefault();
    const { code } = e.target.elements;
    try {
      const { data } = await http.post(
        `/auth/verify-user/${authAssets?.user_id}`,
        {
          verify_code: code.value,
          code: authAssets?.verifyCode
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
        <label htmlFor="verify-code">Enter verifaction code</label>
        <input type="number" name="code" placeholder="••••••••" required />
        <button>Next</button>
      </div>
    </form>
  );
};

export default VerifyForm;
