/**
 * CAP-01-02 — « Deux univers mathématiques étanches »
 * Scène Remotion refaite : le graphique est construit pas à pas, au rythme de la voix.
 *
 * Ce qui change par rapport à la slide d'origine :
 *  - le graphique occupe ~60 % de l'écran et se construit en 4 temps (client, procédé, moyennes, hérésie) ;
 *  - plus aucun libellé ne tombe sur une courbe : titres de limites sous l'axe, LSL/USL à l'extérieur ;
 *  - le bandeau « hérésie » sort du graphique et n'arrive qu'à la fin ;
 *  - la légende « Courbe noire / Courbe bleue » est intégrée à la clé de lecture, en gros caractères ;
 *  - en-tête réduit à une ligne, textes ≥ 26 px, contrastes ≥ 6:1.
 *
 * Synchronisation avec la voix : modifiez uniquement `beats` (en secondes, depuis le début de la scène).
 */
import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/SourceSerif4";

const SUBSETS = ["latin", "latin-ext", "greek"] as const;
const { fontFamily: SERIF } = loadFont("normal", {
  weights: ["400", "600", "700"],
  subsets: [...SUBSETS],
});
loadFont("italic", { weights: ["400", "600"], subsets: [...SUBSETS] });

/* ───────────────────────── Jetons de design ───────────────────────── */

export const C = {
  paper: "#FFFFFF",
  ink: "#16231B",
  muted: "#4A5A50",
  rule: "#C9D3CC",
  client: "#A31621", // voix du client : LSL / USL
  natural: "#3D4852", // limites naturelles : LNTL / UNTL
  control: "#1B6B35", // limites de contrôle : LCL / UCL
  means: "#1D5FA8", // courbe des moyennes
  warnBg: "#FBEDED",
} as const;

export type Beats = {
  /** Apparition de la voix du client (LSL / USL). */
  client: number;
  /** Courbe des pièces + limites naturelles. */
  process: number;
  /** Courbe des moyennes + limites de contrôle. */
  means: number;
  /** Bandeau « hérésie méthodologique ». */
  heresy: number;
};

export const defaultBeats: Beats = { client: 2.5, process: 16.5, means: 30.0, heresy: 43.5 };
export const SCENE_SECONDS = 54.3;

/* ───────────────────── Géométrie du graphique (viewBox) ───────────────────── */

const VB_W = 1200;
const VB_H = 700;
const BASE = 500; // ordonnée de l'axe
const MU = 600; // cible
const SIGMA = 110; // écart-type des pièces (px)
const N = 4; // taille de sous-groupe illustrée
const SIGMA_MEAN = SIGMA / Math.sqrt(N); // σ/√n
const H_PIECES = 190;
const H_MEANS = H_PIECES * Math.sqrt(N); // même aire → hauteur ×√n
const SPEC = 375; // demi-tolérance client (px)
const NAT = 3 * SIGMA; // ±3σ
const CTRL = 3 * SIGMA_MEAN; // ±3σ/√n
const SPEC_TOP = 78; // hauteur du bracket « tolérance »

const gauss = (x: number, sigma: number, h: number) =>
  BASE - h * Math.exp(-((x - MU) ** 2) / (2 * sigma ** 2));

/** Demi-largeur utile d'une courbe : au-delà de ±4,2σ elle colle à l'axe et n'apporte rien. */
const halfRange = (sigma: number) => sigma * 4.2;

const curvePath = (sigma: number, h: number) => {
  const r = halfRange(sigma);
  const pts: string[] = [];
  for (let x = MU - r; x <= MU + r; x += 2) pts.push(`${x.toFixed(0)},${gauss(x, sigma, h).toFixed(1)}`);
  return `M${pts.join(" L")}`;
};
const areaPath = (sigma: number, h: number) => {
  const r = halfRange(sigma);
  return `${curvePath(sigma, h)} L${MU + r},${BASE} L${MU - r},${BASE} Z`;
};

const ease = Easing.bezier(0.22, 1, 0.36, 1);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Symbole « X barre » : décoration en ligne, plus fiable qu'un diacritique combinant. */
const Xbar: React.FC = () => <span style={{ textDecoration: "overline" }}>X</span>;

/* ───────────────────── Graphique (pur, sans hook Remotion) ───────────────────── */

export type ChartProgress = {
  client: number; // 0 → 1
  process: number;
  means: number;
  pulse: number; // 0 → 1, accentue les lignes rouges au moment de l'hérésie
};

