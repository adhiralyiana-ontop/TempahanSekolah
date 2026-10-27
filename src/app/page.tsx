import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Link2,
  SlidersHorizontal,
  Share2,
  ClipboardCheck,
  Layers3,
  ScanLine,
  ShieldCheck,
  GraduationCap,
  HeartHandshake,
  School,
  Sparkles,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { ProgramPreview } from "@/components/marketing/program-preview";

const benefits = [
  {
    icon: Layers3,
    number: "01",
    title: "Pelbagai keperluan. Satu tempat.",
    text: "Penyertaan, makanan, barangan, slot aktiviti dan kemudahan — disusun mengikut program.",
    className: "teal",
  },
  {
    icon: ClipboardCheck,
    number: "02",
    title: "Lebih jelas untuk penganjur.",
    text: "Dirancang untuk membantu guru menyemak kuota, rekod tempahan dan status bayaran tanpa bertukar senarai.",
    className: "yellow",
  },
  {
    icon: ScanLine,
    number: "03",
    title: "Hari program lebih lancar.",
    text: "Aliran resit dan pengambilan berasaskan QR dirancang supaya petugas boleh membuat semakan dengan teratur.",
    className: "blue",
  },
];
const steps = [
  {
    icon: SlidersHorizontal,
    title: "Susun program",
    text: "Tetapkan kategori, pilihan, harga dan kuota yang sesuai.",
  },
  {
    icon: Share2,
    title: "Kongsi satu pautan",
    text: "Warga sekolah melihat pilihan program di telefon mereka.",
  },
  {
    icon: ClipboardCheck,
    title: "Urus dengan teratur",
    text: "Semak tempahan, pembayaran dan pengambilan di satu tempat.",
  },
];
const faqs = [
  [
    "Apakah TempahSekolah?",
    "TempahSekolah ialah platform yang sedang dibangunkan untuk menyatukan tempahan program sekolah. Fokusnya ialah penyertaan, makanan, barangan, slot aktiviti dan kemudahan dalam program yang sama.",
  ],
  [
    "Siapakah yang boleh menggunakannya?",
    "Platform ini direka untuk sekolah kerajaan dan swasta di Malaysia, dengan aliran berbeza untuk penganjur, petugas, penjaga dan murid yang dibenarkan oleh sekolah.",
  ],
  [
    "Adakah tempahan dan pembayaran sudah dibuka?",
    "Belum. Versi ini memperkenalkan konsep produk sahaja. Katalog sebenar, akaun sekolah, pembayaran dan QR akan dibangunkan serta diuji dalam milestone seterusnya sebelum dibuka kepada pengguna.",
  ],
  [
    "Adakah murid boleh membuat tempahan sendiri?",
    "Dasar akan ditetapkan mengikut program. Tempahan murid secara kendiri memerlukan kelulusan sekolah; program yang mewajibkan penjaga perlu melalui aliran penjaga. Versi ini tidak mengumpul maklumat murid.",
  ],
  [
    "Berapakah harga penggunaannya?",
    "Harga dan pelan langganan belum dimuktamadkan. Keperluan sekolah, skop program dan aturan pilot perlu dibincangkan sebelum sebarang komitmen atau bayaran.",
  ],
];

