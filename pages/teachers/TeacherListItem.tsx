import styled from "styled-components";

interface porpsInterface {
  teacher: {
    userId: "string";
    teacherId: "string";
    firstname: "string";
    lastname: "string";
    email: "string";
    role: "string";
  };
  isHeader?: "boolean";
}
export default function TeacherListItem({ teacher, isHeader }: porpsInterface) {
  const { userId, teacherId, firstname, lastname, email, role } = teacher;
  return (
    <Div>
      <p>{userId}</p>
      <p>{teacherId}</p>
      <p>{firstname}</p>
      <p>{lastname}</p>
      <p>{email}</p>
    </Div>
  );
}

const Div = styled.div`
  background: ghostwhite;
  padding: 1rem;
  display: flex;
  gap: 1rem;
`;
