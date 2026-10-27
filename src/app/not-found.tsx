import { ButtonLink } from "@/components/ui/button";
export default function NotFound() {
  return (
    <main id="kandungan" className="container state-page">
      <p>404 · HALAMAN TIDAK DITEMUI</p>
      <h1>Mungkin tersalah pautan.</h1>
      <p>Kembali ke laman utama untuk mengenali TempahSekolah.</p>
      <ButtonLink href="/">Kembali ke laman utama</ButtonLink>
    </main>
  );
}
