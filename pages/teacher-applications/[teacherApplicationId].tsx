import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useApi } from "../../contexts/AppProvider";
import { useState } from "react";
import Table from "../../components/Table";
export default function TeacherApplicationPage() {
  const router = useRouter();
  const { teacherApplicationId } = router.query;
  const { api } = useApi();

  const [teacherAppliaction, setTeacherAppliaction] = useState(null);

  console.log(teacherApplicationId);

  useEffect(() => {
    if (teacherApplicationId) {
      api
        .get(`/api/teacherApplications/${teacherApplicationId}`)
        .then((res) => setTeacherAppliaction(res.data.data))
        .catch((error) => {
          console.log("Error Request!!!", error.request, "Error Response!!!", error.response);
        });
    }
  }, [teacherApplicationId]);

  return (
    <Div>
      <h2>Teacher Application</h2>
      {teacherAppliaction && <Table object={teacherAppliaction} />}
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
`;
