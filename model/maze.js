"use strict";

/* legend
 0 = empty
 1 = wall
 2 = pac-dot
 3 = energizer
 4 = pacman respawn
 5 = ghost respawn
 */
const RAW_MAZE = {
    table: [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1],
        [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
        [1,3,1,0,0,1,2,1,0,0,0,1,2,1,1,2,1,0,0,0,1,2,1,0,0,1,3,1],
        [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
        [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
        [1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1],
        [1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1],
        [1,2,2,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,2,2,1],
        [1,1,1,1,1,1,2,1,1,1,1,1,0,1,1,0,1,1,1,1,1,2,1,1,1,1,1,1],
        [0,0,0,0,0,1,2,1,1,1,1,1,0,1,1,0,1,1,1,1,1,2,1,0,0,0,0,0],
        [0,0,0,0,0,1,2,1,1,0,0,0,5,0,0,0,0,0,0,1,1,2,1,0,0,0,0,0],
        [0,0,0,0,0,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,0,0,0,0,0],
        [1,1,1,1,1,1,2,1,1,0,1,0,0,0,0,0,0,1,0,1,1,2,1,1,1,1,1,1],
        [0,0,0,0,0,1,2,0,0,0,1,0,0,0,0,0,0,1,0,0,0,2,1,0,0,0,0,0],
        [1,1,1,1,1,1,2,1,1,0,1,0,0,0,0,0,0,1,0,1,1,2,1,1,1,1,1,1],
        [0,0,0,0,0,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,0,0,0,0,0],
        [0,0,0,0,0,1,2,1,1,0,0,0,0,0,0,0,0,0,0,1,1,2,1,0,0,0,0,0],
        [0,0,0,0,0,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,0,0,0,0,0],
        [1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1],
        [1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1],
        [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
        [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
        [1,3,2,2,1,1,2,2,2,2,2,2,2,4,0,2,2,2,2,2,2,2,1,1,2,2,3,1],
        [1,1,1,2,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1,1,1],
        [1,1,1,2,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1,1,1],
        [1,2,2,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,2,2,1],
        [1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1],
        [1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1],
        [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ],
}

class Maze{
    constructor(RawMaze){
        let wall = new Layer(RawMaze.length, RawMaze[0].length);
        let gum = new Layer(RawMaze.length, RawMaze[0].length);
        let pacSpawn;

        for(let ligne = 0; ligne < RawMaze.length; ligne++){
            for(let colonne = 0; colonne < RawMaze[0].length; colonne++){
                switch(RawMaze[ligne][colonne]) {
                    case 0:
                        break;
                    case 1:
                        wall.setTile(new Position(ligne, colonne), new Tile(RawMaze[ligne][colonne]));
                        break;
                    case 2:
                        gum.setTile(new Position(ligne, colonne), new Tile(RawMaze[ligne][colonne]));
                        break;
                    case 3:
                        gum.setTile(new Position(ligne, colonne), new Tile(RawMaze[ligne][colonne]));
                        break;
                    case 4:
                        pacSpawn = new Position(ligne, colonne);
                        break; 
                    case 5:
                        break;
                }
            }
        }  
        this.wallLayer = wall;
        this.gumLayer = gum;     
        this.pacmanSpawn = pacSpawn;
    }

    getPacmanSpawn(){
        return this.pacmanSpawn;
    }

    getWallLayerTile(position){
        if(this.wallLayer.contains(position) == false){
            throw 'error position';
        }
        return this.wallLayer.getTile(position);
    }

    getDotLayerTile(position){
        if(this.gumLayer.contains(position) == false){
            throw 'error position';
        }
        return this.gumLayer.getTile(position);
    }

    getLayerRowSize(){
        return this.wallLayer.getNbRows();
    }
    getLayerColumnSize(){
        return this.wallLayer.getNbColumns();
    }

    canWalkOn(pos){
        if(this.wallLayer.contains(pos) == true && this.getWallLayerTile(pos) == undefined){
            return true;
        }
        return false;
    }

    canPick(pos){
        if(this.gumLayer.contains(pos) == true && this.getDotLayerTile(pos) != undefined){
            return true;
        }
        return false;
    }
    
    pick(pos){
        if(this.getDotLayerTile(pos) == undefined){
            throw 'erreur';
        }
        return this.getDotLayerTile(pos);
    }
}