"use client";

import { TimelineEvent } from "@/types";

interface TimelineProps {
  events: TimelineEvent[];
}

const typeColors: Record<string, { bg: string; dot: string; text: string }> = {
  birth: {
    bg: "rgba(74,222,128,0.08)",
    dot: "#4ade80",
    text: "rgba(74,222,128,0.9)",
  },
  death: {
    bg: "rgba(248,113,113,0.08)",
    dot: "#f87171",
    text: "rgba(248,113,113,0.9)",
  },
  conquest: {
    bg: "rgba(251,191,36,0.08)",
    dot: "#fbbf24",
    text: "rgba(251,191,36,0.9)",
  },
  political: {
    bg: "rgba(129,140,248,0.08)",
    dot: "#818cf8",
    text: "rgba(129,140,248,0.9)",
  },
  cultural: {
    bg: "rgba(34,211,238,0.08)",
    dot: "#22d3ee",
    text: "rgba(34,211,238,0.9)",
  },
};

export default function Timeline({ events }: TimelineProps) {
  const sorted = [...events].sort((a, b) => a.year - b.year);

  return (
    <div style={{ position: "relative", paddingLeft: 24 }}>
      {/* Vertical line */}
      <div
        style={{
          position: "absolute",
          left: 7,
          top: 8,
          bottom: 8,
          width: 1,
          background:
            "linear-gradient(to bottom, transparent, rgba(255,255,255,0.1) 20%, rgba(255,255,255,0.1) 80%, transparent)",
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {sorted.map((event, i) => {
          const colors = typeColors[event.type] || typeColors.cultural;
          const yearLabel =
            event.year < 0
              ? `${Math.abs(event.year)} BC`
              : `${event.year} AD`;

          return (
            <div
              key={i}
              style={{
                position: "relative",
                padding: "16px 18px",
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.05)",
                background: colors.bg,
                transition: "all 0.2s",
                cursor: "default",
              }}
            >
              {/* Dot on timeline */}
              <div
                style={{
                  position: "absolute",
                  left: -21,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: colors.dot,
                  boxShadow: `0 0 8px ${colors.dot}`,
                  border: "2px solid #0a0a0f",
                }}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 12,
                  marginBottom: 6,
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#fff",
                  }}
                >
                  {event.label}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: colors.text,
                    whiteSpace: "nowrap",
                    padding: "2px 8px",
                    borderRadius: 6,
                    background: colors.bg,
                    border: `1px solid ${colors.dot}30`,
                  }}
                >
                  {yearLabel}
                </span>
              </div>
              <p
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.45)",
                  lineHeight: 1.55,
                }}
              >
                {event.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}