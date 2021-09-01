import React from "react";
import styled from "styled-components";
import FaChalkboardTeacher from "react-icons/fa";
import FiEdit from "react-icons/Fi";
import MdPayment from "react-icons/md";
import Link from "next/link";
import { themeVars } from "../components/GlobalStyles";

export default function AdminDashNav() {
  return (
    <Nav>
      <Link href="/admin-dashboard/teacher-applications">
        {/* <FaChalkboardTeacher /> */}
        Teacher Applications
      </Link>
      <Link href="/admin-dashboard/teacher-change-requests">
        {/* <FiEdit /> */}
        Teacher change requests
      </Link>
      <Link href="/admin-dashboard/payments">
        {/* <MdPayment /> */}
        Payements
      </Link>
    </Nav>
  );
}
const Nav = styled.nav`
  max-width: 30ch;
  background: ${themeVars.darkColor};

  a {
    /* flex: 1; */
    display: block;
    color: white;
    display: grid;
    place-items: center start;
    padding: 2em;
    line-height: 1.4;
    font-weight: 700;
    border-bottom: 1px solid white;
  }

  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  display: flex;
  flex-direction: column;
`;
