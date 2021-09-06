import React, { useState, createContext, useReducer } from "react";
import { useEffect } from "react";
import { useApi, useNotif } from "./AppProvider";
import { useAuth } from "./AuthProvider";

export const AdminDashContext = createContext<any | null>(null);

export const ADMIN_DASH_ACTIONS = {
  EDIT_TEACHER_APPLICATION: "editTeacherApplication",
  REJECT_TEACHER_APPLICATION: "rejectTeacherApplication",
  ACCEPT_TEACHER_APPLICATION: "acceptTeacherApplication",
  SET_TEACHER_APPLICATIONS: "setTeacherApplications",
  SET_STATE: "setState",
};

const adminDashReducer = (state, action) => {
  const { api } = useApi();
  const { notify } = useNotif();

  switch (action.type) {
    case ADMIN_DASH_ACTIONS.SET_STATE:
      return action.payload;
    // case ADMIN_DASH_ACTIONS.EDIT_TEACHER_APPLICATION:
    //   alert(action.payload);
    //   // do this ;
    //   return state;
    //   break;
    case ADMIN_DASH_ACTIONS.SET_TEACHER_APPLICATIONS:
      return { ...state, teacherApplications: action.payload };

    case ADMIN_DASH_ACTIONS.REJECT_TEACHER_APPLICATION:
      const rejectedApplication = action.payload;
      const rejectedApplicaitonId = rejectedApplication.teacherApplicationId;
      return {
        ...state,
        teacherApplications: state.teacherApplications.map((application) => {
          if (application.teacherApplicationId === rejectedApplicaitonId) {
            return rejectedApplication;
          }
          return application;
        }),
      };

    case ADMIN_DASH_ACTIONS.ACCEPT_TEACHER_APPLICATION:
      const acceptedApllication = action.payload;
      const acceptedApplicationId = acceptedApllication.teacherApplicationId;
      return {
        ...state,
        teacherApplications: state.teacherApplications.map((application) => {
          if (application.teacherApplicationId === acceptedApplicationId) {
            return acceptedApllication;
          }
          return application;
        }),
      };

    default:
      return state;
  }
};

const AdminDahshProvider = (props) => {
  const { children, teacherApplications } = props;

  const initialState = {
    teacherApplications,
  };

  const [adminDashState, adminDashDispatch] = useReducer(adminDashReducer, initialState);

  const { api } = useApi();

  useEffect(() => {
    api
      .get("http://localhost:8000/api/j/teacherApplication")
      .then((res) => {
        adminDashDispatch({ type: ADMIN_DASH_ACTIONS.SET_TEACHER_APPLICATIONS, payload: res.data.data });
      })
      .catch((err) => alert("AdminDashContext fetch error" + err.response.status));
  }, []);

  return <AdminDashContext.Provider value={{ adminDashState, adminDashDispatch }}>{children}</AdminDashContext.Provider>;
};

export default AdminDahshProvider;
