import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Locators",
  description: "All available locators in the repository",
};

export default function LocatorPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
