"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/story/ancient-greece-story", label: "Story Path" },
    { href: "/dynasty", label: "Dynasty" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: 64,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(10,10,15,0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 24px",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              background: "linear-gradient(135deg, #fbbf24, #fb923c)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: 14,
              color: "#000",
              boxShadow: "0 4px 12px rgba(251,191,36,0.25)",
            }}
          >
            C
          </div>
          <span
            style={{ fontWeight: 700, fontSize: 18, color: "#fff" }}
          >
            Chrono
          </span>
        </Link>

        {/* Nav links */}
        <div style={{ display: "flex", gap: 4 }}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: "8px 16px",
                borderRadius: 10,
                fontSize: 14,
                fontWeight: pathname === link.href ? 600 : 400,
                color:
                  pathname === link.href
                    ? "#fff"
                    : "rgba(255,255,255,0.45)",
                background:
                  pathname === link.href
                    ? "rgba(255,255,255,0.08)"
                    : "transparent",
                textDecoration: "none",
                transition: "all 0.2s",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <Link
          href="/story/ancient-greece-story"
          style={{
            padding: "9px 20px",
            borderRadius: 10,
            background: "#fbbf24",
            color: "#000",
            fontWeight: 700,
            fontSize: 14,
            textDecoration: "none",
            boxShadow: "0 4px 16px rgba(251,191,36,0.25)",
          }}
        >
          Start Learning →
        </Link>
      </div>
    </nav>
  );
}