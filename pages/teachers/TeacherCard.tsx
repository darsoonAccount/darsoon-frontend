import Link from "next/link";
import React from "react";
import styled from "styled-components";
export default function TeacherCard({ teacher }) {
  const { username, firstname, lastname } = teacher;
  console.log("techer", teacher);
  return (
    <Div>
      <Link href={`/teachers/${username}`}>
        <a className="link-wrapper">
          <img className="avatar" alt="teacher-profile" src="/avatar.png"></img>
          <p className="bold">
            {firstname} {lastname}
          </p>
          <p>Speciality: </p>
          <p>a little bit about this teaceher and how he/she teaches</p>
        </a>
      </Link>
    </Div>
  );
}
const Div = styled.div`
  border-radius: 1.5rem;
  background: ghostwhite;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  .link-wrapper {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  .bold {
    font-weight: 700;
  }
  .avatar {
    background: none;
    max-width: 60%;
    border-radius: 30rem;
  }
`;
