import Button from "components/buttons/Button";
import Col from "components/layout/Col";
import Page from "components/layout/Page";
import type { GetServerSideProps } from "next";
import { getSession, signOut } from "next-auth/react";

export default function Menu() {
  return (
    <Page auth>
      <Col className="h-full p-4">
        <div className="flex-1" />
        <Button onClick={() => signOut()}>Logout</Button>
      </Col>
    </Page>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
