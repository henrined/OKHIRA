import React from "react";
import { Composition } from "remotion";
import { Mod01Capsule01 } from "./modules/mod01_variabilite_fondations/Mod01Capsule01";
import { Mod01Capsule02 } from "./modules/mod01_variabilite_fondations/Mod01Capsule02";
import {
  getMod01Capsule01Timings,
  getMod01Capsule02Timings,
  FPS,
} from "./modules/mod01_variabilite_fondations/durations";
import { DECISIO_VIDEO_CONFIG } from "./shared/constants";

export const RootFormationSmq: React.FC = () => {
  const { totalFrames: mod01Cap01Frames } = getMod01Capsule01Timings();
  const { totalFrames: mod01Cap02Frames } = getMod01Capsule02Timings();

  return (
    <>
      {/* Module 01 - Capsule 1.1 : Causes communes vs Causes spéciales */}
      <Composition
        id="SMQ-Mod01-Cap01-Variabilite"
        component={Mod01Capsule01}
        durationInFrames={mod01Cap01Frames}
        fps={FPS}
        width={DECISIO_VIDEO_CONFIG.width}
        height={DECISIO_VIDEO_CONFIG.height}
        defaultProps={{
          platform: "lms",
          chromaticPairKey: "tomeX_spc",
        }}
      />

      {/* Module 01 - Capsule 1.2 : Tolérances client vs Limites naturelles */}
      <Composition
        id="SMQ-Mod01-Cap02-Tolerances"
        component={Mod01Capsule02}
        durationInFrames={mod01Cap02Frames}
        fps={FPS}
        width={DECISIO_VIDEO_CONFIG.width}
        height={DECISIO_VIDEO_CONFIG.height}
        defaultProps={{
          platform: "lms",
          chromaticPairKey: "tomeX_spc",
        }}
      />
    </>
  );
};
