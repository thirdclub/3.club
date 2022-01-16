import { Transition } from "@headlessui/react";
import { FC } from "react";

const LoadingOverlay: FC<{ loading: boolean }> = (props) => {
  const { loading } = props;
  return (
    <Transition
      show={loading}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className="flex fixed inset-0 justify-center items-center"
        style={{ background: "rgba(0,0,0,0.6)" }}
      >
        <div
          className="w-8 h-8 border-4 border-white border-solid rounded-full animate-spin"
          style={{ borderTopColor: "transparent" }}
        />
      </div>
    </Transition>
  );
};

export default LoadingOverlay;
