import Link from "next/link";
import { FC, MouseEventHandler } from "react";
import { classNames } from "utils/ui-util";

const Button: FC<{
  onClick?: MouseEventHandler | undefined;
  href?: string;
  variant?: "contained" | "outlined" | "text" | "icon";
  color?: "primary" | "secondary";
  loading?: boolean;
  className?: string;
}> = ({
  onClick,
  href,
  loading,
  className,
  variant = "contained",
  color = "primary",
  children,
}) => {
  let widget = (
    <button
      type="button"
      className={classNames(
        "py-2 px-3 rounded-md duration-200",
        variant == "contained" && color == "primary"
          ? "bg-black hover:bg-zinc-800 text-white"
          : "",
        variant == "contained" && color == "secondary"
          ? "bg-zinc-100 hover:bg-zinc-200 text-black"
          : "",
        variant == "outlined" ? "border border-black" : "",
        variant == "text" ? "hover:bg-zinc-100 text-black" : "",
        variant == "icon" ? "px-2 bg-zinc-100 hover:bg-zinc-200 text-black" : "",

        className
      )}
      onClick={loading ? undefined : onClick}
      disabled={loading}
    >
      {children}
    </button>
  );
  if (href) {
    widget = (
      <Link href={href}>
        <a>{widget}</a>
      </Link>
    );
  }

  return widget;
};

export default Button;
