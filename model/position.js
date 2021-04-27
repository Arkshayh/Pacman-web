/**
 * represents a position.
 * Has 2 coordinate attributes of row and column
 */
class Position {
    constructor(row, column){
        this.row = row;
        this.column = column;
    }

    //getter
    getRow(){
        return this.row;
    }

    //getter
    getColumn(){
        return this.column;
    }

    /**
     * returns to new position according to the given direction.
     * @param {*Direction} direction a direction (NORTH/SOUTH/EAST/WEST)
     * @returns {Position} pos
     */
    nextPosition(direction){
        let pos = new Position(this.row + direction.getDeltarow(), this.column + direction.getDeltaColumn());
        return pos;
    }
}