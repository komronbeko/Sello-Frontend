import { toast } from "react-toastify";
import http from "../service/api";

export async function addToLike(product_id, user_id) {
    try {
      await http.post("/like", {
        product_id,
        user_id,
      });
    } catch (error) {
      if (error.response.data.message !== "Product already liked")
        return toast(error.response.data.message, { type: "error" });
      await http.delete(`/like/${product_id}`);
    }
  }