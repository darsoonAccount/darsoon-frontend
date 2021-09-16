import React, { useState, useEffect, createContext } from "react";
import { useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export const AuthContext = createContext<any | null>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const router = useRouter();

  const [loggedInUser, setloggedInUser] = useState(null);
  const [loggedInUserPayerProfile, setloggedInUserPayerProfile] = useState(null);
  const [loggedInUserStudentProfile, setloggedInUserStudentProfile] = useState(null);
  const [loggedInUserTeacherProfile, setloggedInUserTeacherProfile] = useState(null);
  const [loggedInUserAdminProfile, setloggedInUserAdminProfile] = useState(null);
  const [token, setToken] = useState(null);
  const [expiresIn, setExpiresIn] = useState(null);

  const logOut = () => {
    //empty local storage
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("token");
    localStorage.removeItem("expiresIn");

    //set profiles to null

    setloggedInUserPayerProfile(null);
    setloggedInUserStudentProfile(null);
    setloggedInUserTeacherProfile(null);
    setloggedInUserAdminProfile(null);

    //set the user to null

    setloggedInUser(null);
    setToken(null);
    setExpiresIn(null);

    //redirect to homepage

    router.push("/");
  };

  interface loginInteface {
    user: object;
    token: string;
    expiresIn: string;
  }

  const login = ({ user, token, expiresIn }: loginInteface) => {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("expiresIn", expiresIn);

    setloggedInUser(user);
    setToken(token);
    setExpiresIn(expiresIn);

    //check if the user has other profiles and add them

    //instanciating axios (we connot access and reuse useApi in AppContext here, because AuthProvider wraps AppContext. we have to instaciate here)
    const api = axios.create({
      baseURL: "https://darsoon.uc.r.appspot.com",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const handleErrors = (error: any) => {
      if (!error.response || error.response.status >= 500) {
        alert(error.message + " | An error happend.");
        console.log("Error while Loging in:", error.response.data);
      }
    };

    api
      .get(`/api/p/payer/${user.username}`)
      .then((res) => {
        setloggedInUserPayerProfile(res.data.data);
      })
      .catch(handleErrors);

    api
      .get(`/api/p/student/${user.username}`)
      .then((res) => {
        setloggedInUserStudentProfile(res.data.data);
      })
      .catch(handleErrors);

    api
      .get(`/api/p/teacher/${user.username}`)
      .then((res) => {
        setloggedInUserTeacherProfile(res.data.data);
      })
      .catch(handleErrors);

    api
      .get(`/api/p/admin/${user.username}`)
      .then((res) => {
        setloggedInUserAdminProfile(res.data.data);
      })
      .catch(handleErrors);
  };

  //when user revisit website, get loggedInUser, token and expiresIn from LocalStorage If available, and login with them.
  useEffect(() => {
    if ((!loggedInUser || !token || !expiresIn) && localStorage.getItem("loggedInUser") && localStorage.getItem("token") && localStorage.getItem("expiresIn")) {
      //it is better to check the data and see if such a user with those attributes exists in the db.

      login({
        user: JSON.parse(localStorage.getItem("loggedInUser")),
        token: localStorage.getItem("token"),
        expiresIn: localStorage.getItem("expiresIn"),
      });
    }

    //if the auth data in local storage is missing or in corect shape, log out.
    if (!localStorage.getItem("loggedInUser") || !localStorage.getItem("token") || !localStorage.getItem("expiresIn")) {
      logOut();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loggedInUser,
        loggedInUserPayerProfile,
        loggedInUserStudentProfile,
        loggedInUserTeacherProfile,
        loggedInUserAdminProfile,
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
