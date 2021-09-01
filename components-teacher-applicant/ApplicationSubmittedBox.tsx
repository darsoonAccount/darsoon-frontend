import React from "react";
import styled from "styled-components";

export default function ApplicationSubmittedBox() {
  return (
    <Div>
      <h1>Your Application is successfully submited</h1>
      <p>We will reach out to you if you are good match</p>
    </Div>
  );
}
const Div = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
gap: 2rem;
`;
