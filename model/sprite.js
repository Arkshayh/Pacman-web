/**
 * Un Sprite est un élément mobile dans le jeu.
 */
class Sprite extends Component{
    constructor(id, pos, dir){
        super(id);
        this.position = pos;
        this.direction = dir;
        this.askedToChangeDirection = false;
        this.askedDirection = undefined;
        this.anciennePosition = pos;
        this.isDead = false;
    }

    /**
     * ggtter for isDead
     */
    hasBeenEaten(){
        this.isDead = true;
    }

    /**
     * set isdead to false
     */
    respawn(){
        this.isDead = false;
    }

    //return the position of the sprite
    getPosition(){
        return this.position;
    }

    //return the direction of the sprite 
    getDirection(){
        return this.direction;
    }

    //return the askedDirection
    getAskedDirection(){
        return this.askedDirection;
    }

    //return the futur position of the sprite according to its direction
    futurPos(){
        let dir = this.getAskedDirection();
        let pos = this.getPosition();
        let futurPos = pos.nextPosition(dir);

        return futurPos;
    }

    //return askedToChangeDirection
    hasAskedToChangeDirection(){
        return this.askedToChangeDirection;
    }

    //return the old position of the sprite 
    getAnciennePosition(){
        return this.anciennePosition;
    }

    //change the position of the sprite and his old position
    move(){
        let dir = this.getDirection();
        let pos = this.getPosition();
        this.anciennePosition = pos;
        this.position  = pos.nextPosition(dir);
    }

    //set askedToChangeDirection -> true && askedDirection to the given direction
    askToChangeDirection(direction){
        this.askedToChangeDirection = true;
        this.askedDirection = direction;
    }

    //change the direction -> askedtochangedirection -> false
    changeDirection(){
        this.direction = this.getAskedDirection();
        this.askedToChangeDirection = false;
    }
}