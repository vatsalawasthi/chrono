"use client";

import { StoryStep } from "@/types";
import { useState } from "react";

interface StoryCardProps {
  step: StoryStep;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export default function StoryCard({
  step,
  totalSteps,
  onNext,
  onPrev,
  isFirst,
  isLast,
}: StoryCardProps) {
  const [simplified, setSimplified] = useState(false);

  return (
    <div className="w-full max-w-2xl mx-auto">

      {/* Episode badge */}
      <div className="flex items-center gap-3 mb-6">
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 14px",
            borderRadius: "999px",
            border: "1px solid rgba(251,191,36,0.35)",
            background: "rgba(251,191,36,0.1)",
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#fbbf24",
              display: "inline-block",
            }}
          />
          <span
            style={{
              color: "#fbbf24",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.05em",
            }}
          >
            Episode {step.stepNumber} of {totalSteps}
          </span>
        </div>
        <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 12 }}>
          {step.subtitle}
        </span>
      </div>

      {/* Main card */}
      <div
        style={{
          background: "#13131a",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 24,
          overflow: "hidden",
          boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
        }}
      >
        {/* Top: emoji + title */}
        <div
          style={{
            padding: "32px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 16 }}>{step.imageEmoji}</div>
          <h2
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#fff",
              marginBottom: 8,
              lineHeight: 1.25,
            }}
          >
            {step.title}
          </h2>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13 }}>
            {step.subtitle}
          </p>
        </div>

        {/* Content */}
        <div
          style={{
            padding: "32px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Toggle */}
          <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
            <button
              onClick={() => setSimplified(false)}
              style={{
                padding: "6px 16px",
                borderRadius: 10,
                fontSize: 12,
                fontWeight: 500,
                cursor: "pointer",
                border: "none",
                background: !simplified
                  ? "rgba(255,255,255,0.15)"
                  : "transparent",
                color: !simplified ? "#fff" : "rgba(255,255,255,0.35)",
                transition: "all 0.2s",
              }}
            >
              Full story
            </button>
            <button
              onClick={() => setSimplified(true)}
              style={{
                padding: "6px 16px",
                borderRadius: 10,
                fontSize: 12,
                fontWeight: 500,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                border: simplified
                  ? "1px solid rgba(251,191,36,0.35)"
                  : "none",
                background: simplified
                  ? "rgba(251,191,36,0.12)"
                  : "transparent",
                color: simplified ? "#fbbf24" : "rgba(255,255,255,0.35)",
                transition: "all 0.2s",
              }}
            >
              ✨ Explain simply
            </button>
          </div>

          {/* Text */}
          <p
            style={{
              color: "rgba(255,255,255,0.72)",
              fontSize: 15,
              lineHeight: 1.75,
              minHeight: 100,
            }}
          >
            {simplified ? step.simplifiedContent : step.content}
          </p>
        </div>

        {/* Key fact */}
        <div
          style={{
            padding: "24px 32px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 16,
              padding: "18px 20px",
              borderRadius: 16,
              border: "1px solid rgba(251,191,36,0.18)",
              background: "rgba(251,191,36,0.06)",
            }}
          >
            <span style={{ fontSize: 20, marginTop: 2 }}>💡</span>
            <div>
              <div
                style={{
                  color: "#fbbf24",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                Key Fact
              </div>
              <p
                style={{
                  color: "rgba(255,255,255,0.65)",
                  fontSize: 13,
                  lineHeight: 1.65,
                }}
              >
                {step.keyFact}
              </p>
            </div>
          </div>
        </div>

        {/* Coming up */}
        {!isLast && (
          <div
            style={{
              padding: "14px 32px",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.015)",
            }}
          >
            <p style={{ color: "rgba(255,255,255,0.28)", fontSize: 12 }}>
              <span style={{ color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>
                Coming up:{" "}
              </span>
              {step.nextStepTeaser}
            </p>
          </div>
        )}

        {/* Navigation */}
        <div
          style={{
            padding: "20px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <button
            onClick={onPrev}
            disabled={isFirst}
            style={{
              padding: "10px 20px",
              borderRadius: 12,
              fontSize: 13,
              fontWeight: 500,
              cursor: isFirst ? "not-allowed" : "pointer",
              border: isFirst ? "none" : "1px solid rgba(255,255,255,0.12)",
              background: "transparent",
              color: isFirst ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.5)",
              transition: "all 0.2s",
            }}
          >
            ← Previous
          </button>

          {isLast ? (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, marginBottom: 4 }}>🏛️</div>
              <span style={{ color: "#fbbf24", fontSize: 13, fontWeight: 700 }}>
                Path Complete!
              </span>
            </div>
          ) : (
            <button
              onClick={onNext}
              style={{
                padding: "10px 28px",
                borderRadius: 12,
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                border: "none",
                background: "#fbbf24",
                color: "#000",
                boxShadow: "0 8px 24px rgba(251,191,36,0.3)",
                transition: "all 0.2s",
              }}
            >
              Next Episode →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}