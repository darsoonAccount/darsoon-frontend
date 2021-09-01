import React, { useState, createContext, useContext } from "react";
import { useAuth } from "./AuthProvider";
import axios from "axios";
import { useEffect } from "react";

export const AppContext = createContext(null);

export const useApi = () => {
  return useContext(AppContext);
};

export const useNotif = () => {
  return useContext(AppContext);
};

const AppProvider = ({ children }) => {
  //api object --- (recommended to be changed with SWR)
  const { token } = useAuth();

  const api = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  //toast notifications states

  const [notifs, setNotifs] = useState([]);

  const notify = (message, type) => {
    setNotifs((notifs) => [...notifs, { message: message, type: type }]);
  };

  return <AppContext.Provider value={{ api, notify, notifs }}>{children}</AppContext.Provider>;
};

export default AppProvider;
