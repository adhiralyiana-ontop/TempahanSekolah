# TempahSekolah — Product Requirements Document & Technical Blueprint

**Versi:** 1.0 (baseline yang diluluskan dengan gerbang pelaksanaan terbuka)  
**Tarikh:** 27 Oktober 2026  
**Status:** Arah produk dan seni bina **DILULUSKAN**; *production readiness* pembayaran dan tatakelola data **BELUM DILULUSKAN**.  
**Pemilik keputusan:** Pengasas produk  
**Pelaksanaan:** Belum bermula. Dokumen ini **tidak mengandungi kod aplikasi**.  
**Dokumen sokongan:** [`file.md`](./file.md) — lokasi fail yang dirancang, pemilik fungsi, serta kaedah merekod nombor baris kod selepas fail sebenar diwujudkan.

## 1. Ringkasan keputusan yang disahkan

| Perkara | Keputusan | Kesan reka bentuk |
|---|---|---|
| Sekolah | Kerajaan **dan** swasta | Multi-tenant; semak kelulusan dan tatakelola kedua-dua kategori sekolah |
| Pembayar SaaS | **Belum pasti** | Billing SaaS berasingan; onboarding pilot manual sehingga pembeli dikenal pasti |
| Bayaran program MVP | **Gerbang pembayaran automatik wajib** | API bayaran, sandbox, callback disahkan, reconciliation, refund exception wajib sebelum pilot berbayar |
| Murid membuat tempahan | Murid **atau** penjaga, mengikut program | Konfigurasi dasar peserta per program; perlindungan data bawah umur; persetujuan/kelulusan mengikut keadaan |
| Kapasiti | 200–1,000 peserta / program | Sasaran ujian kapasiti dan lonjakan trafik; bukan janji 1,000 pengguna serentak |
| Bajet | **Belum ditetapkan** | Had kos bulanan belum dikunci; perlu tetapkan sebelum pembelian perkhidmatan |
| Status blueprint | **Diluluskan dengan keputusan di atas** | Boleh menjadi rujukan spesifikasi; pelaksanaan pembayaran produksi menunggu G1–G5 |
| Navigasi kod | Wajib ada `file.md` | Dikemas kini selepas setiap tugas kod; nombor baris sebenar tidak boleh direka sebelum kod wujud |

### 1.1 Gerbang keputusan terbuka (wajib diselesaikan sebelum pilot produksi)

- **G1: Pemegang dana / merchant of record.** Akaun bank mana yang menerima bayaran program: sekolah, PIBG, penganjur atau entiti lain yang sah? Siapa memegang perjanjian gateway dan mengendalikan refund? **Status: TERBUKA**.
- **G2: Kelayakan gerbang.** Adakah setiap entiti merchant layak membuka akaun gateway pilihan? Adakah pihak sekolah/PIBG membenarkan pengendalian dan perkhidmatan ini? Semak onboarding, settlement, caj, jenis kutipan, kaedah bayar. **Status: TERBUKA**.
- **G3: Dasar tempahan murid.** Program mana membenarkan murid membuat tempahan sendiri? Program mana mewajibkan penjaga? Bentuk kelulusan pihak sekolah serta bukti persetujuan yang sesuai. **Status: TERBUKA**.
- **G4: Bajet dan pilot.** Had kos 3 bulan pertama; sekolah rintis; pihak yang memberi kebenaran bertulis; sasaran UAT. **Status: TERBUKA**.
- **G5: Pembeli SaaS dan harga.** Sekolah, PIBG, kelab atau penganjur; bayaran per program atau langganan; siapa pembuat keputusan. **Status: TERBUKA** (tidak menghalang pembangunan prototaip, tetapi menghalang kesimpulan daya maju komersial).

**Tafsiran kelulusan:** Asas seni bina telah dipersetujui. Kelulusan ini **bukan** pengesahan bahawa merchant dapat diluluskan, bahawa sekolah boleh menggunakan sistem tanpa semakan tambahan, atau bahawa produk sudah menguntungkan.

## 2. Visi, pelanggan dan cadangan nilai

**Visi:** Satu pautan program membolehkan warga sekolah menempah penyertaan, makanan, barangan, slot, dan kemudahan yang dibenarkan; guru pula mengurus kuota, pembayaran dan pengambilan dari satu dashboard.

**Kumpulan pelanggan:** Sekolah rendah/menengah kerajaan dan swasta di Malaysia. **Pembeli yang membayar** belum diketahui; perlu diuji dengan sekolah/PIBG/penganjur sebelum menetapkan model SaaS.

**Masalah (hipotesis, belum divalidasi):** Penganjur menggunakan campuran Google Forms, WhatsApp, spreadsheet dan senarai kertas; menghadapi rekod bertindih, kuota berlebihan, status bayaran tidak jelas dan kerja manual semasa pengambilan.

