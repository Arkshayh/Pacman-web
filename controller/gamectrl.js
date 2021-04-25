class Gamectrl{
    constructor(){
        let test = new GameView(new Game(new Maze(RAW_MAZE.table)));
        this.game = test;
        this.pacview = new PacmanView(new PacmanCtrl(test.getGame().getPacman()));
    }

    run() {
        this._timer = setInterval(() => {
            this.game.getGame().moveSprites();
            this.game.updateFrame();
        }, 300);
    }
}

$(document).ready(function () {
    jeu = new Gamectrl();
    //jeu.run();
});