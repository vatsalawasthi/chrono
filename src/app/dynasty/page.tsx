"use client";

import Navbar from "@/components/Navbar";
import DynastyGraph from "@/components/DynastyGraph";
import Link from "next/link";
import { dynastyNodes } from "@/data/relationships";
import { getFigureById } from "@/data/figures";

export default function DynastyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar />

      {/* Header */}
      <div
        style={{
          background:
            "linear-gradient(180deg, rgba(129,140,248,0.05) 0%, transparent 100%)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          paddingTop: 96,
          paddingBottom: 48,
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
          <Link
            href="/"
            style={{
              color: "rgba(255,255,255,0.3)",
              fontSize: 13,
              textDecoration: "none",
              display: "inline-block",
              marginBottom: 24,
            }}
          >
            ← Home
          </Link>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "5px 14px",
              borderRadius: 999,
              border: "1px solid rgba(129,140,248,0.25)",
              background: "rgba(129,140,248,0.08)",
              marginBottom: 16,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#818cf8",
                display: "inline-block",
              }}
            />
            <span
              style={{
                color: "#818cf8",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.05em",
              }}
            >
              Ancient Greece
            </span>
          </div>

          <h1
            style={{
              fontSize: 40,
              fontWeight: 800,
              color: "#fff",
              marginBottom: 12,
              lineHeight: 1.1,
            }}
          >
            Dynasty & Lineage
          </h1>
          <p
            style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.4)",
              maxWidth: 520,
              lineHeight: 1.6,
            }}
          >
            See how rulers, philosophers, and generals were connected. Click
            any node to explore their relationships and story.
          </p>
        </div>
      </div>

      {/* Graph */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
        <DynastyGraph />
      </div>

      {/* All nodes list */}
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "0 24px 80px",
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "rgba(255,255,255,0.25)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: 16,
          }}
        >
          All figures in this graph
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 12,
          }}
        >
          {dynastyNodes.map((node) => {
            const figure = getFigureById(node.figureId);
            if (!figure) return null;
            return (
              <Link
                key={node.id}
                href={`/figure/${node.figureId}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    padding: "14px 16px",
                    borderRadius: 14,
                    border: "1px solid rgba(255,255,255,0.06)",
                    background: "rgba(255,255,255,0.02)",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  <span style={{ fontSize: 24 }}>{figure.avatar}</span>
                  <div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "rgba(255,255,255,0.8)",
                        marginBottom: 2,
                      }}
                    >
                      {figure.name}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "rgba(255,255,255,0.3)",
                      }}
                    >
                      {figure.era}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}