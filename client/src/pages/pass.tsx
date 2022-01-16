import axios from "axios";
import Page from "components/layout/Page";
import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { FC, useState } from "react";

const PassBottomSheet = dynamic(() => import("components/PassBottomSheet"), {
  ssr: false,
});

const PassPage: NextPage<{ pass: any[] }> = (props) => {
  const { pass } = props;
  return (
    <Page auth>
      <div className="p-4 grid grid-cols-2 gap-3">
        {pass.map((e, i) => (
          <PassCard key={i} asset={e} />
        ))}
      </div>
    </Page>
  );
};

export default PassPage;

const PassCard: FC<{ asset: any }> = (props) => {
  const { asset } = props;
  const [open, setOpen] = useState(false);

  return (
    <div
      className="w-full border rounded-md overflow-hidden"
      onClick={() => setOpen(true)}
    >
      <div className="w-full pt-[100%] relative">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover object-center"
            src={asset.metadata.image}
          />
        </div>
      </div>
      <div className="p-2">
        <div className="font-bold">{asset.name}</div>
        <div>{asset.metadata.name}</div>
      </div>

      <PassBottomSheet
        open={open}
        onClose={() => setOpen(false)}
        asset={asset}
      />
    </div>
  );
};

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
  const { user } = session;
  try {
    if (user.ethAddress) {
      const response = await axios.get(
        `https://deep-index.moralis.io/api/v2/${user.ethAddress}/nft?chain=mumbai&format=decimal`,
        {
          headers: {
            "X-API-Key": process.env.MORAILS_API_KEY!,
          },
        }
      );
      return {
        props: {
          pass: response.data.result
            .filter((e: { metadata: any }) => e.metadata)
            .map((e: any) => {
              return {
                ...e,
                metadata: JSON.parse(e.metadata),
              };
            }),
        },
      };
    }
    return {
      props: {
        assets: [],
      },
    };
  } catch (e) {
    console.error(e);
    return {
      props: {
        assets: [],
      },
    };
  }
};
