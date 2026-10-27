import type { Metadata } from "next";
import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "TempahSekolah — Satu program. Satu pautan. Lebih teratur.",
    template: "%s | TempahSekolah",
  },
  description:
    "Kenali TempahSekolah, platform tempahan program untuk komuniti sekolah Malaysia. Penyertaan, makanan, barangan dan slot dalam satu pautan.",
  robots: { index: false, follow: false },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ms">
      <body>
        <a className="skip-link" href="#kandungan">
          Langkau ke kandungan
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
