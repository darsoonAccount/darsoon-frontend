import React from "react";
import styled from "styled-components";

import { useAuth } from "../../contexts/AuthProvider";
import LoginBox from "../../components/LoginBox";
import InfoBox from "../../components/InfoBox";
import { useRouter } from "next/router";
import { getRouteMatcher } from "next/dist/next-server/lib/router/utils";
import { useState } from "react";
import ApplicationSubmittedBox from "../../components-teacher-applicant/ApplicationSubmittedBox";
import ApplicationForm from "../../components-teacher-applicant/ApplicationForm";

export default function BecomeATeacherPage() {
  const { loggedInUser } = useAuth();

  const [isSubmitedSuccefully, setIsSubmitedSuccefully] = useState(false);

  const handleDataAfterSuccess = (data) => {
    setIsSubmitedSuccefully(true);
  };

  return (
    <Page>
      {!isSubmitedSuccefully ? (
        <>
          {!loggedInUser && (
            <>
              <InfoBox>Please create an account first. If you allready have an account, Log in to your account.</InfoBox>
              <LoginBox redirectTo="/become-a-teacher" />
            </>
          )}
          {loggedInUser && (
            <>
              <p>لطفا فرم زیر را پر نمایید</p>
              <ApplicationForm handleDataAfterSuccess={handleDataAfterSuccess} />
            </>
          )}
        </>
      ) : (
        <ApplicationSubmittedBox />
      )}
    </Page>
  );
}
const Page = styled.div`
  padding: 1.5rem;
  display: grid;
  /* place-content: center; */
  grid-template: 1fr / 1fr; 
  gap: 1rem;
  width: 100%;
`;
