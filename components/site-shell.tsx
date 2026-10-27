"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
export function Brand() {
  return (
    <Link href="/" className="brand">
      <span className="brand-mark">
        b<span>e</span>
      </span>
      <span>
        brasil em
        <br />
        <strong>
          evidências<span className="green">.</span>
        </strong>
      </span>
    </Link>
  );
}
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header>
      <div className="nav wrap">
        <Brand />
        <nav aria-label="Navegação principal" className={open ? "open" : ""}>
          <Link href="/indicadores" onClick={() => setOpen(false)}>
            Brasil Em Perspectiva
          </Link>
          <Link href="/checagens" onClick={() => setOpen(false)}>
            Checagem de fake news
          </Link>
          <Link href="/pandemia" onClick={() => setOpen(false)}>
            Pandemia
          </Link>
          <Link href="/justica" onClick={() => setOpen(false)}>
            Justiça e corrupção
          </Link>
        </nav>
        <Link className="nav-method" href="/#metodologia">
          Metodologia <ArrowUpRight size={15} />
        </Link>
        <ThemeToggle />
        <button
          className="menu-button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
export function SiteFooter() {
  return (
    <footer>
      <div className="wrap footer-inner">
        <Brand />
        <p>Séries históricas. Contexto acessível. Fontes à vista.</p>
        <Link href="/checagens">
          Checagem de fake news <ArrowUpRight size={14} />
        </Link>
      </div>
    </footer>
  );
}
