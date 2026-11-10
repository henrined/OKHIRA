import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "../theme";

interface BackgroundProps {
  type?: "white" | "tealLight" | "dark";
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export const Background: React.FC<BackgroundProps> = ({
  type = "white",
  children,
  style,
}) => {
  let backgroundStyle: React.CSSProperties = {
    backgroundColor: COLORS.white,
  };

  if (type === "tealLight") {
    backgroundStyle = {
      background: `radial-gradient(circle at 50% 45%, ${COLORS.lightTeal} 0%, #F5FAF9 45%, #FFFFFF 85%)`,
    };
  } else if (type === "dark") {
    backgroundStyle = {
      background: `radial-gradient(circle at 50% 40%, ${COLORS.deepTeal} 0%, ${COLORS.darkSurface} 50%, ${COLORS.darkBg} 100%)`,
    };
  }

  return (
    <AbsoluteFill
      style={{
        ...backgroundStyle,
        overflow: "hidden",
        ...style,
      }}
    >
      {/* Subtle organic light sheen for extra polish */}
      {type === "tealLight" && (
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -200,
            width: 700,
            height: 700,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(221,239,236,0.5) 0%, transparent 70%)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />
      )}
      {children}
    </AbsoluteFill>
  );
};
