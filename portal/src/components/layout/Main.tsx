import Config from "config/config";
import Head from "next/head";
import { FC } from "react";

const Main: FC = (props) => {
  const { children } = props;
  return (
    <>
      <Head>
        <title>{Config.appName.toUpperCase()} Portal</title>
      </Head>
      <main className="absolute inset-0 flex flex-col">{children}</main>
    </>
  );
};

export default Main;
