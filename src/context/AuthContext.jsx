import { useState } from "react";
import { AuthContext } from "../hooks/useAuth";
import { storage } from "../utils/storage";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(storage.get("userInfo"));
  const [token, setToken] = useState(storage.get("accessToken"));
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(user && token)
  );

  const updateUser = (data) => {
    storage.set("userInfo", data);
    setUser(storage.get("userInfo"));
  };

  const login = (data) => {
    const { data: userData, accessToken, refreshToken } = data;
    setUser(userData);
    setToken(accessToken);
    setIsAuthenticated(true);
    updateUser(userData);
    storage.set("userInfo", userData);
    storage.set("accessToken", accessToken);
    storage.set("refreshToken", refreshToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    storage.remove("userInfo");
    storage.remove("accessToken");
    storage.remove("refreshToken");
  };

  return (
    <AuthContext.Provider
      value={{ login, logout, updateUser, user, token, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
