import dureesData from "../public/voix/durees.json";
import rythmeData from "../public/voix/rythme_final.json";
import { PlatformType, SceneTiming, VoiceRythme } from "./types";

export const FPS = 30;
export const PAUSE_SEC = 0.3; // 0.3s pause between scenes
export const TRANSITION_FRAMES = 9; // 0.3s * 30 fps = 9 frames

// Default target platform (can be changed to any supported PlatformType)
export const DEFAULT_PLATFORM: PlatformType = "tiktok_bio";

interface RawDureeEntry {
  duree_originale: number;
  duree_nette: number;
  lufs_avant: number;
  gain_db: number;
}

const dureesRecord = dureesData as Record<string, RawDureeEntry>;
const rythmeRecord = rythmeData as Record<string, VoiceRythme>;

export const getRythme = (key: string): VoiceRythme => {
  const data = rythmeRecord[key];
  if (!data) {
    throw new Error(`Rythme data not found for key: ${key}`);
  }
  return data;
};

export const getSceneTimings = (platform: PlatformType = DEFAULT_PLATFORM): SceneTiming[] => {
  const scenesConfig = [
    { id: "scene1", voiceKey: "s1", voiceFile: "s1.mp3", title: "L'accroche" },
    { id: "scene2", voiceKey: "s2", voiceFile: "s2.mp3", title: "Le silence" },
    { id: "scene3", voiceKey: "s3", voiceFile: "s3.mp3", title: "La course perdue" },
    { id: "scene4", voiceKey: "s4", voiceFile: "s4.mp3", title: "Le constat" },
    { id: "scene5", voiceKey: "s5", voiceFile: "s5.mp3", title: "La solution" },
    { id: "scene6", voiceKey: "s6", voiceFile: "s6.mp3", title: "La preuve" },
    { id: "scene7", voiceKey: "s7", voiceFile: "s7.mp3", title: "Le prix" },
    {
      id: "scene8",
      voiceKey: `s8_${platform}`,
      voiceFile: `s8_${platform}.mp3`,
      title: "Appel à l'action",
    },
  ];

  let currentFrame = 0;
  return scenesConfig.map((sc) => {
    const raw = dureesRecord[sc.voiceKey];
    const voiceSec = raw ? raw.duree_nette : 3.0;
    const voiceFrames = Math.round(voiceSec * FPS);
    const pauseFrames = Math.round(PAUSE_SEC * FPS); // 9 frames
    const durationFrames = voiceFrames + pauseFrames;
    const durationSec = durationFrames / FPS;

    const startFrame = currentFrame;
    const startSec = startFrame / FPS;
    const endFrame = startFrame + durationFrames;
    const endSec = endFrame / FPS;

    currentFrame = endFrame;

    return {
      id: sc.id,
      voiceKey: sc.voiceKey,
      voiceFile: sc.voiceFile,
      title: sc.title,
      voiceSec,
      voiceFrames,
      pauseSec: PAUSE_SEC,
      pauseFrames,
      durationSec,
      durationFrames,
      startSec,
      startFrame,
      endSec,
      endFrame,
    };
  });
};

export const getTotalDurationFrames = (
  platform: PlatformType = DEFAULT_PLATFORM
): number => {
  const timings = getSceneTimings(platform);
  const lastScene = timings[timings.length - 1];
  return lastScene.endFrame;
};
