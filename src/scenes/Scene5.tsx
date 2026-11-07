import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Img, staticFile } from "remotion";
import { Background } from "../components/Background";
import { KineticText } from "../components/KineticText";
import { Counter } from "../components/Counter";
import { PhoneMock } from "../components/PhoneMock";
import { getRythme } from "../durations";
import { COLORS } from "../theme";

interface SceneProps {
  voiceOffsetFrames?: number;
}

export const Scene5: React.FC<SceneProps> = ({ voiceOffsetFrames = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rythme = getRythme("s5");

  const currentMs = Math.max(0, ((frame - voiceOffsetFrames) / fps) * 1000);

  // Timestamps in frames
  const count8Frame = Math.round((2762 / 1000) * fps) + voiceOffsetFrames;
  const count25Frame = Math.round((4155 / 1000) * fps) + voiceOffsetFrames;

  const card1Frame = Math.round((6400 / 1000) * fps) + voiceOffsetFrames;
  const card2Frame = Math.round((8200 / 1000) * fps) + voiceOffsetFrames;
  const card3Frame = Math.round((10313 / 1000) * fps) + voiceOffsetFrames;

  const phone3DRotY = interpolate(frame, [0, 180], [-15, 12], {
    extrapolateRight: "clamp",
  });

  const card1Spr = spring({
    fps,
    frame: frame - card1Frame,
    config: { damping: 14, stiffness: 100 },
  });
  const card1Progress = interpolate(
    currentMs,
    [6400, 7800],
    [0, 100],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const card2Spr = spring({
    fps,
    frame: frame - card2Frame,
    config: { damping: 14, stiffness: 100 },
  });
  const card2Progress = interpolate(
    currentMs,
    [8200, 9600],
    [0, 100],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const card3Spr = spring({
    fps,
    frame: frame - card3Frame,
    config: { damping: 14, stiffness: 100 },
  });
  const card3Progress = interpolate(
    currentMs,
    [10313, 11500],
    [0, 100],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const showQuickReply = currentMs >= 4500;
  const replyInserted = currentMs >= 5300;

  return (
    <AbsoluteFill>
      <Background type="white" />

      {/* Kinetic Voiceover Text in caption position */}
      <KineticText
        phrases={rythme.phrases}
        keywords={["huit", "modules", "huit modules", "vingt-cinq", "réponses", "vingt-cinq réponses"]}
        fontSize={40}
        keywordFontSize={48}
        offsetFrames={voiceOffsetFrames}
        position="top"
        style={{ top: 160 }}
      />

      {/* PART 1: Phone Guide with 3D rotation & Animated Counters 8 & 25 */}
      {currentMs < 6400 && (
        <div
          style={{
            position: "absolute",
            top: 360,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 40,
            zIndex: 15,
          }}
        >
          {frame >= count8Frame && (
            <div
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                padding: "24px 32px",
                borderRadius: 24,
                boxShadow: "0 20px 40px rgba(11, 61, 62, 0.12)",
                border: "1px solid rgba(221, 239, 236, 0.9)",
              }}
            >
              <Counter
                target={8}
                startFrame={count8Frame}
                label="Modules terrain"
                fontSize={80}
                color={COLORS.gold}
              />
            </div>
          )}

          <div style={{ zIndex: 12 }}>
            <PhoneMock
              imageSrc={
                showQuickReply
                  ? replyInserted
                    ? "assets_okhira/phone_reponse_inseree.png"
                    : "assets_okhira/phone_raccourci_prix.png"
                  : "assets_okhira/phone_guide.png"
              }
              width={480}
              rotateX={8}
              rotateY={phone3DRotY}
              rotateZ={-2}
              floating
              floatingAmplitude={10}
            />
          </div>

          {frame >= count25Frame && (
            <div
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                padding: "24px 32px",
                borderRadius: 24,
                boxShadow: "0 20px 40px rgba(11, 61, 62, 0.12)",
                border: "1px solid rgba(221, 239, 236, 0.9)",
              }}
            >
              <Counter
                target={25}
                startFrame={count25Frame}
                label="Réponses prêtes"
                fontSize={80}
                color={COLORS.deepTeal}
              />
            </div>
          )}
        </div>
      )}

      {/* PART 2: The 3 Module Cards in Perspective with Progress Bars + Phone Insert */}
      {currentMs >= 6200 && (
        <div
          style={{
            position: "absolute",
            top: 400,
            left: 50,
            right: 50,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 15,
          }}
        >
          <div
            style={{
              width: 500,
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            {frame >= card1Frame && (
              <div
                style={{
                  transform: `translateY(${interpolate(card1Spr, [0, 1], [-60, 0])}px) scale(${interpolate(card1Spr, [0, 1], [0.88, 1])})`,
                  opacity: interpolate(card1Spr, [0, 0.4, 1], [0, 0.8, 1]),
                  filter: "drop-shadow(0 15px 30px rgba(11, 61, 62, 0.12))",
                }}
              >
                <Img
                  src={staticFile("assets_okhira/carte_module_1.png")}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
                <div
                  style={{
                    height: 6,
                    background: COLORS.lightTeal,
                    borderRadius: 3,
                    marginTop: 8,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${card1Progress}%`,
                      background: COLORS.whatsappGreen,
                      borderRadius: 3,
                    }}
                  />
                </div>
              </div>
            )}

            {frame >= card2Frame && (
              <div
                style={{
                  transform: `translateY(${interpolate(card2Spr, [0, 1], [-60, 0])}px) scale(${interpolate(card2Spr, [0, 1], [0.88, 1])})`,
                  opacity: interpolate(card2Spr, [0, 0.4, 1], [0, 0.8, 1]),
                  filter: "drop-shadow(0 15px 30px rgba(11, 61, 62, 0.12))",
                }}
              >
                <Img
                  src={staticFile("assets_okhira/carte_module_2.png")}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
                <div
                  style={{
                    height: 6,
                    background: COLORS.lightTeal,
                    borderRadius: 3,
                    marginTop: 8,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${card2Progress}%`,
                      background: COLORS.whatsappGreen,
                      borderRadius: 3,
                    }}
                  />
                </div>
              </div>
            )}

            {frame >= card3Frame && (
              <div
                style={{
                  transform: `translateY(${interpolate(card3Spr, [0, 1], [-60, 0])}px) scale(${interpolate(card3Spr, [0, 1], [0.88, 1])})`,
                  opacity: interpolate(card3Spr, [0, 0.4, 1], [0, 0.8, 1]),
                  filter: "drop-shadow(0 15px 30px rgba(11, 61, 62, 0.12))",
                }}
              >
                <Img
                  src={staticFile("assets_okhira/carte_module_3.png")}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
                <div
                  style={{
                    height: 6,
                    background: COLORS.lightTeal,
                    borderRadius: 3,
                    marginTop: 8,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${card3Progress}%`,
                      background: COLORS.whatsappGreen,
                      borderRadius: 3,
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          <div
            style={{
              position: "relative",
              width: 440,
              filter: "drop-shadow(0 20px 40px rgba(11, 61, 62, 0.15))",
            }}
          >
            <Img
              src={staticFile(
                currentMs >= 8500
                  ? "assets_okhira/phone_reponse_inseree.png"
                  : "assets_okhira/phone_raccourci_prix.png"
              )}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
