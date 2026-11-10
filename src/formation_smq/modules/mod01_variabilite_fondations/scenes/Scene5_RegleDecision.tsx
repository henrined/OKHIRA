import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { DecisioHeader } from "../../../shared/components/DecisioHeader";
import {
  DECISIO_FONTS,
  DECISIO_NEUTRALS,
  DECISIO_CHROMATIC_PAIRS,
} from "../../../shared/theme/decisioTheme";

export const Scene5_RegleDecision: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pair = DECISIO_CHROMATIC_PAIRS.tomeX_spc;
  const progress = spring({ frame, fps, config: { damping: 15 } });

  return (
    <AbsoluteFill style={{ backgroundColor: DECISIO_NEUTRALS.white }}>
      <DecisioHeader
        moduleTitle="Module 01 • Fondations de la Variabilité"
        capsuleTitle="Règle Opérationnelle de Décision"
        normativeRef="SYNTHÈSE INDUSTRIELLE"
      />

      <div
        style={{
          position: "absolute",
          top: 220,
          left: 120,
          right: 120,
          display: "flex",
          flexDirection: "column",
          gap: 28,
          opacity: progress,
        }}
      >
        <div
          style={{
            fontFamily: DECISIO_FONTS.serif,
            fontSize: 32,
            fontWeight: 600,
            color: pair.C,
          }}
        >
          Matrice d'arbitrage de l'ingénieur qualité
        </div>

        {/* Tableau comparatif booktabs conforme CMS Chapitre 3 */}
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontFamily: DECISIO_FONTS.serif,
            fontSize: 18,
            color: DECISIO_NEUTRALS.textMain,
            marginTop: 10,
          }}
        >
          <thead>
            <tr
              style={{
                borderTop: `2px solid ${DECISIO_NEUTRALS.textMain}`,
                borderBottom: `1.5px solid ${pair.C}`,
                backgroundColor: pair.F,
              }}
            >
              <th style={{ padding: "14px 18px", textAlign: "left", width: "22%" }}>Nature de la cause</th>
              <th style={{ padding: "14px 18px", textAlign: "left", width: "26%" }}>Origine physique</th>
              <th style={{ padding: "14px 18px", textAlign: "left", width: "26%" }}>Action requise</th>
              <th style={{ padding: "14px 18px", textAlign: "left", width: "26%" }}>Piège à proscrire</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: `1px solid ${DECISIO_NEUTRALS.structural}` }}>
              <td style={{ padding: "18px", fontWeight: 600, color: pair.C }}>
                Cause Commune (Bruit de fond)
              </td>
              <td style={{ padding: "18px" }}>
                Inhérente au procédé (85 % à 94 % des variations constatées).
              </td>
              <td style={{ padding: "18px" }}>
                <strong>Ne pas toucher au procédé.</strong> Engager un chantier d'amélioration structurelle (DMAIC).
              </td>
              <td style={{ padding: "18px", color: DECISIO_CHROMATIC_PAIRS.tomeII_desc.C }}>
                Réajustement immédiat par l’opérateur (sur-réglage destructeur).
              </td>
            </tr>
            <tr style={{ borderBottom: `2px solid ${DECISIO_NEUTRALS.textMain}` }}>
              <td style={{ padding: "18px", fontWeight: 600, color: DECISIO_CHROMATIC_PAIRS.tomeII_desc.C }}>
                Cause Spéciale (Signal assignable)
              </td>
              <td style={{ padding: "18px" }}>
                Événement externe identifiable (outil cassé, dérive thermique, lot matière corrompu).
              </td>
              <td style={{ padding: "18px" }}>
                <strong>Arrêter et investiguer.</strong> Éliminer la cause spécifique à la source (méthode 8D / 5P).
              </td>
              <td style={{ padding: "18px", color: DECISIO_CHROMATIC_PAIRS.tomeII_desc.C }}>
                Considérer le signal comme une fatalité ou modifier la tolérance client.
              </td>
            </tr>
          </tbody>
        </table>

        <div
          style={{
            fontFamily: DECISIO_FONTS.code,
            fontSize: 16,
            backgroundColor: DECISIO_NEUTRALS.codeBg,
            padding: "16px 20px",
            borderRadius: 4,
            color: DECISIO_NEUTRALS.textSecondary,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>PROCHAINE CAPSULE : 1.2 — TOLÉRANCES CLIENTS (USL/LSL) ET LIMITES NATURELLES DE PROCÉDÉ (UCL/LCL)</span>
          <span style={{ fontWeight: 600, color: pair.C }}>ÉDITIONS DÉCISIO • TOUS DROITS RÉSERVÉS</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
