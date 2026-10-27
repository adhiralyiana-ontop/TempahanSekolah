import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Mail, Info, ArrowUpRight } from "lucide-react";
import { getDemoContactHref } from "@/lib/demo-contact";

export const metadata: Metadata = { title: "Bincang keperluan sekolah" };
export const dynamic = "force-dynamic";

export default function DemoPage() {
  const contactHref = getDemoContactHref();
  return (
    <main id="kandungan" className="content-page">
      <div className="container">
        <div className="page-card">
          <p className="eyebrow">LANGKAH PERTAMA, BERSAMA</p>
          <h1>Setiap sekolah ada ceritanya.</h1>
          <p className="lead">
            Kongsikan cara sekolah anda mengurus program dan perkara yang ingin
            dipermudahkan. TempahSekolah masih dalam pembangunan; demo langsung
            dan akaun sekolah belum tersedia.
          </p>
          <div className="info-box">
            {contactHref ? (
              <>
                <h2>
                  <Mail size={20} aria-hidden="true" />
                  Mulakan melalui e-mel
                </h2>
                <p>
                  Butang ini membuka aplikasi e-mel anda dengan draf mesej.
                  Semak dan hantar sendiri. Laman ini tidak menyimpan atau
                  menghantar permintaan anda.
                </p>
                <a className="button button-primary" href={contactHref}>
                  Buka draf e-mel <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              </>
            ) : (
              <>
                <h2>
                  <Info size={20} aria-hidden="true" />
                  Permintaan demo belum dibuka
                </h2>
                <p>
                  Alamat hubungan rasmi belum ditetapkan. Sila kembali kemudian.
                  Tiada borang atau data peribadi dikumpulkan pada halaman ini.
                </p>
              </>
            )}
          </div>
          <p>Untuk perbincangan nanti, fikirkan:</p>
          <ul>
            <li>Jenis program dan anggaran bilangan peserta.</li>
            <li>Keperluan penyertaan, makanan, barangan atau slot.</li>
            <li>Cabaran penganjur semasa mengurus tempahan.</li>
          </ul>
          <p className="lead">
            Jangan sertakan maklumat murid, butiran bank atau kata laluan.
          </p>
          <Link href="/" className="text-link">
            <ArrowLeft size={16} aria-hidden="true" />
            Kembali ke laman utama
          </Link>
        </div>
      </div>
    </main>
  );
}
