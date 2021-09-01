import React, { useContext, useEffect, useState } from "react";
import Styled from "styled-components";
import { AppContext, useNotif } from "../contexts/AppProvider";
import { themeVars } from "./GlobalStyles";
import { useAuth } from "../contexts/AuthProvider";
import Link from "next/link";

const ProfileInHeader = () => {
  const { loggedInUser, logOut } = useAuth();
  const { notify } = useNotif();

  const [isProfileMenuVisible, setIsProfileMenuVisible] = useState(false);

  useEffect(() => {
    setIsProfileMenuVisible(false);
  }, []);

  const handleLogOut = () => {
    logOut();
    notify("You are logged out.");
  };

  const showProfileMenu = () => {
    setIsProfileMenuVisible(true);
  };

  const handleClick = () => {
    if (isProfileMenuVisible) {
      setIsProfileMenuVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [isProfileMenuVisible]);

  return (
    <Div>
      {loggedInUser ? (
        <>
          <div>
            <p>Hi, {loggedInUser.firstname}</p>
          </div>
          <button className="button profile-button" onClick={showProfileMenu}>
            <img className="profile-picture" src="avatar.png" alt="Profile Picture" width="40px"></img>
          </button>
          {isProfileMenuVisible && (
            <div className="profile-menu">
              <Link href="/teacher-dashboard">Teacher Dashboard</Link>
              <Link href="/admin-dashboard">Admin Dashboard</Link>
              <Link href="/payer-dashboard">Payer Dashboard</Link>
              <Link href="/student-dashboard">Student Dashboard</Link>
              <button className='log-out-button' onClick={handleLogOut}>
                Log Out
              </button>
            </div>
          )}
        </>
      ) : (
        <Link className="login" href="/login">
          Login
        </Link>
      )}
    </Div>
  );
};

export default ProfileInHeader;

const Div = Styled.div`
position: relative;
color: white;
display: flex;
justify-content: flex-end;
align-items: center;
gap: 1rem;



.profile-button {
  min-width: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items:center;
}

.profile-picture {
  border-radius: 100px;
  border: 3px solid white;
  box-shadow: ${themeVars.boxShadow};
  font-size: 7px;
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-menu {
  min-width: 17rem;
  position: absolute;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2rem;
  text-align: end;
  padding: 1.5rem;
  background: ${themeVars.darkColor};
  top: 4rem;
  inset-inline-end: 0;
  z-index: 1;
  box-shadow: ${themeVars.boxShadowHover};

  
  a {
    font-weight: 700;
    color: white;
    padding: 0;
  }

  .log-out-button {
    padding: 0;
    text-align: right;
    background: none;
    box-shadow: none;
    color: white;
    cursor: pointer;
    font-weight: 700;
  }
}

.login {
  color: white;
}

`;
