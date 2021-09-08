import Head from "next/head";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import styled from "styled-components";
import RTLStyles from "../components/layout/RTLStyles";
import { useLang } from "../contexts/LangProvider";
import GlobalStyles from "../styles/GlobalStyles";
import ToastNotification from "../components/layout/ToastNotification";
import ToastNotifications from "../components/layout/ToastNotifications";

export default function GloabalLayout({ children }) {
  const { lang } = useLang();

  return (
    <>
      <Head>
        <meta name="description" content="Dasroon is platform to find and get classes for your kids" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preload" href="/fonts/woff2/IRANSansWeb_Black.woff2" as="font" crossOrigin="" />
        <link rel="preload" href="/fonts/woff2/IRANSansWeb_Bold.woff2" as="font" crossOrigin="" />
        {/* <link rel="preload" href="/fonts/woff2/IRANSansWeb_Light.woff2" as="font" crossOrigin="" />  */}
        {/* <link rel="preload" href="/fonts/woff2/IRANSansWeb_Medium.woff2" as="font" crossOrigin="" /> */}
        {/* <link rel="preload" href="/fonts/woff2/IRANSansWeb_UltraLight.woff2" as="font" crossOrigin="" /> */}
        <link rel="preload" href="/fonts/woff2/IRANSansWeb.woff2" as="font" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;700;900&display=swap" rel="stylesheet"></link>
      </Head>
      <GlobalStyles />
      {lang === "fa" && <RTLStyles />}
      <Header />
      <Main> {children}</Main>
      <Footer />
      <ToastNotifications />
    </>
  );
}

const Main = styled.main`
  background: ghostwhite;
  display: grid;
  grid-template: 1fr / 1fr;
`;
