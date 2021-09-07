import React, { useState } from "react";
import { useContext } from "react";
import Styled from "styled-components";
import { AppContext, useApi, useNotif } from "../contexts/AppProvider";
import { useAuth } from "../contexts/AuthProvider";
import { themeVars } from "./GlobalStyles";
import Loading from "./Loading";

interface Iprops {
  children?: any;
  url: string;
  method: string;
  buttonText?: string;
  handleDataAfterSuccess?: (data: any) => void;
  isTwoColumns?: boolean;
}

export default function Form({ children, url, method, buttonText, handleDataAfterSuccess, isTwoColumns }: Iprops) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const { api } = useApi();
  const { notify } = useNotif();

  const submitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage(null);

    //collectdata from form and put it inside an object:
    const formData = {};
    const formElement = event.target;
    const formInputs = Array.from(formElement.querySelectorAll("input, textarea"));
    type inputOrTextAreaHTMLElement = HTMLInputElement | HTMLTextAreaElement;
    formInputs.forEach((inputElement: inputOrTextAreaHTMLElement) => {
      if (inputElement.type === "number") {
        formData[inputElement.name] = Number(inputElement.value);
      } else {
        formData[inputElement.name] = inputElement.value;
      }
    });

    api
      .post(url, formData)
      .then((res) => {
        handleDataAfterSuccess(res.data.data);
      })
      .catch((error) => {
        if (error.response.data) {
          notify(error.response.data.message, "error");
        } else {
          notify(error.message, "error");
          console.log("Login Error:", error);
        }
      });
    setIsLoading(false);
  };

  return (
    <>
      <StyledFrom onSubmit={submitHandler} className={isTwoColumns ? "two-columns" : "one-column"}>
        <div className="inputs">{children}</div>
        {isLoading && <Loading />}
        {message && <p className="message">{message}</p>}
        <button className="button" type="submit">
          {buttonText ?? "Submit"}
        </button>
      </StyledFrom>
    </>
  );
}

const StyledFrom = Styled.form`
 &.two-columns {
  max-width: 1200px;
}

&.one-column {
  max-width: 600px; 
}

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
}

.inputs {

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
