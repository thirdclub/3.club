import Page from "components/layout/Page";
import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { Network, OpenSeaAPI } from "opensea-js";
import { OpenSeaAsset } from "opensea-js/lib/types";
import { FC, useState } from "react";

const CollectionBottomSheet = dynamic(
  () => import("components/CollectionBottomSheet"),
  {
    ssr: false,
  }
);

const CollectionPage: NextPage<{ assets: OpenSeaAsset[] }> = (props) => {
  const { assets } = props;
  return (
    <Page auth>
      <div className="p-4 grid grid-cols-2 gap-3">
        {assets.map((e, i) => (
          <CollectionCard key={i} asset={e} />
        ))}
      </div>
    </Page>
  );
};

export default CollectionPage;

const CollectionCard: FC<{ asset: OpenSeaAsset }> = (props) => {
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
            src={asset.imagePreviewUrl}
          />
        </div>
      </div>
      <div className="p-2 font-bold">{asset.collection.name}</div>
      <CollectionBottomSheet
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
  const openSeaApi = new OpenSeaAPI({
    networkName: Network.Rinkeby,
  });
  try {
    const assets = user.ethAddress
      ? (
          await openSeaApi.getAssets({
            owner: user.ethAddress,
            order_direction: "desc",
          })
        ).assets
      : [];
    return {
      props: {
        assets: JSON.parse(JSON.stringify(assets)),
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
