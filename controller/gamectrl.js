class Gamectrl{
    constructor(){
        this.game = new GameView(new Game(new Maze(RAW_MAZE.table)));
    }
}

$(document).ready(function () {
    jeu = new Gamectrl();
});