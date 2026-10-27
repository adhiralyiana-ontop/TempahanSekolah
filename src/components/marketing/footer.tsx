import { Brand } from "@/components/ui/brand";
import Link from "next/link";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div>
          <Brand inverse />
          <p>Dibina untuk komuniti sekolah Malaysia.</p>
        </div>
        <nav aria-label="Navigasi bawah">
          <Link href="/#kelebihan">Kelebihan</Link>
          <Link href="/#soalan-lazim">Soalan lazim</Link>
          <Link href="/demo">Permintaan demo</Link>
        </nav>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getUTCFullYear()} TempahSekolah</span>
        <span>Fasa pembangunan awal · Belum dibuka untuk tempahan</span>
        <span>Direka dengan teliti, untuk sekolah.</span>
      </div>
    </footer>
  );
}
