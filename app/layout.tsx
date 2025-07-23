import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";


export const metadata: Metadata = {
  title: "My Business",
  description: "My business management app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased p-8" >
        <div className="max-w-7xl mx-auto">
          <Navbar />
          <div className="py-10">{children}</div>
        </div>
      </body>
    </html>
  );
}
