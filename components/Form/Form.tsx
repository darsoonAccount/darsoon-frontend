import React, { useState } from "react";
import { useContext } from "react";
import Styled from "styled-components";
import { useApi, useNotif } from "../../contexts/AppProvider";
import { themeVars } from "../../styles/GlobalStyles";
import Loading from "../layout/Loading";
import En from "../translation/En";
import Fa from "../translation/Fa";

interface Iprops {
  children?: any;
  url: string;
  handleDataAfterSuccess?: (data: any) => void;
  handleFail?: (error: any) => void;
  isTwoColumns?: boolean;
}

export default function Form({ children, url, handleDataAfterSuccess, handleFail, isTwoColumns }: Iprops) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const { api } = useApi();
  const { notify } = useNotif();

  const submitHandler = (event) => {
    if (isLoading) {
      return; //prevent multi button press accidents.
    }

    event.preventDefault();
    setIsLoading(true);
    setMessage(null);

    //do thigns if neccessary

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
        if (handleFail) {
          handleFail(error);
        } else {
          if (error.response.data) {
            notify({ en: error.response.data.message, fa: error.response.data.messageFa, type: "error" });
          } else {
            notify({ en: error.message, fa: error.message, type: "error" });
          }
        }
      });
    setIsLoading(false);
  };

  return (
    <>
      <StyledFrom onSubmit={submitHandler} className={isTwoColumns ? "two-columns" : "one-column"}>
        <div className="inputs">{children}</div>
        <p>
          <En>* Fields with start must be filled.</En>
          <Fa>* فیلدهای ستاره‌دار الزامی هستند.</Fa>
        </p>
        {isLoading && <Loading />}
        {message && <p className="message">{message}</p>}
      </StyledFrom>
    </>
  );
}

const StyledFrom = Styled.form`
p {
    color: gray;
  }

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
    color: gray;
  }

h2, h3, h4 {
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
