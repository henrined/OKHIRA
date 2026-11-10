import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import {
  DECISIO_FONTS,
  DECISIO_NEUTRALS,
  DECISIO_CHROMATIC_PAIRS,
} from "../../../shared/theme/decisioTheme";

export const FourQuadrantsGrid: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 14 } });

  // Séquence d'apparition progressive des quadrants
  const q1Opacity = interpolate(frame, [10, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const q2Opacity = interpolate(frame, [30, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const q3Opacity = interpolate(frame, [50, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const q4Opacity = interpolate(frame, [70, 90], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const spcPair = DECISIO_CHROMATIC_PAIRS.tomeX_spc;
  const alertPair = DECISIO_CHROMATIC_PAIRS.tomeII_desc;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr",
        gap: 20,
        maxWidth: 1300,
        width: "100%",
        opacity: enter,
      }}
    >
      {/* Q1 : Stable & Capable (Idéal) */}
      <div
        style={{
          opacity: q1Opacity,
          backgroundColor: "#F0F7EF",
          border: `2px solid ${spcPair.C}`,
          borderRadius: 8,
          padding: "20px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          boxShadow: "0 4px 12px rgba(15, 97, 8, 0.08)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span
            style={{
              fontFamily: DECISIO_FONTS.serif,
              fontSize: 22,
              fontWeight: 600,
              color: spcPair.C,
            }}
          >
            1. Procédé Idéal (Sous Contrôle & Capable)
          </span>
          <span
            style={{
              fontFamily: DECISIO_FONTS.code,
              fontSize: 13,
              fontWeight: 600,
              color: spcPair.C,
              backgroundColor: spcPair.F,
              padding: "2px 8px",
              borderRadius: 4,
            }}
          >
            6σ ≤ IT & Aucune cause spéciale
          </span>
        </div>
        <div style={{ fontFamily: DECISIO_FONTS.serif, fontSize: 16, color: DECISIO_NEUTRALS.textMain, lineHeight: 1.5 }}>
          Le procédé est stable dans le temps et sa dispersion naturelle est plus étroite que le besoin client.
        </div>
        <div style={{ fontFamily: DECISIO_FONTS.code, fontSize: 13, color: DECISIO_NEUTRALS.textSecondary }}>
          ➔ <strong>Action :</strong> Surveiller par échantillonnage sans intervenir. Taux de non-conformité quasi-nul (&lt; 0,27 %).
        </div>
      </div>

      {/* Q2 : Stable mais Non-Capable (Le Piège du Réglage) */}
      <div
        style={{
          opacity: q2Opacity,
          backgroundColor: "#FFF8ED",
          border: "2px solid #C47200",
          borderRadius: 8,
          padding: "20px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          boxShadow: "0 4px 12px rgba(196, 114, 0, 0.08)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span
            style={{
              fontFamily: DECISIO_FONTS.serif,
              fontSize: 22,
              fontWeight: 600,
              color: "#9A5900",
            }}
          >
            2. Le Piège (Sous Contrôle mais Non-Capable)
          </span>
          <span
            style={{
              fontFamily: DECISIO_FONTS.code,
              fontSize: 13,
              fontWeight: 600,
              color: "#9A5900",
              backgroundColor: "#FFF1DC",
              padding: "2px 8px",
              borderRadius: 4,
            }}
          >
            6σ &gt; IT & Procédé stable
          </span>
        </div>
        <div style={{ fontFamily: DECISIO_FONTS.serif, fontSize: 16, color: DECISIO_NEUTRALS.textMain, lineHeight: 1.5 }}>
          Le procédé est prévisible, mais sa variabilité naturelle dépasse la tolérance client. Des rebuts sont mathématiquement certains.
        </div>
        <div style={{ fontFamily: DECISIO_FONTS.code, fontSize: 13, color: "#9A5900" }}>
          ➔ <strong>Interdiction :</strong> Ne PAS sur-régler ! <strong>Action :</strong> Reconcevoir la machine ou élargir la tolérance client.
        </div>
      </div>

      {/* Q3 : Instable mais Capable (La Bombe à Retardement) */}
      <div
        style={{
          opacity: q3Opacity,
          backgroundColor: "#FBF5F2",
          border: "2px solid #B05520",
          borderRadius: 8,
          padding: "20px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          boxShadow: "0 4px 12px rgba(176, 85, 32, 0.08)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span
            style={{
              fontFamily: DECISIO_FONTS.serif,
              fontSize: 22,
              fontWeight: 600,
              color: "#8F3E10",
            }}
          >
            3. Bombe à Retardement (Hors Contrôle mais Capable)
          </span>
          <span
            style={{
              fontFamily: DECISIO_FONTS.code,
              fontSize: 13,
              fontWeight: 600,
              color: "#8F3E10",
              backgroundColor: "#FDEAE0",
              padding: "2px 8px",
              borderRadius: 4,
            }}
          >
            6σ ≤ IT & Causes spéciales actives
          </span>
        </div>
        <div style={{ fontFamily: DECISIO_FONTS.serif, fontSize: 16, color: DECISIO_NEUTRALS.textMain, lineHeight: 1.5 }}>
          Toutes les pièces passent le contrôle unitaire car le client a fixé une tolérance large, mais le procédé dérive en sous-main.
        </div>
        <div style={{ fontFamily: DECISIO_FONTS.code, fontSize: 13, color: "#8F3E10" }}>
          ➔ <strong>Danger :</strong> Fausse impression de sécurité. Décrochage brutal garanti dès que la dérive franchira l'USL.
        </div>
      </div>

      {/* Q4 : Instable & Non-Capable (Le Chaos Industriel) */}
      <div
        style={{
          opacity: q4Opacity,
          backgroundColor: alertPair.F,
          border: `2px solid ${alertPair.C}`,
          borderRadius: 8,
          padding: "20px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          boxShadow: "0 4px 12px rgba(170, 14, 27, 0.08)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span
            style={{
              fontFamily: DECISIO_FONTS.serif,
              fontSize: 22,
              fontWeight: 600,
              color: alertPair.C,
            }}
          >
            4. Le Chaos (Hors Contrôle & Non-Capable)
          </span>
          <span
            style={{
              fontFamily: DECISIO_FONTS.code,
              fontSize: 13,
              fontWeight: 600,
              color: alertPair.C,
              backgroundColor: "#F9D6D8",
              padding: "2px 8px",
              borderRadius: 4,
            }}
          >
            6σ &gt; IT & Imprévisible
          </span>
        </div>
        <div style={{ fontFamily: DECISIO_FONTS.serif, fontSize: 16, color: DECISIO_NEUTRALS.textMain, lineHeight: 1.5 }}>
          Dispersion excessive combinée à des perturbations systématiques aléatoires. Rebuts massifs et perte totale de capabilité.
        </div>
        <div style={{ fontFamily: DECISIO_FONTS.code, fontSize: 13, color: alertPair.C }}>
          ➔ <strong>Action :</strong> Arrêt immédiat de la production, tri à 100 % et démarche de résolution de crise 8D.
        </div>
      </div>
    </div>
  );
};