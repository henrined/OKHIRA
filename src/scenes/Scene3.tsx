import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Img, staticFile } from "remotion";
import { Background } from "../components/Background";
import { Character } from "../components/Character";
import { KineticText } from "../components/KineticText";
import { getRythme } from "../durations";

interface SceneProps {
  voiceOffsetFrames?: number;
}

export const Scene3: React.FC<SceneProps> = ({ voiceOffsetFrames = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rythme = getRythme("s3");

  // Timestamps for the 3 falling loss cards from rythme_final.json
  // Card 1 on "le livreur part," (~1074ms)
  const card1Start = (1074 / 1000) * fps + voiceOffsetFrames;
  const card1Spr = spring({
    fps,
    frame: frame - card1Start,
    config: { damping: 13, stiffness: 100 },
  });

  // Card 2 on "le client ne décroche pas." (~2611ms)
  const card2Start = (2611 / 1000) * fps + voiceOffsetFrames;
  const card2Spr = spring({
    fps,
    frame: frame - card2Start,
    config: { damping: 13, stiffness: 100 },
  });

  // Card 3 on "La course est perdue," (~4522ms)
  const card3Start = (4522 / 1000) * fps + voiceOffsetFrames;
  const card3Spr = spring({
    fps,
    frame: frame - card3Start,
    config: { damping: 13, stiffness: 100 },
  });

  const card1Y = interpolate(card1Spr, [0, 1], [-120, 0]);
  const card2Y = interpolate(card2Spr, [0, 1], [-120, 0]);
  const card3Y = interpolate(card3Spr, [0, 1], [-120, 0]);

  const floatY = Math.sin((frame / fps) * 1.5) * 8;

  return (
    <AbsoluteFill>
      <Background type="white" />

      {/* Kinetic Voiceover Text */}
      <KineticText
        phrases={rythme.phrases}
        keywords={["livreur", "perdue", "payez"]}
        fontSize={54}
        keywordFontSize={64}
        offsetFrames={voiceOffsetFrames}
        position="top"
        style={{ top: 180 }}
      />

      {/* Delivery person character entering from right */}
      <Character
        imageSrc="perso_livreur_agace.png"
        side="right"
        width={560}
        bottom={40}
        startFrame={voiceOffsetFrames}
      />

      {/* 3 Loss Cards falling around him on left */}
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 540,
          width: 520,
          display: "flex",
          flexDirection: "column",
          gap: 28,
          zIndex: 15,
          transform: `translateY(${floatY}px)`,
        }}
      >
        {frame >= card1Start && (
          <div
            style={{
              transform: `translateY(${card1Y}px) rotate(-2deg) scale(${interpolate(
                card1Spr,
                [0, 1],
                [0.85, 1]
              )})`,
              opacity: interpolate(card1Spr, [0, 0.4, 1], [0, 0.9, 1]),
              filter:
                "drop-shadow(0 15px 30px rgba(11, 61, 62, 0.14)) drop-shadow(0 4px 10px rgba(0,0,0,0.04))",
            }}
          >
            <Img
              src={staticFile("assets_okhira/carte_perte_1.png")}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        )}

        {frame >= card2Start && (
          <div
            style={{
              transform: `translateY(${card2Y}px) rotate(1.5deg) scale(${interpolate(
                card2Spr,
                [0, 1],
                [0.85, 1]
              )})`,
              opacity: interpolate(card2Spr, [0, 0.4, 1], [0, 0.9, 1]),
              filter:
                "drop-shadow(0 15px 30px rgba(11, 61, 62, 0.14)) drop-shadow(0 4px 10px rgba(0,0,0,0.04))",
            }}
          >
            <Img
              src={staticFile("assets_okhira/carte_perte_2.png")}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        )}

        {frame >= card3Start && (
          <div
            style={{
              transform: `translateY(${card3Y}px) rotate(-1deg) scale(${interpolate(
                card3Spr,
                [0, 1],
                [0.85, 1]
              )})`,
              opacity: interpolate(card3Spr, [0, 0.4, 1], [0, 0.9, 1]),
              filter:
                "drop-shadow(0 18px 35px rgba(231, 76, 60, 0.22)) drop-shadow(0 4px 10px rgba(0,0,0,0.05))",
            }}
          >
            <Img
              src={staticFile("assets_okhira/carte_perte_3.png")}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
