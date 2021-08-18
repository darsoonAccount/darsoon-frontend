import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { themeVars } from "../../components/GlobalStyles";
import FilterProvider from "./FilterContex";
import ClassCard from "./ClassCard";
import { useApi } from "../../contexts/AppProvider";
export default function ClassesPage() {
  const [classes, setClasses] = useState(null);
  const { api } = useApi();

  useEffect(() => {
    api
      .get("/api/products")
      .then((res) => setClasses(res.data.data))
      .catch((error) => console.log("Error Request!!!", error.request, "Error Response!!!", error.response));
  }, []);

  return (
    <FilterProvider>
      <Div>
        <h2>Classes</h2>
        <div className="classes">
          {classes &&
            classes
              .filter((classData) => {
                return classData.isGroupClass === 0;
              })
              .map((calssData) => {
                return <ClassCard classData={calssData} />;
              })}
        </div>
      </Div>
    </FilterProvider>
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

  .classes {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
  }
`;
