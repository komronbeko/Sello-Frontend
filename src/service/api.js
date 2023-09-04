import axios from "axios";
import { API_BASE_URL } from "../constants/api";
import { getAccessTokenFromLocalStorage } from "../utils/storage";

const token = getAccessTokenFromLocalStorage();

const http = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: 'Bearer ' + token,
  },
});

export default http;
