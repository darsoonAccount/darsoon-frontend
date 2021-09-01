import React from "react";
import Styled from "styled-components";
import { themeVars } from "./GlobalStyles";

const TextArea = (props) => {
  const { label, placeholder, name } = props;
  return (
    <Div>
      <textarea
        rows="4"
        className="input"
        {...props} // this line should be after type='text' becasue in some cases props overwrite type attribute
        name={name || label.toLowerCase()}
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
    overflow-y: auto;
  font-size: 1.2em;
  padding: 1rem;
  display:block;
  border: none;
  outline: 2px solid ${themeVars.lightGray};
  border-radius: 0.5rem;
  background: ghostwhite;
  
}

.input:focus { outline: 2px solid ${themeVars.primaryColor}; }

.input::placeholder {
  color: transparent;
}



label {
  width: 100%;
  line-height: 1.4;
  text-align: start;
  pointer-events: none;
  color:#999; 
  font-size:1.2em;
  position:absolute;
  inset-inline-start: 1rem;
  top: 1.25rem;
  transition:0.2s ease all; 
  -moz-transition:0.2s ease all; 
  -webkit-transition:0.2s ease all;
  overflow: hidden;
  
}

.input:not(:placeholder-shown) + label {
  top:-20px;
  font-size:1em;
  color: ${themeVars.accentColor};

  overflow: hidden;
  max-width: 35ch;
  text-overflow: ellipsis;
  white-space: nowrap;
}


`;
