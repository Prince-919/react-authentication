import axios from "axios";
import {
  genearteTokensFromAccessToken,
  getRefreshToken,
} from "../services/authServices";

const api = axios.create({
  baseURL: "https://node-authentication-rzo7.onrender.com/api/auth",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("accessToken"));
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && originalRequest._retry) {
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        originalRequest._retry = true;
        try {
          const newToken = await genearteTokensFromAccessToken();
          axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
          return api(originalRequest);
        } catch (error) {
          return Promise.reject(error);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