**Nilai:** Satu sumber data untuk semua tempahan program, paparan telefon, pembayaran automatik yang disahkan, pengambilan berdasarkan QR, eksport dan audit. Nilai ekonomi mesti dibuktikan melalui pilot dan temu bual.

**Metrik pilot yang disasarkan (andaian ujian):** 2–3 sekolah; 3 program; kadar tempahan berjaya >=95% bagi percubaan sah; median masa checkout mudah <=3 minit; sifar kejadian stok negatif; sifar kebocoran data silang sekolah; ujian 100–150 checkout serentak; sekurang-kurangnya satu komitmen berbayar untuk validasi komersial.

## 3. Persona dan perjalanan pengguna

| Persona | Tujuan | Hak/keperluan utama |
|---|---|---|
| Platform Admin | Urus tenancy, sokongan teknikal, status langganan | Tiada akses PII sekolah secara rutin; akses sokongan terkawal dan diaudit |
| School Admin | Mengawal akaun sekolah, program, kakitangan | Keahlian, hak akses, kelulusan program, laporan |
| Organiser / Guru | Urus program | Cipta program, tawaran, kategori, stok, tempahan dan laporan bagi program sendiri |
| Finance Officer / AJK Kewangan | Lihat status pembayaran dan pengecualian | Lihat transaksi dan reconciliation dalam skop program; refund ikut kuasa merchant |
| Collection Staff | Urus kehadiran atau penyerahan | Semak token QR, status item dan kuantiti; data peribadi minimum |
| Pembeli Dewasa / Penjaga | Tempah dan bayar | Checkout awam, kaedah bayar disokong, resit dan semakan status selamat |
| Murid (jika dibenarkan) | Tempah kategori yang diluluskan | Akses terhad mengikut polisi sekolah/program; tidak dianggap memiliki kuasa memberi kebenaran penjaga |

**Journey A — Penganjur:** Log masuk → program baharu → konfigurasi jenis tempahan/varian/slot/kuota → tetapkan polisi pengguna & bayaran → preview → publish → kongsi QR → urus tempahan → semak kutipan → serahan → eksport.

**Journey B — Pembeli:** Buka URL → pilih beberapa item dalam *satu program* → isi data minimum → sahkan dasar/penjaga (jika perlu) → backend simpan hold stok → redirect ke gateway → callback pembayaran disahkan → resit/QR → semakan/pengambilan.

**Journey C — Murid:** Akses program → sistem semak polisi `guardian_required` / `student_self_booking_allowed` → jika perlu, penjaga menyelesaikan aliran keizinan/pembelian → tempahan diselesaikan melalui akaun merchant yang sah. Pilihan pengguna di UI sahaja bukan bukti umur atau autorisasi.

**Journey D — Petugas:** Login → imbas token QR → semak hanya item yang dibenarkan → sahkan serahan secara atomik → rekod masa/petugas → halang pengambilan berganda.

## 4. Skop MVP dan bukan skop

### 4.1 Termasuk dalam MVP — P0

1. SaaS multi-tenant: onboarding sekolah melalui pentadbir, akaun petugas, RBAC dan RLS.
2. Pendaftaran/slot penyertaan, makanan, barangan/saiz, slot aktiviti, slot tempat/kemudahan **yang disediakan secara manual dalam satu program**.
3. Program draf/terbit/tutup; tarikh buka/tutup; URL awam dan QR.
4. Keranjang berbilang kategori **dalam program yang sama**.
5. Harga dalam sen, snapshot harga ketika checkout; kuota terkawal secara atomik.
6. Checkout tanpa akaun pembeli; peraturan peserta dewasa/murid/penjaga mengikut program.
7. **Gerbang pembayaran automatik**: create bill, redirect, webhook disahkan, status, rekonsiliasi, penanganan exception dan ujian sandbox.
8. Pesanan percuma tanpa gateway; pesanan berbayar tertakluk pada status pembayaran yang disahkan backend.
9. Nombor rujukan, bukti tempahan, akses resit selamat, QR token rawak.
10. Dashboard, rekod bayaran, eksport CSV, penyerahan berperingkat, audit.
11. Validasi, keselamatan, notis privasi, retention, sandaran, monitoring dan load test.

### 4.2 Dikecualikan daripada MVP

- Aplikasi natif; sistem vendor multi-party marketplace; penyimpanan kad; split settlement automatik; wang masuk akaun operator SaaS; payout automatik.
- Konflik aset merentas semua program sekolah; pelan tempat duduk bernombor; inventori vendor terperinci.
- WhatsApp API automatik; AI chatbot; penilaian AI untuk murid; integrasi sistem KPM tanpa kelulusan.
- Billing SaaS automatik **boleh ditunda** kerana pembeli langganan belum dikenal pasti; rekod pilot boleh dibuat melalui invois manual.

## 5. Dasar pengguna bawah umur

