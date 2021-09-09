import React from "react";
import styled from "styled-components";
import En from "../components/translation/En";
import Fa from "../components/translation/Fa";

export default function ApplicationSubmittedBox() {
  return (
    <Div>
      <h1>
      <En>Your Application is successfully submited</En>
      <Fa>درخواست شما با موفقیت ثبت شد.</Fa>

      </h1>
      <p>
        <En>We will reach out to you if you are good match</En>
        <Fa>در صورتی که بتوانیم با شما همکاری کنیم با شما تماس خواهیم گرفت.</Fa>
      </p>
    </Div>
  );
}
const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;
