import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { Background } from "../components/Background";
import { Character } from "../components/Character";
import { PhoneMock } from "../components/PhoneMock";
import { KineticText } from "../components/KineticText";
import { getRythme } from "../durations";

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rythme = getRythme("s1");

  // Phone 3D angled entrance
  const phoneSpr = spring({
    fps,
    frame: frame - 4,
    config: { damping: 14, stiffness: 90 },
  });

  const phoneX = interpolate(phoneSpr, [0, 1], [350, 0]);
  const phoneY = interpolate(phoneSpr, [0, 1], [200, 0]);
  const phoneScale = interpolate(phoneSpr, [0, 0.7, 1], [0.85, 1.03, 1]);

  return (
    <AbsoluteFill>
      <Background type="white" />

      {/* Kinetic Voiceover Text */}
      <KineticText
        phrases={rythme.phrases}
        keywords={["votre", "prix", "votre prix"]}
        fontSize={54}
        keywordFontSize={64}
        position="top"
        style={{ top: 180 }}
      />

      {/* African merchant surprised character entering from left */}
      <Character
        imageSrc="scwb/perso_commercant_surpris.png"
        side="left"
        width={580}
        bottom={40}
        startFrame={2}
      />

      {/* 3D Angled WhatsApp phone question on right */}
      <div
        style={{
          position: "absolute",
          right: -30,
          top: 600,
          zIndex: 15,
          transform: `translate(${phoneX}px, ${phoneY}px) scale(${phoneScale})`,
        }}
      >
        <PhoneMock
          imageSrc="scwb/assets/phone_chat_1_question.png"
          width={530}
          rotateX={8}
          rotateY={-18}
          rotateZ={4}
          floating
          floatingAmplitude={12}
        />
      </div>
    </AbsoluteFill>
  );
};
