import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useApi } from "../../../contexts/AppProvider";
export default function teacherPage({}) {
  const router = useRouter();
  const { username } = router.query;

  const [teacher, setTeacher] = useState(null);

  const { api } = useApi();

  useEffect(() => {
    if (username) {
      api
        .get(`/api/p/teacher/${username}`)
        .then((res) => setTeacher(res.data.data))
        .catch((error) => console.log("Error Request!!!", error.request, "Error Response!!!", error.response));
    }
  }, [username]);

  return (
    <Div>
      {teacher && (
        <>
          <img className="avatar" alt="teacher-profile" src="/avatar.png" />
          <h1>
            {teacher.firstname} {teacher.lastname}
          </h1>
        </>
      )}
    </Div>
  );
}
const Div = styled.div`
  padding: 1.5rem;
  background: ghostwhite;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  .avatar {
    background: none;
    max-width: 60%;
    border-radius: 30rem;
  }
`;
