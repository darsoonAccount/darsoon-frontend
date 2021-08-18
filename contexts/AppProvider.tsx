import React, { useState, createContext, useContext } from "react";
import { useAuth } from "./AuthProvider";
import axios from "axios";

export const AppContext = createContext(null);

export const useApi = () => {
  return useContext(AppContext);
};

const AppProvider = ({ children }) => {
  const { token } = useAuth();

  const api = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  return <AppContext.Provider value={{ api }}>{children}</AppContext.Provider>;
};

export default AppProvider;
