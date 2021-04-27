/**
 * extends tile. A dot has an ID and isEnergizer (boolean) to differentiate the 2 type of Dot
 */
class Dot extends Tile {

    constructor(id, isEnergizer){
        super(id);
        this.isEnergizer = isEnergizer;
    }

    //getter for energizer
    getEnergizer(){
        return this.isEnergizer;
    }
}