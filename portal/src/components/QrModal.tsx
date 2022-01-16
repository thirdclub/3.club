import React, { FC, useCallback, useState } from "react";
import QRCode from "react-qr-code";
import Col from "./layout/Col";
import Modal from "./Modal";

const QrModal: FC<{
  open: boolean;
  onClose: () => void;
  event: Event;
}> = (props) => {
  const { open, onClose, event } = props;

  return (
    <Modal open={open} onClose={onClose}>
      <Col className="items-start space-y-3 w-full">
        <span className="font-bold text-2xl">{event.name}</span>
        <QRCode
          size={Math.min(640, window.screen.width) - 48}
          value={Buffer.from(
            JSON.stringify({
              eventId: event.id,
              contractAddress: event.contractAddress,
            }),
            "binary"
          ).toString("base64")}
        />
      </Col>
    </Modal>
  );
};

export default QrModal;
