import Link from "next/link";
import React from "react";
import styled from "styled-components";
import AdminDahshProvider from "../contexts/AdminDashContext";
import AdminDashNav from "../components-admin-dashboard/AdminDashNav";
import En from "../components/translation/En";
import Fa from "../components/translation/Fa";

export default function AdminDashLayout({ children }) {
  return (
    <AdminDahshProvider>
      <Div>
        <div className="dashboard-head">
          <h1>
            <Link href="/admin-dashboard">
              <a>
                <Fa>داشبورد ادمین</Fa>
                <En>Admin Dashboard</En>
              </a>
            </Link>
          </h1>
        </div>
        <div className="dashboard-body">
          <AdminDashNav />
          <div className="panel">{children}</div>
        </div>
      </Div>
    </AdminDahshProvider>
  );
}
const Div = styled.div`

  overflow: hidden;
  background: gainsboro;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  display: grid;
  grid-template-rows: auto 1fr;

  .dashboard-head {
    padding: 0.5rem;
    background: rebeccapurple;
    display: grid;
    place-items: center;
    gap: 1rem;
    h1 {
      font-size: 1rem;
      color: white;
      margin: 0;
    }
  }
  .dashboard-body {
    display: grid;
    grid-template-columns: auto 1fr;
    /* grid-template-rows: 1fr; */

    .panel {
      display: grid;
      grid-template: 1fr / 1fr;
    }
  }
`;
