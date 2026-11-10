import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";

import { Cap02Scene1_Probleme } from "./scenes/Cap02Scene1_Probleme";
import { Cap02Scene2_AnatomieGraphique } from "./scenes/Cap02Scene2_AnatomieGraphique";
import { Cap02Scene3_FormalisationISO } from "./scenes/Cap02Scene3_FormalisationISO";
import { Cap02Scene4_MatriceQuadrants } from "./scenes/Cap02Scene4_MatriceQuadrants";
import { Cap02Scene5_RappelActif } from "./scenes/Cap02Scene5_RappelActif";
import { Cap02Scene6_Gouvernance } from "./scenes/Cap02Scene6_Gouvernance";

import {
  getMod01Capsule02Timings,
  TRANSITION_FRAMES,
  PAUSE_FRAMES,
} from "./durations";
import { DECISIO_NEUTRALS } from "../../shared/theme/decisioTheme";
import { Mod01Capsule02Props } from "./types";

export const Mod01Capsule02: React.FC<Mod01Capsule02Props> = () => {
  const { scenes } = getMod01Capsule02Timings();

  // Durée de chaque séquence avec pause et recouvrement de transition
  const sequenceDurations = scenes.map((sc, idx) => {
    const isLast = idx === scenes.length - 1;
    return sc.frames + (isLast ? PAUSE_FRAMES : PAUSE_FRAMES + TRANSITION_FRAMES);
  });

  return (
    <AbsoluteFill style={{ backgroundColor: DECISIO_NEUTRALS.white }}>
      <TransitionSeries>
        {/* Scène 1 : Le quiproquo industriel Spécification vs Variation */}
        <TransitionSeries.Sequence
          name="S1 - Quiproquo Spécification"
          durationInFrames={sequenceDurations[0]}
        >
          <Cap02Scene1_Probleme />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />

        {/* Scène 2 : Anatomie Graphique : Voix Client vs Voix Procédé */}
        <TransitionSeries.Sequence
          name="S2 - Anatomie Graphique"
          durationInFrames={sequenceDurations[1]}
        >
          <Cap02Scene2_AnatomieGraphique />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />

        {/* Scène 3 : Formalisation mathématique ISO 22514-1 */}
        <TransitionSeries.Sequence
          name="S3 - Formalisation ISO 22514-1"
          durationInFrames={sequenceDurations[2]}
        >
          <Cap02Scene3_FormalisationISO />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />

        {/* Scène 4 : Matrice 2x2 Stabilité vs Capabilité */}
        <TransitionSeries.Sequence
          name="S4 - Matrice 4 Quadrants"
          durationInFrames={sequenceDurations[3]}
        >
          <Cap02Scene4_MatriceQuadrants />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />

        {/* Scène 5 : Rappel Actif du Praticien */}
        <TransitionSeries.Sequence
          name="S5 - Rappel Actif"
          durationInFrames={sequenceDurations[4]}
        >
          <Cap02Scene5_RappelActif />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />

        {/* Scène 6 : Matrice de Gouvernance & Règle d'Or */}
        <TransitionSeries.Sequence
          name="S6 - Gouvernance Metrologique"
          durationInFrames={sequenceDurations[5]}
        >
          <Cap02Scene6_Gouvernance />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};