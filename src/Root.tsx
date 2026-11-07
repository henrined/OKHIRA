import React from "react";
import { Composition } from "remotion";
import { OkhiraAd, PLATEFORME } from "./OkhiraAd";
import { getTotalDurationFrames, FPS } from "./durations";

export const RemotionRoot: React.FC = () => {
  const durationInFrames = getTotalDurationFrames(PLATEFORME);

  return (
    <>
      <Composition
        id="OkhiraAd"
        component={OkhiraAd}
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
