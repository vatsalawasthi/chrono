"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { dynastyNodes, dynastyEdges } from "@/data/relationships";
import { getFigureById } from "@/data/figures";
import { DynastyNode } from "@/types";

const typeColors: Record<string, { bg: string; border: string; text: string }> = {
  ruler: {
    bg: "rgba(251,191,36,0.12)",
    border: "rgba(251,191,36,0.4)",
    text: "#fbbf24",
  },
  philosopher: {
    bg: "rgba(129,140,248,0.12)",
    border: "rgba(129,140,248,0.4)",
    text: "#818cf8",
  },
  general: {
    bg: "rgba(74,222,128,0.12)",
    border: "rgba(74,222,128,0.4)",
    text: "#4ade80",
  },
  other: {
    bg: "rgba(255,255,255,0.05)",
    border: "rgba(255,255,255,0.15)",
    text: "rgba(255,255,255,0.6)",
  },
};

// Fixed positions for each node
const nodePositions: Record<string, { x: number; y: number }> = {
  "n-socrates":   { x: 80,  y: 60  },
  "n-plato":      { x: 80,  y: 220 },
  "n-aristotle":  { x: 80,  y: 380 },
  "n-philip":     { x: 340, y: 220 },
  "n-alexander":  { x: 340, y: 380 },
  "n-ptolemy":    { x: 600, y: 380 },
  "n-cleopatra":  { x: 600, y: 540 },
};

const NODE_W = 160;
const NODE_H = 72;

