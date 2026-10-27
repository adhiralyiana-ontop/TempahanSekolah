"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Utensils,
  Shirt,
  Ticket,
  Clock3,
  Building2,
  Check,
} from "lucide-react";

const categories = [
  {
    id: "makanan",
    label: "Makanan",
    icon: Utensils,
    title: "Bekal untuk hari yang istimewa",
    description: "Pilih menu dan kuantiti mengikut keperluan program.",
    items: [
      {
        name: "Nasi ayam",
        detail: "Set makan tengah hari",
        price: "RM8.00",
        emoji: "🍱",
      },
      {
        name: "Sandwic telur",
        detail: "Snek ringkas",
        price: "RM4.00",
        emoji: "🥪",
      },
    ],
  },
  {
    id: "barangan",
    label: "Barangan",
    icon: Shirt,
    title: "Kenangan yang boleh dibawa pulang",
    description: "Urus pilihan saiz dan kuota setiap varian.",
    items: [
      {
        name: "Baju hari sukan",
        detail: "Pilihan saiz S hingga XL",
        price: "RM25.00",
        emoji: "👕",
      },
      {
        name: "Beg program",
        detail: "Beg kanvas",
        price: "RM12.00",
        emoji: "🛍️",
      },
    ],
  },
  {
    id: "penyertaan",
    label: "Penyertaan",
    icon: Ticket,
    title: "Ruang untuk semua mengambil bahagian",
    description: "Tetapkan kapasiti bagi setiap kategori peserta.",
    items: [
      {
        name: "Larian keluarga",
        detail: "Kategori keluarga",
        price: "RM15.00",
        emoji: "🏃",
      },
      {
        name: "Bengkel seni",
        detail: "Kategori murid",
        price: "RM10.00",
        emoji: "🎨",
      },
    ],
  },
  {
    id: "slot",
    label: "Slot",
    icon: Clock3,
    title: "Masa tersusun, aktiviti lebih lancar",
    description: "Sediakan pilihan masa dengan kuota yang jelas.",
    items: [
      {
        name: "Sesi pagi",
        detail: "9:00 – 10:00 pagi",
        price: "Percuma",
        emoji: "☀️",
      },
      {
        name: "Sesi petang",
        detail: "2:00 – 3:00 petang",
        price: "Percuma",
        emoji: "🌤️",
      },
    ],
  },
  {
    id: "kemudahan",
    label: "Kemudahan",
    icon: Building2,
    title: "Kemudahan untuk menjayakan program",
    description: "Tawarkan tempat dan kemudahan dalam satu program.",
    items: [
      {
        name: "Tapak gerai",
        detail: "Ruang niaga program",
        price: "RM30.00",
        emoji: "🏡",
      },
      {
        name: "Meja pameran",
        detail: "Satu meja setiap tempahan",
        price: "RM10.00",
        emoji: "🪴",
      },
    ],
  },
];

export function ProgramPreview() {
  const [active, setActive] = useState(0);
  const selected = categories[active];
  return (
    <div className="preview-wrap">
      <div className="preview-stamp">
        <span className="stamp-star">✳︎</span> Kurang kerja manual.
        <br />
        Lebih masa bersama.
      </div>
      <div className="program-preview" aria-label="Ilustrasi katalog program">
        <div className="preview-toolbar">
          <span>
            <span className="tiny-logo">t.</span> Halaman program
          </span>
          <span className="preview-label">CONTOH PAPARAN</span>
        </div>
        <div className="program-cover">
          <div className="cover-lines" aria-hidden="true" />
          <span className="cover-tag">KITA MERAIKAN KEBERSAMAAN</span>
          <span className="cover-title">
            Hari Keluarga<span>Sekolah Kita</span>
          </span>
          <span className="cover-flower" aria-hidden="true">
            ✳︎
          </span>
          <span className="cover-year">2026</span>
        </div>
        <div className="program-body">
          <div className="program-meta">
            <span>
              <CalendarDays size={13} aria-hidden="true" /> 14 November 2026
            </span>
            <span>
              <MapPin size={13} aria-hidden="true" /> Dataran sekolah
            </span>
          </div>
          <h3>Satu hari, pelbagai pilihan.</h3>
          <p>Pilih keperluan anda untuk program ini.</p>
          <div
            className="category-picker"
            role="group"
            aria-label="Kategori contoh"
          >
            {categories.map((category, index) => (
              <button
                type="button"
                key={category.id}
                aria-pressed={active === index}
                onClick={() => setActive(index)}
              >
                <category.icon size={14} aria-hidden="true" />
                {category.label}
              </button>
            ))}
          </div>
          <div className="preview-items" aria-live="polite" aria-atomic="true">
            {selected.items.map((item) => (
              <div className="preview-item" key={item.name}>
                <div
                  className={`item-art item-art-${selected.id}`}
                  aria-hidden="true"
                >
                  {item.emoji}
                </div>
                <div>
                  <h4>{item.name}</h4>
                  <p>{item.detail}</p>
                  <strong>{item.price}</strong>
                </div>
                <span className="item-arrow" aria-hidden="true">
                  <ArrowUpRight size={16} />
                </span>
              </div>
            ))}
          </div>
          <div className="preview-note">
            <Check size={14} aria-hidden="true" />
            <span>Ilustrasi sahaja · Tiada tempahan atau bayaran dibuat</span>
          </div>
        </div>
      </div>
      <div className="floating-note">
        <span className="note-icon">
          <Check size={19} aria-hidden="true" />
        </span>
        <div>
          <strong>Semuanya dalam satu pautan</strong>
          <span>Makanan, barangan & aktiviti</span>
        </div>
        <span className="note-spark" aria-hidden="true">
          ✧
        </span>
      </div>
    </div>
  );
}
