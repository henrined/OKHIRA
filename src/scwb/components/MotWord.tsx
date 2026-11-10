import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS, FONTS } from "../theme";

export interface MotWordProps {
  text: string;
  startMs: number;
  endMs: number;
  offsetFrames?: number;
  isKeyword?: boolean;
  keywordColor?: string;
  regularColor?: string;
  fontSize?: number;
  keywordFontSize?: number;
  style?: React.CSSProperties;
}

export const MotWord: React.FC<MotWordProps> = ({
  text,
  startMs,
  offsetFrames = 0,
  isKeyword = false,
  keywordColor,
  regularColor,
  fontSize = 44,
  keywordFontSize,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const wordStartFrame = (startMs / 1000) * fps + offsetFrames;

  if (frame < wordStartFrame) {
    return (
      <span
        style={{
          display: "inline-block",
          opacity: 0,
          marginRight: "0.26em",
          pointerEvents: "none",
        }}
      >
        {text}
      </span>
    );
  }

  const spr = spring({
    fps,
    frame: frame - wordStartFrame,
    config: { damping: 14, stiffness: 120 },
  });

  const blur = interpolate(spr, [0, 1], [12, 0], {
    extrapolateRight: "clamp",
  });
  const zoom = interpolate(spr, [0, 1], [0.9, 1], {
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(spr, [0, 1], [20, 0], {
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(spr, [0, 0.3, 1], [0, 0.7, 1], {
    extrapolateRight: "clamp",
  });

  const actualKeywordFontSize = keywordFontSize || Math.round(fontSize * 1.15);
  const color = isKeyword
    ? keywordColor || COLORS.gold
    : regularColor || COLORS.deepTeal;

  return (
    <span
      style={{
        display: "inline-block",
        fontFamily: FONTS.main,
        fontWeight: isKeyword ? 800 : 300,
        fontSize: isKeyword ? actualKeywordFontSize : fontSize,
        color,
        opacity,
        transform: `translateY(${translateY}px) scale(${zoom})`,
        filter: blur > 0.1 ? `blur(${blur}px)` : "none",
        marginRight: "0.26em",
        lineHeight: 1.25,
        textShadow: isKeyword
          ? `0 0 16px ${COLORS.gold}40, 0 2px 4px rgba(0,0,0,0.06)`
          : "none",
        ...style,
      }}
    >
      {text}
    </span>
  );
};
