#!/usr/bin/env python3
"""Synthèse vocale haute fidélité pour la formation SMQ (Éditions Décisio).
Capsule CAP-01-02 : Tolérances client (USL/LSL) et Limites naturelles (UCL/LCL)
Voix : fr-FR-HenriNeural (ton sobre, académique, articulé)
"""
import asyncio
import os
import subprocess
import edge_tts

VOICE = "fr-FR-HenriNeural"
RATE = "-3%"  # Débit légèrement posé pour favoriser la clarté conceptuelle
PITCH = "+0Hz"

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROJECT_ROOT = os.path.dirname(os.path.dirname(BASE_DIR))
OUTPUT_DIR = os.path.join(
    PROJECT_ROOT,
    "public",
    "formation_smq",
    "modules",
    "mod01_variabilite_fondations",
    "voix"
)

SCENES = {
    "cap02_s1": (
        "Dans la quasi-totalité des ateliers de production que j'ai visités, "
        "la même confusion se répète, silencieusement et à grands frais. "
        "Les opérateurs superposent sur leurs écrans de contrôle les tolérances contractuelles du plan client "
        "et les limites statistiques de leur machine, comme si ces deux grandeurs mesuraient le même phénomène. "
        "Elles ne le mesurent pas. Et cette confusion coûte des millions d'euros chaque année à l'industrie manufacturière."
    ),
    "cap02_s2": (
        "Regardons ce graphique. "
        "La courbe noire représente la distribution des pièces individuelles produites par la machine sous causes communes uniquement. "
        "Sa largeur naturelle est de six sigma : ce sont les limites naturelles de procédé, notées LNTL et UNTL. "
        "Les traits bordeaux représentent les spécifications contractuelles : LSL et USL, la limite inférieure et la limite supérieure de spécification. "
        "Elles sont fixées par le bureau d'études du client, indépendamment de toute réalité physique de la machine. "
        "La courbe bleue en pointillés, plus étroite, représente non pas les pièces, mais les moyennes de sous-groupes de quatre pièces. "
        "C'est sur cette distribution que l'on calcule les limites de la carte de contrôle Shewhart : LCL et UCL. "
        "Ces univers sont mathématiquement étanches. Les mélanger est une faute méthodologique majeure."
    ),
    "cap02_s3": (
        "La norme internationale ISO 22514-1 formalise rigoureusement cette séparation. "
        "Premier ratio : le Cp, indicateur de capabilité potentielle. "
        "Il répond à une question simple : l'espace accordé par le client est-il plus large que la dispersion naturelle de la machine ? "
        "La formule est : Cp égale l'intervalle de tolérance divisé par six sigma. "
        "Sous la barre de 1,00, la production de pièces non conformes est mathématiquement inévitable, "
        "même si la machine est parfaitement centrée et parfaitement stable. "
        "Deuxième formulation : les limites de la carte de contrôle sur moyennes. "
        "UCL et LCL valent la moyenne plus ou moins trois fois sigma sur racine de n. "
        "Ce facteur racine de n, issu du théorème central limite, rétrécit les limites de contrôle et permet "
        "de détecter les causes spéciales bien avant qu'une pièce ne franchisse la tolérance client."
    ),
    "cap02_s4": (
        "Voici la grille de décision que tout ingénieur qualité doit maîtriser. "
        "Quadrant un : le procédé est stable et capable. "
        "La dispersion naturelle est plus étroite que le besoin client, et aucune cause spéciale n'est active. "
        "On surveille par échantillonnage sans intervenir. "
        "Quadrant deux : le procédé est stable mais non capable. "
        "La machine est parfaitement prévisible, mais sa variabilité intrinsèque dépasse la tolérance. "
        "Des rebuts sont inévitables. Interdiction formelle de régler : il faut reconcevoir le procédé ou élargir la tolérance. "
        "Quadrant trois : le procédé est hors contrôle mais capable. "
        "Les pièces passent le contrôle parce que la tolérance est large, mais le procédé dérive en sous-main. "
        "C'est une bombe à retardement. "
        "Quadrant quatre : le chaos. Hors contrôle et non capable. "
        "Arrêt immédiat de la production, tri à cent pour cent et démarche de résolution de problème 8D. "
        "Retenez cet axiome : la stabilité est une propriété interne du procédé. La capabilité est un contrat commercial."
    ),
    "cap02_s5": (
        "Arrêtons-nous un instant. "
        "Si un atelier mesure cinquante pièces consécutives toutes situées à l'intérieur des tolérances client, "
        "entre LSL et USL, a-t-on la certitude que le procédé est sous contrôle statistique ? "
        "Prenez le temps d'analyser cette question. "
        "La réponse est non. Et la raison est mathématiquement fondamentale."
    ),
    "cap02_s6": (
        "La réponse est non, parce que la conformité d'une pièce individuelle ne dit rien sur la stabilité future du procédé. "
        "Regardons le tableau de gouvernance métrologique. "
        "Les tolérances LSL et USL s'appliquent à chaque pièce unitaire. "
        "Elles permettent de valider la livraison commerciale : ce lot est-il expédiable au client ? "
        "Les limites de contrôle LCL et UCL s'appliquent aux moyennes d'échantillons. "
        "Elles répondent à une question opérationnelle : une cause spéciale perturbe-t-elle le procédé en ce moment même ? "
        "Voici la règle d'or Décisio pour l'atelier : "
        "ne jamais régler une machine en fonction de la proximité des tolérances client. "
        "Le réglage n'est légitime que si une carte de contrôle déclenche une alarme statistique formelle. "
        "Toute autre intervention est un sur-réglage destructeur."
    ),
}

def get_audio_duration(file_path):
    cmd = [
        "ffprobe", "-v", "error", "-show_entries",
        "format=duration", "-of", "default=noprint_wrappers=1:nokey=1",
        file_path
    ]
    try:
        out = subprocess.check_output(cmd, stderr=subprocess.STDOUT).decode().strip()
        return float(out)
    except Exception:
        return 0.0

async def generate():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    print(f"🎙️  Synthèse vocale SMQ - Capsule CAP-01-02 (Voix: {VOICE})")
    print(f"📁 Dossier cible : {OUTPUT_DIR}\n")

    targets = {
        "cap02_s1": 30.0,
        "cap02_s2": 48.0,
        "cap02_s3": 45.0,
        "cap02_s4": 48.0,
        "cap02_s5": 25.0,
        "cap02_s6": 40.0,
    }

    for name, text in SCENES.items():
        mp3_path = os.path.join(OUTPUT_DIR, f"{name}.mp3")
        comm = edge_tts.Communicate(text, VOICE, rate=RATE, pitch=PITCH)
        await comm.save(mp3_path)
        dur = get_audio_duration(mp3_path)
        target = targets.get(name, 0.0)
        margin = target - dur
        print(f"  • {name}.mp3 : {dur:.2f}s / Cible {target:.0f}s (Marge respiration : {margin:.2f}s)")

    print("\n✅ Toutes les voix de CAP-01-02 sont générées avec succès !")

if __name__ == "__main__":
    asyncio.run(generate())