export const ChartSvg: React.FC<{ p: ChartProgress }> = ({ p }) => {
  const fade = (from: number, to: number, v: number) =>
    interpolate(v, [from, to], [0, 1], clamp);

  const pulseW = 5 + 5 * p.pulse;
  const specX1 = MU - SPEC;
  const specX2 = MU + SPEC;

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      width="100%"
      height="100%"
      style={{ fontFamily: SERIF, overflow: "visible" }}
    >
      <defs>
        <linearGradient id="gPieces" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.ink} stopOpacity="0.14" />
          <stop offset="1" stopColor={C.ink} stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id="gMeans" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.means} stopOpacity="0.26" />
          <stop offset="1" stopColor={C.means} stopOpacity="0.03" />
        </linearGradient>
        {/* La courbe « gonfle » depuis le centre : le pic apparaît en premier. */}
        <clipPath id="revealPieces">
          <rect x={MU - halfRange(SIGMA) * p.process} y="0" width={2 * halfRange(SIGMA) * p.process} height={VB_H} />
        </clipPath>
        <clipPath id="revealMeans">
          <rect x={MU - halfRange(SIGMA_MEAN) * p.means} y="0" width={2 * halfRange(SIGMA_MEAN) * p.means} height={VB_H} />
        </clipPath>
      </defs>

      {/* Axe */}
      <line x1="60" y1={BASE} x2="1140" y2={BASE} stroke={C.ink} strokeWidth="3" />

      {/* ── 1. Voix du client ── */}
      <g>
        {[specX1, specX2].map((x) => (
          <line
            key={x}
            x1={x}
            x2={x}
            y1={BASE}
            y2={BASE - (BASE - SPEC_TOP) * p.client}
            stroke={C.client}
            strokeWidth={pulseW}
            strokeLinecap="round"
          />
        ))}
        {/* bracket de tolérance, qui s'ouvre depuis le centre */}
        <line
          x1={MU - SPEC * p.client}
          x2={MU + SPEC * p.client}
          y1={SPEC_TOP}
          y2={SPEC_TOP}
          stroke={C.client}
          strokeWidth="4"
        />
        <text
          x={MU}
          y={SPEC_TOP - 22}
          textAnchor="middle"
          fontSize="32"
          fontWeight="600"
          fill={C.client}
          opacity={fade(0.55, 0.95, p.client)}
        >
          Voix du client : IT = USL − LSL
        </text>
        {/* LSL / USL à l'extérieur des lignes : jamais sur une courbe */}
        <g opacity={fade(0.6, 1, p.client)} fill={C.client}>
          <text x={specX1 - 16} y={BASE - 64} textAnchor="end" fontSize="34" fontWeight="700">
            LSL
          </text>
          <text x={specX1 - 16} y={BASE - 30} textAnchor="end" fontSize="26">
            (client)
          </text>
          <text x={specX2 + 16} y={BASE - 64} textAnchor="start" fontSize="34" fontWeight="700">
            USL
          </text>
          <text x={specX2 + 16} y={BASE - 30} textAnchor="start" fontSize="26">
            (client)
          </text>
        </g>
      </g>

      {/* ── 2. Voix du procédé : pièces individuelles ── */}
      <g>
        <g clipPath="url(#revealPieces)">
          <path d={areaPath(SIGMA, H_PIECES)} fill="url(#gPieces)" />
          <path d={curvePath(SIGMA, H_PIECES)} fill="none" stroke={C.ink} strokeWidth="4" />
        </g>
        <g opacity={fade(0.45, 0.85, p.process)}>
          <line x1={MU} x2={MU} y1={BASE} y2={BASE - H_PIECES - 14} stroke={C.muted} strokeWidth="2" strokeDasharray="3 7" />
          {[MU - NAT, MU + NAT].map((x) => (
            <line key={x} x1={x} x2={x} y1={BASE + 12} y2={BASE - 210} stroke={C.natural} strokeWidth="4" strokeDasharray="12 9" />
          ))}
        </g>
        <g opacity={fade(0.6, 1, p.process)}>
          <TickLabel x={MU - NAT} name="LNTL" formula="μ − 3σ" color={C.natural} />
          <TickLabel x={MU} name="Cible" formula="μ" color={C.ink} />
          <TickLabel x={MU + NAT} name="UNTL" formula="μ + 3σ" color={C.natural} />
          {/* bracket 6σ sous l'axe : n'entre en collision avec aucune courbe */}
          <line x1={MU - NAT * p.process} x2={MU + NAT * p.process} y1={BASE + 126} y2={BASE + 126} stroke={C.natural} strokeWidth="4" />
          <line x1={MU - NAT} x2={MU - NAT} y1={BASE + 114} y2={BASE + 138} stroke={C.natural} strokeWidth="4" />
          <line x1={MU + NAT} x2={MU + NAT} y1={BASE + 114} y2={BASE + 138} stroke={C.natural} strokeWidth="4" />
          <text x={MU} y={BASE + 180} textAnchor="middle" fontSize="32" fontWeight="600" fill={C.natural}>
            Voix du procédé : 6σ, soit 99,73 % du flux
          </text>
        </g>
      </g>

      {/* ── 3. Moyennes de sous-groupes ── */}
      <g>
        <g clipPath="url(#revealMeans)">
          <path d={areaPath(SIGMA_MEAN, H_MEANS)} fill="url(#gMeans)" />
          <path d={curvePath(SIGMA_MEAN, H_MEANS)} fill="none" stroke={C.means} strokeWidth="4.5" strokeDasharray="14 8" />
        </g>
        <g opacity={fade(0.5, 0.9, p.means)}>
          {[MU - CTRL, MU + CTRL].map((x) => (
            <line key={x} x1={x} x2={x} y1={BASE + 12} y2={BASE - 120} stroke={C.control} strokeWidth="5" />
          ))}
        </g>
        <g opacity={fade(0.6, 1, p.means)}>
          <TickLabel x={MU - CTRL} name="LCL" formula="μ − 3σ/√n" color={C.control} />
          <TickLabel x={MU + CTRL} name="UCL" formula="μ + 3σ/√n" color={C.control} />
        </g>
      </g>
    </svg>
  );
};

