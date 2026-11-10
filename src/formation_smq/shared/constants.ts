export const DECISIO_VIDEO_CONFIG = {
  // Cadence standard
  fps: 30,

  // Résolution Master : 16:9 Full HD standard
  width: 1920,
  height: 1080,

  // Découpage temporel standard (en secondes et frames à 30 fps)
  pauses: {
    interSceneSec: 0.4,       // 12 frames
    afterQuestionSec: 1.5,    // 45 frames pour laisser l'ingénieur réfléchir
    transitionSec: 0.5,       // 15 frames
  },

  // Norme de durée par micro-capsule (en frames)
  // 3 minutes = 5 400 frames, 4 minutes = 7 200 frames
  targetCapsuleFrames: 6300,  // ~3 min 30 s
};
