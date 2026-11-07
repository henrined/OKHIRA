import { loadFont } from "@remotion/google-fonts/PlusJakartaSans";

const { fontFamily } = loadFont("normal", {
  weights: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin", "latin-ext"],
});

export const FONTS = {
  main: fontFamily,
};

export const COLORS = {
  white: "#FFFFFF",
  cream: "#F7F6F2",
  deepTeal: "#0B3D3E",
  midTeal: "#0F5C57",
  lightTeal: "#DDEFEC",
  gold: "#D4AF37",
  // Dark mode exclusive to Scene 7
  darkBg: "#061A1B",
  darkSurface: "#0B2D2E",
  // Accents
  whatsappGreen: "#25D366",
  alertRed: "#E74C3C",
};

export const SAFE_ZONES = {
  top: 140,
  bottom: 220,
  left: 60,
  right: 60,
};
