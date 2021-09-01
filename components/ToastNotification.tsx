import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";

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
    </Div>
  );
}
const Div = styled.div`
  /* min-width: 15rem; */
  /* width: auto; */
  opacity: 0.8;
  padding: 1.5rem;
  border-radius: 1rem;
  border: 4px solid white;
  color: white;
  background: black;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
 display:flex;
 flex-direction:row;
 justify-content: flex-start;
 align-items:center;
 
  transform: all 2s ease;

  p {
    font-size: 1.4rem;
    text-align: start;
  }

  &.success {
    color: black;
    background-color: lightgreen;
    border-color: green;
  }

  &.warning {
    color: black;
    background-color: lightyellow;
    border-color: orange;
  }

  &.error {
    color: black;
    background-color: pink;
    border-color: orangered;
  }

  &.hidden {
    display: none;
  }
`;
