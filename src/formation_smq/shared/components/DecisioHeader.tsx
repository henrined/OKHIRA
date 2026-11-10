import React from "react";
import {
  DECISIO_FONTS,
  DECISIO_NEUTRALS,
  DECISIO_CHROMATIC_PAIRS,
} from "../theme/decisioTheme";
import { ChromaticPairKey } from "../types";

interface DecisioHeaderProps {
  collectionTitle?: string;
  moduleTitle: string;
  capsuleTitle: string;
  normativeRef?: string;
  chromaticPairKey?: ChromaticPairKey;
}

export const DecisioHeader: React.FC<DecisioHeaderProps> = ({
  collectionTitle = "DE LA DONNÉE À LA DÉCISION • ÉDITIONS DÉCISIO",
  moduleTitle,
  capsuleTitle,
  normativeRef,
  chromaticPairKey = "tomeX_spc",
}) => {
  const pair = DECISIO_CHROMATIC_PAIRS[chromaticPairKey];

  return (
    <div
      style={{
        position: "absolute",
        top: 60,
        left: 100,
        right: 100,
        display: "flex",
        flexDirection: "column",
        gap: 6,
        borderBottom: `2px solid ${pair.C}`,
        paddingBottom: 16,
      }}
    >
      {/* Ligne 1 : Collection & Référence normative */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: DECISIO_FONTS.serif,
          fontSize: 20,
          letterSpacing: "0.10em",
          textTransform: "uppercase",
          color: DECISIO_NEUTRALS.textSecondary,
        }}
      >
        <span>{collectionTitle}</span>
        {normativeRef && (
          <span
            style={{
              fontFamily: DECISIO_FONTS.code,
              fontSize: 20,
              backgroundColor: pair.F,
              color: pair.C,
              padding: "6px 14px",
              borderRadius: 4,
              fontWeight: 600,
              letterSpacing: "0.06em",
            }}
          >
            {normativeRef}
          </span>
        )}
      </div>

      {/* Ligne 2 : Module & Titre de la capsule */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
          <span
            style={{
              fontFamily: DECISIO_FONTS.serif,
              fontSize: 28,
              fontWeight: 600,
              color: pair.C,
              letterSpacing: "0.03em",
            }}
          >
            {moduleTitle}
          </span>
          <span
            style={{
              color: DECISIO_NEUTRALS.axesLines,
              fontSize: 28,
            }}
          >
            —
          </span>
          <span
            style={{
              fontFamily: DECISIO_FONTS.serif,
              fontSize: 32,
              fontWeight: 600,
              color: DECISIO_NEUTRALS.textMain,
            }}
          >
            {capsuleTitle}
          </span>
        </div>
      </div>
    </div>
  );
};
