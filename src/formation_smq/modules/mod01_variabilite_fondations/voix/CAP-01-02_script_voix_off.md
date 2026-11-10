# Script de Voix Off — CAP-01-02
## Tolérances client versus Limites naturelles de procédé
### ISO 22514-1 | Durée cible : 4 minutes

> **Convention de lecture**
> - Les pauses `[…]` indiquent une pause visuelle didactique (laisser l'image respirer).
> - Les mots en MAJUSCULES reçoivent un appui vocal marqué.
> - Débit cible : 145 mots par minute, voix calme et assurée.

---

## Scène 1 — Le quiproquo industriel (30 s · ~72 mots)

Dans la quasi-totalité des ateliers de production que j'ai visités,
la même confusion se répète, silencieusement et à grands frais.
[…]
Les opérateurs superposent sur leurs écrans de contrôle
les TOLÉRANCES CONTRACTUELLES du plan client
et les LIMITES STATISTIQUES de leur machine,
comme si ces deux grandeurs mesuraient le même phénomène.
[…]
Elles ne le mesurent PAS.
Et cette confusion coûte des millions d'euros par an à l'industrie manufacturière.

---

## Scène 2 — Anatomie graphique (48 s · ~115 mots)

Regardons ce graphique.
[…]
La COURBE NOIRE représente la distribution des pièces individuelles
produites par la machine sous causes communes uniquement.
Sa largeur naturelle est de SIX SIGMA — c'est ce que l'on appelle
les limites naturelles du procédé, notées LNTL et UNTL.
[…]
Les TRAITS ROUGES, eux, représentent les spécifications contractuelles LSL et USL —
Limite Inférieure et Limite Supérieure de Spécification.
Elles sont fixées par le bureau d'études du client, indépendamment de toute réalité physique de la machine.
[…]
La COURBE BLEUE en pointillés, plus étroite, représente non pas les pièces,
mais les MOYENNES de sous-groupes de quatre pièces.
C'est sur cette courbe que l'on calcule les limites de la carte de contrôle : LCL et UCL.
[…]
Ces trois univers sont MATHÉMATIQUEMENT ÉTANCHES.
Les mélanger est une faute professionnelle.

---

## Scène 3 — Formalisation ISO 22514-1 (45 s · ~108 mots)

La norme internationale ISO 22514-1 formalise rigoureusement cette séparation.
[…]
Premier ratio, le Cp — l'indicateur de CAPABILITÉ POTENTIELLE.
Il répond à la question : l'espace accordé par le client est-il plus large
que l'espace occupé par la machine ?
La formule est simple : Cp égale l'intervalle de tolérance divisé par six sigma.
[…]
Sous la barre de 1,00, la production de pièces non conformes est MATHÉMATIQUEMENT INÉVITABLE —
même si la machine est parfaitement centrée, parfaitement stable, et parfaitement pilotée.
[…]
Deuxième formule : les limites de la carte de contrôle sur moyennes.
LCL et UCL valent moyenne plus ou moins TROIS fois sigma sur racine de n.
Ce facteur racine de n vient du THÉORÈME CENTRAL LIMITE —
il rend les limites de contrôle bien plus étroites que les limites naturelles individuelles.
C'est précisément pour cela qu'une carte Xbar détecte des dérives invisibles à l'œil nu.

---

## Scène 4 — Matrice 4 quadrants (48 s · ~116 mots)

Voici la grille de décision que tout ingénieur qualité doit avoir en tête.
[…]
QUADRANT UN : le procédé est STABLE et CAPABLE.
La machine est prévisible, sa dispersion est plus étroite que la tolérance client.
C'est l'état idéal. On surveille par échantillonnage. On n'intervient pas.
[…]
QUADRANT DEUX : le procédé est stable mais NON CAPABLE.
Toutes les pièces se répètent de façon prévisible — mais elles sortent régulièrement hors tolérances.
Interdiction absolue de régler la machine. Il faut reconcevoir le procédé structurellement.
[…]
QUADRANT TROIS : le procédé est capable mais INSTABLE.
Les pièces passent le contrôle pour l'instant — mais le procédé dérive.
C'est une BOMBE À RETARDEMENT. La dérive franchira l'USL.
[…]
QUADRANT QUATRE : instable ET non capable.
Production à l'arrêt. Tri à cent pour cent. Démarche 8D immédiate.
[…]
Un procédé peut être PARFAITEMENT STABLE tout en étant INCAPABLE de livrer une pièce conforme.
Ces deux propriétés sont indépendantes. Ne jamais les confondre.

---

## Scène 5 — Rappel actif (25 s · ~60 mots)

Arrêtons-nous une seconde.
[…]
Un atelier mesure cinquante pièces consécutives.
Toutes se situent entre LSL et USL. Toutes conformes.
[…]
A-t-on la CERTITUDE que le procédé est sous contrôle statistique ?
[…]
Prenez le temps d'y répondre.
[…]
La réponse est NON. Et la raison est mathématiquement précise.
Nous l'examinons dans la scène suivante.

---

## Scène 6 — Gouvernance métrologique (40 s · ~96 mots)

La réponse est non, parce que la conformité d'une pièce individuelle
ne dit RIEN sur la STABILITÉ FUTURE du procédé.
[…]
Regardons le tableau de gouvernance.
Les tolérances LSL et USL s'appliquent à chaque pièce individuelle.
Elles permettent de répondre à une seule question : ce lot est-il livrable au client ?
[…]
Les limites de contrôle LCL et UCL s'appliquent aux MOYENNES d'échantillons.
Elles permettent de répondre à une question différente :
une cause spéciale perturbe-t-elle mon procédé EN CE MOMENT ?
[…]
Voici la RÈGLE D'OR opératoire :
Ne jamais régler une machine en fonction de la proximité des tolérances client.
Un réglage n'est légitime que si une carte de contrôle déclenche une alarme statistique formelle —
selon les règles de Western Electric ou les tests de Nelson.
[…]
Toute autre intervention est un sur-réglage déguisé.
Et nous savons, depuis la capsule précédente, ce que le sur-réglage produit.

---

## Résumé de production

| Scène | Durée | Mots | Débit réel |
|:---|---:|---:|---:|
| S1 — Le quiproquo | 30 s | 72 | 144 mpm |
| S2 — Anatomie graphique | 48 s | 115 | 144 mpm |
| S3 — Formalisation ISO | 45 s | 108 | 144 mpm |
| S4 — Matrice 4 quadrants | 48 s | 116 | 145 mpm |
| S5 — Rappel actif | 25 s | 60 | 144 mpm |
| S6 — Gouvernance | 40 s | 96 | 144 mpm |
| **TOTAL** | **4 min 00 s** | **567** | **~144 mpm** |
