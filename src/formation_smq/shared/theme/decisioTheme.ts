import { loadFont as loadSourceSerif4 } from "@remotion/google-fonts/SourceSerif4";
import { loadFont as loadSourceCodePro } from "@remotion/google-fonts/SourceCodePro";

// Polices obligatoires Décisio (Doctrine TY-01, TY-02)
const sourceSerif = loadSourceSerif4("normal", {
  weights: ["400", "600"],
  subsets: ["latin", "latin-ext"],
});

const sourceCode = loadSourceCodePro("normal", {
  weights: ["400", "600"],
  subsets: ["latin", "latin-ext"],
});

export const DECISIO_FONTS = {
  serif: sourceSerif.fontFamily,      // Texte courant, titres, narration
  code: sourceCode.fontFamily,        // Blocs de code, algorithmes, valeurs
  math: "STIX Two Math, 'Source Serif 4', serif", // Formules et symboles mathématiques
};

// Palette neutre universelle commune Décisio (Charte §1.3)
export const DECISIO_NEUTRALS = {
  textMain: "#14202B",      // Texte principal, titres niveau 3
  textSecondary: "#5B6670", // Textes secondaires, sous-titres, étiquettes
  axesLines: "#9AA5AF",     // Axes de figures, repères
  structural: "#D5DADF",    // Filets structurels, bordures discrètes
  codeBg: "#F4F5F7",        // Fond des blocs de code et encarts d'attention
  white: "#FFFFFF",         // Fond des compositions
};

// Couples chromatiques paramétriques (C, F) homologués (Charte §1.2 & Annexe A)
export const DECISIO_CHROMATIC_PAIRS = {
  // Tome X : Maîtrise statistique des procédés et qualité (Thème standard du cursus)
  tomeX_spc: {
    C: "#0F6108", // Accent sombre (vert ingénierie qualité)
    F: "#E7EFE6", // Fond pastel
  },
  // Tome I : Fondations mathématiques et Python
  tomeI_math: {
    C: "#0E6CAF", // Bleu d'analyse
    F: "#E7F0F7",
  },
  // Tome II : Statistique descriptive & Criticité
  tomeII_desc: {
    C: "#AA0E1B", // Rouge profond
    F: "#F6E7E8",
  },
  // Tome XI : Risques, Fiabilité & Weibull
  tomeXI_fiabilite: {
    C: "#8337EF", // Violet de sûreté de fonctionnement
    F: "#F3EBFD",
  },
  // Tome XII : Data QHSE & Décision
  tomeXII_decision: {
    C: "#5C5507", // Ocre décisionnel
    F: "#EFEEE6",
  },
};

// Marges et zones de sécurité vidéo (Format 16:9 - 1920x1080)
export const DECISIO_SAFE_ZONES = {
  top: 90,
  bottom: 90,
  left: 120,
  right: 120,
  bannerHeight: 110,
  footerHeight: 80,
};
