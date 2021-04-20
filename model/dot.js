class Dot extends Tile {

    constructor(id, isEnergizer){
        super(id);
        this.isEnergizer = isEnergizer;
    }

    getEnergizer(){
        return this.isEnergizer;
    }
}