# PUB ANIMÉE « LE SYSTÈME COMMERCIAL WHATSAPP BUSINESS » — SPÉCIFICATION FINALE
Éditions OKHIRA · Motion design d'application mobile · 9:16 (1080x1920) · 30 fps · environ 45 s (la durée exacte est donnée par la voix)

Ce fichier est la seule source de vérité. Il remplace tout autre fichier de prompts.

---

## 0. PRINCIPE
- Aucune vidéo filmée. Tout est animé en code Remotion, avec les images fournies (téléphones, cartes, livre, badge, boutons, logo) et 3 personnages détourés.
- **La voix commande le timing.** Les voix off sont déjà enregistrées. La durée de chaque scène = durée de sa voix (+ 0,3 s de pause avant la scène suivante).
- Les PNG fournis ont un fond transparent. Ne redessine jamais leur texte, leurs prix ni leurs écrans.

## 1. FICHIERS (tous dans public/)

```text
public/
├── voix/
│   ├── s1.mp3 … s7.mp3
│   ├── s8_<PLATEFORME>.mp3        (une seule voix de scène 8 sera utilisée)
│   ├── durees.json                (durée de chaque voix, en secondes)
│   └── rythme_final.json          (phrases, pauses et mots avec leurs temps en ms, relatifs au début de chaque voix)
├── musique.mp3
├── assets_okhira/                 (téléphones et cartes)
│   ├── phone_chat_1_question.png      scène 1
│   ├── phone_chat_2_reponse.png       scène 2 (étape 2)
│   ├── phone_chat_silence.png         scène 2 (étape 3, final)
│   ├── phone_raccourci_prix.png       scène 5
│   ├── phone_reponse_inseree.png      scène 5
│   ├── phone_guide.png                scènes 5 et 6
│   ├── carte_perte_1.png, carte_perte_2.png, carte_perte_3.png    scène 3
│   └── carte_module_1.png, carte_module_2.png, carte_module_3.png scène 5
├── produit/
│   ├── livre_3d.png               (livre détouré)
│   ├── couverture_plate.png       (couverture à plat)
│   ├── badge_prix_C.png           (2 500 FCFA, au lieu de 5 000 FCFA, −50 %, téléchargement immédiat)
│   ├── scene_pack_complet.png     (visuel de secours, ne pas l'utiliser s'il peut être recomposé)
│   ├── logo_okhira.png
│   └── bouton_achat.png           (= le bouton de la plateforme choisie, renommé)
├── perso_commercant_surpris.png   scène 1
├── perso_livreur_agace.png        scène 3
└── perso_commercante_sourire.png  scène 6
```

Si un fichier manque, mets un bloc de couleur provisoire à sa place et liste-moi les fichiers manquants à la fin.
Ne pas utiliser : produit/packshot_livre.png (image figée de secours).

## 2. DESIGN SYSTEM
- Palette : blanc #FFFFFF, crème #F7F6F2, teal profond #0B3D3E, teal moyen #0F5C57, teal clair #DDEFEC, or #D4AF37.
- Fonds : alternance de blanc pur et de dégradé radial teal très clair vers blanc. Fond sombre uniquement pour la scène 7.
- Typographie : Plus Jakarta Sans via @remotion/google-fonts. Graisses 300 (mots courants) et 800 (mots clés).
- Ombres douces, coins arrondis, verre dépoli pour les cartes.
- Zones de sécurité : 220 px en bas, 140 px en haut, 60 px sur les côtés.

## 3. RÈGLES D'ANIMATION
- Texte cinétique : chaque phrase de la voix s'affiche à l'écran, mot par mot, à l'instant exact où la voix le dit (temps de rythme_final.json). Chaque mot entre avec flou (12→0), léger zoom (0.9→1) et décalage vertical (20 px→0) via spring({damping:14, stiffness:120}).
- Le texte affiché est exactement celui de la voix, sans l'inventer ni le raccourcir. Mots clés en 800 et plus gros, en or ou teal profond.
- Une nouvelle action visuelle toutes les 45 à 75 images. Jamais de plan statique de plus de 2,5 s.
- Transitions entre scènes avec @remotion/transitions (glissement, fondu enchaîné, zoom à travers), jamais de coupe sèche. @remotion/motion-blur sur les éléments rapides.
- Téléphones : rotation 3D (perspective 2200 px), entrée en biais, léger flottement vertical continu (12 px).
- Personnages : entrent par le bord (glissement + petit rebond), halo teal clair derrière, ombre douce.
- Pendant une pause (champ "pauses" de rythme_final.json), laisse l'écran respirer ou lance l'animation visuelle suivante.

