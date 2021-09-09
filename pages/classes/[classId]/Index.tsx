import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { useApi } from "../../../contexts/AppProvider";

export default function ClassPage({product}) {

  console.log('producs:', products);
  
  const router = useRouter();
  const { classId } = router.query;



  return <Div>

  </Div>;
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



export const getServerSideProps = async ({params}) => {

  const {classId} = params;
  const res = await fetch(`https://darsoon.uc.r.appspot.com/api/p/product/${classId}`);
  const json = await res.json();
  const product = json.data;

  return {
    props: { product },
  };
};