Konfigurasi program: `booking_audience` = `guardians_only` (lalai untuk program murid), `staff_booking`, atau `student_self_booking_with_school_approval`. Sekolah mesti mengesahkan secara bertulis penggunaan mode terakhir. Sekiranya bayaran melibatkan minor, reka aliran pengesahan/kelulusan penjaga yang sesuai; tidak cukup sekadar kotak "Saya berumur ...". Sistem mengumpulkan nama murid dan kelas **hanya apabila perlu**; MyKad/MyKid, data kesihatan dan gambar murid tidak dikumpul secara lalai.

Bagi penerimaan kad/e-wallet/akaun bank, syarat kelayakan pengguna dan kontrak penyedia pembayaran perlu dipatuhi. Polisi murid/penjaga yang spesifik mesti diluluskan sebelum produksi, dan guru/penganjur perlu diberi keupayaan menyekat tempahan murid sendiri pada program yang memerlukan penjaga.

## 6. Keperluan fungsian teras

| ID | Keperluan | Kriteria siap ringkas |
|---|---|---|
| FR-01 | School Admin mengundang ahli | Jemputan bertempoh; rol minimum; log audit |
| FR-02 | Asingkan setiap tenant | Tiada query atau akses silang `school_id` |
| FR-03 | Cipta/terbit/tutup program | Hanya pengguna berkuasa boleh ubah status |
| FR-04 | Kategori, item, varian dan slot | Tetapan kuota dan harga disahkan server |
| FR-05 | Konfigurasi polisi peserta | Peraturan murid/penjaga dipatuhi di backend |
| FR-06 | Checkout satu atau beberapa item | Semua item sah dalam program yang sama |
| FR-07 | Pembelian atomik dan idempotent | Dua checkout serentak tidak melepasi kuota |
| FR-08 | Cipta bayaran di gateway | Jumlah dipadankan dengan snapshot transaksi |
| FR-09 | Callback/webhook disahkan | Signature sah, idempotent, dikaitkan kepada merchant yang betul |
| FR-10 | Reconciliation & payment exceptions | Bayaran berjaya tetapi stok luput tidak disahkan automatik |
| FR-11 | Refund/cancellation workflow | Audit, kebenaran dan jumlah konsisten |
| FR-12 | Resit/QR dan akses tempahan | Token rawak; rujukan sahaja tidak membocorkan PII |
| FR-13 | Scan kehadiran/pengambilan | Pengambilan berulang tidak menolak stok dua kali |
| FR-14 | Dashboard dan eksport | Ketepatan laporan; CSV formula injection ditangani |
| FR-15 | Notifikasi e-mel asas | Tanpa log rahsia atau data yang tidak perlu |
| FR-16 | Operasi audit dan keselamatan | Jejak perubahan, monitoring dan pemulihan |

## 7. Keperluan bukan fungsian

| Kategori | Sasaran untuk diuji (bukan SLA terjamin) |
|---|---|
| Mobile | Berfungsi pada lebar 360px+; aliran utama mudah sentuh |
| Accessibility | Sasaran WCAG 2.2 AA pada aliran tempahan |
| Prestasi | API utama p95 <1 saat dalam ujian beban yang ditentukan |
| Kapasiti | 200–1,000 peserta/program; load test 100–150 checkout serentak dan burst hingga 2,000 permintaan simulasi |
| Data | UTC dalam database; Asia/Kuala_Lumpur untuk UI; wang integer sen MYR |
| Keselamatan | HTTPS, MFA admin, least privilege, RBAC+RLS, audit |
| Backup | Backup berkala, restore test; RPO/RTO ditetapkan semula selepas pilih pelan hosting |
| Observability | Structured logs tanpa PII/token, alert untuk callback dan exception |
| Multi-tenant | Tenant isolation dalam database, API, storan, laporan dan payment credentials |
| Kebolehselenggaraan | Modular monolith, TypeScript, migrasi, unit/E2E tests, file.md dikemas kini |

## 8. UX, sitemap dan spesifikasi halaman

**Gaya:** mobile-first, Bahasa Melayu dahulu, visual profesional dan mesra sekolah, teks >=16px untuk borang utama, sasaran sentuhan >=44px, fokus papan kekunci jelas. Warna cadangan primary `#176B73`, navy `#16324F`, kuning `#F4B942`, background `#F7FAFC`; warna status sentiasa disertai teks/ikon.

