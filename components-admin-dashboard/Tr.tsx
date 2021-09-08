import React from "react";
import styled from "styled-components";
import { themeVars } from "../components/layout/GlobalStyles";

export default function Tr(props) {
  const { name, isTextArea } = props;
  // const inputProps = props;
  // if (inputProps.isText) delete inputProps.isTextArea;
  return (
    <StyledTr>
      <th>
        <label>{name}</label>
      </th>
      <td>{isTextArea ? <textarea className="input" rows="4" {...props}></textarea> : <input className="input" {...props} />}</td>
    </StyledTr>
  );
}
const StyledTr = styled.tr`
  th {
    padding: 1rem;
    background: aliceblue;
    text-align: start;
    display: table-cell;
    vertical-align: middle;
    width: 1%;
    white-space: nowrap;
    height: auto;
  }
  td {
    height: auto;
    width: auto;
    padding: 1rem;
    background: lightsteelblue;
    text-align: start;
    color: dimgray;
    display: table-cell;
    vertical-align: middle;
  }

  .input {
    width: 100%;
    display: block;
    border: none;
    background: ghostwhite;
    backdrop-filter: opacity(100%);
    padding-inline: 0.7rem;
    padding-block: 0.6rem;
    border-radius: ${themeVars.borderRadius};
    color: black;
  }

  teaxtarae {
    min-height: 8rem;
    resize: vertical;
    overflow-y: auto;
  }
`;
