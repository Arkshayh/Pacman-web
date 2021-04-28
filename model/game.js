/**
 * The Game class will serve as a front for us.
 * Game has a rawMaze argument which allows initialization of the game's Maze.
 * Game create automatically a pacman and 4 ghosts
 */
class Game{
    constructor(rawMaze){
        this.game = rawMaze;
        this.pac = new Pacman("pacman", new Position(rawMaze.getPacmanSpawn().getRow(), rawMaze.getPacmanSpawn().getColumn()), Direction.WEST);

        this.ghosts = this.makeGhost();
        
    }

    /**
     * Create a array of 4 ghosts
     * @returns ghosts[4]
     */
    makeGhost(){
        let tab = [];
        for(let i = 0; i < 4;i++){
            tab.push(new Ghost("ghost", new Position(this.game.getGhostSpawn().getRow(), this.game.getGhostSpawn().getColumn()), this.makeRandomDir()))
            tab[i].choiceNewDirection();
        }
        return tab;
    }

    /**
     * Return a random direction
     * @returns Direction
     */
    makeRandomDir(){
        let random = Math.floor(Math.random() * 4) + 1;
        switch(random){
            case 1:
                return Direction.WEST;
            case 2:
                return Direction.EAST;
            case 3:
                return Direction.NORTH;
            default:
                return Direction.SOUTH;
        }
    }

    //getter for this.game (the rawmaze)
    getLabyrinthe(){
        return this.game;
    }

    //getter for pacman
    getPacman(){
        return this.pac;
    }

    /**
     * This method will move the Pacman. 
     * Special case: If a change of direction has been requested and it is possible to go in the desired direction,
     *  then this change of direction must be made before moving the Pacman.
     */
    moveSprites(){
        let pacPos = this.getPacman().getPosition();
        let nextPos = pacPos.nextPosition(this.getPacman().getDirection());

        /**
         * console.log("Direction : " + this.getPacman().getDirection().getDeltarow() + ", " + this.getPacman().getDirection().getDeltaColumn());
         * console.log("current pos = " + pacPos.getRow() + ", " + pacPos.getColumn());
         * console.log("next pos = " + nextPos.getRow() + ", " + nextPos.getColumn());
         */

        if(this.getLabyrinthe().canWalkOn(nextPos) == true){
            this.getPacman().move();
            for(let i = 0; i < this.ghosts.length; i++){
                if(this.getLabyrinthe().canWalkOn(this.ghosts[i].futurPos()) == true){
                    this.ghosts[i].move();
                }
                else{
                    this.ghosts[i].notifyIsBlocked();
                }
                if(this.ghosts[i].canEat(this.pac) == true){
                    this.game.respawnAllSprite();
                    console.log("Niark !! Niark !! je bouffe pacman !! Niark !! Niark !!");
                }
            }
        }
    }

    choiceDirGhost(i){
        this.ghosts[i].choiceNewDirection();
    }

    pacmanHasBeenEaten(){
        return this.pac.isSpriteDead();
    }

    isGameOver(){
        if(this.pac.getLives() == 0 && this.pacmanHasBeenEaten() == true){
            return true;
        }
        return false;
    }

    respawnAllSprite(){
        this.pac.changeDirectionRespawn(Direction.WEST);
        this.pac.setPosition(this.game.getPacmanSpawn().getRow(), this.game.getPacmanSpawn().getColumn());
        this.pac.respawn();

        for(let i =0; i < this.ghosts.length; i++){
            this.ghosts[i].changeDirectionRespawn(this.makeRandomDir());
            this.ghosts[i].setPosition(this.game.getGhostSpawn().getRow(), this.game.getGhostSpawn().getColumn());
            this.ghosts[i].respawn();
        }
    }
}