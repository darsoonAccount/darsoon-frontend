import React from "react";
import styled from "styled-components";

export default function PageWrapper({ children, className }) {
  return <StyledPageWrapper className={className}>{children}</StyledPageWrapper>;
}
const StyledPageWrapper = styled.div`
  padding-inline: min(10vw, 2rem);
  padding-block: min(10vh, 5rem);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;
