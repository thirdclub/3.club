import {
  CameraIcon,
  HomeIcon,
  MenuIcon,
  ReceiptTaxIcon,
  ViewGridIcon
} from "@heroicons/react/outline";
import axios from "axios";
import CollectionBottomSheet from "components/CollectionBottomSheet";
import Row from "components/layout/Row";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { OpenSeaAsset } from "opensea-js/lib/types";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import { classNames } from "utils/ui-util";
import LoadingOverlay from "./LoadingOverlay";

const QrScannerModal = dynamic(() => import("components/QrScannerModal"), {
  ssr: false,
});

const BottomNavBar: FC<{}> = () => {
  const [cameraOpen, setCameraOpen] = useState(false);
  const [passOpen, setPassOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [assets, setAssets] = useState<OpenSeaAsset[]>([]);
  const router = useRouter();

  const navigation = [
    { href: "/", icon: HomeIcon },
    { href: "/collection", icon: ViewGridIcon },
    { href: "/scan", icon: CameraIcon },
    { href: "/pass", icon: ReceiptTaxIcon },
    { href: "/menu", icon: MenuIcon },
  ];

  const onScan = async (data?: string) => {
    if (!loading && data) {
      try {
        setCameraOpen(false);
        setLoading(true);
        const response = await axios.post("/api/scanQr", {
          qr: data,
        });
        if (response.data.data.length > 0) {
          setAssets(response.data.data);
          setPassOpen(true);
        } else {
          toast.error("Not owned one.");
        }
      } catch (e: any) {
        toast.error(e.toString());
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <section className="fixed inset-x-0 bottom-0 bg-white border-t pb-safe-bottom">
        <Row className="items-center h-14">
          {navigation.map((e, i) =>
            e.href == "/scan" ? (
              <div
                key={i}
                className="flex flex-1 h-full justify-center items-center hover:text-indigo-500 cursor-pointer"
                onClick={() => setCameraOpen(true)}
              >
                <e.icon className="inline-block" height={24} width={24} />
              </div>
            ) : (
              <Link key={i} href={e.href}>
                <a
                  className={classNames(
                    "flex flex-1 h-full justify-center items-center hover:text-indigo-500",
                    router.asPath == e.href ? "text-indigo-500" : undefined
                  )}
                >
                  <e.icon height={24} width={24} />
                </a>
              </Link>
            )
          )}
        </Row>
      </section>
      {loading && (
        <div className="flex absolute inset-0 bg-black opacity-60 justify-center items-center">
          <div
            className="w-8 h-8 border-4 border-white border-solid rounded-full animate-spin"
            style={{ borderTopColor: "transparent" }}
          />
        </div>
      )}
      <LoadingOverlay loading={loading} />
      <QrScannerModal
        open={cameraOpen}
        onClose={() => setCameraOpen(false)}
        onUpdate={onScan}
        stopStream={loading}
      />
      {!!assets.length && (
        <CollectionBottomSheet
          open={passOpen}
          onClose={() => setPassOpen(false)}
          asset={assets[0]}
        />
      )}
    </>
  );
};

export default BottomNavBar;
