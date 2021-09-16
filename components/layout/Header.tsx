import React, { useContext, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { themeVars } from "../../styles/GlobalStyles";
import ProfileInHeader from "../ProfileInHeader";
import LanguageInHeader from "../LanguageInHeader";
import { FiMenu } from "react-icons/fi";
import T from "../translation/T";

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
          <Link href="/">
            <a>
              <T fa="درسون" en="Darsoon" />
            </a>
          </Link>
        </span>
        <nav className="nav">
          <Link href="/teachers">
            <a>
              <T fa="معلم‌ها" en="Teachers" />
            </a>
          </Link>
          <Link href="/classes">
            <a>
              <T fa="کلاس‌ها" en="Classes" />
            </a>
          </Link>
          <Link href="/about">
            <a>
              <T fa="درباره ما" en="About us" />
            </a>
          </Link>
          <Link href="/contact">
            <a>
              <T fa="تماس با ما" en="Contact" />
            </a>
          </Link>
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
  inset-inline-start: 0;
  inset-inline-end: 0;
  inset-block-start: 0;
  padding: 1.5rem 3rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(255, 118, 72, 0.9);
  backdrop-filter: blur(0.3rem);
  box-shadow: ${themeVars.boxShadow};

  .logo {
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 1.7rem;
    font-weight: 900;
    color: #fff;
  }
  .nav {
    padding: 0;
    margin: 0;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 2rem;
  }

  .nav a {
    display: block;
    font-size: 1.3rem;
    font-weight: bold;
    color: #fff;
    text-decoration: none;
  }
  .checkbox {
    position: absolute;
    top: -100px; /* to hide the chcekbox */
  }
  .icon-burger {
    display: none;
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

  @media screen and (max-width: 850px) {
    .logo {
      width: auto;
    }
    .nav {
      float: none;
      position: fixed;
      z-index: 9;
      inset-inline-start: 0;
      inset-inline-end: 0;
      top: 4.95rem;
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
