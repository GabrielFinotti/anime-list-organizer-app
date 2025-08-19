import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Anime List Organizer",
  description: "Organize seus animes de forma prática e eficiente.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
