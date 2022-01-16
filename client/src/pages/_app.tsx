import { getSession, SessionProvider } from "next-auth/react";
import type { AppContext, AppProps } from "next/app";
import App from "next/app";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";
import React from "react";
import { Toaster } from "react-hot-toast";
import "react-spring-bottom-sheet/dist/style.css";
import "styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1, viewport-fit=cover, user-scalable=no"
        />
      </Head>
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
