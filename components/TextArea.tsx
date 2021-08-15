import React from "react";
import Styled from "styled-components";
import { themeVars } from "./GlobalStyles";

const TextArea = (props) => {
  const { label, placeholder } = props;
  return (
    <Div>
      <textarea
        rows="4"
        className="input"
        {...props} // this line should be after type='text' becasue in some cases props overwrite type attribute
        name={label.toLowerCase()}
        placeholder={placeholder ? placeholder : label}
      />
      <label className="label" htmlFor={label.toLowerCase()}>
        {placeholder ? placeholder : label}
      </label>
    </Div>
  );
};

export default TextArea;

const Div = Styled.div`


  position:relative; 
  display: flex;
  flex-direction: column;
  /* overflow: hidden; */

.input	{
    resize:vertical;
  font-size: 1.2em;
  padding: 1rem;
  display:block;
  border: none;
  outline: 2px solid ${themeVars.lightGray};
  border-radius: 0.5rem;
  background: ghostwhite;
  overflow: hidden;
}

.input:focus { outline: 2px solid ${themeVars.primaryColor}; }

.input::placeholder {
  color: transparent;
}



label {
  text-align: left;
  pointer-events: none;
  color:#999; 
  font-size:1.2em;
  position:absolute;
  left: 1rem;
  top: 1.25rem;
  transition:0.2s ease all; 
  -moz-transition:0.2s ease all; 
  -webkit-transition:0.2s ease all;
  overflow: hidden;
  
}

.input:not(:placeholder-shown) + label {
  top:-20px;
  font-size:1em;
  color: ${themeVars.accentColor};}
`;