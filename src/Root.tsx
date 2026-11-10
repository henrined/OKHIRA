import React from "react";
import { Composition } from "remotion";
import { ScwbAd, PLATEFORME } from "./scwb/ScwbAd";
import { getTotalDurationFrames, FPS } from "./scwb/durations";

export const RemotionRoot: React.FC = () => {
  const durationInFrames = getTotalDurationFrames(PLATEFORME);

  return (
    <>
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
    </>
  );
};
