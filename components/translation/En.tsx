import React from "react";
import styled from "styled-components";
import { useLang } from "../../contexts/LangProvider";

export default function En({ children }) {
  const { lang } = useLang();

  return <>{lang === "en" && children}</>;
}
