import React from "react";
import styled from "styled-components";

export default function TeacherRow({ teacher }) {
  const { firstname, lastname, username } = teacher;

  return (
    <Div>
      <p>Firstname: {firstname}</p>
      <p>Lasttname: {lastname}</p>
      <p>username: {username}</p>
    </Div>
  );
}
const Div = styled.div`
  padding: 1.5rem;
  border-radius: 1.5rem;
  background: ghostwhite;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  display: flex;
  gap: 1rem;
`;
