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
import PageWrapper from "../../../components/layout/PageWrapper";

export default function TeacherApplicationPage({ teacherApplication }) {
  return <Page>{teacherApplication && <TeacherApplicationTable teacherApplication={teacherApplication} />}</Page>;
}

export async function getServerSideProps(context) {
  const { teacherApplicationId } = context.params;
  const req = await fetch(`https://darsoon.uc.r.appspot.com/api/j/teacherApplication/${teacherApplicationId}`);
  const json = await req.json();

  return {
    props: {
      teacherApplication: json.data,
    },
  };
}

TeacherApplicationPage.Layout = AdminDashLayout;

const Page = styled.div`
  padding: 2rem;
  background: ghostwhite;
  display: grid;
  grid-template: 1fr / 1fr;
  gap: 2rem;
`;
