import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الأحاديث النبوية - منصة المنارة الإسلامية",
  description: "منصة المنارة الإسلامية للدعوة",
};

export default function HadithLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
