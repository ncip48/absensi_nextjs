"use client";

import Table from "@/components/Table";
import { getStudents } from "@/services/actions/student";
import useEffectAfterMount from "@/utils/useEffectAfterMount";
import React, { useState } from "react";
import DashboardNavbar from "../_components/DashboardNavbar";
import CardMain from "@/components/CardMain";

function Index() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    let res = await getStudents();
    res?.map((item: any) => {
      item.sex_str = item.sex === 1 ? "Laki-Laki" : "Perempuan";
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
      <DashboardNavbar active="Siswa" />
      <CardMain title="Daftar Siswa">
        <Table
          items={students}
          loading={loading}
          heads={["NIS", "NISN", "Nama", "Jenis Kelamin", "Status"]}
          keys={["nis", "nisn", "name", "sex_str"]}
        />
      </CardMain>
    </>
  );
}

export default Index;
