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
    ];
  },
};

export default nextConfig;
