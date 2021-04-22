/**
 * The direction class will allow us to describe the directions that our sprites can take
 */
class Direction{
    constructor(deltarow ,deltacolumn){
        this.deltaRow = deltarow;
        this.deltaColumn = deltacolumn;
    }

    getDeltarow(){
        return this.deltaRow;
    }

    getDeltaColumn(){
        return this.deltaColumn;
    }
}

Direction.NORTH = new Direction(0,-1);
Direction.SOUTH = new Direction(0,1);
Direction.WEST = new Direction(-1,0);
Direction.EAST = new Direction(1,0);