import React from "react";
import styled from "styled-components";
import En from "../../components/translation/En";
import Fa from "../../components/translation/Fa";
export default function aboutPage() {
  return (
    <Page>
      <h1>
        <En>About Darsoon</En>
        <Fa>درباره درسون</Fa>
      </h1>
      <p>
        <En>Darsoon is an startup who helps Farsi speaking people to connect to great teachers and tutors</En>
        <Fa>درسون استارت‌آپی است برای اینکه فارسی زبانان را به بهترین معلم‌ها متصل کند.</Fa>
      </p>
    </Page>
  );
}
const Page = styled.div`
  padding: 1.5rem;
  border-radius: 1.5rem;
  background: ghostwhite;
  display: grid;
  place-items: center;
  gap: 1rem;
`;
