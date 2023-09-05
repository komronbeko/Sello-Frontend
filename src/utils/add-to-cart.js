import { toast } from "react-toastify";
import http from "../service/api";

export async function addToCart(product_id, user_id) {
    try {
      await http.post("/cart", {
        product_id,
        user_id,
      });
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  }