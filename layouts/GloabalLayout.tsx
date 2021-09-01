import Header from "../components/Header";
import Footer from "../components/Footer";
import styled from "styled-components";
import RTLStyles from "../components/RTLStyles";
import { useLang } from "../contexts/LangProvider";
import GlobalStyles from "../components/GlobalStyles";
import ToastNotification from "../components/ToastNotification";
import ToastNotifications from "../components/ToastNotifications";

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
