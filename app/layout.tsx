import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gökyüzü Mitleri Atlası",
  description: "Türk mitolojisindeki yıldız hikâyelerini çağdaş sanat ve dijital teknolojiyle birleştiren interaktif web projesi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
