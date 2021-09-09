import React from "react";
import styled from "styled-components";

interface Iprops {
  children: any;
}

export default function Cards({ children }: Iprops) {
  return <Div>{children}</Div>;
}
const Div = styled.div`
width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;
