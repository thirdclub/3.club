import { FC } from "react";
import { classNames } from "utils/ui-util";

const Row: FC<{
  className?: string;
}> = (props) => {
  const { children, className } = props;
  return <div className={classNames("flex", className)}>{children}</div>;
};

export default Row;
