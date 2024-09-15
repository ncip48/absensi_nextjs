"use client";

import CardTotal from "@/components/CardTotal";
import { Metadata } from "next";
import React, { useState } from "react";
import DashboardNavbar from "./_components/DashboardNavbar";
import BarChart from "@/components/BarChart";
import PieChart from "@/components/PieChart";
import {
  AcademicCapIcon,
  CheckBadgeIcon,
  ClockIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import { getStatistics } from "@/services/actions/dashboard";
import useEffectAfterMount from "@/utils/useEffectAfterMount";
import TopTenAbsent from "@/components/TopTenAbsent";

function Index() {
  const [statistics, setStatistics] = useState({
    totalSiswa: 0,
    tepatWaktu: 0,
    terlambat: 0,
    fullTime: 0,
    topTen: [],
  });
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    const res = await getStatistics();
    setStatistics({ ...res });
    console.log(res);
    setLoading(false);
  };

  useEffectAfterMount(() => {
    getData();
    document.title = "Dashboard";
  }, []);

  return (
    <>
      {/* <DashboardNavbar active="Home" /> */}
      <div className="mt-12">
        <div className="mb-10 grid gap-y-10 gap-x-8 md:grid-cols-2 xl:grid-cols-4">
          <CardTotal
            label="Total Siswa"
            value={statistics?.totalSiswa}
            subtitle="Menampilkan jumlah siswa aktif"
            icon={<AcademicCapIcon className="w-6 h-6 text-white" />}
          />
          <CardTotal
            label="Absen Tepat Waktu"
            value={statistics?.tepatWaktu}
            subtitle="Absen per hari ini"
            icon={<ClockIcon className="w-6 h-6 text-white" />}
          />
          <CardTotal
            label="Absen Terlambat"
            value={statistics?.terlambat}
            subtitle="Absen per hari ini"
            icon={<ExclamationTriangleIcon className="w-6 h-6 text-white" />}
          />
          <CardTotal
            label="Absen Full Time"
            value={statistics?.fullTime}
            subtitle="Absen per hari ini"
            icon={<CheckBadgeIcon className="w-6 h-6 text-white" />}
          />
        </div>
        {!loading ? (
          <div className="mb-10 grid gap-y-10 gap-x-8 md:grid-cols-1 xl:grid-cols-2">
            <TopTenAbsent data={statistics?.topTen} title="Top 10 Absen" />
            <PieChart
              title="Jumlah Absen Hari Ini"
              data={[
                statistics?.tepatWaktu,
                statistics?.terlambat,
                statistics?.fullTime,
              ]}
              label={["Tepat Waktu", "Terlambat", "Full Time"]}
            />
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Index;
