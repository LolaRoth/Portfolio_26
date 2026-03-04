# Images du Cork Board (Tableau en liège)

Ce dossier contient les images pour le tableau en liège interactif de la page "À propos".

## Images suggérées

Placez vos images personnelles avec les noms suivants :

### Photos personnelles

- `photo1.jpg` - Une photo avec vos amis ou famille
- `photo2.jpg` - Un souvenir de voyage ou moment marquant

### Albums de musique (pochettes)

- `album-lana.jpg` - Pochette d'album Lana Del Rey "Born To Die"
- `album-weeknd.jpg` - Pochette d'album The Weeknd "Trilogy"

### Autres éléments

- `ticket.jpg` - Un ticket de concert, cinéma ou événement

## Format recommandé

- **Format** : JPG ou PNG
- **Dimensions** : Carrées de préférence (300x300px minimum)
- **Taille** : < 500 Ko pour de bonnes performances

## Personnalisation

Vous pouvez modifier les éléments du cork board directement dans le fichier `pages/a-propos.vue` en éditant le tableau `corkBoardItems`.

Chaque élément peut avoir :

- `type` : 'photo', 'polaroid', 'album', 'sticker', 'note', 'ticket', 'badge'
- `image` : chemin vers l'image (optionnel, un emoji sera affiché sinon)
- `emoji` : emoji de remplacement si pas d'image
- `title` : titre affiché au survol
- `description` : description affichée au survol
- `position` : position en % (x, y)
- `rotation` : rotation en degrés
- `size` : 'sm', 'md', ou 'lg'
- `color` : couleur de fond (pour les notes et badges)

## Note

Si une image n'existe pas, un emoji de fallback sera affiché à la place.
