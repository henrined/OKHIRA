import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Img, staticFile } from "remotion";
import { Background } from "../components/Background";
import { KineticText } from "../components/KineticText";
import { getRythme } from "../durations";
import { PlatformType } from "../types";
import { COLORS } from "../theme";

interface Scene8Props {
  platform?: PlatformType;
  voiceOffsetFrames?: number;
}

export const Scene8: React.FC<Scene8Props> = ({
  platform = "facebook",
  voiceOffsetFrames = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rythme = getRythme(`s8_${platform}`);

  // Logo pulse
  const logoPulse = Math.sin((frame / fps) * 2 * Math.PI) * 0.03 + 1;

  // Button entrance from bottom with spring bounce
  const btnSpr = spring({
    fps,
    frame: frame - 8 - voiceOffsetFrames,
    config: { damping: 12, stiffness: 90 },
  });

  const btnY = interpolate(btnSpr, [0, 1], [300, 0]);
  const btnScale = interpolate(btnSpr, [0, 0.7, 1], [0.8, 1.05, 1]);
  const btnOpacity = interpolate(btnSpr, [0, 0.3, 1], [0, 0.9, 1]);

  // Continuous bouncing arrow loop
  const arrowBounce = Math.sin((frame / fps) * 3 * Math.PI) * 14;

  return (
    <AbsoluteFill>
      <Background type="white" />

      {/* OKHIRA Logo gently pulsing at the top */}
      <div
        style={{
          position: "absolute",
          top: 260,
          left: "50%",
          transform: `translateX(-50%) scale(${logoPulse})`,
          width: 360,
          zIndex: 15,
          filter: "drop-shadow(0 10px 20px rgba(11, 61, 62, 0.08))",
        }}
      >
        <Img
          src={staticFile("scwb/produit/logo_okhira.png")}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>

      {/* Kinetic Voiceover Text matching selected platform's audio */}
      <KineticText
        phrases={rythme.phrases}
        keywords={["Téléchargez-le", "maintenant", "description", "bouton", "lien"]}
        fontSize={54}
        keywordFontSize={64}
        offsetFrames={voiceOffsetFrames}
        position="top"
        style={{ top: 480 }}
      />

      {/* Platform Purchase CTA Button arriving from bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 380,
          left: "50%",
          transform: `translateX(-50%) translateY(${btnY}px) scale(${btnScale})`,
          opacity: btnOpacity,
          width: 680,
          zIndex: 20,
          filter: "drop-shadow(0 25px 45px rgba(11, 61, 62, 0.22))",
        }}
      >
        <Img
          src={staticFile("scwb/produit/bouton_achat.png")}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>

      {/* Bouncing Pointer Arrow Loop */}
      {frame >= 15 + voiceOffsetFrames && (
        <div
          style={{
            position: "absolute",
            bottom: 580,
            left: "50%",
            transform: `translateX(-50%) translateY(${arrowBounce}px)`,
            zIndex: 25,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              background: COLORS.gold,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 8px 25px ${COLORS.gold}80`,
              color: COLORS.deepTeal,
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            ↓
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
