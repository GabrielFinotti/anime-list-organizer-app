import type { Metadata } from "next";
import "./globals.scss";
import Nav from "@/components/layout/Nav/Nav";

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
      <body>
        <header>
          <Nav />
        </header>
        {children}
      </body>
    </html>
  );
}
