import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vibify",
  description: "Keep track of your top spotify playlists and songs",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className=" font-main">
        {children}
      </body>
    </html>
  );
}
