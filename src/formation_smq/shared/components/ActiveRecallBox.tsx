import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import {
  DECISIO_FONTS,
  DECISIO_NEUTRALS,
  DECISIO_CHROMATIC_PAIRS,
} from "../theme/decisioTheme";
import { ChromaticPairKey } from "../types";

interface ActiveRecallBoxProps {
  question: string;
  contextHint?: string;
  chromaticPairKey?: ChromaticPairKey;
}

export const ActiveRecallBox: React.FC<ActiveRecallBoxProps> = ({
  question,
  contextHint,
  chromaticPairKey = "tomeX_spc",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: { damping: 15, mass: 0.8 },
  });

  const opacity = spring({
    frame,
    fps,
    config: { damping: 20 },
  });

  const pair = DECISIO_CHROMATIC_PAIRS[chromaticPairKey];

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        opacity,
        backgroundColor: pair.F,
        borderLeft: `8px solid ${pair.C}`,
        borderRadius: 8,
        padding: "36px 44px",
        boxShadow: "0 12px 32px rgba(20, 32, 43, 0.10)",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        maxWidth: 1440,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <span
          style={{
            fontFamily: DECISIO_FONTS.code,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "0.10em",
            textTransform: "uppercase",
            color: pair.C,
            backgroundColor: DECISIO_NEUTRALS.white,
            padding: "6px 14px",
            borderRadius: 6,
            border: `1.5px solid ${pair.C}`,
          }}
        >
          Rappel Actif
        </span>
        {contextHint && (
          <span
            style={{
              fontFamily: DECISIO_FONTS.serif,
              fontStyle: "italic",
              fontSize: 26,
              color: DECISIO_NEUTRALS.textSecondary,
            }}
          >
            {contextHint}
          </span>
        )}
      </div>

      <div
        style={{
          fontFamily: DECISIO_FONTS.serif,
          fontSize: 42,
          fontWeight: 600,
          color: DECISIO_NEUTRALS.textMain,
          lineHeight: 1.4,
        }}
      >
        « {question} »
      </div>
    </div>
  );
};
