class Game{
    constructor(rawMaze){
        this.game = rawMaze;
        this.pac = new Pacman("pacman", new Position(rawMaze.getPacmanSpawn().getRow(), rawMaze.getPacmanSpawn().getColumn()), Direction.WEST);
    }

    getLabyrinthe(){
        return this.game;
    }

    getPacman(){
        return this.pac;
    }

    moveSprites(){
        if(this.getLabyrinthe().canWalkOn(this.getPacman().getPosition().nextPosition(this.getPacman().getDirection())) == true){
            this.getPacman().move();
        }
    }

}