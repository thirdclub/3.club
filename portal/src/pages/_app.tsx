import { getSession, SessionProvider } from "next-auth/react";
import type { AppContext, AppProps } from "next/app";
import App from "next/app";
import NextNProgress from "nextjs-progressbar";
import React from "react";
import { Toaster } from "react-hot-toast";
import "styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <SessionProvider session={session}>
        <NextNProgress color="linear-gradient(90deg, rgb(79 70 229) 0%, rgb(79 70 229) 100%)" />
        <Component {...pageProps} />
        <Toaster
          toastOptions={{
            className: "!shadow-lg !rounded-lg border",
          }}
        />
      </SessionProvider>
    </>
  );
}

export default MyApp;

MyApp.getInitialProps = async (context: AppContext) => {
  const defaultProps = await App.getInitialProps(context);
  const session = await getSession(context.ctx);
  return { pageProps: { ...defaultProps, session: session } };
};
