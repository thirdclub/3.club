import { Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import Col from "components/layout/Col";
import React, { FC, useCallback, useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const QrScannerModal: FC<{
  open: boolean;
  onClose: () => void;
  onUpdate: (data?: string) => void;
  stopStream?: boolean;
}> = (props) => {
  const { open, onClose, onUpdate, stopStream } = props;
  const [height, setHeight] = useState<number>();
  const [width, setWidth] = useState<number>();
  const div = useCallback((node) => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
      setWidth(node.getBoundingClientRect().width);
    }
  }, []);

  return (
    <Transition
      show={open}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Col className="fixed inset-0 bg-black">
        <BarcodeScannerComponent
          onUpdate={(err, result) => {
            onUpdate(result?.getText());
          }}
          videoConstraints={{
            aspectRatio: height! / width!,
            facingMode: "environment",
          }}
          stopStream={stopStream}
        />
        <div ref={div} className="absolute inset-0" />
        <div className="absolute top-3 left-3 p-2 text-white">
          <XIcon width={28} height={28} onClick={onClose} />
        </div>
      </Col>
    </Transition>
  );
};

export default QrScannerModal;
