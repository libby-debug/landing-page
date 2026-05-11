import "./globals.css";
import { PlatformShell } from "@/components/platform-shell";

export const metadata = {
  title: "ABA Mastered",
  description: "Master the BCBA Task List visually.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-100 text-slate-950">
        <PlatformShell>{children}</PlatformShell>
      </body>
    </html>
  );
}