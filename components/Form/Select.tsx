import React, { useEffect } from "react";
import Styled from "styled-components";
import { useLang } from "../../contexts/LangProvider";
import { themeVars } from "../../styles/GlobalStyles";

interface Iprops {
  name: string;
  labelEn: string;
  isHidden?: boolean;
  labelFa: string;
  placeholderEn?: string;
  placeholderFa?: string;
  children: any;
  [key: string]: any;
}

const Select = (props) => {
  const { name, labelEn, labelFa, placeholderEn, placeholderFa, isHidden, required, children, ...otherProps } = props;
  const { lang } = useLang();
  let placeholder = placeholderFa;
  let label = labelFa;

  if (lang === "en") {
    placeholder = placeholderEn;
    label = labelEn;
  }

  if (required) {
    label = label + " *";
    if (placeholder) {
      placeholder = placeholder + " *";
    }
  }
  return (
    <Div>
      <select
        className="input"
        type="text"
        {...otherProps} // this line should be after type='text' becasue in some cases props overwrite type attribute
        name={name}
        placeholder={placeholder ? placeholder : label}
      >
        {children}
      </select>
      <label className="label" htmlFor={name}>
        {placeholder ? placeholder : label}
      </label>
    </Div>
  );
};

export default Select;

const Div = Styled.div`


  position:relative; 
  display: flex;
  flex-direction: column;
  /* overflow: hidden; */

.input	{
  font-size: 1.2em;
  padding: 1rem;
  display:block;
  border: 2px solid ${themeVars.lightGray};
  border-radius: 0.5rem;
  background: ghostwhite;
  overflow: hidden;
}

.input:focus { 
  border: none;
  outline: 2px solid ${themeVars.primaryColor}; 
}

.input::placeholder {
  color: transparent;
}



label {
    line-height: 1.4;
  text-align: start;
  pointer-events: none;
  color: ${themeVars.lightGray}; 
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
