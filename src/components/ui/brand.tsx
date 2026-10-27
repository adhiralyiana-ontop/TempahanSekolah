import Link from "next/link";
import { BookOpen } from "lucide-react";

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link
      href="/"
      className={`brand ${inverse ? "brand-inverse" : ""}`}
      aria-label="TempahSekolah — laman utama"
    >
      <span className="brand-mark">
        <BookOpen size={23} strokeWidth={1.8} aria-hidden="true" />
      </span>
      <span>
        Tempah<span className="brand-accent">Sekolah</span>
        <span className="brand-dot">.</span>
      </span>
    </Link>
  );
}
