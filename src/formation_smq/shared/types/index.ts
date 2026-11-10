export type ChromaticPairKey =
  | "tomeX_spc"
  | "tomeI_math"
  | "tomeII_desc"
  | "tomeXI_fiabilite"
  | "tomeXII_decision";

export interface DecisioChromaticPair {
  C: string; // Accent sombre contrasté
  F: string; // Fond clair pastel
}

export type SceneStageType =
  | "PROBLEME_INDUSTRIEL"     // Cas réel terrain
  | "INTUITION_SANS_FORMULE"  // Compréhension sans équation
  | "FORMALISATION_MATH"      // Définition formelle ISO & mathématiques
  | "DEMONSTRATION_CALCUL"    // Dérivation & algorithme
  | "SIMULATION_GRAPHIQUE"    // Carte SPC, courbe de Gauss, Pareto
  | "INTERPRETATION_DECISION" // Portée sur le procédé
  | "RAPPEL_ACTIF"            // Question directe (« Pourquoi ? », etc.)
  | "SYNTHESE_ACTION";        // Clôture et règle de décision

export interface SceneMeta {
  id: string;
  stage: SceneStageType;
  title: string;
  durationInFrames: number;
  voiceKey?: string;
  voiceFile?: string;
}

export interface CapsuleDefinition {
  id: string;              // Ex: "CAP-01-01"
  moduleId: string;        // Ex: "mod01_variabilite_fondations"
  cycleNumber: number;     // 1 à 5
  moduleNumber: number;    // 1 à 15
  capsuleNumber: number;   // 1 à 3/4
  title: string;           // "Causes communes vs Causes spéciales"
  subtitle: string;        // "L'expérience des billes de Deming et le piège du sur-réglage"
  normativeRef?: string;   // "ISO 3534-2 / ISO 7870-1"
  chromaticPairKey: ChromaticPairKey;
  scenes: SceneMeta[];
}