| Route konseptual | Skrin & tanggungjawab |
|---|---|
| `/` | Laman pemasaran SaaS, maklumat produk, permintaan demo |
| `/login` | Login ahli sekolah/staf |
| `/s/[schoolSlug]/p/[programSlug]` | Program awam, senarai kategori/item/slot |
| `/s/[schoolSlug]/p/[programSlug]/checkout` | Keranjang, borang pembeli dan polisi peserta |
| `/booking/payment-status` | Keputusan transaksi (status server); tidak percaya parameter redirect |
| `/booking/access` | Minta pautan akses yang disahkan |
| `/booking/view` | Resit/QR dengan token/sesi sah |
| `/app` | Dashboard sekolah aktif |
| `/app/programs` | Senarai program; cipta/terbit/tutup |
| `/app/programs/[id]/offerings` | Item, varian, slot, kuota, harga |
| `/app/programs/[id]/bookings` | Urus tempahan, carian, payment exception |
| `/app/programs/[id]/reports` | Statistik, CSV dan log berkaitan |
| `/app/scan` | Pengesahan kehadiran/serahan |
| `/app/team` | Jemputan dan peranan petugas |
| `/app/settings` | Tetapan dan polisi data sekolah |
| `/app/payment-settings` | Status konfigurasi merchant, tanpa menunjukkan rahsia |
| `/platform` | Tenancy, status pilot, sokongan berkebenaran khas |

**Aliran UI:** 1) katalog → 2) keranjang → 3) pengesahan data → 4) `Membuat pembayaran` → 5) status `Menunggu pengesahan` atau `Berjaya` → 6) resit/QR. Jika gateway mengalami gangguan, pengguna boleh menyemak tempahan tanpa checkout berganda; paparkan arahan yang jelas.

## 9. Roles dan permissions

- `platform_admin`: tenancy dan operasi sistem; tiada akses rutin PII sekolah.
- `school_admin`: polisi sekolah, ahli, semua program sekolah, laporan sekolah.
- `organiser`: program yang diberikan sahaja; tidak boleh mengurus ahli peringkat sekolah tanpa izin.
- `finance_officer`: lihat rekod payment/reconciliation program yang diberikan; refund hanya melalui prosedur merchant dan audit.
- `collection_staff`: akses minimum untuk QR, status item dan pengambilan.
- `buyer`: bukan role admin; checkout tanpa akaun, akses resit melalui token/pautan disahkan.

Permission matrix lengkap harus diwujudkan sebagai ujian deny-by-default; semua endpoint mengesahkan user, tenant, resource dan hak operasi pada pelayan.

## 10. Stack dan seni bina

**Cadangan:** Next.js App Router + TypeScript; Tailwind CSS + komponen aksesibel; Supabase PostgreSQL/Auth/Storage; hosting komersial Vercel atau alternatif; Resend untuk e-mel; GitHub; Vitest, Playwright; Zod; cron/job scheduler disahkan dan rate limiting.

**Pola:** Modular monolith, satu repo. Domain modules: `identity`, `tenancy`, `programs`, `catalog`, `capacity`, `bookings`, `payments`, `fulfilment`, `reporting`, `billing`, `audit`.

**Boundaries:** Browser → route handlers/server → domain services → Postgres/Storage; browser tidak diberi service-role secret atau merchant key. Gateway ↔ webhook server; redirect browser hanya petunjuk UI. Semua fungsi sensitif menggunakan transactions dan database constraints.

**Environment:** `local`, `staging`, `production` dengan DB, secret dan akaun gateway sandbox/production terasing. Gunakan data sintetik dalam staging.

## 11. Skema pangkalan data (konseptual untuk migrasi)

**Peraturan umum:** UUID PK, `school_id` pada jadual operasi, foreign key komposit untuk konsistensi tenant, `timestamptz` UTC, `amount_cents` integer, CHECK constraints, unique indexes, `created_at`, `updated_at`. Jangan simpan data kad atau rahsia payment secara plaintext.

| Jadual | Medan teras dan hubungan |
|---|---|
| `schools` | id, name, slug UNIQUE, school_type, status |
| `user_profiles` | user_id FK auth.users, display_name |
| `school_members` | id, school_id, user_id, role, status; UNIQUE(school_id,user_id) |
| `programs` | id, school_id, slug, title, venue, dates, booking_window, status, booking_audience |
| `program_staff` | id, school_id, program_id, school_member_id, permission_set |
| `offerings` | id, school_id, program_id, type, title, description, base_price_cents, status, max_per_booking |
| `offering_variants` | id, school_id, offering_id, label, sku, price_cents, status |
| `offering_slots` | id, school_id, offering_id, starts_at, ends_at, label, status |
| `capacity_pools` | id, school_id, offering_id, variant_id?, slot_id?, capacity, held, committed, CHECK held+committed<=capacity |
| `bookings` | id, school_id, program_id, reference, buyer_name, buyer_email?, buyer_phone?, buyer_type, status, payment_status, total_cents, expires_at, created_at |
| `booking_items` | id, school_id, booking_id, offering_id, variant_id?, slot_id?, capacity_pool_id, qty, unit_price_cents, line_total_cents, item_snapshot, fulfilment_status |
| `booking_participants` | id, school_id, booking_item_id, participant_name?, class_label?, guardian_approval_ref? (hanya jika perlu) |
| `checkout_idempotency` | id, school_id, request_key UNIQUE scoped, booking_id?, payload_hash, expires_at |
| `payment_merchants` | id, school_id, gateway, merchant_legal_entity, collection_ref, credential_secret_ref, status; 1 sekolah mungkin ada beberapa pemegang kutipan yang diluluskan |
| `payment_attempts` | id, school_id, booking_id, merchant_id, provider_bill_id UNIQUE per gateway, amount_cents, currency, state, provider_url, created_at |
| `payment_events` | id, school_id, payment_attempt_id, provider_event_key, signature_verified, canonical_status, received_at, processing_status; unique dedup key |
| `payment_exceptions` | id, school_id, booking_id, payment_attempt_id, type, status, reason, resolution_by?, resolved_at? |
| `refund_requests` | id, school_id, booking_id, payment_attempt_id, amount_cents, reason, approved_by?, provider_ref?, status |
| `fulfilment_events` | id, school_id, booking_item_id, quantity, actor_id, action, occurred_at |
| `booking_access_tokens` | id, booking_id, token_hash, purpose, expires_at, revoked_at? |
| `audit_logs` | id, school_id?, actor_id?, entity_type, entity_id, action, safe_metadata, created_at |
| `saas_plans` | id, label, period, price_cents, features, status; boleh ditangguh daripada produksi pilot |
| `school_subscriptions` | id, school_id, plan_id, start/end, status; boleh ditangguh |

