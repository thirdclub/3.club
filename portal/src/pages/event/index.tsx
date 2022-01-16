import { QrcodeIcon, XIcon } from "@heroicons/react/outline";
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
import { FC, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import Database from "utils/database";

const QrModal = dynamic(() => import("components/QrModal"), {
  ssr: false,
});

const EventPage: NextPage<{ event: Event[] }> = (props) => {
  const { event } = props;
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const createEvent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = Object.fromEntries(
        new FormData(e.currentTarget).entries()
      );
      setLoading(true);
      await toast.promise(axios.post("/api/createEvent", formData), {
        success: "Event created",
        loading: "Creating...",
        error: (e) => e.toString(),
      });
      setOpen(false);
      router.replace(router.asPath);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page auth>
      <Col className="p-4 space-y-3">
        <Row className="justify-between">
          <span className="text-2xl font-bold">Event</span>
          <Button onClick={() => setOpen(true)}>Create</Button>
          <Modal open={open} onClose={() => {}}>
            <form onSubmit={createEvent}>
              <Col className="text-left space-y-3">
                <Row className="justify-between">
                  <span className="font-bold text-2xl">Create event</span>
                  <Button variant="icon" onClick={() => setOpen(false)}>
                    <XIcon width={20} height={20} />
                  </Button>
                </Row>
                <div>
                  <label className="block text-sm font-bold mb-1">Name</label>
                  <input
                    className="border rounded w-full py-2 px-3"
                    name="name"
                    placeholder="Event name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">
                    Contract address
                  </label>
                  <input
                    className="border rounded w-full py-2 px-3"
                    name="contractAddress"
                    placeholder="E.g. 0x9d418c2cae665d877f909a725402ebd3a0742844"
                  />
                </div>
                <Button type="submit" loading={loading}>
                  Submit
                </Button>
              </Col>
            </form>
          </Modal>
        </Row>
        {event.map((e) => (
          <EventCard key={e.id} event={e} />
        ))}
      </Col>
    </Page>
  );
};

export default EventPage;

const EventCard: FC<{ event: Event }> = (props) => {
  const { event } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="w-full border rounded-md p-3">
        <Row className="justify-between">
          <div className="font-bold">{event.name}</div>
          <Button variant="icon" onClick={() => setOpen(true)}>
            <QrcodeIcon height={20} width={20} />
          </Button>
        </Row>
        <div className="">{event.contractAddress}</div>
      </div>
      <QrModal open={open} onClose={() => setOpen(false)} event={event} />
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
      event: await db.getEventByUserId(userId),
    },
  };
};
