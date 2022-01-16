import { FC } from "react";
import BottomNavBar from "./BottomNavBar";
import Col from "./Col";
import Main from "./Main";
import TopNavBar from "./TopNavBar";

const Page: FC<{ auth?: boolean }> = (props) => {
  const { children, auth } = props;

  return (
    <Main>
      {auth && <TopNavBar />}
      <Col className="flex-1 mt-14 mb-14 overflow-y-auto">{children}</Col>
      {auth && <BottomNavBar />}
    </Main>
  );
};

export default Page;
