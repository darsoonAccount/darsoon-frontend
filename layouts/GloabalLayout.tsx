import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import styled from "styled-components";
import RTLStyles from "../components/layout/RTLStyles";
import { useLang } from "../contexts/LangProvider";
import GlobalStyles from "../components/layout/GlobalStyles";
import ToastNotification from "../components/layout/ToastNotification";
import ToastNotifications from "../components/layout/ToastNotifications";

export default function GloabalLayout({ children }) {
  const { lang } = useLang();

  return (
    <>
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
