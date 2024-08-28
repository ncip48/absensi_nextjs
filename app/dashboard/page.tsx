import CardTotal from "@/components/CardTotal";
import { Metadata } from "next";
import React from "react";
import DashboardNavbar from "./_components/DashboardNavbar";

export const metadata: Metadata = {
  title: "Dashboard",
};

function Index() {
  return (
    <>
      {/* <DashboardNavbar active="Home" /> */}
      <div className="mt-12">
        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
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
      </div>
    </>
  );
}

export default Index;
