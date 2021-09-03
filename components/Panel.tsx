import React from "react";
import styled from "styled-components";

export default function Panel({ children }) {
  return <Div>{children}</Div>;
}
const Div = styled.div`
  padding: 1rem;
  border-radius: 1rem;
  background: ghostwhite;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  
`;
