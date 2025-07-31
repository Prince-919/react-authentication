import axios from "axios";
import { storage } from "../utils/storage";

const refreshToken = storage.get("refreshToken");
const accessToken = storage.get("accessToken");

export const getToken = () => accessToken;
export const getRefreshToken = () => refreshToken;

export const setToken = (newToken) => {
  return newToken;
};

export const genearteTokensFromAccessToken = async () => {
  try {
    const response = await axios.post("/refresh-token", refreshToken);
    setToken(response.data.accessToken);
    storage.set("accessToken", response.data.accessToken);
    return response.data.accessToken;
  } catch (error) {
    console.log("Error getting from the access token", error);
    throw error;
  }
};
