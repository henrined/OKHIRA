# Formation Vidéo Remotion — SMQ & Pilotage Statistique
## Architecture Modulaire dans l'Esprit Doctrinal des Éditions Décisio

Ce dossier contient l'intégralité du cursus audiovisuel d'ingénierie qualité et de pilotage statistique des procédés.

Inspiré de l'architecture éprouvée de `@../scwb` dans `mon-motion`, ce projet applique rigoureusement la **Charte Éditoriale et Typographique des Éditions Décisio (v2.1)** et les normes internationales (**ISO 3534**, **ISO 80000-2**, **ISO 7870**, **ISO 22514**, **ISO 13053**).

---

## 1. Arborescence du Projet

```text
src/formation_smq/
├── shared/                             # Socle commun Décisio Design System
│   ├── theme/decisioTheme.ts           # Palette neutre, polices Source Serif 4 / Source Code Pro, couples (C, F)
│   ├── types/index.ts                  # Typage TypeScript strict des scènes, métadonnées et props
│   ├── constants.ts                    # Résolution 1920x1080, 30 FPS, durées standards de pauses
│   ├── components/                     # Composants graphiques vectoriels partagés
│   │   ├── DecisioHeader.tsx           # Cartouche normé de la leçon (Tome, Titre, Filet C)
│   │   ├── ActiveRecallBox.tsx         # Encart rappel actif (« Pourquoi ? », etc.)
│   │   ├── PedagogicalBox.tsx          # Encart Définition / Attention / Propriété
│   │   ├── GaussDistribution.tsx       # Tracé SVG animé de la densité normale et limites LSL/USL
│   │   ├── ShewhartChart.tsx           # Tracé SVG animé d'une carte de contrôle (UCL/LCL, points)
│   │   ├── ParetoChart.tsx             # Diagramme 80/20 avec courbe des pourcentages cumulés
│   │   └── DecisioOutro.tsx            # Clôture décisionnelle et bilan de maîtrise
│   └── templates/
│       └── CapsuleTemplate.tsx         # Template générique orchestrant TransitionSeries & Audio
│
├── modules/                            # 15 Modules indépendants et modulaires
│   ├── mod01_variabilite_fondations/   # Causes communes/spéciales, Deming, sur-réglage
│   ├── mod02_metrologie_msa/           # Gage R&R, ANOVA de mesure, répétabilité/reproductibilité
│   ├── mod03_cartes_mesures/           # Cartes Xbar-R, Xbar-s, I-MR, estimateurs sans biais
│   ├── mod04_cartes_attributs/         # Cartes p, np, c, u (lois binomiale et de Poisson)
│   ├── mod05_regles_detection_nelson/  # Les 8 tests de Nelson, règles Western Electric, ARL
│   ├── mod06_capabilites_cp_cpk/       # Dispersion vs Centrage, Pp/Ppk, calcul des ppm
│   ├── mod07_non_normalite/            # Tests d'adéquation, Box-Cox, Johnson, percentiles
│   ├── mod08_qualite_taguchi/          # Perte quadratique L(y), tolérancement économique
│   ├── mod09_six_sigma_dpmo/           # Métriques DPU, DPMO, Z-score, shift de 1.5 sigma
│   ├── mod10_dmaic_analyse_statistique/# Pareto dynamique, ANOVA, tests t, régression
│   ├── mod11_plans_experiences_doe/    # Plans factoriels 2^k, surfaces de réponse
│   ├── mod12_amdec_processus/          # IPR rigoureux, criticité, plan d'actions
│   ├── mod13_fiabilite_weibull/        # Taux de défaillance, loi de Weibull (beta, eta)
│   ├── mod14_iso9001_donnees/          # Exigence ISO 9001 §9.1.3, audit analytique
│   └── mod15_tableaux_bord_decision/   # KPI non manipulables, revue de direction
│
├── scripts/                            # Outillage d'automatisation
│   ├── generate_voix.py                # Synthèse vocale TTS haute fidélité
│   ├── build_audio.py                 # Mixage, compression, égalisation et normalisation LUFS
│   └── render_capsule.sh               # Commande de rendu Remotion avec options mémoire basse
│
└── RootFormationSmq.tsx                # Déclaration et enregistrement des Compositions Remotion
```

Et dans `public/formation_smq/` :
```text
public/formation_smq/
├── shared/
│   ├── musique/                        # Tapis sonores discrets conformes au style sobre Décisio
│   ├── sfx/                            # Marqueurs sonores (bip de détection alerte, transition)
│   └── fonts/                          # Fallbacks polices
└── modules/
    ├── mod01_variabilite_fondations/
    │   ├── voix/                       # Fichiers audio découpés par scène (s1.mp3, s2.mp3, etc.)
    │   └── assets/                     # Schémas et données locales
    └── ... (mod02 à mod15)
```

---

## 2. Structure Interne de Chaque Module

Chaque dossier `modules/modXX_nom/` reproduit le patron architectural standardisé :
* `scenes/` : Contient les composants de chaque scène unitaire (`Scene1_Probleme.tsx`, `Scene2_Intuition.tsx`, `Scene3_Formalisation.tsx`, etc.).
* `components/` : Composants spécifiques au module (ex: schéma de l'entonnoir de Deming pour le module 1).
* `durations.ts` : Calcule les frames exactes selon les fichiers audio et les temps de pause.
* `types.ts` : Interfaces de typage locales pour les données du module.
* `ModXXComposition.tsx` : Orchestrateur Remotion assemblant la séquence complète.
