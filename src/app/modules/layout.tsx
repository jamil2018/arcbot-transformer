import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Modules",
  description: "All available modules",
};

export default function ModulePageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
