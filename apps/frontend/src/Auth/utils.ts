import { REFRESH_ACCESS_TOKEN } from "../services";
import axiosAuth from "./axiosAuth";

export const refreshAccessToken = async () => {
  try {
    const data = await axiosAuth.post(REFRESH_ACCESS_TOKEN);
    return data;
  } catch (error) {
    console.error("Error Refreshing Token", error);
    return null;
  }
};
