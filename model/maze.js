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

/**
 * The class makes it possible to model the labyrinth of the Game. 
 * For its good functioning, two layers (Layer) will be used. 
 * The layer made up of the tiles with which the collisions will be managed (the walls) and
 *  the layer with which the Pacman will be able to recover objects (the erasers).
 * 
 */
class Maze{
    constructor(RawMaze){
        let wall = new Layer(RawMaze.length, RawMaze[0].length);
        let gum = new Layer(RawMaze.length, RawMaze[0].length);
        let pacSpawn;
        let _ghostSpawn;
        let nbGum;

        for(let ligne = 0; ligne < RawMaze.length; ligne++){
            for(let colonne = 0; colonne < RawMaze[0].length; colonne++){
                switch(RawMaze[ligne][colonne]) {
                    case 0:
                        break;
                    case 1:
                        wall.setTile(new Position(ligne, colonne), new Tile(RawMaze[ligne][colonne]));
                        break;
                    case 2:
                        nbGum++;
                        gum.setTile(new Position(ligne, colonne), new Dot(RawMaze[ligne][colonne], false));
                        break;
                    case 3:
                        nbGum++;
                        gum.setTile(new Position(ligne, colonne), new Dot(RawMaze[ligne][colonne], true));
                        break;
                    case 4:
                        pacSpawn = new Position(ligne, colonne);
                        break; 
                    case 5:
                        _ghostSpawn = (new Position(ligne, colonne));
                        break;
                }
            }
        }  
        this.wallLayer = wall;
        this.gumLayer = gum;     
        this.pacmanSpawn = pacSpawn;
        this.ghostSpawn = _ghostSpawn;
        this.nbgum = nbGum;
    }
    
    /**
     * return the position of the ghost spawn
     */
    getGhostSpawn(){
        return this.ghostSpawn;
    }

    /**
     * the position of the pac spawn
     * @returns position
     */
    getPacmanSpawn(){
        return this.pacmanSpawn;
    }

    //getter for a tile of wall layer at the given position
    getWallLayerTile(position){
        if(this.wallLayer.contains(position) == false){
            throw 'error position';
        }
        return this.wallLayer.getTile(position);
    }

    //getter for a tile of dot layer at the given position
    getDotLayerTile(position){
        if(this.gumLayer.contains(position) == false){
            throw 'error position';
        }
        return this.gumLayer.getTile(position);
    }

    //getter return the nb of row of the two layer
    getLayerRowSize(){
        return this.wallLayer.getNbRows();
    }

    //getter return the nb of column of the two layer
    getLayerColumnSize(){
        return this.wallLayer.getNbColumns();
    }

    //Getter for the number of gums on the board
    getNbGum(){
        return this.nbgum;
    }

    /**
     * Return true if you can walk on the given positino
     * @param {*} pos 
     * @returns boolean
     */
    canWalkOn(pos){
        if(this.wallLayer.contains(pos) == true && this.getWallLayerTile(pos) == undefined){
            return true;
        }
        return false;
    }

    /**
     * Return if you can pick a dot at the given position.
     * @param {*} pos 
     * @returns 
     */
    canPick(pos){
        if(this.gumLayer.contains(pos) == true && this.getDotLayerTile(pos) != undefined){
            return true;
        }
        return false;
    }
    

    /**
     * return the dot at the given position.
     * 
     * @param {} pos 
     * @returns 
     */
    pick(pos){
        if(this.getDotLayerTile(pos) == undefined){
            throw 'erreur';
        }
        this.wallLayer[pos.getRow()][pos.getColumn()] = undefined;
        this.nbgum = this.getNbGum() - 1;
        return this.getDotLayerTile(pos);
    }
    
    /**
     * Check if the board is empty (no gum), 
     * if yes -> true 
     * else -> false
     * @returns boolean
     */
    isEmpty(){
        if(this.nbgum == 0){
            return true;
        }
        return false;
    }
}