// ─── Empire ───────────────────────────────────────────────
export interface Empire {
  id: string;
  name: string;
  period: string;
  region: string;
  description: string;
  color: string; // accent color for this empire's theme
}

// ─── Figure ───────────────────────────────────────────────
export interface Figure {
  id: string;
  empireId: string;
  name: string;
  title: string;
  era: string;           // e.g. "356 BC – 323 BC"
  born: number;          // e.g. -356 (negative = BC)
  died: number;          // e.g. -323
  significance: string;  // one-line tagline
  avatar: string;        // emoji or image path
  sections: {
    earlyLife: string;
    riseToPower: string;
    achievements: string;
    conflicts: string;
    legacy: string;
  };
  timelineEvents: TimelineEvent[];
  relationships: Relationship[];
  tags: string[];        // e.g. ["King", "Philosopher", "General"]
}

// ─── Timeline Event ────────────────────────────────────────
export interface TimelineEvent {
  year: number;
  label: string;
  description: string;
  type: "birth" | "death" | "conquest" | "political" | "cultural";
}

// ─── Relationship ──────────────────────────────────────────
export interface Relationship {
  figureId: string;
  type: "father" | "mother" | "successor" | "predecessor" | "rival" | "mentor" | "ally";
  label: string;
}

// ─── Story Path ────────────────────────────────────────────
export interface StoryPath {
  id: string;
  empireId: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  steps: StoryStep[];
}

export interface StoryStep {
  id: string;
  stepNumber: number;
  title: string;
  subtitle: string;
  content: string;        // main bite-sized content
  simplifiedContent: string; // for "Explain simply" AI feature
  figureId?: string;      // linked character if any
  imageEmoji: string;     // decorative emoji
  keyFact: string;        // highlighted callout
  nextStepTeaser: string; // "Coming up next..."
}

// ─── Dynasty Node (for graph) ──────────────────────────────
export interface DynastyNode {
  id: string;
  figureId: string;
  name: string;
  era: string;
  type: "ruler" | "philosopher" | "general" | "other";
  parentIds: string[];    // for drawing edges
}

export interface DynastyEdge {
  id: string;
  source: string;
  target: string;
  label: string;          // e.g. "Father of", "Succeeded by"
}