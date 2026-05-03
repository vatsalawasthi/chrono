"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Timeline from "@/components/Timeline";
import { getFigureById, figures } from "@/data/figures";

const sectionConfig = [
  { key: "earlyLife", label: "Early Life", emoji: "🌱" },
  { key: "riseToPower", label: "Rise to Power", emoji: "📈" },
  { key: "achievements", label: "Achievements", emoji: "🏆" },
  { key: "conflicts", label: "Conflicts", emoji: "⚔️" },
  { key: "legacy", label: "Legacy", emoji: "🌍" },
];

const relationshipColors: Record<string, string> = {
  father: "#fbbf24",
  mother: "#f472b6",
  successor: "#4ade80",
  predecessor: "#a78bfa",
  rival: "#f87171",
  mentor: "#22d3ee",
  ally: "#60a5fa",
};

export default function FigurePage() {
  const { figureId } = useParams();
  const figure = getFigureById(figureId as string);

  if (!figure) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0a0a0f",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>👤</div>
          <h1
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: "#fff",
              marginBottom: 16,
            }}
          >
            Figure not found
          </h1>
          <Link
            href="/"
            style={{ color: "#fbbf24", textDecoration: "none" }}
          >
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", color: "#f0f0f0" }}>
      <Navbar />

      {/* ── Hero ── */}
      <div
        style={{
          background:
            "linear-gradient(180deg, rgba(251,191,36,0.06) 0%, transparent 100%)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          paddingTop: 100,
          paddingBottom: 48,
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
          <Link
            href="/"
            style={{
              color: "rgba(255,255,255,0.35)",
              fontSize: 13,
              textDecoration: "none",
              display: "inline-block",
              marginBottom: 32,
            }}
          >
            ← Back to home
          </Link>

          <div style={{ display: "flex", alignItems: "flex-start", gap: 28, flexWrap: "wrap" }}>
            {/* Avatar */}
            <div
              style={{
                width: 88,
                height: 88,
                borderRadius: 24,
                background: "rgba(251,191,36,0.1)",
                border: "1px solid rgba(251,191,36,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 44,
                flexShrink: 0,
              }}
            >
              {figure.avatar}
            </div>

            <div style={{ flex: 1, minWidth: 240 }}>
              {/* Tags */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
                {figure.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: "3px 12px",
                      borderRadius: 999,
                      background: "rgba(251,191,36,0.1)",
                      border: "1px solid rgba(251,191,36,0.2)",
                      color: "#fbbf24",
                      fontSize: 11,
                      fontWeight: 600,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Name */}
              <h1
                style={{
                  fontSize: 40,
                  fontWeight: 800,
                  color: "#fff",
                  lineHeight: 1.1,
                  marginBottom: 8,
                  letterSpacing: "-0.02em",
                }}
              >
                {figure.name}
              </h1>

              {/* Title + Era */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 15 }}>
                  {figure.title}
                </span>
                <span
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.2)",
                    display: "inline-block",
                  }}
                />
                <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 14 }}>
                  {figure.era}
                </span>
              </div>

              {/* Significance */}
              <p
                style={{
                  marginTop: 16,
                  fontSize: 15,
                  color: "rgba(255,255,255,0.65)",
                  lineHeight: 1.65,
                  maxWidth: 560,
                  padding: "14px 18px",
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.03)",
                  borderLeft: "3px solid rgba(251,191,36,0.5)",
                }}
              >
                {figure.significance}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "48px 24px 80px",
          display: "grid",
          gridTemplateColumns: "1fr 300px",
          gap: 28,
          alignItems: "start",
        }}
      >
        {/* ── Left Column ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Story Sections */}
          {sectionConfig.map((sec) => (
            <div
              key={sec.key}
              style={{
                background: "#13131a",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 20,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "16px 24px",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <span style={{ fontSize: 18 }}>{sec.emoji}</span>
                <h2
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.85)",
                  }}
                >
                  {sec.label}
                </h2>
              </div>
              <div style={{ padding: "20px 24px" }}>
                <p
                  style={{
                    fontSize: 14,
                    color: "rgba(255,255,255,0.6)",
                    lineHeight: 1.75,
                  }}
                >
                  {figure.sections[sec.key as keyof typeof figure.sections]}
                </p>
              </div>
            </div>
          ))}

          {/* Timeline */}
          <div
            style={{
              background: "#13131a",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 20,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "16px 24px",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span style={{ fontSize: 18 }}>📅</span>
              <h2 style={{ fontSize: 15, fontWeight: 700, color: "rgba(255,255,255,0.85)" }}>
                Life Timeline
              </h2>
            </div>
            <div style={{ padding: "24px" }}>
              <Timeline events={figure.timelineEvents} />
            </div>
          </div>
        </div>

        {/* ── Right Column ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            position: "sticky",
            top: 80,
          }}
        >
          {/* Relationships */}
          {figure.relationships.length > 0 && (
            <div
              style={{
                background: "#13131a",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 20,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "14px 20px",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span style={{ fontSize: 15 }}>🔗</span>
                <h3
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.5)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  Relationships
                </h3>
              </div>
              <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
                {figure.relationships.map((rel) => {
                  const related = getFigureById(rel.figureId);
                  if (!related) return null;
                  const color = relationshipColors[rel.type] || "#fff";
                  return (
                    <Link
                      key={rel.figureId}
                      href={`/figure/${rel.figureId}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          padding: "10px 12px",
                          borderRadius: 12,
                          border: "1px solid rgba(255,255,255,0.05)",
                          background: "rgba(255,255,255,0.02)",
                          cursor: "pointer",
                        }}
                      >
                        <span style={{ fontSize: 22 }}>{related.avatar}</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              fontSize: 13,
                              fontWeight: 600,
                              color: "#fff",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {related.name}
                          </div>
                          <div style={{ fontSize: 11, color, marginTop: 2 }}>
                            {rel.label}
                          </div>
                        </div>
                        <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 12 }}>→</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quick Facts */}
          <div
            style={{
              background: "#13131a",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 20,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "14px 20px",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span style={{ fontSize: 15 }}>📌</span>
              <h3
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.5)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Quick Facts
              </h3>
            </div>
            <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { label: "Era", value: figure.era },
                { label: "Title", value: figure.title },
                {
                  label: "Born",
                  value: figure.born < 0 ? `${Math.abs(figure.born)} BC` : `${figure.born} AD`,
                },
                {
                  label: "Died",
                  value: figure.died < 0 ? `${Math.abs(figure.died)} BC` : `${figure.died} AD`,
                },
              ].map((fact) => (
                <div
                  key={fact.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingBottom: 10,
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
                    {fact.label}
                  </span>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>
                    {fact.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Other Figures */}
          <div
            style={{
              background: "#13131a",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 20,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "14px 20px",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span style={{ fontSize: 15 }}>👥</span>
              <h3
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.5)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Other Figures
              </h3>
            </div>
            <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
              {figures
                .filter((f) => f.id !== figure.id)
                .slice(0, 5)
                .map((f) => (
                  <Link
                    key={f.id}
                    href={`/figure/${f.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "8px 10px",
                        borderRadius: 10,
                        cursor: "pointer",
                      }}
                    >
                      <span style={{ fontSize: 20 }}>{f.avatar}</span>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>
                          {f.name}
                        </div>
                        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
                          {f.era}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>

          {/* Back to story */}
          <Link
            href="/story/ancient-greece-story"
            style={{
              display: "block",
              padding: "13px",
              borderRadius: 14,
              background: "rgba(251,191,36,0.08)",
              border: "1px solid rgba(251,191,36,0.2)",
              color: "#fbbf24",
              textAlign: "center",
              fontSize: 13,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            ← Back to Story Path
          </Link>
        </div>
      </div>
    </div>
  );
}