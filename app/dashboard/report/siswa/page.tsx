"use client";

import Table from "@/components/Table";
import useEffectAfterMount from "@/utils/useEffectAfterMount";
import React, { useState } from "react";
import DashboardNavbar from "../../_components/DashboardNavbar";
import CardMain from "@/components/CardMain";
import {
  getAttendanceRange,
  printAttendanceRange,
  printAttendanceRange2,
  printAttendanceRange3,
} from "@/services/actions/report";
import Button from "@/components/Button";
import { getSession } from "@/app/lib";
import { getStudents } from "@/services/actions/student";

function Index() {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [dateStart, setDateStart] = useState(
    new Date(new Date().setDate(new Date().getDate() - 7))
      .toISOString()
      .split("T")[0]
  );
  const [dateEnd, setDateEnd] = useState(
    new Date(new Date().setDate(new Date().getDate()))
      .toISOString()
      .split("T")[0]
  );
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState({
    id: "",
    nis: "",
  });

  const getData = async () => {
    setLoading(true);

    const dStart = dateStart;
    const dEnd = new Date(
      new Date(dateEnd).setDate(new Date(dateEnd).getDate() + 1)
    )
      .toISOString()
      .split("T")[0];

    console.log(student);
    // return;

    let res = await getAttendanceRange(
      dStart + "T00:00:00",
      dEnd + "T00:00:00",
      student?.id
    );
    res?.map((item: any) => {
      item.timein_parse = new Date(item.timein).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      item.timeout_parse = item.timeout
        ? new Date(item.timeout).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          })
        : "-";
      item.tanggal = new Date(item.timein).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    });
    res?.sort(
      (a: any, b: any) =>
        new Date(b.timein).getTime() - new Date(a.timein).getTime()
    );
    // console.table(res);
    setDatas(res);
    setLoading(false);
  };

  const printData = async () => {
    setLoadingPdf(true);
    const dStart = dateStart;
    const dEnd = new Date(
      new Date(dateEnd).setDate(new Date(dateEnd).getDate() + 1)
    )
      .toISOString()
      .split("T")[0];

    const res = await printAttendanceRange3(
      dStart + "T00:00:00",
      dEnd + "T00:00:00",
      "",
      student?.nis
    );
    console.log(res);
    const url = URL.createObjectURL(res);
    window.open(url); // Open the PDF in a new tab
    setLoadingPdf(false);
  };

  useEffectAfterMount(() => {
    getSiswa();
  }, []);

  const getSiswa = async () => {
    let res = await getStudents();
    setStudents(res);
  };

  return (
    <>
      {/* <DashboardNavbar active="Report" /> */}
      <CardMain title="Laporan Absensi per Siswa">
        <div className="flex flex-row gap-2 mb-6">
          <div className="flex items-center">
            <input
              type="date"
              id="dateStart"
              value={dateStart}
              onChange={(e) => setDateStart(e.target.value)}
              className="px-3 py-2.5 ml-5 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-dark-900 dark:text-gray-300"
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
          <div className="flex items-center">
            <select
              name="student"
              defaultValue=""
              onChange={(e: any) => setStudent(JSON.parse(e.target.value))}
              className="p-2.5 block max-w-52 rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-dark-900 dark:text-gray-300 dark:placeholder-gray-400 dark:focus:ring-gray-700 dark:focus:border-gray-700"
            >
              <option value="" disabled>
                -- Pilih Siswa --
              </option>
              {students?.map((item: any, index: number) => {
                return (
                  <option key={index} value={JSON.stringify(item)}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <Button title="Lihat" onClick={getData} loading={loading} />
          <Button title="Cetak PDF" onClick={printData} loading={loadingPdf} />
        </div>
        <Table
          items={datas}
          loading={loading}
          heads={["Tanggal", "Jam Masuk", "Jam Pulang"]}
          keys={["tanggal", "timein_parse", "timeout_parse"]}
          noAction
          noStatus
        />
      </CardMain>
    </>
  );
}

export default Index;