**Kekangan penting:** School composite FKs; unique `(school_id, program_slug)` dan `(school_id, booking_reference)`; tiada kapasiti negatif; status enum/transition dikawal; kuota untuk varian/slot mempunyai aturan uniqueness yang mencegah capacity pool berganda. Snapshots tidak diubah apabila harga katalog berubah.

**Operasi atomik:** `reserve_capacity`, `commit_capacity_on_paid`, `release_capacity_on_expire`, `record_fulfilment`, `cancel_booking` mesti direka dengan lock/conditional update dan idempotency; dilaksana pada pangkalan data melalui service yang dikawal. Tiada perbelanjaan stok dari client sahaja.

## 12. Kontrak API versi 1 (cadangan)

| Method | Route | Akses / kegunaan |
|---|---|---|
| GET | `/api/v1/public/programs/:school/:slug` | Maklumat program yang diterbitkan |
| GET | `/api/v1/public/programs/:id/offerings` | Katalog dan ringkasan ketersediaan |
| POST | `/api/v1/public/checkouts` | Semak polisi pengguna, create booking + hold, idempotency key |
| POST | `/api/v1/public/checkouts/:id/pay` | Cipta/teruskan payment attempt server-side; pulangkan gateway URL |
| GET | `/api/v1/public/bookings/:id/status` | Status minimum menggunakan proof-of-access selamat |
| POST | `/api/v1/public/bookings/access` | Hantar pautan/OTP yang dibenarkan |
| POST | `/api/v1/webhooks/payments/:provider` | Signature verification, durable event, dedup, status transition |
| POST | `/api/v1/internal/reconcile-payments` | Scheduled reconciliation; signed machine credentials |
| POST | `/api/v1/internal/expire-holds` | Job luput tempahan & reconcile masa tamat gateway |
| GET/POST | `/api/v1/admin/programs` | List/create program dalam tenant |
| PATCH | `/api/v1/admin/programs/:id` | Edit / publish policy |
| GET/POST | `/api/v1/admin/programs/:id/offerings` | Urus item/varian/slot |
| GET | `/api/v1/admin/programs/:id/bookings` | Senarai pesanan dan status |
| GET | `/api/v1/admin/programs/:id/reports` | Statistik |
| GET | `/api/v1/admin/programs/:id/export` | Eksport CSV dengan hak akses |
| POST | `/api/v1/admin/booking-items/:id/fulfil` | Penyerahan atomik |
| GET | `/api/v1/admin/payments/exceptions` | Kerja reconciliation / pengecualian |
| POST | `/api/v1/admin/payments/:id/request-refund` | Permintaan bayaran balik ikut merchant, audit |

**HTTP:** 401 unauthenticated, 403 forbidden, 404 tidak boleh didedahkan, 409 konflik stok/status, 422 validation, 429 rate limit, 500 sanitized error. Semua mutasi kritikal menggunakan request ID dan idempotency key.

## 13. Pembayaran automatik dalam MVP — seni bina wajib

### 13.1 Model wang / pilihan merchant

**Pilihan disyorkan untuk dinilai:** Pembayaran terus kepada akaun merchant milik entiti sekolah/PIBG/penganjur yang mendapat kelulusan dan layak di sisi penyedia gateway. TempahSekolah menyediakan UI, penciptaan bil, callback dan laporan **tanpa memegang atau mengagihkan wang program**.

Ini **belum disahkan boleh dilaksanakan** bagi semua sekolah kerajaan/swasta. Onboarding gateway, identiti pemegang akaun, akaun bank, settlement, refund, caj dan hak penggunaan perlu disahkan secara bertulis.

