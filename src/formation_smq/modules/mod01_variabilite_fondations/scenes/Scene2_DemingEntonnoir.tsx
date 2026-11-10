import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { DecisioHeader } from "../../../shared/components/DecisioHeader";
import {
  DECISIO_FONTS,
  DECISIO_NEUTRALS,
  DECISIO_CHROMATIC_PAIRS,
} from "../../../shared/theme/decisioTheme";

export const Scene2_DemingEntonnoir: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pair = DECISIO_CHROMATIC_PAIRS.tomeX_spc;

  // Animation des 2 stratégies de réglage
  const enterProgress = spring({ frame, fps, config: { damping: 14 } });

  // Dispersion sans réglage (causes communes seules) : rayon stable
  const stableRadius = 90;

  // Dispersion avec sur-réglage (Règle 2/3 de Deming) : rayon qui croît
  const expandedRadius = interpolate(frame, [60, 200], [90, 220], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: DECISIO_NEUTRALS.white }}>
      <DecisioHeader
        moduleTitle="Module 01 • Fondations de la Variabilité"
        capsuleTitle="L'Expérience de l'Entonnoir de Deming"
        normativeRef="DÉMONSTRATION FACTUELLE"
      />

      <div
        style={{
          position: "absolute",
          top: 220,
          left: 120,
          right: 120,
          display: "flex",
          flexDirection: "column",
          gap: 24,
          opacity: enterProgress,
        }}
      >
        <div
          style={{
            fontFamily: DECISIO_FONTS.serif,
            fontSize: 34,
            fontWeight: 600,
            color: pair.C,
          }}
        >
          L'expérience canonique : Laisser faire face au réajustement systématique
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 40,
            marginTop: 20,
          }}
        >
          {/* Stratégie 1 : Processus stable sous contrôle */}
          <div
            style={{
              border: `1px solid ${DECISIO_NEUTRALS.structural}`,
              borderRadius: 8,
              padding: 24,
              backgroundColor: DECISIO_NEUTRALS.white,
              boxShadow: "0 4px 16px rgba(0,0,0,0.03)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontFamily: DECISIO_FONTS.serif,
                fontSize: 22,
                fontWeight: 600,
                color: pair.C,
                marginBottom: 8,
              }}
            >
              Stratégie A : Aucun ajustement (Stabilité)
            </div>
            <div
              style={{
                fontFamily: DECISIO_FONTS.serif,
                fontSize: 16,
                color: DECISIO_NEUTRALS.textSecondary,
                textAlign: "center",
                marginBottom: 20,
              }}
            >
              On accepte le bruit blanc naturel (causes communes).
            </div>

            {/* Schéma SVG de dispersion stable */}
            <svg width={360} height={260} viewBox="0 0 360 260">
              <circle cx={180} cy={130} r={stableRadius} fill={pair.F} stroke={pair.C} strokeWidth={2} strokeDasharray="4 4" />
              <line x1={180} y1={20} x2={180} y2={240} stroke={DECISIO_NEUTRALS.axesLines} strokeWidth={1} />
              <line x1={40} y1={130} x2={320} y2={130} stroke={DECISIO_NEUTRALS.axesLines} strokeWidth={1} />
              <circle cx={180} cy={130} r={6} fill={pair.C} />
              <text x={190} y={125} fontFamily={DECISIO_FONTS.code} fontSize={14} fill={pair.C}>Cible (m)</text>
              <text x={180} y={245} textAnchor="middle" fontFamily={DECISIO_FONTS.serif} fontSize={16} fill={pair.C} fontWeight={600}>
                Variance minimale : σ²
              </text>
            </svg>
          </div>

          {/* Stratégie 2 : Sur-réglage systématique */}
          <div
            style={{
              border: `1px solid ${DECISIO_CHROMATIC_PAIRS.tomeII_desc.C}`,
              borderRadius: 8,
              padding: 24,
              backgroundColor: DECISIO_CHROMATIC_PAIRS.tomeII_desc.F,
              boxShadow: "0 4px 16px rgba(170,14,27,0.05)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontFamily: DECISIO_FONTS.serif,
                fontSize: 22,
                fontWeight: 600,
                color: DECISIO_CHROMATIC_PAIRS.tomeII_desc.C,
                marginBottom: 8,
              }}
            >
              Stratégie B : Réaction à chaque écart (Tampering)
            </div>
            <div
              style={{
                fontFamily: DECISIO_FONTS.serif,
                fontSize: 16,
                color: DECISIO_NEUTRALS.textSecondary,
                textAlign: "center",
                marginBottom: 20,
              }}
            >
              L’opérateur déplace l'entonnoir à l'opposé de la dernière erreur.
            </div>

            {/* Schéma SVG de dispersion qui explose */}
            <svg width={360} height={260} viewBox="0 0 360 260">
              <circle
                cx={180}
                cy={130}
                r={expandedRadius}
                fill="rgba(170,14,27,0.08)"
                stroke={DECISIO_CHROMATIC_PAIRS.tomeII_desc.C}
                strokeWidth={2}
                strokeDasharray="6 3"
              />
              <line x1={180} y1={20} x2={180} y2={240} stroke={DECISIO_NEUTRALS.axesLines} strokeWidth={1} />
              <line x1={40} y1={130} x2={320} y2={130} stroke={DECISIO_NEUTRALS.axesLines} strokeWidth={1} />
              <circle cx={180} cy={130} r={6} fill={DECISIO_CHROMATIC_PAIRS.tomeII_desc.C} />
              <text x={180} y={245} textAnchor="middle" fontFamily={DECISIO_FONTS.serif} fontSize={16} fill={DECISIO_CHROMATIC_PAIRS.tomeII_desc.C} fontWeight={600}>
                Variance dégradée : 2σ² (Règle 2) à ∞
              </text>
            </svg>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
