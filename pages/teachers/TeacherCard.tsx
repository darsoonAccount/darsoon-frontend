import React from "react";
import styled from "styled-components";
export default function TeacherCard({ teacher }) {
  return (
    <Div>
      <img className="profile" alt="teacher-profile" src="/avatar.png"></img>
      <p className='bold'>Teacher Name</p>
      <p>Speciality</p>
      <p>a little bit about this teaceher and how he/she teaches</p>
    </Div>
  );
}
const Div = styled.div`
  padding: 1.5rem;
  border-radius: 1.5rem;
  background: ghostwhite;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  .bold {
      font-weight: 700;
  }
  .profile {
    background: none;
    max-width: 60%;
    border-radius: 30rem;
  }
`;
