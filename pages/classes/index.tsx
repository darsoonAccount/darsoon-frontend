import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { themeVars } from "../../components/GlobalStyles";
import FilterProvider from "./FilterContex";
import ClassCard from "./ClassCard";
export default function ClassesPage() {
  const [classes, setClasses] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/products")
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((json) => {
        switch (true) {
          case json.status >= 200 && json.status <= 299:
            //do this
            setClasses(json.data);
          case json.status >= 400 && json.status <= 499:
          //alert about bad request
          case json.status >= 500 && json.status <= 599:
          //alert about something went wrong
          default:
        }
      });
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
