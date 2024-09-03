/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/siswa",
        destination: "/dashboard/siswa",
      },
      {
        source: "/report",
        destination: "/dashboard/report",
      },
      {
        source: "/report-absen",
        destination: "/dashboard/report",
      },
      {
        source: "/akun",
        destination: "/dashboard/akun",
      },
    ];
  },
};

export default nextConfig;
