import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { DecisioHeader } from "../../../shared/components/DecisioHeader";
import {
  DECISIO_FONTS,
  DECISIO_NEUTRALS,
  DECISIO_CHROMATIC_PAIRS,
} from "../../../shared/theme/decisioTheme";

export const Cap02Scene6_Gouvernance: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pair = DECISIO_CHROMATIC_PAIRS.tomeX_spc;
  const alertPair = DECISIO_CHROMATIC_PAIRS.tomeII_desc;
  const progress = spring({ frame, fps, config: { damping: 15 } });

  return (
    <AbsoluteFill style={{ backgroundColor: DECISIO_NEUTRALS.white }}>
      <DecisioHeader
        moduleTitle="Module 01 • Fondations de la Variabilité"
        capsuleTitle="Règle Opérationnelle de Gouvernance"
        normativeRef="SYNTHÈSE INDUSTRIELLE"
      />

      <div
        style={{
          position: "absolute",
          top: 195,
          left: 100,
          right: 100,
          display: "flex",
          flexDirection: "column",
          gap: 22,
          opacity: progress,
        }}
      >
        <div
          style={{
            fontFamily: DECISIO_FONTS.serif,
            fontSize: 48,
            fontWeight: 600,
            color: pair.C,
          }}
        >
          Matrice de Gouvernance Métrologique
        </div>

        {/* Tableau comparatif booktabs */}
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontFamily: DECISIO_FONTS.serif,
            fontSize: 26,
            color: DECISIO_NEUTRALS.textMain,
          }}
        >
          <thead>
            <tr
              style={{
                borderTop: `2px solid ${DECISIO_NEUTRALS.textMain}`,
                borderBottom: `2px solid ${pair.C}`,
                backgroundColor: pair.F,
              }}
            >
              <th style={{ padding: "16px 20px", textAlign: "left", width: "18%", fontSize: 26 }}>Dimension</th>
              <th style={{ padding: "16px 20px", textAlign: "left", width: "41%", color: alertPair.C, fontSize: 26 }}>
                Tolérances Client (LSL / USL)
              </th>
              <th style={{ padding: "16px 20px", textAlign: "left", width: "41%", color: pair.C, fontSize: 26 }}>
                Limites de Contrôle (LCL / UCL sur X̄)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: `1px solid ${DECISIO_NEUTRALS.structural}` }}>
              <td style={{ padding: "16px 20px", fontWeight: 600 }}>Origine</td>
              <td style={{ padding: "16px 20px", lineHeight: 1.4 }}>
                <strong>Externe</strong> : Cahier des charges, bureau d'études, contrat client.
              </td>
              <td style={{ padding: "16px 20px", lineHeight: 1.4 }}>
                <strong>Interne</strong> : Données empiriques du procédé sous causes communes.
              </td>
            </tr>

            <tr style={{ borderBottom: `1px solid ${DECISIO_NEUTRALS.structural}` }}>
              <td style={{ padding: "16px 20px", fontWeight: 600 }}>Application</td>
              <td style={{ padding: "16px 20px", lineHeight: 1.4 }}>
                Aux <strong>pièces unitaires</strong> (mesures individuelles X).
              </td>
              <td style={{ padding: "16px 20px", lineHeight: 1.4 }}>
                Aux <strong>statistiques d'échantillons</strong> (moyennes X̄, étendues R).
              </td>
            </tr>

            <tr style={{ borderBottom: `1px solid ${DECISIO_NEUTRALS.structural}` }}>
              <td style={{ padding: "16px 20px", fontWeight: 600 }}>Rôle décisionnel</td>
              <td style={{ padding: "16px 20px", lineHeight: 1.4 }}>
                Validation commerciale : <em>« Le lot est-il livrable au client ? »</em>
              </td>
              <td style={{ padding: "16px 20px", lineHeight: 1.4 }}>
                Pilotage machine : <em>« Une cause spéciale perturbe-t-elle le système ? »</em>
              </td>
            </tr>

            <tr style={{ borderBottom: `2px solid ${DECISIO_NEUTRALS.textMain}` }}>
              <td style={{ padding: "16px 20px", fontWeight: 600 }}>Action en cas d'écart</td>
              <td style={{ padding: "16px 20px", color: alertPair.C, lineHeight: 1.4 }}>
                Isoler les rebuts et bloquer l'expédition (action de tri aval).
              </td>
              <td style={{ padding: "16px 20px", color: pair.C, lineHeight: 1.4 }}>
                Arrêter immédiatement et neutraliser la cause spéciale (action amont).
              </td>
            </tr>
          </tbody>
        </table>

        {/* Règle d'or décisionnelle */}
        <div
          style={{
            backgroundColor: DECISIO_NEUTRALS.codeBg,
            borderLeft: `6px solid ${pair.C}`,
            padding: "20px 28px",
            borderRadius: 6,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <div
            style={{
              fontFamily: DECISIO_FONTS.code,
              fontSize: 22,
              fontWeight: 600,
              color: pair.C,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Règle d'Or Décisio pour l'Atelier
          </div>
          <div
            style={{
              fontFamily: DECISIO_FONTS.serif,
              fontSize: 28,
              color: DECISIO_NEUTRALS.textMain,
              lineHeight: 1.45,
            }}
          >
            <strong>Ne JAMAIS régler une machine en fonction de la proximité des tolérances client !</strong> Le réglage n'est autorisé que si une carte de contrôle déclenche une alarme statistique formelle (règles de Western Electric ou tests de Nelson).
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
