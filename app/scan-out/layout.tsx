import Nav from "./_components/nav";

export const metadata = {
  title: "Scan Keluar",
};
export default function AuthLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      {children}
    </>
  );
}
