import axios from "axios";
import { getCookie } from "../utils";

const HEADERS: any = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: getCookie("accessToken") || "",
};

const instance = axios.create({
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  config.baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:3001";

  config.headers = {
    ...HEADERS,
    ...config.headers,
  };

  return config;
});

export default instance;
