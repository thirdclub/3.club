import { FC } from "react";
import { classNames } from "utils/ui-util";

const Col: FC<{
  className?: string;
  onClick?: () => void;
}> = (props) => {
  const { children, className, onClick } = props;
  return (
    <div className={classNames("flex flex-col", className)} onClick={onClick}>
      {children}
    </div>
  );
};

export default Col;
