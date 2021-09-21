import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthProvider';
import Redirect from '../components/Redirect';
import PageWrapper from '../components/layout/PageWrapper';
import En from '../components/translation/En';
import Fa from '../components/translation/Fa';
import Link from 'next/link';
import Modal from '../components/layout/Modal';
import LoginBox from '../components/LoginBox';

export default function WithUserAuth(WrappedComponent) {
  return (props) => {
    const { loggedInUser } = useAuth();

    return (
      <>
        {!loggedInUser ? (
          // <PageWrapper>
          //   <h1>
          //     <En>Login Required</En>
          //     <Fa>تنها اعضای سایت به این صفحه دسترسی دارند.</Fa>
          //   </h1>
          //   <p>
          //     <En>Please Log in and try again.</En>
          //     <Fa>لطفا وارد حساب کاربر‌ی‌تان شوید و دوباره امتحان کنید.</Fa>
          //   </p>
          //   <Link href='/login'>
          //     <a className='button'>
          //       <En>Login / Signup</En>
          //       <Fa>ساختن یا ورود به حساب کاربری</Fa>
          //     </a>
          //   </Link>
          // </PageWrapper>
          <Redirect to='/login' />
          // <Modal isVisible={true} closeHandler={null}>
            // {/* <LoginBox /> */}
          // {/* </Modal> */}
        ) : (
          <WrappedComponent {...props} />
        )}
      </>
    );
  };
}
