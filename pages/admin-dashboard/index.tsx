import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import En from "../../components/translation/En";
import Fa from "../../components/translation/Fa";
import AdminDashLayout from "../../layouts/adminDashLayout";

export default function AdminDashboard() {
  return (
    <Div>
      <p>
        <En>You are in Admin Dashboard.</En>
        <Fa>شما در داشبورد ادمین هستید.</Fa>
      </p>
    </Div>
  );
}
AdminDashboard.Layout = AdminDashLayout;

const Div = styled.div`
  display: grid;
  place-items: center;
`;
