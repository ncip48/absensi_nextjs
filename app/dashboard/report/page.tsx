"use client";

import Table from "@/components/Table";
import useEffectAfterMount from "@/utils/useEffectAfterMount";
import React, { useState } from "react";
import DashboardNavbar from "../_components/DashboardNavbar";
import CardMain from "@/components/CardMain";
import { getAttendances } from "@/services/actions/report";

function Index() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    let res = await getAttendances();
    res?.map((item: any) => {
      item.timein_parse = new Date(item.timein).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
    });
    // console.table(res);
    setStudents(res);
    setLoading(false);
  };

  useEffectAfterMount(() => {
    getData();
  }, []);

  return (
    <>
      <DashboardNavbar active="Report" />
      <CardMain title="Laporan Absensi">
        <Table
          items={students}
          loading={loading}
          heads={["NIS", "Nama", "Jam Masuk"]}
          keys={["student.nis", "student.name", "timein_parse"]}
          noAction
          noStatus
        />
      </CardMain>
    </>
  );
}

export default Index;
