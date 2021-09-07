import React from "react";
import styled from "styled-components";
import { useLang } from "../contexts/LangProvider";

export default function T({ fa, en }) {
  const { lang } = useLang();

  return (
    <>
      {lang === "fa" && fa}
      {lang === "en" && en}
    </>
  );
}
