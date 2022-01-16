import Col from "components/layout/Col";
import Main from "components/layout/Main";
import Row from "components/layout/Row";
import SideBar from "components/layout/SideBar";
import { FC } from "react";

const Page: FC<{ auth?: boolean }> = (props) => {
  const { children, auth } = props;

  return (
    <Main>
      <Row className="h-full">
        {auth && <SideBar />}
        <Col className="flex-1 ml-48 overflow-y-auto">{children}</Col>
      </Row>
    </Main>
  );
};

export default Page;
