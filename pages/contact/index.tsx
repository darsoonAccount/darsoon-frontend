import React from "react";
import styled from "styled-components";
import PageWrapper from "../../components/layout/PageWrapper";
import En from "../../components/translation/En";
import Fa from "../../components/translation/Fa";
export default function contactPage() {
  return (
    <PageWrapper>
      <h1>
        <En>Contact Darsoon</En>
        <Fa>با درسون تماس بگیرید</Fa>
      </h1>
      <p>
        <En>You can contact us from one of ways below</En>
        <Fa>شما میتوانید از راه‌های زیر با درسون تماس بگیرید.</Fa>
      </p>
    </PageWrapper>
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
