import CardTotal from "@/components/CardTotal";
import { Metadata } from "next";
import React from "react";
import DashboardNavbar from "./_components/DashboardNavbar";
import BarChart from "@/components/BarChart";
import PieChart from "@/components/PieChart";
import {
  AcademicCapIcon,
  CheckBadgeIcon,
  ClockIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";

export const metadata: Metadata = {
  title: "Dashboard",
};

function Index() {
  return (
    <>
      {/* <DashboardNavbar active="Home" /> */}
      <div className="mt-12">
        <div className="mb-10 grid gap-y-10 gap-x-8 md:grid-cols-2 xl:grid-cols-4">
          <CardTotal
            label="Total Siswa"
            value={10}
            subtitle="Menampilkan jumlah siswa aktif"
            icon={<AcademicCapIcon className="w-6 h-6 text-white" />}
          />
          <CardTotal
            label="Absen Tepat Waktu"
            value={5}
            subtitle="Absen per hari ini"
            icon={<ClockIcon className="w-6 h-6 text-white" />}
          />
          <CardTotal
            label="Absen Terlambat"
            value={5}
            subtitle="Absen per hari ini"
            icon={<ExclamationTriangleIcon className="w-6 h-6 text-white" />}
          />
          <CardTotal
            label="Absen Full Time"
            value={5}
            subtitle="Absen per hari ini"
            icon={<CheckBadgeIcon className="w-6 h-6 text-white" />}
          />
        </div>
        <div className="mb-10 grid gap-y-10 gap-x-8 md:grid-cols-1 xl:grid-cols-2">
          <BarChart
            title="Grafik Absen 7 Hari"
            categories={["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]}
            data={[
              {
                name: "Tepat Waktu",
                data: [28, 20, 25, 23, 22, 24],
              },
              {
                name: "Terlambat",
                data: [0, 8, 3, 5, 6, 4],
              },
              {
                name: "Full Time",
                data: [28, 19, 10, 11, 10, 28],
              },
            ]}
          />
          <PieChart
            title="Jumlah Absen Hari Ini"
            data={[20, 8, 28]}
            label={["Tepat Waktu", "Terlambat", "Full Time"]}
          />
        </div>
      </div>
    </>
  );
}

export default Index;
