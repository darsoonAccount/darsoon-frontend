import React, { useState, createContext } from "react";
import { useAuth } from "./AuthProvider";

export const AppContext = createContext(null);

const AppProvider = ({children}) => {
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

export default AppProvider;
