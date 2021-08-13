import React, { useState, useEffect, createContext } from "react";
import { useContext } from "react";

export const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [loggedInUser, setloggedInUser] = useState(null);
  const [token, setToken] = useState(null);
  const [expiresIn, setExpiresIn] = useState(null);

  const logOut = () => {
    setloggedInUser(null);
    setToken(null);
    setExpiresIn(null);
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("token");
    localStorage.removeItem("expiresIn");
  };

  const login = ({ user, token, expiresIn }) => {
    setloggedInUser(user);
    setToken(token);
    setExpiresIn(expiresIn);
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("expiresIn", expiresIn);
  };

  //when loggedInUser comes back get loggedInUser, token and expiresIn from LocalStorage If available.
  useEffect(() => {
    if (
      (!loggedInUser || !token || !expiresIn) &&
      localStorage.getItem("loggedInUser") &&
      localStorage.getItem("token") &&
      localStorage.getItem("expiresIn")
    ) {
      login({
        user: JSON.parse(localStorage.getItem("loggedInUser")),
        token: localStorage.getItem("token"),
        expiresIn: localStorage.getItem("expiresIn"),
      });
    }

    //the auth data in local is not complete, log out.
    if (
      !localStorage.getItem("loggedInUser") ||
      !localStorage.getItem("token") ||
      !localStorage.getItem("expiresIn")
    ) {
      logOut();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loggedInUser,
        token,
        expiresIn,
        login,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
