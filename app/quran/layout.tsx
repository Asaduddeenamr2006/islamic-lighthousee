import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "القرآن الكريم - منصة المنارة الإسلامية",
  description: "منصة المنارة الإسلامية للدعوة",
};

export default function QuranLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
