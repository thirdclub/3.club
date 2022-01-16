import {
  CakeIcon,
  HomeIcon,
  IdentificationIcon,
} from "@heroicons/react/outline";
import Button from "components/buttons/Button";
import Col from "components/layout/Col";
import Config from "config/config";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { classNames } from "utils/ui-util";

const SideBar: FC<{}> = () => {
  const router = useRouter();

  const navigation = [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/event", icon: CakeIcon, label: "Event" },
    { href: "/pass", icon: IdentificationIcon, label: "Pass" },
  ];

  return (
    <section className="fixed inset-y-0 bg-black w-48">
      <Col className="h-full p-4 space-y-3">
        <span className="text-2xl text-white font-extrabold tracking-tighter font-sans">
          {Config.appName.toUpperCase()}
        </span>
        {navigation.map((e, i) => (
          <Link key={i} href={e.href}>
            <a>
              <Button
                className={classNames(
                  "flex flex-row space-x-2 w-full",
                  router.asPath == e.href ? "bg-indigo-500" : undefined
                )}
                color="secondary"
              >
                <e.icon height={24} width={24} />
                <div>{e.label}</div>
              </Button>
            </a>
          </Link>
        ))}
        <div className="flex-1" />
        <Button color="secondary" onClick={() => signOut()}>
          Logout
        </Button>
      </Col>
    </section>
  );
};

export default SideBar;
