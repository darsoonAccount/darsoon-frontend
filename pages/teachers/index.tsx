import { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuth } from "../../contexts/AuthProvider";
import fetchAndHandleResponse from "../../utils/fetchAndHandleResponse";
import AddTeacherModal from "./AddTeacherModal";
import TeacherCard from "./TeacherCard";

export default function teachers() {
  const [teachers, setTeachers] = useState(null);

  const { token } = useAuth();

  useEffect(() => {
    // fetch("http://localhost:8000/api/p/teachers")
    //   .then((res) => res.json())
    //   .then((json) => {
    //     setTeachers(json.data);
    //   });
    fetchAndHandleResponse({
      url: "/api/p/teachers",
      method: "GET",
      token: token,
      handleData: setTeachers,
      body: undefined,
      handleMessage: (msg) => alert(msg),
    });
  }, []);

  return (
    <Page>
      <h2>Teachers</h2>
      <p>Here are all teachers</p>
      {teachers && teachers.length && (
        <div className="card-grid">
          {teachers.map((teacher) => {
            return <TeacherCard teacher={teacher} />;
          })}
        </div>
      )}
    </Page>
  );
}

const Page = styled.div`
  width: 100%;
  max-width: 70rem;
  .card-grid {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
  }
`;
