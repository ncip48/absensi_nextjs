"use client";

import Table from "@/components/Table";
import { getStudents } from "@/services/actions/student";
import useEffectAfterMount from "@/utils/useEffectAfterMount";
import React, { useState } from "react";
import DashboardNavbar from "../_components/DashboardNavbar";
import CardMain from "@/components/CardMain";
import { getSession } from "@/app/lib";

function Index() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

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

  const checkAdmin = async () => {
    const storage = await getSession();
    const role = storage?.user?.profile?.role;
    if (role != 2) {
      setIsAdmin(false);
    } else {
      setIsAdmin(true);
    }
  };

  useEffectAfterMount(() => {
    getData();
    checkAdmin();
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
          noAction={!isAdmin}
        />
      </CardMain>
    </>
  );
}

export default Index;
