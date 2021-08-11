import React, { useState } from "react";
import Styled from "styled-components";
import { themeVars } from "./GlobalStyles";
import Loading from "./Loading";

interface Iprops {
  children?: any;
  url: string;
  method: string;
}

export default function Form({ children, url, method }: Iprops) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const submitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage(null);

    //put form data inside a Object:
    const formData = {};
    const formElement = event.target;
    const formInputs = Array.from(
      formElement.querySelectorAll("input, textarea")
    );
    formInputs.forEach((inputElement) => {
      formData[inputElement.name] = inputElement.value;
    });

    fetch("http://localhost:8000" + url, {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) setMessage(res.statusText);
        return res;
      })
      .then((res) => res.json())
      .then((json) => setMessage(json.message));
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : message ? (
        <p>{message}</p>
      ) : (
        <StyledFrom onSubmit={submitHandler}>{children}</StyledFrom>
      )}
    </>
  );
}

const StyledFrom = Styled.form`
padding: 2rem;
border-radius: 1rem;
margin: 0 auto;
display: flex;
flex-direction: column;
align-items: center;
gap: 2rem;
}
`;
