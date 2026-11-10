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
        gap: 24,
        maxWidth: 1500,
        width: "100%",
        opacity: enter,
      }}
    >
      {/* Q1 : Stable & Capable — Idéal */}
      <div
        style={{
          opacity: q1Opacity,
          backgroundColor: "#F0F7EF",
          border: `2px solid ${spcPair.C}`,
          borderRadius: 10,
          padding: "26px 32px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
          <span style={{ fontFamily: DECISIO_FONTS.serif, fontSize: 34, fontWeight: 600, color: spcPair.C, lineHeight: 1.2 }}>
            1. Procédé Idéal
          </span>
          <span
            style={{
              fontFamily: DECISIO_FONTS.code,
              fontSize: 20,
              fontWeight: 600,
              color: spcPair.C,
              backgroundColor: spcPair.F,
              padding: "4px 12px",
              borderRadius: 4,
              whiteSpace: "nowrap",
            }}
          >
            Stable & Capable
          </span>
        </div>
        <div style={{ fontFamily: DECISIO_FONTS.serif, fontSize: 26, color: DECISIO_NEUTRALS.textMain, lineHeight: 1.45 }}>
          Prévisible. Dispersion naturelle plus étroite que la tolérance client.
        </div>
        <div style={{ fontFamily: DECISIO_FONTS.code, fontSize: 22, color: spcPair.C, lineHeight: 1.4 }}>
          → Surveiller par échantillonnage. Ne pas intervenir.
        </div>
      </div>

      {/* Q2 : Stable mais Non-Capable */}
      <div
        style={{
          opacity: q2Opacity,
          backgroundColor: "#FFF8ED",
          border: "2px solid #C47200",
          borderRadius: 10,
          padding: "26px 32px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
          <span style={{ fontFamily: DECISIO_FONTS.serif, fontSize: 34, fontWeight: 600, color: "#9A5900", lineHeight: 1.2 }}>
            2. Le Piège
          </span>
          <span
            style={{
              fontFamily: DECISIO_FONTS.code,
              fontSize: 20,
              fontWeight: 600,
              color: "#9A5900",
              backgroundColor: "#FFF1DC",
              padding: "4px 12px",
              borderRadius: 4,
              whiteSpace: "nowrap",
            }}
          >
            Stable mais Non-Capable
          </span>
        </div>
        <div style={{ fontFamily: DECISIO_FONTS.serif, fontSize: 26, color: DECISIO_NEUTRALS.textMain, lineHeight: 1.45 }}>
          Prévisible, mais la dispersion dépasse la tolérance. Des rebuts sont certains.
        </div>
        <div style={{ fontFamily: DECISIO_FONTS.code, fontSize: 22, color: "#9A5900", lineHeight: 1.4 }}>
          → Interdit de régler. Reconcevoir le procédé structurellement.
        </div>
      </div>

      {/* Q3 : Instable mais Capable */}
      <div
        style={{
          opacity: q3Opacity,
          backgroundColor: "#FBF5F2",
          border: "2px solid #B05520",
          borderRadius: 10,
          padding: "26px 32px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
          <span style={{ fontFamily: DECISIO_FONTS.serif, fontSize: 34, fontWeight: 600, color: "#8F3E10", lineHeight: 1.2 }}>
            3. La Bombe à Retardement
          </span>
          <span
            style={{
              fontFamily: DECISIO_FONTS.code,
              fontSize: 20,
              fontWeight: 600,
              color: "#8F3E10",
              backgroundColor: "#FDEAE0",
              padding: "4px 12px",
              borderRadius: 4,
              whiteSpace: "nowrap",
            }}
          >
            Hors Contrôle mais Capable
          </span>
        </div>
        <div style={{ fontFamily: DECISIO_FONTS.serif, fontSize: 26, color: DECISIO_NEUTRALS.textMain, lineHeight: 1.45 }}>
          Les pièces passent — le procédé dérive. Fausse sécurité garantissant un décrochage futur.
        </div>
        <div style={{ fontFamily: DECISIO_FONTS.code, fontSize: 22, color: "#8F3E10", lineHeight: 1.4 }}>
          → Identifier et éliminer les causes spéciales immédiatement.
        </div>
      </div>

      {/* Q4 : Instable & Non-Capable */}
      <div
        style={{
          opacity: q4Opacity,
          backgroundColor: alertPair.F,
          border: `2px solid ${alertPair.C}`,
          borderRadius: 10,
          padding: "26px 32px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
          <span style={{ fontFamily: DECISIO_FONTS.serif, fontSize: 34, fontWeight: 600, color: alertPair.C, lineHeight: 1.2 }}>
            4. Le Chaos
          </span>
          <span
            style={{
              fontFamily: DECISIO_FONTS.code,
              fontSize: 20,
              fontWeight: 600,
              color: alertPair.C,
              backgroundColor: "#F9D6D8",
              padding: "4px 12px",
              borderRadius: 4,
              whiteSpace: "nowrap",
            }}
          >
            Hors Contrôle & Non-Capable
          </span>
        </div>
        <div style={{ fontFamily: DECISIO_FONTS.serif, fontSize: 26, color: DECISIO_NEUTRALS.textMain, lineHeight: 1.45 }}>
          Dispersion excessive combinée à des perturbations imprévisibles. Rebuts massifs.
        </div>
        <div style={{ fontFamily: DECISIO_FONTS.code, fontSize: 22, color: alertPair.C, lineHeight: 1.4 }}>
          → Arrêt production. Tri 100 %. Démarche 8D immédiate.
        </div>
      </div>
    </div>
  );
};
