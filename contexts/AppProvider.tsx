import React, { useState, createContext, useContext } from "react";
import { useAuth } from "./AuthProvider";
import axios from "axios";
import { useEffect } from "react";

export const AppContext = createContext<any | null>(null);

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
    baseURL: "https://darsoon.uc.r.appspot.com",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  //toast notifications states

  const [notifs, setNotifs] = useState([]);

  interface InotifyArgs {
    en: string;
    fa: string;
    type?: string;
  }
  const notify = ({ en, fa, type }: InotifyArgs) => {
    setNotifs((notifs) => [...notifs, { messageEn: en, messageFa: fa, type: type }]);
  };

  return <AppContext.Provider value={{ api, notify, notifs }}>{children}</AppContext.Provider>;
};

export default AppProvider;
