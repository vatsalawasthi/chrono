"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { figures } from "@/data/figures";

const interests = [
  { id: "all", label: "All", emoji: "🌍" },
  { id: "King", label: "Kings", emoji: "👑" },
  { id: "Philosopher", label: "Philosophers", emoji: "📚" },
  { id: "General", label: "Generals", emoji: "⚔️" },
  { id: "Scientist", label: "Scientists", emoji: "🔬" },
];

export default function HomePage() {
  const [activeInterest, setActiveInterest] = useState("all");

  const filteredFigures =
    activeInterest === "all"
      ? figures.slice(0, 8)
      : figures
          .filter((f) => f.tags.some((t) => t === activeInterest))
          .slice(0, 8);

  return (
    <main style={{ minHeight: "100vh", background: "#0a0a0f", color: "#f0f0f0" }}>
      <Navbar />

      {/* ── HERO ── */}
      <div style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "80px 24px",
        position: "relative",
      }}>
        <div style={{
          position: "absolute", top: "20%", left: "50%",
          transform: "translateX(-50%)",
          width: 600, height: 600,
          background: "radial-gradient(circle, rgba(251,191,36,0.07) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 720 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "7px 18px", borderRadius: 999,
            border: "1px solid rgba(251,191,36,0.25)",
            background: "rgba(251,191,36,0.07)",
            marginBottom: 36,
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: "50%",
              background: "#fbbf24", display: "inline-block",
              boxShadow: "0 0 8px rgba(251,191,36,0.8)",
            }} />
            <span style={{ color: "#fbbf24", fontSize: 13, fontWeight: 600 }}>
              Now exploring: Ancient Greece
            </span>
          </div>

          <h1 style={{
            fontSize: "clamp(44px, 7vw, 76px)",
            fontWeight: 800, lineHeight: 1.05,
            color: "#fff", marginBottom: 24,
            letterSpacing: "-0.025em",
          }}>
            Learn history<br />
            <span style={{
              background: "linear-gradient(120deg, #fbbf24 0%, #fb923c 50%, #fbbf24 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              like a story.
            </span>
          </h1>

          <p style={{
            fontSize: 18, color: "rgba(255,255,255,0.42)",
            lineHeight: 1.8, maxWidth: 500, margin: "0 auto 44px",
          }}>
            Guided story paths. Real historical figures. No prior knowledge needed.
            History finally makes sense — episode by episode.
          </p>

          <div style={{
            display: "flex", gap: 12, justifyContent: "center",
            flexWrap: "wrap", marginBottom: 64,
          }}>
            <Link href="/story/ancient-greece-story" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "15px 30px", borderRadius: 14,
              background: "#fbbf24", color: "#000",
              fontWeight: 700, fontSize: 15, textDecoration: "none",
              boxShadow: "0 8px 32px rgba(251,191,36,0.3)",
            }}>
              Start with Ancient Greece →
            </Link>
            <Link href="/dynasty" style={{
              display: "inline-flex", alignItems: "center",
              padding: "15px 30px", borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.65)",
              fontWeight: 600, fontSize: 15, textDecoration: "none",
            }}>
              Explore Dynasty Tree
            </Link>
          </div>

          <div style={{
            display: "flex", justifyContent: "center",
            gap: 10, flexWrap: "wrap",
          }}>
            {[
              { number: "15+", label: "Historical Figures" },
              { number: "10", label: "Story Episodes" },
              { number: "800BC", label: "Years Covered" },
              { number: "1", label: "Empire" },
            ].map((stat) => (
              <div key={stat.label} style={{
                padding: "16px 28px", borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.025)",
                textAlign: "center", minWidth: 110,
              }}>
                <div style={{
                  fontSize: 24, fontWeight: 800,
                  color: "#fbbf24", marginBottom: 4,
                }}>
                  {stat.number}
                </div>
                <div style={{
                  fontSize: 12, color: "rgba(255,255,255,0.28)",
                  fontWeight: 500,
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── WHY CHRONO ── */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: "100px 24px",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{
              fontSize: 11, fontWeight: 700, color: "#fbbf24",
              textTransform: "uppercase", letterSpacing: "0.15em",
              marginBottom: 14,
            }}>
              Why Chrono
            </div>
            <h2 style={{
              fontSize: 38, fontWeight: 800, color: "#fff",
              letterSpacing: "-0.02em", marginBottom: 16,
            }}>
              History was never meant to be a textbook
            </h2>
            <p style={{
              fontSize: 16, color: "rgba(255,255,255,0.38)",
              lineHeight: 1.8, maxWidth: 580, margin: "0 auto",
            }}>
              Real history is full of drama, ambition, betrayal, and genius.
              Chrono brings it back to life — the way it actually felt to live through it.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 16,
          }}>
            {[
              {
                emoji: "🎬",
                title: "Episodes, not articles",
                desc: "Each story path is broken into bite-sized episodes. Start at the beginning, follow the narrative, finish with a complete picture.",
                color: "rgba(251,191,36,0.08)",
                border: "rgba(251,191,36,0.15)",
              },
              {
                emoji: "🧠",
                title: "Context that sticks",
                desc: "Every event is explained in terms of what came before and what came after. No more isolated facts floating in a void.",
                color: "rgba(129,140,248,0.08)",
                border: "rgba(129,140,248,0.15)",
              },
              {
                emoji: "🔗",
                title: "People, not just events",
                desc: "Behind every great moment in history is a person with a backstory. Meet the humans who shaped the world.",
                color: "rgba(74,222,128,0.08)",
                border: "rgba(74,222,128,0.15)",
              },
              {
                emoji: "✨",
                title: "Too complex? Simplify",
                desc: "Hit 'Explain Simply' on any episode and get a plain-English breakdown — no historical jargon required.",
                color: "rgba(251,100,36,0.08)",
                border: "rgba(251,100,36,0.15)",
              },
            ].map((item) => (
              <div key={item.title} style={{
                padding: "28px", borderRadius: 20,
                border: `1px solid ${item.border}`,
                background: item.color,
              }}>
                <div style={{ fontSize: 34, marginBottom: 16 }}>{item.emoji}</div>
                <h3 style={{
                  fontSize: 16, fontWeight: 700,
                  color: "#fff", marginBottom: 10,
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: 14, color: "rgba(255,255,255,0.45)",
                  lineHeight: 1.7,
                }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── TIMELINE PREVIEW ── */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: "100px 24px",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{
              fontSize: 11, fontWeight: 700, color: "#fbbf24",
              textTransform: "uppercase", letterSpacing: "0.15em",
              marginBottom: 14,
            }}>
              The Story So Far
            </div>
            <h2 style={{
              fontSize: 38, fontWeight: 800, color: "#fff",
              letterSpacing: "-0.02em",
            }}>
              800 years of history, 10 episodes
            </h2>
          </div>

          <div style={{ position: "relative", paddingLeft: 32 }}>
            <div style={{
              position: "absolute", left: 7, top: 0, bottom: 0, width: 1,
              background: "linear-gradient(to bottom, transparent, rgba(251,191,36,0.3) 20%, rgba(251,191,36,0.3) 80%, transparent)",
            }} />

            {[
              { year: "800 BC", title: "City-States Form", desc: "Athens, Sparta, Corinth — each a world unto itself.", color: "#fbbf24" },
              { year: "490 BC", title: "Persia Invades", desc: "The Battle of Marathon. 10,000 vs 30,000.", color: "#f87171" },
              { year: "479 BC", title: "Golden Age Begins", desc: "Pericles builds the Parthenon. Philosophy flourishes.", color: "#4ade80" },
              { year: "431 BC", title: "Greeks vs Greeks", desc: "Athens and Sparta tear each other apart.", color: "#fb923c" },
              { year: "336 BC", title: "Alexander Takes Over", desc: "A 20-year-old inherits the world.", color: "#fbbf24" },
              { year: "323 BC", title: "Empire Splits", desc: "Alexander dies. His generals divide the world.", color: "#818cf8" },
              { year: "30 BC", title: "Cleopatra Falls", desc: "The last Greek ruler dies. Rome takes everything.", color: "#f472b6" },
            ].map((item, i) => (
              <div key={i} style={{
                position: "relative",
                marginBottom: 16,
                paddingLeft: 24,
              }}>
                <div style={{
                  position: "absolute", left: -25, top: 18,
                  width: 10, height: 10, borderRadius: "50%",
                  background: item.color,
                  boxShadow: `0 0 8px ${item.color}`,
                  border: "2px solid #0a0a0f",
                }} />
                <div style={{
                  padding: "16px 20px", borderRadius: 14,
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: "#111118",
                  display: "flex", alignItems: "center", gap: 20,
                }}>
                  <div style={{
                    fontSize: 13, fontWeight: 700,
                    color: item.color, minWidth: 60, whiteSpace: "nowrap",
                  }}>
                    {item.year}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: 14, fontWeight: 700,
                      color: "#fff", marginBottom: 3,
                    }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.38)" }}>
                      {item.desc}
                    </div>
                  </div>
                  <Link href="/story/ancient-greece-story" style={{
                    fontSize: 12, color: "rgba(255,255,255,0.2)",
                    textDecoration: "none", whiteSpace: "nowrap",
                  }}>
                    Read →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── KEY FIGURES ── */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: "100px 24px",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ marginBottom: 40 }}>
            <div style={{
              fontSize: 11, fontWeight: 700, color: "#fbbf24",
              textTransform: "uppercase", letterSpacing: "0.15em",
              marginBottom: 12,
            }}>
              Key Figures
            </div>
            <div style={{
              display: "flex", alignItems: "flex-end",
              justifyContent: "space-between", flexWrap: "wrap", gap: 20,
            }}>
              <h2 style={{
                fontSize: 38, fontWeight: 800, color: "#fff",
                letterSpacing: "-0.02em",
              }}>
                Meet the people
              </h2>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {interests.map((interest) => (
                  <button
                    key={interest.id}
                    onClick={() => setActiveInterest(interest.id)}
                    style={{
                      padding: "8px 16px", borderRadius: 10,
                      fontSize: 13, fontWeight: 500, cursor: "pointer",
                      display: "flex", alignItems: "center", gap: 6,
                      border: activeInterest === interest.id
                        ? "1px solid rgba(251,191,36,0.4)"
                        : "1px solid rgba(255,255,255,0.08)",
                      background: activeInterest === interest.id
                        ? "rgba(251,191,36,0.12)" : "rgba(255,255,255,0.02)",
                      color: activeInterest === interest.id
                        ? "#fbbf24" : "rgba(255,255,255,0.45)",
                      transition: "all 0.2s",
                    }}
                  >
                    <span style={{ fontSize: 14 }}>{interest.emoji}</span>
                    {interest.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(195px, 1fr))",
            gap: 14,
          }}>
            {filteredFigures.map((figure) => (
              <Link
                key={figure.id}
                href={`/figure/${figure.id}`}
                style={{ textDecoration: "none" }}
              >
                <div style={{
                  padding: "22px", borderRadius: 18,
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: "#111118", cursor: "pointer",
                  height: "100%",
                }}>
                  <div style={{ fontSize: 34, marginBottom: 14 }}>{figure.avatar}</div>
                  <div style={{
                    fontSize: 14, fontWeight: 700,
                    color: "#fff", marginBottom: 5,
                  }}>
                    {figure.name}
                  </div>
                  <div style={{
                    fontSize: 12, color: "rgba(255,255,255,0.28)",
                    marginBottom: 14,
                  }}>
                    {figure.era}
                  </div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {figure.tags.slice(0, 2).map((tag) => (
                      <span key={tag} style={{
                        padding: "3px 10px", borderRadius: 6,
                        background: "rgba(255,255,255,0.05)",
                        color: "rgba(255,255,255,0.32)",
                        fontSize: 11, fontWeight: 500,
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredFigures.length === 0 && (
            <div style={{
              textAlign: "center", padding: "60px 0",
              color: "rgba(255,255,255,0.2)", fontSize: 14,
            }}>
              No figures found for this category
            </div>
          )}
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: "100px 24px",
      }}>
        <div style={{ maxWidth: 580, margin: "0 auto", textAlign: "center" }}>
          <div style={{
            padding: "60px 40px", borderRadius: 28,
            border: "1px solid rgba(251,191,36,0.12)",
            background: "linear-gradient(180deg, rgba(251,191,36,0.06) 0%, rgba(10,10,15,0) 100%)",
          }}>
            <div style={{ fontSize: 52, marginBottom: 22 }}>🏛️</div>
            <h2 style={{
              fontSize: 34, fontWeight: 800, color: "#fff",
              marginBottom: 14, letterSpacing: "-0.02em",
            }}>
              Ready to start?
            </h2>
            <p style={{
              fontSize: 16, color: "rgba(255,255,255,0.38)",
              lineHeight: 1.75, marginBottom: 36,
            }}>
              10 episodes. 15 figures. One complete story of Ancient Greece —
              from city-states to the death of Cleopatra.
            </p>
            <Link href="/story/ancient-greece-story" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "15px 36px", borderRadius: 14,
              background: "#fbbf24", color: "#000",
              fontWeight: 700, fontSize: 16, textDecoration: "none",
              boxShadow: "0 8px 32px rgba(251,191,36,0.3)",
            }}>
              Begin Episode 1 →
            </Link>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: "40px 24px",
      }}>
        <div style={{
          maxWidth: 900, margin: "0 auto",
          display: "flex", alignItems: "center",
          justifyContent: "space-between", flexWrap: "wrap", gap: 16,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 8,
              background: "linear-gradient(135deg, #fbbf24, #fb923c)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 800, fontSize: 13, color: "#000",
            }}>C</div>
            <span style={{
              fontWeight: 600, color: "rgba(255,255,255,0.45)", fontSize: 15,
            }}>
              Chrono
            </span>
          </div>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.2)" }}>
            History told like it always should have been.
          </p>
          <div style={{ display: "flex", gap: 24 }}>
            {[
              { label: "Story", href: "/story/ancient-greece-story" },
              { label: "Dynasty", href: "/dynasty" },
            ].map((link) => (
              <Link key={link.href} href={link.href} style={{
                fontSize: 13, color: "rgba(255,255,255,0.25)",
                textDecoration: "none",
              }}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}