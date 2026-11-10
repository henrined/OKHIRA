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
  const width = 1100;
  const height = 440;
  const originY = 360;
  const centerX = width / 2; // mu = 550

  // Échelle graphique : 1 sigma = 70px
  const sigmaIndiv = 70;
  const sigmaBar = sigmaIndiv / Math.sqrt(4); // n = 4, sigma / 2 = 35px

  // Tolérances client (IT = USL - LSL = 6.8 * sigma = 476px)
  const lslX = centerX - 238; // -3.4 sigma
  const uslX = centerX + 238; // +3.4 sigma

  // Limites naturelles individuelles (3 sigma = 210px)
  const lntlX = centerX - 3 * sigmaIndiv;
  const untlX = centerX + 3 * sigmaIndiv;

  // Limites de contrôle sur moyennes (3 sigma / sqrt(n) = 105px)
  const lclX = centerX - 3 * sigmaBar;
  const uclX = centerX + 3 * sigmaBar;

  // Tracé de la courbe normale unitaire f(x)
  const pointsIndiv: string[] = [];
  const pointsMean: string[] = [];
  const steps = 140;

  for (let i = 0; i <= steps; i++) {
    const x = 50 + (i / steps) * (width - 100);
    const zIndiv = (x - centerX) / sigmaIndiv;
    const yIndiv = originY - 260 * Math.exp(-0.5 * zIndiv * zIndiv);
    pointsIndiv.push(`${x},${yIndiv}`);

    const zMean = (x - centerX) / sigmaBar;
    const yMean = originY - 330 * Math.exp(-0.5 * zMean * zMean);
    pointsMean.push(`${x},${yMean}`);
  }

  const dIndiv = `M 50,${originY} L ` + pointsIndiv.join(" L ") + ` L ${width - 50},${originY}`;
  const dMean = `M ${centerX - 160},${originY} L ` + pointsMean.join(" L ") + ` L ${centerX + 160},${originY}`;

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
        border: `1px solid ${DECISIO_NEUTRALS.structural}`,
        borderRadius: 8,
        padding: "16px 20px",
        boxShadow: "0 4px 20px rgba(20, 32, 43, 0.05)",
      }}
    >
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <defs>
          {/* Dégradé sous la courbe normale unitaire */}
          <linearGradient id="curveFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0F6108" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#0F6108" stopOpacity="0.01" />
          </linearGradient>

          {/* Dégradé sous la courbe des moyennes */}
          <linearGradient id="meanFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0E6CAF" stopOpacity="0.22" />
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
          strokeWidth={1.5}
        />

        {/* Ligne médiane (Moyenne mu) */}
        <line
          x1={centerX}
          y1={60}
          x2={centerX}
          y2={originY}
          stroke={DECISIO_NEUTRALS.textSecondary}
          strokeWidth={1.5}
          strokeDasharray="4 4"
        />
        <text
          x={centerX}
          y={originY + 28}
          textAnchor="middle"
          fontFamily={DECISIO_FONTS.serif}
          fontSize={16}
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
            strokeWidth={2.5}
          />
        </g>

        {/* Limites Naturelles 6-sigma du Procédé (UNTL / LNTL) */}
        <g stroke={DECISIO_NEUTRALS.textSecondary} strokeWidth={1.5} strokeDasharray="3 3">
          <line x1={lntlX} y1={100} x2={lntlX} y2={originY} />
          <line x1={untlX} y1={100} x2={untlX} y2={originY} />
        </g>
        <text
          x={lntlX}
          y={originY + 24}
          textAnchor="middle"
          fontFamily={DECISIO_FONTS.code}
          fontSize={13}
          fill={DECISIO_NEUTRALS.textSecondary}
        >
          LNTL (μ - 3σ)
        </text>
        <text
          x={untlX}
          y={originY + 24}
          textAnchor="middle"
          fontFamily={DECISIO_FONTS.code}
          fontSize={13}
          fill={DECISIO_NEUTRALS.textSecondary}
        >
          UNTL (μ + 3σ)
        </text>

        {/* Double flèche largeur naturelle 6 sigma */}
        <g>
          <line
            x1={lntlX}
            y1={120}
            x2={untlX}
            y2={120}
            stroke={DECISIO_NEUTRALS.textSecondary}
            strokeWidth={1.5}
          />
          <circle cx={lntlX} cy={120} r={3} fill={DECISIO_NEUTRALS.textSecondary} />
          <circle cx={untlX} cy={120} r={3} fill={DECISIO_NEUTRALS.textSecondary} />
          <rect
            x={centerX - 130}
            y={106}
            width={260}
            height={26}
            fill={DECISIO_NEUTRALS.white}
            rx={4}
            stroke={DECISIO_NEUTRALS.structural}
          />
          <text
            x={centerX}
            y={124}
            textAnchor="middle"
            fontFamily={DECISIO_FONTS.serif}
            fontSize={14}
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
            y1={40}
            x2={lslX}
            y2={originY}
            stroke={specColor}
            strokeWidth={2.5}
          />
          <line
            x1={uslX}
            y1={40}
            x2={uslX}
            y2={originY}
            stroke={specColor}
            strokeWidth={2.5}
          />
          {/* Double flèche IT client */}
          <line
            x1={lslX}
            y1={50}
            x2={uslX}
            y2={50}
            stroke={specColor}
            strokeWidth={1.8}
          />
          <circle cx={lslX} cy={50} r={4} fill={specColor} />
          <circle cx={uslX} cy={50} r={4} fill={specColor} />
          <rect
            x={centerX - 140}
            y={36}
            width={280}
            height={28}
            fill={DECISIO_CHROMATIC_PAIRS.tomeII_desc.F}
            rx={4}
            stroke={specColor}
          />
          <text
            x={centerX}
            y={55}
            textAnchor="middle"
            fontFamily={DECISIO_FONTS.code}
            fontSize={14}
            fontWeight={600}
            fill={specColor}
          >
            Voix du Client : IT = USL - LSL
          </text>
          <text
            x={lslX}
            y={originY + 48}
            textAnchor="middle"
            fontFamily={DECISIO_FONTS.code}
            fontSize={14}
            fontWeight={600}
            fill={specColor}
          >
            LSL (Client)
          </text>
          <text
            x={uslX}
            y={originY + 48}
            textAnchor="middle"
            fontFamily={DECISIO_FONTS.code}
            fontSize={14}
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
              d={`M ${centerX - 160},${originY} L ` + pointsMean.join(" L ")}
              fill="none"
              stroke="#0E6CAF"
              strokeWidth={2}
              strokeDasharray="6 3"
            />
            {/* Lignes de contrôle UCL / LCL */}
            <line
              x1={lclX}
              y1={170}
              x2={lclX}
              y2={originY}
              stroke={spcColor}
              strokeWidth={2}
            />
            <line
              x1={uclX}
              y1={170}
              x2={uclX}
              y2={originY}
              stroke={spcColor}
              strokeWidth={2}
            />
            <rect
              x={lclX - 45}
              y={180}
              width={90}
              height={22}
              fill={DECISIO_CHROMATIC_PAIRS.tomeX_spc.F}
              rx={3}
              stroke={spcColor}
            />
            <text
              x={lclX}
              y={196}
              textAnchor="middle"
              fontFamily={DECISIO_FONTS.code}
              fontSize={12}
              fontWeight={600}
              fill={spcColor}
            >
              LCL (X̄)
            </text>
            <rect
              x={uclX - 45}
              y={180}
              width={90}
              height={22}
              fill={DECISIO_CHROMATIC_PAIRS.tomeX_spc.F}
              rx={3}
              stroke={spcColor}
            />
            <text
              x={uclX}
              y={196}
              textAnchor="middle"
              fontFamily={DECISIO_FONTS.code}
              fontSize={12}
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
              x={centerX - 360}
              y={240}
              width={720}
              height={50}
              rx={6}
              fill="#FFF2F2"
              stroke={specColor}
              strokeWidth={2}
            />
            <text
              x={centerX}
              y={272}
              textAnchor="middle"
              fontFamily={DECISIO_FONTS.serif}
              fontSize={18}
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