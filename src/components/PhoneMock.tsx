import React from "react";
import { useCurrentFrame, useVideoConfig, Img, staticFile } from "remotion";

interface PhoneMockProps {
  imageSrc: string;
  width?: number;
  height?: number;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
  floating?: boolean;
  floatingAmplitude?: number;
  floatingSpeed?: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const PhoneMock: React.FC<PhoneMockProps> = ({
  imageSrc,
  width = 680,
  rotateX = 6,
  rotateY = -12,
  rotateZ = -2,
  floating = true,
  floatingAmplitude = 12,
  floatingSpeed = 0.5,
  style,
  children,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Continuous subtle 12px vertical float
  const floatY = floating
    ? Math.sin(((frame / fps) * floatingSpeed * 2 + 0.2) * Math.PI) *
      floatingAmplitude
    : 0;

  // Gentle floating tilt (±1 deg)
  const floatRot = floating
    ? Math.cos(((frame / fps) * floatingSpeed * 2) * Math.PI) * 0.8
    : 0;

  return (
    <div
      style={{
        position: "relative",
        perspective: 2200,
        WebkitPerspective: 2200,
        display: "inline-block",
        ...style,
      }}
    >
      <div
        style={{
          position: "relative",
          width,
          transformStyle: "preserve-3d",
          transform: `perspective(2200px) translateY(${floatY}px) rotateX(${
            rotateX + floatRot * 0.5
          }deg) rotateY(${rotateY + floatRot}deg) rotateZ(${
            rotateZ + floatRot * 0.3
          }deg)`,
          filter:
            "drop-shadow(0 25px 50px rgba(11, 61, 62, 0.18)) drop-shadow(0 10px 20px rgba(0, 0, 0, 0.08))",
          transition: "transform 0.1s ease-out",
        }}
      >
        <Img
          src={staticFile(imageSrc)}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            pointerEvents: "none",
          }}
        />
        {children}
      </div>
    </div>
  );
};
