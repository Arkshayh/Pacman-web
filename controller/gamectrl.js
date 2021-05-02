/**
 * It does not receive anything as a parameter. Its role is to automate the creation of the game and the associated visual
 */

class Gamectrl{
    constructor(){
        this.gameview = new GameView(new Game(new Maze(RAW_MAZE.table)));
        this.pacmanview = new PacmanView(new PacmanCtrl(this.gameview.pacman));
    }

    /**
     * This function must call the functions moveSprites () of Game and updateFrame () of GameView at regular intervals of 0.3 seconds.
     */
    run() {
        this._timer = setInterval(() => {
            this.gameview.test();
            this.gameview.updateFrame();
            this.gameview.updateLives();
        }
        , 300);
        this._timer2 = setInterval(() => {
            for(let i = 0 ; i < 4; i++){
                this.gameview.gameview.choiceDirGhost(i);
            }
        }
        , 4000);

        if(this.gameview.gameview.lvlSucced() == true){
            this.gameview.gameview.nextLevel(RAW_MAZE.table); 
            this.gameview.nextLevel();
        }
    }

    /**
     * return true if pacman can change his direction if not ->  false
     * @returns boolean
     */
    canChangeDirection(){
        let futurPos = this.pacmanview.pacmanCtrl.Pacman.futurPos();

        let bool =  this.gameview.gameview.game.canWalkOn(futurPos);

        return bool;
    }
}

/**
 * Code excecute when the page (home.html) is load.
 */
$(document).ready(function () {
    jeu = new Gamectrl();
    document.addEventListener("keydown", function (event) {
        let touche = event.key;
        if(jeu.pacmanview && jeu.pacmanview instanceof PacmanView){
            switch(touche){
                case 'ArrowLeft':
                    console.log("gauche");
                    jeu.pacmanview.pacmanCtrl.askToChangeDirection(Direction.WEST);
                    if(jeu.canChangeDirection() == true){
                        jeu.pacmanview.pacmanCtrl.Pacman.changeDirection();
                    }
                    break;
                case 'ArrowRight':
                    console.log("droite");
                    jeu.pacmanview.pacmanCtrl.askToChangeDirection(Direction.EAST);
                    if(jeu.canChangeDirection() == true){
                        jeu.pacmanview.pacmanCtrl.Pacman.changeDirection();
                    }
                    break;
                case 'ArrowUp':
                    console.log("haut");
                    jeu.pacmanview.pacmanCtrl.askToChangeDirection(Direction.NORTH);
                    if(jeu.canChangeDirection() == true){
                        jeu.pacmanview.pacmanCtrl.Pacman.changeDirection();
                    }
                    break;
                case 'ArrowDown':
                    console.log("bas");
                    jeu.pacmanview.pacmanCtrl.askToChangeDirection(Direction.SOUTH);
                    if(jeu.canChangeDirection() == true){
                        jeu.pacmanview.pacmanCtrl.Pacman.changeDirection();
                    }
                    break;
            }
        }
    })
    jeu.run();
});
