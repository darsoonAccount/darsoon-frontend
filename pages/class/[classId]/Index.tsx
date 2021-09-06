import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { useApi } from "../../../contexts/AppProvider";

export default function ClassPage() {
  const router = useRouter();
  const { classId } = router.query;
  const { api } = useApi();

  const [classData, setClassData] = useState(null);

  useEffect(() => {
    api
      .get(`/api/class/${classId}`)
      .then((res) => setClassData(res.data.data))
      .catch((error) => console.log("Error Request!!!", error.request, "Error Response!!!", error.response));
  }, []);

  return <Div>I&apos;m a placeholder</Div>;
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
