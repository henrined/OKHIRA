import json
import subprocess
import os

fps = 30
pause_frames = 9

with open("public/voix/durees.json", "r", encoding="utf-8") as f:
    durees = json.load(f)

scenes = [
    ("s1", "s1.mp3"),
    ("s2", "s2.mp3"),
    ("s3", "s3.mp3"),
    ("s4", "s4.mp3"),
    ("s5", "s5.mp3"),
    ("s6", "s6.mp3"),
    ("s7", "s7.mp3"),
    ("s8_tiktok_bio", "s8_tiktok_bio.mp3")
]

start_frames = []
cur_frame = 0

for key, fname in scenes:
    start_frames.append(cur_frame)
    v_frames = round(durees[key]["duree_nette"] * fps)
    cur_frame += v_frames + pause_frames

total_frames = cur_frame
total_sec = total_frames / fps
print(f"Total frames: {total_frames}, Total seconds: {total_sec:.3f}")

inputs = []
filter_parts = []
for i, (key, fname) in enumerate(scenes):
    inputs.extend(["-i", f"public/voix/{fname}"])
    delay_ms = int(round((start_frames[i] / fps) * 1000))
    filter_parts.append(f"[{i}:a]adelay={delay_ms}|{delay_ms}[a{i}]")

amix_inputs = "".join(f"[a{i}]" for i in range(len(scenes)))
parts_str = ";".join(filter_parts)
filter_complex = f"{parts_str};{amix_inputs}amix=inputs={len(scenes)}:normalize=0[voix]"

cmd = ["ffmpeg", "-y"] + inputs + [
    "-filter_complex", filter_complex,
    "-map", "[voix]",
    "-t", str(total_sec),
    "public/voix_complete.mp3"
]

print("Generating public/voix_complete.mp3...")
subprocess.run(cmd, check=True)
print("voix_complete.mp3 created!")

# Mix with background music (musique.mp3 at volume 0.12)
cmd_mix = [
    "ffmpeg", "-y",
    "-i", "public/voix_complete.mp3",
    "-i", "public/musique.mp3",
    "-filter_complex",
    "[1:a]volume=0.12[bgm];[0:a][bgm]amix=inputs=2:normalize=0[out]",
    "-map", "[out]",
    "-t", str(total_sec),
    "public/audio_mix.mp3"
]

print("Generating public/audio_mix.mp3...")
subprocess.run(cmd_mix, check=True)
print("audio_mix.mp3 created successfully!")