**Tidak termasuk:** Satu akaun operator SaaS yang mengutip wang bagi semua sekolah dan membayar semula kepada mereka; model agregator/marketplace mempunyai keperluan kawal selia, risiko operasi dan tanggungjawab berbeza.

### 13.2 Gateway adapter

Antaramuka service dalaman: `createPaymentAttempt`, `verifyWebhook`, `getPaymentStatus`, `requestRefund` (hanya jika disokong dan diluluskan), `reconcile`. Calon sandbox: **Billplz**, bukan vendor akhir yang telah diluluskan.

Setiap merchant mempunyai konfigurasi khusus tenant; secret disimpan sebagai rujukan kepada secret manager / simpanan disulitkan server-side, bukan plaintext dalam browser, env bersama yang tidak dipisahkan atau rekod awam. Kunci berbeza antara sandbox dan production. Jangan benarkan admin sekolah menampal kunci rahsia ke borang awam tanpa saluran yang dikawal.

### 13.3 Aliran pembayaran berjaya

1. Server sahkan program aktif, kuota, polisi pengguna, harga dan idempotency; buat booking `payment_pending` serta hold kuota secara atomik.
2. Server buat payment attempt dengan merchant tepat dan jumlah integer sen MYR.
3. Gateway memulangkan payment URL; pembeli di-redirect. Pesanan dan attempt sudah tersimpan.
4. Gateway callback kepada server; server sahkan format dan X Signature / mekanisme autentikasi gateway yang didokumentasikan.
5. Server periksa gateway bill ID, merchant, jumlah, mata wang, pemilik booking, status dan event dedup key; simpan event secara durable.
6. Dalam transaksi database, tukar booking serta capacity hold menjadi `confirmed/committed` tepat sekali; catat payment `paid`.
7. Status UI diambil daripada backend. Redirect browser tidak sekali-kali menjadi satu-satunya autoriti bayaran.
8. Jika callback gagal diproses, reconciliation menyemak status menggunakan API pembekal dan membaiki state melalui peraturan yang sama.

### 13.4 Late payment, expiry dan refund

- Jika hold luput sebelum bayaran disahkan, tindakan expiry mesti menyemak *gateway payment status* atau menjalankan reconciliation sebelum menganggap transaksi gagal; beri grace period yang dipilih berdasarkan gateway.
- Jika gateway mengesahkan wang diterima **selepas** kuota dilepas dan dijual kepada orang lain: **jangan overbook**. Rekod `paid_unallocated`, buka `payment_exception`, notifikasi petugas dan laksanakan refund/manual resolution yang sah.
- Jika callback berulang atau browser refresh: tiada double charge atau double commit. Dua payment attempts berjaya untuk satu booking menjadi exception dan memerlukan semakan refund.
- Payment cancelled/refunded ≠ booking fulfilled; rekod refund dan serahan mempunyai state sendiri.
- Jaminan stok hanya sampai had masa pegangan yang dinyatakan kepada pembeli. Semak sekatan masa provider.

### 13.5 Webhook keamanan dan pemerhatian

- Untuk Billplz, utamakan **X Signature callback URL**; verify HMAC-SHA256 mengikut panduan rasmi dan constant-time comparison.
- Jangan membuat andaian parameter daripada UI; verifikasi format form-urlencoded mengikut dokumentasi semasa.
- Deduplicate menggunakan kombinasi penyedia, bill ID, status/event fingerprint; event log durable sebelum beri kejayaan HTTP.
- Tangani webhook out-of-order dengan monotonic state machine; transaksi `paid` tidak boleh kembali menjadi `pending` disebabkan callback lama.
- Catat latensi callback, kegagalan signature, peratus `pending` lama, jumlah reconciliation tidak sepadan dan event berulang; beri amaran operasi.

### 13.6 Perbezaan bayaran SaaS

Bayaran program (pembeli→merchant program) **diasingkan** daripada bayaran langganan SaaS (pembeli SaaS→syarikat operator). Pembeli SaaS masih belum dikenal pasti; gunakan rekod pilot dan invois manual sementara, tanpa menganggap pendapatan berulang sudah terbukti.

## 14. Auth, keselamatan dan pematuhan

