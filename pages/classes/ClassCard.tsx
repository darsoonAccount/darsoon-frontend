import React from "react";
import styled from "styled-components";
export default function ClassCard({ classData }) {
  const { name, nameFa, description, numberOfSessions, isGroupClass } =
    classData;
  console.log("CLASS:", classData);
  return (
    <Div>
      <h2>{name}</h2>
      <p>{description}</p>
    </Div>
  );
}
const Div = styled.div`
  padding: 1.5rem;
  border-radius: 1.5rem;
  background: gainsboro;
  border: 1px solid gray;
  box-shadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px";
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
