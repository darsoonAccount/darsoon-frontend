import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import GlobalStyles from "../components/GlobalStyles";
import AuthProvider from "../contexts/AuthProvider";
import AppProvider from "../contexts/AppProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <AppProvider>
          <GlobalStyles />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AppProvider>
      </AuthProvider>
    </>
  );
}
export default MyApp;
