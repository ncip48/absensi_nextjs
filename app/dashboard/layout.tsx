"use client";

import { usePathname } from "next/navigation";
import { NavLinks } from "../ui/nav-links";
import { Footer } from "./_components/Footer";
import { Sidenav } from "./_components/SideNav";
import {
  HomeIcon,
  UserCircleIcon,
  DocumentIcon,
  InformationCircleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import DashboardNavbar from "./_components/DashboardNavbar";
import useEffectAfterMount from "@/utils/useEffectAfterMount";
import { useEffect, useState } from "react";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const sidenavType = "dark";
  const pathname = usePathname();
  const routes: any = [
    {
      icon: <HomeIcon {...icon} />,
      name: "dashboard",
      path: "/dashboard",
      active: "Home",
      role: [1],
    },
    {
      icon: <UserCircleIcon {...icon} />,
      name: "Siswa",
      path: "/siswa",
      active: "Siswa",
      role: [1, 2],
    },
    {
      icon: <DocumentIcon {...icon} />,
      name: "report",
      path: "/report",
      active: "Report",
      role: [1],
    },
  ];

  const [openSidenav, setOpenSidenav] = useState(true);

  const [width, setWidth] = useState<number>(
    typeof window !== "undefined" ? window?.innerWidth : 0
  );

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffectAfterMount(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isDesktop = width >= 992;

  useEffect(() => {
    setOpenSidenav(isDesktop ? true : false);
  }, [isDesktop]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      <Sidenav
        routes={routes}
        stateSidebar={openSidenav}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      <div className={`p-4 ${!openSidenav ? "" : "xl:ml-80 xl:pl-0"}`}>
        <DashboardNavbar
          onPressMenu={() => setOpenSidenav(!openSidenav)}
          active={
            routes.find((route: any) => route.path === pathname)?.active ||
            "Home"
          }
        />
        {/* <Configurator /> */}
        {/* <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton> */}
        {children}
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}
