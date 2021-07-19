import styled from "styled-components";

interface porpsInterface {
  teacher: {
    userId: "string";
    teacherId: "string";
    firstName: "string";
    lastName: "string";
    email: "string";
    role: "string";
  };
  isHeader?: "boolean";
}
export default function TeacherListItem({ teacher, isHeader }: porpsInterface) {
  const { userId, teacherId, firstName, lastName, email, role } = teacher;
  return (
    <Div>
      <p>{userId}</p>
      <p>{teacherId}</p>
      <p>{firstName}</p>
      <p>{lastName}</p>
      <p>{email}</p>
      <p>{role}</p>
    </Div>
  );
}

const Div = styled.div`
  background: ghostwhite;
  padding: 1rem;
  display: flex;
  gap: 1rem;
`;
