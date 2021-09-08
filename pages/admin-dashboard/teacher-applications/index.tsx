import React, { useEffect, useState } from "react";
import { useContext } from "react";
import styled from "styled-components";
import { AdminDashContext, ADMIN_DASH_ACTIONS } from "../../../contexts/AdminDashContext";
import AdminDashLayout from "../../../layouts/adminDashLayout";
import TeacherApplicationRow from "../../../components-admin-dashboard/TeacherApplicationRow";
import En from "../../../components/translation/En";
import Fa from "../../../components/translation/Fa";

export default function TeacehrApplications() {
  const { adminDashDispatch, adminDashState } = useContext(AdminDashContext);

  return (
    <Div>
      <h2>
        <En>Teacher Applications</En>
        <Fa>درخواست‌های معلم شدن</Fa>
      </h2>
      <p>
        <En>Here are all teacher applications</En>
        <Fa>اینجا تمام درخواست‌ها را می‌بینید:</Fa>
      </p>
      <div className="teacher-applications">
        {!adminDashState.teacherApplications && (
          <p>
            <En>Currently there is no application</En>
            <Fa>در حال حاضر هیچ اپلیکیشنی موجود نیست.</Fa>
          </p>
        )}
        {adminDashState.teacherApplications &&
          adminDashState.teacherApplications.map((item, index) => {
            return <TeacherApplicationRow key={`teacherApplication-${index}`} teacherApplication={item} />;
          })}
      </div>
    </Div>
  );
}

TeacehrApplications.Layout = AdminDashLayout;

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
