# TempahSekolah — Peta Fail, Lokasi Kod dan Panduan Penambahbaikan

**Versi:** 1.0 (seiring `TempahSekolah_PRD_v1.0.md`)  
**Tarikh:** 27 Oktober 2026  
**Status:** **PELAN STRUKTUR SAHAJA — BELUM ADA KOD APLIKASI DIJANA**.

> **Penting:** Semua path di bawah ialah **lokasi fail yang dicadangkan untuk projek masa hadapan**, bukan dakwaan fail tersebut sudah wujud. Oleh itu, nombor baris kod ditandakan `TBD — belum diwujudkan`; saya tidak akan mereka nombor baris. Selepas pembangunan bermula, dokumen ini perlu menyimpan **path sebenar + nama fungsi/simbol + julat baris semasa + ujian berkaitan + commit Git**. Nombor baris boleh berubah selepas edit.

## 1. Cara menggunakan fail ini

1. Cari fungsi yang mahu ditambah baik melalui jadual **"Saya mahu ubah apa?"**.
2. Pergi ke path fail berkenaan di editor (contohnya VS Code).
3. Cari **nama simbol atau kata kunci**, bukan bergantung hanya pada nombor baris.
4. Selepas fail sebenar diwujudkan, catat baris semasa menggunakan carian editor atau `rg -n 'namaFungsi' src` / `nl -ba <path>` dalam terminal.
5. Semak juga validator, service, migration, RLS dan test yang berkaitan sebelum mengubah logik.
6. Selepas perubahan diluluskan, kemas kini jadual ini dan sertakan ID commit atau pull request.

**Mengapa nombor baris belum ada?** Arahan pengguna ialah **jangan jana kod aplikasi** sehingga blueprint dimuktamadkan. Tiada baris kod sebenar untuk diberi rujukan yang jujur pada masa ini.

## 2. Lokasi dokumen sebenar (wujud dalam pakej ini)

| Fail | Status | Tujuan |
|---|---|---|
| `TempahSekolah_PRD_v1.0.md` | **WUJUD** | Keperluan fungsi, peraturan, skema, API, keselamatan, ujian, milestone, backlog |
| `file.md` | **WUJUD** | Peta lokasi edit dan daftar nombor baris untuk versi kod kelak |

Rujukan tepat nombor baris *dokumen PRD* ditambah pada hujung fail ini. Rujukan tersebut ialah nombor baris **dokumen**, bukan kod aplikasi.

## 3. Cadangan struktur folder projek (belum dibina)

