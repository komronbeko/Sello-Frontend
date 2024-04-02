import { toast } from "react-toastify";
import axios from "axios";
import { API_BASE_URL } from "../constants/api";

export async function addToLike(product_id, token) {
    try {
      await axios.post(`${API_BASE_URL}/like`, {
        product_id
      }, {headers: { Authorization: 'Bearer ' + token}});
    } catch (error) {
      if (error.response.data.message !== "Product already liked")
        return toast(error.response.data.message, { type: "error" });
      await axios.delete(`${API_BASE_URL}/like/${product_id}`, {headers: { Authorization: 'Bearer ' + token}});
    }
}