import React from "react";
import styled from "styled-components";
import En from "../components/translation/En";
import Fa from "../components/translation/Fa";
import { themeVars } from "../styles/GlobalStyles";

interface Iprops {
  labelEn: string;
  labelFa?: string;
  name: string;
  isHidden?: boolean;
  placeholderEn?: string;
  placeholderFa?: string;
  isTextarea?: boolean;
  defaultValue?: any;
  [key: string]: any;
}

export default function Tr(props: Iprops) {
  const { name, labelFa, labelEn, isTextArea, defaultValue } = props;
  // const inputProps = props;
  // if (inputProps.isText) delete inputProps.isTextArea;
  return (
    <StyledTr>
      <th>
        <label>
          <Fa>{labelFa}</Fa>
          <En>{labelEn}</En>
        </label>
      </th>
      <td>{isTextArea ? <textarea className="input" rows={4} {...props}></textarea> : <input name={name} defaultValue={defaultValue} className="input" {...props} />}</td>
    </StyledTr>
  );
}
const StyledTr = styled.tr`
display: flex;
justify-content: stretch;
  th {
    padding: 0.3rem;
    text-align: start;
    display: table-cell;
    vertical-align: middle;
    width: 20rem;
    white-space: nowrap;
    height: auto;
    text-align: end;
    vertical-align: middle;
    
    label {
      vertical-align: middle;
      text-align: end;
    }
  }
  td {
    height: auto;
    width: 40rem;
    padding: 0.3rem;
    text-align: start;
    color: dimgray;
    display: table-cell;
    vertical-align: middle;
  }

  .input {
    width: 100%;
    display: block;
    border: 1px solid lightgray;
    background: ghostwhite;
    backdrop-filter: opacity(100%);
    padding-inline: 0.7rem;
    padding-block: 0.1rem;
    border-radius: 0.3rem;
    color: black;
  }

  textarea {
    min-height: 8rem;
    resize: vertical;
    overflow-y: auto;
  }
`;
