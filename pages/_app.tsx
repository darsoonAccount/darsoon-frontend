import type { AppProps } from "next/app";
import GloabalLayout from "../layouts/GloabalLayout";
import AuthProvider from "../contexts/AuthProvider";
import AppProvider from "../contexts/AppProvider";
import LanguageProvider, { useLang } from "../contexts/LangProvider";
import type { nextComponentWithLayout } from "../types/nextComponentWithLayout";

//add Layout property to components in order to apply nested layout
type ModifiedAppProps = AppProps & {
  Component: nextComponentWithLayout;
};

export default function MyApp({ Component, pageProps }: ModifiedAppProps) {
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
