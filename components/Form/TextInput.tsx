import React from "react";
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
  [key: string]: any;
}

const TextInput = (props: Iprops) => {
  const { name, labelEn, labelFa, placeholderEn, placeholderFa, isHidden, required, ...otherProps } = props;
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
    <Div className={isHidden && "hidden"}>
      <input
        className="input"
        type="text"
        {...otherProps} // this line should be after type='text' becasue in some cases props overwrite type attribute
        name={name}
        placeholder={placeholder ? placeholder : label}
      />
      <label className="label" htmlFor={name}>
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
  border-radius: 0.8rem;
  font-size: 1.2em;
  padding: 0.8rem;
  display:block;
  /* border: none; */
  border: 2px solid ${themeVars.lightGray};
  background: ghostwhite;
  overflow: hidden;
}

.input:focus { 
  outline: none;
  border: 2px solid ${themeVars.primaryColor}; 
}
.input::placeholder {
  color: transparent;
}



label {
  line-height: 1.2;
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

  &.hidden {
  display: none;
  background: yellow;
}
`;
