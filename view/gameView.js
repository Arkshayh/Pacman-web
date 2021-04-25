class GameView{
    constructor(game){
    
    let labyrinthe = game.getLabyrinthe();
    let left = 0;
    let top = 0;

    for(let ligne = 0; ligne < labyrinthe.getLayerRowSize(); ligne++){
        for(let colonne = 0; colonne < labyrinthe.getLayerColumnSize(); colonne++){
            if(labyrinthe.getWallLayerTile(new Position(ligne, colonne)) != undefined){
                $('#gameboard').append('<div class = "wall" style ="left:' +  left + 'px; top:'+ top + 'px"></div>');
            }
            else if(labyrinthe.getDotLayerTile(new Position(ligne, colonne)) != undefined ){
                switch(labyrinthe.getDotLayerTile(new Position(ligne, colonne)).id) {
                    case 2:
                        $('#gameboard').append('<div class = "pacdot" style ="left:' +  left + 'px; top:'+ top + 'px"></div>');
                        break;
                    case 3: 
                        $('#gameboard').append('<div class = "energizer" style ="left:' +  left + 'px; top:'+ top + 'px"></div>');
                        break;
                    default:
                        $('#gameboard').append('<div class = "empty" style ="left:' +  left + 'px; top:'+ top + 'px"></div>');
                        break;

                }
            }
            else{
                $('#gameboard').append('<div class = "empty" style ="left:' +  left + 'px; top:'+ top + 'px"></div>');
            }
            left = left + 15;   
        }
        left = 0;
        top = top + 15;
    }
    
    this.gameview = game;
    this.pacman = game.getPacman();
    }

    test(){
        this.gameview.moveSprites();
    }

    updateFrame(){
        let pac = this.gameview.getPacman();
        let pacPos = pac.getPosition();
        let top = (15*(pacPos.getRow()));
        let left = (15*(pacPos.getColumn()));
        $('#gameboard').append('<div class = "pacou" style ="left:' +  left + 'px; top:'+ top + 'px"></div>');
    }
}