export default function DynastyGraph() {
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const selectedFigure = selected
    ? getFigureById(dynastyNodes.find((n) => n.id === selected)?.figureId ?? "")
    : null;

  const getEdgePath = (sourceId: string, targetId: string) => {
    const src = nodePositions[sourceId];
    const tgt = nodePositions[targetId];
    if (!src || !tgt) return "";
    const x1 = src.x + NODE_W / 2;
    const y1 = src.y + NODE_H;
    const x2 = tgt.x + NODE_W / 2;
    const y2 = tgt.y;
    const cy = (y1 + y2) / 2;
    return `M ${x1} ${y1} C ${x1} ${cy}, ${x2} ${cy}, ${x2} ${y2}`;
  };

  const isConnected = (nodeId: string) => {
    if (!selected) return false;
    return dynastyEdges.some(
      (e) =>
        (e.source === selected && e.target === nodeId) ||
        (e.target === selected && e.source === nodeId)
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Legend */}
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
          {Object.entries(typeColors).map(([type, colors]) => (
            <div
              key={type}
              style={{ display: "flex", alignItems: "center", gap: 6 }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 3,
                  background: colors.bg,
                  border: `1px solid ${colors.border}`,
                }}
              />
              <span
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.4)",
                  textTransform: "capitalize",
                }}
              >
                {type}
              </span>
            </div>
          ))}
        </div>
        <div>
          <span style={{ fontSize: 12, color: "rgba(251,191,36,0.6)", fontWeight: 500 }}>
            Click node to explore · Pan / scroll tree →
          </span>
        </div>
      </div>

      {/* Graph container */}
      <div
        className="dynasty-graph-scroll"
        style={{
          background: "#0d0d14",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 24,
          overflowX: "auto",
          overflowY: "hidden",
          WebkitOverflowScrolling: "touch",
          position: "relative",
          width: "100%",
        }}
      >
        {/* Grid background */}
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: 0.03,
          }}
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        <svg
          ref={svgRef}
          viewBox="0 0 820 660"
          style={{
            width: "100%",
            minWidth: 600,
            height: "auto",
            display: "block",
            padding: "24px",
          }}
        >
          <defs>
            {/* Arrow marker */}
            <marker
              id="arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path
                d="M0,0 L0,6 L8,3 z"
                fill="rgba(255,255,255,0.2)"
              />
            </marker>
            <marker
              id="arrow-active"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L0,6 L8,3 z" fill="#fbbf24" />
            </marker>
          </defs>

          {/* Edges */}
          {dynastyEdges.map((edge) => {
            const isActive =
              selected &&
              (edge.source === selected || edge.target === selected);
            const path = getEdgePath(edge.source, edge.target);
            const src = nodePositions[edge.source];
            const tgt = nodePositions[edge.target];
            if (!src || !tgt || !path) return null;

            // Label position midpoint
            const mx = (src.x + NODE_W / 2 + tgt.x + NODE_W / 2) / 2;
            const my =
              (src.y + NODE_H + tgt.y) / 2;

            return (
              <g key={edge.id}>
                <path
                  d={path}
                  fill="none"
                  stroke={isActive ? "#fbbf24" : "rgba(255,255,255,0.1)"}
                  strokeWidth={isActive ? 2 : 1}
                  markerEnd={isActive ? "url(#arrow-active)" : "url(#arrow)"}
                  style={{ transition: "all 0.3s" }}
                />
                {isActive && (
                  <text
                    x={mx}
                    y={my}
                    textAnchor="middle"
                    style={{
                      fontSize: 10,
                      fill: "rgba(251,191,36,0.7)",
                      fontFamily: "sans-serif",
                    }}
                  >
                    {edge.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* Nodes */}
          {dynastyNodes.map((node) => {
            const pos = nodePositions[node.id];
            if (!pos) return null;
            const colors = typeColors[node.type] || typeColors.other;
            const isSelected = selected === node.id;
            const isHov = hovered === node.id;
            const connected = isConnected(node.id);
            const dimmed = selected && !isSelected && !connected;

            return (
              <g
                key={node.id}
                transform={`translate(${pos.x}, ${pos.y})`}
                style={{ cursor: "pointer" }}
                onClick={() =>
                  setSelected(isSelected ? null : node.id)
                }
                onMouseEnter={() => setHovered(node.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Glow when selected */}
                {isSelected && (
                  <rect
                    x={-4}
                    y={-4}
                    width={NODE_W + 8}
                    height={NODE_H + 8}
                    rx={18}
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth={2}
                    opacity={0.4}
                  />
                )}

                {/* Node box */}
                <rect
                  width={NODE_W}
                  height={NODE_H}
                  rx={14}
                  fill={isSelected ? colors.bg : "rgba(13,13,20,0.95)"}
                  stroke={
                    isSelected
                      ? colors.border
                      : isHov
                      ? "rgba(255,255,255,0.2)"
                      : "rgba(255,255,255,0.07)"
                  }
                  strokeWidth={isSelected ? 1.5 : 1}
                  opacity={dimmed ? 0.3 : 1}
                  style={{ transition: "all 0.2s" }}
                />

                {/* Type indicator bar */}
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={NODE_H}
                  rx={4}
                  fill={colors.border}
                  opacity={dimmed ? 0.3 : 0.8}
                />

                {/* Name */}
                <text
                  x={NODE_W / 2 + 4}
                  y={NODE_H / 2 - 6}
                  textAnchor="middle"
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    fill: dimmed
                      ? "rgba(255,255,255,0.2)"
                      : isSelected
                      ? "#fff"
                      : "rgba(255,255,255,0.85)",
                    fontFamily: "sans-serif",
                    transition: "all 0.2s",
                  }}
                >
                  {node.name.length > 18
                    ? node.name.slice(0, 16) + "…"
                    : node.name}
                </text>

                {/* Era */}
                <text
                  x={NODE_W / 2 + 4}
                  y={NODE_H / 2 + 12}
                  textAnchor="middle"
                  style={{
                    fontSize: 10,
                    fill: dimmed ? "rgba(255,255,255,0.1)" : colors.text,
                    fontFamily: "sans-serif",
                    transition: "all 0.2s",
                  }}
                >
                  {node.era}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected figure detail card */}
      {selectedFigure && (
        <div
          style={{
            background: "#13131a",
            border: "1px solid rgba(251,191,36,0.2)",
            borderRadius: 20,
            overflow: "hidden",
            animation: "fadeIn 0.3s ease",
          }}
        >
          <div
            style={{
              padding: "20px 24px",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ fontSize: 36 }}>{selectedFigure.avatar}</span>
              <div>
                <h3
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#fff",
                    marginBottom: 4,
                  }}
                >
                  {selectedFigure.name}
                </h3>
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      color: "rgba(255,255,255,0.4)",
                    }}
                  >
                    {selectedFigure.title}
                  </span>
                  <span
                    style={{
                      width: 3,
                      height: 3,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.2)",
                      display: "inline-block",
                    }}
                  />
                  <span
                    style={{
                      fontSize: 12,
                      color: "rgba(255,255,255,0.3)",
                    }}
                  >
                    {selectedFigure.era}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setSelected(null)}
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "transparent",
                color: "rgba(255,255,255,0.4)",
                cursor: "pointer",
                fontSize: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ✕
            </button>
          </div>

          <div style={{ padding: "20px 24px" }}>
            <p
              style={{
                fontSize: 14,
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.7,
                marginBottom: 20,
              }}
            >
              {selectedFigure.significance}
            </p>

            {/* Connected edges */}
            <div style={{ marginBottom: 20 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.25)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: 10,
                }}
              >
                Connections
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {dynastyEdges
                  .filter(
                    (e) =>
                      e.source === selected || e.target === selected
                  )
                  .map((edge) => {
                    const otherId =
                      edge.source === selected
                        ? edge.target
                        : edge.source;
                    const otherNode = dynastyNodes.find(
                      (n) => n.id === otherId
                    );
                    if (!otherNode) return null;
                    return (
                      <div
                        key={edge.id}
                        style={{
                          padding: "6px 12px",
                          borderRadius: 8,
                          background: "rgba(251,191,36,0.08)",
                          border: "1px solid rgba(251,191,36,0.15)",
                          fontSize: 12,
                          color: "rgba(255,255,255,0.6)",
                        }}
                      >
                        <span style={{ color: "#fbbf24" }}>
                          {edge.label}
                        </span>{" "}
                        {otherNode.name}
                      </div>
                    );
                  })}
              </div>
            </div>

            <Link
              href={`/figure/${selectedFigure.id}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 20px",
                borderRadius: 12,
                background: "rgba(251,191,36,0.1)",
                border: "1px solid rgba(251,191,36,0.25)",
                color: "#fbbf24",
                fontSize: 13,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              View full profile →
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}