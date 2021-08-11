import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import fetchAndSet from "../../../utils/fetchAndSet";

export default function ClassPage() {
  const router = useRouter();
  const { classId } = router.query;

  const [classData, setClassData] = useState(null);

  useEffect(() => {
    fetchAndSet(`/api/classes/${classId}`, setClassData);
  }, []);

  return <Div>'I'm a placeholder'</Div>;
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
