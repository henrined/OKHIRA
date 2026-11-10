import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { DecisioHeader } from "../../../shared/components/DecisioHeader";
import {
  DECISIO_FONTS,
  DECISIO_NEUTRALS,
  DECISIO_CHROMATIC_PAIRS,
} from "../../../shared/theme/decisioTheme";

export const Cap02Scene1_Probleme: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const textTranslateY = interpolate(frame, [15, 35], [20, 0], {
    extrapolateRight: "clamp",
  });

  const pair = DECISIO_CHROMATIC_PAIRS.tomeX_spc;
  const alertPair = DECISIO_CHROMATIC_PAIRS.tomeII_desc;

  return (
    <AbsoluteFill style={{ backgroundColor: DECISIO_NEUTRALS.white }}>
      <DecisioHeader
        moduleTitle="Module 01 • Fondations de la Variabilité"
        capsuleTitle="Spécifications Client et Limites Naturelles"
        normativeRef="ISO 22514-1 / §4.2"
      />

      <div
        style={{
          position: "absolute",
          top: 230,
          left: 120,
          right: 120,
          display: "flex",
          flexDirection: "column",
          gap: 36,
          opacity: titleOpacity,
          transform: `translateY(${textTranslateY}px)`,
        }}
      >
        <div
          style={{
            fontFamily: DECISIO_FONTS.serif,
            fontSize: 68,
            fontWeight: 600,
            color: pair.C,
            lineHeight: 1.15,
          }}
        >
          Le quiproquo le plus coûteux de l'industrie moderne
        </div>

        <div
          style={{
            fontFamily: DECISIO_FONTS.serif,
            fontSize: 38,
            color: DECISIO_NEUTRALS.textMain,
            lineHeight: 1.55,
            maxWidth: 1540,
          }}
        >
          Dans une usine sur deux, les équipes superposent sur leurs écrans
          les <strong>tolérances contractuelles du plan client</strong> et les{" "}
          <strong>limites de dispersion de la machine</strong>, comme si ces grandeurs
          mesuraient le même phénomène.
        </div>

        {/* Bloc comparatif */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 32,
            marginTop: 8,
          }}
        >
          <div
            style={{
              backgroundColor: alertPair.F,
              borderLeft: `6px solid ${alertPair.C}`,
              padding: "28px 32px",
              borderRadius: 8,
            }}
          >
            <div
              style={{
                fontFamily: DECISIO_FONTS.code,
                fontSize: 22,
                color: alertPair.C,
                fontWeight: 600,
                letterSpacing: "0.06em",
                marginBottom: 14,
              }}
            >
              VOIX DU CLIENT — LSL / USL
            </div>
            <div
              style={{
                fontFamily: DECISIO_FONTS.serif,
                fontSize: 32,
                color: DECISIO_NEUTRALS.textMain,
                lineHeight: 1.45,
              }}
            >
              Ce que le client{" "}
              <strong>désire</strong>. Fixé par contrat. Indifférent
              aux contraintes physiques de l'atelier.
            </div>
          </div>

          <div
            style={{
              backgroundColor: pair.F,
              borderLeft: `6px solid ${pair.C}`,
              padding: "28px 32px",
              borderRadius: 8,
            }}
          >
            <div
              style={{
                fontFamily: DECISIO_FONTS.code,
                fontSize: 22,
                color: pair.C,
                fontWeight: 600,
                letterSpacing: "0.06em",
                marginBottom: 14,
              }}
            >
              VOIX DU PROCÉDÉ — LCL / UCL
            </div>
            <div
              style={{
                fontFamily: DECISIO_FONTS.serif,
                fontSize: 32,
                color: DECISIO_NEUTRALS.textMain,
                lineHeight: 1.45,
              }}
            >
              Ce que la machine{" "}
              <strong>peut réellement faire</strong>. Régi par la physique
              et les lois de probabilités.
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: DECISIO_NEUTRALS.codeBg,
            borderLeft: `4px solid ${DECISIO_NEUTRALS.axesLines}`,
            padding: "20px 28px",
            borderRadius: 4,
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
            « Confondre tolérance client et limite statistique, c'est confondre
            le souhait d'arriver à l'heure et la vitesse réelle du train. »
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
