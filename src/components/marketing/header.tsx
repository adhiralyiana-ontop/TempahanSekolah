"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Brand } from "@/components/ui/brand";
import { ButtonLink } from "@/components/ui/button";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Navigasi utama">
          <Link href="/#kelebihan">Kelebihan</Link>
          <Link href="/#cara-kerja">Cara kerja</Link>
          <Link href="/#soalan-lazim">Soalan lazim</Link>
        </nav>
        <div className="header-actions">
          <ButtonLink href="/demo" variant="secondary">
            Bincang keperluan <ArrowUpRight size={16} aria-hidden="true" />
          </ButtonLink>
          <button
            className="menu-toggle"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
      <nav
        id="mobile-navigation"
        className="mobile-nav container"
        hidden={!open}
        aria-label="Navigasi mudah alih"
      >
        <Link onClick={() => setOpen(false)} href="/#kelebihan">
          Kelebihan
        </Link>
        <Link onClick={() => setOpen(false)} href="/#cara-kerja">
          Cara kerja
        </Link>
        <Link onClick={() => setOpen(false)} href="/#soalan-lazim">
          Soalan lazim
        </Link>
        <Link onClick={() => setOpen(false)} href="/demo">
          Bincang keperluan
        </Link>
      </nav>
    </header>
  );
}
