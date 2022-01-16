import { FC, MouseEventHandler } from "react";
import { shortenAddress } from "utils/web3-utils";

const ConnectButton: FC<{
  iconSrc: string;
  onClick: MouseEventHandler;
}> = ({ children, iconSrc, onClick }) => {
  return (
    <div className="font-bold rounded-xl">
      <button
        type="button"
        className="bg-zinc-100 hover:bg-zinc-200 text-black font-bold py-3 px-5 rounded-md w-full"
        onClick={onClick}
      >
        <div className="flex flex-row items-center gap-3 w-max">
          <img style={{ height: 24, width: 24 }} src={iconSrc} alt="icon" />
          Continue with {children}
        </div>
      </button>
    </div>
  );
};

export default ConnectButton;
