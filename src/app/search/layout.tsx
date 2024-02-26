import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Movies",
  description: "ReBird is a movie search engine.",
};

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
