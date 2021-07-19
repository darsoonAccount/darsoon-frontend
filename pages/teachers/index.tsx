import { useState, useEffect } from "react";
import AddTeacherModal from "./AddTeacherModal";
import TeachersList from "./TeachersList";

export default function teachers() {
  const [teachers, setTeachers] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/teachers")
      .then((res) => res.json())
      .then((json) => {
        setTeachers(json.data);
      });
  }, []);

  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <AddTeacherModal
        isVisible={isVisible}
        closeHandler={() => {
          setIsVisible(false);
        }}
      />
      <h2>Teachers</h2>
      <p>Here is a list of all teachers</p>
      {teachers && <TeachersList teachers={teachers} />}
      <p>
        <a href="/teachers/apply">Become a teacher</a>
      </p>
      <button onClick={() => setIsVisible(true)}>Add a teacher</button>
    </>
  );
}
