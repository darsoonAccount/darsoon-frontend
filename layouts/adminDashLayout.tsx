import React from "react";
import styled from "styled-components";
import AdminDashNav from "./AdminDashNav";

export default function AdminDashLayout({ children }) {
  return (
    <Div>
      <AdminDashNav />
      <div>{children}</div>
    </Div>
  );
}
const Div = styled.div`
  margin: 2rem;
  overflow: hidden;
  border-radius: 1.5rem;
  background: gainsboro;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  display: grid;
  grid-template-columns: auto 1fr;

  div {
    padding: 1.5rem;
  }
`;
