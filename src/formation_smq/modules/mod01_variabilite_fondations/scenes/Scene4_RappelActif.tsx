import React from "react";
import { AbsoluteFill } from "remotion";
import { DecisioHeader } from "../../../shared/components/DecisioHeader";
import { ActiveRecallBox } from "../../../shared/components/ActiveRecallBox";
import { DECISIO_NEUTRALS } from "../../../shared/theme/decisioTheme";

export const Scene4_RappelActif: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: DECISIO_NEUTRALS.white,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <DecisioHeader
        moduleTitle="Module 01 • Fondations de la Variabilité"
        capsuleTitle="Rappel Actif du Praticien"
        normativeRef="PENSÉE CRITIQUE"
      />

      <div style={{ width: "85%", maxWidth: 1300 }}>
        <ActiveRecallBox
          question="Si une pièce sort à +2σ de la moyenne dans un procédé stable, pourquoi l'action correctrice immédiate sur la machine est-elle une faute professionnelle ?"
          contextHint="Réfléchissez à la différence fondamentale entre réagir à un événement et améliorer un système."
          chromaticPairKey="tomeX_spc"
        />
      </div>
    </AbsoluteFill>
  );
};
