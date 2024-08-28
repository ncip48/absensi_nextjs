"use client";

import ApexCharts from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";

const BarChart = ({ title }: { title: string }) => {
  const [state, setState] = React.useState({
    series: [
      {
        name: "Jumlah Masuk",
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
      },
      {
        name: "Telat",
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
      },
    ],
    options: {
      grid: {
        borderColor: "#e2e6e9",
        strokeDashArray: 4,
      },
      theme: {
        mode: "dark",
      },
      fill: {
        opacity: 1,
      },
      colors: ["#28a745", "#dc3545"],
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: true,
        position: "top",
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
        ],
        labels: {
          show: true,
          style: {
            fontSize: "8px",
            cssClass: "apexcharts-xaxis-label",
          },
        },
      },
      yaxis: {
        title: {
          text: "Jumlah",
        },
        labels: {
          show: true,
          minWidth: 0,
          maxWidth: 160,
          style: {
            fontSize: "8px",
            cssClass: "apexcharts-yaxis-label",
          },
          offsetX: 0,
          offsetY: 0,
          rotate: 0,
        },
      },
      tooltip: {
        enabled: false,
        y: {
          formatter: function (val: number) {
            return "$ " + val + " thousands";
          },
        },
      },
    },
  });

  return (
    <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 border border-blue-gray-100 shadow-sm dark:bg-dark-800 dark:border-dark-800 dark:text-white">
      <div className="border-b border-blue-gray-50 p-4 dark:border-gray-900">
        <p className="block antialiased font-sans text-base leading-relaxed font-medium text-blue-gray-600">
          {title}
        </p>
      </div>
      <div className="p-4" id="chart">
        <ReactApexChart
          options={{
            ...state.options,
          }}
          series={state.series}
          type="bar"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default BarChart;
