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
        borderLeft: `6px solid ${pair.C}`,
        borderRadius: 6,
        padding: "24px 32px",
        boxShadow: "0 8px 24px rgba(20, 32, 43, 0.08)",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span
          style={{
            fontFamily: DECISIO_FONTS.code,
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: pair.C,
            backgroundColor: DECISIO_NEUTRALS.white,
            padding: "4px 10px",
            borderRadius: 4,
            border: `1px solid ${pair.C}`,
          }}
        >
          Rappel Actif
        </span>
        {contextHint && (
          <span
            style={{
              fontFamily: DECISIO_FONTS.serif,
              fontStyle: "italic",
              fontSize: 15,
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
          fontSize: 28,
          fontWeight: 600,
          color: DECISIO_NEUTRALS.textMain,
          lineHeight: 1.35,
        }}
      >
        « {question} »
      </div>
    </div>
  );
};
