"use client";

import Table from "@/components/Table";
import useEffectAfterMount from "@/utils/useEffectAfterMount";
import React, { useState } from "react";
import DashboardNavbar from "../_components/DashboardNavbar";
import CardMain from "@/components/CardMain";
import { getAttendanceRange } from "@/services/actions/report";

function Index() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateStart, setDateStart] = useState(
    new Date(new Date().setDate(new Date().getDate() - 7))
      .toISOString()
      .split("T")[0]
  );
  const [dateEnd, setDateEnd] = useState(
    new Date().toISOString().split("T")[0]
  );

  const getData = async () => {
    setLoading(true);
    let res = await getAttendanceRange(
      dateStart + "T00:00:00",
      dateEnd + "T00:00:00"
    );
    res?.map((item: any) => {
      item.timein_parse = new Date(item.timein).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      item.tanggal = new Date(item.timein).toLocaleDateString();
    });
    // console.table(res);
    setStudents(res);
    setLoading(false);
  };

  useEffectAfterMount(() => {
    getData();
  }, [dateStart, dateEnd]);

  return (
    <>
      <DashboardNavbar active="Report" />
      <CardMain title="Laporan Absensi">
        <div className="flex flex-row gap-2 mb-6">
          <div className="flex items-center">
            <input
              type="date"
              id="dateStart"
              value={dateStart}
              onChange={(e) => setDateStart(e.target.value)}
              className="px-3 py-2.5 ml-6 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-dark-900 dark:text-gray-300"
            />
          </div>
          <div className="flex items-center">
            <label
              htmlFor="dateEnd"
              className="text-sm font-medium text-gray-700 dark:text-gray-400"
            >
              Sampai
            </label>
            <input
              type="date"
              id="dateEnd"
              value={dateEnd}
              onChange={(e) => setDateEnd(e.target.value)}
              className="px-3 py-2.5 ml-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-dark-900 dark:text-gray-300"
            />
          </div>
        </div>
        <Table
          items={students}
          loading={loading}
          heads={["Tanggal", "NIS", "Nama", "Jam Masuk"]}
          keys={["tanggal", "student.nis", "student.name", "timein_parse"]}
          noAction
          noStatus
        />
      </CardMain>
    </>
  );
}

export default Index;
