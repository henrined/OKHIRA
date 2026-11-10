import React from "react";
import { AbsoluteFill } from "remotion";
import { DecisioHeader } from "../../../shared/components/DecisioHeader";
import { ActiveRecallBox } from "../../../shared/components/ActiveRecallBox";
import { DECISIO_NEUTRALS } from "../../../shared/theme/decisioTheme";

export const Cap02Scene5_RappelActif: React.FC = () => {
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
        capsuleTitle="Rappel Actif du Décideur"
        normativeRef="PENSÉE CRITIQUE"
      />

      <div style={{ width: "90%", maxWidth: 1500 }}>
        <ActiveRecallBox
          question="Si un atelier mesure 50 pièces consécutives toutes situées entre LSL et USL, a-t-on la certitude que le procédé est sous contrôle statistique ?"
          contextHint="Distinguez rigoureusement la conformité instantanée du produit et la prévisibilité future du procédé."
          chromaticPairKey="tomeX_spc"
        />
      </div>
    </AbsoluteFill>
  );
};