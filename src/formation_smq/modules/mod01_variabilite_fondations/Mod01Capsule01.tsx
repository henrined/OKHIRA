import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";

import { Scene1_Probleme } from "./scenes/Scene1_Probleme";
import { Scene2_DemingEntonnoir } from "./scenes/Scene2_DemingEntonnoir";
import { Scene3_FormuleVariabilite } from "./scenes/Scene3_FormuleVariabilite";
import { Scene4_RappelActif } from "./scenes/Scene4_RappelActif";
import { Scene5_RegleDecision } from "./scenes/Scene5_RegleDecision";

import {
  getMod01Capsule01Timings,
  TRANSITION_FRAMES,
  PAUSE_FRAMES,
} from "./durations";
import { DECISIO_NEUTRALS } from "../../shared/theme/decisioTheme";
import { Mod01Capsule01Props } from "./types";

export const Mod01Capsule01: React.FC<Mod01Capsule01Props> = () => {
  const { scenes } = getMod01Capsule01Timings();

  // Calcul des durées de chaque séquence avec overlap de transition
  const sequenceDurations = scenes.map((sc, idx) => {
    const isLast = idx === scenes.length - 1;
    return sc.frames + (isLast ? PAUSE_FRAMES : PAUSE_FRAMES + TRANSITION_FRAMES);
  });

  return (
    <AbsoluteFill style={{ backgroundColor: DECISIO_NEUTRALS.white }}>
      <TransitionSeries>
        {/* Scène 1 : Le problème terrain du sur-réglage */}
        <TransitionSeries.Sequence
          name="S1 - Probleme"
          durationInFrames={sequenceDurations[0]}
        >
          <Scene1_Probleme />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />

        {/* Scène 2 : L'expérience de l'entonnoir de Deming */}
        <TransitionSeries.Sequence
          name="S2 - Deming Entonnoir"
          durationInFrames={sequenceDurations[1]}
        >
          <Scene2_DemingEntonnoir />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />

        {/* Scène 3 : Décomposition formelle mathématique */}
        <TransitionSeries.Sequence
          name="S3 - Formalisation"
          durationInFrames={sequenceDurations[2]}
        >
          <Scene3_FormuleVariabilite />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />

        {/* Scène 4 : Encart de rappel actif */}
        <TransitionSeries.Sequence
          name="S4 - Rappel Actif"
          durationInFrames={sequenceDurations[3]}
        >
          <Scene4_RappelActif />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />

        {/* Scène 5 : Matrice d'arbitrage et règle de décision */}
        <TransitionSeries.Sequence
          name="S5 - Regle de Decision"
          durationInFrames={sequenceDurations[4]}
        >
          <Scene5_RegleDecision />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
