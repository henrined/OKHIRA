import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS, FONTS } from "../theme";

interface CounterProps {
  target: number;
  startFrame: number;
  durationInFrames?: number;
  prefix?: string;
  suffix?: string;
  label?: string;
  fontSize?: number;
  color?: string;
  labelColor?: string;
  style?: React.CSSProperties;
}

export const Counter: React.FC<CounterProps> = ({
  target,
  startFrame,
  prefix = "",
  suffix = "",
  label,
  fontSize = 90,
  color = COLORS.gold,
  labelColor = COLORS.deepTeal,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < startFrame) {
    return null;
  }

  const spr = spring({
    fps,
    frame: frame - startFrame,
    config: { damping: 16, stiffness: 100 },
  });

  const currentValue = Math.round(interpolate(spr, [0, 1], [0, target]));
  const scale = interpolate(spr, [0, 0.6, 1], [0.7, 1.1, 1]);
  const opacity = interpolate(spr, [0, 0.4, 1], [0, 0.9, 1]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${scale})`,
        opacity,
        fontFamily: FONTS.main,
        ...style,
      }}
    >
      <div
        style={{
          fontSize,
          fontWeight: 800,
          color,
          lineHeight: 1,
          letterSpacing: "-0.02em",
          textShadow: `0 4px 20px ${COLORS.gold}40`,
        }}
      >
        {prefix}
        {currentValue}
        {suffix}
      </div>
      {label && (
        <div
          style={{
            fontSize: Math.round(fontSize * 0.28),
            fontWeight: 700,
            color: labelColor,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginTop: 8,
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};
