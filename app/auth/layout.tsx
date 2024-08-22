export const metadata = {
  title: "Auth",
};
export default function AuthLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return children;
}
