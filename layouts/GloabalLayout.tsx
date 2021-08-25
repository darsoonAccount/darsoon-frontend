import Header from "../components/Header";
import Footer from "../components/Footer";
import styled from "styled-components";
import RTLStyles from "../components/RTLStyles";
import { useLang } from "../contexts/LangProvider";
import GlobalStyles from "../components/GlobalStyles";

export default function GloabalLayout({ children }) {
  const { lang } = useLang();

  return (
    <>
      <GlobalStyles />
      {lang === "fa" && <RTLStyles />}
      <Header />
      <Main> {children}</Main>
      <Footer />
    </>
  );
}

const Main = styled.main`
  background: ghostwhite;
  display: grid;
  /* place-items: center; */
  grid-template: 1fr / 1fr;
  /* & > * {
    width: 100% ;
  } */
`;
