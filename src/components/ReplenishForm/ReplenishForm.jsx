/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { fetchUserOne } from "../../features/UserOneSlice";
import { getAccessTokenFromLocalStorage } from "../../utils/storage";

import "./ReplenishForm.scss";
import axios from "axios";
import { API_BASE_URL } from "../../constants/api";

const ReplenishForm = () => {
  const dispatch = useDispatch();

  const stripe = useStripe();
  const elements = useElements();

  const token = getAccessTokenFromLocalStorage();

  async function replenish(e) {
    e.preventDefault();
    const { amount } = e.target.elements;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(
        CardCvcElement,
        CardExpiryElement,
        CardNumberElement
      ),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;

        await axios.patch(`${API_BASE_URL}/user/replenish`, {
          amount: +amount.value,
          id,
        }, {headers: { Authorization: 'Bearer ' + token}});

        toast("Successful Payment", { type: "success" });
        dispatch(fetchUserOne(token));
      } catch (error) {
        toast(error.message, { type: "error" });
      }
    } else {
      toast(error.message, { type: "error" });
    }

    e.target.reset();
  }

  return (
    <form id="replenish-form" onSubmit={replenish}>
      <div className="form-head">
        <div className="block">
          <label htmlFor="card_number">Card number</label>
          <CardNumberElement className="form-controller" />
        </div>
        <div className="block">
          <label htmlFor="card_cvc">CVC</label>
          <CardCvcElement className="form-controller" />
        </div>
      </div>
      <div className="form-body">
        <div className="block">
          <label htmlFor="card_expiry">Validity</label>
          <CardExpiryElement className="form-controller" />
        </div>
        <div className="block">
          <label htmlFor="amount">
            Amount <span>in dollars</span>
          </label>
          <input type="number" name="amount" id="amount" placeholder="100" required/>
        </div>
      </div>
      <div className="btns">
        <button>Replenish</button>
      </div>
    </form>
  );
};

export default ReplenishForm;
