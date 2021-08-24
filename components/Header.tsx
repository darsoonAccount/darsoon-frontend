import React, { useContext, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { themeVars } from "./GlobalStyles";
import ProfileInHeader from "./ProfileInHeader";
import LanguageInHeader from "./LanguageInHeader";
import { FiMenu } from "react-icons/fi";

// import ProfileInHeader from "./auth/ProfileInHeader";
// import { AppContext } from "./AppProvider";
// import { useAuth } from "./auth/AuthProvider";

const Header = () => {
  // const { currentUser } = useAuth();
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
  return (
    <>
      <StyledHeader>
        <input className="checkbox" id="checkbox" type="checkbox" />
        <span className="logo">
          <Link href="/">Darsoon</Link>
        </span>
        <nav className="nav">
          <Link href="/teachers">Teachers</Link>
          <Link href="/classes">Classes</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <LanguageInHeader />
          <ProfileInHeader />
        </nav>
        <label htmlFor="checkbox" className="icon-burger"></label>
      </StyledHeader>
    </>
  );
};

export default Header;

const StyledHeader = styled.header`
  position: sticky;
  z-index: 10;
  left: 0;
  right: 0;
  top: 0;
  font-family: "Montserrat", sans-serif;
  padding: 0 2rem;
  height: 100px;
  background-color: ${themeVars.primaryColor};
  box-shadow: ${themeVars.boxShadow};

  .logo {
    float: inline-start;
    width: 40%;
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 24px;
    font-weight: 900;
    color: #fff;
  }
  .nav {
    float: inline-end;
    padding: 0;
    margin: 0;
    width: 60%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .nav a {
    display: block;
    padding: 1em;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    text-decoration: none;
  }
  .checkbox {
    position: absolute;
    top: -100px;
  }
  .icon-burger {
    display: none;
    position: absolute;
    inset-inline-end: 5%;
    top: 50%;
    transform: translateY(-50%);
  }

  .icon-burger::before,
  .icon-burger::after {
    content: "";
    position: "absolute";
    display: block;
    width: 30px;
    height: 5px;
    background-color: #fff;
    margin: 5px;
    border-radius: 3px;
    transition: all 0.3s ease-in-out;
  }

  @media screen and (max-width: 768px) {
    .logo {
      float: none;
      width: auto;
      justify-content: center;
    }
    .nav {
      float: none;
      position: fixed;
      z-index: 9;
      left: 0;
      right: 0;
      top: 100px;
      bottom: 100%;
      width: auto;
      height: auto;
      flex-direction: column;
      justify-content: space-evenly;
      background-color: rgba(0, 0, 0, 0.8);
      overflow: hidden;
      box-sizing: border-box;
      transition: all 0.3s ease-in-out;
    }
    .nav a {
      font-size: 20px;
    }
    .checkbox:checked ~ .nav {
      bottom: 0;
    }
    .icon-burger {
      display: block;
      height: 25px;
    }

    .checkbox:checked ~ .icon-burger::before {
      transform: translateY(5px) rotate(225deg);
    }
    .checkbox:checked ~ .icon-burger::after {
      transform: translateY(-5px) rotate(-225deg);
    }
  }
`;
