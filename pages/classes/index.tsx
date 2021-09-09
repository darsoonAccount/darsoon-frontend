import React from "react";
import styled from "styled-components";
import ClassCard from "../../components/ClassCard";
import Cards from "../../components/layout/Cards";
import PageWrapper from "../../components/layout/PageWrapper";

export default function ClassesPage({ products }) {
  return (
    <StyledPageWrapper>
      <h1>Here is a list of classes</h1>
      <Cards>
        {products &&
          products.map((product, index) => {
            return <ClassCard key={`class-${index}`} product={product} />;
          })}
      </Cards>
    </StyledPageWrapper>
  );
}
const StyledPageWrapper = styled(PageWrapper)`
  width: 100%;
`;

export const getServerSideProps = async () => {
  const res = await fetch(`https://darsoon.uc.r.appspot.com/api/product`);
  const json = await res.json();
  const products = json.data;

  return {
    props: { products },
  };
};
