import React, { useContext, useEffect, useState } from "react";
import Styled from "styled-components";
import { AppContext } from "../contexts/AppProvider";
import { themeVars } from "./GlobalStyles";
import { useAuth } from "../contexts/AuthProvider";

const ProfileInHeader = () => {
  const { loggedInUser, logOut } = useAuth();

  const [isProfileMenuVisible, setIsProfileMenuVisible] = useState(false);

  useEffect(() => {
    setIsProfileMenuVisible(false);
  }, []);

  const handleLogOut = () => {
    logOut();
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
          <button className="profile-button" onClick={showProfileMenu}>
            <img
              className="profile-picture"
              src="avatar.png"
              alt="Profile Picture"
              width="40px"
            ></img>
          </button>
          {isProfileMenuVisible && (
            <div className="profile-menu">
              <a href="/my-classes">Profile</a>
              <button className="log-out-button" onClick={handleLogOut}>
                Log Out
              </button>
            </div>
          )}
        </>
      ) : (
        <a href="/login">Login</a>
      )}
    </Div>
  );
};

export default ProfileInHeader;

const Div = Styled.div`

position: relative;
padding: 1rem;
color: white;
display: flex;
align-items: center;
gap: 1rem;

.role {
  font-size: 0.8em;
  font-weight: 300;
  text-align: right;

}

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
  position: absolute;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-end;
  padding: 1rem;
  background: ${themeVars.darkColor};
  top: 4rem;
  right: 1rem;
  z-index: 1;
  box-shadow: ${themeVars.boxShadow};

  
  a {
    font-weight: 700;
  }

}
  .log-out-button {
  background: none;
  box-shadow: none;
  color: white;
  font-size: 1em;
  padding: 0;
  cursor: pointer;
  font-weight: 700;
}
`;
