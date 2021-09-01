import React, { useState, useEffect, createContext } from "react";
import { useContext } from "react";
import axios from "axios";

export const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [loggedInUser, setloggedInUser] = useState(null);
  const [loggedInUserPayerProfie, setloggedInUserPayerProfie] = useState(null);
  const [loggedInUserStudentProfie, setloggedInUserStudentProfie] = useState(null);
  const [loggedInUserTeacherProfie, setloggedInUserTeacherProfie] = useState(null);
  const [loggedInUserAdminProfie, setloggedInUserAdminProfie] = useState(null);
  const [token, setToken] = useState(null);
  const [expiresIn, setExpiresIn] = useState(null);

  const logOut = () => {
    console.log('here');
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

    //check if the user has other profiles and add them

    //instanciating axios (we connot access and reuse useApi in AppContext here, because AuthProvider wraps AppContext. we have to instaciate here)
    const api = axios.create({
      baseURL: "http://localhost:8000",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const handleErrors = (error: any) => {
      if (!error.response || error.response.status >= 500) {
        alert(error.message + " | An error happend.");
      }
    };

    api
      .get(`/api/p/payers/${user.username}`)
      .then((res) => {
        setloggedInUserPayerProfie(res.data.data);
      })
      .catch(handleErrors);

    api
      .get(`/api/p/students/${user.username}`)
      .then((res) => {
        setloggedInUserStudentProfie(res.data.data);
      })
      .catch(handleErrors);

    api
      .get(`/api/p/teachers/${user.username}`)
      .then((res) => {
        setloggedInUserTeacherProfie(res.data.data);
      })
      .catch(handleErrors);

    api
      .get(`/api/p/admins/${user.username}`)
      .then((res) => {
        setloggedInUserAdminProfie(res.data.data);
      })
      .catch(handleErrors);
  };

  //when user revisit website, get loggedInUser, token and expiresIn from LocalStorage If available, and login with them.
  useEffect(() => {
    if ((!loggedInUser || !token || !expiresIn) && localStorage.getItem("loggedInUser") && localStorage.getItem("token") && localStorage.getItem("expiresIn")) {
      login({
        user: JSON.parse(localStorage.getItem("loggedInUser")),
        token: localStorage.getItem("token"),
        expiresIn: localStorage.getItem("expiresIn"),
      });
    }

    //if the auth data in local storage is not complete, log out.
    if (!localStorage.getItem("loggedInUser") || !localStorage.getItem("token") || !localStorage.getItem("expiresIn")) {
      logOut();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loggedInUser,
        loggedInUserPayerProfie,
        loggedInUserStudentProfie,
        loggedInUserTeacherProfie,
        loggedInUserAdminProfie,
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
