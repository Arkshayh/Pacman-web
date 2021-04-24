class Sprite extends Component{
    constructor(id, pos, dir){
        super(id);
        this.position = pos;
        this.direction = dir;
        this.askedToChangeDirection = false;
        this.askedDirection = undefined;
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

    hasAskedToChangeDirection(){
        return this.askedToChangeDirection;
    }

    move(){
        let dir = this.getDirection();
        let pos = this.getPosition();
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