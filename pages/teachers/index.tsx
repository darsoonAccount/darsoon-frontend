import { useState, useEffect } from "react";
import styled from "styled-components";
import { useFetch } from "../../contexts/AppProvider";
import { useAuth } from "../../contexts/AuthProvider";
import AddTeacherModal from "./AddTeacherModal";
import TeacherCard from "./TeacherCard";

export default function teachers() {
  const [teachers, setTeachers] = useState(null);

  const { fetchNHandle } = useFetch();

  useEffect(() => {
    fetchNHandle({
      url: "/api/p/teachers",
      handleData: setTeachers,
    });
  }, []);

  return (
    <Page>
      <h2>Teachers</h2>
      <p>Here are all teachers</p>
      {teachers && teachers.length && (
        <div className="card-grid">
          {teachers.map((teacher, index) => {
            return <TeacherCard key={"teacher-" + index} teacher={teacher} />;
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
