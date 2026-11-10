import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate, Img, staticFile } from "remotion";
import { COLORS } from "../theme";

interface CharacterProps {
  imageSrc: string;
  side: "left" | "right";
  width?: number;
  bottom?: number;
  startFrame?: number;
  style?: React.CSSProperties;
}

export const Character: React.FC<CharacterProps> = ({
  imageSrc,
  side,
  width = 640,
  bottom = 0,
  startFrame = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const spr = spring({
    fps,
    frame: frame - startFrame,
    config: { damping: 13, stiffness: 90 },
  });

  // Entrance from side edge with gentle bounce
  const initialOffset = side === "left" ? -width * 0.9 : width * 0.9;
  const translateX = interpolate(spr, [0, 1], [initialOffset, 0]);
  const scale = interpolate(spr, [0, 0.7, 1], [0.92, 1.02, 1]);
  const opacity = interpolate(spr, [0, 0.3, 1], [0, 0.9, 1]);

  return (
    <div
      style={{
        position: "absolute",
        [side]: -40,
        bottom,
        zIndex: 20,
        pointerEvents: "none",
        transform: `translateX(${translateX}px) scale(${scale})`,
        opacity,
        transformOrigin: side === "left" ? "bottom left" : "bottom right",
        ...style,
      }}
    >
      {/* Halo teal clair behind character */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: side === "left" ? "5%" : "25%",
          width: width * 0.9,
          height: width * 0.9,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.lightTeal} 0%, rgba(221, 239, 236, 0.6) 50%, rgba(221, 239, 236, 0) 75%)`,
          filter: "blur(40px)",
          zIndex: -1,
          transform: `scale(${interpolate(spr, [0, 1], [0.6, 1.1])})`,
        }}
      />

      <Img
        src={staticFile(imageSrc)}
        style={{
          width,
          height: "auto",
          display: "block",
          filter: "drop-shadow(0 25px 40px rgba(11, 61, 62, 0.22))",
        }}
      />
    </div>
  );
};
