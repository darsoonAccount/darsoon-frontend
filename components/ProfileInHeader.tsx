import React, { useContext, useEffect, useState } from "react";
import Styled from "styled-components";
import { AppContext, useNotif } from "../contexts/AppProvider";
import { themeVars } from "./layout/GlobalStyles";
import { useAuth } from "../contexts/AuthProvider";
import Link from "next/link";
import Img from "./Img";
import T from "./translation/T";
import Fa from "./translation/Fa";
import En from "./translation/En";

const ProfileInHeader = () => {
  const { loggedInUser, logOut } = useAuth();
  const { notify } = useNotif();

  const [isProfileMenuVisible, setIsProfileMenuVisible] = useState(false);

  useEffect(() => {
    setIsProfileMenuVisible(false);
  }, []);

  const handleLogOut = () => {
    logOut();
    notify({ fa: "از حساب کاربریتان خارج شدید", en: "You are logged out of you account." });
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
            <p className="greeting">
              <Fa>سلام {loggedInUser.firstnameFa}</Fa>
              <En>Hi, {loggedInUser.firstname}</En>
            </p>
          </div>
          <button className="button profile-button" onClick={showProfileMenu}>
            <Img className="avatar" src="/avatar.png" alt="Profile Picture" />
          </button>
          {isProfileMenuVisible && (
            <div className="profile-menu">
              <Link href="/teacher-dashboard">
                <a>
                  <T fa="داشبورد معلم" en="Teacher Dashboard" />
                </a>
              </Link>
              <Link href="/admin-dashboard">
                <a>
                  <T fa="داشبورد ادمین" en="Admin Dashboard" />
                </a>
              </Link>
              <Link href="/payer-dashboard">
                <a>
                  <T fa="داشبورد پرداخت کننده" en="Payer Dashboard" />
                </a>
              </Link>
              <Link href="/student-dashboard">
                <a>
                  <T fa="داشبورد دانش آموز" en="Student Dashboard" />
                </a>
              </Link>
              <button className="log-out-button" onClick={handleLogOut}>
                <T fa="خروج از حساب" en="Logout" />
              </button>
            </div>
          )}
        </>
      ) : (
        <Link href="/login">
          <a className="login">
            <T fa="ورود به حساب" en="Login" />
          </a>
        </Link>
      )}
    </Div>
  );
};

export default ProfileInHeader;
const Div = Styled.div`
font-size: 1.3rem;
position: relative;
color: white;
display: flex;
justify-content: flex-end;
align-items: center;
gap: 1rem;

.greeting {
  font-weight: 700;
  font-size: 1.3rem;
}



.profile-button {
  min-width: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items:center;
}

.avatar {
  outline: 3px solid white;
  width: 35px; 
  aspect-ratio: 1/1;
  border-radius: 100px;
  box-shadow: ${themeVars.boxShadow};
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
  padding: 0;
}

`;
