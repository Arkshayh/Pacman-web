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

    hasAskedToChangeDirection(){
        return this.askedToChangeDirection;
    }

    getAskedDirection(){
        return this.askedDirection;
    }
}