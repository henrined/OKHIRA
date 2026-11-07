import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Img, staticFile } from "remotion";
import { Background } from "../components/Background";
import { KineticText } from "../components/KineticText";
import { getRythme } from "../durations";
import { COLORS } from "../theme";

interface SceneProps {
  voiceOffsetFrames?: number;
}

export const Scene2: React.FC<SceneProps> = ({ voiceOffsetFrames = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rythme = getRythme("s2");

  const currentMs = Math.max(0, ((frame - voiceOffsetFrames) / fps) * 1000);

  // Phone smooth centering entrance from Scene 1's position
  const centerSpr = spring({
    fps,
    frame,
    config: { damping: 14, stiffness: 80 },
  });

  const phoneScale = interpolate(centerSpr, [0, 1], [0.92, 1.05]);
  const phoneRotateY = interpolate(centerSpr, [0, 1], [-18, -4]);

  // Subtle floating motion (12px continuous)
  const floatY = Math.sin(((frame / fps) * 1.2) * Math.PI) * 12;

  // Stage 1: phone_chat_1_question
  // Stage 2: phone_chat_2_reponse (at "sans un mot" -> ~2228ms)
  // Stage 3: phone_chat_silence (at "Ils lisent." -> ~2931ms)
  const state2Crossfade = interpolate(
    currentMs,
    [2100, 2350],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const state3Crossfade = interpolate(
    currentMs,
    [2850, 3100],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Blue checkmark pop/glow on "lisent" (~3200ms)
  const checkmarkGlow = interpolate(
    currentMs,
    [3100, 3350, 4000],
    [0, 1, 0.4],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill>
      <Background type="tealLight" />

      {/* Kinetic Voiceover Text */}
      <KineticText
        phrases={rythme.phrases}
        keywords={["disparaissent", "lisent", "plus"]}
        fontSize={56}
        keywordFontSize={66}
        offsetFrames={voiceOffsetFrames}
        position="top"
        style={{ top: 180 }}
      />

      {/* Centered Phone with crossfade between 3 chat states */}
      <div
        style={{
          position: "absolute",
          top: "44%",
          left: "50%",
          width: 580,
          transform: `translate(-50%, -50%) translateY(${floatY}px) perspective(2200px) rotateX(6deg) rotateY(${phoneRotateY}deg) scale(${phoneScale})`,
          filter:
            "drop-shadow(0 30px 60px rgba(11, 61, 62, 0.22)) drop-shadow(0 8px 18px rgba(0,0,0,0.06))",
          zIndex: 15,
        }}
      >
        <div style={{ position: "relative", width: "100%" }}>
          <Img
            src={staticFile("assets_okhira/phone_chat_1_question.png")}
            style={{ width: "100%", height: "auto", display: "block" }}
          />

          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: state2Crossfade,
            }}
          >
            <Img
              src={staticFile("assets_okhira/phone_chat_2_reponse.png")}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>

          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: state3Crossfade,
            }}
          >
            <Img
              src={staticFile("assets_okhira/phone_chat_silence.png")}
              style={{ width: "100%", height: "auto", display: "block" }}
            />

            {checkmarkGlow > 0.05 && (
              <div
                style={{
                  position: "absolute",
                  top: "48%",
                  right: "18%",
                  width: 80,
                  height: 40,
                  borderRadius: 20,
                  background: `radial-gradient(circle, #34B7F1 0%, transparent 70%)`,
                  filter: "blur(12px)",
                  opacity: checkmarkGlow * 0.7,
                  pointerEvents: "none",
                }}
              />
            )}
          </div>
        </div>

        {currentMs >= 3000 && (
          <div
            style={{
              position: "absolute",
              bottom: 80,
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(11, 61, 62, 0.92)",
              backdropFilter: "blur(10px)",
              padding: "10px 24px",
              borderRadius: 30,
              display: "flex",
              alignItems: "center",
              gap: 10,
              boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
              opacity: interpolate(currentMs, [3000, 3200], [0, 1]),
            }}
          >
            <span style={{ color: "#34B7F1", fontSize: 20, fontWeight: 800 }}>✓✓</span>
            <span style={{ color: COLORS.white, fontSize: 20, fontWeight: 600 }}>Message lu · Aucune réponse</span>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
