import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { DecisioHeader } from "../../../shared/components/DecisioHeader";
import { DistributionVsToleranceChart } from "../components/DistributionVsToleranceChart";
import {
  DECISIO_FONTS,
  DECISIO_NEUTRALS,
  DECISIO_CHROMATIC_PAIRS,
} from "../../../shared/theme/decisioTheme";

export const Cap02Scene2_AnatomieGraphique: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pair = DECISIO_CHROMATIC_PAIRS.tomeX_spc;
  const enter = spring({ frame, fps, config: { damping: 14 } });

  const showHeresy = frame > 80;

  const legendFade = interpolate(frame, [15, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: DECISIO_NEUTRALS.white }}>
      <DecisioHeader
        moduleTitle="Module 01 • Fondations de la Variabilité"
        capsuleTitle="Anatomie Graphique des Limites"
        normativeRef="ISO 22514-1 / ISO 7870-1"
      />

      <div
        style={{
          position: "absolute",
          top: 200,
          left: 100,
          right: 100,
          display: "flex",
          flexDirection: "column",
          gap: 20,
          opacity: enter,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <div
            style={{
              fontFamily: DECISIO_FONTS.serif,
              fontSize: 48,
              fontWeight: 600,
              color: pair.C,
            }}
          >
            Deux univers mathématiques étanches
          </div>
          <div
            style={{
              fontFamily: DECISIO_FONTS.code,
              fontSize: 22,
              color: DECISIO_NEUTRALS.textSecondary,
              opacity: legendFade,
            }}
          >
            Courbe noire : pièces X ∼ N(μ, σ²) &nbsp;|&nbsp; Courbe bleue : moyennes X̄ ∼ N(μ, σ²/n)
          </div>
        </div>

        {/* Graphique SVG dynamique */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <DistributionVsToleranceChart
            showControlLimits={true}
            highlightHeresy={showHeresy}
          />
        </div>

        {/* 3 cartouches explicatifs */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 24,
            opacity: legendFade,
            marginTop: 8,
          }}
        >
          <div
            style={{
              borderLeft: `5px solid ${DECISIO_CHROMATIC_PAIRS.tomeII_desc.C}`,
              backgroundColor: DECISIO_NEUTRALS.codeBg,
              padding: "16px 22px",
              borderRadius: 6,
            }}
          >
            <div
              style={{
                fontFamily: DECISIO_FONTS.code,
                fontSize: 22,
                fontWeight: 600,
                color: DECISIO_CHROMATIC_PAIRS.tomeII_desc.C,
                marginBottom: 8,
              }}
            >
              LSL / USL
            </div>
            <div
              style={{
                fontFamily: DECISIO_FONTS.serif,
                fontSize: 28,
                color: DECISIO_NEUTRALS.textMain,
                lineHeight: 1.4,
              }}
            >
              Spécifications client. Appliquées à chaque{" "}
              <strong>pièce individuelle</strong>.
            </div>
          </div>

          <div
            style={{
              borderLeft: `5px solid ${DECISIO_NEUTRALS.textSecondary}`,
              backgroundColor: DECISIO_NEUTRALS.codeBg,
              padding: "16px 22px",
              borderRadius: 6,
            }}
          >
            <div
              style={{
                fontFamily: DECISIO_FONTS.code,
                fontSize: 22,
                fontWeight: 600,
                color: DECISIO_NEUTRALS.textSecondary,
                marginBottom: 8,
              }}
            >
              LNTL / UNTL
            </div>
            <div
              style={{
                fontFamily: DECISIO_FONTS.serif,
                fontSize: 28,
                color: DECISIO_NEUTRALS.textMain,
                lineHeight: 1.4,
              }}
            >
              Limites naturelles 6σ du procédé. Englobent 99,73 % du flux.
            </div>
          </div>

          <div
            style={{
              borderLeft: `5px solid ${pair.C}`,
              backgroundColor: DECISIO_NEUTRALS.codeBg,
              padding: "16px 22px",
              borderRadius: 6,
            }}
          >
            <div
              style={{
                fontFamily: DECISIO_FONTS.code,
                fontSize: 22,
                fontWeight: 600,
                color: pair.C,
                marginBottom: 8,
              }}
            >
              LCL / UCL
            </div>
            <div
              style={{
                fontFamily: DECISIO_FONTS.serif,
                fontSize: 28,
                color: DECISIO_NEUTRALS.textMain,
                lineHeight: 1.4,
              }}
            >
              Limites Shewhart. Appliquées aux <strong>moyennes</strong> de sous-groupes.
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
