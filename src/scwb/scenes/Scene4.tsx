import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Img, staticFile } from "remotion";
import { Background } from "../components/Background";
import { GlassCard } from "../components/GlassCard";
import { KineticText } from "../components/KineticText";
import { getRythme } from "../durations";
import { COLORS, FONTS } from "../theme";

interface SceneProps {
  voiceOffsetFrames?: number;
}

export const Scene4: React.FC<SceneProps> = ({ voiceOffsetFrames = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rythme = getRythme("s4");

  const currentMs = Math.max(0, ((frame - voiceOffsetFrames) / fps) * 1000);

  // Glass Ledger entrance
  const ledgerSpr = spring({
    fps,
    frame: frame - 2,
    config: { damping: 14, stiffness: 90 },
  });

  const ledgerScale = interpolate(ledgerSpr, [0, 1], [0.9, 1]);
  const ledgerY = interpolate(ledgerSpr, [0, 1], [40, 0]);

  // Mini cards folding into the ledger (0 - 1500ms)
  const foldSpr = spring({
    fps,
    frame: frame - 4,
    config: { damping: 14, stiffness: 100 },
  });
  const foldScale = interpolate(foldSpr, [0, 1], [1, 0]);
  const foldOpacity = interpolate(foldSpr, [0, 0.7, 1], [1, 0.4, 0]);

  // Ledger lines typing / appearing
  const line1Visible = currentMs >= 200;
  const line2Visible = currentMs >= 800;
  const line3Visible = currentMs >= 1400;
  const line4Visible = currentMs >= 2000;

  // Animated decreasing total (from 15 000 down to 6 500 FCFA)
  const totalDropProgress = interpolate(
    currentMs,
    [800, 2400],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const currentTotal = Math.round(interpolate(totalDropProgress, [0, 1], [15000, 6500]));

  // Protocol reveal impact at "C'est un protocole écrit." (~3200ms)
  const protocolMs = 3200;
  const protocolStartFrame = (protocolMs / 1000) * fps + voiceOffsetFrames;
  const protocolSpr = spring({
    fps,
    frame: frame - protocolStartFrame,
    config: { damping: 12, stiffness: 110 },
  });
  const protocolScale = interpolate(protocolSpr, [0, 0.6, 1], [0.8, 1.15, 1.05]);
  const protocolOpacity = interpolate(protocolSpr, [0, 0.3, 1], [0, 0.9, 1]);

  return (
    <AbsoluteFill>
      <Background type="tealLight" />

      {/* Kinetic Voiceover Text */}
      <KineticText
        phrases={rythme.phrases}
        keywords={["travail", "protocole", "écrit", "protocole écrit"]}
        fontSize={54}
        keywordFontSize={66}
        offsetFrames={voiceOffsetFrames}
        position="top"
        style={{ top: 180 }}
      />

      {/* Mini loss cards folding into the ledger */}
      {foldOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            top: 520,
            left: "50%",
            transform: "translateX(-50%)",
            width: 460,
            display: "flex",
            flexDirection: "column",
            gap: 12,
            zIndex: 10,
            opacity: foldOpacity,
            scale: `${foldScale}`,
          }}
        >
          <Img src={staticFile("scwb/assets/carte_perte_1.png")} style={{ width: "100%" }} />
          <Img src={staticFile("scwb/assets/carte_perte_2.png")} style={{ width: "100%" }} />
          <Img src={staticFile("scwb/assets/carte_perte_3.png")} style={{ width: "100%" }} />
        </div>
      )}

      {/* Frosted Glass Cash Register / Ledger */}
      <div
        style={{
          position: "absolute",
          top: 560,
          left: "50%",
          width: 760,
          transform: `translateX(-50%) translateY(${ledgerY}px) scale(${ledgerScale})`,
          zIndex: 15,
        }}
      >
        <GlassCard style={{ padding: "40px 48px" }}>
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid rgba(11, 61, 62, 0.12)",
              paddingBottom: 20,
              marginBottom: 24,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: FONTS.main,
                  fontWeight: 800,
                  fontSize: 22,
                  color: COLORS.deepTeal,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                Carnet de Caisse Journalier
              </div>
              <div
                style={{
                  fontFamily: FONTS.main,
                  fontWeight: 400,
                  fontSize: 14,
                  color: COLORS.midTeal,
                  marginTop: 4,
                }}
              >
                Activité WhatsApp Business
              </div>
            </div>
            <div
              style={{
                background: COLORS.lightTeal,
                color: COLORS.deepTeal,
                padding: "6px 16px",
                borderRadius: 20,
                fontSize: 14,
                fontWeight: 700,
                fontFamily: FONTS.main,
              }}
            >
              En direct
            </div>
          </div>

          {/* Table entries */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {line1Visible && (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: FONTS.main, fontSize: 20, color: COLORS.deepTeal }}>
                  Commande Robe Wax (Client WhatsApp)
                </span>
                <span style={{ fontFamily: FONTS.main, fontWeight: 700, fontSize: 22, color: COLORS.whatsappGreen }}>
                  +15 000 F
                </span>
              </div>
            )}

            {line2Visible && (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: FONTS.main, fontSize: 20, color: COLORS.alertRed }}>
                  ✕ Course moto livreur (aller-retour)
                </span>
                <span style={{ fontFamily: FONTS.main, fontWeight: 700, fontSize: 22, color: COLORS.alertRed }}>
                  −3 000 F
                </span>
              </div>
            )}

            {line3Visible && (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: FONTS.main, fontSize: 20, color: COLORS.alertRed }}>
                  ✕ Colis non livré (client injoignable)
                </span>
                <span style={{ fontFamily: FONTS.main, fontWeight: 700, fontSize: 22, color: COLORS.alertRed }}>
                  −2 500 F
                </span>
              </div>
            )}

            {line4Visible && (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: FONTS.main, fontSize: 20, color: COLORS.alertRed }}>
                  ✕ Temps perdu & relances stériles
                </span>
                <span style={{ fontFamily: FONTS.main, fontWeight: 700, fontSize: 22, color: COLORS.alertRed }}>
                  −3 000 F
                </span>
              </div>
            )}
          </div>

          {/* Total Row */}
          <div
            style={{
              marginTop: 32,
              paddingTop: 24,
              borderTop: "2px dashed rgba(11, 61, 62, 0.15)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontFamily: FONTS.main, fontWeight: 800, fontSize: 24, color: COLORS.deepTeal }}>
              Bénéfice Réel Restant :
            </span>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
              <span
                style={{
                  fontFamily: FONTS.main,
                  fontWeight: 800,
                  fontSize: 40,
                  color: currentTotal < 10000 ? COLORS.alertRed : COLORS.gold,
                  letterSpacing: "-0.02em",
                  transition: "color 0.2s",
                }}
              >
                {currentTotal.toLocaleString("fr-FR")} FCFA
              </span>
              <span style={{ fontSize: 18, fontWeight: 700, color: COLORS.alertRed }}>
                (−57 %)
              </span>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Gold Protocol Badge Reveal at phrase 2 */}
      {frame >= protocolStartFrame && (
        <div
          style={{
            position: "absolute",
            bottom: 260,
            left: "50%",
            transform: `translateX(-50%) scale(${protocolScale})`,
            opacity: protocolOpacity,
            zIndex: 25,
            background: `linear-gradient(135deg, ${COLORS.gold}, #F3D979, ${COLORS.gold})`,
            padding: "16px 40px",
            borderRadius: 40,
            boxShadow: `0 15px 40px ${COLORS.gold}50, 0 4px 15px rgba(0,0,0,0.1)`,
            border: "2px solid #FFF",
          }}
        >
          <span
            style={{
              fontFamily: FONTS.main,
              fontWeight: 800,
              fontSize: 28,
              color: COLORS.deepTeal,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            ★ Un Protocole Écrit
          </span>
        </div>
      )}
    </AbsoluteFill>
  );
};
