import { DECISIO_VIDEO_CONFIG } from "../../shared/constants";

export const FPS = DECISIO_VIDEO_CONFIG.fps;

// Durées des scènes pour la Capsule 1.1 (en secondes puis converties en frames)
// Capsule d'environ 2 minutes 45 secondes (4950 frames)
export const SCENE_DURATIONS_SEC = {
  s1_probleme: 25,          // 750 frames : La dérive inexpliquée sur la chaîne
  s2_deming_entonnoir: 40,   // 1200 frames : L'expérience des billes de Deming (sur-réglage)
  s3_formule_decomposition: 35, // 1050 frames : Sigma² total = Sigma² commun + Sigma² spécial
  s4_rappel_actif: 20,       // 600 frames : Interpellation "Pourquoi le réglage aggrave le procédé ?"
  s5_regle_decision: 30,     // 900 frames : Grille de décision opérationnelle
};

// Durées des scènes pour la Capsule 1.2 : Tolérances client (USL/LSL) vs Limites naturelles (UCL/LCL)
// Cible exacte : 4 minutes 00 secondes = 240 s = 7200 frames
export const SCENE_DURATIONS_CAP02_SEC = {
  s1_quiproquo: 30,             // 900 frames : Le quiproquo industriel Spécification vs Variation
  s2_anatomie_graphique: 48,    // 1440 frames : Voix du Client (USL/LSL) vs Voix du Procédé (UCL/LCL)
  s3_formalisation_iso: 45,     // 1350 frames : Formalisation ISO 22514-1 & équations mathématiques
  s4_matrice_quadrants: 48,     // 1440 frames : Matrice 2x2 Capabilité vs Stabilité statistique
  s5_rappel_actif: 25,          // 750 frames : Rappel actif : Pièce conforme = procédé sous contrôle ?
  s6_gouvernance: 40,           // 1200 frames : Matrice de gouvernance et règles opératoires
};

export const TRANSITION_FRAMES = 15; // 0.5s transition douce
export const PAUSE_FRAMES = 9;       // 0.3s pause inter-scène

export const getMod01Capsule01Timings = () => {
  const scenes = [
    {
      id: "s1",
      title: "Le piège de la chaîne : réagir au bruit",
      frames: SCENE_DURATIONS_SEC.s1_probleme * FPS,
    },
    {
      id: "s2",
      title: "L'expérience de l'entonnoir de Deming",
      frames: SCENE_DURATIONS_SEC.s2_deming_entonnoir * FPS,
    },
    {
      id: "s3",
      title: "Décomposition formelle de la variabilité",
      frames: SCENE_DURATIONS_SEC.s3_formule_decomposition * FPS,
    },
    {
      id: "s4",
      title: "Rappel actif : Pourquoi le sur-réglage détruit la capabilité ?",
      frames: SCENE_DURATIONS_SEC.s4_rappel_actif * FPS,
    },
    {
      id: "s5",
      title: "Règle de décision : Distinguer le signal du bruit",
      frames: SCENE_DURATIONS_SEC.s5_regle_decision * FPS,
    },
  ];

  let total = 0;
  scenes.forEach((s, idx) => {
    const isLast = idx === scenes.length - 1;
    total += s.frames + (isLast ? 0 : PAUSE_FRAMES + TRANSITION_FRAMES);
  });

  return { scenes, totalFrames: total };
};

export const getMod01Capsule02Timings = () => {
  const scenes = [
    {
      id: "cap02_s1",
      title: "Le quiproquo industriel : Spécifications vs Variation",
      frames: SCENE_DURATIONS_CAP02_SEC.s1_quiproquo * FPS,
    },
    {
      id: "cap02_s2",
      title: "Anatomie graphique : Voix du Client vs Voix du Procédé",
      frames: SCENE_DURATIONS_CAP02_SEC.s2_anatomie_graphique * FPS,
    },
    {
      id: "cap02_s3",
      title: "Formalisation ISO 22514-1 & Définitions formelles",
      frames: SCENE_DURATIONS_CAP02_SEC.s3_formalisation_iso * FPS,
    },
    {
      id: "cap02_s4",
      title: "La Matrice Stabilité vs Capabilité : Les 4 Quadrants",
      frames: SCENE_DURATIONS_CAP02_SEC.s4_matrice_quadrants * FPS,
    },
    {
      id: "cap02_s5",
      title: "Rappel actif : Pièce conforme = procédé maîtrisé ?",
      frames: SCENE_DURATIONS_CAP02_SEC.s5_rappel_actif * FPS,
    },
    {
      id: "cap02_s6",
      title: "Règle de gouvernance & Arbitrage opérationnel",
      frames: SCENE_DURATIONS_CAP02_SEC.s6_gouvernance * FPS,
    },
  ];

  let total = 0;
  scenes.forEach((s, idx) => {
    const isLast = idx === scenes.length - 1;
    total += s.frames + (isLast ? 0 : PAUSE_FRAMES + TRANSITION_FRAMES);
  });

  return { scenes, totalFrames: total };
};
