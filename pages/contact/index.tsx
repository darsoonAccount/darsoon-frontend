import React from "react";
import styled from "styled-components";
export default function contactPage() {
  return (
    <Page>
      <h1>Contact Darsoon</h1>
      <p>You can contact us from one of ways below</p>
    </Page>
  );
}
const Page = styled.div`
  padding: 1.5rem;
  border-radius: 1.5rem;
  background: ghostwhite;
  display: grid;
  place-items: center;
  gap: 1rem;
`;
