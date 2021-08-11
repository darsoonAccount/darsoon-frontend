import React, { ReactChildren, useState } from "react";
import { createContext } from "react";
import styled from "styled-components";

const FilterContext = createContext(null);

export default function FilterProvider({ children }) {
  const [st, setSt] = useState(null);
  return (
    <FilterContext.Provider value={{ st }}>{children}</FilterContext.Provider>
  );
}
const Div = styled.div``;
