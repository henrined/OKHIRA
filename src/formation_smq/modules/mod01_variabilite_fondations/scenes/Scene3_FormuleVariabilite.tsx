import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { DecisioHeader } from "../../../shared/components/DecisioHeader";
import {
  DECISIO_FONTS,
  DECISIO_NEUTRALS,
  DECISIO_CHROMATIC_PAIRS,
} from "../../../shared/theme/decisioTheme";

export const Scene3_FormuleVariabilite: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pair = DECISIO_CHROMATIC_PAIRS.tomeX_spc;

  const anim = spring({ frame, fps, config: { damping: 15 } });
  const formulaFade = interpolate(frame, [20, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: DECISIO_NEUTRALS.white }}>
      <DecisioHeader
        moduleTitle="Module 01 • Fondations de la Variabilité"
        capsuleTitle="Formalisation Mathématique"
        normativeRef="ISO 80000-2 / MODÈLE ADDITIF"
      />

      <div
        style={{
          position: "absolute",
          top: 230,
          left: 120,
          right: 120,
          display: "flex",
          flexDirection: "column",
          gap: 28,
          opacity: anim,
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
          Décomposition de la variance d'un procédé
        </div>

        <div
          style={{
            fontFamily: DECISIO_FONTS.serif,
            fontSize: 22,
            color: DECISIO_NEUTRALS.textMain,
            lineHeight: 1.5,
          }}
        >
          Soit $Y_t$ la mesure d'une caractéristique qualité à l'instant $t$. En présence
          d'une perturbation ponctuelle, le processus se décompose en :
        </div>

        {/* Formule mathématique stylisée STIX Two */}
        <div
          style={{
            opacity: formulaFade,
            backgroundColor: DECISIO_NEUTRALS.codeBg,
            border: `1px solid ${DECISIO_NEUTRALS.structural}`,
            borderLeft: `6px solid ${pair.C}`,
            padding: "30px 40px",
            borderRadius: 6,
            display: "flex",
            flexDirection: "column",
            gap: 16,
            maxWidth: 1100,
          }}
        >
          <div
            style={{
              fontFamily: DECISIO_FONTS.math,
              fontSize: 36,
              color: DECISIO_NEUTRALS.textMain,
              letterSpacing: "0.04em",
            }}
          >
            σ²_total = σ²_commun + σ²_spécial
          </div>

          <div
            style={{
              fontFamily: DECISIO_FONTS.serif,
              fontSize: 18,
              color: DECISIO_NEUTRALS.textSecondary,
              lineHeight: 1.6,
            }}
          >
            • <strong>σ²_commun</strong> : Variabilité inhérente au système (bruit thermique, jeu mécanique, fluctuations normales des matières). Réductible uniquement par un changement structurel de procédé.
            <br />
            • <strong>σ²_spécial</strong> : Perturbation assignable (usure anormale d'outil, lot de matière non conforme, déréglage opérateur). Doit être éliminée à la source.
          </div>
        </div>

        <div
          style={{
            fontFamily: DECISIO_FONTS.serif,
            fontSize: 20,
            color: pair.C,
            fontWeight: 600,
            marginTop: 10,
          }}
        >
          Théorème de Deming : L'ajustement compensatoire transforme une cause commune en dérive artificielle, doublant au minimum la variance globale : Var(Y_ajusté) = 2 · σ²_commun.
        </div>
      </div>
    </AbsoluteFill>
  );
};