- **Auth:** Supabase Auth untuk staff, MFA untuk admin, cookie selamat, session invalidation, invitation bertempoh.
- **RBAC + RLS:** Least privilege, PostgreSQL grants dibatasi, RLS untuk jadual exposed; service-role/secret key server sahaja dan dihadkan.
- **API:** Zod/server validation, tenant-scoped FK, idempotency, CSRF/origin checking, rate limiting, size limits, audit.
- **Files:** Private storage bagi bukti/resit; signed URLs dan lifetime pendek; scan/limit uploads.
- **QR:** Opaque cryptographic token; tidak mengandungi PII; scan memerlukan staff yang berkuasa.
- **PII:** Kumpul paling minimum, notis privasi yang jelas, retention yang diluluskan, export/delete rights mengikut konteks, data minimization untuk minors.
- **Payment:** TLS, HMAC callback, keys melalui secret store, tidak simpan card PAN/CVV, semakan merchant tenancy, audit refunds.
- **Logging:** Tiada secret, full payment payload sensitif atau token buyer dalam log; structured request ID, tindakan kritikal dan error monitoring.
- **Backup:** Jadual backup disahkan, restore drills, separate staging, migrasi boleh pulih, incident response dan breach assessment.
- **Perundangan:** Akta 709 dan pindaan 2024, pekeliling JPDP semasa, dasar/persetujuan pentadbiran sekolah, arahan berkaitan KPM dan perjanjian penyedia gateway. Seksyen 3 mengecualikan Kerajaan Persekutuan/Negeri daripada Akta 709, **tetapi tidak menghapuskan keperluan semakan ke atas operator SaaS swasta**.

## 15. Ujian dan acceptance criteria

| ID | Ujian wajib | Lulus apabila |
|---|---|---|
| AC-01 | Program bercampur 4 kategori | Satu keranjang/pesanan hanya item program sama |
| AC-02 | 100–150 checkout serentak pada stok akhir | Tidak pernah berlaku kuota negatif/overbooking |
| AC-03 | Request checkout berulang | Satu booking untuk idempotency key yang sama |
| AC-04 | Jumlah harga diubah di browser | Server guna snapshot sah dan jumlah tepat |
| AC-05 | Webhook tanpa signature / palsu | Ditolak tanpa status berubah |
| AC-06 | Webhook tepat dua kali | Satu paid event efektif dan satu commit kuota |
| AC-07 | Redirect `paid=true` tanpa callback sah | Tidak menandakan transaksi paid |
| AC-08 | Webhook `paid` selepas hold luput | Payment exception, tiada overbook |
| AC-09 | Gateway create bill gagal | Hold ditangani mengikut polisi; tiada booking yatim |
| AC-10 | Rekonsiliasi transaksi pending | Status dikemas kini berdasarkan provider dengan audit |
| AC-11 | Dua merchant berlainan | Callback tidak boleh mengubah booking tenant lain |
| AC-12 | Pengguna sekolah A cuba melihat sekolah B | Ditolak pada server, RLS dan eksport |
| AC-13 | Murid pada program penjaga wajib | Aliran tempahan sendiri disekat/ditukar kepada guardian flow |
| AC-14 | QR diimbas dua kali | Tidak berlaku dua serahan bagi kuantiti sama |
| AC-15 | Restore backup dan rollback | Data rujukan serta hubungan pulih mengikut prosedur |
| AC-16 | E2E pengguna pada telefon | Checkout berjaya dengan accessibility yang mencukupi |

**Testing stack:** Vitest, Playwright, PostgreSQL transaction/RLS tests, payment sandbox/webhook replay, k6, axe dan manual UAT. Gunakan data sintetik untuk semua ujian sebelum pilot sebenar.

## 16. Infrastruktur, deployment dan operasi

**Pembangunan:** GitHub → PR/code review → lint/typecheck/unit/integration/security → staging deploy → UAT → production. Rahsia mengikut environment; separate gateway sandbox/production. Domain dan DNS belum dibeli/diputuskan.

**Production dependencies:** Hosted web app, managed PostgreSQL/Auth/Storage, transactional email, scheduler/reconciliation, gateway merchant, monitoring dan backup. Infrastruktur mestilah menyokong pengambilan semula transaksi walaupun browser ditutup.

**Runbooks minimum:** `deployment`, `rollback`, `reconcile-payments`, `handle-paid-unallocated`, `refund-escalation`, `backup-restore`, `incident-response`, `merchant-key-rotation`.

**Operasi pilot:** Monitor stok/kuota, booking pending, callback failures, response times, penyimpanan gambar fail serta jumlah bil transaksi harian. Sekurang-kurangnya seorang owner operasi yang boleh dihubungi ketika program.

## 17. Milestone pembangunan (tanpa janji jadual)

| Milestone | Hasil | Gate |
|---|---|---|
| M0 — Finalize keputusan | G1–G4/5, polisi data, onboarding merchant, nombor kos | Pemilik keputusan memberi pengesahan |
| M1 — Foundation | Repo, CI, schema, Auth, RBAC/RLS, file.md | Tenant isolation test lulus |
| M2 — Program & katalog | Program, item, varian, slot, kuota | Penganjur boleh cipta program lengkap |
| M3 — Checkout & inventory | Cart, atomik hold, idempotency, buyer policy | Concurrency tests lulus |
| M4 — Payment gateway P0 | Merchant settings, create bill, webhook, reconciliation, exceptions, refunds | Sandbox dan failure cases lulus |
| M5 — Fulfilment/reporting | Resit, QR, serahan, dashboard, CSV | UAT end-to-end lulus |
| M6 — Security/performance | Hardening, restore, load tests, privacy | Tiada isu kritikal; pemilik merchant/sekolah memberi kelulusan |
| M7 — Pilot berbayar | Sekolah pilot sah, transaksi kecil sebenar, operasi | Pembayaran/reconciliation diuji terkawal |
| M8 — Commercial iteration | Penetapan pembeli SaaS, harga dan retention | Bukti pelanggan, bukan sekadar pendaftaran |

