import React from "react";
import { useContext } from "react";
import styled from "styled-components";
import { useLang } from "../contexts/LangProvider";
import { themeVars } from "./GlobalStyles";
export default function LanguageInHeader() {
  const { lang, setLangToEnglish, setLangToPersian } = useLang();

  const handleChange = (event) => {
    const selecteLang = event.target.value;

    switch (selecteLang) {
      case "en":
        setLangToEnglish();
        break;
      case "fa":
        setLangToPersian();
        break;
      default:
        break;
    }
  };

  return (
    <Select onChange={handleChange}>
      <option value="en">English</option>
      <option value="fa">فارسی</option>
    </Select>
  );
}
const Select = styled.select`
  padding: 0.3rem 0.5rem;
  border: none;
  border-radius: 1rem;
  box-shadow: ${themeVars.boxShadow};
`;
