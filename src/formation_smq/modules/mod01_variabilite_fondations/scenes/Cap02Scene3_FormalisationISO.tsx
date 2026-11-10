import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { DecisioHeader } from "../../../shared/components/DecisioHeader";
import {
  DECISIO_FONTS,
  DECISIO_NEUTRALS,
  DECISIO_CHROMATIC_PAIRS,
} from "../../../shared/theme/decisioTheme";

export const Cap02Scene3_FormalisationISO: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pair = DECISIO_CHROMATIC_PAIRS.tomeX_spc;
  const anim = spring({ frame, fps, config: { damping: 15 } });

  const fadeEquations = interpolate(frame, [20, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: DECISIO_NEUTRALS.white }}>
      <DecisioHeader
        moduleTitle="Module 01 • Fondations de la Variabilité"
        capsuleTitle="Formalisation Mathématique Normée"
        normativeRef="ISO 22514-1 / ISO 80000-2"
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
          Définitions normatives & ratios de capabilité
        </div>

        <div
          style={{
            fontFamily: DECISIO_FONTS.serif,
            fontSize: 21,
            color: DECISIO_NEUTRALS.textMain,
            lineHeight: 1.5,
          }}
        >
          La norme internationale <strong>ISO 22514-1</strong> sépare rigoureusement
          l’exigence contractuelle externe de la dispersion physique inhérente au procédé :
        </div>

        {/* 2 Blocs d'équations en miroir */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 28,
            opacity: fadeEquations,
          }}
        >
          {/* Bloc 1 : Capabilité potentielle Cp */}
          <div
            style={{
              backgroundColor: DECISIO_NEUTRALS.codeBg,
              border: `1px solid ${DECISIO_NEUTRALS.structural}`,
              borderLeft: `6px solid ${pair.C}`,
              padding: "24px 28px",
              borderRadius: 6,
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <div
              style={{
                fontFamily: DECISIO_FONTS.code,
                fontSize: 14,
                color: pair.C,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              1. Ratio Capabilité Potentielle (Cp)
            </div>
            <div
              style={{
                fontFamily: DECISIO_FONTS.math,
                fontSize: 32,
                color: DECISIO_NEUTRALS.textMain,
              }}
            >
              C_p = (USL - LSL) / (6σ) = IT / (6σ)
            </div>
            <div
              style={{
                fontFamily: DECISIO_FONTS.serif,
                fontSize: 16,
                color: DECISIO_NEUTRALS.textSecondary,
                lineHeight: 1.5,
              }}
            >
              Compare l'espace accordé par le client (IT) à l'espace occupé par la machine (6σ).
              <br />
              • <strong>C_p &lt; 1,00</strong> : Impossible de produire sans rebut, même parfaitement centré.
              <br />
              • <strong>C_p ≥ 1,33</strong> : Exigence industrielle minimale sous maîtrise SPC.
            </div>
          </div>

          {/* Bloc 2 : Limites de Contrôle Shewhart UCL / LCL */}
          <div
            style={{
              backgroundColor: DECISIO_NEUTRALS.codeBg,
              border: `1px solid ${DECISIO_NEUTRALS.structural}`,
              borderLeft: `6px solid #0E6CAF`,
              padding: "24px 28px",
              borderRadius: 6,
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <div
              style={{
                fontFamily: DECISIO_FONTS.code,
                fontSize: 14,
                color: "#0E6CAF",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              2. Limites de Contrôle Moyennes (X̄)
            </div>
            <div
              style={{
                fontFamily: DECISIO_FONTS.math,
                fontSize: 30,
                color: DECISIO_NEUTRALS.textMain,
              }}
            >
              UCL / LCL = μ ± 3 (σ / √n)
            </div>
            <div
              style={{
                fontFamily: DECISIO_FONTS.serif,
                fontSize: 16,
                color: DECISIO_NEUTRALS.textSecondary,
                lineHeight: 1.5,
              }}
            >
              Fondées sur le <strong>théorème central limite</strong> pour des sous-groupes de taille n.
              <br />
              • Rétrécit les limites d'un facteur 1/√n par rapport aux pièces individuelles.
              <br />
              • Détecte l'apparition d'une <strong>cause spéciale</strong> affectant la moyenne du flux.
            </div>
          </div>
        </div>

        {/* Note de doctrine */}
        <div
          style={{
            backgroundColor: DECISIO_CHROMATIC_PAIRS.tomeX_spc.F,
            border: `1px solid ${pair.C}`,
            borderRadius: 6,
            padding: "16px 20px",
            opacity: fadeEquations,
          }}
        >
          <div
            style={{
              fontFamily: DECISIO_FONTS.serif,
              fontSize: 17,
              color: DECISIO_NEUTRALS.textMain,
            }}
          >
            <strong>Principe Fondateur ISO :</strong> Les spécifications client ne sont d'aucune aide pour piloter une machine en temps réel. Seules les limites de contrôle issues de la variabilité naturelle permettent de décider si une intervention mécanique est légitime.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};