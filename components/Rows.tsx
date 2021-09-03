import React from "react";
import styled from "styled-components";

export default function Rows({ children }) {
  return <Div>{children}</Div>;
}
const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  & > * {
    width: 100%;
  }
`;
