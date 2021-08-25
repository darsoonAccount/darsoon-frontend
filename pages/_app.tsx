import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import AuthProvider from "../contexts/AuthProvider";
import AppProvider from "../contexts/AppProvider";
import LanguageProvider, { useLang } from "../contexts/LangProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <LanguageProvider>
          <AppProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AppProvider>
        </LanguageProvider>
      </AuthProvider>
    </>
  );
}
export default MyApp;
