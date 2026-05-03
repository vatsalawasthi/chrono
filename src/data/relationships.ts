import { DynastyNode, DynastyEdge } from "@/types";

export const dynastyNodes: DynastyNode[] = [
  { id: "n-philip", figureId: "philip-ii", name: "Philip II", era: "382–336 BC", type: "ruler", parentIds: [] },
  { id: "n-alexander", figureId: "alexander", name: "Alexander the Great", era: "356–323 BC", type: "ruler", parentIds: ["n-philip"] },
  { id: "n-ptolemy", figureId: "ptolemy", name: "Ptolemy I", era: "367–283 BC", type: "ruler", parentIds: ["n-alexander"] },
  { id: "n-cleopatra", figureId: "cleopatra", name: "Cleopatra VII", era: "69–30 BC", type: "ruler", parentIds: ["n-ptolemy"] },
  { id: "n-aristotle", figureId: "aristotle", name: "Aristotle", era: "384–322 BC", type: "philosopher", parentIds: ["n-philip"] },
  { id: "n-plato", figureId: "plato", name: "Plato", era: "428–348 BC", type: "philosopher", parentIds: [] },
  { id: "n-socrates", figureId: "socrates", name: "Socrates", era: "470–399 BC", type: "philosopher", parentIds: [] },
];

export const dynastyEdges: DynastyEdge[] = [
  { id: "e1", source: "n-philip", target: "n-alexander", label: "Father of" },
  { id: "e2", source: "n-alexander", target: "n-ptolemy", label: "General of" },
  { id: "e3", source: "n-ptolemy", target: "n-cleopatra", label: "Founded dynasty" },
  { id: "e4", source: "n-philip", target: "n-aristotle", label: "Hired as tutor" },
  { id: "e5", source: "n-plato", target: "n-aristotle", label: "Teacher of" },
  { id: "e6", source: "n-socrates", target: "n-plato", label: "Teacher of" },
];