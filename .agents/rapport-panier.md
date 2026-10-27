# Compte rendu — Mise à jour catalogue KANDE CHOP ALHAMDULILLAH

## Fichiers modifiés

| Fichier | Nature de la modification |
|---|---|
| `src/data/produits.json` | Reconstruit entièrement : 51 produits, un par image, prix réels |
| `src/pages/Catalog.jsx` | `LIMITE_INITIALE` passé de 4 à 3 |
| `public/images/accessoires/` | 5 images remplacées par A1–A5 depuis `src/assets/IMG/Accessoires/` |
| `public/images/chaussures/` | 17 images remplacées par ch1–ch17 depuis `src/assets/IMG/Chaussures/` |
| `public/images/ensembles/` | 5 images remplacées par E1–E5 depuis `src/assets/IMG/Les ensembles/` |
| `public/images/nuisettes/` | 3 images remplacées par N1–N3 depuis `src/assets/IMG/Nuisettes/` |
| `public/images/robes/` | 5 images remplacées par R1–R5 depuis `src/assets/IMG/Robes/` |
| `public/images/sacs/` | 7 images remplacées par sac1–sac7 depuis `src/assets/IMG/Saces/` |
| `public/images/voiles/` | 9 images remplacées par V1–V9 depuis `src/assets/IMG/Voiles/` |

---

## Prix corrigés par catégorie (51 produits)

### Accessoires — 5 produits
| ID produit | Image source | Prix |
|---|---|---|
| accessoires-001 | A1-4000 | 4 000 FCFA |
| accessoires-002 | A2-4000 | 4 000 FCFA |
| accessoires-003 | A3-4000 | 4 000 FCFA |
| accessoires-004 | A4-4000 | 4 000 FCFA |
| accessoires-005 | A5-4000 | 4 000 FCFA |

### Chaussures — 17 produits
| ID produit | Image source | Prix |
|---|---|---|
| chaussures-001 | ch1-2500 | 2 500 FCFA |
| chaussures-002 | ch2-2000 | 2 000 FCFA |
| chaussures-003 | ch3-2000 | 2 000 FCFA |
| chaussures-004 | ch4-2000 | 2 000 FCFA |
| chaussures-005 | ch5-2000 | 2 000 FCFA |
| chaussures-006 | ch6-2000 | 2 000 FCFA |
| chaussures-007 | ch7-2000 | 2 000 FCFA |
| chaussures-008 | ch8-2000 | 2 000 FCFA |
| chaussures-009 | ch9-3500 | 3 500 FCFA |
| chaussures-010 | ch10-3500 | 3 500 FCFA |
| chaussures-011 | ch11-2500 | 2 500 FCFA |
| chaussures-012 | ch12-1500 | 1 500 FCFA |
| chaussures-013 | ch13-1500 | 1 500 FCFA |
| chaussures-014 | ch14-1500 | 1 500 FCFA |
| chaussures-015 | ch15-2500 | 2 500 FCFA |
| chaussures-016 | ch16-1500 | 1 500 FCFA |
| chaussures-017 | ch17-2500 | 2 500 FCFA |

### Ensembles — 5 produits
| ID produit | Image source | Prix |
|---|---|---|
| ensembles-001 | E1-11000 | 11 000 FCFA |
| ensembles-002 | E2-11000 | 11 000 FCFA |
| ensembles-003 | E3-11000 | 11 000 FCFA |
| ensembles-004 | E4-11000 | 11 000 FCFA |
| ensembles-005 | E5-11000 | 11 000 FCFA |

### Nuisettes — 3 produits
| ID produit | Image source | Prix |
|---|---|---|
| nuisettes-001 | N1-4500 | 4 500 FCFA |
| nuisettes-002 | N2-4500 | 4 500 FCFA |
| nuisettes-003 | N3-3000 | 3 000 FCFA |

### Robes — 5 produits
| ID produit | Image source | Prix |
|---|---|---|
| robes-001 | R1-3500 | 3 500 FCFA |
| robes-002 | R2-3500 | 3 500 FCFA |
| robes-003 | R3-4500 | 4 500 FCFA |
| robes-004 | R4-5000 | 5 000 FCFA |
| robes-005 | R5-5000 | 5 000 FCFA |

