import { useState, useEffect } from "react";
import styled from "styled-components";
import Loading from "../../components/layout/Loading";
import { useApi } from "../../contexts/AppProvider";
import { useAuth } from "../../contexts/AuthProvider";
import TeacherCard from "../../components/TeacherCard";
import En from "../../components/translation/En";
import Fa from "../../components/translation/Fa";

export default function Teachers() {
  const [teachers, setTeachers] = useState(null);

  const { api } = useApi();

  useEffect(() => {
    api
      .get("api/p/teacher")
      .then((res) => setTeachers(res.data.data))
      .catch((error) => console.log("Error Request!!!", error.request, "Error Response!!!", error.response));
  }, []);

  return (
    <Page>
      <h2>
        <En>Teachers</En>
        <Fa>معلم‌ها</Fa>
      </h2>
      <p>
        <En>Here are all teachers</En>
        <Fa>همه معلم‌ها درسون را می‌توانید اینجا ببینید:</Fa>
      </p>
      {!teachers && <Loading />}
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
  margin: 0 auto;
  padding: 2em 2em;
  width: 100%;
  display: grid;
  place-items: center;
  gap: 1rem;

  max-width: 70rem;
  .card-grid {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
  }
`;
