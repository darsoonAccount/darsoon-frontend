import React from "react";
import styled from "styled-components";

interface Iprops {
  children: [React.ReactNode, React.ReactNode];
}

export default function TT({ children }: Iprops) {
  return <>{children}</>;
}
const Div = styled.div`
  padding: 1.5rem;
  border-radius: 1.5rem;
  background: ghostwhite;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  display: grid;
  place-items: center;
`;
