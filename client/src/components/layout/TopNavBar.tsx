import { QrcodeIcon } from "@heroicons/react/outline";
import Button from "components/buttons/Button";
import Row from "components/layout/Row";
import Config from "config/config";
import dynamic from "next/dynamic";
import { FC, useState } from "react";

const UserBottomSheet = dynamic(() => import("components/UserBottomSheet"), {
  ssr: false,
});

const TopNavBar: FC<{}> = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="fixed inset-x-0 bg-white border-b h-14">
      <Row className="h-full px-4 items-center justify-between">
        <span className="text-2xl font-extrabold tracking-tighter font-sans">
          {Config.appName.toUpperCase()}
        </span>
        <Button variant="icon" onClick={() => setOpen(true)}>
          <QrcodeIcon width={20} height={20} />
        </Button>
        <UserBottomSheet open={open} onClose={() => setOpen(false)} />
      </Row>
    </section>
  );
};

export default TopNavBar;