| Path dirancang | Fungsi | Baris kod sebenar |
|---|---|---|
| `src/app/page.tsx` | Laman pemasaran | TBD |
| `src/app/(auth)/login/page.tsx` | Antara muka log masuk | TBD |
| `src/app/(public)/s/[schoolSlug]/p/[programSlug]/page.tsx` | Halaman awam program | TBD |
| `src/app/(public)/s/[schoolSlug]/p/[programSlug]/checkout/page.tsx` | Borang & keranjang checkout | TBD |
| `src/app/(public)/booking/payment-status/page.tsx` | Status pembayaran, dibaca daripada server | TBD |
| `src/app/(public)/booking/access/page.tsx` | Pautan/OTP akses resit | TBD |
| `src/app/(public)/booking/view/page.tsx` | Butiran/resit/QR selepas pengesahan | TBD |
| `src/app/(admin)/app/page.tsx` | Dashboard sekolah | TBD |
| `src/app/(admin)/app/programs/page.tsx` | Senarai program | TBD |
| `src/app/(admin)/app/programs/new/page.tsx` | Cipta program | TBD |
| `src/app/(admin)/app/programs/[id]/edit/page.tsx` | Edit program | TBD |
| `src/app/(admin)/app/programs/[id]/offerings/page.tsx` | Item, saiz, slot, kuota | TBD |
| `src/app/(admin)/app/programs/[id]/bookings/page.tsx` | Pengurusan tempahan | TBD |
| `src/app/(admin)/app/programs/[id]/reports/page.tsx` | Laporan | TBD |
| `src/app/(admin)/app/scan/page.tsx` | Imbas QR/serahan | TBD |
| `src/app/(admin)/app/team/page.tsx` | Pengurusan ahli | TBD |
| `src/app/(admin)/app/payment-settings/page.tsx` | Status merchant gateway, tanpa secret pada client | TBD |
| `src/app/(admin)/app/payments/exceptions/page.tsx` | Bayaran lewat/tidak padan | TBD |
| `src/app/api/v1/public/checkouts/route.ts` | Cipta booking/hold stok | TBD |
| `src/app/api/v1/public/checkouts/[id]/pay/route.ts` | Payment session gateway | TBD |
| `src/app/api/v1/webhooks/payments/[provider]/route.ts` | Callback gateway, semak signature | TBD |
| `src/app/api/v1/internal/reconcile-payments/route.ts` | Reconciliation scheduled task | TBD |
| `src/app/api/v1/internal/expire-holds/route.ts` | Lupuskan hold tamat tempoh dengan selamat | TBD |
| `src/app/api/v1/admin/programs/route.ts` | Program API | TBD |
| `src/app/api/v1/admin/bookings/route.ts` | Tempahan API | TBD |
| `src/app/api/v1/admin/payments/exceptions/route.ts` | Pengecualian pembayaran | TBD |
| `src/modules/identity/` | Auth, sessions dan MFA | TBD |
| `src/modules/tenancy/` | Sekolah, membership, RBAC | TBD |
| `src/modules/programs/` | Business logic program & polisi murid/penjaga | TBD |
| `src/modules/catalog/` | Offering, variant, slot | TBD |
| `src/modules/capacity/` | Reserve, commit, release stok secara atomik | TBD |
| `src/modules/bookings/` | Checkout, pricing, status & cancellation | TBD |
| `src/modules/payments/` | Gateway adapter, merchant, webhooks, reconciliation, refund | TBD |
| `src/modules/fulfilment/` | Scan QR, serahan kuantiti, anti double-scan | TBD |
| `src/modules/reporting/` | Dashboard dan safe CSV | TBD |
| `src/modules/saas-billing/` | Langganan SaaS (ditunda sehingga pembeli dikenal pasti) | TBD |
| `src/modules/audit/` | Audit log & observability | TBD |
| `src/components/ui/` | Butang, input, kad, dialog, tabel aksesibel | TBD |
| `src/components/programs/` | Kad program, kategori dan pilihan | TBD |
| `src/components/bookings/` | Keranjang, resit, status bayaran | TBD |
| `src/lib/supabase/` | DB clients dan helper selamat | TBD |
| `src/lib/validation/` | Zod schema untuk input server | TBD |
| `src/lib/authz/` | Polisi tenant/role/per resource | TBD |
| `src/lib/rate-limit/` | Kawalan permintaan | TBD |
| `src/lib/crypto/` | Hash token/verify signature (server sahaja) | TBD |
| `supabase/migrations/` | Migrasi SQL versioned | TBD |
| `supabase/tests/` | Ujian RLS, constraint & transactions | TBD |
| `tests/unit/` | Ujian peraturan perniagaan | TBD |
| `tests/integration/` | Ujian API dan database | TBD |
| `tests/e2e/` | Playwright checkout/admin/QR | TBD |
| `tests/load/` | Simulasi 100–150 checkout serentak | TBD |
| `docs/runbooks/` | Deploy, incident, refund, backup, reconciliation | TBD |
| `docs/decisions/` | Architecture decision records (ADR) | TBD |
| `docs/api/` | Kontrak OpenAPI | TBD |
| `.github/workflows/` | CI/CD dan ujian | TBD |
| `.env.example` | Nama env sahaja; tiada kunci sebenar | TBD |

**Nota struktur:** Next.js route groups seperti `(admin)` atau `(public)` tidak muncul pada URL awam. Path di atas cadangan awal dan mesti dikunci selepas fasa pembangunan M1.

## 4. Saya mahu ubah apa? — indeks pantas

| Perubahan yang dikehendaki | Mula di lokasi ini | Jangan lupa kemas kini |
|---|---|---|
| Warna/tema/logo | `src/components/ui/`, stylesheet global (path kemudian) | Token warna, accessibility, ujian visual |
| Tajuk/poster program | `src/modules/programs/`, halaman program awam | API, validasi, DB jika field baharu |
| Jenis tempahan baharu | `src/modules/catalog/` | DB schema, stock model, checkout, laporan, ujian |
| Menu makanan & pilihan | `src/modules/catalog/`, `src/components/programs/` | Varian, harga snapshot dan capacity |
| Saiz baju | `src/modules/catalog/` | Constraint stok varian, cart, laporan |
| Kuota slot | `src/modules/capacity/` | DB transaction, concurrency tests |
| Harga/promosi/diskaun | `src/modules/bookings/` | Validation, snapshot, tax/rounding, payment exact amount |
| Borang maklumat murid | `src/modules/programs/`, `src/modules/bookings/` | Polisi penjaga, privacy, DB, retention, tests |
| Gerbang bayaran | `src/modules/payments/`, webhook route | Verify signature, merchant, refund, reconciliation, tests |
| Isu bayaran berjaya tetapi tiada stok | `src/modules/payments/`, `src/modules/capacity/` | `payment_exceptions`, fail-safe, audit |
| Pembayaran kepada sekolah/PIBG | `src/modules/payments/` | Merchant onboarding, settlement & approval G1/G2 |
| Kod QR & pengambilan | `src/modules/fulfilment/`, `/app/scan` | Token security, status atomik, duplicate scan |
| Admin sekolah dan AJK | `src/modules/tenancy/`, `src/lib/authz/` | Grants, RLS, member tests |
| Export Excel/CSV | `src/modules/reporting/` | PII permission & formula injection |
| Status langganan SaaS | `src/modules/saas-billing/` | Pembeli belum dikenal pasti; jangan andaikan siap |
| Data peribadi / padam data | `src/modules/bookings/`, `supabase/migrations/` | Audit, retention, privacy & backups |
| Dashboard | `src/app/(admin)/app/page.tsx`, `src/modules/reporting/` | Data tenant-scoped, index DB |
| E-mel/resit | `src/modules/bookings/`, notification adapter (TBD) | Token, consent, templates, retries |
| Kebenaran sekolah kerajaan | `docs/decisions/`, `docs/runbooks/` | G1/G3 dan dokumentasi formal |

