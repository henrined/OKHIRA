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

  // Phase 1 : Explication des grandeurs
  // Phase 2 (après frame 120) : Révélation de l'hérésie méthodologique
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
          top: 210,
          left: 100,
          right: 100,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          opacity: enter,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <div
            style={{
              fontFamily: DECISIO_FONTS.serif,
              fontSize: 32,
              fontWeight: 600,
              color: pair.C,
            }}
          >
            Deux univers mathématiques étanches
          </div>
          <div
            style={{
              fontFamily: DECISIO_FONTS.code,
              fontSize: 14,
              color: DECISIO_NEUTRALS.textSecondary,
              opacity: legendFade,
            }}
          >
            Courbe noire : Pièces X ~ N(μ, σ²)  |  Courbe bleue : Échantillons X̄ ~ N(μ, σ²/n)
          </div>
        </div>

        {/* Graphique SVG dynamique */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <DistributionVsToleranceChart
            showControlLimits={true}
            highlightHeresy={showHeresy}
          />
        </div>

        {/* 3 Cartouches explicatifs synchronisés sous le graphique */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 20,
            opacity: legendFade,
            marginTop: 4,
          }}
        >
          <div
            style={{
              borderLeft: "4px solid #AA0E1B",
              backgroundColor: DECISIO_NEUTRALS.codeBg,
              padding: "12px 16px",
              borderRadius: 4,
            }}
          >
            <div style={{ fontFamily: DECISIO_FONTS.code, fontSize: 13, fontWeight: 600, color: "#AA0E1B" }}>
              LSL / USL (Cahier des charges)
            </div>
            <div style={{ fontFamily: DECISIO_FONTS.serif, fontSize: 15, color: DECISIO_NEUTRALS.textMain, marginTop: 4 }}>
              Appliquées à <strong>chaque pièce individuelle</strong>. Définissent la conformité marchande.
            </div>
          </div>

          <div
            style={{
              borderLeft: `4px solid ${DECISIO_NEUTRALS.textSecondary}`,
              backgroundColor: DECISIO_NEUTRALS.codeBg,
              padding: "12px 16px",
              borderRadius: 4,
            }}
          >
            <div style={{ fontFamily: DECISIO_FONTS.code, fontSize: 13, fontWeight: 600, color: DECISIO_NEUTRALS.textSecondary }}>
              LNTL / UNTL (Dispersion 6σ)
            </div>
            <div style={{ fontFamily: DECISIO_FONTS.serif, fontSize: 15, color: DECISIO_NEUTRALS.textMain, marginTop: 4 }}>
              Limites naturelles du procédé : [μ - 3σ, μ + 3σ]. Englobent 99,73 % du flux sans dérive.
            </div>
          </div>

          <div
            style={{
              borderLeft: `4px solid ${pair.C}`,
              backgroundColor: DECISIO_NEUTRALS.codeBg,
              padding: "12px 16px",
              borderRadius: 4,
            }}
          >
            <div style={{ fontFamily: DECISIO_FONTS.code, fontSize: 13, fontWeight: 600, color: pair.C }}>
              LCL / UCL (Cartes de Contrôle X̄)
            </div>
            <div style={{ fontFamily: DECISIO_FONTS.serif, fontSize: 15, color: DECISIO_NEUTRALS.textMain, marginTop: 4 }}>
              Appliquées aux <strong>moyennes de lots</strong> (n=4 ou 5). Détectent les dérives de centrage.
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};