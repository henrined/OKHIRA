export type PlatformType =
  | "tiktok_bio"
  | "tiktok_pub_bouton"
  | "instagram_reels"
  | "facebook"
  | "facebook_instagram_pub"
  | "youtube_shorts";

export interface WordTiming {
  text: string;
  startMs: number;
  endMs: number;
}

export interface PhraseTiming {
  texte: string;
  startMs: number;
  endMs: number;
  mots: WordTiming[];
}

export interface PauseTiming {
  startMs: number;
  endMs: number;
}

export interface VoiceRythme {
  duree_ms: number;
  son_debut_ms: number;
  son_fin_ms: number;
  fiabilite_decoupage_phrases?: string;
  pauses: PauseTiming[];
  phrases: PhraseTiming[];
}

export interface SceneTiming {
  id: string;
  voiceKey: string;
  voiceFile: string;
  title: string;
  voiceSec: number;
  voiceFrames: number;
  pauseSec: number;
  pauseFrames: number;
  durationSec: number;
  durationFrames: number;
  startSec: number;
  startFrame: number;
  endSec: number;
  endFrame: number;
}
