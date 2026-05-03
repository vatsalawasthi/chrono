"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import StoryCard from "@/components/StoryCard";
import { storyPaths } from "@/data/storyPaths";
import { getFigureById } from "@/data/figures";

export default function StoryPathPage() {
  const { pathId } = useParams();
  const [currentStep, setCurrentStep] = useState(0);

  const path = storyPaths.find((p) => p.id === pathId);

  if (!path) {
    return (
      <div style={{
        minHeight: "100vh", background: "#0a0a0f",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🗺️</div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#fff", marginBottom: 16 }}>
            Path not found
          </h1>
          <Link href="/" style={{ color: "#fbbf24", textDecoration: "none" }}>
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const step = path.steps[currentStep];
  const linkedFigure = step.figureId ? getFigureById(step.figureId) : null;
  const progress = ((currentStep + 1) / path.steps.length) * 100;

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", color: "#f0f0f0" }}>
      <Navbar />

      {/* Progress bar */}
      <div style={{
        position: "fixed", top: 64, left: 0, right: 0,
        zIndex: 40, height: 2, background: "rgba(255,255,255,0.05)",
      }}>
        <div style={{
          height: "100%",
          background: "linear-gradient(to right, #fbbf24, #fb923c)",
          width: `${progress}%`,
          transition: "width 0.7s ease",
        }} />
      </div>

      <div style={{
        maxWidth: 1200, margin: "0 auto",
        padding: "88px 24px 60px",
        display: "grid",
        gridTemplateColumns: "220px 1fr 200px",
        gap: 32,
        alignItems: "start",
      }}>

        {/* ── Left Sidebar ── */}
        <div style={{ position: "sticky", top: 88 }}>
          <Link href="/" style={{
            color: "rgba(255,255,255,0.3)", fontSize: 13,
            textDecoration: "none", display: "block", marginBottom: 20,
          }}>
            ← Home
          </Link>
          <div style={{ fontWeight: 700, fontSize: 15, color: "#fff", marginBottom: 4 }}>
            {path.title}
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginBottom: 20 }}>
            ~{path.estimatedMinutes} min · {path.steps.length} episodes
          </div>

          {/* Steps list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {path.steps.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setCurrentStep(i)}
                style={{
                  width: "100%", textAlign: "left",
                  padding: "10px 12px", borderRadius: 12,
                  border: i === currentStep
                    ? "1px solid rgba(251,191,36,0.3)"
                    : "1px solid transparent",
                  background: i === currentStep
                    ? "rgba(251,191,36,0.08)" : "transparent",
                  cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 10,
                  opacity: i > currentStep ? 0.4 : 1,
                  transition: "all 0.2s",
                }}
              >
                <div style={{
                  width: 24, height: 24, borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 700, flexShrink: 0,
                  background: i < currentStep
                    ? "#fbbf24"
                    : i === currentStep
                    ? "transparent" : "transparent",
                  border: i < currentStep
                    ? "none"
                    : i === currentStep
                    ? "2px solid #fbbf24"
                    : "1px solid rgba(255,255,255,0.2)",
                  color: i < currentStep
                    ? "#000"
                    : i === currentStep
                    ? "#fbbf24" : "rgba(255,255,255,0.3)",
                }}>
                  {i < currentStep ? "✓" : i + 1}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{
                    fontSize: 12, fontWeight: 500,
                    color: i === currentStep ? "#fff" : "rgba(255,255,255,0.45)",
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}>
                    {s.title}
                  </div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>
                    {s.subtitle}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Progress */}
          <div style={{
            marginTop: 16, padding: "12px",
            borderRadius: 12, border: "1px solid rgba(255,255,255,0.05)",
            background: "rgba(255,255,255,0.02)",
          }}>
            <div style={{
              display: "flex", justifyContent: "space-between",
              fontSize: 11, color: "rgba(255,255,255,0.3)", marginBottom: 8,
            }}>
              <span>Progress</span>
              <span>{currentStep + 1}/{path.steps.length}</span>
            </div>
            <div style={{
              height: 4, borderRadius: 4,
              background: "rgba(255,255,255,0.05)", overflow: "hidden",
            }}>
              <div style={{
                height: "100%", borderRadius: 4,
                background: "linear-gradient(to right, #fbbf24, #fb923c)",
                width: `${progress}%`, transition: "width 0.5s ease",
              }} />
            </div>
          </div>
        </div>

        {/* ── Center: Story Card ── */}
        <div>
          <StoryCard
            step={step}
            totalSteps={path.steps.length}
            onNext={() => setCurrentStep((s) => Math.min(s + 1, path.steps.length - 1))}
            onPrev={() => setCurrentStep((s) => Math.max(s - 1, 0))}
            isFirst={currentStep === 0}
            isLast={currentStep === path.steps.length - 1}
          />
        </div>

        {/* ── Right: Linked Figure ── */}
        <div style={{ position: "sticky", top: 88 }}>
          {linkedFigure ? (
            <div>
              <div style={{
                fontSize: 11, fontWeight: 700,
                color: "rgba(255,255,255,0.25)",
                textTransform: "uppercase", letterSpacing: "0.08em",
                marginBottom: 12,
              }}>
                Featured Figure
              </div>
              <Link href={`/figure/${linkedFigure.id}`} style={{ textDecoration: "none" }}>
                <div style={{
                  padding: "18px", borderRadius: 18,
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: "#13131a", cursor: "pointer",
                }}>
                  <div style={{ fontSize: 36, marginBottom: 10 }}>{linkedFigure.avatar}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 4 }}>
                    {linkedFigure.name}
                  </div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginBottom: 10 }}>
                    {linkedFigure.era}
                  </div>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>
                    {linkedFigure.significance}
                  </p>
                  <div style={{ marginTop: 12, fontSize: 12, color: "#fbbf24" }}>
                    View full profile →
                  </div>
                </div>
              </Link>

              {/* Key events */}
              <div style={{ marginTop: 16 }}>
                <div style={{
                  fontSize: 11, fontWeight: 700,
                  color: "rgba(255,255,255,0.25)",
                  textTransform: "uppercase", letterSpacing: "0.08em",
                  marginBottom: 10,
                }}>
                  Key Events
                </div>
                {linkedFigure.timelineEvents.slice(0, 3).map((event) => (
                  <div key={event.label} style={{
                    display: "flex", gap: 10, alignItems: "flex-start",
                    marginBottom: 10,
                  }}>
                    <div style={{
                      width: 6, height: 6, borderRadius: "50%",
                      background: "rgba(251,191,36,0.5)",
                      marginTop: 5, flexShrink: 0,
                    }} />
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.5)" }}>
                        {Math.abs(event.year)} BC
                      </div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>
                        {event.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{
              padding: "20px", borderRadius: 18,
              border: "1px solid rgba(255,255,255,0.05)",
              background: "#13131a", textAlign: "center",
            }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>🏛️</div>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", lineHeight: 1.6 }}>
                No specific figure for this episode
              </p>
            </div>
          )}

          <Link href="/" style={{
            display: "block", marginTop: 12, padding: "10px",
            borderRadius: 12, border: "1px solid rgba(255,255,255,0.05)",
            color: "rgba(255,255,255,0.25)", textAlign: "center",
            fontSize: 12, textDecoration: "none",
          }}>
            View all figures →
          </Link>
        </div>
      </div>
    </div>
  );
}