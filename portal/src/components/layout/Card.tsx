import { FC } from "react";

const Card: FC<{ className?: string }> = (props) => {
  const { children, className } = props;
  return (
    <div
      className={`py-8 px-4 shadow-md ring-2 ring-black rounded-md ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
