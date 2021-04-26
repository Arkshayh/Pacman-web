/**
 * Extends the classSprite. The ghosts behave very close to the pacman: an imaginary player produces randomly on one of the 4 arrows on their keyboard every 4 seconds,
 * as well as when the ghost is blocked.
 */
class Ghost extends Sprite{
    constructor(id, pos, dir){
        super(id, pos, dir);
    }

    /**
     * Returns a random direction
     * @returns Direction
     */
    choiceNewDirection(){
        let random;
        this._timer = setInterval(() => {
            random = Math.floor(Math.random() * 4) + 1;

            switch(random){
                case 1:
                    this.askToChangeDirection(Direction.NORTH);
                    this.changeDirection();
                    break;
                case 2:
                    this.askToChangeDirection(Direction.SOUTH);
                    this.changeDirection();
                    break;
                case 3:
                    this.askToChangeDirection(Direction.WEST);
                    this.changeDirection();
                    break;
                default:
                    this.askToChangeDirection(Direction.EAST);
                    this.changeDirection();
                    break;
            }
        }
        , 300);

    }


    /**
     * returns true if the Pacman and the ghost are in the same position or if the Pacman is in the old ghost position and the ghost is in the old Pacman position.
     * @param {*} Pacman 
     * @returns Boolean
     */
    canEat(Pacman){
        return ((Pacman.getPosition().getRow() == this.getPosition().getRow() &&  Pacman.getPosition().getColumn() == this.getPosition().getColumn()) 
        || (Pacman.getAnciennePosition().getRow() == this.getAnciennePosition().getRow() && Pacman.getAnciennePosition().getColumn() == this.getAnciennePosition().getColumn()));
    }

    /**
     * check if the ghost is blocked, if it's the case he choose a new direction
     * @param {} maze 
     */
    notifyIsBlocked(maze){
        let CurrentPos = this.getPosition();
        let CurrentDir = this.getDirection();
        let futurePos = new Position(CurrentPos.getRow() + CurrentDir.getDeltaRow(), CurrentPos.getColumn() + CurrentDir.getDeltaColumn);
        if(maze.canWalkOn(futurePos)== true){
            this.choiceNewDirection();
        }
    }

}