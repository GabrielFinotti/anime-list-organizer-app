import type { Metadata } from "next";
import "./globals.scss";
import localFont from "next/font/local";
import SessionCleanup from "@/components/SessionCleanup";

export const metadata: Metadata = {
  title: "Anime List Organizer",
  description: "Organize seus animes de forma prática e eficiente.",
};

const WorkSans = localFont({
  src: "./WorkSans.woff2",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={WorkSans.className}>
        <SessionCleanup />
        {children}
      </body>
    </html>
  );
}
