class Position {
    constructor(row, column){
        this.row = row;
        this.column = column;
    }

    getRow(){
        return this.row;
    }

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