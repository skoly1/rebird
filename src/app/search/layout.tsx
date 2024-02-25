import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ReBird Profile",
  description: "ReBird is a Manager for Real Debrid Account",
};

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
