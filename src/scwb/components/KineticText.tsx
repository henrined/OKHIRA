import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { PhraseTiming } from "../types";
import { MotWord } from "./MotWord";
import { COLORS } from "../theme";

interface KineticTextProps {
  phrases: PhraseTiming[];
  keywords?: string[];
  regularColor?: string;
  keywordColor?: string;
  fontSize?: number;
  keywordFontSize?: number;
  offsetFrames?: number;
  style?: React.CSSProperties;
  position?: "top" | "center" | "bottom";
  textAlign?: "center" | "left" | "right";
  cumulative?: boolean;
}

export const KineticText: React.FC<KineticTextProps> = ({
  phrases,
  keywords = [],
  regularColor = COLORS.deepTeal,
  keywordColor = COLORS.gold,
  fontSize = 50,
  keywordFontSize = 58,
  offsetFrames = 0,
  style,
  position = "top",
  textAlign = "center",
  cumulative = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Current voice time relative to audio start
  const currentVoiceMs = Math.max(0, ((frame - offsetFrames) / fps) * 1000);

  // Normalized keywords for matching
  const cleanStr = (s: string) =>
    s
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[.,;:!?«»'’"…\-]/g, "")
      .trim();

  const normalizedKeywords = keywords.map(cleanStr);

  const isWordKeyword = (wordText: string, phraseText: string): boolean => {
    const cleanWord = cleanStr(wordText);
    if (!cleanWord) return false;

    for (const kw of normalizedKeywords) {
      const kwWords = kw.split(/\s+/);
      if (kwWords.includes(cleanWord)) {
        if (cleanStr(phraseText).includes(kw)) {
          return true;
        }
      }
    }
    return false;
  };

  // Find active phrase(s)
  const activePhrases = cumulative
    ? phrases.filter((p) => currentVoiceMs >= p.startMs - 150)
    : phrases.filter((p, index) => {
        const nextPhrase = phrases[index + 1];
        const phraseEnd = nextPhrase ? nextPhrase.startMs : p.endMs + 1000;
        return currentVoiceMs >= p.startMs - 150 && currentVoiceMs < phraseEnd;
      });

  const currentPhrase = activePhrases[activePhrases.length - 1] || phrases[0];

  const phraseStartFrame = (currentPhrase.startMs / 1000) * fps + offsetFrames;
  const nextPhrase = phrases[phrases.indexOf(currentPhrase) + 1];
  const phraseEndFrame = nextPhrase
    ? (nextPhrase.startMs / 1000) * fps + offsetFrames
    : (currentPhrase.endMs / 1000) * fps + offsetFrames + 20;

  const phraseOpacity = interpolate(
    frame,
    [phraseStartFrame - 4, phraseStartFrame, phraseEndFrame - 4, phraseEndFrame],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const posStyle: React.CSSProperties =
    position === "top"
      ? { top: 160 }
      : position === "bottom"
      ? { bottom: 250 }
      : { top: "50%", transform: "translateY(-50%)" };

  return (
    <div
      style={{
        position: "absolute",
        left: 60,
        right: 60,
        zIndex: 40,
        display: "flex",
        flexDirection: "column",
        alignItems:
          textAlign === "center"
            ? "center"
            : textAlign === "right"
            ? "flex-end"
            : "flex-start",
        textAlign,
        ...posStyle,
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent:
            textAlign === "center"
              ? "center"
              : textAlign === "right"
              ? "flex-end"
              : "flex-start",
          alignItems: "baseline",
          maxWidth: "100%",
          opacity: phraseOpacity,
        }}
      >
        {currentPhrase.mots.map((mot, i) => (
          <MotWord
            key={`${currentPhrase.startMs}-${i}-${mot.text}`}
            text={mot.text}
            startMs={mot.startMs}
            endMs={mot.endMs}
            offsetFrames={offsetFrames}
            isKeyword={isWordKeyword(mot.text, currentPhrase.texte)}
            keywordColor={keywordColor}
            regularColor={regularColor}
            fontSize={fontSize}
            keywordFontSize={keywordFontSize}
          />
        ))}
      </div>
    </div>
  );
};
