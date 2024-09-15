import React from "react";
import Table from "../Table";

const TopTenAbsent = ({ title, data }: { title: string; data: any }) => {
  return (
    <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 border border-blue-gray-100 shadow-sm dark:bg-dark-800 dark:border-dark-800 dark:text-white">
      <div className="border-b border-blue-gray-50 p-4 dark:border-gray-900">
        <p className="block antialiased font-sans text-base leading-relaxed font-medium text-blue-gray-600">
          {title}
        </p>
      </div>
      <div className="py-4">
        <Table
          loading={false}
          items={data}
          heads={["NIS", "Nama", "Kelas", "Waktu"]}
          keys={["nis", "nama", "kelas", "waktu"]}
          noAction
          noStatus
          noNo
          noPagination
          wFull
        />
      </div>
    </div>
  );
};

export default TopTenAbsent;
