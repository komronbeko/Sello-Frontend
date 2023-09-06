import { useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import ReplenishForm from "../../components/ReplenishForm/ReplenishForm";
import ProfileNav from "../../components/ProfileNavbar/ProfileNavbar";
import { dollarToSom } from "../../utils/exchange";
import { STRIPE_PK } from "../../constants/api";
import { fetchUserOne } from "../../features/UserOneSlice";

import "./Wallet.scss";

const stripePromise = loadStripe(STRIPE_PK);

const Wallet = () => {
  const { user_id } = useParams();
  const user = useSelector((state) => state.user.userOne);

  const dispatch = useDispatch()
  

  useEffect(()=>{
    dispatch(fetchUserOne());
  }, [dispatch]);

  return user?.is_verified ? (
    <div id="wallet">
      <ProfileNav activePage={"Wallet"} user_id={user_id}/>
      <div id="data">
        <div className="data-head">
          <h3>Wallet</h3>
          <p>
            You can fund your wallet using your credit card (Visa, MasterCard)
          </p>
        </div>
        <div className="data-body">
          <h4>
            Payment will be automatically taken from your Sello wallet{" "}
            <span>Your Balance: {dollarToSom(user?.money_amount)} som</span>
          </h4>
        </div>
        <Elements stripe={stripePromise}>
          <ReplenishForm user_id={user_id} />
        </Elements>
      </div>
    </div>
  ) : null;
};

export default Wallet;
