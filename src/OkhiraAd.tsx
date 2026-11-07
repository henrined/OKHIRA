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
import { Scene3 } from "./scenes/Scene3";
import { Scene4 } from "./scenes/Scene4";
import { Scene5 } from "./scenes/Scene5";
import { Scene6 } from "./scenes/Scene6";
import { Scene7 } from "./scenes/Scene7";
import { Scene8 } from "./scenes/Scene8";

import {
  getSceneTimings,
  DEFAULT_PLATFORM,
  PAUSE_SEC,
  FPS,
} from "./durations";
import { PlatformType } from "./types";
import { COLORS } from "./theme";

// Platform variable (can be configured in code or via Composition props)
export const PLATEFORME: PlatformType = DEFAULT_PLATFORM;

// 15 frames = 0.5s transition for smooth, visible, cinematic transitions
export const TRANSITION_FRAMES = 15;
const PAUSE_FRAMES = Math.round(PAUSE_SEC * FPS); // 9 frames = 0.3s

interface OkhiraAdProps {
  platform?: PlatformType;
}

export const OkhiraAd: React.FC<OkhiraAdProps> = ({
  platform = PLATEFORME,
}) => {
  const timings = getSceneTimings(platform);

  // Compute audio start frames:
  // Each scene n starts at: Fin Voix (n-1) + 0.3s pause
  const audioStarts: number[] = [];
  const sequenceDurations: number[] = [];

  let currentStart = 0;
  for (let i = 0; i < timings.length; i++) {
    const vFrames = timings[i].voiceFrames;
    audioStarts.push(currentStart);

    const isLast = i === timings.length - 1;
    // Each sequence plays its voice, then has 0.3s pause and 0.5s transition overlap
    const seqDur = vFrames + (isLast ? PAUSE_FRAMES : PAUSE_FRAMES + TRANSITION_FRAMES);
    sequenceDurations.push(seqDur);

    currentStart += vFrames + PAUSE_FRAMES;
  }

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.white }}>
      {/* Visual Transitions between the 8 Scenes using GPU-accelerated CSS presentations */}
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
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
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
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />

        {/* Scène 3 : La course perdue */}
        <TransitionSeries.Sequence
          name="S3 - La course perdue"
          durationInFrames={sequenceDurations[2]}
        >
          <Scene3 voiceOffsetFrames={0} />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />

        {/* Scène 4 : Le constat */}
        <TransitionSeries.Sequence
          name="S4 - Le constat"
          durationInFrames={sequenceDurations[3]}
        >
          <Scene4 voiceOffsetFrames={0} />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-left" })}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />

        {/* Scène 5 : La solution */}
        <TransitionSeries.Sequence
          name="S5 - La solution"
          durationInFrames={sequenceDurations[4]}
        >
          <Scene5 voiceOffsetFrames={0} />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />

        {/* Scène 6 : La preuve */}
        <TransitionSeries.Sequence
          name="S6 - La preuve"
          durationInFrames={sequenceDurations[5]}
        >
          <Scene6 voiceOffsetFrames={0} />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />

        {/* Scène 7 : Le prix */}
        <TransitionSeries.Sequence
          name="S7 - Le prix"
          durationInFrames={sequenceDurations[6]}
        >
          <Scene7 voiceOffsetFrames={0} />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />

        {/* Scène 8 : Appel à l'action */}
        <TransitionSeries.Sequence
          name="S8 - Appel à l'action"
          durationInFrames={sequenceDurations[7]}
        >
          <Scene8 platform={platform} voiceOffsetFrames={0} />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {/* Complete Studio-mixed Soundtrack (All 8 scene voiceovers + background music at 0.12) */}
      <Audio src={staticFile("audio_mix.mp3")} />
    </AbsoluteFill>
  );
};
