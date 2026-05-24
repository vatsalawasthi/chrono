"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/story/ancient-greece-story", label: "Story Path" },
    { href: "/dynasty", label: "Dynasty" },
  ];

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        height: 64,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(10,10,15,0.92)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto", padding: "0 20px",
          height: "100%", display: "flex", alignItems: "center",
          justifyContent: "space-between",
        }}>
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{
              width: 32, height: 32, borderRadius: 10,
              background: "linear-gradient(135deg, #fbbf24, #fb923c)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 800, fontSize: 14, color: "#000",
            }}>C</div>
            <span style={{ fontWeight: 700, fontSize: 18, color: "#fff" }}>Chrono</span>
          </Link>

          {/* Desktop Links */}
          <div style={{ display: "flex", gap: 4, "@media(maxWidth:768px)": { display: "none" } as any }}>
            {links.map((link) => (
              <Link key={link.href} href={link.href} style={{
                padding: "8px 16px", borderRadius: 10, fontSize: 14,
                fontWeight: pathname === link.href ? 600 : 400,
                color: pathname === link.href ? "#fff" : "rgba(255,255,255,0.45)",
                background: pathname === link.href ? "rgba(255,255,255,0.08)" : "transparent",
                textDecoration: "none",
              }}>{link.label}</Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <Link href="/story/ancient-greece-story" style={{
            padding: "9px 20px", borderRadius: 10,
            background: "#fbbf24", color: "#000",
            fontWeight: 700, fontSize: 14, textDecoration: "none",
            display: typeof window !== "undefined" && window.innerWidth < 768 ? "none" : "block",
          }}>Start Learning →</Link>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 8, padding: "8px 10px", cursor: "pointer",
              display: "flex", flexDirection: "column", gap: 4,
            }}
          >
            <span style={{ width: 18, height: 2, background: "#fff", display: "block", borderRadius: 2 }} />
            <span style={{ width: 18, height: 2, background: "#fff", display: "block", borderRadius: 2 }} />
            <span style={{ width: 18, height: 2, background: "#fff", display: "block", borderRadius: 2 }} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: 64, left: 0, right: 0, zIndex: 99,
          background: "rgba(10,10,15,0.98)", backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          padding: "16px 20px 24px",
          display: "flex", flexDirection: "column", gap: 4,
        }}>
          {links.map((link) => (
            <Link key={link.href} href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                padding: "14px 16px", borderRadius: 12, fontSize: 15,
                fontWeight: pathname === link.href ? 600 : 400,
                color: pathname === link.href ? "#fff" : "rgba(255,255,255,0.55)",
                background: pathname === link.href ? "rgba(255,255,255,0.06)" : "transparent",
                textDecoration: "none", display: "block",
              }}>{link.label}</Link>
          ))}
          <Link href="/story/ancient-greece-story"
            onClick={() => setMenuOpen(false)}
            style={{
              marginTop: 8, padding: "14px 16px", borderRadius: 12,
              background: "#fbbf24", color: "#000",
              fontWeight: 700, fontSize: 15, textDecoration: "none",
              textAlign: "center", display: "block",
            }}>Start Learning →</Link>
        </div>
      )}

      <style>{`
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
        }
        @media (max-width: 768px) {
          .desktop-links { display: none !important; }
          .desktop-cta { display: none !important; }
        }
      `}</style>
    </>
  );
}