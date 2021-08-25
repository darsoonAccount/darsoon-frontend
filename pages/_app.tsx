import type { AppProps } from "next/app";
import GloabalLayout from "../layouts/GloabalLayout";
import AuthProvider from "../contexts/AuthProvider";
import AppProvider from "../contexts/AppProvider";
import LanguageProvider, { useLang } from "../contexts/LangProvider";

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = Component.Layout || EmptyLayout;

  return (
    <>
      <AuthProvider>
        <LanguageProvider>
          <AppProvider>
            <GloabalLayout>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </GloabalLayout>
          </AppProvider>
        </LanguageProvider>
      </AuthProvider>
    </>
  );
}

const EmptyLayout = ({ children }) => <>{children}</>;
