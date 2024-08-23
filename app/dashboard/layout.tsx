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

const icon = {
  className: "w-5 h-5 text-inherit",
};

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const sidenavType = "dark";
  const routes: any = [
    {
      icon: <HomeIcon {...icon} />,
      name: "dashboard",
      path: "/dashboard",
    },
    {
      icon: <UserCircleIcon {...icon} />,
      name: "Siswa",
      path: "/siswa",
    },
    {
      icon: <DocumentIcon {...icon} />,
      name: "report",
      path: "/report",
    },
  ];
  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      <div className="p-4 xl:ml-80">
        {/* <DashboardNavbar /> */}
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
