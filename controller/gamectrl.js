class Gamectrl{
    constructor(){
        this.gameview = new GameView(new Game(new Maze(RAW_MAZE.table)));
        this.pacmanview = new PacmanView(new PacmanCtrl(this.gameview.pacman));
    }

    run() {
        this._timer = setInterval(() => {
            this.gameview.test();
            this.gameview.updateFrame();
        }
        , 300);
    }
}

$(document).ready(function () {
    jeu = new Gamectrl();
    jeu.run();
});