import { Dialog, Transition } from "@headlessui/react";
import React, { FC, Fragment, ReactNode } from "react";

const Modal: FC<{
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}> = (props) => {
  const { open, onClose, children } = props;

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog className="fixed inset-0 z-10 overflow-y-auto" onClose={onClose}>
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-60" />
          </Transition.Child>
          <span className="inline-block h-screen align-middle">&#8203;</span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block p-6 align-middle transition-all transform bg-white shadow-xl rounded-2xl w-[640px] max-w-full">
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
