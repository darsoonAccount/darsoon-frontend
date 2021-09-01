import React from "react";
import styled from "styled-components";

export default function Table({ children }) {
  return <StyledTable>{children}</StyledTable>;
}
const StyledTable = styled.table`
  margin: -2px;
  display: table;
`;
