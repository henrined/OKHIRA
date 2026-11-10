import React from "react";
import {
  AbsoluteFill,
  Audio,
  staticFile,
} from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";

import { Scene1 } from "./scenes/Scene1";
import { Scene2 } from "./scenes/Scene2";
import { Scene5 } from "./scenes/Scene5";
import { Scene7 } from "./scenes/Scene7";
import { Scene8 } from "./scenes/Scene8";

import {
  getSceneTimings30s,
  DEFAULT_PLATFORM,
  TRANSITION_30S_FRAMES,
} from "./durations";
import { PlatformType } from "./types";
import { COLORS } from "./theme";

export const TRANSITION_FRAMES_30S = TRANSITION_30S_FRAMES; // 12 frames = 0.4s

interface ScwbAd30sProps {
  platform?: PlatformType;
}

export const ScwbAd30s: React.FC<ScwbAd30sProps> = ({
  platform = DEFAULT_PLATFORM,
}) => {
  const timings = getSceneTimings30s(platform);

  const sequenceDurations: number[] = [];

  for (let i = 0; i < timings.length; i++) {
    const vFrames = timings[i].voiceFrames;
    const pFrames = timings[i].pauseFrames;
    const isLast = i === timings.length - 1;

    // Sequence plays voice + pause, and adds transition overlap for non-last scenes
    const seqDur = vFrames + (isLast ? pFrames : pFrames + TRANSITION_FRAMES_30S);
    sequenceDurations.push(seqDur);
  }

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.white }}>
      {/* Visual Transitions between the 5 condensed Scenes (Hook -> Ghosting -> Solution -> Price -> CTA) */}
      <TransitionSeries>
        {/* Scène 1 : L'accroche */}
        <TransitionSeries.Sequence
          name="S1 - Accroche"
          durationInFrames={sequenceDurations[0]}
        >
          <Scene1 />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES_30S })}
        />

        {/* Scène 2 : Le silence */}
        <TransitionSeries.Sequence
          name="S2 - Le silence"
          durationInFrames={sequenceDurations[1]}
        >
          <Scene2 voiceOffsetFrames={0} />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES_30S })}
        />

        {/* Scène 5 : La solution */}
        <TransitionSeries.Sequence
          name="S5 - La solution"
          durationInFrames={sequenceDurations[2]}
        >
          <Scene5 voiceOffsetFrames={0} />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES_30S })}
        />

        {/* Scène 7 : Le prix */}
        <TransitionSeries.Sequence
          name="S7 - Le prix"
          durationInFrames={sequenceDurations[3]}
        >
          <Scene7 voiceOffsetFrames={0} />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES_30S })}
        />

        {/* Scène 8 : Appel à l'action */}
        <TransitionSeries.Sequence
          name="S8 - Appel à l'action"
          durationInFrames={sequenceDurations[4]}
        >
          <Scene8 platform={platform} voiceOffsetFrames={0} />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {/* Complete 30-second Studio-mixed Soundtrack with smooth 2s music fadeout */}
      <Audio src={staticFile("scwb/audio_mix_30s.mp3")} />
    </AbsoluteFill>
  );
};
