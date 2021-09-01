import Link from "next/link";
import React from "react";
import styled from "styled-components";
import AdminDahshProvider from "../contexts/AdminDashContext";
import AdminDashNav from "./AdminDashNav";

export default function AdminDashLayout({ children }) {
  return (
    <AdminDahshProvider>
      <Div>
        <div className="dashboard-head">
          <h1>
            <Link href="/admin-dashboard">Admin Dashboard</Link>
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
  margin: 2rem;
  overflow: hidden;
  border-radius: 1.5rem;
  background: gainsboro;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  display: grid;
  grid-template-rows: auto 1fr;

  .dashboard-head {
    padding: 0.5rem;
    background: ghostwhite;
    display: grid;
    place-items: center;
    gap: 1rem;
    h1 {
      font-size: 1rem;
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
