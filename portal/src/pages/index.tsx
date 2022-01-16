import Col from "components/layout/Col";
import Page from "components/layout/Page";
import Row from "components/layout/Row";
import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";

const HomePage: NextPage = () => {
  return (
    <Page auth>
      <Col className="p-4 space-y-3">
        <Row className="space-x-3">
          <span className="text-2xl font-bold">Home</span>
        </Row>
      </Col>
    </Page>
  );
};

export default HomePage;

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
    props: {
      user: session.user,
    },
  };
};
