import React from "react";
import styled from "styled-components";
import { useLang } from "../../contexts/LangProvider";

export default function Fa({ children }) {
  const { lang } = useLang();

  return <>{lang === "fa" && children}</>;
}
