import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";
import RTLStyles from "./RTLStyles";
import { useLang } from "../contexts/LangProvider";
import GlobalStyles from "./GlobalStyles";

export default function Layout({ children }) {
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
  place-items: center;
  gap: 1rem;
`;
