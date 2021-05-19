# Exécution du jeu
 * Problème de lancement de jeu : `Uncaught ReferenceError: GameView is not defined`.
   * Ceci est dû à l'appel à `updateFrame()` dans ta classe `GameView`
   * Une fois réglé : `Uncaught ReferenceError: idDiv is not defined`
     * Que fait `idDiv++;` ?
     * Retirer la ligne permet au jeu de tourner normalement.
 * Pas de bonus de points pour les super gommes.
 * Les fantômes laissent des trainées colorées derrière eux.

# Commentaires sur le code
 * Attention à remettre une version fonctionnelle du projet !
 * Essaie de faire attention à l'indentation (VSCodium a un bouton "format document" qui le fait pour toi) par exemple de `GameView`
 * Essaie de nommer correctement tes erreurs !
 * Tu n'as défini d'attributs privés ni de getters en format JavaScript. Voir par exemple ci-dessous dans la classe `Maze`. Définir un getter comme ceci te permet d'écrire `this.wallLayer` pour accéder à la valeur voulue.
```
//Dans le constructeur
this._wallLayer = wall; // Le _ met l'attribut en privé

//Définition du getter
get wallLayer() {
    return this._wallLayer;
}
```
 * Attention à tes noms de variables (par exemple `rawMaze` dans le constructeur de `Game` prête à confusion) et de méthodes.

## Itération 1
 * Dans `Layer.getPosition`, tu aurais pu directement faire `return this.getTile(position) != undefined` plutôt qu'une condition (après la gestion d'erreur)
 * Tu aurais dû laisser le `RAW_MAZE` dans un fichier séparé (pour pouvoir rendre le code plus modulable si on voulait pouvoir charger plusieurs niveaux différents)
 * Pas de getters pour le nombre de lignes et de colonnes dans `Maze` ?
 * Plutôt que d'avoir `this.gameview = new GameView(new Game(new Maze(RAW_MAZE.table)));` dans ton contrôleur, il vaudrait mieux déléguer les créations d'objets. Par exemple dans le contrôleur, créer le modèle et la vue, et dans `Game`, créer le labyrinthe.
 * Dans `GameView` il serait préférable d'utiliser les types des objets pour les afficher, plutôt que leurs `id`.

## Itération 2
 * Créer un setter pour la position n'est pas idéal : `move` gère déjà les seuls changements de position autorisés.
 * Pourquoi `maze.pick` retire-t-elle une tuile de la couche de murs ?
   * Cette méthode devrait utiliser `maze.canPick` pour sa condition.
 * `PacmanView` ne fait rien : c'est cette classe qui devrait contenir les event listeners permettant de déplacer Pacman !
 * Dans `Game.moveSprites` : tu te sers des classes CSS (éléments de vue) pour déterminer si pacman récupère des scores (éléments de modèle) car ta méthode `maze.pick` est incorrecte. Une classe de modèle comme `Game` ne devrait jamais utiliser jQuery !
 * Dans `Game.updateFrame`, il serait plus simple de retirer la classe associée aux sprites en utilisant, par exemple, `$(".pacou")` plutôt que de manuellement aller chercher où se trouvait Pacman avant le dernier mouvement (idem pour les fantômes)
 * A quoi sert `gameview.test()` ? C'est au contrôleur de dire au modèle d'effectuer un déplacement, pas à la vue.

## Itération 3
 * Tu n'as pas créé `Sprite.notifyIsBlocked()` ?
 * `Ghost.canEat` : le but de comparer les anciennes positions est d'empêcher les problèmes de chevauchement, donc il faudrait comparer l'ancienne position de Pacman avec la position _actuelle_ du fantôme, et l'ancienne position du fantôme avec la position actuelle de Pacman.
 * `Sprite.respawn` ne remet pas le sprite à son emplacement initial.
 * Tu devrais utiliser l'héritage dans `Pacman.hasBeenEaten` (mot-clé `super()`).
   * Quand tu modifies le nombre de vies, il n'est pas nécessaire d'utiliser le getter.
 * Tu n'es pas censé devoir mettre à jour le compteur de vie à chaque mouvement, mais le contrôleur ne vérifie jamais si Pacman est mangé, ce qui t'empêche de mettre à jour le compteur de vie uniquement au moment opportun.

## Itération 4
 * Tu n'utilises jamais `removedDot` (utile dans le calcul de score).
 * `Game.lvlSucceed` aurait pu juste faire `return this.game.isEmpty()` plutôt qu'une condition.
 * `GameView.nextLevel` utilise du code redondant.
 * 4.4 (Start) pas effectué

# Défense
## Question 1
 * `if(jeu.pause == false)` : `jeu.pause` est déjà un booléen, tu peux juste écrire `if(!jeu.pause)` !

## Question 2
 * Il aurait été préférable de créer une sous-classe de Ghost dont la méthode `choiceNewDirection` est différente, mais l'algorithme fonctionne

# Grille d'évaluation
| Critère           | Sur | Cote |
| :---------------- | :-: |:---: |
| Itération 1 | 5 | 4 |
| Itération 2 | 9 | 6.5 |
| Itération 3 | 3 | 2 |
| Itération 4 | 3 | 2 |
| Bonus | Max 3 | 2 |
| Pénalités (Erreur dans la remise, attributs privés + getters, lisibilité)	     |    |  -2   |
| Défense |  | +1.5 |
| __Total__    | __20__ | __14__ |