## 4. LES 8 SCÈNES
Début de la scène n = fin de la scène n−1 + 0,3 s. Durées en secondes, d'après durees.json : S1 2,26 · S2 5,38 · S3 7,22 · S4 4,66 · S5 11,78 · S6 3,67 · S7 5,11 · S8 selon la plateforme.

**S1 — Accroche (voix s1)**
- Fond blanc. perso_commercant_surpris.png entre par la gauche. À droite, assets_okhira/phone_chat_1_question.png penché en 3D.
- Mots clés : « votre prix ».

**S2 — Le silence (voix s2)**
- Fond teal clair. Le téléphone passe au centre et change d'état en fondu enchaîné : phone_chat_1_question → phone_chat_2_reponse (au moment de « sans un mot ») → phone_chat_silence (pendant « Ils lisent. »).
- Phrases (voix) : « …puis disparaissent » / « sans un mot ? » / « Ils lisent. » / « Et ils ne répondent plus. »
- Mots clés : « disparaissent », « lisent », « plus ». Les coches grises passent au bleu sur « lisent ».

**S3 — La course perdue (voix s3)**
- Fond blanc. perso_livreur_agace.png entre par la droite. Les 3 cartes carte_perte_1/2/3 tombent autour de lui, une par phrase : carte 1 sur « le livreur part, », carte 2 sur « le client ne décroche pas. », carte 3 sur « La course est perdue, ».
- Phrases : « Pire : » / « le livreur part, » / « le client ne décroche pas. » / « La course est perdue, » / « et c'est vous qui payez. »
- Mots clés : « livreur », « perdue », « payez ».

**S4 — Le constat (voix s4)**
- Fond teal clair. Un carnet de caisse stylisé en carte en verre : les lignes de chiffres s'écrivent, le total baisse. Les cartes de perte de la S3 se replient dedans.
- Phrases : « Ce qui vous manque, ce n'est pas du travail. » / « C'est un protocole écrit. »
- Mots clés : « travail », « protocole écrit » (zoom fort, or).

**S5 — La solution (voix s5)**
- Fond blanc. phone_guide.png fait une rotation 3D. Compteurs animés « 8 » et « 25 » aux mots « huit modules » et « vingt-cinq réponses ».
- Les cartes carte_module_1/2/3 apparaissent en perspective, avec barre de progression qui se remplit : carte 1 sur « Cadrez le client », carte 2 sur « sécurisez l'acompte », carte 3 sur « protégez votre fonds de roulement ».
- Après les cartes, phone_raccourci_prix.png puis phone_reponse_inseree.png montrent l'insertion d'une réponse avec le raccourci /prix.
- Le texte de la voix s'affiche en légende, plus petite, phrase par phrase (rythme_final.json).
- Mots clés : « huit modules », « vingt-cinq réponses ».

**S6 — La preuve (voix s6)**
- Fond teal clair. perso_commercante_sourire.png entre par la gauche. Téléphone phone_guide.png en biais derrière. Pastilles « Sans logiciel payant » et « Dès aujourd'hui ».
- Phrases : « Sans logiciel payant. » / « Directement sur votre téléphone. »
- Mots clés : « Sans logiciel payant », « votre téléphone ».

**S7 — Le prix (voix s7)**
- Fond sombre dégradé (seule exception). produit/livre_3d.png tourne légèrement en 3D avec ombre et reflet doré. produit/badge_prix_C.png arrive par zoom avec rebond au début de la voix ; l'autocollant « −50 % » fait un petit pop 0,3 s après.
- Phrases : « Deux mille cinq cents francs, » / « au lieu de cinq mille. » / « Une seule course évitée rembourse votre guide. » (en légende).
- Mots clés : « course évitée ».

