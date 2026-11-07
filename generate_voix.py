#!/usr/bin/env python3
"""Generate voice-over MP3 files for each scene using edge-tts."""
import asyncio
import edge_tts
import json
import os

VOICE = "fr-FR-RemyMultilingualNeural"
OUTPUT_DIR = "public/voix"

SCENES = {
    "scene1": "Chaque jour, des dizaines de personnes demandent le prix de vos articles, lisent votre réponse, et disparaissent sans un mot.",
    "scene2": "Plus coûteux encore : le livreur qui part déposer un paquet à l'autre bout de la ville et revient parce que le client est devenu injoignable. La course aller-retour est pour votre poche.",
    "scene3": "À la fin du mois, les ventes ont été nombreuses, mais le bénéfice s'est dispersé dans les courses perdues, les fausses captures d'écran et les dépenses imprévues. Ce qui manque à votre commerce n'est pas le travail : c'est un protocole écrit.",
    "scene4": "Les Éditions OKHIRA ont condensé dans ce guide 8 modules de terrain et 25 réponses prêtes à enregistrer dans votre téléphone. Vous apprenez à cadrer le client dès la première question, à sécuriser l'acompte de transport et à protéger votre fonds de roulement. Sans aucun logiciel payant.",
    "scene5": "Un système complet sur votre téléphone actuel, conçu pour les réalités de nos marchés et applicable dès aujourd'hui.",
    "scene6": "Le guide complet est accessible à 2 500 FCFA. Une seule course évitée rembourse votre exemplaire. Cliquez sur le lien pour recevoir votre pack immédiatement.",
}

async def generate_scene(name: str, text: str):
    mp3_path = os.path.join(OUTPUT_DIR, f"{name}.mp3")
    srt_path = os.path.join(OUTPUT_DIR, f"{name}.srt")
    
    communicate = edge_tts.Communicate(text, VOICE, rate="-5%")
    
    # Collect word-level timestamps from WordBoundary events
    word_timestamps = []
    
    with open(mp3_path, "wb") as f:
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                f.write(chunk["data"])
            elif chunk["type"] == "WordBoundary":
                word_timestamps.append({
                    "text": chunk["text"],
                    "offset": chunk["offset"] / 10_000_000,  # Convert 100ns ticks to seconds
                    "duration": chunk["duration"] / 10_000_000,
                })
    
    # Save word timestamps as JSON
    json_path = os.path.join(OUTPUT_DIR, f"{name}_words.json")
    with open(json_path, "w") as f:
        json.dump(word_timestamps, f, ensure_ascii=False, indent=2)
    
    print(f"✅ {name}: {mp3_path} ({len(word_timestamps)} words)")
    return name, word_timestamps

async def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    results = {}
    for name, text in SCENES.items():
        scene_name, timestamps = await generate_scene(name, text)
        results[scene_name] = timestamps
    
    # Save combined metadata
    with open(os.path.join(OUTPUT_DIR, "metadata.json"), "w") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    
    print("\n✅ All voice-over files generated!")

if __name__ == "__main__":
    asyncio.run(main())
