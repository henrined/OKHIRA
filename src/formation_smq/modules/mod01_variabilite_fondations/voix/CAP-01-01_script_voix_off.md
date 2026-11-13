# Script de Voix Off — CAP-01-01
## Causes communes, causes spéciales et le piège du sur-réglage de Deming
### ISO 3534-2 / W. E. Deming | Durée cible : 2 min 30 s (~350 mots)

> **Recommandations pour le moteur TTS (Text-to-Speech) :**
> - Débit cible : 140 à 145 mots par minute (voix assurée, didactique, posée).
> - Les balises phonétiques ou d'épellation sont fournies pour éviter les contresens de synthèse.
> - Chaque scène est isolée pour permettre une génération fichier par fichier (`cap01_s1.mp3` à `cap01_s5.mp3`).

---

## Scène 1 — Le piège industriel du sur-réglage
- **Fichier audio cible :** `cap01_s1.mp3`
- **Durée scène :** 25 secondes (750 frames @ 30 fps)
- **Durée voix :** ~21 secondes (~51 mots) + 4 s de respiration visuelle

### Texte brut pour TTS :
Chaque jour sur les lignes de production, des opérateurs consciencieux réajustent une machine dès qu'une pièce s'écarte de la cible.
Le résultat paradoxal ? La dispersion globale explose et le taux de rebut augmente.
Comme l'a démontré Edwards Deming : confondre une cause commune avec une cause spéciale est l'erreur la plus coûteuse de l'industrie.

---

## Scène 2 — L'expérience de l'entonnoir de Deming
- **Fichier audio cible :** `cap01_s2.mp3`
- **Durée scène :** 40 secondes (1200 frames @ 30 fps)
- **Durée voix :** ~35 secondes (~85 mots) + 5 s de respiration visuelle

### Texte brut pour TTS :
Pour comprendre ce paradoxe, Deming a conçu l'expérience de l'entonnoir.
À gauche, la première stratégie : on laisse tomber les billes sans toucher à l'entonnoir. Le procédé oscille autour de la cible avec sa variance naturelle minimale, notée sigma carré. C'est le bruit de fond inévitable.
À droite, la seconde stratégie : l'opérateur compense chaque écart en déplaçant l'entonnoir à l'opposé.
Résultat ? La variance double immédiatement pour atteindre deux sigma carré. Pire : le procédé peut diverger à l'infini.

---

## Scène 3 — Décomposition formelle de la variabilité
- **Fichier audio cible :** `cap01_s3.mp3`
- **Durée scène :** 35 secondes (1050 frames @ 30 fps)
- **Durée voix :** ~31 secondes (~76 mots) + 4 s de respiration visuelle

### Texte brut pour TTS :
Mathématiquement, la variance totale d'un procédé se décompose en deux composantes strictement distinctes.
D'un côté, la variance commune : le bruit thermique, les jeux mécaniques, la texture de la matière. Elle ne peut être réduite que par une reconception du système.
De l'autre, la variance spéciale : une anomalie assignable, comme une casse d'outil ou un défaut matière.
Vouloir corriger une cause commune par un réglage ponctuel transforme un bruit stable en dérive artificielle.

---

## Scène 4 — Rappel Actif du Praticien
- **Fichier audio cible :** `cap01_s4.mp3`
- **Durée scène :** 20 secondes (600 frames @ 30 fps)
- **Durée voix :** ~15 secondes (~38 mots) + 5 s de silence actif

### Texte brut pour TTS :
Posons-nous cette question fondamentale.
Si une pièce sort à plus deux sigma de la cible dans un procédé parfaitement stable, pourquoi l'action correctrice immédiate sur la machine constitue-t-elle une faute méthodologique ?
Prenez un instant pour formuler mentalement la réponse.

---

## Scène 5 — Règle opérationnelle de décision
- **Fichier audio cible :** `cap01_s5.mp3`
- **Durée scène :** 30 secondes (900 frames @ 30 fps)
- **Durée voix :** ~26 secondes (~66 mots) + 4 s de respiration finale

### Texte brut pour TTS :
Voici la règle d'arbitrage intangible.
Face à une cause commune, interdiction formelle d'intervenir sur la machine. On engage une analyse de fond, par exemple un chantier d'amélioration continue.
Face à une cause spéciale, on stoppe la dérive et on élimine la cause à la source par une démarche huit D.
Dans la prochaine capsule, nous verrons comment distinguer les tolérances du client des limites naturelles de votre machine.

---

## Synthèse chronométrique CAP-01-01

| Scène | Fichier | Durée totale | Durée voix | Mots | Débit moyen |
|:---|:---|---:|---:|---:|---:|
| S1 — Problème | `cap01_s1.mp3` | 25 s | 21 s | 51 | 145 mpm |
| S2 — Entonnoir | `cap01_s2.mp3` | 40 s | 35 s | 85 | 146 mpm |
| S3 — Formalisation | `cap01_s3.mp3` | 35 s | 31 s | 76 | 147 mpm |
| S4 — Rappel actif | `cap01_s4.mp3` | 20 s | 15 s | 38 | 152 mpm |
| S5 — Arbitrage | `cap01_s5.mp3` | 30 s | 26 s | 66 | 152 mpm |
| **TOTAL** | — | **150 s (2 min 30 s)** | **128 s** | **316** | **~148 mpm** |
