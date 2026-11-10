#!/bin/bash
set -e

cd /data/data/com.termux/files/home/mon-motion/public/scwb

VOIX_DIR="voix"
OUT_DIR="."

# Precise delays matching the Remotion frames (76 frames, 245 frames, 606 frames, 767 frames @ 30 fps)
D0=0
D1=2533
D2=8167
D3=20200
D4=25567
TOTAL_DUR=29.03

echo "=== 1. Building 30s voice track ==="
ffmpeg -y \
  -i "${VOIX_DIR}/s1.mp3" \
  -i "${VOIX_DIR}/s2.mp3" \
  -i "${VOIX_DIR}/s5.mp3" \
  -i "${VOIX_DIR}/s7.mp3" \
  -i "${VOIX_DIR}/s8_facebook.mp3" \
  -filter_complex "\
[0]adelay=${D0}|${D0}[v0];\
[1]adelay=${D1}|${D1}[v1];\
[2]adelay=${D2}|${D2}[v2];\
[3]adelay=${D3}|${D3}[v3];\
[4]adelay=${D4}|${D4}[v4];\
[v0][v1][v2][v3][v4]amix=inputs=5:duration=longest:normalize=0[voix]" \
  -map "[voix]" -ar 44100 -b:a 192k \
  "${OUT_DIR}/voix_30s_facebook.mp3"

echo "=== 2. Mixing with background music and 2s fadeout at the end ==="
# Music is cut at 29.03s with a 2-second afade out from 27.03s to 29.03s
ffmpeg -y \
  -i "${OUT_DIR}/voix_30s_facebook.mp3" \
  -i "${OUT_DIR}/musique.mp3" \
  -filter_complex "\
[1]volume=0.12,atrim=0:29.05,afade=t=out:st=27.0:d=2.0[bg];\
[0][bg]amix=inputs=2:duration=first:normalize=0[out]" \
  -map "[out]" -ar 44100 -b:a 192k \
  "${OUT_DIR}/audio_mix_30s.mp3"

echo "=== Verification ==="
echo -n "Audio 30s mix duration: "
ffprobe -v quiet -show_entries format=duration -of csv=p=0 "${OUT_DIR}/audio_mix_30s.mp3"
