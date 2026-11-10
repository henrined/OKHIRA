import React from "react";
import { Composition } from "remotion";
import { ScwbAd, PLATEFORME } from "./scwb/ScwbAd";
import { ScwbAd30s } from "./scwb/ScwbAd30s";
import {
  getTotalDurationFrames,
  getTotalDurationFrames30s,
  FPS,
} from "./scwb/durations";

export const RemotionRoot: React.FC = () => {
  const durationInFrames = getTotalDurationFrames(PLATEFORME);
  const durationInFrames30s = getTotalDurationFrames30s(PLATEFORME);

  return (
    <>
      {/* Version standard complète (~45 secondes) */}
      <Composition
        id="ScwbAd"
        component={ScwbAd}
        durationInFrames={durationInFrames}
        fps={FPS}
        width={1080}
        height={1920}
        defaultProps={{
          platform: PLATEFORME,
        }}
      />

      {/* Version courte Facebook / Stories / Reels (< 30 secondes) */}
      <Composition
        id="ScwbAd30s"
        component={ScwbAd30s}
        durationInFrames={durationInFrames30s}
        fps={FPS}
        width={1080}
        height={1920}
        defaultProps={{
          platform: PLATEFORME,
        }}
      />
    </>
  );
};
