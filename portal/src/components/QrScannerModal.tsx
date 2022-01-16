import React, { FC } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import Modal from "./Modal";

const QrScannerModal: FC<{
  open: boolean;
  onClose: () => void;
  onUpdate: (data?: string) => void;
  stopStream?: boolean;
}> = (props) => {
  const { open, onClose, onUpdate, stopStream } = props;

  return (
    <Modal open={open} onClose={onClose}>
      <div className="bg-black h-[592px] w-[592px]">
        <BarcodeScannerComponent
          onUpdate={(err, result) => {
            onUpdate(result?.getText());
          }}
          videoConstraints={{
            aspectRatio: 1,
            facingMode: "environment",
          }}
          stopStream={stopStream}
        />
      </div>
    </Modal>
  );
};

export default QrScannerModal;
