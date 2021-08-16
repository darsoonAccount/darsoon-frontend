import React, { useState } from "react";
import { useContext } from "react";
import Styled from "styled-components";
import { AppContext } from "../contexts/AppProvider";
import { useAuth } from "../contexts/AuthProvider";
import { themeVars } from "./GlobalStyles";
import Loading from "./Loading";
import fetchAndHandleResponse from "../utils/fetchAndHandleResponse";

interface Iprops {
  children?: any;
  url: string;
  method: string;
  buttonText?: string;
  handleDataAfterSuccess?: (data: any) => void;
}

export default function Form({
  children,
  url,
  method,
  buttonText,
  handleDataAfterSuccess,
}: Iprops) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const { token } = useAuth();

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

    fetchAndHandleResponse({
      url,
      method,
      body: formData,
      token,
      handleMessage: (message) => setMessage(message),
      handleData: (data) => {
        console.log("here!", data);
        handleDataAfterSuccess(data);
      },
    });

    setIsLoading(false);
  };

  return (
    <>
      <StyledFrom onSubmit={submitHandler}>
        <div className="inputs">{children}</div>
        {isLoading && <Loading />}
        {message && <p className="message">{message}</p>}
        <button type="submit">{buttonText ?? "Submit"}</button>
      </StyledFrom>
    </>
  );
}

const StyledFrom = Styled.form`
max-width: 1000px;
width: 100%;
padding: 2rem;
border-radius: 1rem;
margin: 0 auto;

display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
gap: 2rem;

.inputs {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}

.message {
  border: 3px solid ${themeVars.accentColor};
  border-radius: ${themeVars.borderRadius};
  padding: 1rem;
  }
}
`;
