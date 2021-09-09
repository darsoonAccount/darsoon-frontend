import React from "react";
import styled from "styled-components";
import FaChalkboardTeacher from "react-icons/fa";
import FiEdit from "react-icons/fi";
import MdPayment from "react-icons/md";
import Link from "next/link";
import { themeVars } from "../styles/GlobalStyles";
import Fa from "../components/translation/Fa";
import En from "../components/translation/En";

export default function AdminDashNav() {
  return (
    <Nav>
      <Link href="/admin-dashboard/teacher-applications">
        <a>
          <Fa>درخواست‌های معلم شدن</Fa>
          <En>Teacher Applications</En>
        </a>
      </Link>
      <Link href="/admin-dashboard/teachers">
        <a>
          <Fa>معلم‌ها</Fa>
          <En>Teachers</En>
        </a>
      </Link>
      <Link href="/admin-dashboard/teacher-profile-changes">
        <a>
          <Fa>تغییر پروفایل‌ها</Fa>
          <En> Teachers Profile Changes</En>
        </a>
      </Link>
      <Link href="/admin-dashboard/admins">
        <a>
          <Fa>ادمین‌ها</Fa>
          <En>Teachers</En>
        </a>
      </Link>
      <Link href="/admin-dashboard/payers">
        <a>
          <Fa>پرداخت‌کننده‌ها</Fa>
          <En>Payers</En>
        </a>
      </Link>
      <Link href="/admin-dashboard/students">
        <a>
          <Fa>دانش‌آموزها</Fa>
          <En>Students</En>
        </a>
      </Link>
      <Link href="/admin-dashboard/payments">
        <a>
          <Fa>پرداخت‌ها</Fa>
          <En>Payements</En>
        </a>
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
    padding: 1.5rem 2rem;
    line-height: 1.4;
    font-weight: 700;
    border-bottom: 1px solid white;
  }

  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  display: flex;
  flex-direction: column;
`;
