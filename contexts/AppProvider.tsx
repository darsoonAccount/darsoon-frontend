import React, { useState, createContext, useContext } from "react";
import fetchAndHandleResponse from "../utils/fetchAndHandleResponse";
import { useAuth } from "./AuthProvider";

interface Ifetch {
  url: string;
  method?: string;
  body?: object;
  handleMessage?: (message: string) => void;
  handleData?: (data: object) => void;
}

export const AppContext = createContext(null);

export const useFetch = () => {
  return useContext(AppContext);
};

const AppProvider = ({ children }) => {
  const { token } = useAuth();

  const fetchNHandle = ({
    url,
    method,
    body,
    handleData,
    handleMessage,
  }: Ifetch) => {
    fetchAndHandleResponse({
      url,
      method,
      body,
      token: token,
      handleData,
      handleMessage,
    });
  };

  return (
    <AppContext.Provider value={{ fetchNHandle }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
