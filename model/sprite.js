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

    hasBeenEaten(){
        this.isDead = true;
    }

    respawn(){
        this.isDead = false;
    }

    getPosition(){
        return this.position;
    }

    getDirection(){
        return this.direction;
    }

    getAskedDirection(){
        return this.askedDirection;
    }

    futurPos(){
        let dir = this.getAskedDirection();
        let pos = this.getPosition();
        let futurPos = pos.nextPosition(dir);

        return futurPos;
    }

    hasAskedToChangeDirection(){
        return this.askedToChangeDirection;
    }

    getAnciennePosition(){
        return this.anciennePosition;
    }

    move(){
        let dir = this.getDirection();
        let pos = this.getPosition();
        this.anciennePosition = pos;
        this.position  = pos.nextPosition(dir);
    }

    askToChangeDirection(direction){
        this.askedToChangeDirection = true;
        this.askedDirection = direction;
    }

    changeDirection(){
        this.direction = this.getAskedDirection();
        this.askedToChangeDirection = false;
    }
}