const TickLabel: React.FC<{ x: number; name: string; formula: string; color: string }> = ({
  x,
  name,
  formula,
  color,
}) => (
  <g>
    <line x1={x} x2={x} y1={BASE} y2={BASE + 14} stroke={color} strokeWidth="3" />
    <text x={x} y={BASE + 50} textAnchor="middle" fontSize="32" fontWeight="700" fill={color}>
      {name}
    </text>
    <text x={x} y={BASE + 84} textAnchor="middle" fontSize="26" fontStyle="italic" fill={color}>
      {formula}
    </text>
  </g>
);

/* ───────────────────────────── Scène ───────────────────────────── */

const Sample: React.FC<{ color: string; dashed?: boolean }> = ({ color, dashed }) => (
  <svg width="48" height="14" style={{ flex: "none" }}>
    <line x1="0" y1="7" x2="48" y2="7" stroke={color} strokeWidth="4" strokeDasharray={dashed ? "10 6" : undefined} />
  </svg>
);

type Row = {
  color: string;
  title: string;
  body: React.ReactNode;
  extra: React.ReactNode;
  at: number;
};

export const ToleranceChartScene: React.FC<{ beats?: Beats }> = ({ beats = defaultBeats }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const prog = (startSec: number, durSec: number) =>
    interpolate(frame, [startSec * fps, (startSec + durSec) * fps], [0, 1], { ...clamp, easing: ease });

  const client = prog(beats.client, 2.4);
  const process = prog(beats.process, 3.4);
  const means = prog(beats.means, 3.4);

  // Une seule impulsion sur les lignes rouges quand l'hérésie est énoncée.
  const sinceHeresy = frame - beats.heresy * fps;
  const pulse =
    sinceHeresy < 0 ? 0 : Math.max(0, Math.sin(sinceHeresy / 5) * Math.exp(-sinceHeresy / 45));

  const intro = interpolate(frame, [0, 14], [0, 1], { ...clamp, easing: ease });
  const bannerIn = Math.max(0, spring({ frame: sinceHeresy, fps, config: { damping: 16, stiffness: 110 } }));

  const rows: Row[] = [
    {
      color: C.client,
      title: "LSL / USL",
      body: (
        <>
          Spécifications client, appliquées à chaque <b>pièce individuelle</b>.
        </>
      ),
      extra: <>Ce que le client désire, fixé par contrat.</>,
      at: beats.client + 1.2,
    },
    {
      color: C.natural,
      title: "LNTL / UNTL",
      body: (
        <>
          Limites naturelles 6σ du procédé : elles englobent <b>99,73 %</b> du flux.
        </>
      ),
      extra: (
        <>
          <Sample color={C.ink} /> Courbe noire : pièces <i>X</i> ~ N(μ, σ²)
        </>
      ),
      at: beats.process + 1.4,
    },
    {
      color: C.control,
      title: "LCL / UCL",
      body: (
        <>
          Limites de Shewhart, appliquées aux <b>moyennes</b> de sous-groupes.
        </>
      ),
      extra: (
        <>
          <Sample color={C.means} dashed /> Courbe bleue : moyennes <Xbar /> ~ N(μ, σ²/n)
        </>
      ),
      at: beats.means + 1.4,
    },
  ];

  const activeIndex = frame >= beats.means * fps ? 2 : frame >= beats.process * fps ? 1 : frame >= beats.client * fps ? 0 : -1;

  return (
    <AbsoluteFill style={{ background: C.paper, fontFamily: SERIF, color: C.ink }}>
      {/* En-tête réduit à une ligne */}
      <div style={{ position: "absolute", left: 80, right: 80, top: 38, display: "flex", justifyContent: "space-between", fontSize: 26, color: C.muted, opacity: intro }}>
        <span>
          <b style={{ color: C.control, fontWeight: 600 }}>Module 01</b> – Fondations de la variabilité
        </span>
        <span>ISO 22514-1 / ISO 7870-1</span>
      </div>
      <div style={{ position: "absolute", left: 80, right: 80, top: 86, height: 2, background: C.control, opacity: intro }} />

      <h1
        style={{
          position: "absolute",
          left: 80,
          top: 112,
          margin: 0,
          fontSize: 64,
          lineHeight: 1.1,
          fontWeight: 700,
          color: C.control,
          opacity: intro,
          transform: `translateY(${(1 - intro) * 14}px)`,
        }}
      >
        Deux univers mathématiques étanches
      </h1>

      {/* Graphique : le héros de la scène */}
      <div style={{ position: "absolute", left: 80, top: 212, width: 1130, height: 660 }}>
        <ChartSvg p={{ client, process, means, pulse }} />
      </div>

      {/* Clé de lecture, révélée en même temps que le graphique */}
      <div style={{ position: "absolute", left: 1262, top: 222, width: 578, display: "flex", flexDirection: "column", gap: 22 }}>
        {rows.map((r, i) => {
          const t = interpolate(frame, [r.at * fps, r.at * fps + 18], [0, 1], { ...clamp, easing: ease });
          const active = i === activeIndex;
          return (
            <div
              key={r.title}
              style={{
                opacity: t,
                transform: `translateX(${(1 - t) * 18}px)`,
                borderLeft: `6px solid ${r.color}`,
                padding: "10px 0 12px 22px",
                background: active ? "#F3F6F4" : "transparent",
              }}
            >
              <div style={{ fontSize: 38, fontWeight: 700, color: r.color, lineHeight: 1.15 }}>{r.title}</div>
              <div style={{ fontSize: 29, lineHeight: 1.32, marginTop: 4 }}>{r.body}</div>
              <div style={{ fontSize: 26, lineHeight: 1.3, marginTop: 6, color: C.muted, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                {r.extra}
              </div>
            </div>
          );
        })}
      </div>

      {/* Avertissement : hors du graphique, une seule fois, à la fin */}
      <div
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          top: 906,
          height: 92,
          display: "flex",
          alignItems: "center",
          gap: 24,
          padding: "0 32px",
          background: C.warnBg,
          borderLeft: `8px solid ${C.client}`,
          opacity: Math.min(1, bannerIn * 1.4),
          transform: `translateY(${(1 - bannerIn) * 24}px)`,
        }}
      >
        <svg width="44" height="44" viewBox="0 0 44 44" style={{ flex: "none" }}>
          <path d="M22 4 L41 38 H3 Z" fill="none" stroke={C.client} strokeWidth="4" strokeLinejoin="round" />
          <line x1="22" y1="16" x2="22" y2="27" stroke={C.client} strokeWidth="4" strokeLinecap="round" />
          <circle cx="22" cy="33" r="2.4" fill={C.client} />
        </svg>
        <div style={{ fontSize: 36, lineHeight: 1.2, color: C.client }}>
          <b>Hérésie méthodologique</b> : ne jamais tracer USL / LSL sur une carte de contrôle <Xbar />.
        </div>
      </div>
    </AbsoluteFill>
  );
};
