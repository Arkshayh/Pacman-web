/**
 * The layers (Layer) each group together a set of tiles in order to constitute a level.
 *  We are going to have two layers. The first consists of the walls with which we will have to manage the collision. The second consists of the elements with which Pacman can interact: the erasers.
 */
class Layer{
    constructor(nbRows, nbColumns){
        this.rows = nbRows;
        this.columns = nbColumns;
        this.layer = Array(nbRows).fill().map(() => Array(nbColumns));
    }

    /**
     * Return true if the given position is in the rawmaze (layer)
     * @param {*} pos 
     * @returns boolean
     */
    contains(pos){
        let row = this.layer.length - 1;
        let column = this.layer[0].length - 1;

        return pos.getRow() >= 0 && pos.getRow() <= row && pos.getColumn() >= 0 && pos.getColumn() <= column;
    }

    /**
     * Change a tile in the gum layer at the given position
     * @param {*} position 
     * @param {*} tile 
     */
    setTile(position, tile){
        if(this.contains(position) == false){
            throw 'error position';
        }
        this.layer[position.getRow()][position.getColumn()] = tile;
    }

    //Get the tile at the given position 
    getTile(position){
        if(this.contains(position) == false){
            throw 'error position';
        }
        return this.layer[position.getRow()][position.getColumn()];
    }

    /**
     * Return true if there is a tile at the given position
     * @param {*} position 
     * @returns boolean
     */
    hasTile(position){
        if(this.contains(position) == false){
            throw 'error position';
        }
        if(this.getTile(position) == undefined){
            return false;
        }
        return true;
    }

    /**
     * return the nb of rows
     * @returns rows
     */
    getNbRows(){
        return this.rows;
    }

    /**
     * return the nb of columns
     * @returns columns
     */
    getNbColumns(){
        return this.columns;
    }
    
}