## 18. Kos dan risiko kewangan (semua anggaran)

**Anggaran bulanan perancangan awal:** RM300–RM900 untuk aplikasi komersial berskala pilot + infra, email, monitoring dan rizab penggunaan. Tidak termasuk gaji, alat AI, domain, ujian keselamatan profesional, caj gateway per transaksi, cukai dan support. **Bajet sebenar belum diluluskan.** Prototip sandbox boleh lebih murah jika alat dan pelan membenarkan penggunaan tersebut.

**Risiko tertinggi:** merchant tidak layak/tiada pemegang dana sah; refund selepas stok luput; transaksi berganda; data murid; dasar penggunaan sistem di sekolah kerajaan; beban sokongan ketika program; pendapatan SaaS terlalu bermusim. Pastikan *go/no-go* komersial dibuat selepas validasi pembeli sebenar.

## 19. Backlog terutamakan, kecil dan bersandar

| Urutan | Ticket | Tugasan / acceptance |
|---|---|---|
| 01 | DEC-001 | Sahkan merchant-of-record, refund owner dan akaun penerima wang |
| 02 | DEC-002 | Sahkan polisi tempahan murid vs penjaga dan kebenaran sekolah |
| 03 | DEC-003 | Tetapkan bajet infra dan sekolah pilot |
| 04 | DOC-001 | Kunci PRD v1.0 dan wujudkan/kemas kini `file.md` |
| 05 | INF-001 | Setup repo, Next.js/TypeScript, lint/typecheck, CI |
| 06 | DB-001 | Migrasi tenants/members dan ujian composite tenant FK |
| 07 | SEC-001 | Auth, MFA admin, grants/RLS, negative authorization tests |
| 08 | PRG-001 | Program CRUD, state, dates dan polisi audience |
| 09 | CAT-001 | Offering + variant + slot + capacity pools |
| 10 | INV-001 | Atomic reserve, commit, release, expiry |
| 11 | BKG-001 | Cart, total server-side, checkout idempotency |
| 12 | PAY-001 | Merchant configuration securely, gateway adapter sandbox |
| 13 | PAY-002 | Cipta payment attempt dan redirect |
| 14 | PAY-003 | Callback signature, dedup dan paid transition |
| 15 | PAY-004 | Reconciliation job, late paid, refund/exception dashboard |
| 16 | BKG-002 | Receipt access tokens, QR dan email asas |
| 17 | FUL-001 | Staff scan, partial fulfilment, double-scan defence |
| 18 | RPT-001 | Reporting, filtering, safe CSV exports |
| 19 | SEC-002 | Rate limits, logs, privacy/retention, file security |
| 20 | QA-001 | Unit/integration/E2E, concurrency, gateway failure and replay |
| 21 | OPS-001 | Staging, backup/restore, runbooks, monitoring |
| 22 | PIL-001 | Pilot rasmi dengan transaksi nyata kecil setelah semua gate lulus |

**Definition of Done:** kod diuji, permission diuji, migration tersimpan, tiada secret, dokumentasi dikemas kini, `file.md` mempunyai path/simbol/baris sebenar, PR diluluskan dan rollback dinilai. **Belum ada ticket kod yang dimulakan**.

## 20. Sumber dan nota semakan

1. Billplz API & X Signature: https://support.billplz.com/api
2. Billplz callback vs redirect: https://support.billplz.com/guide/webhooks-and-callbacks
3. Supabase RLS: https://supabase.com/docs/guides/database/postgres/row-level-security
4. JPDP Akta 709 pemakaian: https://www.pdp.gov.my/ppdpv1/akta/pemakaian-dan-ketidakpakaian-akta/
5. JPDP pindaan 2024 dan garis panduan: https://www.pdp.gov.my/ppdpv1/akta/akta-pdppindaan-2024/

**Nota:** Sumber merupakan rujukan teknikal/perundangan semasa, bukan bukti produk telah mendapat kelulusan KPM, gateway atau sekolah tertentu. Semak semula versi dokumen/vendor semasa implementasi.

## 21. Rekod perubahan

| Versi | Tarikh | Perubahan | Status |
|---|---|---|---|
| 0.9 | Sebelum 27 Okt 2026 | Asas tempahan pelbagai kategori, bayaran automatik fasa kemudian | Draf terdahulu |
| **1.0** | **27 Okt 2026** | Kerajaan+swasta; bayaran gateway wajib MVP; murid/penjaga bergantung program; 200–1,000 peserta; merchant gating; `file.md` | **Seni bina diluluskan, prasyarat produksi terbuka** |
