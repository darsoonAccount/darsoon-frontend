import React from "react";
import Styled from "styled-components";
import { themeVars } from "./GlobalStyles";

const TextInput = (props) => {
  const { name, label, placeholder, isHidden } = props;

  return (
    <Div className={isHidden && "hidden"}>
      <input
        className="input"
        type="text"
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

export default TextInput;

const Div = Styled.div`

  position:relative; 
  display: flex;
  flex-direction: column;
  /* overflow: hidden; */
  


.input	{
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
  line-height: 1.2;
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

  &.hidden {
  display: none;
  background: yellow;
}
`;
