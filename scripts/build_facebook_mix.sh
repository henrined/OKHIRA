#!/bin/bash
set -e

cd "$(dirname "$0")/../public/scwb"

VOIX_DIR="voix"
OUT_DIR="."
PAUSE_MS=300

# Start offsets in ms (computed from durees.json duree_nette + 300ms pauses)
# s1: 0ms, s2: 2560ms, s3: 8240ms, s4: 15760ms, s5: 20720ms, s6: 32800ms, s7: 36770ms, s8: 42180ms
S1_DELAY=0
S2_DELAY=2560
S3_DELAY=8240
S4_DELAY=15760
S5_DELAY=20720
S6_DELAY=32800
S7_DELAY=36770
S8_DELAY=42180

echo "=== Building Facebook voice track ==="

# Create voice track with proper delays
ffmpeg -y \
    -i "${VOIX_DIR}/s1.mp3" \
    -i "${VOIX_DIR}/s2.mp3" \
    -i "${VOIX_DIR}/s3.mp3" \
    -i "${VOIX_DIR}/s4.mp3" \
    -i "${VOIX_DIR}/s5.mp3" \
    -i "${VOIX_DIR}/s6.mp3" \
    -i "${VOIX_DIR}/s7.mp3" \
    -i "${VOIX_DIR}/s8_facebook.mp3" \
    -filter_complex "\
[0]adelay=${S1_DELAY}|${S1_DELAY}[d0];\
[1]adelay=${S2_DELAY}|${S2_DELAY}[d1];\
[2]adelay=${S3_DELAY}|${S3_DELAY}[d2];\
[3]adelay=${S4_DELAY}|${S4_DELAY}[d3];\
[4]adelay=${S5_DELAY}|${S5_DELAY}[d4];\
[5]adelay=${S6_DELAY}|${S6_DELAY}[d5];\
[6]adelay=${S7_DELAY}|${S7_DELAY}[d6];\
[7]adelay=${S8_DELAY}|${S8_DELAY}[d7];\
[d0][d1][d2][d3][d4][d5][d6][d7]amix=inputs=8:duration=longest:normalize=0[voix]" \
    -map "[voix]" -ar 44100 -b:a 192k \
    "${OUT_DIR}/voix_complete_facebook.mp3"

echo "Voice track created."

echo "=== Building Facebook audio mix (voice + music at 0.12) ==="

ffmpeg -y \
    -i "${OUT_DIR}/voix_complete_facebook.mp3" \
    -i "${OUT_DIR}/musique.mp3" \
    -filter_complex "[1]volume=0.12[bg];[0][bg]amix=inputs=2:duration=first:normalize=0[out]" \
    -map "[out]" -ar 44100 -b:a 192k \
    "${OUT_DIR}/audio_mix_facebook.mp3"

echo "=== Durations ==="
echo -n "voix_complete_facebook.mp3: "
ffprobe -v quiet -show_entries format=duration -of csv=p=0 "${OUT_DIR}/voix_complete_facebook.mp3"
echo -n "audio_mix_facebook.mp3: "
ffprobe -v quiet -show_entries format=duration -of csv=p=0 "${OUT_DIR}/audio_mix_facebook.mp3"

echo ""
echo "=== Done! ==="
echo "Now replacing audio_mix.mp3 with the Facebook version..."
cp "${OUT_DIR}/audio_mix_facebook.mp3" "${OUT_DIR}/audio_mix.mp3"
cp "${OUT_DIR}/voix_complete_facebook.mp3" "${OUT_DIR}/voix_complete.mp3"
echo "audio_mix.mp3 and voix_complete.mp3 updated for Facebook."
