import { DuplicateIcon } from "@heroicons/react/outline";
import Button from "components/buttons/Button";
import CoinbaseButton from "components/buttons/CoinbaseButton";
import WalletConnectButton from "components/buttons/WalletConnectButton";
import Col from "components/layout/Col";
import LoadingOverlay from "components/layout/LoadingOverlay";
import Page from "components/layout/Page";
import Row from "components/layout/Row";
import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-hot-toast";
import { BottomSheet } from "react-spring-bottom-sheet";
import { shortenAddress } from "utils/web3-utils";

const Home: NextPage<{ user: User }> = (props) => {
  const { user } = props;

  return (
    <Page auth>
      <Col className="h-full p-4 space-y-3">
        <Row className="space-x-3">
          <img className="w-24 max-w-full rounded-md" src={user.image} />
          <Col className="space-y-3">
            <span className="text-lg font-bold">{user.name}</span>
            {user.ethAddress && (
              <CopyToClipboard
                text={user.ethAddress}
                onCopy={() => toast.success("Copied!")}
              >
                <Button color="secondary">
                  <Row className="items-center space-x-2">
                    <span className="text-sm inline-block">
                      {shortenAddress(user.ethAddress)}
                    </span>
                    <DuplicateIcon height={20} width={20} />
                  </Row>
                </Button>
              </CopyToClipboard>
            )}
            {!user.ethAddress && <ConnectButton />}
          </Col>
        </Row>
      </Col>
    </Page>
  );
};

export default Home;

function ConnectButton() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Connect</Button>
      <BottomSheet open={open} onDismiss={() => setOpen(false)}>
        <Col className="p-4 space-y-4" onClick={() => setOpen(false)}>
          <WalletConnectButton
            onSuccess={(data: any) => {
              console.log(data);
              setOpen(false);
              router.replace(router.asPath);
            }}
            setLoading={setLoading}
          />
          <CoinbaseButton
            onSuccess={(data: any) => {
              console.log(data);
              setOpen(false);
              router.replace(router.asPath);
            }}
            setLoading={setLoading}
          />
        </Col>
      </BottomSheet>
      <LoadingOverlay loading={loading} />
    </div>
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
    props: {
      user: session.user,
    },
  };
};
