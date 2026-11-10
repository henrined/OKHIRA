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
        capsuleTitle="Matrice Stabilité et Capabilité"
        normativeRef="ARBITRAGE INDUSTRIEL"
      />

      <div
        style={{
          position: "absolute",
          top: 190,
          left: 100,
          right: 100,
          display: "flex",
          flexDirection: "column",
          gap: 20,
          alignItems: "center",
          opacity: enter,
        }}
      >
        <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <div
            style={{
              fontFamily: DECISIO_FONTS.serif,
              fontSize: 50,
              fontWeight: 600,
              color: pair.C,
            }}
          >
            Les quatre destinées d'un procédé de fabrication
          </div>
          <div
            style={{
              fontFamily: DECISIO_FONTS.code,
              fontSize: 22,
              color: DECISIO_NEUTRALS.textSecondary,
            }}
          >
            Axe X : Maîtrise statistique &nbsp;|&nbsp; Axe Y : Aptitude au cahier des charges
          </div>
        </div>

        <FourQuadrantsGrid />

        <div
          style={{
            width: "100%",
            backgroundColor: DECISIO_NEUTRALS.codeBg,
            borderLeft: `5px solid ${DECISIO_NEUTRALS.axesLines}`,
            padding: "16px 24px",
            borderRadius: 6,
          }}
        >
          <div
            style={{
              fontFamily: DECISIO_FONTS.serif,
              fontSize: 30,
              fontStyle: "italic",
              color: DECISIO_NEUTRALS.textMain,
              lineHeight: 1.4,
            }}
          >
            <strong>Axiome Décisio :</strong> Un procédé peut être parfaitement stable
            tout en étant incapable de livrer une seule pièce conforme.
            Stabilité et capabilité sont deux propriétés indépendantes.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