**S8 — Appel à l'action (voix s8_<PLATEFORME>)**
- Fond blanc. produit/logo_okhira.png pulse doucement, puis produit/bouton_achat.png arrive du bas avec rebond. La flèche ou l'icône rebondit en boucle. Aucune mention de moyens de paiement.
- Le texte affiché est celui de la voix de la plateforme choisie.

## 5. VOIX, MUSIQUE
- Voix : fichiers existants. Ne génère aucune voix. Chaque voix démarre au début de sa scène.
- rythme_final.json : pour chaque voix, "phrases" avec "startMs"/"endMs" et "mots" avec leurs temps, relatifs au début du MP3. "pauses" donne les silences à respecter.
- Musique : public/musique.mp3 en fond à volume 0.12, avec baisse à 0.06 pendant les voix. Elle contient déjà un fondu de sortie sur ses 3 dernières secondes. Si la vidéo dure plus longtemps que la musique, ne la boucle pas : coupe-la avec fondu.

## 6. CONTRAINTES
- Code propre, composants réutilisables : MotWord, GlassCard, PhoneMock, Counter.
- Une variable PLATEFORME en haut du code (tiktok_bio, tiktok_pub_bouton, instagram_reels, facebook, facebook_instagram_pub, youtube_shorts) qui choisit la voix s8 et affiche son texte ; le bouton est déjà public/produit/bouton_achat.png.
- Commence par un plan court des scènes et de leurs durées, puis construis. Montre le résultat dans Remotion Studio (npm run dev) et attends mes retours avant de rendre le MP4.

## 7. AJUSTEMENTS POSSIBLES (à envoyer un par un après le premier rendu)
- `Rends les transitions plus rapides et plus dynamiques, avec un effet de zoom à travers le téléphone entre les scènes 4 et 5.`
- `Agrandis tous les textes de 15 % et augmente le contraste des mots clés.`
- `Ajoute un halo teal clair derrière chaque personnage détouré.`
- `Ajoute des particules dorées discrètes dans la scène 7.`
- `Vérifie que rien ne dépasse des zones de sécurité.`

---

## ANNEXE — PROMPTS D'IMAGES POUR LES 3 PERSONNAGES

Règles communes : `isolated on a plain pure white background, studio lighting, sharp focus, no text, no logos, no watermark, photorealistic, 8k --ar 9:16`. Pour détourer, demande plutôt `solid bright green screen background (#00FF00)` puis supprime le vert (remove.bg, Photoroom, Canva).

perso_commercant_surpris.png
```text
Half-body portrait of an African man, 30 years old, casual plaid shirt, holding a smartphone, shocked and puzzled expression with wide eyes and raised eyebrows, mouth slightly open, slight head tilt, dynamic pose leaning forward, isolated on a plain pure white background, studio lighting, no text, no logos, photorealistic, 8k --ar 9:16
```

perso_livreur_agace.png
```text
Half-body portrait of an African motorcycle delivery rider, 28 years old, orange polo shirt, helmet pushed back on his head, holding a kraft-paper parcel in one arm and a phone to his ear, annoyed and impatient expression, frowning, isolated on a plain pure white background, studio lighting, no text, no logos, photorealistic, 8k --ar 9:16
```

perso_commercante_sourire.png
```text
Half-body portrait of a young African woman shop owner, 28 years old, smart casual outfit, looking at a smartphone with a confident satisfied smile, a coffee cup in the other hand, relaxed pose, isolated on a plain pure white background, studio lighting, no text, no logos, photorealistic, 8k --ar 9:16
```

## INFOS DE CAMPAGNE
- Produit : Le Système Commercial WhatsApp Business (livre complet 8 modules + boîte à outils)
- Éditeur : Éditions OKHIRA · Édité à Brazzaville
- Tarif : 2 500 FCFA (au lieu de 5 000 FCFA)
- Lien boutique : https://nexora-on.mychariow.shop
