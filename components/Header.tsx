import React, { useContext } from "react";
import Link from "next/link";
import styled from "styled-components";
import { themeVars } from "./GlobalStyles";
import ProfileInHeader from "./ProfileInHeader";

// import ProfileInHeader from "./auth/ProfileInHeader";
// import { AppContext } from "./AppProvider";
// import { useAuth } from "./auth/AuthProvider";

const Header = () => {
  // const { currentUser } = useAuth();

  return (
    <>
      <StyledHeader>
        <nav>
          <h1 className="site-title">
            <Link href="/">Darsoon</Link>
          </h1>
          <Link href="/teachers">Teachers</Link>
          <Link href="/classes">Classes</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <ProfileInHeader />
      </StyledHeader>
    </>
  );
};

export default Header;

const StyledHeader = styled.header`
  flex: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${themeVars.primaryColor};
  /* padding: 1rem; */
  min-height: 6rem;
  padding-inline: 1rem;
  font-weight: 900;

  .site-title {
    font-weight: 900;
    font-size: 1.5em;
  }

  nav {
    padding: 1rem;
    color: white;
    display: flex;
    align-items: center;
    gap: 2rem;

    a {
      color: white;
      text-decoration: none;
    }
  }
`;
