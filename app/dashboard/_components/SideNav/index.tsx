"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/solid";
import { logout } from "@/app/lib";

interface SidenavProps {
  brandImg: string;
  brandName: string;
  routes: Array<{
    icon: string;
    name: string;
    path: string;
  }>;
}

export function Sidenav({
  brandImg = "/img/logo-ct.png",
  brandName = "Absensi App",
  routes = [],
}) {
  const pathname = usePathname();
  const [openSidenav, setOpenSidenav] = useState(true);
  const sidenavType = "dark";
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
    >
      <div className={`relative`}>
        <Link href="/dashboard" className="py-6 px-8 text-center">
          <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">
            {brandName}
          </h6>
        </Link>
      </div>
      <div className="m-4">
        {routes.map(({ icon, name, path }: any) => (
          <Link href={path} key={name}>
            <button
              className={`align-middle select-none font-sans font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg ${
                path === pathname
                  ? "bg-white text-blue-gray-900 shadow-md shadow-blue-gray-500/10 hover:shadow-lg hover:shadow-blue-gray-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                  : "text-white hover:bg-white/10 active:bg-white/30"
              } w-full flex items-center gap-4 px-4 capitalize`}
            >
              {icon}
              <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                {name}
              </p>
            </button>
          </Link>
        ))}
        <button
          onClick={(e) => {
            logout();
          }}
          className={`align-middle select-none font-sans font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30" w-full flex items-center gap-4 px-4 capitalize`}
        >
          <ArrowLeftStartOnRectangleIcon className="w-5 h-5 text-inherit" />
          <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
            Logout
          </p>
        </button>
      </div>
    </aside>
  );
}
