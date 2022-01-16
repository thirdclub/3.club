import Col from "components/layout/Col";
import Row from "components/layout/Row";
import { useSession } from "next-auth/react";
import React, { FC, useState } from "react";
import QRCode from "react-qr-code";
import { BottomSheet } from "react-spring-bottom-sheet";

const UserBottomSheet: FC<{
  open: boolean;
  onClose: () => void;
}> = (props) => {
  const { open, onClose } = props;
  const { data } = useSession();
  const user = data!.user;
  const [show, setShow] = useState(false);

  return (
    <BottomSheet
      open={open}
      onDismiss={onClose}
      onSpringStart={(e) => {
        if (e.type == "CLOSE") {
          setShow(false);
        }
      }}
      onSpringEnd={(e) => {
        if (e.type == "OPEN") {
          setShow(true);
        }
      }}
    >
      <Col className="p-4 space-y-3 items-center">
        <Row className="w-full space-x-3">
          <div className="flex-1 font-bold p-4 bg-black text-white space-y-2 truncate">
            <p className="text-2xl truncate">{user.name}</p>
          </div>
          <img className="w-32 h-32 object-cover" src={user.image} />
        </Row>
        <div style={{ height: Math.min(640, window?.screen.width) - 32 }}>
          {show && (
            <QRCode
              size={Math.min(640, window?.screen.width) - 32}
              value={Buffer.from(
                JSON.stringify({
                  userId: user.id,
                }),
                "binary"
              ).toString("base64")}
            />
          )}
        </div>
      </Col>
    </BottomSheet>
  );
};

export default UserBottomSheet;
