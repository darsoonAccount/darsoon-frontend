import React from "react";
import styled from "styled-components";

export default function Row({ children }) {
  return <StyledRow>{children}</StyledRow>;
}
const StyledRow = styled.div`
  padding: 1.5rem;
  border-radius: 1.5rem;
  background: ghostwhite;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
`;
