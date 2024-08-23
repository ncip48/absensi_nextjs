"use client";

import Table from "@/components/Table";
import { getStudents } from "@/services/actions/student";
import useEffectAfterMount from "@/utils/useEffectAfterMount";
import React, { useState } from "react";
import DashboardNavbar from "../_components/DashboardNavbar";

function Index() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    let res = await getStudents();
    res.map((item: any) => {
      item.sex = item.sex === 1 ? "Laki-Laki" : "Perempuan";
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
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
          <div className="relative bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 shadow-lg -mt-6 mb-8 p-6">
            <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">
              Daftar Siswa
            </h6>
          </div>
          <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">
            <Table
              items={students}
              loading={loading}
              heads={["NIS", "NISN", "Nama", "Jenis Kelamin", "Status"]}
              keys={["nis", "nisn", "name", "sex"]}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
