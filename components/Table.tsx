import React from "react";
import styled from "styled-components";
import { FiEdit, FiCheck, FiInfo } from "react-icons/fi";
import { useState } from "react";
import { themeVars } from "./GlobalStyles";

export default function Table({ object }) {
  const [objectState, setObjectState] = useState(object);
  const keys = Object.keys(objectState);

  const [isEditMode, setIsEditMode] = useState(false);

  const handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;

    setObjectState(() => {
      return { ...objectState, [key]: value };
    });
  };

  return (
    <Div>
      <div className="panel">
        {!isEditMode ? (
          <button className="edit-button" onClick={() => setIsEditMode(true)}>
            <FiEdit /> Edit
          </button>
        ) : (
          <button className="edit-button edit-button-edit-mode" onClick={() => setIsEditMode(false)}>
            <FiCheck /> Finish Editing
          </button>
        )}
      </div>
      <table>
        {keys.map((key) => {
          return (
            <tr>
              <th>{key}</th>
              {!isEditMode ? (
                <td>{objectState[key]}</td>
              ) : (
                <td className={isEditMode && "td-edit-mode"}>
                  <input className="input" name={key} defaultValue={objectState[key]} onChange={handleChange}></input>
                </td>
              )}
            </tr>
          );
        })}
      </table>
      <div className="panel">
        <p className="info">
          <FiInfo/> You can edit some fields before accepting teacher application. Uss Edit button at the top.
        </p>
        <div className="buttons">
          <button className="reject small-button" disabled={isEditMode}>Reject</button>
          <button className="accept small-button"  disabled={isEditMode}>Accept</button>
        </div>
      </div>
    </Div>
  );
}
const Div = styled.div`
  overflow: hidden;
  border-radius: 1.5rem;
  background: ghostwhite;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .panel {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  .info {
    padding: 1rem;
    border-radius: ${themeVars.borderRadius};
    background: lightgray;
    font-size: 0.7em;
    color: dimgray;
  }

  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  .edit-button {
    padding-inline: 1rem;
    min-width: 6rem;
    font-size: 1rem;
    font-weight: 400;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 0.2rem;
  }

  .edit-button-edit-mode {
    color: white;
    background: teal;
  }

  table {
    /* border: none; */
    /* border-collapse: collapse; */
    margin: -2px;
  }

  th {
    padding: 1rem;
    background: lightgray;
    text-align: start;
    display: table-cell;
    vertical-align: middle;
  }
  td {
    padding: 1rem;
    background: lightsteelblue;
    text-align: start;
    color: dimgray;
    display: table-cell;
    vertical-align: middle;
  }

  .td-edit-mode {
    padding-block: 0.4rem;
    padding-inline: 0.3rem;
  }

  .input {
    display: block;
    border: none;
    background: white;
    padding-inline: 0.7rem;
    padding-block: 0.6rem;
    border-radius: ${themeVars.borderRadius};
    height: 100%;
    color: black;
  }

  .accept {
    background: mediumaquamarine;
    & :disabled {
      background: grey;
    }
  }
  
  .reject {
    background: lightcoral;
  }
  & :disabled {
    background: grey;
  }
`;
