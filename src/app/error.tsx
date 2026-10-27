"use client";
export default function ErrorPage({ retry }: { retry: () => void }) {
  return (
    <main id="kandungan" className="container state-page">
      <h1>Halaman tidak dapat dimuatkan.</h1>
      <p>Sila cuba semula. Jika masalah berterusan, kembali kemudian.</p>
      <button className="button button-primary" onClick={retry}>
        Cuba semula
      </button>
    </main>
  );
}
