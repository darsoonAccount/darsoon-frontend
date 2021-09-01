import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import AdminDashLayout from "../../layouts/adminDashLayout";

export default function AdminDashboard() {
  return (
    <Div>
      <p>You are in Admin Dashboard.</p>
    </Div>
  );
}
AdminDashboard.Layout = AdminDashLayout;

const Div = styled.div`
  display: grid;
  place-items: center;
`;
