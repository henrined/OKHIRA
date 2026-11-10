import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { Background } from "../components/Background";
import { Character } from "../components/Character";
import { PhoneMock } from "../components/PhoneMock";
import { KineticText } from "../components/KineticText";
import { getRythme } from "../durations";
import { COLORS, FONTS } from "../theme";

interface SceneProps {
  voiceOffsetFrames?: number;
}

export const Scene6: React.FC<SceneProps> = ({ voiceOffsetFrames = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rythme = getRythme("s6");

  // Pastille 1 spring entrance
  const pill1Spr = spring({
    fps,
    frame: frame - 6 - voiceOffsetFrames,
    config: { damping: 13, stiffness: 100 },
  });

  // Pastille 2 spring entrance
  const pill2Spr = spring({
    fps,
    frame: frame - 25 - voiceOffsetFrames,
    config: { damping: 13, stiffness: 100 },
  });

  return (
    <AbsoluteFill>
      <Background type="tealLight" />

      {/* Kinetic Voiceover Text */}
      <KineticText
        phrases={rythme.phrases}
        keywords={["Sans", "logiciel", "payant", "votre", "téléphone"]}
        fontSize={56}
        keywordFontSize={66}
        offsetFrames={voiceOffsetFrames}
        position="top"
        style={{ top: 180 }}
      />

      {/* Phone Guide angled in 3D behind character on the right */}
      <div
        style={{
          position: "absolute",
          right: 30,
          top: 600,
          zIndex: 10,
        }}
      >
        <PhoneMock
          imageSrc="scwb/assets/phone_guide.png"
          width={520}
          rotateX={6}
          rotateY={-16}
          rotateZ={2}
          floating
          floatingAmplitude={12}
        />
      </div>

      {/* African smiling female shop owner character entering from left */}
      <Character
        imageSrc="scwb/perso_commercante_sourire.png"
        side="left"
        width={580}
        bottom={40}
        startFrame={voiceOffsetFrames}
      />

      {/* Floating Badges / Pastilles */}
      <div
        style={{
          position: "absolute",
          right: 80,
          top: 500,
          display: "flex",
          flexDirection: "column",
          gap: 20,
          zIndex: 25,
        }}
      >
        {/* Pastille 1: Sans logiciel payant */}
        <div
          style={{
            transform: `translateX(${interpolate(pill1Spr, [0, 1], [60, 0])}px) scale(${interpolate(
              pill1Spr,
              [0, 1],
              [0.85, 1]
            )})`,
            opacity: interpolate(pill1Spr, [0, 0.4, 1], [0, 0.9, 1]),
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(12px)",
            padding: "16px 28px",
            borderRadius: 36,
            boxShadow: "0 15px 35px rgba(11, 61, 62, 0.15)",
            border: `2px solid ${COLORS.lightTeal}`,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span style={{ fontSize: 24, color: COLORS.whatsappGreen }}>✓</span>
          <span
            style={{
              fontFamily: FONTS.main,
              fontWeight: 800,
              fontSize: 22,
              color: COLORS.deepTeal,
              letterSpacing: "0.02em",
            }}
          >
            Sans logiciel payant
          </span>
        </div>

        {/* Pastille 2: Dès aujourd'hui */}
        {frame >= 25 + voiceOffsetFrames && (
          <div
            style={{
              transform: `translateX(${interpolate(pill2Spr, [0, 1], [60, 0])}px) scale(${interpolate(
                pill2Spr,
                [0, 1],
                [0.85, 1]
              )})`,
              opacity: interpolate(pill2Spr, [0, 0.4, 1], [0, 0.9, 1]),
              background: `linear-gradient(135deg, ${COLORS.gold}, #F3D979)`,
              padding: "14px 26px",
              borderRadius: 36,
              boxShadow: `0 15px 35px ${COLORS.gold}40`,
              display: "flex",
              alignItems: "center",
              gap: 10,
              alignSelf: "flex-end",
            }}
          >
            <span style={{ fontSize: 20 }}>⚡</span>
            <span
              style={{
                fontFamily: FONTS.main,
                fontWeight: 800,
                fontSize: 20,
                color: COLORS.deepTeal,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              Dès aujourd'hui
            </span>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
