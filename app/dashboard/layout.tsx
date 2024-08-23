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
  const routes = [
    {
      icon: <HomeIcon {...icon} />,
      name: "dashboard",
      path: "/dashboard",
    },
    {
      icon: <UserCircleIcon {...icon} />,
      name: "Siswa",
      path: "/dashboard/siswa",
    },
    {
      icon: <DocumentIcon {...icon} />,
      name: "report",
      path: "/dashboard/report",
    },
  ];
  return (
    // <section className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    //   {/* Include shared UI here e.g. a header or sidebar */}
    //   <div className="flex h-screen">
    //     <aside className="w-64 bg-gray-800 text-gray-100 dark:bg-gray-700 dark:text-gray-200">
    //       <div className="p-4">
    //         <h2 className="text-xl font-bold">Admin Panel</h2>
    //         <ul className="mt-4 space-y-2">
    //           <li>
    //             <a
    //               href="#"
    //               className="block px-4 py-2 hover:bg-gray-700 dark:hover:bg-gray-600"
    //             >
    //               Dashboard
    //             </a>
    //           </li>
    //           <li>
    //             <a
    //               href="#"
    //               className="block px-4 py-2 hover:bg-gray-700 dark:hover:bg-gray-600"
    //             >
    //               Users
    //             </a>
    //           </li>
    //           <li>
    //             <a
    //               href="#"
    //               className="block px-4 py-2 hover:bg-gray-700 dark:hover:bg-gray-600"
    //             >
    //               Settings
    //             </a>
    //           </li>
    //         </ul>
    //       </div>
    //     </aside>

    //     <div className="flex-1 flex flex-col">
    //       <header className="bg-white shadow p-4 flex justify-between items-center dark:bg-gray-800 dark:text-gray-200">
    //         <div className="text-xl font-semibold">Dashboard</div>
    //         <div className="space-x-4">
    //           <button className="bg-blue-500 text-white px-4 py-2 rounded dark:bg-blue-600">
    //             Notifications
    //           </button>
    //           <button className="bg-blue-500 text-white px-4 py-2 rounded">
    //             Profile
    //           </button>
    //         </div>
    //       </header>

    //       {children}
    //     </div>
    //   </div>
    // </section>
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
