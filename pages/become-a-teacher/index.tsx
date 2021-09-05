import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { useAuth } from "../../contexts/AuthProvider";
import LoginBox from "../../components/LoginBox";
import InfoBox from "../../components/InfoBox";
import { useRouter } from "next/router";
import { useApi } from "../../contexts/AppProvider";
import Loading from "../../components/Loading";
import Row from "../../components/Row";
import Link from "next/link";
import Panel from "../../components/Panel";
import Rows from "../../components/Rows";

export default function BecomeATeacherPage() {
  const { loggedInUser } = useAuth();
  const { api } = useApi();
  const [previousApplications, setPreviousApplications] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (loggedInUser) {
      setIsLoading(true);
      const userId = loggedInUser.userId;
      api
        .get(`api/j/teacherApplication?applicantUserId=${userId}`)
        .then((res) => {
          console.log("here res", res);
          setPreviousApplications(res.data.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log("here err", err);
          setPreviousApplications(null);
          setIsLoading(false);
        });
    }
  }, [loggedInUser]);

  return (
    <Page>
      {!loggedInUser ? (
        <>
          <InfoBox>Please create an account first. If you allready have an account, Log in to your account.</InfoBox>
          <LoginBox redirectTo="/become-a-teacher" />
        </>
      ) : (
        <>
          <Panel>
            <h2>درخواست‌های پیشین</h2>
            {isLoading ? (
              <Loading />
            ) : (
              <>
                {previousApplications && previousApplications.length > 0 ? (
                  <Rows>
                    {previousApplications.map((app) => {
                      return (
                        <Row>
                          <p>firstname: {app.firstname}</p>
                          <p>lastname: {app.lastname}</p>
                          <p>status: {app.status}</p>
                        </Row>
                      );
                    })}
                  </Rows>
                ) : (
                  <p>شما تا کنون درخواستی صبت نکرده‌اید</p>
                )}
              </>
            )}
          </Panel>
            <Link href="/become-a-teacher">
              <a className="primary-button">ایجاد درخواست جدید</a>
            </Link>
        </>
      )}
    </Page>
  );
}
const Page = styled.div`
  padding: 2rem;
  margin: 0 auto;
  display: grid;
  grid-template: 1fr / 1fr;

  gap: 1rem;
  width: 100%;
  max-width: 1000px;
`;
