/**
 * The direction class will allow us to describe the directions that our sprites can take
 */
class Direction{
    constructor(deltarow ,deltacolumn){
        this.deltaRow = deltarow;
        this.deltaColumn = deltacolumn;
    }

    //getter for the row
    getDeltarow(){
        return this.deltaRow;
    }

    //getter for the column
    getDeltaColumn(){
        return this.deltaColumn;
    }
}

//4 direction possible.
Direction.NORTH = new Direction(-1,0);
Direction.SOUTH = new Direction(1,0);
Direction.WEST = new Direction(0,-1);
Direction.EAST = new Direction(0,1);