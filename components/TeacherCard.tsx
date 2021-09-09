import Link from "next/link";
import React from "react";
import styled from "styled-components";
import Img from "./Img";
import En from "./translation/En";
import Fa from "./translation/Fa";
export default function TeacherCard({ teacher }) {
  // console.log(teacher);

  const { username, firstname, lastname, firstnameFa, lastnameFa } = teacher;

  return (
    <Div>
      <Link href={`/teachers/${username}`}>
        <a className="link-wrapper">
          <Img className="avatar" alt="teacher-profile" src="/avatar.png" />
          <p className="bold">
            <En>
              {firstname} {lastname}
            </En>
            <Fa>
              {firstnameFa} {lastnameFa}
            </Fa>
          </p>
          <p>
            <En>Specialities:</En>
            <Fa>تخصص‌ها: </Fa>
          </p>
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
    width: 10rem;
    border-radius: 30rem;
  }
`;
