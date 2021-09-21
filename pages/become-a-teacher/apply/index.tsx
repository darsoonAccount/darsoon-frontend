import React, { useState } from "react";
import styled from "styled-components";
import ApplicationForm from "../../../components-teacher-applicant/ApplicationForm";
import ApplicationSubmittedBox from "../../../components-teacher-applicant/ApplicationSubmittedBox";
import En from "../../../components/translation/En";
import Fa from "../../../components/translation/Fa";
import withUserAuth from "../../../HOC/WithUserAuth";

const ApplyPage = () => {
  const [isSubmitedSuccefully, setIsSubmitedSuccefully] = useState(false);

  const handleDataAfterSuccess = (data) => {
    setIsSubmitedSuccefully(true);
  };

  return (
    <Div>
      {isSubmitedSuccefully ? (
        <>
          <ApplicationSubmittedBox />
        </>
      ) : (
        <>
          <p>
            <En>Please fill out the form bellow.</En>
            <Fa>لطفا فرم زیر را پر نمایید</Fa>
          </p>
          <ApplicationForm handleDataAfterSuccess={handleDataAfterSuccess} isTwoColumns={true} />
        </>
      )}
    </Div>
  );
};

export default withUserAuth(ApplyPage);

const Div = styled.div`
  padding: 1.5rem;
  border-radius: 1.5rem;
  background: ghostwhite;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  display: grid;
  place-items: center;
`;
