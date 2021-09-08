import React from "react";
import styled from "styled-components";
import PageWrapper from "../../components/layout/PageWrapper";
import En from "../../components/translation/En";
import Fa from "../../components/translation/Fa";
export default function aboutPage() {
  return (
    <PageWrapper>
      <h1>
        <En>About Darsoon</En>
        <Fa>درباره درسون</Fa>
      </h1>
      <p>
        <En>Darsoon is an startup who helps Farsi speaking people to connect to great teachers and tutors</En>
        <Fa>درسون استارت‌آپی است برای اینکه فارسی زبانان را به بهترین معلم‌ها متصل کند.</Fa>
      </p>
    </PageWrapper>
  );
}


