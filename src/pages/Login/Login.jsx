import { useDispatch } from "react-redux";
import { setAuthFalse, setAuthTrue } from "../../features/AuthSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    dispatch(setAuthFalse());
  }, [dispatch]);

  function handleClick() {
    navigate("/");
    dispatch(setAuthTrue());
  }
  
  return (
    <div>
      <button onClick={() => handleClick()}>push me</button>
    </div>
  );
};

export default Login;
