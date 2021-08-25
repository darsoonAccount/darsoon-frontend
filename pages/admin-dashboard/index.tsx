import React from "react";
import styled from "styled-components";
import TeacherApplicationsPanel from "../../components/adminDashboardComponents/TeacherApplicationsPanel";
import AdminDashNav from "../../layouts/AdminDashNav";
import { themeVars } from "../../components/GlobalStyles";
import AdminDashLayout from "../../layouts/adminDashLayout";

export default function AdminDashboard() {
  return (
    <Div>
      <h1>Admin Dashboard!</h1>
    </Div>
  );
}
AdminDashboard.Layout = AdminDashLayout;

const Div = styled.div``;
