import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useAuth } from '../../contexts/AuthProvider';
import LoginBox from '../../components/LoginBox';
import InfoBox from '../../components/layout/InfoBox';
import { useRouter } from 'next/router';
import { useApi } from '../../contexts/AppProvider';
import Loading from '../../components/layout/Loading';
import Row from '../../components/layout/Row';
import Link from 'next/link';
import Panel from '../../components/layout/Panel';
import Rows from '../../components/layout/Rows';
import En from '../../components/translation/En';
import Fa from '../../components/translation/Fa';
import WithUserAuth from '../../HOC/WithUserAuth';

const BecomeATeacherPage = () => {
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
          console.log('here res', res);
          setPreviousApplications(res.data.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log('here err', err);
          setPreviousApplications(null);
          setIsLoading(false);
        });
    }
  }, [loggedInUser, api]);

  return (
    <Page>
      {!loggedInUser ? (
        <>
          <InfoBox>
            <En>
              Please create an account first. If you allready have an account,
              Log in to your account.
            </En>
            <Fa>
              لطفا ابتدا یک حساب کاربری بسازید. اگر از قبل حساب کاربرری دارد
              وارد آن شوید.
            </Fa>
          </InfoBox>
          <LoginBox redirectTo='/become-a-teacher' />
        </>
      ) : (
        <>
          <Panel>
            <h2>
              <En>Your Previous Applicatuons</En>
              <Fa>درخواست‌های پیشین شما</Fa>
            </h2>
            {isLoading ? (
              <Loading />
            ) : (
              <>
                {previousApplications && previousApplications.length > 0 ? (
                  <Rows>
                    {previousApplications.map((application, index) => {
                      const applicantUser = application.applicantUser;
                      return (
                        <Row key={`previousTeacherApplication-${index}`}>
                          <p>
                            <En>firstname: {applicantUser.firstname}</En>
                            <Fa>نام: {applicantUser.firstnameFa}</Fa>
                          </p>
                          <p>
                            <En>lastname: {applicantUser.lastname}</En>
                            <Fa>
                              <Fa>نام خانوادگی: {applicantUser.lastnameFa}</Fa>
                            </Fa>
                          </p>
                          <p>
                            <En>status: {application.status}</En>
                            <Fa>وضعیت: {application.status}</Fa>
                          </p>
                        </Row>
                      );
                    })}
                  </Rows>
                ) : (
                  <p>
                    <En>You have not applied before.</En>
                    <Fa>شما تا کنون درخواستی ثبت نکرده‌اید</Fa>
                  </p>
                )}
              </>
            )}
          </Panel>
          <Link href='/become-a-teacher/apply'>
            <a className='primary-button'>
              <En>Fill a new applications</En>
              <Fa>ایجاد درخواست جدید</Fa>
            </a>
          </Link>
        </>
      )}
    </Page>
  );
};

export default WithUserAuth(BecomeATeacherPage);

const Page = styled.div`
  padding: 2rem;
  margin: 0 auto;
  display: grid;
  grid-template: 1fr / 1fr;

  gap: 1rem;
  width: 100%;
  max-width: 1000px;
`;
