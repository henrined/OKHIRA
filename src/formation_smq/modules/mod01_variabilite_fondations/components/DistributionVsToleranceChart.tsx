import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import {
  DECISIO_FONTS,
  DECISIO_NEUTRALS,
  DECISIO_CHROMATIC_PAIRS,
} from "../../../shared/theme/decisioTheme";

interface DistributionVsToleranceChartProps {
  showControlLimits?: boolean;
  highlightHeresy?: boolean;
}

export const DistributionVsToleranceChart: React.FC<DistributionVsToleranceChartProps> = ({
  showControlLimits = true,
  highlightHeresy = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 15 } });

  // Paramètres du repère SVG
  const width = 1140;
  const height = 450;
  const originY = 350;
  const centerX = width / 2; // mu = 570

  // Échelle graphique : 1 sigma = 72px
  const sigmaIndiv = 72;
  const sigmaBar = sigmaIndiv / Math.sqrt(4); // n = 4, sigma / 2 = 36px

  // Tolérances client (IT = USL - LSL = 6.8 * sigma = 489px)
  const lslX = centerX - 245;
  const uslX = centerX + 245;

  // Limites naturelles individuelles (3 sigma = 216px)
  const lntlX = centerX - 3 * sigmaIndiv;
  const untlX = centerX + 3 * sigmaIndiv;

  // Limites de contrôle sur moyennes (3 sigma / sqrt(n) = 108px)
  const lclX = centerX - 3 * sigmaBar;
  const uclX = centerX + 3 * sigmaBar;

  // Tracé de la courbe normale unitaire f(x)
  const pointsIndiv: string[] = [];
  const pointsMean: string[] = [];
  const steps = 140;

  for (let i = 0; i <= steps; i++) {
    const x = 50 + (i / steps) * (width - 100);
    const zIndiv = (x - centerX) / sigmaIndiv;
    const yIndiv = originY - 250 * Math.exp(-0.5 * zIndiv * zIndiv);
    pointsIndiv.push(`${x},${yIndiv}`);

    const zMean = (x - centerX) / sigmaBar;
    const yMean = originY - 320 * Math.exp(-0.5 * zMean * zMean);
    pointsMean.push(`${x},${yMean}`);
  }

  const dIndiv = `M 50,${originY} L ` + pointsIndiv.join(" L ") + ` L ${width - 50},${originY}`;
  const dMean = `M ${centerX - 170},${originY} L ` + pointsMean.join(" L ") + ` L ${centerX + 170},${originY}`;

  // Animation de découverte
  const curveGrow = interpolate(frame, [10, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const heresyOpacity = highlightHeresy
    ? interpolate(frame, [30, 60], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  const spcColor = DECISIO_CHROMATIC_PAIRS.tomeX_spc.C;
  const specColor = DECISIO_CHROMATIC_PAIRS.tomeII_desc.C;

  return (
    <div
      style={{
        width,
        height,
        position: "relative",
        opacity: enter,
        backgroundColor: DECISIO_NEUTRALS.codeBg,
        border: `1.5px solid ${DECISIO_NEUTRALS.structural}`,
        borderRadius: 10,
        padding: "16px 20px",
        boxShadow: "0 6px 24px rgba(20, 32, 43, 0.06)",
      }}
    >
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <defs>
          {/* Dégradé sous la courbe normale unitaire */}
          <linearGradient id="curveFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0F6108" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#0F6108" stopOpacity="0.02" />
          </linearGradient>

          {/* Dégradé sous la courbe des moyennes */}
          <linearGradient id="meanFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0E6CAF" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#0E6CAF" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Axe de base X */}
        <line
          x1={40}
          y1={originY}
          x2={width - 40}
          y2={originY}
          stroke={DECISIO_NEUTRALS.axesLines}
          strokeWidth={2}
        />

        {/* Ligne médiane (Moyenne mu) */}
        <line
          x1={centerX}
          y1={50}
          x2={centerX}
          y2={originY}
          stroke={DECISIO_NEUTRALS.textSecondary}
          strokeWidth={2}
          strokeDasharray="5 5"
        />
        <text
          x={centerX}
          y={originY + 34}
          textAnchor="middle"
          fontFamily={DECISIO_FONTS.serif}
          fontSize={24}
          fontWeight={600}
          fill={DECISIO_NEUTRALS.textMain}
        >
          Cible μ
        </text>

        {/* Courbe unitaire X (pièces individuelles) */}
        <g style={{ opacity: curveGrow }}>
          <path d={dIndiv} fill="url(#curveFill)" />
          <path
            d={`M 50,${originY} L ` + pointsIndiv.join(" L ")}
            fill="none"
            stroke="#14202B"
            strokeWidth={3}
          />
        </g>

        {/* Limites Naturelles 6-sigma du Procédé (UNTL / LNTL) */}
        <g stroke={DECISIO_NEUTRALS.textSecondary} strokeWidth={2} strokeDasharray="4 4">
          <line x1={lntlX} y1={90} x2={lntlX} y2={originY} />
          <line x1={untlX} y1={90} x2={untlX} y2={originY} />
        </g>
        <text
          x={lntlX}
          y={originY + 30}
          textAnchor="middle"
          fontFamily={DECISIO_FONTS.code}
          fontSize={20}
          fontWeight={600}
          fill={DECISIO_NEUTRALS.textSecondary}
        >
          LNTL (μ − 3σ)
        </text>
        <text
          x={untlX}
          y={originY + 30}
          textAnchor="middle"
          fontFamily={DECISIO_FONTS.code}
          fontSize={20}
          fontWeight={600}
          fill={DECISIO_NEUTRALS.textSecondary}
        >
          UNTL (μ + 3σ)
        </text>

        {/* Double flèche largeur naturelle 6 sigma */}
        <g>
          <line
            x1={lntlX}
            y1={115}
            x2={untlX}
            y2={115}
            stroke={DECISIO_NEUTRALS.textSecondary}
            strokeWidth={2}
          />
          <circle cx={lntlX} cy={115} r={4} fill={DECISIO_NEUTRALS.textSecondary} />
          <circle cx={untlX} cy={115} r={4} fill={DECISIO_NEUTRALS.textSecondary} />
          <rect
            x={centerX - 170}
            y={98}
            width={340}
            height={34}
            fill={DECISIO_NEUTRALS.white}
            rx={6}
            stroke={DECISIO_NEUTRALS.structural}
            strokeWidth={1.5}
          />
          <text
            x={centerX}
            y={122}
            textAnchor="middle"
            fontFamily={DECISIO_FONTS.serif}
            fontSize={20}
            fontWeight={600}
            fill={DECISIO_NEUTRALS.textMain}
          >
            Voix du Procédé : 6σ (99,73 % du flux)
          </text>
        </g>

        {/* Spécifications Client (LSL / USL) */}
        <g>
          <line
            x1={lslX}
            y1={30}
            x2={lslX}
            y2={originY}
            stroke={specColor}
            strokeWidth={3}
          />
          <line
            x1={uslX}
            y1={30}
            x2={uslX}
            y2={originY}
            stroke={specColor}
            strokeWidth={3}
          />
          {/* Double flèche IT client */}
          <line
            x1={lslX}
            y1={42}
            x2={uslX}
            y2={42}
            stroke={specColor}
            strokeWidth={2.5}
          />
          <circle cx={lslX} cy={42} r={5} fill={specColor} />
          <circle cx={uslX} cy={42} r={5} fill={specColor} />
          <rect
            x={centerX - 180}
            y={24}
            width={360}
            height={36}
            fill={DECISIO_CHROMATIC_PAIRS.tomeII_desc.F}
            rx={6}
            stroke={specColor}
            strokeWidth={1.5}
          />
          <text
            x={centerX}
            y={49}
            textAnchor="middle"
            fontFamily={DECISIO_FONTS.code}
            fontSize={20}
            fontWeight={600}
            fill={specColor}
          >
            Voix du Client : IT = USL − LSL
          </text>
          <text
            x={lslX}
            y={originY + 62}
            textAnchor="middle"
            fontFamily={DECISIO_FONTS.code}
            fontSize={22}
            fontWeight={600}
            fill={specColor}
          >
            LSL (Client)
          </text>
          <text
            x={uslX}
            y={originY + 62}
            textAnchor="middle"
            fontFamily={DECISIO_FONTS.code}
            fontSize={22}
            fontWeight={600}
            fill={specColor}
          >
            USL (Client)
          </text>
        </g>

        {/* Courbe des moyennes de sous-groupes (n=4) & Limites Shewhart UCL / LCL */}
        {showControlLimits && (
          <g style={{ opacity: curveGrow }}>
            <path d={dMean} fill="url(#meanFill)" />
            <path
              d={`M ${centerX - 170},${originY} L ` + pointsMean.join(" L ")}
              fill="none"
              stroke="#0E6CAF"
              strokeWidth={2.5}
              strokeDasharray="7 4"
            />
            {/* Lignes de contrôle UCL / LCL */}
            <line
              x1={lclX}
              y1={160}
              x2={lclX}
              y2={originY}
              stroke={spcColor}
              strokeWidth={2.5}
            />
            <line
              x1={uclX}
              y1={160}
              x2={uclX}
              y2={originY}
              stroke={spcColor}
              strokeWidth={2.5}
            />
            <rect
              x={lclX - 58}
              y={172}
              width={116}
              height={30}
              fill={DECISIO_CHROMATIC_PAIRS.tomeX_spc.F}
              rx={4}
              stroke={spcColor}
              strokeWidth={1.5}
            />
            <text
              x={lclX}
              y={194}
              textAnchor="middle"
              fontFamily={DECISIO_FONTS.code}
              fontSize={18}
              fontWeight={600}
              fill={spcColor}
            >
              LCL (X̄)
            </text>
            <rect
              x={uclX - 58}
              y={172}
              width={116}
              height={30}
              fill={DECISIO_CHROMATIC_PAIRS.tomeX_spc.F}
              rx={4}
              stroke={spcColor}
              strokeWidth={1.5}
            />
            <text
              x={uclX}
              y={194}
              textAnchor="middle"
              fontFamily={DECISIO_FONTS.code}
              fontSize={18}
              fontWeight={600}
              fill={spcColor}
            >
              UCL (X̄)
            </text>
          </g>
        )}

        {/* Message d'hérésie didactique si activé */}
        {highlightHeresy && (
          <g style={{ opacity: heresyOpacity }}>
            <rect
              x={centerX - 460}
              y={235}
              width={920}
              height={60}
              rx={8}
              fill="#FFF0F0"
              stroke={specColor}
              strokeWidth={2.5}
            />
            <text
              x={centerX}
              y={273}
              textAnchor="middle"
              fontFamily={DECISIO_FONTS.serif}
              fontSize={24}
              fontWeight={600}
              fill={specColor}
            >
              ⚠️ HÉRÉSIE MÉTHODOLOGIQUE : Ne JAMAIS tracer USL/LSL sur une carte de contrôle X̄ !
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};
