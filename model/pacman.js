const nbVie = 2;

/**
 *Pacman, he has a ID, a direction and a position.
 */
class Pacman extends Sprite{
    /**
     * @param {Position}  position the initial position
     * @param {Direction} direction the initial direction
     */
    constructor(PACMAN_ID, position, direction){
        super(PACMAN_ID, position, direction);
        this.nBlives = nbVie;
    }

    getLives(){
        return this.nBlives;
    }

    hasBeenEaten(){
        this.nBlives = this.getLives() - 1;
        this.isDead = true;
    }
}