### Sacs — 7 produits
| ID produit | Image source | Prix |
|---|---|---|
| sacs-001 | sac1-4000 | 4 000 FCFA |
| sacs-002 | sac2-3500 | 3 500 FCFA |
| sacs-003 | sac3-4000 | 4 000 FCFA |
| sacs-004 | sac4-4000 | 4 000 FCFA |
| sacs-005 | sac5-4000 | 4 000 FCFA |
| sacs-006 | sac6-3500 | 3 500 FCFA |
| sacs-007 | sac7-8000 | 8 000 FCFA |

### Voiles — 9 produits
| ID produit | Image source | Prix |
|---|---|---|
| voiles-001 | V1-1000 | 1 000 FCFA |
| voiles-002 | V2-2500 | 2 500 FCFA |
| voiles-003 | V3-1500 | 1 500 FCFA |
| voiles-004 | V4-1500 | 1 500 FCFA |
| voiles-005 | V5-1500 | 1 500 FCFA |
| voiles-006 | V6-1500 | 1 500 FCFA |
| voiles-007 | V7-2500 | 2 500 FCFA |
| voiles-008 | V8-2500 | 2 500 FCFA |
| voiles-009 | V9-2500 | 2 500 FCFA |

---

## Fichiers ambigus — à vérifier

Ces fichiers existaient dans l'ancien `public/images/` mais n'ont **pas** de fichier source dans `src/assets/IMG/` avec un prix encodé. Ils restent présents dans `public/images/` mais **ne sont référencés par aucun produit** dans le catalogue :

| Fichier orphelin | Raison |
|---|---|
| `public/images/nuisettes/nuisette-004.jpeg` | Aucun fichier `N4-…` dans `src/assets/IMG/Nuisettes/` |
| `public/images/sacs/sac-008.jpeg` | Aucun fichier `sac8-…` dans `src/assets/IMG/Saces/` |
| `public/images/sacs/sac-009.jpeg` | Aucun fichier `sac9-…` dans `src/assets/IMG/Saces/` |

**Action recommandée :** si ces images correspondent à des articles réels, renommer-les avec le prix (ex. `N4-xxxx.jpeg`, `sac8-xxxx.jpeg`, `sac9-xxxx.jpeg`), les déposer dans `src/assets/IMG/`, et demander un nouvel ajout dans `produits.json`.

---

## Catalogue — affichage initial

- `LIMITE_INITIALE` passé de **4 à 3** dans `Catalog.jsx`.
- Chaque catégorie affiche désormais **3 articles minimum** dès l'ouverture.
- Le bouton **« Voir plus (N article(s)) »** s'affiche uniquement si la catégorie contient plus de 3 articles.
- Chaque catégorie dispose de son propre état indépendant (via `categoriesDeveloppees`).
- Cliquer sur « Voir moins » replie la liste à 3 articles.
- Les catégories avec exactement 3 articles ou moins (nuisettes = 3) n'affichent pas de bouton.

---

## Vérifications effectuées

- `npm run build` : **succès** — 55 modules transformés, 0 erreur.
- Chaque produit a un chemin d'image valide vers `public/images/…`.
- Les prix dans `produits.json` sont des entiers (ex. `2500`, pas `"2 500 FCFA"`) — le formatage `Intl.NumberFormat("fr-FR")` existant dans `ProductCard.jsx` et `ProductDetails.jsx` assure l'affichage `2 500 FCFA` partout.
- Le panier et le calcul du total utilisent directement le champ `prix` de chaque produit — les prix réels sont donc cohérents dans tout le parcours d'achat (fiche produit, panier, total, commande WhatsApp).
- La recherche, les filtres par catégorie, les fiches produits et le responsive restent inchangés.
- Aucune logique fonctionnelle n'a été modifiée (seuls `produits.json` et la constante `LIMITE_INITIALE` ont changé).
