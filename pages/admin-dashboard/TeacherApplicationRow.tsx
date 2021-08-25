import React from "react";
import styled from "styled-components";

export default function TeacherApplicationRow({ teacherApplication } :any) {
  console.log("herere", teacherApplication);

  const { teacherApplicationId } = teacherApplication;

  return (
    <Div>
      <div className="preview">
        <p>{teacherApplicationId}</p>
        <p>status</p>
      </div>
      <div className="open-button">
        <a href={`/teacher-applications/${teacherApplicationId}`}>Open</a>
      </div>
    </Div>
  );
}
const Div = styled.div`
  border-radius: 1.5rem;
  background: ghostwhite;
  border: 1px solid gray;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  & > * {
    width: 100%;
  }

  .preview {
    padding: 1.5rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    & > * {
      width: 100%;
    }
  }
  .open-button {
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    & > * {
    width: 100%;
    }
    background-color: green;
    height: 100%;
  }
`;
