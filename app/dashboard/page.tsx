import CardTotal from "@/components/CardTotal";
import { Metadata } from "next";
import React from "react";
import DashboardNavbar from "./_components/DashboardNavbar";
import BarChart from "@/components/BarChart";
import PieChart from "@/components/PieChart";

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
          />
          <CardTotal
            label="Total Kelas"
            value={5}
            subtitle="Menampilkan jumlah kelas"
          />
          <CardTotal
            label="Absen Tepat Waktu"
            value={5}
            subtitle="Absen per hari ini"
          />
          <CardTotal
            label="Absen Terlambat"
            value={5}
            subtitle="Absen per hari ini"
          />
        </div>
        <div className="mb-10 grid gap-y-10 gap-x-8 md:grid-cols-1 xl:grid-cols-2">
          <BarChart
            title="Grafik Absen Tahunan"
            categories={[
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
            ]}
            data={[
              {
                name: "Jumlah Masuk",
                data: [28, 20, 25, 23, 22, 24, 21, 23, 22],
              },
              {
                name: "Telat",
                data: [0, 8, 3, 5, 6, 4, 7, 6, 7],
              },
            ]}
          />
          <PieChart
            title="Jumlah Absen Hari Ini"
            data={[20, 8]}
            label={["Jumlah Masuk", "Terlambat"]}
          />
        </div>
      </div>
    </>
  );
}

export default Index;