## 5. Cara merekod lokasi nombor baris selepas kod wujud

**Format entri wajib** (isi apabila kod benar-benar sudah dibangunkan):

| Modul / simbol sebenar | Fail tepat | Baris mula–akhir pada commit | Test yang melindungi | Commit / PR |
|---|---|---|---|---|
| `createCheckout` | BELUM WUJUD | TBD | `tests/integration/checkout...` (dirancang) | TBD |
| `verifyPaymentWebhook` | BELUM WUJUD | TBD | `tests/integration/payment-webhook...` (dirancang) | TBD |
| `reserveCapacity` | BELUM WUJUD | TBD | `supabase/tests/capacity...` (dirancang) | TBD |
| `fulfilBookingItem` | BELUM WUJUD | TBD | `tests/integration/fulfilment...` (dirancang) | TBD |

**Templat perubahan kod:**

- **ID tugasan:** `PAY-003`
- **Fungsi mahu diubah:** `verifyPaymentWebhook`
- **Path sebenar:** _(isi selepas fail wujud)_
- **Baris terkini:** _(isi selepas semak pada commit yang sama)_
- **Sebab perubahan:** _(apa yang mahu dibaiki)_
- **Fail berkaitan:** _(service, route, validation, DB, tests)_
- **Risiko:** _(signature, status payment, tenant crossing, double-charge, dsb.)_
- **Ujian selepas edit:** _(ID acceptance criteria)_
- **Git commit/PR:** _(hash atau URL sebenar)_

**Tip:** Selepas setiap refactor, nombor baris mungkin berubah. Nama fail + simbol + tests + Git commit lebih stabil daripada nombor baris semata-mata.

## 6. Peraturan pengemaskinian file.md

1. Satu perubahan kod = satu kemas kini `file.md` dalam commit yang sama.
2. Rekod fail yang **benar-benar wujud** dan nyatakan apabila struktur sebenar berbeza daripada pelan.
3. Jangan menulis nombor baris rekaan atau status "siap" sebelum ujian lulus.
4. Kemas kini index **"Saya mahu ubah apa?"** apabila modul baru ditambah.
5. Jika fungsi dipindah, kemas kini semua rujukan silang.
6. Jika ubah gateway/security/schema, kemas kini PRD dan ADR berkenaan.
7. Jangan simpan secret, password, token peribadi atau data murid dalam dokumentasi.
8. Semasa meminta AI edit, berikan path sebenar + simbol + output ujian; elakkan arahan kabur "ubah bahagian belakang".

## 7. Rujukan seksyen PRD mengikut nombor baris

<!-- Auto-generated from the actual file; line numbers refer to PRD Markdown only. -->

| Baris PRD | Tajuk seksyen |
|---:|---|
| 10 | 1. Ringkasan keputusan yang disahkan |
| 33 | 2. Visi, pelanggan dan cadangan nilai |
| 45 | 3. Persona dan perjalanan pengguna |
| 65 | 4. Skop MVP dan bukan skop |
| 88 | 5. Dasar pengguna bawah umur |
| 94 | 6. Keperluan fungsian teras |
| 115 | 7. Keperluan bukan fungsian |
| 130 | 8. UX, sitemap dan spesifikasi halaman |
| 156 | 9. Roles dan permissions |
| 167 | 10. Stack dan seni bina |
| 177 | 11. Skema pangkalan data (konseptual untuk migrasi) |
| 211 | 12. Kontrak API versi 1 (cadangan) |
| 236 | 13. Pembayaran automatik dalam MVP — seni bina wajib |
| 283 | 14. Auth, keselamatan dan pematuhan |
| 296 | 15. Ujian dan acceptance criteria |
| 319 | 16. Infrastruktur, deployment dan operasi |
| 329 | 17. Milestone pembangunan (tanpa janji jadual) |
| 343 | 18. Kos dan risiko kewangan (semua anggaran) |
| 349 | 19. Backlog terutamakan, kecil dan bersandar |
| 378 | 20. Sumber dan nota semakan |
| 388 | 21. Rekod perubahan |

*Semak semula jadual ini selepas PRD disunting kerana nombor baris boleh berubah.*
