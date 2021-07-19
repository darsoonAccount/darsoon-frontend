import styled from "styled-components";
import TeacherListItem from "./TeacherListItem";

interface propsInterface {
  teachers: teacher[];
}
interface teacher {
  userId: "string";
  teacherId: "string";
  firstName: "string";
  lastName: "string";
  email: "string";
  role: "string";
}

const teacherHeader = {
  userId: "User ID",
  teacherId: "Teacher ID",
  firstName: "Firstname",
  lastName: "Lastname",
  email: "Email",
  role: "Role",
};

export default function TeachersList({ teachers }: propsInterface) {
  return (
    <Div>
      <TeacherListItem teacher={teacherHeader} isHeader={true} />
      {teachers &&
        teachers.length > 0 &&
        teachers.map((teacher, index) => {
          return (
            <TeacherListItem
              key={"teacherListItem-" + index}
              teacher={teacher}
              isHeader={false}
            />
          );
        })}
    </Div>
  );  
}

const Div = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
