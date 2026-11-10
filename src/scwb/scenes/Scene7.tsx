import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Img, staticFile } from "remotion";
import { Background } from "../components/Background";
import { KineticText } from "../components/KineticText";
import { getRythme } from "../durations";
import { COLORS } from "../theme";

interface SceneProps {
  voiceOffsetFrames?: number;
}

export const Scene7: React.FC<SceneProps> = ({ voiceOffsetFrames = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rythme = getRythme("s7");

  // Badge zoom + bounce entrance at start of voice
  const badgeStartFrame = 1 + voiceOffsetFrames;
  const badgeSpr = spring({
    fps,
    frame: frame - badgeStartFrame,
    config: { damping: 11, stiffness: 100 },
  });

  const badgeScale = interpolate(badgeSpr, [0, 0.7, 1], [0.3, 1.08, 1]);
  const badgeOpacity = interpolate(badgeSpr, [0, 0.3, 1], [0, 0.8, 1]);

  // -50% Sticker Pop effect 0.3s after badge
  const popStartFrame = 10 + voiceOffsetFrames;
  const popSpr = spring({
    fps,
    frame: frame - popStartFrame,
    config: { damping: 10, stiffness: 140 },
  });
  const popScale = interpolate(popSpr, [0, 0.5, 1], [1, 1.35, 1]);

  // Book 3D continuous rotation and golden float
  const bookRotY = Math.sin((frame / fps) * 1.5) * 6 - 8;
  const bookFloatY = Math.cos((frame / fps) * 1.5) * 10;

  return (
    <AbsoluteFill>
      {/* Dark gradient background exclusive to Scene 7 */}
      <Background type="dark" />

      {/* Kinetic Voiceover Text */}
      <KineticText
        phrases={rythme.phrases.slice(0, 2)}
        keywords={["Deux", "mille", "cinq", "cents"]}
        regularColor={COLORS.white}
        keywordColor={COLORS.gold}
        fontSize={56}
        keywordFontSize={66}
        offsetFrames={voiceOffsetFrames}
        position="top"
        style={{ top: 180 }}
      />

      {/* Golden radial aura behind the 3D book */}
      <div
        style={{
          position: "absolute",
          top: 600,
          left: 140,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.gold}35 0%, rgba(212,175,55,0.1) 45%, transparent 70%)`,
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />

      {/* 3D Book spinning slightly with gold reflection and shadow */}
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 560,
          zIndex: 15,
          perspective: 2000,
        }}
      >
        <div
          style={{
            width: 460,
            transform: `translateY(${bookFloatY}px) rotateY(${bookRotY}deg) rotateZ(-2deg)`,
            filter: `drop-shadow(0 35px 50px rgba(0,0,0,0.65)) drop-shadow(0 0 30px ${COLORS.gold}30)`,
          }}
        >
          <Img
            src={staticFile("scwb/produit/livre_3d.png")}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
      </div>

      {/* Price Badge C with zoom + bounce & -50% pop */}
      <div
        style={{
          position: "absolute",
          right: 40,
          top: 620,
          zIndex: 25,
          transform: `scale(${badgeScale})`,
          opacity: badgeOpacity,
          filter: "drop-shadow(0 25px 45px rgba(0,0,0,0.5))",
        }}
      >
        <div style={{ position: "relative", width: 540 }}>
          <Img
            src={staticFile("scwb/produit/badge_prix_C.png")}
            style={{ width: "100%", height: "auto", display: "block" }}
          />

          {frame >= popStartFrame && frame < popStartFrame + 25 && (
            <div
              style={{
                position: "absolute",
                top: "12%",
                right: "12%",
                width: 90,
                height: 90,
                borderRadius: "50%",
                border: `3px solid ${COLORS.gold}`,
                transform: `scale(${popScale * 1.2})`,
                opacity: interpolate(frame, [popStartFrame, popStartFrame + 25], [0.8, 0]),
                pointerEvents: "none",
              }}
            />
          )}
        </div>
      </div>

      {/* Caption for Phrase 3 ("Une seule course évitée rembourse votre guide.") */}
      {rythme.phrases[2] && (
        <KineticText
          phrases={[rythme.phrases[2]]}
          keywords={["course", "évitée", "course évitée", "rembourse"]}
          regularColor="rgba(255, 255, 255, 0.9)"
          keywordColor={COLORS.gold}
          fontSize={40}
          keywordFontSize={46}
          offsetFrames={voiceOffsetFrames}
          position="bottom"
          style={{ bottom: 250 }}
        />
      )}
    </AbsoluteFill>
  );
};
