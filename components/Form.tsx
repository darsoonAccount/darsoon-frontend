import React, { useState } from "react";
import Styled from "styled-components";
import { themeVars } from "./GlobalStyles";

interface Iprops {
  children?: any;
  submitHandler: (event: object) => void;
}

export default function Form({ children, submitHandler }: Iprops) {
  const [formData, setFormData] = useState(null);

  const formDataChangeHandler = (event) => {
    console.log("here?");

    const key = event.target.name;
    const value = event.target.value;
    setFormData(() => {
      return {
        ...formData,
        [key]: value,
      };
    });
  };

  let elements = React.Children.toArray(children);
  elements = elements.map((element) => {
    if (
      element.type === "input" ||
      element.type.name?.toLowerCase().includes("input")
    ) {
      return React.cloneElement(element, { onChange: formDataChangeHandler });
    }
    return element;
  });

  console.log("Form DAtaAAAA:", formData);

  return <StyledFrom onSubmit={submitHandler}>{elements}</StyledFrom>;
}

const StyledFrom = Styled.form`


/* background: green; */
padding: 2rem;
border-radius: 1rem;

/* max-width: 50ch; */
margin: 0 auto;

display: flex;
flex-direction: column;
align-items: center;
gap: 2rem;
}

`;
