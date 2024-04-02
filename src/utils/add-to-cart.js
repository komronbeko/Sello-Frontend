import axios from "axios";
import { API_BASE_URL } from "../constants/api";

export async function addToCart(product_id, token) {
  await axios.post(
    `${API_BASE_URL}/cart`,
    {
      product_id,
    },
    { headers: { Authorization: "Bearer " + token } } 
  );
}