export default function Home() {
  return (
    <main id="kandungan">
      <section className="hero">
        <div className="hero-grid container">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="live-dot" /> UNTUK KOMUNITI SEKOLAH MALAYSIA
            </div>
            <h1>
              Program sekolah,
              <br />
              kini lebih{" "}
              <span className="highlight-word">
                teratur.
                <svg viewBox="0 0 280 16" fill="none" aria-hidden="true">
                  <path
                    d="M4 12C74 0 181 0 275 8"
                    stroke="currentColor"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>
            <p className="hero-description">
              Dari penyertaan hingga pengambilan. Satukan keperluan program
              dalam satu pautan, supaya guru boleh fokus pada perkara yang lebih
              bermakna.
            </p>
            <div className="hero-buttons">
              <ButtonLink href="/demo">
                Bincang keperluan sekolah{" "}
                <ArrowUpRight size={18} aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="#cara-kerja" variant="secondary">
                Lihat cara kerja <ArrowRight size={17} aria-hidden="true" />
              </ButtonLink>
            </div>
            <div className="hero-checks">
              <span>
                <Check size={15} aria-hidden="true" /> Mesra telefon
              </span>
              <span>
                <Check size={15} aria-hidden="true" /> Bahasa Melayu
              </span>
              <span>
                <Check size={15} aria-hidden="true" /> Satu pautan program
              </span>
            </div>
            <p className="development-note">
              <span /> Dalam pembangunan · Kenali konsep sebelum mencuba
            </p>
          </div>
          <ProgramPreview />
        </div>
      </section>
      <section className="audience-strip" aria-label="Komuniti yang disokong">
        <div className="container audience-inner">
          <p>
            DIREKA UNTUK
            <br />
            <strong>seluruh warga sekolah</strong>
          </p>
          <span>
            <School aria-hidden="true" />
            Sekolah & PIBG
          </span>
          <span>
            <GraduationCap aria-hidden="true" />
            Guru & penganjur
          </span>
          <span>
            <HeartHandshake aria-hidden="true" />
            Ibu bapa & penjaga
          </span>
          <span>
            <Sparkles aria-hidden="true" />
            Murid & peserta
          </span>
        </div>
      </section>
      <section id="kelebihan" className="section container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">LEBIH MUDAH, LEBIH TERSUSUN</p>
            <h2>
              Kurangkan urusan.
              <br />
              Tambahkan kebersamaan.
            </h2>
          </div>
          <p>
            Tak perlu lagi menyatukan banyak borang dan senarai secara manual.
            Ini aliran yang sedang kami bina.
          </p>
        </div>
        <div className="benefit-grid">
          {benefits.map((benefit) => (
            <article
              className={`benefit-card ${benefit.className}`}
              key={benefit.number}
            >
              <div className="benefit-top">
                <span className="benefit-icon">
                  <benefit.icon
                    size={25}
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                </span>
                <span>{benefit.number}</span>
              </div>
              <h3>{benefit.title}</h3>
              <p>{benefit.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section id="cara-kerja" className="workflow-section">
        <div className="container">
          <div className="workflow-heading">
            <p className="eyebrow">DARI PERANCANGAN KE HARI PROGRAM</p>
            <h2>
              Satu program. Satu pautan.
              <br />
              Tiga langkah yang jelas.
            </h2>
            <p>Gambaran aliran produk yang dirancang.</p>
          </div>
          <ol className="steps">
            {steps.map((step, i) => (
              <li key={step.title}>
                <div className="step-line">
                  <span className="step-icon">
                    <step.icon size={25} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span className="step-number">0{i + 1}</span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
          <div className="trust-note">
            <ShieldCheck size={21} aria-hidden="true" />
            <p>
              <strong>Privasi diberi perhatian sejak awal.</strong> Laman
              pengenalan ini tidak meminta data murid atau menerima bayaran.
            </p>
          </div>
        </div>
      </section>
      <section id="soalan-lazim" className="section container faq-section">
        <div>
          <p className="eyebrow">SOALAN LAZIM</p>
          <h2>
            Kenali dahulu.
            <br />
            Rancang bersama.
          </h2>
          <p className="faq-intro">
            Maklumat penting sebelum sekolah anda mengambil langkah seterusnya.
          </p>
          <ButtonLink href="/demo" variant="secondary">
            Bincang dengan kami <ArrowUpRight size={16} aria-hidden="true" />
          </ButtonLink>
        </div>
        <div className="faqs">
          {faqs.map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="cta-section container">
        <div className="cta-art" aria-hidden="true">
          <Link2 size={56} strokeWidth={1.2} />
          <span>✳︎</span>
        </div>
        <div>
          <p className="eyebrow">UNTUK PROGRAM YANG LEBIH BERMAKNA</p>
          <h2>Mari susun langkah pertama.</h2>
          <p>
            Ceritakan keperluan sekolah anda dan kenali perancangan
            TempahSekolah.
          </p>
        </div>
        <ButtonLink href="/demo" variant="light">
          Bincang keperluan <ArrowUpRight size={18} aria-hidden="true" />
        </ButtonLink>
      </section>
    </main>
  );
}
