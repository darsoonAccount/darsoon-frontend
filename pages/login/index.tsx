import React, { useContext, useState } from "react";
import LoginBox from "../../components/LoginBox";
import styled from "styled-components";

const LoginPage = () => {
  return (
    <Div>
      <LoginBox />
    </Div>
  );
};
export default LoginPage;

const Div = styled.div`

display:grid;
place-items: center;
`