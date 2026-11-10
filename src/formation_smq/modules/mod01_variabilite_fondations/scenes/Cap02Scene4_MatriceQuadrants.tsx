import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { DecisioHeader } from "../../../shared/components/DecisioHeader";
import { FourQuadrantsGrid } from "../components/FourQuadrantsGrid";
import {
  DECISIO_FONTS,
  DECISIO_NEUTRALS,
  DECISIO_CHROMATIC_PAIRS,
} from "../../../shared/theme/decisioTheme";

export const Cap02Scene4_MatriceQuadrants: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pair = DECISIO_CHROMATIC_PAIRS.tomeX_spc;
  const enter = spring({ frame, fps, config: { damping: 15 } });

  return (
    <AbsoluteFill style={{ backgroundColor: DECISIO_NEUTRALS.white }}>
      <DecisioHeader
        moduleTitle="Module 01 • Fondations de la Variabilité"
        capsuleTitle="La Matrice Stabilité vs Capabilité"
        normativeRef="ARBITRAGE INDUSTRIEL"
      />

      <div
        style={{
          position: "absolute",
          top: 200,
          left: 100,
          right: 100,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          alignItems: "center",
          opacity: enter,
        }}
      >
        <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <div
            style={{
              fontFamily: DECISIO_FONTS.serif,
              fontSize: 32,
              fontWeight: 600,
              color: pair.C,
            }}
          >
            Les 4 destins d'un procédé de fabrication
          </div>
          <div
            style={{
              fontFamily: DECISIO_FONTS.code,
              fontSize: 14,
              color: DECISIO_NEUTRALS.textSecondary,
            }}
          >
            Axe X : Maîtrise statistique  |  Axe Y : Aptitude au cahier des charges
          </div>
        </div>

        {/* Grille 2x2 animée */}
        <FourQuadrantsGrid />

        <div
          style={{
            width: "100%",
            maxWidth: 1300,
            backgroundColor: DECISIO_NEUTRALS.codeBg,
            borderLeft: `4px solid ${DECISIO_NEUTRALS.axesLines}`,
            padding: "12px 20px",
            borderRadius: 4,
          }}
        >
          <div
            style={{
              fontFamily: DECISIO_FONTS.serif,
              fontSize: 16,
              fontStyle: "italic",
              color: DECISIO_NEUTRALS.textMain,
            }}
          >
            <strong>Axiome Décisio :</strong> « La stabilité statistique est une propriété intrinsèque du procédé. La capabilité est un contrat commercial. Un procédé peut être parfaitement stable tout en étant incapable de livrer le moindre produit conforme. »
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};