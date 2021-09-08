import React from "react";
import { FiInfo } from "react-icons/fi";
import styled from "styled-components";
import { themeVars } from "../../styles/GlobalStyles";

export default function InfoBox({ children }) {
  return (
    <Div>
      <div className='icon'>
      <FiInfo size="28" />
      </div>
      <p>{children}</p>
    </Div>
  );
}
const Div = styled.div`
max-width: 50ch;
  border-radius: 1.5rem;
  background: ghostwhite;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 0.2rem;
  border-radius: ${themeVars.borderRadius};
  background: lightgray;
  color: dimgray;
  overflow: hidden;

  .icon {
    padding: 1rem;
  }

  p {
    padding: 1rem;
    background: whitesmoke;
  }
`;
