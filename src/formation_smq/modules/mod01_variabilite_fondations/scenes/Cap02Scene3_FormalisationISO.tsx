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
          top: 210,
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
            fontSize: 52,
            fontWeight: 600,
            color: pair.C,
            lineHeight: 1.15,
          }}
        >
          Définitions normatives et ratios de capabilité
        </div>

        <div
          style={{
            fontFamily: DECISIO_FONTS.serif,
            fontSize: 36,
            color: DECISIO_NEUTRALS.textMain,
            lineHeight: 1.5,
          }}
        >
          La norme <strong>ISO 22514-1</strong> sépare rigoureusement l'exigence
          contractuelle externe de la dispersion physique inhérente au procédé.
        </div>

        {/* 2 blocs d'équations en miroir */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 32,
            opacity: fadeEquations,
          }}
        >
          {/* Bloc 1 : Capabilité potentielle Cp */}
          <div
            style={{
              backgroundColor: DECISIO_NEUTRALS.codeBg,
              border: `1px solid ${DECISIO_NEUTRALS.structural}`,
              borderLeft: `7px solid ${pair.C}`,
              padding: "28px 34px",
              borderRadius: 8,
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            <div
              style={{
                fontFamily: DECISIO_FONTS.code,
                fontSize: 22,
                color: pair.C,
                fontWeight: 600,
                letterSpacing: "0.07em",
                textTransform: "uppercase",
              }}
            >
              1. Capabilité Potentielle — Cp
            </div>
            <div
              style={{
                fontFamily: DECISIO_FONTS.math,
                fontSize: 46,
                color: DECISIO_NEUTRALS.textMain,
                letterSpacing: "0.03em",
              }}
            >
              C_p = (USL − LSL) / 6σ
            </div>
            <div
              style={{
                fontFamily: DECISIO_FONTS.serif,
                fontSize: 28,
                color: DECISIO_NEUTRALS.textSecondary,
                lineHeight: 1.5,
              }}
            >
              Compare l'espace accordé par le client à l'espace occupé par la machine.
              <br />
              <strong>C_p &lt; 1,00</strong> : des rebuts sont inévitables, même en centrant parfaitement.
              <br />
              <strong>C_p ≥ 1,33</strong> : exigence industrielle minimale sous maîtrise SPC.
            </div>
          </div>

          {/* Bloc 2 : Limites de contrôle Shewhart */}
          <div
            style={{
              backgroundColor: DECISIO_NEUTRALS.codeBg,
              border: `1px solid ${DECISIO_NEUTRALS.structural}`,
              borderLeft: `7px solid #0E6CAF`,
              padding: "28px 34px",
              borderRadius: 8,
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            <div
              style={{
                fontFamily: DECISIO_FONTS.code,
                fontSize: 22,
                color: "#0E6CAF",
                fontWeight: 600,
                letterSpacing: "0.07em",
                textTransform: "uppercase",
              }}
            >
              2. Limites de Contrôle Shewhart — X̄
            </div>
            <div
              style={{
                fontFamily: DECISIO_FONTS.math,
                fontSize: 46,
                color: DECISIO_NEUTRALS.textMain,
                letterSpacing: "0.03em",
              }}
            >
              UCL/LCL = μ ± 3·(σ / √n)
            </div>
            <div
              style={{
                fontFamily: DECISIO_FONTS.serif,
                fontSize: 28,
                color: DECISIO_NEUTRALS.textSecondary,
                lineHeight: 1.5,
              }}
            >
              Fondées sur le <strong>Théorème Central Limite</strong>.
              Le facteur 1/√n rétrécit les limites proportionnellement à la taille n du sous-groupe.
              <br />
              Détecte les causes spéciales affectant la <strong>moyenne</strong> du flux.
            </div>
          </div>
        </div>

        {/* Note de doctrine */}
        <div
          style={{
            backgroundColor: pair.F,
            border: `1px solid ${pair.C}`,
            borderRadius: 8,
            padding: "20px 28px",
            opacity: fadeEquations,
          }}
        >
          <div
            style={{
              fontFamily: DECISIO_FONTS.serif,
              fontSize: 30,
              color: DECISIO_NEUTRALS.textMain,
              lineHeight: 1.45,
            }}
          >
            <strong>Principe ISO fondateur :</strong> Les spécifications client
            ne permettent pas de piloter une machine en temps réel. Seules les limites
            de contrôle issues de la variabilité naturelle autorisent une décision d'intervention légitime.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
