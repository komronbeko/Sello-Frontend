import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ReplenishForm from "../../components/ReplenishForm/ReplenishForm";
import ProfileNav from "../../components/ProfileNavbar/ProfileNavbar";
import { useSelector } from "react-redux";
const stripePromise = loadStripe(
  "pk_test_51NXavzDU6UVW8TMJ74sw5Y8EvVk6ZYKvoNIHpC0VPllpheTt0a7JOamgZc4gwnjejvfxy5tCTuziZ4j2eqTnlZVC00V4861pDX"
);
import "./Wallet.scss";

const Wallet = () => {
  const user = useSelector((state) => state.user.userOne);
  function $toSom(number) {
    const exchangeRate = 10500;
    const sum = number * exchangeRate;
    return sum.toLocaleString();
  }
  return user?.is_verified ? (
    <div id="wallet">
      <ProfileNav activePage={"Wallet"} />
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
            <span>Your Balance: {$toSom(user?.money_amount)} som</span>
          </h4>
        </div>
        <Elements stripe={stripePromise}>
          <ReplenishForm />
        </Elements>
      </div>
    </div>
  ) : null;
};

export default Wallet;
