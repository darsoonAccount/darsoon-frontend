import React, { useState } from "react";
import { useContext } from "react";
import Styled from "styled-components";
import { AppContext, useApi } from "../contexts/AppProvider";
import { useAuth } from "../contexts/AuthProvider";
import { themeVars } from "./GlobalStyles";
import Loading from "./Loading";

interface Iprops {
  children?: any;
  url: string;
  method: string;
  buttonText?: string;
  handleDataAfterSuccess?: (data: any) => void;
}

export default function Form({ children, url, method, buttonText, handleDataAfterSuccess }: Iprops) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const { api } = useApi();

  const submitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage(null);

    //put form data inside a Object:
    const formData = {};
    const formElement = event.target;
    const formInputs = Array.from(formElement.querySelectorAll("input, textarea"));
    formInputs.forEach((inputElement) => {
      console.log(inputElement.type);
      if (inputElement.type === "number") {
        
        formData[inputElement.name] = Number(inputElement.value);
      } else {
        formData[inputElement.name] = inputElement.value;
      }
    });

    console.log("Form Data", formData);
    api
      .post(url, formData)
      .then((res) => {
        handleDataAfterSuccess(res.data.data);
      })
      .catch((error) => {
        setMessage(error.response.data.message);
        console.log("Error Request!!!", error.request, "Error Response!!!", error.response);
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
max-width: 1200px;
padding: 2rem;
border-radius: 1rem;
margin: 0 auto;


display:flex;
flex-direction:column;
justify-content:center;
align-items:center;  
width: 100%; 
 gap: 2rem;

.inputs {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;

  p {
    font-weight: 700;
    color: ${themeVars.primaryColor};
  }
  
  p + div {
    grid-column-start: 1;
  }
  
  div + p {
    grid-column-start: 1;
    
  }
}

.message {
  border: 3px solid ${themeVars.accentColor};
  border-radius: ${themeVars.borderRadius};
  padding: 1rem;
  }
}
`;
