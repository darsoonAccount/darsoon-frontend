import React from "react";
import styled from "styled-components";
import TeacherRow from "../../../components-admin-dashboard/TeacherRow";
import AdminDashLayout from "../../../layouts/adminDashLayout";
const TeachersPage = ({ teachers }) => {
  return (
    <Div>
      <h1>Teachers</h1>
      {teachers && teachers.length > 0 && (
        <div className="teachers">
          {teachers.map((teacher, index) => {
            return <TeacherRow key={`teacher-${index}`} teacher={teacher} />;
          })}
        </div>
      )}
    </Div>
  );
};
export default TeachersPage;

TeachersPage.Layout = AdminDashLayout;

export const getServerSideProps = async () => {
  const res = await fetch("https://darsoon.uc.r.appspot.com/api/p/teacher");
  const json = await res.json();
  const teachers = json.data;

  return {
    props: { teachers },
  };
};
const Div = styled.div`
  padding: 1.5rem;
  background: ghostwhite;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .teachers {
    display: grid;
    gap: 1rem;
  }
`;
