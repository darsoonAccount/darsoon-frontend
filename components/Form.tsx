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
  handleDataAfterSuccess: (data: any) => void;
}

export default function Form({
  children,
  url,
  method,
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
        console.log('here!', data); 
         handleDataAfterSuccess(data)},
    });

    setIsLoading(false);
  };

  return (
    <>
      <StyledFrom onSubmit={submitHandler}>
        {children}
        {isLoading && <Loading />}
        {message && <p className="message">{message}</p>}
      </StyledFrom>
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

.message {
  border: 3px solid ${themeVars.accentColor};
  border-radius: ${themeVars.borderRadius};
  padding: 1rem;
  }
}
`;
