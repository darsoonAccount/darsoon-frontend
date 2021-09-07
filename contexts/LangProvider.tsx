import React, { useState, useEffect, createContext, useContext } from "react";
import { useAuth } from "./AuthProvider";

export const LangContext = createContext(null);
export const useLang = () => {
  return useContext(LangContext);
};

const langProvider = ({ children }) => {
  const [lang, setLang] = useState("fa");
  const { loggedInUser } = useAuth();

  const setLangToEnglish = () => {
    //TO DO
    // set loggedInUser.browsinglanguage in fa;
    // set loggedInUser.browsinglanguage in db in fa;
    setLang("en");
  };

  const setLangToPersian = () => {
    //TO DO
    // set loggedInUser.browsinglanguage in en;
    // set loggedInUser.browsinglanguage in db in en;
    setLang("fa");
  };

  useEffect(() => {
    if (loggedInUser?.browsinglanguage) {
      setLang(loggedInUser.browsinglanguage);
    }
  }, [loggedInUser?.browsinglanguage]);

  return <LangContext.Provider value={{ lang, setLangToEnglish, setLangToPersian }}>{children}</LangContext.Provider>;
};

export default langProvider;
