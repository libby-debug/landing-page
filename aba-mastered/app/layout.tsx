import "./globals.css";

export const metadata = {
  title: "ABA Mastered",
  description: "BCBA Exam Prep Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
