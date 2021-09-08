import React from "react";
import { useContext } from "react";
import styled from "styled-components";
import { useLang } from "../contexts/LangProvider";
import { themeVars } from "../styles/GlobalStyles";
import En from "./translation/En";
import Fa from "./translation/Fa";
import T from "./translation/T";
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
      <Fa>
        <option value="fa">فارسی</option>
        <option value="en">انکلیسی</option>
      </Fa>
      <En>
        <option value="en">English</option>
        <option value="fa">Farsi</option>
      </En>
    </Select>
  );
}
const Select = styled.select`
  border: none;
  border-radius: 1rem;
  background: none;
  color: white;
  font-weight: 700;
  font-size: 1.3rem;

  option {
    background: ${themeVars.darkColor};
    font-weight: 400;
    font-size: 1rem;
  }
`;
