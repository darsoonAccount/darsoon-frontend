import React from "react";
import { useContext } from "react";
import styled from "styled-components";
import { useLang } from "../contexts/LangProvider";
import { themeVars } from "./layout/GlobalStyles";
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
      <option value="fa">
        <T fa="فارسی" en="فارسی" />
      </option>
      <option value="en">
        <T fa="English" en="English" />
      </option>
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
