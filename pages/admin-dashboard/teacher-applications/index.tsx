import React, { useEffect, useState } from "react";
import { useContext } from "react";
import styled from "styled-components";
import TeacherApplicationsPanel from "../../../components-admin-dashboard/TeacherApplicationsPanel";
import { AdminDashContext, ADMIN_DASH_ACTIONS } from "../../../contexts/AdminDashContext";
import AdminDashLayout from "../../../layouts/adminDashLayout";
import TeacherApplicationRow from "../../../components-admin-dashboard/TeacherApplicationRow";

export default function teacehrApplications() {
  const { adminDashDispatch, adminDashState } = useContext(AdminDashContext);


  return (
    <Div>
      <h2>Teacher Applications</h2>
      <p>Here are all teacher applications</p>
      <div className="teacher-applications">
        {!adminDashState.teacherApplications && <p>Currently there is no application</p>}
        {adminDashState.teacherApplications &&
          adminDashState.teacherApplications.map((item, index) => {
            return <TeacherApplicationRow key={`teacherApplication-${index}`} teacherApplication={item} />;
          })}
      </div>
    </Div>
  );
}

teacehrApplications.Layout = AdminDashLayout;

const Div = styled.div`
  padding: 1.5rem;
  background: ghostwhite;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  display: grid;
  grid-template: 1fr / 1fr;
  gap: 1rem;

  .teacher-applications {
    display: grid;
    grid-template: 1fr / 1fr;
    gap: 1rem;
  }
`;
