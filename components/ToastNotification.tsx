import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { FiX } from "react-icons/fi";

export default function ToastNotification({ message, type }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false);
    }, 10000);
  }, []);

  return (
    <Div className={isVisible ? `${type}` : `${type} hidden`}>
      <p>{message}</p>
      <button
        className="close-button"
        onClick={() => {
          setIsVisible(false);
        }}
      >
        <FiX size={20} />
      </button>
    </Div>
  );
}
const Div = styled.div`
  min-width: min(15rem, 60vw);
  max-width: 80vw;
  pointer-events: auto;
  border-radius: 1rem;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  background-color: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(4px);
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  overflow-wrap: anywhere;
  overflow: auto;
  transform: all 2s ease;

  p {
    padding: 1.5rem;
    padding-inline-end: 0;
    font-size: 1.4rem;
    text-align: start;
    word-wrap: break-all;
  }

  .close-button {
    padding: 1.5rem;
    background: none;
    color: inherit;
    cursor: pointer;
  }

  &.success {
    color: darkgreen;
    color: black;
    background-color: rgba(50, 205, 50, 0.85);
    border-color: green;
  }

  &.warning {
    color: #ab7002;
    color: black;
    background-color: rgba(255, 215, 0, 0.85);
    border-color: orange;
  }

  &.error {
    color: darkred;
    color: black;
    background-color: rgba(240, 128, 128, 0.85);
    border-color: orangered;
  }

  &.hidden {
    display: none;
  }
`;
