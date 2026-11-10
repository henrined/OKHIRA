import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  dark?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  dark = false,
}) => {
  return (
    <div
      style={{
        position: "relative",
        background: dark
          ? "rgba(11, 45, 46, 0.75)"
          : "rgba(255, 255, 255, 0.88)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderRadius: 28,
        border: dark
          ? "1px solid rgba(212, 175, 55, 0.25)"
          : `1px solid rgba(221, 239, 236, 0.85)`,
        boxShadow: dark
          ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
          : "0 20px 45px -10px rgba(11, 61, 62, 0.12), 0 4px 12px rgba(0, 0, 0, 0.03)",
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
