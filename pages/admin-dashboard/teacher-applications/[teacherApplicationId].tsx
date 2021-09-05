import React, { useContext } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useApi } from "../../../contexts/AppProvider";
import { useState } from "react";
import TeacherApplicationTable from "../../../components-admin-dashboard/TeacherApplicationTable";
import AdminDashLayout from "../../../layouts/adminDashLayout";
import { AdminDashContext } from "../../../contexts/AdminDashContext";
import Table from "../../../components/Table";
import Tr from "../../../components-admin-dashboard/Tr";

export default function TeacherApplicationPage({ teacherApplication }) {
  const { applicantUser } = teacherApplication;
  const { adminDashState } = useContext(AdminDashContext);

  const applicantUserId = teacherApplication.applicantUserId;

  return (
    <Div>
      <h2>Teacher Application</h2>
      <div className='table-panel'>
        <Table>
          <Tr name="Teacher Application Id" defaultValue={teacherApplication.teacherApplicationId} />
          <Tr name="Applicant firstname" defaultValue={applicantUser.lastname} />
          <Tr name="Applicant lastame" defaultValue={applicantUser.firsname} />
          <Tr name="Application Status" defaultValue={teacherApplication.status} />
          <Tr name="Admin Reviewed" defaultValue={teacherApplication.adminReviewrId} />
          <Tr name="Admin Comments" defaultValue={teacherApplication.teacherApplicationId} />
          <Tr name="Teacher Application" defaultValue={teacherApplication.teacherApplicationId} />
        </Table>
      </div>
      {teacherApplication && <TeacherApplicationTable teacherApplication={teacherApplication} />}
    </Div>
  );
}

export async function getServerSideProps(context) {
  const { teacherApplicationId } = context.params;
  const req = await fetch(`http://localhost:8000/api/j/teacherApplication/${teacherApplicationId}`);
  const json = await req.json();

  return {
    props: {
      teacherApplication: json.data,
    },
  };
}

TeacherApplicationPage.Layout = AdminDashLayout;

const Div = styled.div`
  padding: 1.5rem;
  background: ghostwhite;
  display: grid;
  grid-template: 1fr / 1fr;
  gap: 2rem;

  .table-panel {

    overflow: hidden;
    border-radius: 1.5rem;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
`;
