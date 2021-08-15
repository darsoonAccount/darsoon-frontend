import React from "react";
import { useContext } from "react";
import styled from "styled-components";
import { useLang } from "../contexts/LangProvider";
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
    <select onChange={handleChange}>
      <option value="en">English</option>
      <option value="fa">فارسی</option>
    </select>
  );
}
const Div = styled.div`
  padding: 1.5rem;
  border-radius: 1.5rem;
  background: ghostwhite;
  border: 1px solid gray;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
