import Link from "next/link";
import React from "react";
import styled from "styled-components";
import En from "../components/translation/En";
import Fa from "../components/translation/Fa";

export default function TeacherApplicationRow({ teacherApplication }: any) {
  const { teacherApplicationId, status, applicantUser } = teacherApplication;

  return (
    <Div>
      <div className="preview">
        <p>
          <span className="label">
            <En>Firstname:</En>
            <Fa>نام:</Fa>
          </span>
          <En>{applicantUser.firstname}</En>
          <Fa>{applicantUser.firstnameFa}</Fa>
        </p>
        <p>
          <span className="label">
            <En>Lastname:</En>
            <Fa>نام خانوادگی:</Fa>
          </span>
          <En>{applicantUser.lastname}</En>
          <Fa>{applicantUser.lastnameFa}</Fa>
        </p>
        <p>
          <span className="label">
            <En>Status:</En>
            <Fa>وضعیت:</Fa>
          </span>
          <En>{status}</En>
          <Fa>{status}</Fa>
        </p>
        <Link href={`/admin-dashboard/teacher-applications/${teacherApplicationId}`}>
          <a className="small-button">
            <En>Open</En>
            <Fa>باز کنید</Fa>
          </a>
        </Link>
      </div>
    </Div>
  );
}
const Div = styled.div`
  border-radius: 1.5rem;
  background: ghostwhite;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  & > * {
    width: 100%;
  }

  .label {
    opacity: 0.4;
  }

  .preview {
    overflow: hide;
    padding: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    & > * {
      width: 100%;
    }
  }

  a {
    flex: 0;
    text-align: center;
    height: 100%;
    background-color: dimgray;
    color: white;
    padding: 1rem;
  }
`;
