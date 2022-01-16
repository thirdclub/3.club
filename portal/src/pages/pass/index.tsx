import { XIcon } from "@heroicons/react/outline";
import axios from "axios";
import Button from "components/buttons/Button";
import Col from "components/layout/Col";
import Page from "components/layout/Page";
import Row from "components/layout/Row";
import Modal from "components/Modal";
import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { FC, FormEvent, useRef, useState } from "react";
import toast from "react-hot-toast";
import Database from "utils/database";

const QrScannerModal = dynamic(() => import("components/QrScannerModal"), {
  ssr: false,
});

const PassPage: NextPage<{ pass: Pass[] }> = (props) => {
  const { pass } = props;
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [cameraOepn, setCameraOepn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>();
  const [resultOpen, setResultOpen] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

  const createPass = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = Object.fromEntries(
        new FormData(e.currentTarget).entries()
      );
      setLoading(true);
      await toast.promise(axios.post("/api/createPass", formData), {
        success: "Pass created",
        loading: "Creating...",
        error: (e) => JSON.stringify(e),
      });
      setOpen(false);
      router.replace(router.asPath);
    } finally {
      setLoading(false);
    }
  };

  // const previewPass = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const formData = Object.fromEntries(
  //     new FormData(e.currentTarget).entries()
  //   );
  //   console.log(formData);
  //   const element = componentRef.current;
  //   const canvas = await html2canvas(element!);
  //   const data = canvas.toDataURL("image/png");
  //   const reponse = await toast.promise(
  //     axios.post("/api/createPass", {
  //       ...formData,
  //       image: data.split(",")[1],
  //     }),
  //     {
  //       success: "Pass created",
  //       loading: "Creating...",
  //       error: (e) => JSON.stringify(e),
  //     }
  //   );
  //   console.log(reponse);
  //   setData(formData);
  // };

  return (
    <Page auth>
      <Col className="p-4 space-y-3">
        <Row className="space-x-3">
          <span className="text-2xl font-bold">Pass</span>
          <div className="flex-1" />
          <Button onClick={() => setOpen(true)}>Create</Button>
          <div>
            <Button onClick={() => setCameraOepn(true)}>Scan</Button>
            <QrScannerModal
              open={cameraOepn}
              onClose={() => setCameraOepn(resultOpen)}
              stopStream={resultOpen}
              onUpdate={(data) => {
                if (data) {
                  setData(JSON.parse(Buffer.from(data, "base64").toString()));
                  setResultOpen(true);
                }
              }}
            />
            <Modal open={resultOpen} onClose={() => setResultOpen(false)}>
              <Col className="text-left space-y-3">
                <div className="text-2xl font-bold">Data</div>
                <div>tokenAddress: {data?.tokenAddress}</div>
                <div>tokenId: {data?.tokenId}</div>
                <div>ownerAddress: {data?.ownerAddress}</div>
                <div>userId: {data?.userId}</div>
              </Col>
            </Modal>
          </div>
          <Modal open={open} onClose={() => {}}>
            <form onSubmit={createPass}>
              <Col className="text-left space-y-3">
                <Row className="justify-between">
                  <span className="font-bold text-2xl">Create pass</span>
                  <Button variant="icon" onClick={() => setOpen(false)}>
                    <XIcon width={20} height={20} />
                  </Button>
                </Row>
                <div>
                  <label className="block text-sm font-bold mb-1">Name</label>
                  <input
                    className="border rounded w-full py-2 px-3"
                    name="name"
                    placeholder="Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">
                    Description
                  </label>
                  <input
                    className="border rounded w-full py-2 px-3"
                    name="description"
                    placeholder="Description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">
                    To address
                  </label>
                  <input
                    className="border rounded w-full py-2 px-3"
                    name="toAddress"
                    placeholder="E.g. 0x9d418c2cae665d877f909a725402ebd3a0742844"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">
                    Image url
                  </label>
                  <input
                    className="border rounded w-full py-2 px-3"
                    name="imageUrl"
                    placeholder="Image url"
                  />
                </div>
                {/* <ComponentToPrint ref={componentRef!} /> */}
                <Button type="submit" loading={loading}>
                  Submit
                </Button>
              </Col>
            </form>
          </Modal>
        </Row>
        {pass.map((e) => (
          <PassCard key={e.id} pass={e} />
        ))}
      </Col>
    </Page>
  );
};

export default PassPage;

// const ComponentToPrint = forwardRef<HTMLDivElement>((props, ref) => (
//   <div className="border  rounded-md">
//     <div ref={ref} className="h-[500px] w-[500px] p-4">
//       <div className="grid grid-cols-2 gap-3">
//         <div className="w-full pt-[100%] relative">
//           <div className="absolute inset-0 bg-black"></div>
//         </div>
//         <div className="w-full pt-[100%] relative">
//           <div className="absolute inset-0 bg-black"></div>
//         </div>
//         <div className="w-full pt-[100%] relative">
//           <div className="absolute inset-0 bg-black"></div>
//         </div>
//         <div className="w-full pt-[100%] relative">
//           <div className="absolute inset-0 bg-black"></div>
//         </div>
//       </div>
//     </div>
//   </div>
// ));

const PassCard: FC<{ pass: Pass }> = (props) => {
  const { pass } = props;

  return (
    <>
      <div className="w-full border border-slate-100 rounded-md p-3 space-y-2">
        <Row className="justify-between items-start">
          <Col>
            <div className="font-bold">{pass.name}</div>
            <div>{pass.description}</div>
          </Col>
        </Row>
        <div className="text-sm">Contract: {pass.contractAddress}</div>
        <div className="text-sm">To: {pass.toAddress}</div>
      </div>
    </>
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
  const db = new Database();
  const userId = session.user.id;
  return {
    props: {
      pass: await db.getPassByUserId(userId),
    },
  };
};
