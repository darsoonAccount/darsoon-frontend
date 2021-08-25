import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useApi } from "../../contexts/AppProvider";
import TeacherApplicationRow from "./TeacherApplicationRow";
export default function TeacherApplicationsPanel() {
  const { api } = useApi();
  const [teacherApplications, setTeacherAppliacions] = useState(null);

  useEffect(() => {
    api
      .get("/api/teacherApplications")
      .then((res) => setTeacherAppliacions(res.data.data))
      .catch((error) => {
        console.log("Error Request!!!", error.request, "Error Response!!!", error.response);
      });
  }, []);


  return (
    <Div>
      <h2>Teacher Applications</h2>
      {teacherApplications &&
        teacherApplications.map((item, index) => {
        return (<TeacherApplicationRow key={`teacherApplication-${index}`} teacherApplication={item}/>);
        })}
    </Div>
  );
}
const Div = styled.div`
  padding: 1.5rem;
  border-radius: 1.5rem;
  background: ghostwhite;
  border: 1px solid gray;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  & > * {
  width: 100%;
  }
`;
