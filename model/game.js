class Game{
    constructor(rawMaze){
        this.game = rawMaze;
        this.pac = new Pacman("pacman", new Position(rawMaze.getPacmanSpawn().getRow(), rawMaze.getPacmanSpawn().getColumn()), Direction.WEST);

        this.ghosts = this.makeGhost();
        
    }

    makeGhost(){
        let tab = [];
        for(let i = 0; i < 4;i++){
            tab.push(new Ghost("ghost", new Position(this.game.getGhostSpawn().getRow(), this.game.getGhostSpawn().getColumn()), this.makeRandomDir()))
            tab[i].choiceNewDirection();
        }
        return tab;
    }

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

    getLabyrinthe(){
        return this.game;
    }

    getPacman(){
        return this.pac;
    }

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
                this.ghosts[i].move();
                if(this.ghosts[i].canEat(this.getPacman()) == true){
                    console.log("Niark !! Niark !! je bouffe pacman !! Niark !! Niark !!");
                }
            }
        }
    }

}