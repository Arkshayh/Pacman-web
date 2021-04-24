class Layer{
    constructor(nbRows, nbColumns){
        this.rows = nbRows;
        this.columns = nbColumns;
        this.layer = Array(nbRows).fill().map(() => Array(nbColumns));
    }

    contains(pos){
        let row = this.layer.length - 1;
        let column = this.layer[0].length - 1;

        return pos.getRow() >= 0 && pos.getRow() <= row && pos.getColumn() >= 0 && pos.getColumn() <= column;
    }

    setTile(position, tile){
        if(this.contains(position) == false){
            throw 'error position';
        }
        this.layer[position.getRow()][position.getColumn()] = tile;
    }

    getTile(position){
        if(this.contains(position) == false){
            throw 'error position';
        }
        return this.layer[position.getRow()][position.getColumn()];
    }

    hasTile(position){
        if(this.contains(position) == false){
            throw 'error position';
        }
        if(this.getTile(position) == undefined){
            return false;
        }
        return true;
    }

    getNbRows(){
        return this.rows;
    }

    getNbColumns(){
        return this.columns;
    }
    
}
