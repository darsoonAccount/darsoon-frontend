import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Teachers from "..";
import Img from "../../../components/Img";
import En from "../../../components/translation/En";
import Fa from "../../../components/translation/Fa";
import { useApi } from "../../../contexts/AppProvider";
export default function TeacherPage({}) {
  const router = useRouter();
  const { username } = router.query;

  const [teacher, setTeacher] = useState(null);

  const { api } = useApi();

  useEffect(() => {
    if (username) {
      api
        .get(`/api/p/teacher/${username}`)
        .then((res) => setTeacher(res.data.data))
        .catch((error) => console.log("Error Request!!!", error.request, "Error Response!!!", error.response));
    }
  }, [username]);

  return (
    <Div>
      {teacher && (
        <>
          <Img className="avatar" alt="teacher-profile" src="/avatar.png" />
          <h1>
            <En>
              {teacher.firstname} {teacher.lastname}
            </En>
            <Fa>
              {teacher.firstnameFa} {teacher.lastnameFa}
            </Fa>
          </h1>
          <En>
            <h2>Expertises: </h2>
          </En>
          <Fa>
            <h2>تخصص‌ها: </h2>
          </Fa>
          <h2>
            <En>Classses:</En>
            <Fa>کلاس‌ها:</Fa>
          </h2>

          <p>
            <En>Here list of classes {teacher.firstname} teaches.</En>
            <Fa>
              در اینجا کلاس‌هایی که {teacher.firstnameFa}
              درس‌ می‌دهد را می‌بینید
            </Fa>
          </p>

          <h2>
            <En>Biography</En>
            <Fa>بیوگرافی</Fa>
          </h2>
          <p>
            <En>{teacher.bio}</En>
            <Fa>{teacher.bioFa}</Fa>
          </p>

          <h2>
            <En>Method of Teaching</En>
            <Fa>شیوه آموزش</Fa>
          </h2>
          <p>
            <En>{teacher.teachingMethod}</En>
            <Fa>{teacher.teachingMethodFa}</Fa>
          </p>

          <h2>
            <En>Experiences</En>
            <Fa>تجربه‌ها</Fa>
          </h2>
          <p>
            <En>{teacher.experience}</En>
            <Fa>{teacher.experienceFa}</Fa>
          </p>
        </>
      )}
    </Div>
  );
}
const Div = styled.div`
  padding: 1.5rem;
  background: ghostwhite;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  .avatar {
    background: none;
    width: 20rem;
    max-width: 60%;
    border-radius: 30rem;
  }
`;
