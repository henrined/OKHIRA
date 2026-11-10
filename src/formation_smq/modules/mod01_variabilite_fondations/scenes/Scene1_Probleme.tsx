import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { DecisioHeader } from "../../../shared/components/DecisioHeader";
import {
  DECISIO_FONTS,
  DECISIO_NEUTRALS,
  DECISIO_CHROMATIC_PAIRS,
} from "../../../shared/theme/decisioTheme";

export const Scene1_Probleme: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const textTranslateY = interpolate(frame, [15, 35], [20, 0], {
    extrapolateRight: "clamp",
  });

  const pair = DECISIO_CHROMATIC_PAIRS.tomeX_spc;

  return (
    <AbsoluteFill style={{ backgroundColor: DECISIO_NEUTRALS.white }}>
      <DecisioHeader
        moduleTitle="Module 01 • Fondations de la Variabilité"
        capsuleTitle="Causes Communes et Causes Spéciales"
        normativeRef="ISO 3534-2 / §2.1"
      />

      <div
        style={{
          position: "absolute",
          top: 240,
          left: 120,
          right: 120,
          display: "flex",
          flexDirection: "column",
          gap: 32,
          opacity: titleOpacity,
          transform: `translateY(${textTranslateY}px)`,
        }}
      >
        <div
          style={{
            fontFamily: DECISIO_FONTS.serif,
            fontSize: 48,
            fontWeight: 600,
            color: pair.C,
            lineHeight: 1.2,
          }}
        >
          Le piège industriel du « sur-réglage »
        </div>

        <div
          style={{
            fontFamily: DECISIO_FONTS.serif,
            fontSize: 26,
            color: DECISIO_NEUTRALS.textMain,
            lineHeight: 1.6,
            maxWidth: 1400,
          }}
        >
          Chaque jour sur les lignes de production, des opérateurs consciencieux
          réajustent une machine dès qu’une pièce s’écarte légèrement de la cible.
          <br /><br />
          Le résultat paradoxal ? <strong>La dispersion globale explose</strong> et
          le taux de rebut double.
        </div>

        <div
          style={{
            backgroundColor: DECISIO_NEUTRALS.codeBg,
            borderLeft: `4px solid ${DECISIO_NEUTRALS.axesLines}`,
            padding: "20px 24px",
            borderRadius: 4,
            maxWidth: 1200,
            marginTop: 20,
          }}
        >
          <div
            style={{
              fontFamily: DECISIO_FONTS.code,
              fontSize: 16,
              color: DECISIO_NEUTRALS.textSecondary,
              marginBottom: 8,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Constat Doctrinal
          </div>
          <div
            style={{
              fontFamily: DECISIO_FONTS.serif,
              fontSize: 22,
              fontStyle: "italic",
              color: DECISIO_NEUTRALS.textMain,
            }}
          >
            « Confondre une cause commune avec une cause spéciale est la source la
            plus destructrice de coûts cachés dans l’industrie moderne. »
            <br />
            <span style={{ fontSize: 18, color: DECISIO_NEUTRALS.textSecondary }}>
              — W. Edwards Deming, <em>Out of the Crisis</em>
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
